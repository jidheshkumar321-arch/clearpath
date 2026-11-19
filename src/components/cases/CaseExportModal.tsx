import React, { useState } from 'react';
import { Case, CaseEvent, Evidence, ActionPlan, Note } from '../../types';
import { Modal } from '../common/Modal';
import { Printer, Copy, Check, ShieldCheck, FileText } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

interface CaseExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCase: Case;
  events: CaseEvent[];
  evidenceList: Evidence[];
  actionPlans: ActionPlan[];
  notes: Note[];
}

export const CaseExportModal: React.FC<CaseExportModalProps> = ({
  isOpen,
  onClose,
  currentCase,
  events,
  evidenceList,
  actionPlans
}) => {
  const [copied, setCopied] = useState(false);

  const caseEvents = [...events]
    .filter(e => e.case_id === currentCase.id)
    .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());

  const caseEvidence = evidenceList.filter(e => e.case_id === currentCase.id);
  const casePlans = actionPlans.filter(p => p.case_id === currentCase.id);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    let summaryText = `CLEARPATH CASE DOSSIER & PROGRESS SUMMARY\n`;
    summaryText += `==============================================\n`;
    summaryText += `Case Title: ${currentCase.title}\n`;
    summaryText += `Organisation: ${currentCase.organisation}\n`;
    summaryText += `Reference ID: ${currentCase.order_reference || 'N/A'}\n`;
    summaryText += `Category: ${currentCase.category.replace('_', ' ')}\n`;
    summaryText += `Current Status: ${currentCase.status}\n`;
    summaryText += `Date Started: ${currentCase.issue_started_at}\n\n`;
    summaryText += `ISSUE DESCRIPTION:\n${currentCase.description}\n\n`;
    summaryText += `CHRONOLOGICAL TIMELINE OF EVENTS:\n`;
    caseEvents.forEach((e, idx) => {
      summaryText += `${idx + 1}. [${e.event_date}] (${e.event_type}) - ${e.description} ${e.source_reference ? '[Ref: ' + e.source_reference + ']' : ''}\n`;
    });
    summaryText += `\nATTACHED EVIDENCE:\n`;
    caseEvidence.forEach(ev => {
      summaryText += `• ${ev.file_name} (${ev.category}) - ${ev.description}\n`;
    });
    summaryText += `\nACTION PLAN:\n`;
    casePlans.forEach(p => {
      summaryText += `• [${p.approval_status.toUpperCase()}] ${p.title}: ${p.suggested_action}\n`;
    });
    summaryText += `\nDISCLAIMER: Prepared via CLEARPATH, an independent productivity workspace. This document does not constitute formal legal representation.`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Executive Case Summary"
      subtitle="Generate a clean, printable or copyable chronology for escalation or counsel"
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Top actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#171B25] rounded-xl border border-[#252B38] print:hidden">
          <div className="text-xs text-[#A1A1AA]">
            Formatted printable report ready for submission to Grievance Officers or legal counsel.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-lg bg-[#10131A] border border-[#252B38] text-zinc-300 hover:bg-[#252B38] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Text</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Copy Plaintext</span>
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-600/20"
            >
              <Printer className="w-3.5 h-3.5 text-white" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

        {/* Printable Case Dossier Preview */}
        <div className="p-8 bg-[#171B25] border border-[#252B38] rounded-2xl shadow-xl text-zinc-200 space-y-6 text-xs font-sans print:bg-white print:text-black print:border-none print:p-0">
          {/* Header */}
          <div className="border-b-2 border-blue-500 pb-4 flex items-start justify-between print:border-slate-900">
            <div>
              <div className="text-lg font-black tracking-tight text-[#F8FAFC] print:text-slate-900">
                CLEARPATH CASE DOSSIER
              </div>
              <div className="text-[10px] uppercase font-bold text-blue-400 tracking-wider print:text-slate-500">
                Independent Factual Progress Record • Jurisdiction: India
              </div>
            </div>
            <div className="text-right text-[11px] text-zinc-400 print:text-slate-500">
              <div>Exported: {formatDate(new Date().toISOString())}</div>
              <div className="font-mono text-zinc-500 print:text-slate-400">Ref: {currentCase.id}</div>
            </div>
          </div>

          {/* Overview Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#10131A] rounded-xl border border-[#252B38] text-xs print:bg-slate-50 print:border-slate-200 print:text-black">
            <div>
              <span className="text-zinc-500 uppercase font-bold text-[10px] print:text-slate-400">Case Status</span>
              <p className="font-bold text-[#F8FAFC] capitalize mt-0.5 print:text-slate-900">{currentCase.status.replace(/_/g, ' ')}</p>
            </div>
            <div>
              <span className="text-zinc-500 uppercase font-bold text-[10px] print:text-slate-400">Category</span>
              <p className="font-bold text-[#F8FAFC] capitalize mt-0.5 print:text-slate-900">{currentCase.category.replace(/_/g, ' ')}</p>
            </div>
            <div>
              <span className="text-zinc-500 uppercase font-bold text-[10px] print:text-slate-400">Target Organisation</span>
              <p className="font-bold text-zinc-200 mt-0.5 print:text-slate-900">{currentCase.organisation}</p>
            </div>
            <div>
              <span className="text-zinc-500 uppercase font-bold text-[10px] print:text-slate-400">Reference / Order ID</span>
              <p className="font-mono font-bold text-zinc-200 mt-0.5 print:text-slate-900">{currentCase.order_reference || '—'}</p>
            </div>
          </div>

          {/* Issue Statement */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 border-b border-[#252B38] pb-1 mb-2 print:text-slate-900 print:border-slate-200">
              1. Issue Overview & Factual Statement
            </h4>
            <h5 className="font-bold text-[#F8FAFC] text-sm mb-1 print:text-slate-900">{currentCase.title}</h5>
            <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap print:text-slate-700">{currentCase.description}</p>
          </div>

          {/* Chronological Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 border-b border-[#252B38] pb-1 mb-2 print:text-slate-900 print:border-slate-200">
              2. Chronological Timeline of Recorded Events ({caseEvents.length})
            </h4>
            {caseEvents.length === 0 ? (
              <p className="text-zinc-500 italic print:text-slate-400">No timeline events logged.</p>
            ) : (
              <div className="space-y-2">
                {caseEvents.map((evt) => (
                  <div key={evt.id} className="p-2.5 rounded bg-[#10131A] border border-[#252B38] flex items-start gap-3 print:bg-slate-50 print:border-slate-100">
                    <span className="font-mono text-blue-400 font-bold w-24 shrink-0 print:text-slate-600">
                      {formatDate(evt.event_date)}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#F8FAFC] capitalize print:text-slate-800">
                          {evt.event_type.replace(/_/g, ' ')}
                        </span>
                        {evt.is_verified && (
                          <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 print:text-emerald-700 print:bg-emerald-50 print:border-emerald-200">
                            Verified Source
                          </span>
                        )}
                      </div>
                      <p className="text-zinc-300 mt-0.5 leading-relaxed print:text-slate-600">{evt.description}</p>
                      {evt.source_reference && (
                        <span className="text-[10px] text-zinc-500 font-mono mt-1 block print:text-slate-400">
                          Doc Ref: {evt.source_reference}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Evidence Vault */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 border-b border-[#252B38] pb-1 mb-2 print:text-slate-900 print:border-slate-200">
              3. Evidence Documents on File ({caseEvidence.length})
            </h4>
            <ul className="list-disc list-inside space-y-1 text-zinc-300 print:text-slate-700">
              {caseEvidence.map(ev => (
                <li key={ev.id}>
                  <strong className="text-[#F8FAFC] print:text-slate-900">{ev.file_name}</strong> ({ev.category}) — {ev.description}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Plan */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 border-b border-[#252B38] pb-1 mb-2 print:text-slate-900 print:border-slate-200">
              4. Active Action Plan & Regulatory Checkpoints
            </h4>
            <div className="space-y-2">
              {casePlans.map(p => (
                <div key={p.id} className="p-2.5 rounded bg-[#10131A] border border-[#252B38] print:bg-slate-50 print:border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-[#F8FAFC] print:text-slate-900">
                    <span className="uppercase text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 print:bg-slate-200 print:text-slate-700 print:border-none">
                      {p.approval_status}
                    </span>
                    <span>{p.title}</span>
                  </div>
                  <p className="text-zinc-300 mt-1 print:text-slate-600">{p.suggested_action}</p>
                  {p.source_reference && (
                    <span className="text-[10px] text-blue-400 block mt-1 print:text-teal-700">
                      Statutory Reference: {p.source_reference}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Disclaimers */}
          <div className="pt-4 border-t border-[#252B38] text-[10px] text-zinc-500 leading-relaxed space-y-1 print:border-slate-200 print:text-slate-500">
            <p>
              <strong className="text-zinc-400 print:text-slate-700">Notice:</strong> This document is generated for personal productivity and record-keeping purposes. CLEARPATH is an independent software application and does not provide formal legal representation, attorney services, or official government dispute arbitrations.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
