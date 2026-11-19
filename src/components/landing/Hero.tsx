import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileCheck,
  Sparkles
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { setCurrentView, signIn } = useApp();

  return (
    <section className="relative overflow-hidden bg-[#090B10] pt-16 pb-20 border-b border-[#252B38]">
      {/* Subtle ambient blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-blue-600/15 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10131A] border border-[#252B38] text-xs font-semibold text-zinc-300 mb-6 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <span>Independent Productivity & Action Workspace</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">Launch Market: India</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#F8FAFC] tracking-tight leading-[1.12]">
            Turn unresolved problems into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">
              clear next steps.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto font-normal">
            Keep your issue history, evidence, follow-ups and next actions organised in one place.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                signIn('demo.user@clearpath.workspace', 'Arjun Mehta', 'individual');
                setCurrentView('dashboard');
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-2 group"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#171B25] hover:bg-[#1F2430] text-[#F8FAFC] font-semibold text-base border border-[#252B38] shadow-soft transition-all text-center"
            >
              Explore how it works
            </a>
          </div>

          {/* Reassurance pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-[#A1A1AA]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Private & confidential</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified Indian consumer frameworks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>AI guidance with human control</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          <div className="rounded-2xl border border-[#252B38] bg-[#10131A] shadow-2xl overflow-hidden ring-1 ring-white/5">
            {/* Window chrome header */}
            <div className="bg-[#090B10] px-4 py-3 flex items-center justify-between border-b border-[#252B38]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-zinc-400 font-mono ml-2">app.clearpath.in/cases/case-sample-1</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>Case Workspace: Live Plan</span>
              </div>
            </div>

            {/* Simulated Case Header */}
            <div className="p-6 bg-[#10131A] border-b border-[#252B38] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    Waiting for response
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">Ref: UL-89412-IN</span>
                  <span className="text-xs text-zinc-600">•</span>
                  <span className="text-xs text-zinc-400">Individual Consumer</span>
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC]">
                  High-Value Ergonomic Chair Delivery Delayed Past Promised Window
                </h3>
                <p className="text-xs text-[#A1A1AA] mt-0.5">
                  Organisation: <strong className="text-zinc-200">Apex Logistics & UrbanLiving Furniture</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> Follow-up in 48h
                </span>
                <span className="text-xs font-semibold text-zinc-300 bg-[#171B25] border border-[#252B38] px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs">
                  <FileCheck className="w-3.5 h-3.5 text-blue-400" /> 2 Evidence Files
                </span>
              </div>
            </div>

            {/* Simulated Content Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#252B38] p-6 bg-[#090B10] gap-6">
              {/* Col 1: Chronological Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" /> 1. Timeline of Events
                </h4>
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-[#171B25] border border-[#252B38]">
                    <div className="flex justify-between text-zinc-400 font-mono text-[10px]">
                      <span>Jan 10, 2025</span>
                      <span className="text-blue-400 font-semibold">Verified Receipt</span>
                    </div>
                    <p className="font-semibold text-[#F8FAFC] mt-1">Order Placed & Confirmed</p>
                    <p className="text-[#A1A1AA] text-[11px]">Delivery estimated for Jan 15-18.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#171B25] border border-[#252B38]">
                    <div className="flex justify-between text-zinc-400 font-mono text-[10px]">
                      <span>Jan 22, 2025</span>
                      <span>Support Ticket</span>
                    </div>
                    <p className="font-semibold text-[#F8FAFC] mt-1">Written In-App Inquiry</p>
                    <p className="text-[#A1A1AA] text-[11px]">Support promised dispatch within 24 hours.</p>
                  </div>
                </div>
              </div>

              {/* Col 2: Action Plan */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" /> 2. Action Plan
                </h4>
                <div className="p-3 rounded-xl bg-blue-950/25 border border-blue-800/40 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-blue-300 tracking-wide">Next Recommended Action</span>
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 font-semibold px-2 py-0.5 rounded border border-blue-500/30">Accepted</span>
                  </div>
                  <p className="font-bold text-[#F8FAFC]">
                    Email Merchant Grievance Redressal Officer
                  </p>
                  <p className="text-[#A1A1AA] text-[11px] leading-relaxed">
                    Under Indian E-Commerce Rules, companies must maintain an officer who acknowledges within 48h.
                  </p>
                  <div className="pt-1.5 border-t border-blue-800/40 flex items-center justify-between text-[10px] text-blue-300">
                    <span>Source: E-Commerce Rules 2020</span>
                    <span className="font-semibold">Review: Jan 2025</span>
                  </div>
                </div>
              </div>

              {/* Col 3: AI Assistant Draft */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" /> 3. Prepared Follow-Up Draft
                </h4>
                <div className="p-3 rounded-xl bg-[#10131A] border border-[#252B38] text-white text-xs space-y-2 shadow-inner">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span>Subject: Formal Delivery Inquiry</span>
                    <span className="text-blue-400 font-mono">User Must Approve</span>
                  </div>
                  <p className="font-mono text-[11px] text-zinc-300 leading-snug line-clamp-3">
                    "Dear Grievance Officer, regarding order UL-89412-IN placed Jan 10... consignment stalled past agreed window..."
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-[10px] text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Polite & Factual tone generated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
