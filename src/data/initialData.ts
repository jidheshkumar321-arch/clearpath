import { Case, CaseEvent, Evidence, ActionPlan, Reminder, Note } from '../types';

export const SAMPLE_CASES: Case[] = [
  {
    id: 'case-sample-1',
    user_id: 'user-demo-1',
    title: 'High-Value Ergonomic Chair Delivery Delayed Past Promised Window',
    category: 'delayed_delivery',
    organisation: 'Apex Logistics & UrbanLiving Furniture (Fictional Demo)',
    description: 'Ordered an ergonomic office chair for home office on Jan 10. Estimated delivery window was Jan 15-18. Courier tracking shows "Shipment In Transit at Hub" since Jan 17 with no movement. Customer support chat acknowledged delay on Jan 22 and promised dispatch within 24 hours, but no update has occurred.',
    status: 'waiting_for_response',
    audience: 'individual',
    issue_started_at: '2025-01-18',
    created_at: '2025-01-20T10:30:00Z',
    updated_at: '2025-01-24T14:15:00Z',
    order_reference: 'UL-89412-IN',
    target_resolution: 'Confirmed delivery within 48 hours or complete cancellation with full refund to original payment card.',
    priority: 'high',
    is_sample: true
  },
  {
    id: 'case-sample-2',
    user_id: 'user-demo-1',
    title: 'Defective Laptop Display Service & Repair Delay at Authorized Center',
    category: 'warranty_repair',
    organisation: 'NovaTech Authorized Service Centre (Fictional Demo)',
    description: 'Laptop screen started flickering and displaying vertical pink lines under 1-year manufacturer warranty. Handed over device to authorized service center on Jan 5 with printed job sheet stating 7 days turnaround. On Jan 16, technician stated display replacement part is on backorder with no firm arrival date.',
    status: 'follow_up_needed',
    audience: 'individual',
    issue_started_at: '2025-01-05',
    created_at: '2025-01-12T11:00:00Z',
    updated_at: '2025-01-25T09:00:00Z',
    order_reference: 'JOB-NT-2025-774',
    target_resolution: 'Expedited replacement screen installation within 3 working days or authorization for product replacement under warranty terms.',
    priority: 'high',
    is_sample: true
  },
  {
    id: 'case-sample-3',
    user_id: 'user-demo-1',
    title: 'Unintended Annual Renewal Auto-Debit Despite Prior Plan Downgrade',
    category: 'subscription_issue',
    organisation: 'CloudSync Productivity Suite (Fictional Demo)',
    description: 'Requested plan downgrade to Free tier on Dec 20, 2024 before annual renewal date of Jan 2, 2025. On Jan 2, credit card was charged for full annual Pro Tier ($149 / ₹12,400 equivalent). Submitted support ticket #88921 requesting refund. Support replied stating annual subscriptions are non-refundable according to policy.',
    status: 'in_progress',
    audience: 'individual',
    issue_started_at: '2025-01-02',
    created_at: '2025-01-03T16:45:00Z',
    updated_at: '2025-01-22T12:00:00Z',
    order_reference: 'SUB-CS-99120',
    target_resolution: 'Prorated or full refund of auto-renewed charge and confirmation of cancellation.',
    priority: 'medium',
    is_sample: true
  },
  {
    id: 'case-sample-4',
    user_id: 'user-demo-1',
    title: 'Custom Packaging Material Delivery Delay Impacting Product Shipments',
    category: 'supplier_issue',
    organisation: 'Kavya Packaging Solutions Pvt Ltd (Fictional Demo)',
    description: 'Issued Purchase Order PO-2025-084 for 5,000 custom branded corrugated boxes on Jan 2 with 50% advance payment (₹45,000) transferred via NEFT. Contractual delivery commitment was Jan 18. Supplier factory cited machine maintenance delay and promised dispatch by Jan 22, but goods have not been shipped.',
    status: 'waiting_for_response',
    audience: 'business',
    issue_started_at: '2025-01-18',
    created_at: '2025-01-19T09:30:00Z',
    updated_at: '2025-01-24T16:00:00Z',
    order_reference: 'PO-2025-084',
    target_resolution: 'Written dispatch commitment with tracking number by tomorrow, or refund of ₹45,000 advance to permit emergency vendor procurement.',
    priority: 'high',
    is_sample: true
  }
];

