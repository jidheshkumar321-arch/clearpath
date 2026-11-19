import React from 'react';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  FileKey,
  Database,
  Trash2,
  AlertTriangle
} from 'lucide-react';

export const SecurityPrivacy: React.FC = () => {
  const securityPillars = [
    {
      icon: EyeOff,
      title: 'Data Minimisation by Design',
      description: 'We do not ask for or store payment card numbers, bank passwords, OTPs, or government identity cards (such as Aadhaar or PAN). Client-side filters actively flag sensitive numbers before submission.'
    },
    {
      icon: Lock,
      title: 'Private, Non-Public Storage',
      description: 'Uploaded evidence files are stored in private, access-controlled vaults with strict authorization. No public URLs, search engine indexing, or external sharing links exist.'
    },
    {
      icon: FileKey,
      title: 'Strict User & Workspace Isolation',
      description: 'Every record, timeline event, and document is mapped to your authenticated account ID. Cross-tenant access is prohibited at both application and database layers.'
    },
    {
      icon: Database,
      title: 'Aligned with DPDP Act, 2023',
      description: 'Architected to respect Indian digital privacy norms: transparent purpose limitation, granular audit logging of case interactions, and one-click data export.'
    },
    {
      icon: Trash2,
      title: 'Full Deletion & Portability',
      description: 'You retain complete ownership of your records. You can download your entire case archive in JSON format or trigger an instant, irreversible data purge from settings.'
    },
    {
      icon: AlertTriangle,
      title: 'No False Claims or Magic Guarantees',
      description: 'We do not claim to be "100% unhackable" or represent ourselves as government arbiters. We employ modern cryptographic standards, safe error handling, and strict input sanitization.'
    }
  ];

  return (
    <section id="security-privacy" className="py-20 bg-[#090B10] border-b border-[#252B38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/25">
            Trust & Engineering Rigor
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight mt-3">
            Privacy and security approach
          </h2>
          <p className="mt-4 text-[#A1A1AA] text-base leading-relaxed">
            Personal disputes and commercial vendor records contain sensitive details. We treat confidentiality as a core product constraint, not an afterthought.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#171B25] border border-[#252B38] hover:border-[#323B4E] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#10131A] border border-[#252B38] text-blue-400 flex items-center justify-center mb-4 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#F8FAFC] mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Warning & Notice Banner */}
        <div className="mt-12 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed text-[#A1A1AA]">
            <strong className="text-amber-300">Security Reminder for Users:</strong> CLEARPATH will never ask you for one-time passwords (OTPs), bank login credentials, debit/credit card CVVs, or ATM PINs. If an organisation asks for your passwords during a dispute, cease contact immediately and report fraud to official national helplines (such as Cybercrime Reporting at <span className="font-semibold underline text-amber-200">cybercrime.gov.in</span> / 1930).
          </div>
        </div>
      </div>
    </section>
  );
};
