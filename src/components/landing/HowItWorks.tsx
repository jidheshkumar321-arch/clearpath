import React from 'react';
import {
  FolderPlus,
  CalendarDays,
  Sparkles,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: FolderPlus,
      title: 'Log the Problem & Key Dates',
      description: 'Select your issue type (delivery, refund, warranty, supplier delay), record the organisation name, reference ID, and what has happened so far.'
    },
    {
      step: '02',
      icon: CalendarDays,
      title: 'Maintain Chronological Events & Evidence',
      description: 'Store invoices, receipts, chat snippets, and track each interaction date. Clearly separate your observations from official records.'
    },
    {
      step: '03',
      icon: Sparkles,
      title: 'Review Action Plans & AI Drafts',
      description: 'Get verified procedural next steps citing published guidelines (e.g. E-Commerce Rules, RBI TAT, NCH). Generate polite, firm follow-up drafts for review.'
    },
    {
      step: '04',
      icon: CheckCircle,
      title: 'Track Follow-Ups to Resolution',
      description: 'Set automated reminders for promised turnaround times (SLA). Export an executive PDF summary if escalation to higher authorities is needed.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#10131A] border-b border-[#252B38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/25">
            Process Overview
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight mt-3">
            How CLEARPATH works
          </h2>
          <p className="mt-4 text-[#A1A1AA] text-base leading-relaxed">
            A disciplined, 4-step framework that replaces emotional friction with organized clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(s => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="bg-[#171B25] rounded-2xl p-6 border border-[#252B38] shadow-soft relative flex flex-col justify-between group hover:border-blue-500/50 hover:shadow-card transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-zinc-500 group-hover:text-blue-400 transition-colors">
                      STEP {s.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#10131A] group-hover:bg-blue-500/10 border border-[#252B38] text-zinc-400 group-hover:text-blue-400 flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-[#F8FAFC] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#252B38] text-[11px] font-semibold text-blue-400 flex items-center gap-1">
                  <span>Structured standard</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
