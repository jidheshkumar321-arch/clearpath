import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Building,
  Truck,
  CreditCard,
  Wrench,
  AlertCircle,
  Repeat,
  Building2,
  Cpu,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  FileCheck,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { AudienceType, CaseCategory, CaseStatus } from '../../types';
import { checkForSensitiveData, sanitizeInput } from '../../utils/sanitization';

export const CreateCaseWizard: React.FC = () => {
  const { createCase, addEvidence, openCaseWorkspace, setCurrentView } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form State
  const [audience, setAudience] = useState<AudienceType>('individual');
  const [category, setCategory] = useState<CaseCategory>('delayed_delivery');
  const [title, setTitle] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [description, setDescription] = useState('');
  const [issueStartedAt, setIssueStartedAt] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [attemptedDetails, setAttemptedDetails] = useState('');
  const [status, setStatus] = useState<CaseStatus>('in_progress');
  const [orderReference, setOrderReference] = useState('');
  const [targetResolution, setTargetResolution] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  // Evidence state
  const [filesToAttach, setFilesToAttach] = useState<{
    name: string;
    type: string;
    size: number;
    description: string;
    category: 'receipt' | 'order_confirmation' | 'email_thread' | 'photo' | 'warranty_card' | 'other';
  }[]>([]);

  // Validation & Warnings
  const [error, setError] = useState<string | null>(null);
  const [sensitiveWarning, setSensitiveWarning] = useState<string | null>(null);

  const categories: {
    id: CaseCategory;
    label: string;
    description: string;
    icon: any;
  }[] = [
    {
      id: 'delayed_delivery',
      label: 'Delayed Delivery',
      description: 'Shipment or package stalled past committed window',
      icon: Truck
    },
    {
      id: 'refund_follow_up',
      label: 'Refund Follow-Up',
      description: 'Returned goods or cancelled orders with uncredited payment',
      icon: CreditCard
    },
    {
      id: 'warranty_repair',
      label: 'Warranty or Repair',
      description: 'Hardware defect, service center delay, or repair denial',
      icon: Wrench
    },
    {
      id: 'service_complaint',
      label: 'Service Complaint',
      description: 'Telecom, utility, or contractual service degradation',
      icon: AlertCircle
    },
    {
      id: 'subscription_issue',
      label: 'Subscription Issue',
      description: 'Unintended auto-renewal, cancellation failure, or billing error',
      icon: Repeat
    },
    {
      id: 'supplier_issue',
      label: 'Supplier Issue',
      description: 'Commercial PO non-performance, factory delay, or advance payment',
      icon: Building2
    },
    {
      id: 'tech_service_issue',
      label: 'Software & Tech Service',
      description: 'SaaS uptime, software bugs, or IT service level breach',
      icon: Cpu
    },
    {
      id: 'other',
      label: 'Other Issue',
      description: 'Any other structured dispute or commercial grievance',
      icon: HelpCircle
    }
  ];

  const handleNextFromStep3 = () => {
    setError(null);
    setSensitiveWarning(null);

    if (!title.trim()) {
      setError('Please provide a descriptive title for this case.');
      return;
    }
    if (!organisation.trim()) {
      setError('Please specify the organisation or service provider involved.');
      return;
    }
    if (!description.trim() || description.length < 20) {
      setError('Please provide a brief description (at least 20 characters).');
      return;
    }

    // Check for sensitive data leakage
    const titleCheck = checkForSensitiveData(title);
    const descCheck = checkForSensitiveData(description);
    const attemptCheck = checkForSensitiveData(attemptedDetails);

    if (titleCheck.containsSensitiveData || descCheck.containsSensitiveData || attemptCheck.containsSensitiveData) {
      setSensitiveWarning(
        titleCheck.warningMessage || descCheck.warningMessage || attemptCheck.warningMessage || 'Warning: Sensitive numbers detected.'
      );
      return;
    }

    setStep(4);
  };

  const handleAddSimulatedFile = (category: any, name: string) => {
    setFilesToAttach(prev => [
      ...prev,
      {
        name,
        type: name.endsWith('.pdf') ? 'application/pdf' : 'image/png',
        size: Math.floor(Math.random() * 300000) + 120000,
        description: `Verified document uploaded by user (${category})`,
        category
      }
    ]);
  };

  const handleCreateCase = () => {
    setError(null);

    const fullDescription = attemptedDetails
      ? `${description}\n\nPrior Attempts Recorded:\n${attemptedDetails}`
      : description;

    const newCaseId = createCase({
      title: sanitizeInput(title),
      category,
      organisation: sanitizeInput(organisation),
      description: sanitizeInput(fullDescription),
      status,
      audience,
      issue_started_at: issueStartedAt,
      order_reference: sanitizeInput(orderReference),
      target_resolution: sanitizeInput(targetResolution),
      priority
    });

    // Attach any staged files
    filesToAttach.forEach(f => {
      addEvidence({
        case_id: newCaseId,
        file_reference: `vault/users/${newCaseId}/${f.name}`,
        file_name: f.name,
        file_type: f.type,
        file_size: f.size,
        description: f.description,
        category: f.category,
        is_sample: false
      });
    });

    openCaseWorkspace(newCaseId);
  };

  return (
    <div className="max-w-3xl mx-auto pb-16">
      {/* Stepper Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-[#A1A1AA] mb-2">
          <span className={step >= 1 ? 'text-violet-400 font-bold' : ''}>1. Audience</span>
          <span className={step >= 2 ? 'text-violet-400 font-bold' : ''}>2. Category</span>
          <span className={step >= 3 ? 'text-violet-400 font-bold' : ''}>3. Details</span>
          <span className={step >= 4 ? 'text-violet-400 font-bold' : ''}>4. Evidence</span>
          <span className={step >= 5 ? 'text-violet-400 font-bold' : ''}>5. Review</span>
        </div>
        <div className="w-full bg-[#252B38] h-2 rounded-full overflow-hidden">
          <div
            className="bg-violet-500 h-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-[#10131A] rounded-3xl border border-[#252B38] shadow-2xl p-6 sm:p-8">
        {/* STEP 1: SELECT AUDIENCE */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
                Step 1 of 5
              </span>
              <h2 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight mt-1">
                Select case audience
              </h2>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Is this an individual consumer dispute or a small business operational issue?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div
                onClick={() => setAudience('individual')}
                className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                  audience === 'individual'
                    ? 'border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10'
                    : 'border-[#252B38] hover:border-[#323B4E] bg-[#171B25]'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  audience === 'individual' ? 'bg-violet-500/20 text-violet-400' : 'bg-[#10131A] text-zinc-400 border border-[#252B38]'
                }`}>
                  <User className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#F8FAFC]">
                  Individual Consumer
                </h3>
                <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                  For personal purchases, e-commerce deliveries, consumer warranties, and banking or subscription refunds.
                </p>
                <div className="mt-4 text-[11px] font-semibold text-violet-400">
                  Includes Consumer Protection Act (India) frameworks
                </div>
              </div>

              <div
                onClick={() => setAudience('business')}
                className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                  audience === 'business'
                    ? 'border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10'
                    : 'border-[#252B38] hover:border-[#323B4E] bg-[#171B25]'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  audience === 'business' ? 'bg-violet-500/20 text-violet-400' : 'bg-[#10131A] text-zinc-400 border border-[#252B38]'
                }`}>
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#F8FAFC]">
                  Small Business
                </h3>
                <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                  For vendor non-performance, supplier packaging delays, B2B SaaS service outages, and PO milestones.
                </p>
                <div className="mt-4 text-[11px] font-semibold text-cyan-400">
                  Includes commercial reconciliation & MSME frameworks
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between border-t border-[#252B38]">
              <button
                type="button"
                onClick={() => setCurrentView('cases')}
                className="px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-violet-600/20 transition-all"
              >
                <span>Continue to Category</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT CATEGORY */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
                Step 2 of 5
              </span>
              <h2 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight mt-1">
                Select issue category
              </h2>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Choose the primary classification for tailored timeline checklists and procedural guidance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {categories.map(c => {
                const Icon = c.icon;
                const isSelected = category === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-violet-500 bg-violet-500/10 shadow-sm'
                        : 'border-[#252B38] hover:border-[#323B4E] bg-[#171B25]'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-violet-600 text-white'
                          : 'bg-[#10131A] text-zinc-400 border border-[#252B38]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#F8FAFC]">
                        {c.label}
                      </h4>
                      <p className="text-[11px] text-[#A1A1AA] leading-snug mt-0.5">
                        {c.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between border-t border-[#252B38]">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-violet-600/20 transition-all"
              >
                <span>Continue to Case Details</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ENTER DETAILS */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
                Step 3 of 5
              </span>
              <h2 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight mt-1">
                Enter case details
              </h2>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Record the essential factual foundation of the unresolved issue.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {sensitiveWarning && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>Sensitive Data Detected</span>
                </div>
                <p>{sensitiveWarning}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
                  Case Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Ergonomic Office Chair Delivery Delayed Past Committed Date"
                  className="w-full px-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-sm text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
                    Organisation or Service Provider <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={organisation}
                    onChange={e => setOrganisation(e.target.value)}
                    placeholder="e.g. Apex Logistics / NovaTech Corp"
                    className="w-full px-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-sm text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
                    Date Issue Started <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={issueStartedAt}
                    onChange={e => setIssueStartedAt(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-sm text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
                  Issue Description <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Summarise what occurred, what was promised, and why the situation remains unresolved..."
                  className="w-full px-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-sm text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
                <p className="text-[11px] text-zinc-500 mt-1">
                  Do not include passwords, OTPs, or debit/credit card numbers.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
                  What Has Already Been Attempted? (Optional)
                </label>
                <textarea
                  rows={2}
                  value={attemptedDetails}
                  onChange={e => setAttemptedDetails(e.target.value)}
                  placeholder="e.g. Raised chat ticket #4491 on Jan 12. Spoke with support rep on Jan 15 who promised follow-up..."
                  className="w-full px-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-sm text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
                    Initial Case Status
                  </label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as CaseStatus)}
                    className="w-full px-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-xs font-semibold text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="in_progress">In Progress</option>
                    <option value="waiting_for_response">Waiting for Response</option>
                    <option value="follow_up_needed">Follow-Up Needed</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-xs font-semibold text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between border-t border-[#252B38]">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                onClick={handleNextFromStep3}
                className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-violet-600/20 transition-all"
              >
                <span>Continue to Evidence</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: EVIDENCE CHECKLIST & UPLOADS */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
                Step 4 of 5
              </span>
              <h2 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight mt-1">
                Evidence & supporting records
              </h2>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Reference numbers and documentation make your case verifiable and credible.
              </p>
            </div>

            {/* Strict Privacy Warning */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Important Privacy & Confidentiality Warning:</span>
              </div>
              <p className="leading-relaxed">
                Do NOT upload files containing credit/debit card numbers, CVVs, netbanking passwords, OTPs, or government identity cards (such as Aadhaar or PAN). Only upload purchase receipts, tracking screenshots, or written communications.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
                  Order / Ticket / Job Sheet Reference Number (Optional)
                </label>
                <input
                  type="text"
                  value={orderReference}
                  onChange={e => setOrderReference(e.target.value)}
                  placeholder="e.g. UL-89412-IN or JOB-NT-774"
                  className="w-full px-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-sm font-mono text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
                  Desired Resolution (Optional)
                </label>
                <input
                  type="text"
                  value={targetResolution}
                  onChange={e => setTargetResolution(e.target.value)}
                  placeholder="e.g. Confirmed replacement part delivery or full refund to original payment card."
                  className="w-full px-3.5 py-2.5 bg-[#171B25] border border-[#252B38] rounded-xl text-sm text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Attach Simulated Evidence Files */}
              <div>
                <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-2">
                  Attach Supporting Documents (Demonstration & Local Vault)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleAddSimulatedFile('receipt', `${organisation.replace(/\s+/g, '_')}_TaxInvoice.pdf`)}
                    className="p-3 rounded-xl border border-dashed border-[#252B38] hover:border-violet-500 bg-[#171B25] hover:bg-violet-500/5 text-left transition-all"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#F8FAFC]">
                      <FileText className="w-4 h-4 text-violet-400" /> + Add Tax Invoice
                    </div>
                    <p className="text-[10px] text-[#A1A1AA] mt-1">Proof of payment / date</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAddSimulatedFile('photo', 'Tracking_Status_Screenshot.png')}
                    className="p-3 rounded-xl border border-dashed border-[#252B38] hover:border-violet-500 bg-[#171B25] hover:bg-violet-500/5 text-left transition-all"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#F8FAFC]">
                      <FileCheck className="w-4 h-4 text-violet-400" /> + Add Screenshot
                    </div>
                    <p className="text-[10px] text-[#A1A1AA] mt-1">Tracking or chat transcript</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAddSimulatedFile('other', 'Customer_Support_Email_Thread.pdf')}
                    className="p-3 rounded-xl border border-dashed border-[#252B38] hover:border-violet-500 bg-[#171B25] hover:bg-violet-500/5 text-left transition-all"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#F8FAFC]">
                      <FileText className="w-4 h-4 text-violet-400" /> + Add Communication
                    </div>
                    <p className="text-[10px] text-[#A1A1AA] mt-1">Previous support emails</p>
                  </button>
                </div>

                {/* Staged files list */}
                {filesToAttach.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-bold text-[#A1A1AA]">Files Ready to Link:</p>
                    {filesToAttach.map((f, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-xs text-[#F8FAFC]"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-violet-400" />
                          <span className="font-semibold text-[#F8FAFC]">{f.name}</span>
                          <span className="text-[10px] text-[#A1A1AA]">({Math.round(f.size / 1024)} KB)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFilesToAttach(prev => prev.filter((_, i) => i !== idx))}
                          className="text-rose-400 hover:underline text-[11px] font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-between border-t border-[#252B38]">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep(5)}
                className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-violet-600/20 transition-all"
              >
                <span>Continue to Review</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW AND CREATE */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
                Step 5 of 5
              </span>
              <h2 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight mt-1">
                Review and initialize workspace
              </h2>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Verify the summary before creating your dedicated case file.
              </p>
            </div>

            <div className="bg-[#171B25] rounded-2xl p-5 border border-[#252B38] space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-[#252B38]">
                <div>
                  <span className="text-zinc-500 uppercase font-bold text-[10px]">Audience</span>
                  <p className="font-bold text-[#F8FAFC] capitalize mt-0.5">{audience}</p>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase font-bold text-[10px]">Category</span>
                  <p className="font-bold text-[#F8FAFC] capitalize mt-0.5">{category.replace('_', ' ')}</p>
                </div>
              </div>

              <div>
                <span className="text-zinc-500 uppercase font-bold text-[10px]">Case Title</span>
                <p className="font-bold text-[#F8FAFC] text-sm mt-0.5">{title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-zinc-500 uppercase font-bold text-[10px]">Target Organisation</span>
                  <p className="font-bold text-zinc-300 mt-0.5">{organisation}</p>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase font-bold text-[10px]">Issue Start Date</span>
                  <p className="font-bold text-zinc-300 mt-0.5">{issueStartedAt}</p>
                </div>
              </div>

              {orderReference && (
                <div>
                  <span className="text-zinc-500 uppercase font-bold text-[10px]">Reference / Order ID</span>
                  <p className="font-mono text-zinc-300 font-semibold mt-0.5">{orderReference}</p>
                </div>
              )}

              <div>
                <span className="text-zinc-500 uppercase font-bold text-[10px]">Description</span>
                <p className="text-[#A1A1AA] leading-relaxed mt-0.5 whitespace-pre-wrap">{description}</p>
              </div>

              {filesToAttach.length > 0 && (
                <div className="pt-2 border-t border-[#252B38]">
                  <span className="text-zinc-500 uppercase font-bold text-[10px]">Attached Evidence Files ({filesToAttach.length})</span>
                  <p className="text-zinc-300 mt-0.5">{filesToAttach.map(f => f.name).join(', ')}</p>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 text-xs text-violet-300 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-violet-400 shrink-0" />
              <span>
                Once created, your case timeline, evidence vault, action plans, and AI assistant will be immediately ready in your dedicated workspace.
              </span>
            </div>

            <div className="pt-4 flex justify-between border-t border-[#252B38]">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                onClick={handleCreateCase}
                className="px-7 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-lg shadow-violet-600/30 flex items-center gap-2 transition-all"
              >
                <span>Create Case & Open Workspace</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
