import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { ArrowRight, Lock, Mail, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { AudienceType } from '../../types';

export const SignInView: React.FC = () => {
  const { signIn, setCurrentView, backendConnected } = useApp();
  const [email, setEmail] = useState('arjun.mehta@example.in');
  const [password, setPassword] = useState('SamplePassword123!');
  const [accountType, setAccountType] = useState<AudienceType>('individual');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      signIn(email, email.split('@')[0], accountType);
    }, 400);
  };

  const handleDemoQuickLogin = (type: AudienceType) => {
    if (type === 'individual') {
      signIn('arjun.mehta@example.in', 'Arjun Mehta', 'individual');
    } else {
      signIn('business.ops@mehta-goods.in', 'Mehta Artisan Goods', 'business');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#090B10]">
      <div className="max-w-md w-full space-y-8 bg-[#10131A] p-8 rounded-3xl border border-[#252B38] shadow-elevated">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size="lg" withTagline={false} />
          </div>
          <h2 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight">
            Sign in to your workspace
          </h2>
          <p className="mt-2 text-xs text-[#A1A1AA]">
            Access your active cases, chronological timelines, and action plans.
          </p>

          {/* Environment Banner */}
          <div className="mt-4 p-3 rounded-xl bg-[#171B25] border border-[#252B38] text-left text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Authentication Status:</span>
            </div>
            <p className="text-[11px] text-[#A1A1AA] mt-1">
              {backendConnected
                ? 'Connected to local REST backend server.'
                : 'Local demonstration mode active. You can sign in instantly with any sample email or use the one-click quick buttons below.'}
            </p>
          </div>
        </div>

        {/* Quick Demo Logins */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 text-center">
            One-Click Demonstration Logins
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleDemoQuickLogin('individual')}
              className="py-2.5 px-3 text-xs font-semibold rounded-xl border border-[#252B38] hover:border-violet-500/50 bg-[#171B25] hover:bg-[#1E2430] text-[#F8FAFC] transition-all text-center flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
              <span>Consumer Demo</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoQuickLogin('business')}
              className="py-2.5 px-3 text-xs font-semibold rounded-xl border border-[#252B38] hover:border-purple-500/50 bg-[#171B25] hover:bg-[#1E2430] text-[#F8FAFC] transition-all text-center flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Business Demo</span>
            </button>
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-[#252B38]" />
          <span className="flex-shrink mx-3 text-xs text-zinc-500">or sign in with email</span>
          <div className="flex-grow border-t border-[#252B38]" />
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-xs text-rose-300 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAccountType('individual')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  accountType === 'individual'
                    ? 'bg-violet-600/15 border-violet-500/40 text-violet-300'
                    : 'border-[#252B38] text-zinc-400 hover:bg-[#171B25]'
                }`}
              >
                Individual
              </button>
              <button
                type="button"
                onClick={() => setAccountType('business')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  accountType === 'business'
                    ? 'bg-purple-600/15 border-purple-500/40 text-purple-300'
                    : 'border-[#252B38] text-zinc-400 hover:bg-[#171B25]'
                }`}
              >
                Small Business
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-xs sm:text-sm text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => setCurrentView('recovery')}
                className="text-xs text-violet-400 hover:text-violet-300 font-semibold"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-xs sm:text-sm text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(139, 92, 246,0.3)] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 mt-2"
          >
            <span>{isLoading ? 'Signing in...' : 'Sign in to Workspace'}</span>
            <ArrowRight className="w-4 h-4 text-violet-200 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-[#A1A1AA]">
            Don't have an account yet?{' '}
            <button
              onClick={() => setCurrentView('sign-up')}
              className="font-bold text-violet-400 hover:text-violet-300 underline ml-1"
            >
              Create one now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
