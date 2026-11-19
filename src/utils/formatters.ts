import { CaseCategory, CaseStatus, AudienceType } from '../types';

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString: string | undefined): string {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateString;
  }
}

export function getStatusDetails(status: CaseStatus): {
  label: string;
  bg: string;
  text: string;
  border: string;
  dot: string;
} {
  switch (status) {
    case 'draft':
      return {
        label: 'Draft',
        bg: 'bg-zinc-800/60',
        text: 'text-zinc-300',
        border: 'border-zinc-700/60',
        dot: 'bg-zinc-400'
      };
    case 'in_progress':
      return {
        label: 'In Progress',
        bg: 'bg-blue-500/15',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        dot: 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]'
      };
    case 'waiting_for_response':
      return {
        label: 'Waiting for Response',
        bg: 'bg-amber-500/15',
        text: 'text-amber-300',
        border: 'border-amber-500/30',
        dot: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]'
      };
    case 'follow_up_needed':
      return {
        label: 'Follow-Up Needed',
        bg: 'bg-rose-500/15',
        text: 'text-rose-400',
        border: 'border-rose-500/30',
        dot: 'bg-rose-400 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]'
      };
    case 'escalation_available':
      return {
        label: 'Escalation Info Available',
        bg: 'bg-purple-500/15',
        text: 'text-purple-300',
        border: 'border-purple-500/30',
        dot: 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.6)]'
      };
    case 'resolved':
      return {
        label: 'Resolved',
        bg: 'bg-emerald-500/15',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        dot: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]'
      };
    case 'closed_by_user':
      return {
        label: 'Closed by User',
        bg: 'bg-zinc-800/40',
        text: 'text-zinc-400',
        border: 'border-zinc-700/50',
        dot: 'bg-zinc-500'
      };
    default:
      return {
        label: status,
        bg: 'bg-zinc-800/50',
        text: 'text-zinc-300',
        border: 'border-zinc-700/50',
        dot: 'bg-zinc-400'
      };
  }
}

export function getCategoryDetails(category: CaseCategory): {
  label: string;
  iconName: string;
} {
  switch (category) {
    case 'delayed_delivery':
      return { label: 'Delayed Delivery', iconName: 'Truck' };
    case 'refund_follow_up':
      return { label: 'Refund Follow-Up', iconName: 'CreditCard' };
    case 'warranty_repair':
      return { label: 'Warranty & Repair', iconName: 'Wrench' };
    case 'service_complaint':
      return { label: 'Service Complaint', iconName: 'AlertCircle' };
    case 'subscription_issue':
      return { label: 'Subscription Issue', iconName: 'Repeat' };
    case 'supplier_issue':
      return { label: 'Supplier Issue', iconName: 'Building2' };
    case 'tech_service_issue':
      return { label: 'Software & Tech Service', iconName: 'Cpu' };
    case 'other':
    default:
      return { label: 'Other Issue', iconName: 'HelpCircle' };
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
