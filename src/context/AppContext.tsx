import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Case,
  CaseEvent,
  Evidence,
  ActionPlan,
  Reminder,
  Note,
  AuditLog,
  CaseStatus,
  AudienceType
} from '../types';
import {
  SAMPLE_CASES,
  SAMPLE_EVENTS,
  SAMPLE_EVIDENCE,
  SAMPLE_ACTION_PLANS,
  SAMPLE_REMINDERS,
  SAMPLE_NOTES
} from '../data/initialData';

export type AppView =
  | 'landing'
  | 'dashboard'
  | 'cases'
  | 'case-workspace'
  | 'create-case'
  | 'reminders'
  | 'documents'
  | 'guides'
  | 'business'
  | 'settings'
  | 'sign-in'
  | 'sign-up'
  | 'recovery';

interface AppContextType {
  user: User | null;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedCaseId: string | null;
  setSelectedCaseId: (id: string | null) => void;
  openCaseWorkspace: (caseId: string) => void;
  
  cases: Case[];
  events: CaseEvent[];
  evidence: Evidence[];
  actionPlans: ActionPlan[];
  reminders: Reminder[];
  notes: Note[];
  auditLogs: AuditLog[];
  
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  backendConnected: boolean;
  checkBackendConnection: () => Promise<void>;
  
