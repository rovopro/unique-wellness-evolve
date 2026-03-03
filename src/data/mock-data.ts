// ── Mock Data for UN1Q Business Portal ──

export type UserStatus = 'Active' | 'Invited' | 'Inactive' | 'Suspended';
export type TeamName = 'Engineering' | 'Marketing' | 'Sales' | 'HR' | 'Leadership' | 'Operations' | 'Design';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export interface MockUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: UserStatus;
  team: TeamName;
  role: string;
  lastActive: string;
  engagementScore: number;
  programStatus: string;
  seatAssigned: boolean;
  joinedDate: string;
}

export interface MockTeam {
  id: string;
  name: TeamName;
  members: number;
  activationRate: number;
  engagement: number;
  trend: 'up' | 'down' | 'flat';
  lead: string;
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
  assignee: string;
  comments: { author: string; text: string; date: string }[];
}

export interface ActivityEvent {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  type: 'login' | 'workout' | 'program' | 'invite' | 'admin';
}

const avatarUrl = (seed: string) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

export const mockUsers: MockUser[] = [
  { id: '1', name: 'Sarah Chen', email: 'sarah.chen@uniqfitness.com', avatar: avatarUrl('sarah'), status: 'Active', team: 'Engineering', role: 'Member', lastActive: '2 hours ago', engagementScore: 92, programStatus: 'Week 6 of 12', seatAssigned: true, joinedDate: '2025-09-15' },
  { id: '2', name: 'James Wilson', email: 'james.w@uniqfitness.com', avatar: avatarUrl('james'), status: 'Active', team: 'Marketing', role: 'Member', lastActive: '1 hour ago', engagementScore: 88, programStatus: 'Week 4 of 8', seatAssigned: true, joinedDate: '2025-10-01' },
  { id: '3', name: 'Maria Garcia', email: 'maria.g@uniqfitness.com', avatar: avatarUrl('maria'), status: 'Active', team: 'Sales', role: 'Team Lead', lastActive: '30 min ago', engagementScore: 95, programStatus: 'Completed', seatAssigned: true, joinedDate: '2025-08-20' },
  { id: '4', name: 'Alex Thompson', email: 'alex.t@uniqfitness.com', avatar: avatarUrl('alex'), status: 'Invited', team: 'HR', role: 'Member', lastActive: 'Never', engagementScore: 0, programStatus: 'Not started', seatAssigned: true, joinedDate: '2026-02-28' },
  { id: '5', name: 'Emily Davis', email: 'emily.d@uniqfitness.com', avatar: avatarUrl('emily'), status: 'Active', team: 'Engineering', role: 'Member', lastActive: '5 hours ago', engagementScore: 76, programStatus: 'Week 2 of 12', seatAssigned: true, joinedDate: '2025-11-10' },
  { id: '6', name: 'Michael Brown', email: 'michael.b@uniqfitness.com', avatar: avatarUrl('michael'), status: 'Inactive', team: 'Operations', role: 'Member', lastActive: '3 weeks ago', engagementScore: 23, programStatus: 'Paused', seatAssigned: true, joinedDate: '2025-07-05' },
  { id: '7', name: 'Lisa Anderson', email: 'lisa.a@uniqfitness.com', avatar: avatarUrl('lisa'), status: 'Active', team: 'Design', role: 'Member', lastActive: '4 hours ago', engagementScore: 84, programStatus: 'Week 8 of 12', seatAssigned: true, joinedDate: '2025-09-22' },
  { id: '8', name: 'David Kim', email: 'david.k@uniqfitness.com', avatar: avatarUrl('david'), status: 'Active', team: 'Leadership', role: 'Manager', lastActive: '1 hour ago', engagementScore: 91, programStatus: 'Week 10 of 12', seatAssigned: true, joinedDate: '2025-06-15' },
  { id: '9', name: 'Rachel Martinez', email: 'rachel.m@uniqfitness.com', avatar: avatarUrl('rachel'), status: 'Suspended', team: 'Sales', role: 'Member', lastActive: '2 months ago', engagementScore: 12, programStatus: 'Suspended', seatAssigned: false, joinedDate: '2025-05-10' },
  { id: '10', name: 'Tom Harris', email: 'tom.h@uniqfitness.com', avatar: avatarUrl('tom'), status: 'Active', team: 'Engineering', role: 'Member', lastActive: '6 hours ago', engagementScore: 67, programStatus: 'Week 3 of 8', seatAssigned: true, joinedDate: '2025-12-01' },
  { id: '11', name: 'Sophie Turner', email: 'sophie.t@uniqfitness.com', avatar: avatarUrl('sophie'), status: 'Active', team: 'Marketing', role: 'Team Lead', lastActive: '45 min ago', engagementScore: 89, programStatus: 'Week 5 of 8', seatAssigned: true, joinedDate: '2025-08-12' },
  { id: '12', name: 'Chris Evans', email: 'chris.e@uniqfitness.com', avatar: avatarUrl('chris'), status: 'Invited', team: 'Operations', role: 'Member', lastActive: 'Never', engagementScore: 0, programStatus: 'Not started', seatAssigned: true, joinedDate: '2026-03-01' },
  { id: '13', name: 'Nina Patel', email: 'nina.p@uniqfitness.com', avatar: avatarUrl('nina'), status: 'Active', team: 'Design', role: 'Member', lastActive: '2 hours ago', engagementScore: 78, programStatus: 'Week 7 of 12', seatAssigned: true, joinedDate: '2025-10-15' },
  { id: '14', name: 'Robert Lee', email: 'robert.l@uniqfitness.com', avatar: avatarUrl('robert'), status: 'Active', team: 'HR', role: 'Team Lead', lastActive: '3 hours ago', engagementScore: 82, programStatus: 'Completed', seatAssigned: true, joinedDate: '2025-07-20' },
  { id: '15', name: 'Anna White', email: 'anna.w@uniqfitness.com', avatar: avatarUrl('anna'), status: 'Inactive', team: 'Sales', role: 'Member', lastActive: '1 month ago', engagementScore: 31, programStatus: 'Dropped off', seatAssigned: false, joinedDate: '2025-09-05' },
  { id: '16', name: 'Mark Johnson', email: 'mark.j@uniqfitness.com', avatar: avatarUrl('mark'), status: 'Active', team: 'Engineering', role: 'Member', lastActive: '20 min ago', engagementScore: 94, programStatus: 'Week 11 of 12', seatAssigned: true, joinedDate: '2025-06-28' },
  { id: '17', name: 'Jessica Clark', email: 'jessica.c@uniqfitness.com', avatar: avatarUrl('jessica'), status: 'Active', team: 'Leadership', role: 'Manager', lastActive: '1 hour ago', engagementScore: 86, programStatus: 'Week 4 of 8', seatAssigned: true, joinedDate: '2025-08-01' },
  { id: '18', name: 'Daniel Wright', email: 'daniel.w@uniqfitness.com', avatar: avatarUrl('daniel'), status: 'Invited', team: 'Marketing', role: 'Member', lastActive: 'Never', engagementScore: 0, programStatus: 'Not started', seatAssigned: false, joinedDate: '2026-02-25' },
  { id: '19', name: 'Karen Scott', email: 'karen.s@uniqfitness.com', avatar: avatarUrl('karen'), status: 'Active', team: 'Operations', role: 'Member', lastActive: '8 hours ago', engagementScore: 71, programStatus: 'Week 6 of 12', seatAssigned: true, joinedDate: '2025-11-20' },
  { id: '20', name: 'Steven Young', email: 'steven.y@uniqfitness.com', avatar: avatarUrl('steven'), status: 'Active', team: 'Engineering', role: 'Member', lastActive: '3 hours ago', engagementScore: 79, programStatus: 'Week 3 of 12', seatAssigned: true, joinedDate: '2025-12-15' },
  { id: '21', name: 'Laura King', email: 'laura.k@uniqfitness.com', avatar: avatarUrl('laura'), status: 'Active', team: 'Design', role: 'Team Lead', lastActive: '2 hours ago', engagementScore: 90, programStatus: 'Completed', seatAssigned: true, joinedDate: '2025-07-10' },
  { id: '22', name: 'Peter Adams', email: 'peter.a@uniqfitness.com', avatar: avatarUrl('peter'), status: 'Active', team: 'HR', role: 'Member', lastActive: '5 hours ago', engagementScore: 65, programStatus: 'Week 1 of 8', seatAssigned: true, joinedDate: '2026-01-05' },
  { id: '23', name: 'Olivia Baker', email: 'olivia.b@uniqfitness.com', avatar: avatarUrl('olivia'), status: 'Active', team: 'Sales', role: 'Member', lastActive: '1 hour ago', engagementScore: 83, programStatus: 'Week 5 of 12', seatAssigned: true, joinedDate: '2025-10-28' },
  { id: '24', name: 'Ryan Hill', email: 'ryan.h@uniqfitness.com', avatar: avatarUrl('ryan'), status: 'Active', team: 'Marketing', role: 'Member', lastActive: '4 hours ago', engagementScore: 74, programStatus: 'Week 2 of 8', seatAssigned: true, joinedDate: '2025-11-30' },
  { id: '25', name: 'Megan Green', email: 'megan.g@uniqfitness.com', avatar: avatarUrl('megan'), status: 'Inactive', team: 'Operations', role: 'Member', lastActive: '2 weeks ago', engagementScore: 28, programStatus: 'Paused', seatAssigned: true, joinedDate: '2025-08-25' },
  { id: '26', name: 'Andrew Nelson', email: 'andrew.n@uniqfitness.com', avatar: avatarUrl('andrew'), status: 'Active', team: 'Engineering', role: 'Member', lastActive: '30 min ago', engagementScore: 87, programStatus: 'Week 9 of 12', seatAssigned: true, joinedDate: '2025-09-10' },
  { id: '27', name: 'Hannah Carter', email: 'hannah.c@uniqfitness.com', avatar: avatarUrl('hannah'), status: 'Active', team: 'Leadership', role: 'Manager', lastActive: '2 hours ago', engagementScore: 93, programStatus: 'Week 12 of 12', seatAssigned: true, joinedDate: '2025-05-20' },
];

