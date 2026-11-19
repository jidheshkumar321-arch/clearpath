import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { ArrowLeft, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';

export const PasswordRecoveryView: React.FC = () => {
  const { setCurrentView } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#090B10]">
      <div className="max-w-md w-full bg-[#10131A] p-8 rounded-3xl border border-[#252B38] shadow-elevated space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size="lg" withTagline={false} />
          </div>
          <h2 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight">
            Reset your password
          </h2>
          <p className="mt-1 text-xs text-[#A1A1AA]">
            Enter the email associated with your account and we'll send recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div className="space-y-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/15 border border-violet-500/30 text-violet-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-[#F8FAFC]">
                Recovery link sent
              </p>
              <p className="text-xs text-[#A1A1AA]">
                If an account exists for <strong className="text-[#F8FAFC]">{email}</strong>, a secure password reset token has been dispatched.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#171B25] border border-[#252B38] text-left text-xs text-zinc-300">
              <div className="flex items-center gap-1.5 font-bold text-[#F8FAFC] mb-1">
                <ShieldCheck className="w-4 h-4 text-violet-400" />
                <span>Security Notice:</span>
              </div>
              <p className="text-[11px] text-[#A1A1AA]">
                Reset links expire within 60 minutes and cannot be reused. CLEARPATH staff will never ask for your password.
              </p>
            </div>

            <button
              onClick={() => setCurrentView('sign-in')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#171B25] hover:bg-[#1E2430] border border-[#252B38] text-[#F8FAFC] font-semibold text-xs transition-colors"
            >
              Return to Sign In
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Registered Email
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
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-xs sm:text-sm text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(139, 92, 246,0.3)] transition-all"
            >
              Send Password Recovery Email
            </button>

            <button
              type="button"
              onClick={() => setCurrentView('sign-in')}
              className="w-full text-center text-xs text-[#A1A1AA] hover:text-[#F8FAFC] font-semibold flex items-center justify-center gap-1.5 pt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
