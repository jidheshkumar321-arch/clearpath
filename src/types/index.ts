// Structured Database & Application Models for CLEARPATH

export type AudienceType = 'individual' | 'business';

export type CaseStatus = 
  | 'draft'
  | 'in_progress'
  | 'waiting_for_response'
  | 'follow_up_needed'
  | 'escalation_available'
  | 'resolved'
  | 'closed_by_user';

export type CaseCategory =
  | 'delayed_delivery'
  | 'refund_follow_up'
  | 'warranty_repair'
  | 'service_complaint'
  | 'subscription_issue'
  | 'supplier_issue'
  | 'tech_service_issue'
  | 'other';

export type EventType =
  | 'initial_attempt'
  | 'communication_sent'
  | 'communication_received'
  | 'evidence_recorded'
  | 'status_changed'
  | 'escalation_prepared'
  | 'follow_up_prompted'
  | 'case_resolved'
  | 'note_logged';

export interface User {
  id: string;
  email: string;
  name: string;
  account_type: AudienceType;
  business_name?: string;
  created_at: string;
}

export interface Case {
  id: string;
  user_id: string;
  title: string;
  category: CaseCategory;
  organisation: string;
  description: string;
  status: CaseStatus;
  audience: AudienceType;
  issue_started_at: string;
  created_at: string;
  updated_at: string;
  order_reference?: string;
  target_resolution?: string;
  priority?: 'low' | 'medium' | 'high';
  is_sample?: boolean;
}

export interface CaseEvent {
  id: string;
  case_id: string;
  event_type: EventType;
  description: string;
  event_date: string;
  source_reference?: string;
  created_at: string;
  created_by_user: boolean;
  is_verified?: boolean;
  is_ai_generated?: boolean;
}

export interface Evidence {
  id: string;
  case_id: string;
  file_reference: string;
  file_name: string;
  file_type: string;
  file_size: number;
  description: string;
  category: 'receipt' | 'order_confirmation' | 'email_thread' | 'photo' | 'warranty_card' | 'other';
  uploaded_at: string;
  is_sample?: boolean;
}

export interface ActionPlan {
  id: string;
  case_id: string;
  title: string;
  suggested_action: string;
  rationale: string;
  source_reference?: string;
  source_title?: string;
  source_url?: string;
  approval_status: 'suggested' | 'accepted' | 'rejected' | 'completed';
  created_at: string;
  is_ai_generated?: boolean;
}

export interface Reminder {
  id: string;
  case_id: string;
  case_title?: string;
  reminder_date: string;
  description: string;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  created_at: string;
}

export interface Note {
  id: string;
  case_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Source {
  id: string;
  title: string;
  url: string;
  jurisdiction: string;
  publisher: string;
  last_reviewed_at: string;
  description: string;
  official_disclaimer: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  record_reference: string;
  details?: string;
  created_at: string;
}

export interface ProcessGuide {
  id: string;
  category: CaseCategory;
  title: string;
  badge: string;
  summary: string;
  what_it_means: string;
  key_checklist: string[];
  first_steps: {
    step: number;
    title: string;
    description: string;
    tips: string;
  }[];
  escalation_path: {
    authority: string;
    portal_name: string;
    url: string;
    when_to_use: string;
    note: string;
  }[];
  official_sources: {
    name: string;
    url: string;
    publisher: string;
    last_reviewed: string;
  }[];
  last_reviewed_at: string;
}
