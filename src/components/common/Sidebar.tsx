import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  Bell,
  FileText,
  BookOpen,
  Building2,
  Settings,
  RotateCcw,
  ShieldCheck,
  Server
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cases,
    reminders,
    evidence,
    isDemoMode,
    resetToSampleData,
    backendConnected
  } = useApp();

  const activeCasesCount = cases.filter(
    c => c.status !== 'resolved' && c.status !== 'closed_by_user'
  ).length;

  const pendingRemindersCount = reminders.filter(r => !r.completed).length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'cases',
      label: 'My Cases',
      icon: FolderKanban,
      badge: activeCasesCount > 0 ? activeCasesCount : null
    },
    {
      id: 'create-case',
      label: 'Create Case',
      icon: PlusCircle,
      badge: null,
      highlight: true
    },
    {
      id: 'reminders',
      label: 'Reminders',
      icon: Bell,
      badge: pendingRemindersCount > 0 ? pendingRemindersCount : null
    },
    {
      id: 'documents',
      label: 'Evidence & Files',
      icon: FileText,
      badge: evidence.length > 0 ? evidence.length : null
    },
    {
      id: 'business',
      label: 'Small Business Mode',
      icon: Building2,
      badge: null
    },
    {
      id: 'guides',
      label: 'Process Guides',
      icon: BookOpen,
      badge: 'India'
    },
    {
      id: 'settings',
      label: 'Settings & Privacy',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className="w-64 bg-[#10131A] border-r border-[#252B38] flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] p-4 select-none">
      <div className="space-y-6">
        {/* Quick Create Button */}
        <div>
          <button
            onClick={() => setCurrentView('create-case')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(139, 92, 246,0.25)] transition-all transform active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4 text-violet-200" />
            <span>Create New Case</span>
          </button>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
            Workspace
          </p>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive =
              currentView === item.id ||
              (item.id === 'cases' && currentView === 'case-workspace');

            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#171B25] text-[#F8FAFC] border border-[#252B38] font-semibold shadow-xs'
                    : 'text-[#A1A1AA] hover:bg-[#171B25]/60 hover:text-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-violet-400' : 'text-zinc-500'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                      isActive
                        ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                        : 'bg-[#171B25] text-zinc-400 border border-[#252B38]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Box */}
      <div className="space-y-3 pt-4 border-t border-[#252B38]">
        {/* Backend & Environment badge */}
        <div className="bg-[#171B25] rounded-xl p-3 border border-[#252B38] text-xs">
          <div className="flex items-center justify-between text-zinc-300 font-medium mb-1.5">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Server className="w-3.5 h-3.5" />
              API Service:
            </span>
            <span
              className={`inline-flex items-center gap-1.5 font-semibold text-[11px] ${
                backendConnected ? 'text-emerald-400' : 'text-zinc-400'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  backendConnected ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)]' : 'bg-zinc-500'
                }`}
              />
              {backendConnected ? 'REST Online' : 'Client Mode'}
            </span>
          </div>

          <div className="flex items-center justify-between text-zinc-300 font-medium">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
              Region:
            </span>
            <span className="font-semibold text-[#F8FAFC]">India (Standard)</span>
          </div>

          {isDemoMode && (
            <div className="mt-3 pt-2.5 border-t border-[#252B38]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-amber-300 font-medium">
                  Sample records loaded
                </span>
                <button
                  onClick={resetToSampleData}
                  className="inline-flex items-center gap-1 text-[11px] text-violet-400 hover:text-violet-300 font-semibold underline"
                  title="Reload sample demonstration cases"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-[10px] text-zinc-500 text-center leading-tight">
          CLEARPATH v1.0.0<br />
          Independent Resolution Workspace
        </p>
      </div>
    </aside>
  );
};
