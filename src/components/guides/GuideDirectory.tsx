import React, { useState } from 'react';
import { PROCESS_GUIDES, OFFICIAL_SOURCES } from '../../data/guideContent';
import { ProcessGuide } from '../../types';
import {
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const GuideDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<ProcessGuide | null>(null);

  const filteredGuides = PROCESS_GUIDES.filter(
    g =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.what_it_means.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#10131A] via-[#171B25] to-[#10131A] border border-[#252B38] rounded-3xl p-6 sm:p-8 text-[#F8FAFC] shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-semibold border border-violet-500/20">
            <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
            <span>Verified Indian Consumer & Business Frameworks</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F8FAFC]">
            Process & Escalation Guides (India)
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-sans">
            Independent procedural roadmaps citing published provisions under the Consumer Protection Act, 2019, E-Commerce Rules, and official government dispute redressal systems.
          </p>
        </div>
        <div className="absolute right-0 top-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Mandatory Statutory Notice */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1">
        <div className="flex items-center gap-2 font-bold text-amber-400">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>General Informational Guidance Only:</span>
        </div>
        <p className="leading-relaxed">
          The guides presented below summarize publicly available procedural information and statutory frameworks. CLEARPATH does not provide legal representation or formal legal advice. For formal judicial complaints or litigation, consult an advocate qualified in your jurisdiction.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search guides by topic (e.g. refund, courier delay, warranty, supplier)..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-xs sm:text-sm text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
        />
      </div>

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map(guide => (
          <div
            key={guide.id}
            onClick={() => setSelectedGuide(guide)}
            className="bg-[#171B25] rounded-2xl border border-[#252B38] hover:border-[#8B5CF6]/50 p-6 flex flex-col justify-between cursor-pointer group transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  {guide.badge}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  Checked {guide.last_reviewed_at}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-violet-400 transition-colors">
                {guide.title}
              </h3>

              <p className="text-xs text-[#A1A1AA] line-clamp-3 leading-relaxed">
                {guide.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#252B38] flex items-center justify-between text-xs text-violet-400 font-semibold">
              <span>View Step-by-Step Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Official Portals Directory */}
      <div className="bg-[#10131A] rounded-3xl border border-[#252B38] shadow-2xl p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#F8FAFC]">
            Official Indian Grievance & Redressal Directories
          </h2>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            Verified links to primary statutory portals. CLEARPATH has no official affiliation or endorsement with these entities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OFFICIAL_SOURCES.map(source => (
            <div
              key={source.id}
              className="p-5 rounded-2xl bg-[#171B25] border border-[#252B38] space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-[#F8FAFC]">
                    {source.title}
                  </h3>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 hover:text-violet-300 p-1 transition-colors"
                    title="Open official site"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-[11px] text-zinc-400 font-medium mt-0.5">
                  Publisher: {source.publisher}
                </p>
                <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                  {source.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#252B38] text-[10px] text-zinc-500">
                <span>{source.official_disclaimer}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guide Detail Modal */}
      {selectedGuide && (
        <Modal
          isOpen={!!selectedGuide}
          onClose={() => setSelectedGuide(null)}
          title={selectedGuide.title}
          subtitle={`Verified Indian Procedure Guide • Last checked: ${selectedGuide.last_reviewed_at}`}
          maxWidth="4xl"
        >
          <div className="space-y-6 text-xs text-zinc-300">
            {/* What this issue means */}
            <div className="p-4 rounded-xl bg-[#171B25] border border-[#252B38] space-y-1.5">
              <h4 className="font-bold text-violet-400 uppercase text-[11px] tracking-wider">
                What this issue means
              </h4>
              <p className="leading-relaxed text-zinc-300">
                {selectedGuide.what_it_means}
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-2">
              <h4 className="font-bold text-[#F8FAFC] uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-violet-400" />
                Information You Should Collect Before Proceeding
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedGuide.key_checklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#171B25] border border-[#252B38] flex items-start gap-2"
                  >
                    <span className="w-4 h-4 rounded-full bg-violet-500/20 text-violet-400 text-[10px] flex items-center justify-center shrink-0 font-bold mt-0.5">
                      ✓
                    </span>
                    <span className="text-zinc-200 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-step first steps */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#F8FAFC] uppercase text-[11px] tracking-wider">
                Recommended Step-by-Step Procedure
              </h4>
              <div className="space-y-2.5">
                {selectedGuide.first_steps.map(s => (
                  <div
                    key={s.step}
                    className="p-3.5 rounded-xl border border-[#252B38] bg-[#171B25] space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-violet-600 text-white font-bold text-[10px]">
                        STEP {s.step}
                      </span>
                      <h5 className="font-bold text-[#F8FAFC] text-xs">
                        {s.title}
                      </h5>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                      {s.description}
                    </p>
                    <div className="text-[11px] text-violet-300 font-medium bg-violet-500/10 border border-violet-500/20 p-2 rounded">
                      💡 <strong>Pro Tip:</strong> {s.tips}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Escalation path */}
            <div className="space-y-3">
              <h4 className="font-bold text-rose-400 uppercase text-[11px] tracking-wider">
                What to do if initial steps do not work (Escalation Path)
              </h4>
              <div className="space-y-2.5">
                {selectedGuide.escalation_path.map((esc, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#F8FAFC]">
                        {esc.authority}
                      </span>
                      {esc.url && (
                        <a
                          href={esc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-400 font-semibold hover:underline flex items-center gap-1 text-[11px]"
                        >
                          Official Portal <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <p className="text-zinc-300 text-xs">
                      {esc.portal_name}
                    </p>
                    <p className="text-[11px] text-[#A1A1AA]">
                      <strong>When to use:</strong> {esc.when_to_use}
                    </p>
                    <p className="text-[10px] text-zinc-500 italic">
                      {esc.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Source Citations */}
            <div className="pt-3 border-t border-[#252B38] flex flex-wrap items-center justify-between gap-2 text-[10px] text-zinc-500">
              <span>
                Citations: {selectedGuide.official_sources.map(s => s.name).join(', ')}
              </span>
              <span className="font-mono">Verified: {selectedGuide.last_reviewed_at}</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
