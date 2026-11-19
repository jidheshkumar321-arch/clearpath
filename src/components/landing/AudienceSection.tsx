import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, Building, Check, ArrowRight } from 'lucide-react';

export const AudienceSection: React.FC = () => {
  const { setCurrentView, signIn } = useApp();

  return (
    <section className="py-20 bg-[#10131A] border-b border-[#252B38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/25">
            Tailored Workspaces
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight mt-3">
            Built for individuals and small businesses
          </h2>
          <p className="mt-4 text-[#A1A1AA] text-base leading-relaxed">
            Whether you are resolving an individual consumer purchase or managing commercial vendor commitments, CLEARPATH fits your operational context.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* For Individuals */}
          <div id="individuals" className="bg-[#171B25] rounded-3xl p-8 border border-[#252B38] shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#F8FAFC]">For Individuals</h3>
                    <p className="text-xs text-[#A1A1AA]">Personal consumer grievances & purchases</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  Consumer Protection
                </span>
              </div>

              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                Never get pushed around by automated bots or evasive customer care agents. Keep your receipts, dates, and ticket references structured in an indisputable file.
              </p>

              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <span className="w-5 h-5 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/30">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <strong className="text-[#F8FAFC]">E-Commerce Delays & Lost Packages:</strong> Trace courier tracking stalls and enforce 48h grievance officer rules.
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <span className="w-5 h-5 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/30">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <strong className="text-[#F8FAFC]">Pending Banking & UPI Refunds:</strong> Request and record mandatory Acquirer Reference Numbers (ARN) and UTRs.
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <span className="w-5 h-5 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/30">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <strong className="text-[#F8FAFC]">Defective Hardware & Warranty:</strong> Maintain service job sheets, defect logs, and spare part delay timeframes.
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <span className="w-5 h-5 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/30">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <strong className="text-[#F8FAFC]">Direct Links to Official Portals:</strong> Convenient links to National Consumer Helpline (NCH) and e-Jagriti.
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                signIn('consumer@clearpath.workspace', 'Arjun Mehta', 'individual');
                setCurrentView('dashboard');
              }}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(59,130,246,0.25)]"
            >
              <span>Start Personal Workspace</span>
              <ArrowRight className="w-4 h-4 text-blue-200" />
            </button>
          </div>

          {/* For Small Businesses */}
          <div id="businesses" className="bg-[#171B25] rounded-3xl p-8 border border-[#252B38] shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#F8FAFC]">For Small Businesses</h3>
                    <p className="text-xs text-[#A1A1AA]">Commercial vendor, SaaS & supplier operations</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  B2B Operations
                </span>
              </div>

              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                Maintain strict commercial accountability when suppliers delay inventory, service providers fail SLAs, or billing disputes threaten your cash flow.
              </p>

              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-500/30">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <strong className="text-[#F8FAFC]">Supplier & Packaging Delays:</strong> Track signed PO delivery milestones, advance payment transfers, and revised dates.
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-500/30">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <strong className="text-[#F8FAFC]">B2B SaaS & Tech Service Failures:</strong> Document uptime breaches, unexpected subscription charges, and support tickets.
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-500/30">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <strong className="text-[#F8FAFC]">Commercial Demand Notices:</strong> Draft polite, contractual follow-up notices referencing purchase order numbers.
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-500/30">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <strong className="text-[#F8FAFC]">Exportable Commercial Briefs:</strong> One-click case files for internal reviews, accountants, or commercial counsel.
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                signIn('business@clearpath.workspace', 'Mehta Artisan Goods', 'business');
                setCurrentView('business');
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#10131A] hover:bg-[#1E2430] text-[#F8FAFC] border border-[#252B38] font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-soft"
            >
              <span>Explore Small Business Mode</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
