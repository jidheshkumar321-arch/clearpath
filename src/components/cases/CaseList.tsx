import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Filter,
  PlusCircle,
  LayoutGrid,
  List,
  ArrowRight,
  RotateCcw,
  XCircle
} from 'lucide-react';
import { formatDate, getStatusDetails, getCategoryDetails } from '../../utils/formatters';

export const CaseList: React.FC = () => {
  const {
    cases,
    setCurrentView,
    openCaseWorkspace,
    closeCase,
    reopenCase
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy] = useState<'updated' | 'created'>('updated');
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      // Search filter
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.organisation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.order_reference && c.order_reference.toLowerCase().includes(searchQuery.toLowerCase())) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || c.category === selectedCategory;

      // Status filter
      const matchesStatus =
        selectedStatus === 'all' || c.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'updated') {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [cases, searchQuery, selectedCategory, selectedStatus, sortBy]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight">
            My Cases
          </h1>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            Manage your personal and commercial dispute files, evidence, and progression.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('create-case')}
          className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-lg shadow-violet-600/20 transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4 text-white" />
          <span>Create New Case</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-[#10131A] p-4 rounded-2xl border border-[#252B38] space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by title, organisation, order reference or keywords..."
              className="w-full pl-9 pr-4 py-2 bg-[#171B25] border border-[#252B38] rounded-xl text-sm text-[#F8FAFC] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full md:w-48 py-2 px-3 bg-[#171B25] border border-[#252B38] rounded-xl text-xs font-semibold text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="all">All Categories</option>
              <option value="delayed_delivery">Delayed Delivery</option>
              <option value="refund_follow_up">Refund Follow-Up</option>
              <option value="warranty_repair">Warranty & Repair</option>
              <option value="service_complaint">Service Complaint</option>
              <option value="subscription_issue">Subscription Issue</option>
              <option value="supplier_issue">Supplier Issue</option>
              <option value="tech_service_issue">Software & Tech Service</option>
              <option value="other">Other Issues</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full md:w-48 py-2 px-3 bg-[#171B25] border border-[#252B38] rounded-xl text-xs font-semibold text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="in_progress">In Progress</option>
              <option value="waiting_for_response">Waiting for Response</option>
              <option value="follow_up_needed">Follow-Up Needed</option>
              <option value="escalation_available">Escalation Available</option>
              <option value="resolved">Resolved</option>
              <option value="closed_by_user">Closed by User</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-xl bg-[#171B25] p-1 border border-[#252B38] shrink-0">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-[#252B38] text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
                title="Grid layout"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#252B38] text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
                title="List layout"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {(selectedCategory !== 'all' || selectedStatus !== 'all' || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#252B38] text-xs">
            <span className="text-[#A1A1AA] font-medium">Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#171B25] border border-[#252B38] text-zinc-300">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-rose-400">×</button>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                {selectedCategory.replace('_', ' ')}
                <button onClick={() => setSelectedCategory('all')} className="hover:text-rose-400">×</button>
              </span>
            )}
            {selectedStatus !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#171B25] text-zinc-300 border border-[#252B38]">
                Status: {selectedStatus.replace('_', ' ')}
                <button onClick={() => setSelectedStatus('all')} className="hover:text-rose-400">×</button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="text-xs text-rose-400 hover:underline font-semibold ml-auto"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Case Display Area */}
      {filteredCases.length === 0 ? (
        <div className="bg-[#171B25] rounded-3xl border border-[#252B38] p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#10131A] border border-[#252B38] text-zinc-500 mx-auto flex items-center justify-center">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#F8FAFC]">
            No matching cases found
          </h3>
          <p className="text-xs text-[#A1A1AA] max-w-sm mx-auto">
            Try adjusting your search query or status filter to locate relevant dispute files.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedStatus('all');
            }}
            className="px-4 py-2 rounded-xl bg-[#10131A] hover:bg-[#252B38] text-zinc-300 border border-[#252B38] text-xs font-semibold transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === 'cards' ? (
        /* Card Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map(c => {
            const status = getStatusDetails(c.status);
            const category = getCategoryDetails(c.category);
            const isClosed = c.status === 'resolved' || c.status === 'closed_by_user';

            return (
              <div
                key={c.id}
                className="bg-[#171B25] rounded-2xl border border-[#252B38] hover:border-[#8B5CF6]/50 transition-all flex flex-col justify-between group"
              >
                <div className="p-5 space-y-3">
                  {/* Top tags */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${status.bg} ${status.text} ${status.border}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      {status.label}
                    </span>

                    <span className="text-[11px] text-zinc-500 font-medium">
                      {formatDate(c.updated_at)}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <div>
                    <h3
                      onClick={() => openCaseWorkspace(c.id)}
                      className="text-base font-bold text-[#F8FAFC] group-hover:text-violet-400 cursor-pointer transition-colors line-clamp-2"
                    >
                      {c.title}
                    </h3>
                    <p className="text-xs text-[#A1A1AA] mt-1">
                      Against: <strong className="text-[#F8FAFC]">{c.organisation}</strong>
                    </p>
                  </div>

                  <p className="text-xs text-[#A1A1AA] line-clamp-3 leading-relaxed">
                    {c.description}
                  </p>

                  {/* Meta items */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-[#A1A1AA]">
                    <span className="bg-[#10131A] border border-[#252B38] px-2 py-0.5 rounded text-zinc-300 font-medium">
                      {category.label}
                    </span>
                    {c.order_reference && (
                      <span className="bg-[#10131A] border border-[#252B38] font-mono px-2 py-0.5 rounded text-zinc-400">
                        {c.order_reference}
                      </span>
                    )}
                    {c.is_sample && (
                      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-semibold text-[10px]">
                        Demo
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 bg-[#10131A] border-t border-[#252B38] rounded-b-2xl flex items-center justify-between">
                  {isClosed ? (
                    <button
                      onClick={() => reopenCase(c.id)}
                      className="text-xs text-zinc-400 hover:text-zinc-200 font-semibold flex items-center gap-1 transition-colors"
                      title="Reopen closed case"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reopen
                    </button>
                  ) : (
                    <button
                      onClick={() => closeCase(c.id)}
                      className="text-xs text-zinc-500 hover:text-rose-400 font-medium flex items-center gap-1 transition-colors"
                      title="Mark as closed by user"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Close
                    </button>
                  )}

                  <button
                    onClick={() => openCaseWorkspace(c.id)}
                    className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>Open Case</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List Layout */
        <div className="bg-[#171B25] rounded-2xl border border-[#252B38] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#10131A] border-b border-[#252B38] text-zinc-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Case Title & Organisation</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Reference</th>
                  <th className="py-3 px-4">Last Updated</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252B38] text-zinc-300">
                {filteredCases.map(c => {
                  const status = getStatusDetails(c.status);
                  const category = getCategoryDetails(c.category);

                  return (
                    <tr
                      key={c.id}
                      className="hover:bg-[#1E2430]/70 transition-colors cursor-pointer"
                      onClick={() => openCaseWorkspace(c.id)}
                    >
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-semibold border ${status.bg} ${status.text} ${status.border}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                          {status.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#F8FAFC] hover:text-violet-400 transition-colors">
                          {c.title}
                        </div>
                        <div className="text-[#A1A1AA] text-[11px]">
                          Target: {c.organisation}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="bg-[#10131A] border border-[#252B38] text-zinc-300 px-2 py-0.5 rounded font-medium">
                          {category.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap font-mono text-zinc-400">
                        {c.order_reference || '—'}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-zinc-500">
                        {formatDate(c.updated_at)}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            openCaseWorkspace(c.id);
                          }}
                          className="px-3 py-1 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-semibold transition-colors"
                        >
                          Workspace
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
