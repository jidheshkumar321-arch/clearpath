import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  PlusCircle,
  Truck,
  Cpu,
  ArrowRight,
  Users
} from 'lucide-react';
import { getStatusDetails } from '../../utils/formatters';

export const BusinessWorkspace: React.FC = () => {
  const {
    user,
    cases,
    openCaseWorkspace,
    setCurrentView
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'supplier' | 'service'>('all');

  const businessCases = cases.filter(c => c.audience === 'business');
  const supplierCases = businessCases.filter(c => c.category === 'supplier_issue');
  const serviceCases = businessCases.filter(c => c.category === 'tech_service_issue' || c.category === 'service_complaint');

  const filtered = activeTab === 'all'
    ? businessCases
    : activeTab === 'supplier'
    ? supplierCases
    : serviceCases;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Business Header */}
      <div className="bg-gradient-to-r from-[#10131A] via-[#171B25] to-[#10131A] border border-[#252B38] rounded-3xl p-6 sm:p-8 text-[#F8FAFC] shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Small Business Mode (Proprietor Edition)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F8FAFC]">
              {user?.business_name || 'Business Operational Workspace'}
            </h1>
            <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-2xl leading-relaxed">
              Maintain strict commercial accountability for supplier delivery delays, B2B SaaS service outages, advance payment reconciliations, and contract milestones.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('create-case')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              <span>Log Commercial Issue</span>
            </button>
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#171B25] p-5 rounded-2xl border border-[#252B38] shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Total B2B Files</span>
            <Building2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-[#F8FAFC]">{businessCases.length}</div>
          <p className="text-[11px] text-zinc-500 mt-1">Vendor & operational cases</p>
        </div>

        <div className="bg-[#171B25] p-5 rounded-2xl border border-[#252B38] shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Supplier Delays</span>
            <Truck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">{supplierCases.length}</div>
          <p className="text-[11px] text-zinc-500 mt-1">PO delivery milestones</p>
        </div>

        <div className="bg-[#171B25] p-5 rounded-2xl border border-[#252B38] shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">SaaS / Service Outages</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-400">{serviceCases.length}</div>
          <p className="text-[11px] text-zinc-500 mt-1">SLA & tech billing issues</p>
        </div>
      </div>

      {/* Architecture Readiness Notice */}
      <div className="p-4 rounded-2xl bg-[#171B25] border border-[#252B38] text-xs text-zinc-300 flex items-start gap-3">
        <Users className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-[#F8FAFC]">Multi-User & Delegation Architecture:</strong> Designed for single business owners and proprietors today, with clean underlying data structures prepared for future multi-seat workspaces, staff permissions, and shared commercial dispute files.
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#252B38] pb-3 text-xs">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'all'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-[#A1A1AA] hover:bg-[#171B25] hover:text-white'
          }`}
        >
          All Commercial Cases ({businessCases.length})
        </button>
        <button
          onClick={() => setActiveTab('supplier')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'supplier'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-[#A1A1AA] hover:bg-[#171B25] hover:text-white'
          }`}
        >
          Supplier & Inventory ({supplierCases.length})
        </button>
        <button
          onClick={() => setActiveTab('service')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'service'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-[#A1A1AA] hover:bg-[#171B25] hover:text-white'
          }`}
        >
          Service & Technology ({serviceCases.length})
        </button>
      </div>

      {/* Cases List */}
      {filtered.length === 0 ? (
        <div className="bg-[#171B25] rounded-3xl border border-[#252B38] p-12 text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-[#10131A] text-blue-400 border border-[#252B38] mx-auto flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#F8FAFC]">
            No small business cases logged in this view
          </h3>
          <p className="text-xs text-[#A1A1AA] max-w-sm mx-auto">
            Log your commercial supplier issues, purchase order delays, or service disputes to track them calmly.
          </p>
          <button
            onClick={() => setCurrentView('create-case')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
          >
            Create Commercial Case
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(c => {
            const status = getStatusDetails(c.status);

            return (
              <div
                key={c.id}
                onClick={() => openCaseWorkspace(c.id)}
                className="bg-[#171B25] rounded-2xl border border-[#252B38] p-6 shadow-xl hover:border-[#3B82F6]/50 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${status.bg} ${status.text} ${status.border}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      {status.label}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">
                      PO / Ref: {c.order_reference || 'N/A'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-blue-400 transition-colors">
                    {c.title}
                  </h3>

                  <p className="text-xs text-[#A1A1AA] line-clamp-3 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#252B38] flex items-center justify-between text-xs text-[#A1A1AA]">
                  <span>Vendor: <strong className="text-[#F8FAFC]">{c.organisation}</strong></span>
                  <span className="text-blue-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Workspace <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
