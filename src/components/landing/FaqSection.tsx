import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is CLEARPATH an official government website or consumer court?',
      a: 'No. CLEARPATH is an independent productivity and case-organization workspace. It is NOT affiliated with, endorsed by, or operated by any government department, consumer dispute commission, consumer forum, or corporate customer support unit. Official government resources (such as the National Consumer Helpline or e-Jagriti) are linked purely as factual informational references.'
    },
    {
      q: 'Does CLEARPATH guarantee that I will receive a refund or dispute resolution?',
      a: 'No. We strictly do not guarantee dispute outcomes, financial compensations, or vendor refunds. The outcome of any dispute depends on the facts of your transaction, contractual terms, and the relevant organisation or statutory authority. CLEARPATH provides the timeline, evidence organization, and communication drafts to help you present your case clearly and professionally.'
    },
    {
      q: 'Does CLEARPATH automatically send messages or file legal complaints for me?',
      a: 'No. CLEARPATH will NEVER send emails, dispatch messages, or submit complaint forms to external companies or portals without your explicit copy, review, and personal transmission. You maintain 100% control over all communications sent under your name.'
    },
    {
      q: 'Does CLEARPATH provide legal representation or legal advice?',
      a: 'No. CLEARPATH is not a law firm and does not provide legal representation, legal advice, or attorney-client privileged services. All procedural guides, statutory excerpts, and AI suggestions are for general organizational and informational purposes only. If you require legal representation, consult an advocate qualified to practice in your jurisdiction.'
    },
    {
      q: 'What sensitive information should I avoid uploading to CLEARPATH?',
      a: 'Never upload credit/debit card numbers, ATM PINs, CVV codes, net-banking passwords, one-time passwords (OTPs), or government identity cards (such as Aadhaar or PAN). Upload only factual proof such as order confirmation emails, invoice PDFs, authorized service job sheets, and courier tracking screenshots.'
    },
    {
      q: 'Can CLEARPATH be used outside India?',
      a: 'While CLEARPATH is initially configured with statutory guidelines and grievance pathways tailored to India (under the Consumer Protection Act, 2019 and E-Commerce Rules), the core case management, timeline tracking, and evidence vault architecture is jurisdiction-agnostic and designed to support additional regions and languages in future releases.'
    }
  ];

  return (
    <section className="py-20 bg-[#10131A] border-b border-[#252B38]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/25">
            Common Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight mt-3">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-[#A1A1AA] text-base leading-relaxed">
            Transparent boundaries regarding our services, data handling, and operational scope.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#171B25] rounded-2xl border border-[#252B38] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-bold text-[#F8FAFC] hover:text-violet-400 transition-colors"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-violet-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-[#A1A1AA] leading-relaxed border-t border-[#252B38] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
