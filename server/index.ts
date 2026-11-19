import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Input sanitization and sensitive data detection middleware
function securityMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.body && typeof req.body === 'object') {
    const jsonStr = JSON.stringify(req.body);
    // 16-digit card number check
    const cleanNumbers = jsonStr.replace(/\D/g, '');
    if (/\b(?:\d[ -]*?){16}\b/.test(jsonStr) && cleanNumbers.length >= 16) {
      return res.status(400).json({
        error: 'Security Warning: Request appears to contain a credit/debit card number. CLEARPATH strictly forbids submitting payment card details.'
      });
    }
  }
  next();
}

app.use(securityMiddleware);

// In-Memory Database Store structured matching Section 5 schema
interface DbSchema {
  users: Array<{ id: string; email: string; name: string; account_type: string; created_at: string }>;
  cases: Array<{
    id: string;
    user_id: string;
    title: string;
    category: string;
    organisation: string;
    description: string;
    status: string;
    issue_started_at: string;
    created_at: string;
    updated_at: string;
    order_reference?: string;
    audience: string;
    is_sample?: boolean;
  }>;
  case_events: Array<{
    id: string;
    case_id: string;
    event_type: string;
    description: string;
    event_date: string;
    source_reference?: string;
    created_at: string;
    is_verified?: boolean;
  }>;
  evidence: Array<{
    id: string;
    case_id: string;
    file_reference: string;
    file_name: string;
    file_type: string;
    file_size: number;
    description: string;
    category: string;
    uploaded_at: string;
  }>;
  action_plans: Array<{
    id: string;
    case_id: string;
    title: string;
    suggested_action: string;
    rationale: string;
    source_reference?: string;
    approval_status: string;
    created_at: string;
  }>;
  reminders: Array<{
    id: string;
    case_id: string;
    case_title?: string;
    reminder_date: string;
    description: string;
    completed: boolean;
    created_at: string;
  }>;
  notes: Array<{
    id: string;
    case_id: string;
    content: string;
    created_at: string;
    updated_at: string;
  }>;
  audit_logs: Array<{
    id: string;
    user_id: string;
    action: string;
    record_reference: string;
    created_at: string;
  }>;
}

const db: DbSchema = {
  users: [
    {
      id: 'user-demo-1',
      email: 'arjun.mehta@example.in',
      name: 'Arjun Mehta',
      account_type: 'individual',
      created_at: '2025-01-01T00:00:00Z'
    }
  ],
  cases: [
    {
      id: 'case-sample-1',
      user_id: 'user-demo-1',
      title: 'High-Value Ergonomic Chair Delivery Delayed Past Promised Window',
      category: 'delayed_delivery',
      organisation: 'Apex Logistics & UrbanLiving Furniture (Fictional Demo)',
      description: 'Ordered chair Jan 10. Tracking stalled at hub since Jan 17. 48h dispatch commitment elapsed.',
      status: 'waiting_for_response',
      audience: 'individual',
      issue_started_at: '2025-01-18',
      created_at: '2025-01-20T10:30:00Z',
      updated_at: '2025-01-24T14:15:00Z',
      order_reference: 'UL-89412-IN',
      is_sample: true
    }
  ],
  case_events: [
    {
      id: 'evt-101',
      case_id: 'case-sample-1',
      event_type: 'initial_attempt',
      description: 'Order confirmation received via email.',
      event_date: '2025-01-10',
      source_reference: 'Order Confirmation Email #UL-89412-IN',
      created_at: '2025-01-20T10:30:00Z',
      is_verified: true
    }
  ],
  evidence: [],
  action_plans: [],
  reminders: [],
  notes: [],
  audit_logs: []
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'CLEARPATH REST API',
    region: 'India (Default)',
    version: '1.0.0',
    ai_status: process.env.GEMINI_API_KEY ? 'live_configured' : 'rule_based_demonstration'
  });
});

// Cases Endpoints
app.get('/api/cases', (req, res) => {
  const userId = (req.query.userId as string) || 'user-demo-1';
  // Strict tenant boundary
  const userCases = db.cases.filter(c => c.user_id === userId);
  res.json(userCases);
});

app.post('/api/cases', (req, res) => {
  const { title, category, organisation, description, status, audience, issue_started_at, order_reference, userId } = req.body;
  if (!title || !organisation) {
    return res.status(400).json({ error: 'Title and organisation are required.' });
  }

  const newCase = {
    id: `case-${Date.now()}`,
    user_id: userId || 'user-demo-1',
    title,
    category: category || 'other',
    organisation,
    description: description || '',
    status: status || 'in_progress',
    audience: audience || 'individual',
    issue_started_at: issue_started_at || new Date().toISOString().split('T')[0],
    order_reference,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_sample: false
  };

  db.cases.unshift(newCase);
  res.status(201).json(newCase);
});

// AI Draft Endpoint
app.post('/api/ai/draft-message', (req, res) => {
  const { caseTitle, organisation, reference, category, elapsedDays } = req.body;

  // Rule-based structured generator
  const subject = `Urgent Follow-Up: ${caseTitle || 'Case Inquiry'} - Ref: ${reference || '[Reference #]'}`;
  const body = `Dear ${organisation || 'Grievance Redressal Team'},

I am writing regarding the ongoing unresolved issue regarding "${caseTitle || 'our matter'}" (Reference: ${reference || '[Enter Reference ID]'}).

The matter has remained pending past the standard turnaround timeframe of ${elapsedDays || 'several'} business days. 

In accordance with published consumer guidelines and fair service practices, please provide an updated dispatch/resolution status within 48-72 hours.

Regards,
[User Name]`;

  res.json({
    isLiveAi: false,
    mode: 'rule_based_demonstration',
    draft: {
      subject,
      body,
      disclaimer: 'Draft generated based on Indian Consumer Protection (E-Commerce) Rules, 2020. User must review and dispatch manually.'
    }
  });
});

app.listen(PORT, () => {
  console.log(`[CLEARPATH] Server running on http://localhost:${PORT}`);
});