export const mockTeams: MockTeam[] = [
  { id: 't1', name: 'Engineering', members: 7, activationRate: 95, engagement: 82, trend: 'up', lead: 'Mark Johnson' },
  { id: 't2', name: 'Marketing', members: 4, activationRate: 75, engagement: 78, trend: 'up', lead: 'Sophie Turner' },
  { id: 't3', name: 'Sales', members: 4, activationRate: 67, engagement: 65, trend: 'down', lead: 'Maria Garcia' },
  { id: 't4', name: 'HR', members: 3, activationRate: 80, engagement: 72, trend: 'flat', lead: 'Robert Lee' },
  { id: 't5', name: 'Leadership', members: 3, activationRate: 100, engagement: 90, trend: 'up', lead: 'David Kim' },
  { id: 't6', name: 'Operations', members: 4, activationRate: 60, engagement: 55, trend: 'down', lead: 'Karen Scott' },
  { id: 't7', name: 'Design', members: 3, activationRate: 100, engagement: 84, trend: 'up', lead: 'Laura King' },
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
    createdAt: '2026-03-02', updatedAt: '2026-03-03', assignee: 'Support Team',
    comments: [
      { author: 'Admin', text: 'Our SSO provider is Okta and users are not syncing after the latest update.', date: '2026-03-02' },
      { author: 'Support', text: 'We are investigating the SCIM endpoint. Can you confirm your Okta version?', date: '2026-03-03' },
    ],
  },
  {
    id: 'TKT-102', subject: 'Bulk CSV upload failed with 500 error', status: 'In Progress', priority: 'Medium',
    createdAt: '2026-02-28', updatedAt: '2026-03-01', assignee: 'Engineering',
    comments: [
      { author: 'Admin', text: 'Tried uploading 50 users via CSV and got a server error.', date: '2026-02-28' },
      { author: 'Support', text: 'We found the issue—a column validation bug. Fix rolling out today.', date: '2026-03-01' },
    ],
  },
  {
    id: 'TKT-103', subject: 'Request for custom reporting template', status: 'Resolved', priority: 'Low',
    createdAt: '2026-02-20', updatedAt: '2026-02-25', assignee: 'Product Team',
    comments: [
      { author: 'Admin', text: 'Can we get a wellness outcomes report template?', date: '2026-02-20' },
      { author: 'Support', text: 'Added to our template library. You can now find it under Reports > Templates.', date: '2026-02-25' },
    ],
  },
];