export const SAMPLE_EVENTS: CaseEvent[] = [
  // Case 1 Events
  {
    id: 'evt-101',
    case_id: 'case-sample-1',
    event_type: 'initial_attempt',
    description: 'Order placed online on UrbanLiving portal. Order acknowledgment received.',
    event_date: '2025-01-10',
    source_reference: 'Order Confirmation Email #UL-89412-IN',
    created_at: '2025-01-20T10:30:00Z',
    created_by_user: true,
    is_verified: true
  },
  {
    id: 'evt-102',
    case_id: 'case-sample-1',
    event_type: 'communication_sent',
    description: 'Sent message via UrbanLiving customer support portal inquiry regarding tracking delay past Jan 18 delivery date.',
    event_date: '2025-01-19',
    source_reference: 'Support Ticket #99104',
    created_at: '2025-01-20T10:35:00Z',
    created_by_user: true
  },
  {
    id: 'evt-103',
    case_id: 'case-sample-1',
    event_type: 'communication_received',
    description: 'Support representative "Anand" replied: "Delay due to regional hub sorting backlog. Expedited tag added; delivery committed within 48 hours."',
    event_date: '2025-01-22',
    source_reference: 'Support Ticket #99104 Agent Reply',
    created_at: '2025-01-22T14:00:00Z',
    created_by_user: true
  },
  {
    id: 'evt-104',
    case_id: 'case-sample-1',
    event_type: 'status_changed',
    description: 'Status changed to "Waiting for response". 48-hour delivery commitment elapsed without courier movement.',
    event_date: '2025-01-24',
    created_at: '2025-01-24T14:15:00Z',
    created_by_user: true
  },

  // Case 2 Events
  {
    id: 'evt-201',
    case_id: 'case-sample-2',
    event_type: 'evidence_recorded',
    description: 'Device submitted to NovaTech Authorized Service Centre. Printed job sheet generated noting screen defect.',
    event_date: '2025-01-05',
    source_reference: 'Job Sheet #JOB-NT-2025-774',
    created_at: '2025-01-12T11:00:00Z',
    created_by_user: true,
    is_verified: true
  },
  {
    id: 'evt-202',
    case_id: 'case-sample-2',
    event_type: 'communication_received',
    description: 'Service center called stating screen panel is out of stock nationally and ETA is indefinite.',
    event_date: '2025-01-16',
    source_reference: 'Phone call with Service Manager Mr. Verma',
    created_at: '2025-01-16T15:30:00Z',
    created_by_user: true
  },
  {
    id: 'evt-203',
    case_id: 'case-sample-2',
    event_type: 'escalation_prepared',
    description: 'Drafted formal warranty compliance letter requesting replacement device or firm 5-day delivery date under manufacturer service charter.',
    event_date: '2025-01-25',
    created_at: '2025-01-25T09:00:00Z',
    created_by_user: true,
    is_ai_generated: false
  },

  // Case 4 Events (B2B)
  {
    id: 'evt-401',
    case_id: 'case-sample-4',
    event_type: 'initial_attempt',
    description: 'PO-2025-084 signed and emailed with payment transfer UTR of ₹45,000.',
    event_date: '2025-01-02',
    source_reference: 'PO #PO-2025-084 / NEFT Ref #SBIN92819024',
    created_at: '2025-01-19T09:30:00Z',
    created_by_user: true,
    is_verified: true
  },
  {
    id: 'evt-402',
    case_id: 'case-sample-4',
    event_type: 'communication_sent',
    description: 'Sent formal milestone reminder email asking for dispatch docket number as production was due Jan 18.',
    event_date: '2025-01-20',
    source_reference: 'Email to accounts@kavyapackaging.demo',
    created_at: '2025-01-20T11:00:00Z',
    created_by_user: true
  }
];

export const SAMPLE_EVIDENCE: Evidence[] = [
  {
    id: 'ev-1',
    case_id: 'case-sample-1',
    file_reference: 'storage/samples/order_confirmation_UL89412.pdf',
    file_name: 'UrbanLiving_OrderConfirmation_UL89412.pdf',
    file_type: 'application/pdf',
    file_size: 245000,
    description: 'Official tax invoice and delivery promise window receipt.',
    category: 'receipt',
    uploaded_at: '2025-01-20T10:32:00Z',
    is_sample: true
  },
  {
    id: 'ev-2',
    case_id: 'case-sample-1',
    file_reference: 'storage/samples/courier_tracking_hub_stuck.png',
    file_name: 'Apex_Courier_Tracking_Screenshot_Jan22.png',
    file_type: 'image/png',
    file_size: 480000,
    description: 'Screenshot showing courier status frozen at regional hub for 5 consecutive days.',
    category: 'other',
    uploaded_at: '2025-01-22T14:10:00Z',
    is_sample: true
  },
  {
    id: 'ev-3',
    case_id: 'case-sample-2',
    file_reference: 'storage/samples/service_job_sheet_774.pdf',
    file_name: 'NovaTech_JobSheet_774.pdf',
    file_type: 'application/pdf',
    file_size: 310000,
    description: 'Authorized service centre printed job sheet confirming warranty coverage and defect inspection.',
    category: 'warranty_card',
    uploaded_at: '2025-01-12T11:05:00Z',
    is_sample: true
  },
  {
    id: 'ev-4',
    case_id: 'case-sample-4',
    file_reference: 'storage/samples/po_advance_payment_receipt.pdf',
    file_name: 'PurchaseOrder_2025_084_Advance_Receipt.pdf',
    file_type: 'application/pdf',
    file_size: 420000,
    description: 'Signed Purchase Order with delivery specifications and NEFT bank transfer confirmation.',
    category: 'receipt',
    uploaded_at: '2025-01-19T09:35:00Z',
    is_sample: true
  }
];

