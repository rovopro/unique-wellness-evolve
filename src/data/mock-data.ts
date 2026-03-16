// ── Mock Data for UN1Q Business Portal (Aggregate Data) ──

export type UserStatus = 'Active' | 'Invited' | 'Inactive' | 'Suspended';
export type TeamName = 'Engineering' | 'Marketing' | 'Sales' | 'HR' | 'Leadership' | 'Operations' | 'Design';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export interface MockTeam {
  id: string;
  name: TeamName;
  members: number;
  activationRate: number;
  engagement: number;
  trend: 'up' | 'down' | 'flat';
}

export interface MockInvoice {
  id: string;
  date: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Failed';
  pdf: string;
}

export interface MockTicket {
  id: string;
  subject: string;
  status: TicketStatus;
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
  updatedAt: string;
  department: string;
  comments: { author: string; text: string; date: string }[];
}

export interface ActivityEvent {
  id: string;
  action: string;
  timestamp: string;
  type: 'login' | 'workout' | 'program' | 'invite' | 'admin';
  count?: number;
}

// Aggregate user stats
export const userAggregates = {
  total: 27,
  byStatus: { Active: 20, Invited: 3, Inactive: 3, Suspended: 1 } as Record<UserStatus, number>,
  byTeam: [
    { team: 'Engineering', total: 7, active: 6, avgEngagement: 82, seatsAssigned: 7 },
    { team: 'Marketing', total: 4, active: 3, avgEngagement: 78, seatsAssigned: 3 },
    { team: 'Sales', total: 4, active: 2, avgEngagement: 65, seatsAssigned: 3 },
    { team: 'HR', total: 3, active: 2, avgEngagement: 72, seatsAssigned: 3 },
    { team: 'Leadership', total: 3, active: 3, avgEngagement: 90, seatsAssigned: 3 },
    { team: 'Operations', total: 4, active: 2, avgEngagement: 55, seatsAssigned: 4 },
    { team: 'Design', total: 3, active: 3, avgEngagement: 84, seatsAssigned: 3 },
  ],
  engagementDistribution: [
    { range: '0-20', count: 2 },
    { range: '21-40', count: 3 },
    { range: '41-60', count: 2 },
    { range: '61-80', count: 8 },
    { range: '81-100', count: 12 },
  ],
  avgEngagement: 74,
  seatsAssigned: 24,
  seatsUnassigned: 3,
  programStatus: [
    { status: 'In Progress', count: 14 },
    { status: 'Completed', count: 4 },
    { status: 'Not Started', count: 3 },
    { status: 'Paused', count: 3 },
    { status: 'Dropped Off', count: 2 },
    { status: 'Suspended', count: 1 },
  ],
  avgMinPerWeek: 127,
  weeklyActiveRate: 81,
};

export const mockTeams: MockTeam[] = [
  { id: 't1', name: 'Engineering', members: 7, activationRate: 95, engagement: 82, trend: 'up' },
  { id: 't2', name: 'Marketing', members: 4, activationRate: 75, engagement: 78, trend: 'up' },
  { id: 't3', name: 'Sales', members: 4, activationRate: 67, engagement: 65, trend: 'down' },
  { id: 't4', name: 'HR', members: 3, activationRate: 80, engagement: 72, trend: 'flat' },
  { id: 't5', name: 'Leadership', members: 3, activationRate: 100, engagement: 90, trend: 'up' },
  { id: 't6', name: 'Operations', members: 4, activationRate: 60, engagement: 55, trend: 'down' },
  { id: 't7', name: 'Design', members: 3, activationRate: 100, engagement: 84, trend: 'up' },
];

export const mockInvoices: MockInvoice[] = [
  { id: 'INV-001', date: '2026-03-01', amount: '€2,450.00', status: 'Paid', pdf: '#' },
  { id: 'INV-002', date: '2026-02-01', amount: '€2,450.00', status: 'Paid', pdf: '#' },
  { id: 'INV-003', date: '2026-01-01', amount: '€2,250.00', status: 'Paid', pdf: '#' },
  { id: 'INV-004', date: '2025-12-01', amount: '€2,250.00', status: 'Paid', pdf: '#' },
  { id: 'INV-005', date: '2025-11-01', amount: '€2,050.00', status: 'Paid', pdf: '#' },
];

export const mockTickets: MockTicket[] = [
  {
    id: 'TKT-101', subject: 'SSO integration not syncing users', status: 'Open', priority: 'High',
    createdAt: '2026-03-02', updatedAt: '2026-03-03', department: 'IT',
    comments: [
      { author: 'Company Admin', text: 'Our SSO provider is Okta and users are not syncing after the latest update.', date: '2026-03-02' },
      { author: 'Support Team', text: 'We are investigating the SCIM endpoint. Can you confirm your Okta version?', date: '2026-03-03' },
    ],
  },
  {
    id: 'TKT-102', subject: 'Bulk CSV upload failed with 500 error', status: 'In Progress', priority: 'Medium',
    createdAt: '2026-02-28', updatedAt: '2026-03-01', department: 'Operations',
    comments: [
      { author: 'Company Admin', text: 'Tried uploading 50 users via CSV and got a server error.', date: '2026-02-28' },
      { author: 'Support Team', text: 'We found the issue—a column validation bug. Fix rolling out today.', date: '2026-03-01' },
    ],
  },
  {
    id: 'TKT-103', subject: 'Request for custom reporting template', status: 'Resolved', priority: 'Low',
    createdAt: '2026-02-20', updatedAt: '2026-02-25', department: 'Analytics',
    comments: [
      { author: 'Company Admin', text: 'Can we get a wellness outcomes report template?', date: '2026-02-20' },
      { author: 'Support Team', text: 'Added to our template library. You can now find it under Reports > Templates.', date: '2026-02-25' },
    ],
  },
];

