import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { ArrowRight, Lock, Mail, User, Building, ShieldCheck } from 'lucide-react';
import { AudienceType } from '../../types';

export const SignUpView: React.FC = () => {
  const { signIn, setCurrentView } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState<AudienceType>('individual');
  const [businessName, setBusinessName] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your full name or legal business contact.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (!agreedToTerms) {
      setError('Please acknowledge the terms and privacy notice.');
      return;
    }

    // Show verification state
    setVerificationSent(true);
  };

  const handleSimulateVerify = () => {
    signIn(email, name, accountType);
    setCurrentView('dashboard');
  };

  if (verificationSent) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#090B10]">
        <div className="max-w-md w-full bg-[#10131A] p-8 rounded-3xl border border-[#252B38] shadow-elevated text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400 mx-auto flex items-center justify-center">
            <Mail className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#F8FAFC]">
              Verify your email address
            </h2>
            <p className="mt-2 text-xs text-[#A1A1AA] leading-relaxed">
              We have sent an authentication confirmation link to{' '}
              <strong className="text-[#F8FAFC]">{email}</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#171B25] border border-[#252B38] text-xs text-zinc-300 text-left space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#F8FAFC]">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Simulated Verification Protocol:</span>
            </div>
            <p className="text-[11px] text-[#A1A1AA]">
              In this preview demonstration environment, click the button below to simulate successful token verification and enter your workspace.
            </p>
          </div>

          <button
            onClick={handleSimulateVerify}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2"
          >
            <span>Simulate Verification & Enter Workspace</span>
            <ArrowRight className="w-4 h-4 text-blue-200" />
          </button>

          <button
            onClick={() => setVerificationSent(false)}
            className="text-xs text-[#A1A1AA] hover:text-[#F8FAFC] underline"
          >
            Back to edit registration details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#090B10]">
      <div className="max-w-md w-full space-y-6 bg-[#10131A] p-8 rounded-3xl border border-[#252B38] shadow-elevated">
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <Logo size="lg" withTagline={false} />
          </div>
          <h2 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight">
            Create your CLEARPATH account
          </h2>
          <p className="mt-1 text-xs text-[#A1A1AA]">
            Start organising your cases, timelines, and next steps calmly.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-xs text-rose-300">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Account Type */}
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Select Workspace Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAccountType('individual')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                  accountType === 'individual'
                    ? 'bg-blue-600/15 border-blue-500/40 text-blue-300'
                    : 'border-[#252B38] text-zinc-400 hover:bg-[#171B25]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Individual</span>
              </button>
              <button
                type="button"
                onClick={() => setAccountType('business')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                  accountType === 'business'
                    ? 'bg-indigo-600/15 border-indigo-500/40 text-indigo-300'
                    : 'border-[#252B38] text-zinc-400 hover:bg-[#171B25]'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Small Business</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              {accountType === 'business' ? 'Business Contact Name' : 'Full Name'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={accountType === 'business' ? 'e.g. Priya Sharma' : 'e.g. Arjun Mehta'}
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-xs sm:text-sm text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {accountType === 'business' && (
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Enterprise / Trade Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Building className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={businessName}
                  onChange={e => setBusinessName(e.target.value)}
                  placeholder="e.g. Mehta Artisan Goods"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-xs sm:text-sm text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

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
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-xs sm:text-sm text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Create Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-xs sm:text-sm text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={e => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-blue-500 rounded border-[#252B38] bg-[#171B25] focus:ring-blue-500"
              />
              <span className="text-xs text-[#A1A1AA] leading-normal">
                I understand that CLEARPATH is an independent productivity workspace and does not provide legal representation or guaranteed dispute resolutions.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2 group mt-2"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-[#A1A1AA]">
            Already have an account?{' '}
            <button
              onClick={() => setCurrentView('sign-in')}
              className="font-bold text-blue-400 hover:text-blue-300 underline ml-1"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
