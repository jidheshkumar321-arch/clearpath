import React, { useState } from 'react';
import { ShieldCheck, X, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DisclaimerBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const { isDemoMode } = useApp();

  if (dismissed) return null;

  return (
    <aside aria-label="Official platform disclaimers" className="bg-[#10131A] text-[#A1A1AA] text-xs py-2 px-4 border-b border-[#252B38] no-print">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
          </span>
          <p className="leading-snug text-[11px] sm:text-xs">
            <strong className="text-[#F8FAFC] font-medium">Independent Productivity Workspace:</strong> CLEARPATH is an independent organization and timeline workspace. We are <span className="underline decoration-violet-400/50 text-[#F8FAFC]">not</span> a government portal, consumer court, legal representative, or company customer-service department.
            {isDemoMode && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Sample Demonstration Mode Active
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-4 self-end sm:self-auto flex-shrink-0">
          <a
            href="https://consumerhelpline.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:text-violet-300 inline-flex items-center gap-1 font-medium transition-colors text-[11px] sm:text-xs"
          >
            Official NCH Portal <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="text-zinc-500 hover:text-zinc-200 p-0.5 rounded transition-colors"
            title="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
