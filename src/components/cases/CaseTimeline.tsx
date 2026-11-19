import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Case, CaseEvent, EventType } from '../../types';
import {
  Clock,
  Plus,
  Send,
  Inbox,
  FileCheck,
  RotateCcw,
  AlertCircle,
  FileText,
  User,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { Modal } from '../common/Modal';

interface CaseTimelineProps {
  currentCase: Case;
  events: CaseEvent[];
}

export const CaseTimeline: React.FC<CaseTimelineProps> = ({ currentCase, events }) => {
  const { addEvent } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New event form state
  const [eventType, setEventType] = useState<EventType>('communication_sent');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [sourceReference, setSourceReference] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const caseEvents = [...events]
    .filter(e => e.case_id === currentCase.id)
    .sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime());

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    addEvent({
      case_id: currentCase.id,
      event_type: eventType,
      description: description.trim(),
      event_date: eventDate,
      source_reference: sourceReference.trim() || undefined,
      created_by_user: true,
      is_verified: isVerified
    });

    setDescription('');
    setSourceReference('');
    setIsAddModalOpen(false);
  };

  const getEventIcon = (type: EventType) => {
    switch (type) {
      case 'communication_sent':
        return <Send className="w-3.5 h-3.5 text-violet-400" />;
      case 'communication_received':
        return <Inbox className="w-3.5 h-3.5 text-emerald-400" />;
      case 'evidence_recorded':
        return <FileCheck className="w-3.5 h-3.5 text-purple-400" />;
      case 'status_changed':
        return <RotateCcw className="w-3.5 h-3.5 text-amber-400" />;
      case 'escalation_prepared':
        return <AlertCircle className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-zinc-400" />;
    }
  };

  return (
    <div className="bg-[#10131A] rounded-2xl border border-[#252B38] p-6 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-violet-400" />
            <h3 className="text-base font-bold text-[#F8FAFC]">
              Chronological Event Timeline
            </h3>
          </div>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            Maintain an unbroken record of dates, messages, and organisation promises.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-3.5 h-3.5 text-white" />
          <span>Add Timeline Event</span>
        </button>
      </div>

      {/* Legend & Provenance Guide */}
      <div className="p-3 bg-[#171B25] rounded-xl border border-[#252B38] flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-zinc-300">
        <span className="font-bold text-zinc-200">Record Provenance:</span>
        <span className="inline-flex items-center gap-1">
          <User className="w-3 h-3 text-zinc-400" /> User Statement
        </span>
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified External Source
        </span>
        <span className="inline-flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-violet-400" /> AI-Assisted Recommendation
        </span>
      </div>

      {/* Timeline Stream */}
      {caseEvents.length === 0 ? (
        <div className="py-8 text-center text-xs text-zinc-500 italic">
          No events recorded yet. Click "Add Timeline Event" to log initial communications.
        </div>
      ) : (
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#252B38]">
          {caseEvents.map(evt => (
            <div key={evt.id} className="relative group">
              {/* Dot Icon */}
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#10131A] border-2 border-[#252B38] flex items-center justify-center group-hover:border-violet-500 transition-colors shadow-xs">
                {getEventIcon(evt.event_type)}
              </div>

              <div className="bg-[#171B25] hover:border-[#8B5CF6]/50 p-4 rounded-xl border border-[#252B38] transition-all space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#F8FAFC] font-mono">
                      {formatDate(evt.event_date)}
                    </span>
                    <span className="capitalize font-semibold text-zinc-300 px-2 py-0.5 rounded bg-[#10131A] border border-[#252B38] text-[10px]">
                      {evt.event_type.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px]">
                    {evt.is_verified && (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        <ShieldCheck className="w-3 h-3" /> Verified Proof
                      </span>
                    )}
                    {evt.is_ai_generated && (
                      <span className="inline-flex items-center gap-1 text-violet-400 font-semibold bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
                        <Sparkles className="w-3 h-3" /> AI Suggestion
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#A1A1AA] leading-relaxed font-normal">
                  {evt.description}
                </p>

                {evt.source_reference && (
                  <div className="text-[11px] text-zinc-400 font-mono bg-[#10131A] p-2 rounded border border-[#252B38] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Source: {evt.source_reference}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add Timeline Event */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Timeline Event"
        subtitle="Record a communication, promised date, or verified status change"
      >
        <form onSubmit={handleCreateEvent} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              Event Classification
            </label>
            <select
              value={eventType}
              onChange={e => setEventType(e.target.value as EventType)}
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs font-semibold text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="communication_sent">Communication Sent (Email, Ticket, Notice)</option>
              <option value="communication_received">Communication Received (Support reply, Call)</option>
              <option value="evidence_recorded">Evidence Recorded (Job sheet, Receipt, Photo)</option>
              <option value="status_changed">Status Changed (Escalation, Delay notice)</option>
              <option value="escalation_prepared">Escalation Prepared (Formal Notice, NCH Docket)</option>
              <option value="note_logged">Private Note Logged</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              Event Date
            </label>
            <input
              type="date"
              required
              value={eventDate}
              onChange={e => setEventDate(e.target.value)}
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              Event Description & Summary
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. Sent email to grievance officer referencing order #UL-89412... or Agent promised dispatch within 48h..."
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              Source Reference / Ticket ID (Optional)
            </label>
            <input
              type="text"
              value={sourceReference}
              onChange={e => setSourceReference(e.target.value)}
              placeholder="e.g. Support Ticket #99104, Email thread subject, or call timestamp"
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isVerified}
                onChange={e => setIsVerified(e.target.checked)}
                className="w-4 h-4 text-violet-600 rounded bg-[#171B25] border-[#252B38] focus:ring-violet-500"
              />
              <span className="text-xs text-zinc-300">
                Mark as verified external record (supported by written email, printed job sheet, or courier tracking)
              </span>
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#252B38]">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/20 transition-all"
            >
              Add to Timeline
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