export const mockActivityFeed: ActivityEvent[] = [
  { id: 'a1', user: 'Sarah Chen', action: 'completed a strength workout', timestamp: '2 min ago', type: 'workout' },
  { id: 'a2', user: 'James Wilson', action: 'started the Mindset Reset program', timestamp: '15 min ago', type: 'program' },
  { id: 'a3', user: 'Admin', action: 'invited 3 new users to Engineering', timestamp: '1 hour ago', type: 'invite' },
  { id: 'a4', user: 'Maria Garcia', action: 'logged 45 min yoga session', timestamp: '2 hours ago', type: 'workout' },
  { id: 'a5', user: 'David Kim', action: 'completed Week 10 check-in', timestamp: '3 hours ago', type: 'program' },
  { id: 'a6', user: 'Lisa Anderson', action: 'achieved new personal best', timestamp: '4 hours ago', type: 'workout' },
  { id: 'a7', user: 'Admin', action: 'updated billing contact', timestamp: '5 hours ago', type: 'admin' },
  { id: 'a8', user: 'Mark Johnson', action: 'completed the 12-week program 🎉', timestamp: '6 hours ago', type: 'program' },
  { id: 'a9', user: 'Sophie Turner', action: 'logged in from mobile', timestamp: '7 hours ago', type: 'login' },
  { id: 'a10', user: 'Emily Davis', action: 'started nutrition tracking', timestamp: '8 hours ago', type: 'program' },
];

