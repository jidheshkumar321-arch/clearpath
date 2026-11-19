import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Evidence } from '../../types';
import {
  UploadCloud,
  Download,
  Trash2,
  Lock,
  ShieldAlert,
  Search,
  FileCheck
} from 'lucide-react';
import { formatDate, formatFileSize } from '../../utils/formatters';
import { Modal } from '../common/Modal';

export const DocumentManager: React.FC = () => {
  const { evidence, cases, addEvidence, deleteEvidence, openCaseWorkspace } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Form state
  const [caseId, setCaseId] = useState(cases.length > 0 ? cases[0].id : '');
  const [fileName, setFileName] = useState('');
  const [category, setCategory] = useState<Evidence['category']>('receipt');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const filteredEvidence = evidence.filter(ev => {
    const matchesSearch =
      ev.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || ev.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fileName.trim()) {
      setError('Please provide a file name.');
      return;
    }
    if (!caseId) {
      setError('Please select an active case to associate this file with.');
      return;
    }

    addEvidence({
      case_id: caseId,
      file_reference: `vault/private/${caseId}/${fileName.trim()}`,
      file_name: fileName.trim(),
      file_type: fileName.endsWith('.png') || fileName.endsWith('.jpg') ? 'image/png' : 'application/pdf',
      file_size: Math.floor(Math.random() * 350000) + 120000,
      description: description.trim() || 'Attached evidence record',
      category: category,
      is_sample: false
    });

    setFileName('');
    setDescription('');
    setIsUploadModalOpen(false);
  };

  const handleDownload = (ev: Evidence) => {
    const content = `CLEARPATH PRIVATE VAULT EXPORT\n\nFile Name: ${ev.file_name}\nCategory: ${ev.category}\nCase ID: ${ev.case_id}\nUploaded: ${ev.uploaded_at}\nDescription: ${ev.description}\n\nNotice: Stored in private workspace storage. Public access URLs are strictly restricted.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = ev.file_name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight">
            Evidence & Document Vault
          </h1>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            Private, encrypted storage of purchase invoices, courier tracking proofs, and warranty job sheets.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-violet-600/20 transition-all"
        >
          <UploadCloud className="w-4 h-4 text-white" />
          <span>Upload Supporting Record</span>
        </button>
      </div>

      {/* Security Banner */}
      <div className="p-4 bg-[#10131A] text-white rounded-2xl border border-[#252B38] flex items-start gap-3 shadow-xl">
        <Lock className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed space-y-1">
          <p className="font-bold text-[#F8FAFC]">
            Confidentiality & Private Bucket Architecture:
          </p>
          <p className="text-[#A1A1AA]">
            Your evidence records are never indexed by web crawlers or exposed via public file buckets. All files are linked directly to your authenticated workspace.
          </p>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-[#10131A] p-4 rounded-2xl border border-[#252B38] shadow-xl flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search documents by name or description..."
            className="w-full pl-9 pr-4 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs sm:text-sm text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="w-full sm:w-56 py-2 px-3 bg-[#171B25] border border-[#252B38] rounded-xl text-xs font-semibold text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="all">All Document Types</option>
          <option value="receipt">Tax Invoices & Receipts</option>
          <option value="order_confirmation">Order Confirmations</option>
          <option value="warranty_card">Warranty & Job Sheets</option>
          <option value="email_thread">Support Chat & Emails</option>
          <option value="photo">Photos & Screenshots</option>
          <option value="other">Other Records</option>
        </select>
      </div>

      {/* Grid of Files */}
      {filteredEvidence.length === 0 ? (
        <div className="bg-[#171B25] rounded-3xl border border-[#252B38] p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#10131A] border border-[#252B38] text-zinc-500 mx-auto flex items-center justify-center">
            <FileCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#F8FAFC]">
            No documents found
          </h3>
          <p className="text-xs text-[#A1A1AA] max-w-sm mx-auto">
            Upload tax invoices, courier proofs, or technician job sheets to maintain an indisputable case file.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvidence.map(ev => {
            const matchedCase = cases.find(c => c.id === ev.case_id);

            return (
              <div
                key={ev.id}
                className="bg-[#171B25] rounded-2xl border border-[#252B38] hover:border-[#8B5CF6]/50 p-5 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#10131A] text-zinc-300 border border-[#252B38]">
                      {ev.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">
                      {formatFileSize(ev.file_size)}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 flex items-center justify-center shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-[#F8FAFC] truncate">
                        {ev.file_name}
                      </h3>
                      <p className="text-[11px] text-[#A1A1AA] mt-1 line-clamp-2">
                        {ev.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#252B38] space-y-2">
                  {matchedCase && (
                    <button
                      onClick={() => openCaseWorkspace(matchedCase.id)}
                      className="text-[11px] text-violet-400 hover:text-violet-300 font-semibold truncate block max-w-full text-left transition-colors"
                    >
                      Case: {matchedCase.title}
                    </button>
                  )}

                  <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
                    <span className="text-[10px]">
                      {formatDate(ev.uploaded_at)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownload(ev)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:bg-[#10131A] hover:text-violet-400 transition-colors"
                        title="Download file"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteEvidence(ev.id)}
                        className="p-1.5 rounded-lg text-zinc-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
                        title="Delete file"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Supporting Record to Vault"
        subtitle="Associate a verifiable document with an active case"
      >
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Strict Privacy Notice:</span>
            </div>
            <p>
              Do NOT upload bank login credentials, debit/credit card numbers, CVVs, OTPs, or government identity cards (such as Aadhaar or PAN).
            </p>
          </div>

          {error && (
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              Associate with Case
            </label>
            <select
              value={caseId}
              onChange={e => setCaseId(e.target.value)}
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs font-semibold text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {cases.map(c => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.organisation})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              Document Classification
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs font-semibold text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="receipt">Tax Invoice / Receipt</option>
              <option value="order_confirmation">Order Confirmation / Booking Slip</option>
              <option value="warranty_card">Warranty Card / Service Job Sheet</option>
              <option value="email_thread">Support Email Thread / Chat Log</option>
              <option value="photo">Screenshot / Courier Stalled Tracking</option>
              <option value="other">Other Commercial Document</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              File Name
            </label>
            <input
              type="text"
              required
              value={fileName}
              onChange={e => setFileName(e.target.value)}
              placeholder="e.g. TaxInvoice_2025_091.pdf"
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              Document Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. Tax invoice showing purchase amount, date, and committed delivery window..."
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#252B38]">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/20 transition-all"
            >
              Upload to Vault
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
