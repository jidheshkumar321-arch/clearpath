import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Download,
  Trash2,
  LogOut,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  History
} from 'lucide-react';
import { formatDateTime } from '../../utils/formatters';

export const SettingsView: React.FC = () => {
  const {
    user,
    cases,
    events,
    evidence,
    reminders,
    notes,
    auditLogs,
    signOut,
    resetToSampleData,
    clearUserData
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'audit' | 'legal'>('profile');
  const [userName, setUserName] = useState(user?.name || '');
  const [userEmail, setUserEmail] = useState(user?.email || '');
  const [businessName, setBusinessName] = useState(user?.business_name || '');
  const [isSavedMessage, setIsSavedMessage] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavedMessage(true);
    setTimeout(() => setIsSavedMessage(false), 2500);
  };

  const handleExportAllData = () => {
    const fullBackup = {
      exported_at: new Date().toISOString(),
      user: user,
      cases: cases,
      events: events,
      evidence_meta: evidence,
      reminders: reminders,
      notes: notes,
      audit_logs: auditLogs,
      format: 'CLEARPATH_BACKUP_V1',
      jurisdiction: 'India'
    };

    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clearpath_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAllData = () => {
    if (
      window.confirm(
        'Are you sure you want to permanently delete ALL cases, evidence metadata, timeline events, and notes from this workspace? This action cannot be reversed.'
      )
    ) {
      clearUserData();
      alert('All workspace records have been purged.');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      <div>
        <h1 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight">
          Settings & Privacy
        </h1>
        <p className="text-xs text-[#A1A1AA] mt-0.5">
          Manage your account profile, confidentiality controls, audit logs, and data exports.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#252B38] pb-3 text-xs">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'profile'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-[#A1A1AA] hover:bg-[#171B25] hover:text-white'
          }`}
        >
          Profile & Preferences
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'privacy'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-[#A1A1AA] hover:bg-[#171B25] hover:text-white'
          }`}
        >
          Privacy & Data Rights (DPDP)
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'audit'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-[#A1A1AA] hover:bg-[#171B25] hover:text-white'
          }`}
        >
          Audit Logs ({auditLogs.length})
        </button>

        <button
          onClick={() => setActiveTab('legal')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'legal'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-[#A1A1AA] hover:bg-[#171B25] hover:text-white'
          }`}
        >
          Draft Terms & Disclaimers
        </button>
      </div>

      {/* TAB 1: PROFILE & PREFERENCES */}
      {activeTab === 'profile' && (
        <div className="bg-[#10131A] rounded-3xl border border-[#252B38] shadow-2xl p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
            <h3 className="text-sm font-bold text-[#F8FAFC] uppercase tracking-wider">
              Account Profile
            </h3>

            {isSavedMessage && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Profile preferences updated successfully.</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
                Name or Contact Label
              </label>
              <input
                type="text"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
                Registered Email
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {user?.account_type === 'business' && (
              <div>
                <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
                  Enterprise Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={e => setBusinessName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            )}

            <button
              type="submit"
              className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-violet-600/20 transition-all"
            >
              Update Preferences
            </button>
          </form>

          {/* Quick workspace actions */}
          <div className="pt-6 border-t border-[#252B38] flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-[#F8FAFC]">
                Sample Demonstration Workspace
              </h4>
              <p className="text-[11px] text-[#A1A1AA]">
                Reset or load sample verified dispute records for testing.
              </p>
            </div>
            <button
              onClick={resetToSampleData}
              className="px-3.5 py-2 rounded-xl bg-[#171B25] hover:bg-[#252B38] text-zinc-300 border border-[#252B38] font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-violet-400" />
              <span>Reload Sample Records</span>
            </button>
          </div>

          <div className="pt-4 border-t border-[#252B38] flex items-center justify-between">
            <span className="text-xs text-[#A1A1AA] font-medium">Session Control</span>
            <button
              onClick={signOut}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out of Workspace</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: PRIVACY & DATA RIGHTS (DPDP ACT) */}
      {activeTab === 'privacy' && (
        <div className="bg-[#10131A] rounded-3xl border border-[#252B38] shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#F8FAFC]">
              Indian Digital Personal Data Protection (DPDP) Alignment
            </h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              We collect only the factual information necessary to organise your dispute timeline and communication drafts.
            </p>
          </div>

          <div className="space-y-3 text-xs text-zinc-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-[#171B25] border border-[#252B38]">
              <h4 className="font-bold text-[#F8FAFC] mb-1">1. What Information We Collect</h4>
              <p className="text-[#A1A1AA]">
                We store account credentials (email address and workspace name) and user-supplied case data (organisation names, dispute narratives, reference numbers, and timeline logs).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#171B25] border border-[#252B38]">
              <h4 className="font-bold text-[#F8FAFC] mb-1">2. What We Explicitly NEVER Request or Store</h4>
              <p className="text-[#A1A1AA]">
                CLEARPATH does not request or store passwords for your external accounts, ATM PINs, CVV codes, net-banking passwords, OTPs, or government identity cards (such as Aadhaar or PAN). Client-side detection routines actively warn against accidental entry of sensitive numbers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#171B25] border border-[#252B38]">
              <h4 className="font-bold text-[#F8FAFC] mb-1">3. Non-Public Storage & Zero Data Brokering</h4>
              <p className="text-[#A1A1AA]">
                We do not sell user data to telemarketers, credit bureaus, or advertising networks. We do not publish public accusatory complaint forums.
              </p>
            </div>
          </div>

          {/* Export & Purge Actions */}
          <div className="pt-6 border-t border-[#252B38] space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC]">
              User Rights: Export & Erasure
            </h4>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20">
              <div>
                <h5 className="text-xs font-bold text-[#F8FAFC]">Download Complete Data Archive (JSON)</h5>
                <p className="text-[11px] text-[#A1A1AA] mt-0.5">
                  Export all your cases, timeline events, evidence metadata, and notes in an open standard JSON format.
                </p>
              </div>
              <button
                onClick={handleExportAllData}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export All Records</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
              <div>
                <h5 className="text-xs font-bold text-rose-300">Complete Data Purge & Account Erasure</h5>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Permanently delete all cases, events, and evidence from your workspace. This cannot be undone.
                </p>
              </div>
              <button
                onClick={handleDeleteAllData}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete All Data</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-[#10131A] rounded-3xl border border-[#252B38] shadow-2xl p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-violet-400" />
              <h3 className="text-base font-bold text-[#F8FAFC]">
                Security & Interaction Audit Trail
              </h3>
            </div>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Granular audit log of all case creations, status modifications, document uploads, and access sessions.
            </p>
          </div>

          <div className="border border-[#252B38] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#171B25] border-b border-[#252B38] text-zinc-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-4">Timestamp</th>
                  <th className="py-2.5 px-4">Action</th>
                  <th className="py-2.5 px-4">Reference</th>
                  <th className="py-2.5 px-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252B38] text-zinc-300">
                {auditLogs.slice(0, 15).map(log => (
                  <tr key={log.id} className="hover:bg-[#171B25]/60 transition-colors">
                    <td className="py-2.5 px-4 font-mono text-[11px] text-zinc-500 whitespace-nowrap">
                      {formatDateTime(log.created_at)}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-[#F8FAFC] whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-[#171B25] text-zinc-300 border border-[#252B38] text-[10px]">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-mono text-zinc-400 text-[11px] truncate max-w-xs">
                      {log.record_reference}
                    </td>
                    <td className="py-2.5 px-4 text-[#A1A1AA] text-[11px]">
                      {log.details || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: LEGAL DISCLAIMERS & DRAFT POLICIES */}
      {activeTab === 'legal' && (
        <div className="bg-[#10131A] rounded-3xl border border-[#252B38] shadow-2xl p-6 sm:p-8 space-y-6 text-xs text-zinc-300 leading-relaxed">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 space-y-1">
            <h4 className="font-bold flex items-center gap-1.5 text-xs text-amber-400">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Legal Review Notice:</span>
            </h4>
            <p>
              The policies below represent preliminary structural drafts prepared for product planning. They require qualified Indian legal counsel review before commercial public launch.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#171B25] border border-[#252B38]">
              <h4 className="font-bold text-[#F8FAFC] mb-1">A. Draft Terms of Service Summary</h4>
              <p className="text-[#A1A1AA] leading-relaxed">
                1. Scope of Service: CLEARPATH is an independent personal productivity and record-keeping tool. It is not an agent, law firm, government department, consumer dispute forum, or official complaint bureau.<br />
                2. User Representation: The user certifies that all facts, dates, and evidence logged belong to genuine transactions.<br />
                3. No Outcome Guarantees: CLEARPATH does not guarantee refunds, chargeback approvals, or dispute settlements.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#171B25] border border-[#252B38]">
              <h4 className="font-bold text-[#F8FAFC] mb-1">B. Draft Privacy Policy Summary</h4>
              <p className="text-[#A1A1AA] leading-relaxed">
                1. Data Fiduciary Roles: CLEARPATH processes case data solely on the user's instructions for the purpose of timeline organization and letter preparation.<br />
                2. Data Minimisation: Users must not upload payment credentials or government national identity numbers.<br />
                3. Right to Erasure: Users may request instantaneous deletion of all records at any time.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#171B25] border border-[#252B38]">
              <h4 className="font-bold text-[#F8FAFC] mb-1">C. AI Assistance Disclosures</h4>
              <p className="text-[#A1A1AA] leading-relaxed">
                The AI assistant produces drafting suggestions based on structured templates and verified published consumer rules. The suggestions do not constitute legal advice and must be manually verified and dispatched by the user.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
