import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Case, Evidence } from '../../types';
import {
  FileCheck,
  FileText,
  Download,
  Trash2,
  ShieldAlert,
  Plus,
  Lock
} from 'lucide-react';
import { formatDate, formatFileSize } from '../../utils/formatters';
import { Modal } from '../common/Modal';

interface CaseEvidenceProps {
  currentCase: Case;
  evidenceList: Evidence[];
}

export const CaseEvidence: React.FC<CaseEvidenceProps> = ({ currentCase, evidenceList }) => {
  const { addEvidence, deleteEvidence } = useApp();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Form state
  const [fileName, setFileName] = useState('');
  const [category, setCategory] = useState<Evidence['category']>('receipt');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const caseEvidence = evidenceList.filter(e => e.case_id === currentCase.id);

  const handleUploadSimulated = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fileName.trim()) {
      setError('Please provide a file name.');
      return;
    }

    addEvidence({
      case_id: currentCase.id,
      file_reference: `vault/private/${currentCase.id}/${fileName.trim()}`,
      file_name: fileName.trim(),
      file_type: fileName.endsWith('.png') || fileName.endsWith('.jpg') ? 'image/png' : 'application/pdf',
      file_size: Math.floor(Math.random() * 400000) + 150000,
      description: description.trim() || 'Attached evidence record',
      category: category,
      is_sample: false
    });

    setFileName('');
    setDescription('');
    setIsUploadModalOpen(false);
  };

  const handleDownload = (ev: Evidence) => {
    const content = `CLEARPATH PRIVATE EVIDENCE RECORD\n\nCase ID: ${ev.case_id}\nFile Name: ${ev.file_name}\nCategory: ${ev.category}\nUploaded: ${ev.uploaded_at}\nDescription: ${ev.description}\n\nNotice: Stored in private local workspace vault. This is a demonstration download representation.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = ev.file_name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#10131A] rounded-2xl border border-[#252B38] p-6 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-blue-400" />
            <h3 className="text-base font-bold text-[#F8FAFC]">
              Evidence Checklist & Vault
            </h3>
          </div>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            Private, access-controlled document records supporting your claims.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-3.5 h-3.5 text-white" />
          <span>Attach Evidence File</span>
        </button>
      </div>

      {/* Security notice */}
      <div className="p-3 bg-[#171B25] rounded-xl border border-[#252B38] flex items-center gap-2 text-xs text-zinc-300">
        <Lock className="w-4 h-4 text-blue-400 shrink-0" />
        <span>
          Files are stored privately without public search engine URLs. Never attach banking cards, passwords, or OTPs.
        </span>
      </div>

      {caseEvidence.length === 0 ? (
        <div className="py-8 text-center text-xs text-zinc-500 italic">
          No evidence files attached yet. Upload receipts, job sheets, or email threads to reinforce your file.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {caseEvidence.map(ev => (
            <div
              key={ev.id}
              className="p-4 rounded-xl border border-[#252B38] bg-[#171B25] hover:border-[#3B82F6]/50 transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#10131A] border border-[#252B38] text-zinc-300">
                    {ev.category.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {formatFileSize(ev.file_size)}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#F8FAFC] truncate">
                      {ev.file_name}
                    </h4>
                    <p className="text-[11px] text-[#A1A1AA] mt-0.5 line-clamp-2">
                      {ev.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#252B38] flex items-center justify-between text-xs">
                <span className="text-[10px] text-zinc-500">
                  {formatDate(ev.uploaded_at)}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(ev)}
                    className="p-1 text-zinc-400 hover:text-blue-400 hover:bg-[#10131A] rounded transition-colors"
                    title="Download document"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteEvidence(ev.id)}
                    className="p-1 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
                    title="Remove document"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Attach Evidence Record"
        subtitle="Add a supporting invoice, job sheet, or tracking screenshot"
      >
        <form onSubmit={handleUploadSimulated} className="space-y-4">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Data Minimisation Rule:</span>
            </div>
            <p>
              Do NOT attach files containing debit/credit card numbers, CVVs, passwords, or government identity cards (such as Aadhaar or PAN).
            </p>
          </div>

          {error && (
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              Document Classification
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs font-semibold text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="receipt">Tax Invoice / Payment Receipt</option>
              <option value="order_confirmation">Order Confirmation / Booking Slip</option>
              <option value="warranty_card">Authorized Job Sheet / Warranty Card</option>
              <option value="email_thread">Customer Support Chat / Email Thread</option>
              <option value="photo">Defect Photo / Courier Tracking Screenshot</option>
              <option value="other">Other Supporting Record</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              File Name / Document Label
            </label>
            <input
              type="text"
              required
              value={fileName}
              onChange={e => setFileName(e.target.value)}
              placeholder="e.g. UrbanLiving_TaxInvoice_UL89412.pdf"
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
              Brief Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. Printed job sheet signed by technician stating spare part is on backorder..."
              className="w-full px-3 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 transition-all"
            >
              Save to Case Vault
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
