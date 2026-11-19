import React, { useState } from 'react';
import { Logo } from './Logo';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  X,
  LayoutDashboard,
  FolderKanban,
  BookOpen,
  Building2,
  Bell,
  LogOut,
  User as UserIcon,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, currentView, setCurrentView, signOut, isDemoMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLanding = currentView === 'landing';

  return (
    <header className="sticky top-0 z-40 bg-[#090B10]/90 backdrop-blur-md border-b border-[#252B38] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => setCurrentView(user ? 'dashboard' : 'landing')}
          className="flex items-center text-left focus:outline-none"
        >
          <Logo size="md" withTagline={false} />
        </button>

        {/* Desktop Nav - When on Landing */}
        {isLanding ? (
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A1A1AA]">
            <a
              href="#how-it-works"
              className="hover:text-[#F8FAFC] transition-colors"
            >
              How it works
            </a>
            <a
              href="#features"
              className="hover:text-[#F8FAFC] transition-colors"
            >
              Features
            </a>
            <a
              href="#individuals"
              className="hover:text-[#F8FAFC] transition-colors"
            >
              For Individuals
            </a>
            <a
              href="#businesses"
              className="hover:text-[#F8FAFC] transition-colors"
            >
              For Small Business
            </a>
            <button
              onClick={() => setCurrentView('guides')}
              className="hover:text-[#F8FAFC] transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              Process Guides
            </button>
            <a
              href="#security-privacy"
              className="hover:text-[#F8FAFC] transition-colors"
            >
              Privacy & Security
            </a>
          </nav>
        ) : (
          /* Authenticated workspace top navigation shortcuts */
          <div className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[#A1A1AA]">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-2 transition-all ${
                currentView === 'dashboard'
                  ? 'bg-[#171B25] text-[#F8FAFC] border border-[#252B38] font-semibold'
                  : 'hover:bg-[#10131A] hover:text-[#F8FAFC]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
              Dashboard
            </button>

            <button
              onClick={() => setCurrentView('cases')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-2 transition-all ${
                currentView === 'cases' || currentView === 'case-workspace'
                  ? 'bg-[#171B25] text-[#F8FAFC] border border-[#252B38] font-semibold'
                  : 'hover:bg-[#10131A] hover:text-[#F8FAFC]'
              }`}
            >
              <FolderKanban className="w-4 h-4 text-blue-400" />
              My Cases
            </button>

            <button
              onClick={() => setCurrentView('business')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-2 transition-all ${
                currentView === 'business'
                  ? 'bg-[#171B25] text-[#F8FAFC] border border-[#252B38] font-semibold'
                  : 'hover:bg-[#10131A] hover:text-[#F8FAFC]'
              }`}
            >
              <Building2 className="w-4 h-4 text-blue-400" />
              Business Mode
            </button>

            <button
              onClick={() => setCurrentView('guides')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-2 transition-all ${
                currentView === 'guides'
                  ? 'bg-[#171B25] text-[#F8FAFC] border border-[#252B38] font-semibold'
                  : 'hover:bg-[#10131A] hover:text-[#F8FAFC]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              Process Guides
            </button>
          </div>
        )}

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {isDemoMode && (
                <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/25 px-2.5 py-1 rounded-full">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Demo Mode
                </span>
              )}

              <button
                onClick={() => setCurrentView('reminders')}
                className="p-2 rounded-xl text-[#A1A1AA] hover:text-[#F8FAFC] hover:bg-[#171B25] border border-transparent hover:border-[#252B38] transition-all"
                title="Reminders"
              >
                <Bell className="w-4 h-4" />
              </button>

              <div className="h-4 w-px bg-[#252B38]" />

              <div className="flex items-center gap-2 pl-1">
                <button
                  onClick={() => setCurrentView('settings')}
                  className="flex items-center gap-2.5 group text-left p-1 rounded-xl hover:bg-[#171B25] transition-all"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-xs ring-1 ring-[#252B38] shadow-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="hidden xl:block">
                    <div className="text-xs font-semibold text-[#F8FAFC] leading-none group-hover:text-blue-400 transition-colors">
                      {user.name}
                    </div>
                    <div className="text-[10px] text-[#A1A1AA] mt-0.5 capitalize">
                      {user.account_type} Account
                    </div>
                  </div>
                </button>

                <button
                  onClick={signOut}
                  className="p-1.5 ml-1 text-[#A1A1AA] hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentView('sign-in')}
                className="text-sm font-semibold text-[#A1A1AA] hover:text-[#F8FAFC] px-3 py-2 transition-colors"
              >
                Sign in
              </button>
              <button
                onClick={() => setCurrentView('sign-up')}
                className="text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl shadow-glow transition-all"
              >
                Get started
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          {user && (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="text-xs font-semibold bg-blue-600 text-white px-2.5 py-1.5 rounded-lg shadow-xs"
            >
              Workspace
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#A1A1AA] hover:text-[#F8FAFC] hover:bg-[#171B25]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#10131A] border-b border-[#252B38] px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          {isLanding ? (
            <div className="flex flex-col space-y-2 text-sm font-medium text-[#A1A1AA]">
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl hover:bg-[#171B25] hover:text-[#F8FAFC]"
              >
                How it works
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl hover:bg-[#171B25] hover:text-[#F8FAFC]"
              >
                Features
              </a>
              <a
                href="#individuals"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl hover:bg-[#171B25] hover:text-[#F8FAFC]"
              >
                For Individuals
              </a>
              <a
                href="#businesses"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl hover:bg-[#171B25] hover:text-[#F8FAFC]"
              >
                For Small Business
              </a>
              <button
                onClick={() => {
                  setCurrentView('guides');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-xl hover:bg-[#171B25] text-blue-400 font-semibold flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" /> Process Guides (India)
              </button>
              <a
                href="#security-privacy"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl hover:bg-[#171B25] hover:text-[#F8FAFC]"
              >
                Privacy & Security
              </a>
            </div>
          ) : (
            <div className="flex flex-col space-y-1.5 text-sm font-medium text-[#A1A1AA]">
              <button
                onClick={() => {
                  setCurrentView('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-xl hover:bg-[#171B25] hover:text-[#F8FAFC] flex items-center gap-2.5"
              >
                <LayoutDashboard className="w-4 h-4 text-blue-400" /> Dashboard
              </button>
              <button
                onClick={() => {
                  setCurrentView('cases');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-xl hover:bg-[#171B25] hover:text-[#F8FAFC] flex items-center gap-2.5"
              >
                <FolderKanban className="w-4 h-4 text-blue-400" /> My Cases
              </button>
              <button
                onClick={() => {
                  setCurrentView('business');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-xl hover:bg-[#171B25] hover:text-[#F8FAFC] flex items-center gap-2.5"
              >
                <Building2 className="w-4 h-4 text-blue-400" /> Small Business Workspace
              </button>
              <button
                onClick={() => {
                  setCurrentView('guides');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-xl hover:bg-[#171B25] hover:text-[#F8FAFC] flex items-center gap-2.5"
              >
                <BookOpen className="w-4 h-4 text-blue-400" /> Process Guides
              </button>
              <button
                onClick={() => {
                  setCurrentView('settings');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-xl hover:bg-[#171B25] hover:text-[#F8FAFC] flex items-center gap-2.5"
              >
                <UserIcon className="w-4 h-4 text-blue-400" /> Settings & Privacy
              </button>
            </div>
          )}

          <div className="pt-3 border-t border-[#252B38] flex flex-col gap-2">
            {user ? (
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 text-sm font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl"
              >
                Sign out
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setCurrentView('sign-in');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 text-sm font-semibold text-[#F8FAFC] bg-[#171B25] border border-[#252B38] rounded-xl"
                >
                  Sign in
                </button>
                <button
                  onClick={() => {
                    setCurrentView('sign-up');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl shadow-glow"
                >
                  Get started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
