import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Case, CaseEvent, Evidence } from '../../types';
import {
  Sparkles,
  Copy,
  Check,
  ShieldAlert,
  AlertCircle,
  HelpCircle,
  Plus,
  RefreshCw
} from 'lucide-react';
import { generateAIDemoAssistant, AISuggestionResponse } from '../../utils/aiSimulation';

interface CaseAIAssistantProps {
  currentCase: Case;
  events: CaseEvent[];
  evidenceList: Evidence[];
}

export const CaseAIAssistant: React.FC<CaseAIAssistantProps> = ({
  currentCase,
  events,
  evidenceList
}) => {
  const { addActionPlan } = useApp();
  const [activeTab, setActiveTab] = useState<'summary' | 'draft' | 'missing' | 'questions'>('summary');
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate verified suggestion output
  const aiOutput: AISuggestionResponse = generateAIDemoAssistant(
    currentCase,
    events,
    evidenceList
  );

  const [customDraftBody, setCustomDraftBody] = useState(aiOutput.draftFollowUpMessage.body);
  const [customDraftSubject, setCustomDraftSubject] = useState(aiOutput.draftFollowUpMessage.subject);

  const handleCopyMessage = () => {
    const fullText = `Subject: ${customDraftSubject}\n\n${customDraftBody}`;
    navigator.clipboard.writeText(fullText);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  const handleAcceptAIStep = (step: any) => {
    addActionPlan({
      case_id: currentCase.id,
      title: step.title,
      suggested_action: step.action,
      rationale: step.rationale,
      source_reference: step.sourceTitle,
      source_title: step.sourceTitle,
      source_url: step.sourceUrl,
      approval_status: 'accepted',
      is_ai_generated: true
    });
  };

  const handleRefreshAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 400);
  };

  return (
    <div className="bg-[#10131A] text-[#F8FAFC] rounded-3xl border border-[#252B38] shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#252B38] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[#F8FAFC] tracking-tight">
                AI Resolution Assistant
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Rule-Based Verification Engine
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Factual summarisation, missing evidence checks, and polite communication drafts.
            </p>
          </div>
        </div>

        <button
          onClick={handleRefreshAI}
          disabled={isGenerating}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-[#171B25] hover:bg-[#252B38] text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#252B38]"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin text-blue-400' : ''}`} />
          <span>Re-analyse Case</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 border-b border-[#252B38] pb-3 text-xs">
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            activeTab === 'summary'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-[#A1A1AA] hover:text-white hover:bg-[#171B25]'
          }`}
        >
          Case Summary & Analysis
        </button>

        <button
          onClick={() => setActiveTab('draft')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            activeTab === 'draft'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-[#A1A1AA] hover:text-white hover:bg-[#171B25]'
          }`}
        >
          Draft Follow-Up Email
        </button>

        <button
          onClick={() => setActiveTab('missing')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'missing'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-[#A1A1AA] hover:text-white hover:bg-[#171B25]'
          }`}
        >
          Missing Info Checks
          {aiOutput.missingInformation.length > 0 && (
            <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
              {aiOutput.missingInformation.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('questions')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            activeTab === 'questions'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-[#A1A1AA] hover:text-white hover:bg-[#171B25]'
          }`}
        >
          Questions to Ask Support
        </button>
      </div>

      {/* TAB 1: SUMMARY & NEXT STEPS */}
      {activeTab === 'summary' && (
        <div className="relative z-10 space-y-6">
          <div className="p-4 rounded-2xl bg-[#171B25] border border-[#252B38] space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Executive Case Chronology
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {aiOutput.summary}
            </p>
            <div className="text-[11px] text-zinc-500 pt-1 font-mono">
              {aiOutput.timelineAnalysis}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Suggested Next Steps (Cited from Indian Regulatory Frameworks)
            </h4>

            <div className="space-y-3">
              {aiOutput.suggestedSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#171B25] border border-[#252B38] hover:border-[#3B82F6]/50 transition-all space-y-2 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-bold text-[#F8FAFC] text-sm">
                      {idx + 1}. {step.title}
                    </span>
                    <button
                      onClick={() => handleAcceptAIStep(step)}
                      className="px-2.5 py-1 rounded bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 border border-blue-500/30 font-semibold text-[11px] flex items-center gap-1 transition-colors self-start sm:self-auto"
                    >
                      <Plus className="w-3 h-3" /> Add to Action Plan
                    </button>
                  </div>

                  <p className="text-zinc-300 leading-relaxed">
                    {step.action}
                  </p>

                  <div className="pt-2 border-t border-[#252B38] flex flex-wrap items-center justify-between text-[11px] text-[#A1A1AA] gap-2">
                    <span>
                      <strong className="text-zinc-300">Rationale:</strong> {step.rationale}
                    </span>
                    {step.sourceTitle && (
                      <span className="text-blue-400 font-medium">
                        Source: {step.sourceTitle} ({step.sourceLastChecked || 'Jan 2025'})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DRAFT FOLLOW-UP EMAIL */}
      {activeTab === 'draft' && (
        <div className="relative z-10 space-y-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300 text-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Human Control Guarantee:</strong> CLEARPATH will NEVER send emails or submit forms automatically. Review, edit, and copy the draft below to send directly via your email or company portal.
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A1A1AA] mb-1">
                Draft Subject Line
              </label>
              <input
                type="text"
                value={customDraftSubject}
                onChange={e => setCustomDraftSubject(e.target.value)}
                className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A1A1AA]">
                  Polite & Structured Follow-Up Message
                </label>
                <button
                  onClick={handleCopyMessage}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                >
                  {copiedDraft ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full Email</span>
                    </>
                  )}
                </button>
              </div>
              <textarea
                rows={10}
                value={customDraftBody}
                onChange={e => setCustomDraftBody(e.target.value)}
                className="w-full p-4 bg-[#090B10] border border-[#252B38] rounded-xl text-xs text-zinc-200 font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MISSING INFORMATION CHECKS */}
      {activeTab === 'missing' && (
        <div className="relative z-10 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Factual Completeness Audit
          </h4>

          {aiOutput.missingInformation.length === 0 ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Great job! Your case has all essential transaction references, dates, and evidence attachments.</span>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                The following details are currently missing. Supplying them prevents delays when escalating to company grievance officers or public consumer helplines:
              </p>
              {aiOutput.missingInformation.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#171B25] border border-[#252B38] flex items-start gap-3 text-xs"
                >
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-200 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: RECOMMENDED QUESTIONS */}
      {activeTab === 'questions' && (
        <div className="relative z-10 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Recommended Questions to Ask Support Representatives
          </h4>
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            When speaking to customer care on the phone or in chat, asking specific factual questions prevents vague reassurances:
          </p>

          <div className="space-y-2.5">
            {aiOutput.recommendedQuestions.map((q, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#171B25] border border-[#252B38] text-xs text-zinc-300 flex items-start gap-2.5"
              >
                <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{q}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mandatory Statutory & Operational Disclaimer */}
      <div className="relative z-10 pt-4 border-t border-[#252B38] text-[11px] text-[#A1A1AA] leading-relaxed space-y-1">
        <p>
          <strong className="text-zinc-300">Statutory Notice:</strong> {aiOutput.disclaimer}
        </p>
      </div>
    </div>
  );
};