export const mockReports = [
  { id: 'r1', name: 'Monthly Engagement Summary', type: 'Scheduled', lastRun: '2026-03-01', format: 'PDF', schedule: 'Monthly' },
  { id: 'r2', name: 'Team Activation Report', type: 'Manual', lastRun: '2026-02-15', format: 'CSV', schedule: null },
  { id: 'r3', name: 'Program Outcomes Q1', type: 'Scheduled', lastRun: '2026-01-31', format: 'PDF', schedule: 'Quarterly' },
];

export const mockExportHistory = [
  { id: 'e1', name: 'User engagement data', date: '2026-03-02', format: 'CSV', status: 'Completed' },
  { id: 'e2', name: 'Team breakdown report', date: '2026-02-28', format: 'PDF', status: 'Completed' },
  { id: 'e3', name: 'Full analytics export', date: '2026-02-25', format: 'CSV', status: 'Failed' },
];

export const mockAuditLog = [
  { id: 'al1', action: 'User invited', actor: 'Admin', target: 'alex.t@uniqfitness.com', timestamp: '2026-03-02 14:30' },
  { id: 'al2', action: 'Role changed', actor: 'Admin', target: 'David Kim → Manager', timestamp: '2026-03-01 10:15' },
  { id: 'al3', action: 'Seats updated', actor: 'Admin', target: '25 → 30 seats', timestamp: '2026-02-28 09:00' },
  { id: 'al4', action: 'User suspended', actor: 'Admin', target: 'rachel.m@uniqfitness.com', timestamp: '2026-02-25 16:45' },
  { id: 'al5', action: 'SSO configured', actor: 'Admin', target: 'Okta SAML', timestamp: '2026-02-20 11:30' },
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
  billingContact: 'finance@uniqfitness.com',
  paymentMethod: 'Visa •••• 4242',
};