export const SAMPLE_ACTION_PLANS: ActionPlan[] = [
  {
    id: 'act-1',
    case_id: 'case-sample-1',
    title: 'Submit Formal Grievance to Company Grievance Officer',
    suggested_action: 'Email the Grievance Officer with the complete chronological timeline, referencing previous chat ticket #99104, giving a 48-hour final delivery window or cancellation request.',
    rationale: 'Under Consumer Protection (E-Commerce) Rules, 2020, registered e-commerce entities must have an appointed Grievance Officer who must acknowledge receipt within 48 hours.',
    source_reference: 'Consumer Protection (E-Commerce) Rules, 2020, Rule 5(4)',
    source_title: 'Ministry of Consumer Affairs Guidelines',
    source_url: 'https://consumeraffairs.nic.in/',
    approval_status: 'accepted',
    created_at: '2025-01-23T10:00:00Z',
    is_ai_generated: true
  },
  {
    id: 'act-2',
    case_id: 'case-sample-1',
    title: 'Prepare National Consumer Helpline Docket Submission (Fallback)',
    suggested_action: 'If the Grievance Officer does not provide dispatch confirmation or initiate cancellation within 48 hours, lodge a grievance on consumerhelpline.gov.in (NCH).',
    rationale: 'NCH provides direct dispute facilitation with convergence partner platforms without requiring formal legal filing.',
    source_reference: 'National Consumer Helpline Portal',
    source_title: 'consumerhelpline.gov.in',
    source_url: 'https://consumerhelpline.gov.in/',
    approval_status: 'suggested',
    created_at: '2025-01-24T14:30:00Z',
    is_ai_generated: true
  },
  {
    id: 'act-3',
    case_id: 'case-sample-2',
    title: 'Request Device Replacement or Commercial Credit Note',
    suggested_action: 'Under standard warranty terms, if spare parts cannot be provided within 14-21 business days, customer is entitled to formal escalation to brand corporate service head for device replacement.',
    rationale: 'Manufacturer service charters stipulate reasonable repair timeframes. Excessive indefinite delays constitute deficiency in after-sales service.',
    source_reference: 'Consumer Protection Act, 2019, Section 2(11) (Deficiency in Service)',
    source_title: 'Statutory Consumer Guidelines',
    source_url: 'https://consumeraffairs.nic.in/',
    approval_status: 'suggested',
    created_at: '2025-01-25T09:10:00Z',
    is_ai_generated: true
  }
];

export const SAMPLE_REMINDERS: Reminder[] = [
  {
    id: 'rem-1',
    case_id: 'case-sample-1',
    case_title: 'High-Value Ergonomic Chair Delivery Delayed Past Promised Window',
    reminder_date: '2025-01-26',
    description: 'Check courier tracking; if still stalled, send escalation email to UrbanLiving Grievance Officer.',
    completed: false,
    priority: 'high',
    created_at: '2025-01-24T14:20:00Z'
  },
  {
    id: 'rem-2',
    case_id: 'case-sample-2',
    case_title: 'Defective Laptop Display Service & Repair Delay at Authorized Center',
    reminder_date: '2025-01-27',
    description: 'Call NovaTech service manager for part procurement tracking number.',
    completed: false,
    priority: 'high',
    created_at: '2025-01-25T09:15:00Z'
  },
  {
    id: 'rem-3',
    case_id: 'case-sample-3',
    case_title: 'Unintended Annual Renewal Auto-Debit Despite Prior Plan Downgrade',
    reminder_date: '2025-01-28',
    description: 'Verify if credit card issuer has acknowledged the transaction dispute filing.',
    completed: false,
    priority: 'medium',
    created_at: '2025-01-22T12:10:00Z'
  },
  {
    id: 'rem-4',
    case_id: 'case-sample-4',
    case_title: 'Custom Packaging Material Delivery Delay Impacting Product Shipments',
    reminder_date: '2025-01-25',
    description: 'Confirm factory dispatch docket or issue formal demand notice for advance refund.',
    completed: true,
    priority: 'high',
    created_at: '2025-01-24T16:05:00Z'
  }
];

export const SAMPLE_NOTES: Note[] = [
  {
    id: 'note-1',
    case_id: 'case-sample-1',
    content: 'Spoke with delivery driver on Jan 21. Driver mentioned the regional warehouse has hundreds of backlogged parcels due to local transport strike, but corporate customer support failed to acknowledge this publicly.',
    created_at: '2025-01-21T18:00:00Z',
    updated_at: '2025-01-21T18:00:00Z'
  },
  {
    id: 'note-2',
    case_id: 'case-sample-2',
    content: 'Laptop contains work files needed for quarter-end reporting. Need to emphasize the business urgency in the escalation letter.',
    created_at: '2025-01-25T09:20:00Z',
    updated_at: '2025-01-25T09:20:00Z'
  }
];