export const mockActivityFeed: ActivityEvent[] = [
  { id: 'a1', action: '14 workouts completed across the organization', timestamp: '2 min ago', type: 'workout', count: 14 },
  { id: 'a2', action: '3 users started the Mindset Reset program', timestamp: '15 min ago', type: 'program', count: 3 },
  { id: 'a3', action: '3 new users invited to Engineering', timestamp: '1 hour ago', type: 'invite', count: 3 },
  { id: 'a4', action: '8 yoga sessions logged today', timestamp: '2 hours ago', type: 'workout', count: 8 },
  { id: 'a5', action: '5 users completed weekly check-ins', timestamp: '3 hours ago', type: 'program', count: 5 },
  { id: 'a6', action: '2 new personal bests achieved', timestamp: '4 hours ago', type: 'workout', count: 2 },
  { id: 'a7', action: 'Billing contact updated', timestamp: '5 hours ago', type: 'admin' },
  { id: 'a8', action: '1 user completed the 12-week program 🎉', timestamp: '6 hours ago', type: 'program', count: 1 },
  { id: 'a9', action: '18 mobile logins today', timestamp: '7 hours ago', type: 'login', count: 18 },
  { id: 'a10', action: '4 users started nutrition tracking', timestamp: '8 hours ago', type: 'program', count: 4 },
];

export const mockReports = [
  { id: 'r1', name: 'Monthly Engagement Summary', type: 'Scheduled', lastRun: '2026-03-01', format: 'PDF', schedule: 'Monthly' },
  { id: 'r2', name: 'Team Activation Report', type: 'Manual', lastRun: '2026-02-15', format: 'CSV', schedule: null },
  { id: 'r3', name: 'Program Outcomes Q1', type: 'Scheduled', lastRun: '2026-01-31', format: 'PDF', schedule: 'Quarterly' },
];

export const mockExportHistory = [
  { id: 'e1', name: 'Aggregate engagement data', date: '2026-03-02', format: 'CSV', status: 'Completed' },
  { id: 'e2', name: 'Team breakdown report', date: '2026-02-28', format: 'PDF', status: 'Completed' },
  { id: 'e3', name: 'Full analytics export', date: '2026-02-25', format: 'CSV', status: 'Failed' },
];

export const mockAuditLog = [
  { id: 'al1', action: 'Users invited', actor: 'Admin Role', target: '3 users added to Engineering', timestamp: '2026-03-02 14:30' },
  { id: 'al2', action: 'Role changed', actor: 'Admin Role', target: '1 user promoted to Manager', timestamp: '2026-03-01 10:15' },
  { id: 'al3', action: 'Seats updated', actor: 'Admin Role', target: '25 → 30 seats', timestamp: '2026-02-28 09:00' },
  { id: 'al4', action: 'User suspended', actor: 'Admin Role', target: '1 user in Sales team', timestamp: '2026-02-25 16:45' },
  { id: 'al5', action: 'SSO configured', actor: 'Admin Role', target: 'Okta SAML', timestamp: '2026-02-20 11:30' },
  { id: 'al6', action: 'Invoice paid', actor: 'System', target: 'INV-001 €2,450.00', timestamp: '2026-03-01 00:00' },
];

// Dashboard metrics
export const dashboardMetrics = {
  seats: { total: 30, assigned: 24, active: 20, available: 6 },
  dau: 18, wau: 22, mau: 25,
  avgMinPerWeek: 127,
  retentionData: [
    { week: 'W1', rate: 100 }, { week: 'W2', rate: 92 }, { week: 'W3', rate: 88 },
    { week: 'W4', rate: 85 }, { week: 'W5', rate: 82 }, { week: 'W6', rate: 80 },
    { week: 'W7', rate: 78 }, { week: 'W8', rate: 76 },
  ],
  activationFunnel: [
    { stage: 'Invited', count: 27 }, { stage: 'Registered', count: 24 },
    { stage: 'First Session', count: 22 }, { stage: 'Week 2 Active', count: 20 },
    { stage: 'Program Started', count: 18 },
  ],
  programParticipation: [
    { name: '12-Week Wellness', enrolled: 14, completed: 3 },
    { name: '8-Week Mindset', enrolled: 8, completed: 2 },
    { name: 'Nutrition Basics', enrolled: 6, completed: 4 },
  ],
};

export const subscriptionInfo = {
  plan: 'UN1Q Business Pro',
  seatsPurchased: 30,
  seatsAssigned: 24,
  renewalDate: '2026-09-15',
  monthlyPrice: '€2,450',
  addOns: ['Advanced Analytics', 'SSO Integration'],
  billingContact: 'finance@company.com',
  paymentMethod: 'Visa •••• 4242',
};
