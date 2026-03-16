import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, UserCheck, UserX, UserMinus, Upload, UserPlus, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { userAggregates, mockTeams } from '@/data/mock-data';
import { useToast } from '@/hooks/use-toast';
import { useRole } from '@/contexts/RoleContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const statusColors: Record<string, string> = {
  Active: 'bg-primary/10 text-primary border-primary/20',
  Invited: 'bg-blue-50 text-blue-600 border-blue-200',
  Inactive: 'bg-orange-50 text-orange-600 border-orange-200',
  Suspended: 'bg-destructive/10 text-destructive border-destructive/20',
};

const COLORS = ['hsl(170, 100%, 47%)', 'hsl(210, 80%, 60%)', 'hsl(30, 80%, 55%)', 'hsl(0, 70%, 55%)'];

const UsersPage = () => {
  const [teamFilter, setTeamFilter] = useState('all');
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteCount, setInviteCount] = useState('5');
  const [inviteTeam, setInviteTeam] = useState('Engineering');
  const { toast } = useToast();
  const { role } = useRole();
  const agg = userAggregates;

  const statusData = Object.entries(agg.byStatus).map(([name, value]) => ({ name, value }));
  const teamData = teamFilter === 'all'
    ? agg.byTeam
    : agg.byTeam.filter(t => t.team === teamFilter);

  const handleInvite = () => {
    setInviteOpen(false);
    toast({ title: 'Invitations sent', description: `${inviteCount} invitations sent to ${inviteTeam}` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Overview</h1>
          <p className="text-sm text-muted-foreground">Aggregate user metrics across the organization</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={teamFilter} onValueChange={setTeamFilter}>
            <SelectTrigger className="w-36 h-9 text-sm"><SelectValue placeholder="All Teams" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              {mockTeams.map(t => <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>)}
            </SelectContent>
          </Select>
          {role !== 'Analyst' && (
            <>
              <Button variant="outline" size="sm" onClick={() => toast({ title: 'CSV Upload', description: 'Upload dialog would open here' })}>
                <Upload size={14} className="mr-1" /> CSV
              </Button>
              <Button size="sm" onClick={() => setInviteOpen(true)} className="bg-primary text-primary-foreground">
                <UserPlus size={14} className="mr-1" /> Invite Users
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Privacy notice */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <Info size={16} className="text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-foreground">Aggregate data only</p>
          <p className="text-xs text-muted-foreground">This dashboard shows aggregate metrics only. Individual user data is not displayed to protect privacy.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: agg.total, icon: Users, color: 'text-foreground' },
          { label: 'Active', value: agg.byStatus.Active, icon: UserCheck, color: 'text-primary' },
          { label: 'Inactive', value: agg.byStatus.Inactive, icon: UserMinus, color: 'text-orange-500' },
          { label: 'Suspended', value: agg.byStatus.Suspended, icon: UserX, color: 'text-destructive' },
        ].map(kpi => (
          <Card key={kpi.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{kpi.label}</p>
                  <p className={`text-3xl font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted">
                  <kpi.icon size={18} className="text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Status distribution */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Status Distribution</CardTitle></CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" nameKey="name" label={({ name, value }) => `${name}: ${value}`}>
                  {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement distribution */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Engagement Score Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={agg.engagementDistribution}>
                <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(170, 100%, 47%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Team breakdown */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Team Breakdown</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamData.map(t => (
              <div key={t.team} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{t.team}</span>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span>{t.active}/{t.total} active</span>
                    <span>{t.seatsAssigned} seats</span>
                    <Badge variant="outline" className="text-xs">{t.avgEngagement}% engagement</Badge>
                  </div>
                </div>
                <Progress value={t.avgEngagement} className="h-1.5" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Program status & Seat utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Program Status</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {agg.programStatus.map(p => (
              <div key={p.status} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{p.status}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${(p.count / agg.total) * 100}%` }} />
                  </div>
                  <span className="text-muted-foreground w-8 text-right">{p.count}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Seat Utilization</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">{agg.seatsAssigned}<span className="text-lg text-muted-foreground">/27</span></p>
              <p className="text-sm text-muted-foreground mt-1">seats assigned</p>
            </div>
            <Progress value={(agg.seatsAssigned / 27) * 100} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{agg.seatsUnassigned} unassigned</span>
              <span>{agg.weeklyActiveRate}% weekly active rate</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invite Modal */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Users</DialogTitle>
            <DialogDescription>Send batch invitations to a team.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Number of invitations</label>
              <input
                value={inviteCount} onChange={e => setInviteCount(e.target.value)}
                type="number" min="1" max="50"
                className="w-full mt-1.5 px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Team</label>
              <Select value={inviteTeam} onValueChange={setInviteTeam}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {mockTeams.map(t => <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteOpen(false)}>Cancel</Button>
            <Button onClick={handleInvite} className="bg-primary text-primary-foreground">Send Invites</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
