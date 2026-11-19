import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FolderKanban,
  Clock,
  AlertCircle,
  CheckCircle2,
  PlusCircle,
  BookOpen,
  ArrowRight,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { formatDate, getStatusDetails, getCategoryDetails } from '../../utils/formatters';

export const DashboardOverview: React.FC = () => {
  const {
    user,
    cases,
    reminders,
    setCurrentView,
    openCaseWorkspace,
    toggleReminder,
    resetToSampleData
  } = useApp();

  const activeCases = cases.filter(
    c => c.status !== 'resolved' && c.status !== 'closed_by_user'
  );
  const waitingResponseCases = cases.filter(
    c => c.status === 'waiting_for_response'
  );
  const followUpNeededCases = cases.filter(
    c => c.status === 'follow_up_needed'
  );
  const resolvedCases = cases.filter(
    c => c.status === 'resolved' || c.status === 'closed_by_user'
  );

  const pendingReminders = reminders
    .filter(r => !r.completed)
    .sort((a, b) => new Date(a.reminder_date).getTime() - new Date(b.reminder_date).getTime())
    .slice(0, 4);

  const recentlyUpdatedCases = [...cases]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#10131A] via-[#171B25] to-[#10131A] rounded-3xl p-6 sm:p-8 text-[#F8FAFC] border border-[#252B38] relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Personal & Business Resolution Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F8FAFC]">
              Welcome back, {user?.name || 'Workspace User'}
            </h1>
            <p className="text-sm text-[#A1A1AA] max-w-2xl leading-relaxed">
              Your issue. Your plan. Your progress. Keep your timelines and factual records organized calmly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentView('create-case')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              <span>Create New Case</span>
            </button>
            <button
              onClick={() => setCurrentView('guides')}
              className="px-4 py-2.5 rounded-xl bg-[#171B25] hover:bg-[#252B38] text-zinc-200 font-semibold text-sm border border-[#252B38] transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Process Guides</span>
            </button>
          </div>
        </div>

        {/* Ambient subtle glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div
          onClick={() => setCurrentView('cases')}
          className="bg-[#171B25] p-5 rounded-2xl border border-[#252B38] hover:border-[#3B82F6]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
              Active Cases
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#F8FAFC]">
            {activeCases.length}
          </div>
          <div className="mt-2 text-xs text-[#A1A1AA] flex items-center gap-1">
            <span>Total cases in workspace: {cases.length}</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => setCurrentView('cases')}
          className="bg-[#171B25] p-5 rounded-2xl border border-[#252B38] hover:border-amber-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
              Awaiting Response
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-400">
            {waitingResponseCases.length}
          </div>
          <div className="mt-2 text-xs text-[#A1A1AA]">
            Pending organisation turnarounds
          </div>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => setCurrentView('reminders')}
          className="bg-[#171B25] p-5 rounded-2xl border border-[#252B38] hover:border-rose-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
              Follow-Up Needed
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-rose-400">
            {followUpNeededCases.length}
          </div>
          <div className="mt-2 text-xs text-[#A1A1AA]">
            Cases past committed SLA dates
          </div>
        </div>

        {/* Metric 4 */}
        <div
          onClick={() => setCurrentView('cases')}
          className="bg-[#171B25] p-5 rounded-2xl border border-[#252B38] hover:border-emerald-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
              Resolved Cases
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">
            {resolvedCases.length}
          </div>
          <div className="mt-2 text-xs text-[#A1A1AA]">
            Completed or user-closed
          </div>
        </div>
      </div>

      {/* Main Grid: Recently Updated Cases & Upcoming Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recently Updated Cases */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#F8FAFC]">
                Recently Updated Cases
              </h2>
              <p className="text-xs text-[#A1A1AA]">
                Active dispute files and timeline milestones
              </p>
            </div>
            <button
              onClick={() => setCurrentView('cases')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <span>View all cases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentlyUpdatedCases.length === 0 ? (
            /* Empty State */
            <div className="bg-[#171B25] rounded-2xl border border-[#252B38] p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mx-auto flex items-center justify-center">
                <FolderKanban className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F8FAFC]">No cases found</h3>
                <p className="text-xs text-[#A1A1AA] mt-1 max-w-sm mx-auto">
                  You haven't logged any unresolved issues yet. Create your first case or load sample records to test the workspace.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setCurrentView('create-case')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Create First Case
                </button>
                <button
                  onClick={resetToSampleData}
                  className="px-4 py-2 bg-[#10131A] text-zinc-300 border border-[#252B38] rounded-xl text-xs font-semibold hover:bg-[#1E2430] transition-colors"
                >
                  Load Sample Cases
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {recentlyUpdatedCases.map(c => {
                const status = getStatusDetails(c.status);
                const category = getCategoryDetails(c.category);

                return (
                  <div
                    key={c.id}
                    onClick={() => openCaseWorkspace(c.id)}
                    className="bg-[#171B25] rounded-2xl p-5 border border-[#252B38] hover:border-[#3B82F6]/50 transition-all cursor-pointer group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${status.bg} ${status.text} ${status.border}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                          {status.label}
                        </span>

                        <span className="text-xs font-medium text-zinc-300 bg-[#10131A] border border-[#252B38] px-2.5 py-0.5 rounded-md">
                          {category.label}
                        </span>

                        {c.is_sample && (
                          <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                            Sample Demo Case
                          </span>
                        )}
                      </div>

                      <span className="text-xs text-zinc-500 font-medium">
                        Updated {formatDate(c.updated_at)}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-blue-400 transition-colors">
                      {c.title}
                    </h3>

                    <p className="text-xs text-[#A1A1AA] line-clamp-2 mt-1.5 leading-relaxed">
                      {c.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#252B38] flex flex-wrap items-center justify-between text-xs text-[#A1A1AA] gap-2">
                      <div className="flex items-center gap-4">
                        <span>
                          Target: <strong className="text-[#F8FAFC] font-medium">{c.organisation}</strong>
                        </span>
                        {c.order_reference && (
                          <span>
                            Ref: <strong className="text-zinc-300 font-mono">{c.order_reference}</strong>
                          </span>
                        )}
                      </div>

                      <span className="text-blue-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Open Workspace <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right 1 Col: Upcoming Reminders & Quick Shortcuts */}
        <div className="space-y-6">
          {/* Upcoming Reminders Card */}
          <div className="bg-[#171B25] rounded-2xl p-6 border border-[#252B38]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-[#F8FAFC]">
                  Upcoming Follow-Ups
                </h3>
              </div>
              <button
                onClick={() => setCurrentView('reminders')}
                className="text-xs text-blue-400 font-semibold hover:underline"
              >
                View all
              </button>
            </div>

            {pendingReminders.length === 0 ? (
              <p className="text-xs text-[#A1A1AA] italic py-4 text-center">
                No pending follow-ups scheduled.
              </p>
            ) : (
              <div className="space-y-3">
                {pendingReminders.map(r => (
                  <div
                    key={r.id}
                    className="p-3 rounded-xl bg-[#10131A] border border-[#252B38] hover:border-[#323B4E] transition-all flex items-start gap-3"
                  >
                    <input
                      type="checkbox"
                      checked={r.completed}
                      onChange={() => toggleReminder(r.id)}
                      className="mt-0.5 rounded bg-[#171B25] border-[#252B38] text-blue-500 focus:ring-blue-500 cursor-pointer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#F8FAFC] leading-snug">
                        {r.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#A1A1AA]">
                        <span className="font-medium text-blue-400">
                          Due: {formatDate(r.reminder_date)}
                        </span>
                        {r.case_title && (
                          <span className="truncate max-w-[140px] text-zinc-500">
                            • {r.case_title}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Guide Spotlight */}
          <div className="bg-gradient-to-br from-[#10131A] to-[#171B25] rounded-2xl p-6 border border-[#252B38]">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Official Guide Spotlight
              </h3>
            </div>
            <h4 className="text-sm font-bold text-[#F8FAFC] mb-1">
              National Consumer Helpline (NCH)
            </h4>
            <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
              Registered convergence companies are required to reply to NCH dockets within prescribed windows.
            </p>
            <button
              onClick={() => setCurrentView('guides')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <span>Explore Process Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Switch to Small Business Mode */}
          <div className="bg-[#10131A] rounded-2xl p-6 border border-[#252B38]">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                B2B Operations
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#F8FAFC] mb-1">
              Small Business Workspace
            </h4>
            <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
              Track vendor non-performance, PO advance payment reconciliations, and supplier delivery delays.
            </p>
            <button
              onClick={() => setCurrentView('business')}
              className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Switch to Business Mode</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
