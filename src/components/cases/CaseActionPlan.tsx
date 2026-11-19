import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Case, ActionPlan } from '../../types';
import {
  CheckCircle2,
  ExternalLink,
  Plus,
  BookOpen,
  Sparkles,
  Check,
  RotateCcw
} from 'lucide-react';
import { Modal } from '../common/Modal';

interface CaseActionPlanProps {
  currentCase: Case;
  actionPlans: ActionPlan[];
}

export const CaseActionPlan: React.FC<CaseActionPlanProps> = ({ currentCase, actionPlans }) => {
  const { addActionPlan, updateActionPlanStatus } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [suggestedAction, setSuggestedAction] = useState('');
  const [rationale, setRationale] = useState('');
  const [sourceReference, setSourceReference] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');

  const casePlans = actionPlans.filter(p => p.case_id === currentCase.id);

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !suggestedAction.trim()) return;

    addActionPlan({
      case_id: currentCase.id,
      title: title.trim(),
      suggested_action: suggestedAction.trim(),
      rationale: rationale.trim(),
      source_reference: sourceReference.trim() || undefined,
      source_title: sourceReference.trim() || undefined,
      source_url: sourceUrl.trim() || undefined,
      approval_status: 'accepted',
      is_ai_generated: false
    });

    setTitle('');
    setSuggestedAction('');
    setRationale('');
    setSourceReference('');
    setSourceUrl('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="bg-[#10131A] rounded-2xl border border-[#252B38] p-6 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-violet-400" />
            <h3 className="text-base font-bold text-[#F8FAFC]">
              Action Plan & Next Steps
            </h3>
          </div>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            Verified escalation checkpoints and user-approved resolution milestones.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-3.5 h-3.5 text-white" />
          <span>Add Custom Action Step</span>
        </button>
      </div>

      {casePlans.length === 0 ? (
        <div className="py-8 text-center text-xs text-zinc-500 italic">
          No action steps formulated yet. Use the AI Assistant or click "Add Custom Action Step".
        </div>
      ) : (
        <div className="space-y-4">
          {casePlans.map(plan => {
            const isCompleted = plan.approval_status === 'completed';
            const isAccepted = plan.approval_status === 'accepted';
            const isRejected = plan.approval_status === 'rejected';

            return (
              <div
                key={plan.id}
                className={`p-5 rounded-xl border transition-all ${
                  isCompleted
                    ? 'bg-[#171B25]/60 border-[#252B38] opacity-75'
                    : isRejected
                    ? 'bg-[#171B25]/40 border-[#252B38] opacity-60'
                    : isAccepted
                    ? 'bg-[#171B25] border-violet-500/40 shadow-sm'
                    : 'bg-[#171B25] border-[#252B38]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                        isCompleted
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : isAccepted
                          ? 'bg-violet-500/10 text-violet-400 border-violet-500/20'
                          : isRejected
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          : 'bg-[#10131A] text-zinc-300 border-[#252B38]'
                      }`}
                    >
                      {plan.approval_status}
                    </span>

                    {plan.is_ai_generated && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
                        <Sparkles className="w-3 h-3" /> AI Recommendation
                      </span>
                    )}
                  </div>

                  {/* Status Action Buttons */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs">
                    {!isCompleted && !isRejected && (
                      <button
                        onClick={() => updateActionPlanStatus(plan.id, 'completed')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1 transition-colors text-[11px]"
                      >
                        <Check className="w-3 h-3" /> Mark Done
                      </button>
                    )}

                    {!isAccepted && !isCompleted && !isRejected && (
                      <button
                        onClick={() => updateActionPlanStatus(plan.id, 'accepted')}
                        className="px-2 py-1 rounded-lg bg-violet-500/15 hover:bg-violet-500/25 text-violet-400 border border-violet-500/30 font-semibold text-[11px] transition-colors"
                      >
                        Accept Step
                      </button>
                    )}

                    {!isRejected && !isCompleted && (
                      <button
                        onClick={() => updateActionPlanStatus(plan.id, 'rejected')}
                        className="px-2 py-1 rounded-lg bg-[#10131A] hover:bg-rose-500/10 hover:text-rose-400 text-zinc-400 font-semibold text-[11px] border border-[#252B38] transition-colors"
                      >
                        Reject
                      </button>
                    )}

                    {(isCompleted || isRejected) && (
                      <button
                        onClick={() => updateActionPlanStatus(plan.id, 'accepted')}
                        className="px-2 py-1 rounded-lg bg-[#10131A] hover:bg-[#252B38] text-zinc-300 font-semibold text-[11px] flex items-center gap-1 border border-[#252B38] transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" /> Reopen Step
                      </button>
                    )}
                  </div>
                </div>

                <h4 className={`text-sm font-bold ${isCompleted ? 'line-through text-zinc-500' : 'text-[#F8FAFC]'}`}>
                  {plan.title}
                </h4>

                <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                  {plan.suggested_action}
                </p>

                {plan.rationale && (
                  <p className="text-[11px] text-zinc-400 mt-2 italic bg-[#10131A] p-2.5 rounded border border-[#252B38]">
                    <strong className="text-zinc-300 not-italic">Procedural Rationale:</strong> {plan.rationale}
                  </p>
                )}

                {plan.source_reference && (
                  <div className="mt-3 pt-2 border-t border-[#252B38] flex items-center justify-between text-[11px] text-[#A1A1AA]">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-violet-400" />
                      Ref: {plan.source_reference}
                    </span>
                    {plan.source_url && (
                      <a
                        href={plan.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-400 hover:underline font-semibold flex items-center gap-1"
                      >
                        View Authority <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add Custom Action Step Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Custom Action Plan Step"
        subtitle="Formulate an upcoming operational action for this case"
      >
        <form onSubmit={handleCreatePlan} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              Step Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Issue Formal Written Notice to Principal Nodal Officer"
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              Action Description
            </label>
            <textarea
              rows={3}
              required
              value={suggestedAction}
              onChange={e => setSuggestedAction(e.target.value)}
              placeholder="e.g. Send chronological timeline to nodal officer giving 72 hours to reconcile the pending transaction before registering a complaint on NCH..."
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              Contractual or Statutory Rationale (Optional)
            </label>
            <input
              type="text"
              value={rationale}
              onChange={e => setRationale(e.target.value)}
              placeholder="e.g. Rule 5(4) of E-Commerce Rules or agreed PO Clause 12"
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
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
              Add Step to Workspace
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
