import React from 'react';
import {
  FolderKanban,
  Clock,
  Sparkles,
  ShieldCheck,
  FileCheck,
  Download,
  Building2,
  BookOpen
} from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: FolderKanban,
      title: 'Dedicated Case Workspaces',
      description: 'Each problem gets its own isolated command center: overview, history, organisation contacts, status flags, and private notes.'
    },
    {
      icon: Clock,
      title: 'Chronological Timeline Tracking',
      description: 'Log every email, support chat, phone promise, and status update. Contrast your personal logs from official written records.'
    },
    {
      icon: Sparkles,
      title: 'Safe AI Drafts & Assistance',
      description: 'Draft polite, firm follow-up emails, identify missing transaction proof, and generate relevant questions to ask support.'
    },
    {
      icon: BookOpen,
      title: 'Verified Indian Process Guides',
      description: 'Step-by-step procedural guides citing the Consumer Protection Act 2019, E-Commerce Rules, and official grievance portals (NCH, e-Jagriti).'
    },
    {
      icon: FileCheck,
      title: 'Confidential Evidence Vault',
      description: 'Upload receipts, job sheets, and tracking screenshots with client-side sensitive data filtering (blocks card numbers and passwords).'
    },
    {
      icon: Download,
      title: 'One-Click Executive Case Export',
      description: 'Generate clean, professional PDF or printable summaries ready to attach to an escalation email or legal consultation.'
    },
    {
      icon: Building2,
      title: 'Small Business Mode',
      description: 'Specialized tracking for vendor non-performance, delayed commercial shipments, advance payment reconciliations, and PO milestones.'
    },
    {
      icon: ShieldCheck,
      title: 'Zero Third-Party Data Selling',
      description: 'Your cases are strictly your private property. We never publish public accusation boards, scrape your data, or claim fake government power.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-[#090B10] border-b border-[#252B38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/25">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight mt-3">
            Engineered for clarity, evidence and progress.
          </h2>
          <p className="mt-4 text-[#A1A1AA] text-base leading-relaxed">
            Everything you need to turn frustrating, open-ended disputes into a structured file that gets taken seriously.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#171B25] border border-[#252B38] hover:border-[#323B4E] hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#10131A] border border-[#252B38] text-blue-400 flex items-center justify-center mb-4 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#F8FAFC] mb-2">
                    {f.title}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
