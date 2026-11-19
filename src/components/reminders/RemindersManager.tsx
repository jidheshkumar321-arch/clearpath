import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Plus,
  CheckCircle2,
  Trash2,
  Clock,
  Check
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { Modal } from '../common/Modal';

export const RemindersManager: React.FC = () => {
  const {
    reminders,
    cases,
    addReminder,
    toggleReminder,
    deleteReminder,
    openCaseWorkspace
  } = useApp();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form state
  const [caseId, setCaseId] = useState(cases.length > 0 ? cases[0].id : '');
  const [reminderDate, setReminderDate] = useState(
    new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0]
  );
  const [description, setDescription] = useState('');
  const [priority] = useState<'low' | 'medium' | 'high'>('medium');

  const upcomingReminders = reminders
    .filter(r => !r.completed)
    .sort((a, b) => new Date(a.reminder_date).getTime() - new Date(b.reminder_date).getTime());

  const completedReminders = reminders
    .filter(r => r.completed)
    .sort((a, b) => new Date(b.reminder_date).getTime() - new Date(a.reminder_date).getTime());

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const matchedCase = cases.find(c => c.id === caseId);

    addReminder({
      case_id: caseId || 'general',
      case_title: matchedCase ? matchedCase.title : 'General Workspace Reminder',
      reminder_date: reminderDate,
      description: description.trim(),
      completed: false,
      priority: priority
    });

    setDescription('');
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight">
            Follow-Up Reminders
          </h1>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            Never lose track of committed turnaround times, escalations, or bank reconciliation checks.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-violet-600/20 transition-all"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Schedule New Reminder</span>
        </button>
      </div>

      {/* Notification Capability Notice */}
      <div className="p-3 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-zinc-300 flex items-center gap-2">
        <Clock className="w-4 h-4 text-violet-400 shrink-0" />
        <span>
          <strong className="text-[#F8FAFC]">Operational Note:</strong> Reminders operate within your local workspace view. Push and email notifications are disabled until an SMTP or SMS service is connected.
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#252B38] pb-3 text-xs">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            activeTab === 'upcoming'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-[#A1A1AA] hover:bg-[#171B25] hover:text-white'
          }`}
        >
          Upcoming Reminders ({upcomingReminders.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            activeTab === 'completed'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-[#A1A1AA] hover:bg-[#171B25] hover:text-white'
          }`}
        >
          Completed Archive ({completedReminders.length})
        </button>
      </div>

      {/* Reminders List */}
      {activeTab === 'upcoming' ? (
        upcomingReminders.length === 0 ? (
          <div className="bg-[#171B25] rounded-3xl border border-[#252B38] p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-400 border border-violet-500/20 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#F8FAFC]">
              All caught up!
            </h3>
            <p className="text-xs text-[#A1A1AA] max-w-sm mx-auto">
              You have no pending follow-up deadlines scheduled.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingReminders.map(rem => (
              <div
                key={rem.id}
                className="bg-[#171B25] rounded-2xl p-4 sm:p-5 border border-[#252B38] hover:border-[#8B5CF6]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <input
                    type="checkbox"
                    checked={rem.completed}
                    onChange={() => toggleReminder(rem.id)}
                    className="mt-1 w-4 h-4 text-violet-600 rounded bg-[#10131A] border-[#252B38] focus:ring-violet-500 cursor-pointer"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-[#F8FAFC] leading-snug">
                      {rem.description}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[#A1A1AA]">
                      <span className="font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded">
                        Due: {formatDate(rem.reminder_date)}
                      </span>
                      {rem.case_title && (
                        <button
                          onClick={() => openCaseWorkspace(rem.case_id)}
                          className="hover:text-violet-400 underline truncate max-w-xs text-[11px] transition-colors"
                        >
                          Case: {rem.case_title}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => toggleReminder(rem.id)}
                    className="px-3 py-1 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 border border-violet-500/20 font-semibold text-xs transition-colors flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Done
                  </button>
                  <button
                    onClick={() => deleteReminder(rem.id)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete reminder"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Completed tab */
        completedReminders.length === 0 ? (
          <div className="bg-[#171B25] rounded-3xl border border-[#252B38] p-12 text-center text-xs text-zinc-500 italic">
            No completed reminders in the archive.
          </div>
        ) : (
          <div className="space-y-3 opacity-75">
            {completedReminders.map(rem => (
              <div
                key={rem.id}
                className="bg-[#10131A] rounded-2xl p-4 border border-[#252B38] flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={rem.completed}
                    onChange={() => toggleReminder(rem.id)}
                    className="w-4 h-4 text-violet-600 rounded bg-[#171B25] border-[#252B38] cursor-pointer"
                  />
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-500 line-through">
                      {rem.description}
                    </h3>
                    <span className="text-[10px] text-zinc-500">
                      Completed • Scheduled was {formatDate(rem.reminder_date)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteReminder(rem.id)}
                  className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors"
                  title="Delete from archive"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )
      )}

      {/* Schedule Reminder Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Schedule Follow-Up Reminder"
        subtitle="Track a response commitment or statutory escalation window"
      >
        <form onSubmit={handleCreateReminder} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              Associate with Case
            </label>
            <select
              value={caseId}
              onChange={e => setCaseId(e.target.value)}
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs font-semibold text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {cases.map(c => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.organisation})
                </option>
              ))}
            </select>
          </div>

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
              Follow-Up Description
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. Check tracking portal or send escalation email if 48-hour SLA has passed..."
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#252B38]">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/20 transition-all"
            >
              Create Reminder
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