  // Actions
  createCase: (data: Omit<Case, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => string;
  updateCase: (id: string, updates: Partial<Case>) => void;
  closeCase: (id: string) => void;
  reopenCase: (id: string) => void;
  deleteCase: (id: string) => void;
  
  addEvent: (data: Omit<CaseEvent, 'id' | 'created_at'>) => void;
  addEvidence: (data: Omit<Evidence, 'id' | 'uploaded_at'>) => void;
  deleteEvidence: (id: string) => void;
  
  addActionPlan: (data: Omit<ActionPlan, 'id' | 'created_at'>) => void;
  updateActionPlanStatus: (id: string, status: ActionPlan['approval_status']) => void;
  
  addReminder: (data: Omit<Reminder, 'id' | 'created_at'>) => void;
  toggleReminder: (id: string) => void;
  deleteReminder: (id: string) => void;
  
  addNote: (caseId: string, content: string) => void;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
  
  logAudit: (action: string, recordReference: string, details?: string) => void;
  resetToSampleData: () => void;
  clearUserData: () => void;
  
  // Auth
  signIn: (email: string, name?: string, type?: AudienceType) => void;
  signOut: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: 'user-demo-1',
  email: 'arjun.mehta@example.in',
  name: 'Arjun Mehta',
  account_type: 'individual',
  business_name: 'Mehta Artisan Goods',
  created_at: '2025-01-01T00:00:00Z'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('clearpath_user');
    return saved ? JSON.parse(saved) : DEMO_USER;
  });

  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [backendConnected, setBackendConnected] = useState<boolean>(false);

  // Core entities with localStorage caching
  const [cases, setCases] = useState<Case[]>(() => {
    const saved = localStorage.getItem('clearpath_cases');
    return saved ? JSON.parse(saved) : SAMPLE_CASES;
  });

  const [events, setEvents] = useState<CaseEvent[]>(() => {
    const saved = localStorage.getItem('clearpath_events');
    return saved ? JSON.parse(saved) : SAMPLE_EVENTS;
  });

  const [evidence, setEvidence] = useState<Evidence[]>(() => {
    const saved = localStorage.getItem('clearpath_evidence');
    return saved ? JSON.parse(saved) : SAMPLE_EVIDENCE;
  });

  const [actionPlans, setActionPlans] = useState<ActionPlan[]>(() => {
    const saved = localStorage.getItem('clearpath_action_plans');
    return saved ? JSON.parse(saved) : SAMPLE_ACTION_PLANS;
  });

  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('clearpath_reminders');
    return saved ? JSON.parse(saved) : SAMPLE_REMINDERS;
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('clearpath_notes');
    return saved ? JSON.parse(saved) : SAMPLE_NOTES;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('clearpath_audit_logs');
    return saved ? JSON.parse(saved) : [
      {
        id: 'audit-init',
        user_id: DEMO_USER.id,
        action: 'ACCOUNT_LOGIN',
        record_reference: 'Session: DEMO_START',
        details: 'User authenticated in demonstration mode',
        created_at: new Date().toISOString()
      }
    ];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('clearpath_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('clearpath_cases', JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem('clearpath_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('clearpath_evidence', JSON.stringify(evidence));
  }, [evidence]);

  useEffect(() => {
    localStorage.setItem('clearpath_action_plans', JSON.stringify(actionPlans));
  }, [actionPlans]);

  useEffect(() => {
    localStorage.setItem('clearpath_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('clearpath_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('clearpath_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const checkBackendConnection = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        setBackendConnected(true);
      } else {
        setBackendConnected(false);
      }
    } catch {
      setBackendConnected(false);
    }
  };

  useEffect(() => {
    checkBackendConnection();
  }, []);

  const logAudit = (action: string, recordReference: string, details?: string) => {
    const newLog: AuditLog = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      user_id: user ? user.id : 'anonymous',
      action,
      record_reference: recordReference,
      details,
      created_at: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const openCaseWorkspace = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentView('case-workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    logAudit('VIEW_CASE', caseId, 'User opened case workspace');
  };

  const createCase = (data: Omit<Case, 'id' | 'created_at' | 'updated_at' | 'user_id'>): string => {
    const newId = `case-${Date.now()}`;
    const now = new Date().toISOString();
    const newCase: Case = {
      ...data,
      id: newId,
      user_id: user ? user.id : 'user-demo-1',
      created_at: now,
      updated_at: now,
      is_sample: false
    };

    setCases(prev => [newCase, ...prev]);

    // Add initial event
    const initialEvent: CaseEvent = {
      id: `evt-${Date.now()}`,
      case_id: newId,
      event_type: 'initial_attempt',
      description: `Case created: "${data.title}" against ${data.organisation}. Status: ${data.status}.`,
      event_date: data.issue_started_at || now.split('T')[0],
      created_at: now,
      created_by_user: true,
      is_verified: true
    };
    setEvents(prev => [initialEvent, ...prev]);

    logAudit('CREATE_CASE', newId, `Case created: ${data.title}`);
    return newId;
  };

  const updateCase = (id: string, updates: Partial<Case>) => {
    const now = new Date().toISOString();
    setCases(prev =>
      prev.map(c => {
        if (c.id === id) {
          return { ...c, ...updates, updated_at: now };
        }
        return c;
      })
    );
    logAudit('UPDATE_CASE', id, `Updated fields: ${Object.keys(updates).join(', ')}`);
  };

  const closeCase = (id: string) => {
    updateCase(id, { status: 'closed_by_user' });
    const now = new Date().toISOString();
    setEvents(prev => [
      {
        id: `evt-${Date.now()}`,
        case_id: id,
        event_type: 'status_changed',
        description: 'Case marked as closed by user.',
        event_date: now.split('T')[0],
        created_at: now,
        created_by_user: true
      },
      ...prev
    ]);
    logAudit('CLOSE_CASE', id, 'Case closed by user');
  };

  const reopenCase = (id: string) => {
    updateCase(id, { status: 'in_progress' });
    const now = new Date().toISOString();
    setEvents(prev => [
      {
        id: `evt-${Date.now()}`,
        case_id: id,
        event_type: 'status_changed',
        description: 'Case reopened by user.',
        event_date: now.split('T')[0],
        created_at: now,
        created_by_user: true
      },
      ...prev
    ]);
    logAudit('REOPEN_CASE', id, 'Case reopened by user');
  };

  const deleteCase = (id: string) => {
    setCases(prev => prev.filter(c => c.id !== id));
    setEvents(prev => prev.filter(e => e.case_id !== id));
    setEvidence(prev => prev.filter(ev => ev.case_id !== id));
    setActionPlans(prev => prev.filter(ap => ap.case_id !== id));
    setReminders(prev => prev.filter(r => r.case_id !== id));
    setNotes(prev => prev.filter(n => n.case_id !== id));
    if (selectedCaseId === id) {
      setSelectedCaseId(null);
      setCurrentView('cases');
    }
    logAudit('DELETE_CASE', id, 'User deleted case and related records');
  };

  const addEvent = (data: Omit<CaseEvent, 'id' | 'created_at'>) => {
    const newEvent: CaseEvent = {
      ...data,
      id: `evt-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setEvents(prev => [newEvent, ...prev]);
    // Also bump updated_at on the parent case
    updateCase(data.case_id, {});
    logAudit('ADD_EVENT', data.case_id, `Added event: ${data.event_type}`);
  };

  const addEvidence = (data: Omit<Evidence, 'id' | 'uploaded_at'>) => {
    const newEv: Evidence = {
      ...data,
      id: `ev-${Date.now()}`,
      uploaded_at: new Date().toISOString()
    };
    setEvidence(prev => [newEv, ...prev]);
    logAudit('UPLOAD_EVIDENCE', data.case_id, `Attached file: ${data.file_name}`);
  };

  const deleteEvidence = (id: string) => {
    setEvidence(prev => prev.filter(ev => ev.id !== id));
    logAudit('DELETE_EVIDENCE', id, 'User deleted evidence item');
  };

  const addActionPlan = (data: Omit<ActionPlan, 'id' | 'created_at'>) => {
    const newPlan: ActionPlan = {
      ...data,
      id: `act-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setActionPlans(prev => [newPlan, ...prev]);
    logAudit('ADD_ACTION_PLAN', data.case_id, `Created plan item: ${data.title}`);
  };

  const updateActionPlanStatus = (id: string, status: ActionPlan['approval_status']) => {
    setActionPlans(prev =>
      prev.map(p => (p.id === id ? { ...p, approval_status: status } : p))
    );
    logAudit('UPDATE_ACTION_STATUS', id, `Plan status changed to: ${status}`);
  };

  const addReminder = (data: Omit<Reminder, 'id' | 'created_at'>) => {
    const newReminder: Reminder = {
      ...data,
      id: `rem-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setReminders(prev => [newReminder, ...prev]);
    logAudit('CREATE_REMINDER', data.case_id, `Reminder set for ${data.reminder_date}`);
  };

  const toggleReminder = (id: string) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
    logAudit('TOGGLE_REMINDER', id, 'Reminder completion toggled');
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    logAudit('DELETE_REMINDER', id, 'User deleted reminder');
  };

  const addNote = (caseId: string, content: string) => {
    const now = new Date().toISOString();
    const newNote: Note = {
      id: `note-${Date.now()}`,
      case_id: caseId,
      content,
      created_at: now,
      updated_at: now
    };
    setNotes(prev => [newNote, ...prev]);
    logAudit('ADD_NOTE', caseId, 'User added case note');
  };

  const updateNote = (id: string, content: string) => {
    const now = new Date().toISOString();
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, content, updated_at: now } : n))
    );
    logAudit('UPDATE_NOTE', id, 'User edited case note');
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    logAudit('DELETE_NOTE', id, 'User deleted note');
  };

  const resetToSampleData = () => {
    setCases(SAMPLE_CASES);
    setEvents(SAMPLE_EVENTS);
    setEvidence(SAMPLE_EVIDENCE);
    setActionPlans(SAMPLE_ACTION_PLANS);
    setReminders(SAMPLE_REMINDERS);
    setNotes(SAMPLE_NOTES);
    setIsDemoMode(true);
    logAudit('RESET_SAMPLE_DATA', 'ALL', 'Reset workspace with verified sample demonstration cases');
  };

  const clearUserData = () => {
    setCases([]);
    setEvents([]);
    setEvidence([]);
    setActionPlans([]);
    setReminders([]);
    setNotes([]);
    setSelectedCaseId(null);
    logAudit('CLEAR_ALL_DATA', 'ALL', 'User requested full workspace data wipe');
  };

  const signIn = (email: string, name?: string, type: AudienceType = 'individual') => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: name || email.split('@')[0],
      account_type: type,
      created_at: new Date().toISOString()
    };
    setUser(newUser);
    logAudit('SIGN_IN', newUser.id, `User signed in with email: ${email}`);
    setCurrentView('dashboard');
  };

  const signOut = () => {
    logAudit('SIGN_OUT', user ? user.id : 'anonymous', 'User signed out');
    setUser(null);
    setCurrentView('landing');
  };

  const toggleDemoMode = () => {
    setIsDemoMode(!isDemoMode);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        currentView,
        setCurrentView,
        selectedCaseId,
        setSelectedCaseId,
        openCaseWorkspace,
        cases,
        events,
        evidence,
        actionPlans,
        reminders,
        notes,
        auditLogs,
        isDemoMode,
        toggleDemoMode,
        backendConnected,
        checkBackendConnection,
        createCase,
        updateCase,
        closeCase,
        reopenCase,
        deleteCase,
        addEvent,
        addEvidence,
        deleteEvidence,
        addActionPlan,
        updateActionPlanStatus,
        addReminder,
        toggleReminder,
        deleteReminder,
        addNote,
        updateNote,
        deleteNote,
        logAudit,
        resetToSampleData,
        clearUserData,
        signIn,
        signOut
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
