import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Calendar,
  Building2,
  Clock,
  Printer,
  Edit3,
  XCircle,
  RotateCcw,
  Sparkles,
  FileCheck,
  CheckCircle2,
  FileText,
  Bell,
  Trash2
} from 'lucide-react';
import { formatDate, getStatusDetails, getCategoryDetails } from '../../utils/formatters';
import { CaseTimeline } from './CaseTimeline';
import { CaseEvidence } from './CaseEvidence';
import { CaseActionPlan } from './CaseActionPlan';
import { CaseAIAssistant } from './CaseAIAssistant';
import { CaseNotes } from './CaseNotes';
import { CaseExportModal } from './CaseExportModal';
import { Modal } from '../common/Modal';
import { CaseStatus } from '../../types';

export const CaseWorkspace: React.FC = () => {
  const {
    cases,
    selectedCaseId,
    events,
    evidence,
    actionPlans,
    reminders,
    notes,
    setCurrentView,
    updateCase,
    closeCase,
    reopenCase,
    deleteCase,
    addReminder
  } = useApp();

  const currentCase = cases.find(c => c.id === selectedCaseId);

  // Modals & Controls
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  // Edit form state
  const [editTitle, setEditTitle] = useState(currentCase?.title || '');
  const [editOrg, setEditOrg] = useState(currentCase?.organisation || '');
  const [editDesc, setEditDesc] = useState(currentCase?.description || '');
  const [editStatus, setEditStatus] = useState<CaseStatus>(currentCase?.status || 'in_progress');
  const [editRef, setEditRef] = useState(currentCase?.order_reference || '');

  // Reminder form state
  const [reminderDate, setReminderDate] = useState(
    new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]
  );
  const [reminderDesc, setReminderDesc] = useState('');

  if (!currentCase) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#F8FAFC]">No case selected</h2>
        <p className="text-xs text-[#A1A1AA]">
          Please select an existing case from your dashboard or case list.
        </p>
        <button
          onClick={() => setCurrentView('cases')}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold transition-colors"
        >
          Go to Cases
        </button>
      </div>
    );
  }

  const status = getStatusDetails(currentCase.status);
  const category = getCategoryDetails(currentCase.category);
  const caseReminders = reminders.filter(r => r.case_id === currentCase.id);
  const isClosed = currentCase.status === 'resolved' || currentCase.status === 'closed_by_user';

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCase(currentCase.id, {
      title: editTitle.trim(),
      organisation: editOrg.trim(),
      description: editDesc.trim(),
      status: editStatus,
      order_reference: editRef.trim() || undefined
    });
    setIsEditModalOpen(false);
  };

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminderDesc.trim()) return;

    addReminder({
      case_id: currentCase.id,
      case_title: currentCase.title,
      reminder_date: reminderDate,
      description: reminderDesc.trim(),
      completed: false,
      priority: 'high'
    });

    setReminderDesc('');
    setIsReminderModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => setCurrentView('cases')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Cases</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {/* Export button */}
          <button
            onClick={() => setIsExportOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#171B25] border border-[#252B38] text-zinc-300 hover:bg-[#252B38] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-zinc-400" />
            <span>Export Case Summary</span>
          </button>

          {/* Edit button */}
          <button
            onClick={() => {
              setEditTitle(currentCase.title);
              setEditOrg(currentCase.organisation);
              setEditDesc(currentCase.description);
              setEditStatus(currentCase.status);
              setEditRef(currentCase.order_reference || '');
              setIsEditModalOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-[#171B25] border border-[#252B38] text-zinc-300 hover:bg-[#252B38] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5 text-zinc-400" />
            <span>Edit Case</span>
          </button>

          {/* Close / Reopen button */}
          {isClosed ? (
            <button
              onClick={() => reopenCase(currentCase.id)}
              className="px-3.5 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-violet-400" />
              <span>Reopen Case</span>
            </button>
          ) : (
            <button
              onClick={() => closeCase(currentCase.id)}
              className="px-3.5 py-2 rounded-xl bg-[#171B25] border border-[#252B38] hover:bg-[#252B38] text-zinc-300 hover:text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <XCircle className="w-3.5 h-3.5 text-zinc-500" />
              <span>Close Case</span>
            </button>
          )}

          {/* Delete button */}
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this case and its associated records?')) {
                deleteCase(currentCase.id);
              }
            }}
            className="p-2 rounded-xl text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Delete case permanently"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Overview Header */}
      <div className="bg-[#10131A] rounded-3xl border border-[#252B38] shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${status.bg} ${status.text} ${status.border}`}
              >
                <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                {status.label}
              </span>

              <span className="text-xs font-semibold text-zinc-300 bg-[#171B25] border border-[#252B38] px-2.5 py-1 rounded-lg">
                {category.label}
              </span>

              <span className="text-xs text-zinc-500">•</span>
              <span className="text-xs font-medium text-zinc-400 capitalize">
                {currentCase.audience} Audience
              </span>

              {currentCase.is_sample && (
                <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                  Sample Demonstration Case
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight leading-tight">
              {currentCase.title}
            </h1>

            <p className="text-xs text-[#A1A1AA] flex flex-wrap items-center gap-4">
              <span>
                Target Organisation: <strong className="text-[#F8FAFC]">{currentCase.organisation}</strong>
              </span>
              {currentCase.order_reference && (
                <span>
                  Reference ID: <strong className="text-zinc-300 font-mono">{currentCase.order_reference}</strong>
                </span>
              )}
              <span>
                Issue Started: <strong className="text-zinc-300">{formatDate(currentCase.issue_started_at)}</strong>
              </span>
            </p>
          </div>

          {/* Quick SLA / Reminder Banner */}
          <div className="bg-[#171B25] rounded-2xl p-4 border border-[#252B38] flex flex-col gap-2 shrink-0 min-w-[240px]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#F8FAFC] flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-violet-400" />
                Case Follow-Ups
              </span>
              <button
                onClick={() => setIsReminderModalOpen(true)}
                className="text-violet-400 hover:text-violet-300 font-bold text-[11px] transition-colors"
              >
                + Schedule
              </button>
            </div>

            {caseReminders.length === 0 ? (
              <p className="text-[11px] text-zinc-500 italic">No reminders set for this case.</p>
            ) : (
              <div className="space-y-1.5 pt-1">
                {caseReminders.slice(0, 2).map(r => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#10131A] border border-[#252B38]"
                  >
                    <span className={`text-[11px] truncate max-w-[140px] ${r.completed ? 'line-through text-zinc-500' : 'text-zinc-200 font-medium'}`}>
                      {r.description}
                    </span>
                    <span className="text-[10px] text-violet-400 font-mono">
                      {formatDate(r.reminder_date)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Factual Statement */}
        <div className="pt-4 border-t border-[#252B38]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
            Issue Narrative & Context
          </h4>
          <p className="text-xs text-[#A1A1AA] leading-relaxed whitespace-pre-wrap font-sans">
            {currentCase.description}
          </p>
          {currentCase.target_resolution && (
            <div className="mt-3 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-xs text-violet-300">
              <strong>Desired Resolution Outcome:</strong> {currentCase.target_resolution}
            </div>
          )}
        </div>
      </div>

      {/* Main Workspace Grid: Timeline & Action Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Timeline */}
        <CaseTimeline currentCase={currentCase} events={events} />

        {/* Action Plan */}
        <CaseActionPlan currentCase={currentCase} actionPlans={actionPlans} />
      </div>

      {/* AI Assistant Dedicated Section */}
      <CaseAIAssistant
        currentCase={currentCase}
        events={events}
        evidenceList={evidence}
      />

      {/* Evidence & Case Notes Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CaseEvidence currentCase={currentCase} evidenceList={evidence} />
        <CaseNotes currentCase={currentCase} notes={notes} />
      </div>

      {/* Export Summary Modal */}
      <CaseExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        currentCase={currentCase}
        events={events}
        evidenceList={evidence}
        actionPlans={actionPlans}
        notes={notes}
      />

      {/* Edit Case Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Case Information"
        subtitle="Update core parameters and resolution progress"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              Case Title
            </label>
            <input
              type="text"
              required
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
                Organisation
              </label>
              <input
                type="text"
                required
                value={editOrg}
                onChange={e => setEditOrg(e.target.value)}
                className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
                Reference ID
              </label>
              <input
                type="text"
                value={editRef}
                onChange={e => setEditRef(e.target.value)}
                className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs font-mono text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              Case Status
            </label>
            <select
              value={editStatus}
              onChange={e => setEditStatus(e.target.value as CaseStatus)}
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs font-semibold text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="draft">Draft</option>
              <option value="in_progress">In Progress</option>
              <option value="waiting_for_response">Waiting for Response</option>
              <option value="follow_up_needed">Follow-Up Needed</option>
              <option value="escalation_available">Escalation Information Available</option>
              <option value="resolved">Resolved</option>
              <option value="closed_by_user">Closed by User</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              Issue Narrative
            </label>
            <textarea
              rows={4}
              required
              value={editDesc}
              onChange={e => setEditDesc(e.target.value)}
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#252B38]">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/20 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Schedule Reminder Modal */}
      <Modal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        title="Schedule Follow-Up Reminder"
        subtitle="Set a committed response deadline or check-in alert"
      >
        <form onSubmit={handleCreateReminder} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              Reminder Date
            </label>
            <input
              type="date"
              required
              value={reminderDate}
              onChange={e => setReminderDate(e.target.value)}
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              Reminder Description
            </label>
            <textarea
              rows={3}
              required
              value={reminderDesc}
              onChange={e => setReminderDesc(e.target.value)}
              placeholder="e.g. Check tracking or escalate to Grievance Officer if no update received..."
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#252B38]">
            <button
              type="button"
              onClick={() => setIsReminderModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/20 transition-all"
            >
              Schedule Reminder
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
