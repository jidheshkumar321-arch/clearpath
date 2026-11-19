import React from 'react';
import { Logo } from '../common/Logo';
import { useApp } from '../../context/AppContext';
import { ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, signIn } = useApp();

  return (
    <footer className="bg-[#090B10] text-[#A1A1AA] border-t border-[#252B38]">
      {/* Final CTA Banner */}
      <div className="border-b border-[#252B38] py-16 bg-gradient-to-b from-[#10131A] to-[#090B10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
              Ready to take control of your unresolved issues?
            </h2>
            <p className="mt-4 text-base text-[#A1A1AA]">
              Join individuals and small businesses who resolve disputes with organized evidence, clear timelines, and calm progress.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  signIn('demo.user@clearpath.workspace', 'Arjun Mehta', 'individual');
                  setCurrentView('dashboard');
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-[0_0_25px_rgba(59,130,246,0.35)] transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Free Demo Workspace</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => setCurrentView('guides')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#171B25] hover:bg-[#1E2430] text-[#F8FAFC] font-semibold text-base border border-[#252B38] transition-all"
              >
                Browse Indian Process Guides
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <Logo size="md" withTagline={true} />
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              CLEARPATH is an independent personal and small-business issue-resolution workspace. Organise unresolved problems, maintain evidence and timelines, and track progress calmly.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Independent & Confidential</span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC] mb-4">
              Product & Workspaces
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A1A1AA]">
              <li>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="hover:text-[#F8FAFC] transition-colors"
                >
                  Interactive Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('cases')}
                  className="hover:text-[#F8FAFC] transition-colors"
                >
                  Case Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('business')}
                  className="hover:text-[#F8FAFC] transition-colors"
                >
                  Small Business Workspace
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('reminders')}
                  className="hover:text-[#F8FAFC] transition-colors"
                >
                  Follow-Up Reminders
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('documents')}
                  className="hover:text-[#F8FAFC] transition-colors"
                >
                  Private Evidence Vault
                </button>
              </li>
            </ul>
          </div>

          {/* Process Guides & References */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC] mb-4">
              Process Guides (India)
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A1A1AA]">
              <li>
                <button
                  onClick={() => setCurrentView('guides')}
                  className="hover:text-[#F8FAFC] transition-colors text-left"
                >
                  Delayed Online Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('guides')}
                  className="hover:text-[#F8FAFC] transition-colors text-left"
                >
                  Banking & UPI Refund Follow-Up
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('guides')}
                  className="hover:text-[#F8FAFC] transition-colors text-left"
                >
                  Warranty & Authorized Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('guides')}
                  className="hover:text-[#F8FAFC] transition-colors text-left"
                >
                  Service Provider Outages
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('guides')}
                  className="hover:text-[#F8FAFC] transition-colors text-left"
                >
                  B2B Supplier Non-Performance
                </button>
              </li>
            </ul>
          </div>

          {/* Official Portals & Legal Disclaimers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC] mb-4">
              Official Reference Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A1A1AA]">
              <li>
                <a
                  href="https://consumerhelpline.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
                >
                  National Consumer Helpline <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://e-jagriti.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
                >
                  e-Jagriti (Consumer Courts) <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://pgportal.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
                >
                  CPGRAMS Public Grievance <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://cybercrime.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
                >
                  National Cybercrime Reporting <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Legal Disclaimer Bar */}
        <div className="mt-12 pt-8 border-t border-[#252B38] text-xs text-[#A1A1AA] leading-relaxed">
          <p className="mb-3">
            <strong className="text-zinc-200">Legal & Operational Notice:</strong> CLEARPATH is an independent productivity software application and informational repository. CLEARPATH is NOT a government entity, court of law, statutory grievance authority, or company customer-support portal. Use of CLEARPATH does not constitute legal representation, legal advice, or the filing of a formal legal complaint before any judicial or quasi-judicial forum. Official links are provided strictly for informational convenience without endorsement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px] pt-4 border-t border-[#252B38]/60">
            <div>
              © {new Date().getFullYear()} CLEARPATH Technologies. All rights reserved. Initial Launch Market: India.
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentView('settings')}
                className="hover:text-zinc-300 transition-colors"
              >
                Privacy Policy (Draft)
              </button>
              <span>•</span>
              <button
                onClick={() => setCurrentView('settings')}
                className="hover:text-zinc-300 transition-colors"
              >
                Terms of Service (Draft)
              </button>
              <span>•</span>
              <button
                onClick={() => setCurrentView('settings')}
                className="hover:text-zinc-300 transition-colors"
              >
                AI Disclosures
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
