import React from 'react';
import { FileX, MessagesSquare, HelpCircle, Check } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#090B10] border-b border-[#252B38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/25">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight mt-3">
            Resolving consumer and business disputes is chaotic, fragmented and exhausting.
          </h2>
          <p className="mt-4 text-[#A1A1AA] text-base leading-relaxed">
            When an order goes missing, a refund is delayed, or a supplier stalls, crucial details get lost across phone logs, WhatsApp chats, and buried emails.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#171B25] rounded-2xl p-6 border border-[#252B38] hover:border-[#323B4E] transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-5">
              <FileX className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#F8FAFC] mb-2">
              Scattered Evidence & Lost Receipts
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Order confirmations in one inbox, repair job sheets on physical paper, and courier tracking screenshots in camera rolls. When support asks for proof, finding it takes hours.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#171B25] rounded-2xl p-6 border border-[#252B38] hover:border-[#323B4E] transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5">
              <MessagesSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#F8FAFC] mb-2">
              Broken Promises & Stalled Follow-Ups
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Customer support agents promise "updates in 24-48 hours", but when the deadline passes with no response, you restart from scratch with a brand new representative.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#171B25] rounded-2xl p-6 border border-[#252B38] hover:border-[#323B4E] transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-5">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#F8FAFC] mb-2">
              Unclear Rights & Procedural Confusion
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Users don't know who the Grievance Officer is, what an ARN/UTR number means, or how official portals like National Consumer Helpline (NCH) or e-Jagriti actually operate.
            </p>
          </div>
        </div>

        {/* The CLEARPATH Answer */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#10131A] via-[#171B25] to-[#10131A] text-white border border-[#252B38] shadow-elevated">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                The CLEARPATH Solution
              </span>
              <h3 className="text-2xl font-bold text-[#F8FAFC]">
                One disciplined workspace from the first issue to resolution.
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Organise your facts chronologically, securely store evidence, calculate follow-up dates, draft polite professional communications, and know your procedural next steps.
              </p>
            </div>

            <div className="space-y-2 text-xs font-medium text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>Unbroken timeline of every interaction</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>AI-assisted follow-up drafts with user sign-off</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>Cited Indian statutory & consumer references</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
