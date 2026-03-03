import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Activity, Clock, TrendingUp, TrendingDown, AlertTriangle, ArrowRight, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dashboardMetrics, mockActivityFeed, mockTeams } from '@/data/mock-data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 } };

const DashboardHome = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [teamFilter, setTeamFilter] = useState('all');
  const navigate = useNavigate();
  const m = dashboardMetrics;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">UNIQ Fitness Ltd — Overview</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32 h-9 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={teamFilter} onValueChange={setTeamFilter}>
            <SelectTrigger className="w-36 h-9 text-sm"><SelectValue placeholder="All Teams" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              {mockTeams.map(t => <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Seats Used', value: `${m.seats.assigned}/${m.seats.total}`, sub: `${m.seats.available} available`, icon: Users, onClick: () => navigate('/dashboard/users') },
          { label: 'DAU / WAU / MAU', value: `${m.dau} / ${m.wau} / ${m.mau}`, sub: '+12% vs last month', icon: Activity, onClick: () => navigate('/dashboard/analytics') },
          { label: 'Avg Min/User/Week', value: `${m.avgMinPerWeek}`, sub: '+8 min vs prior', icon: Clock },
          { label: 'Active Programs', value: `${m.programParticipation.reduce((a, p) => a + p.enrolled, 0)}`, sub: `${m.programParticipation.reduce((a, p) => a + p.completed, 0)} completed`, icon: TrendingUp },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} {...fadeIn} transition={{ delay: i * 0.05 }}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={kpi.onClick}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{kpi.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-primary/10">
                    <kpi.icon size={18} className="text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Activation Funnel */}
        <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Activation Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={m.activationFunnel} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="stage" type="category" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(170, 100%, 47%)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Retention */}
        <motion.div {...fadeIn} transition={{ delay: 0.25 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Retention Curve</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={m.retentionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="hsl(170, 100%, 47%)" strokeWidth={2} dot={{ fill: 'hsl(170, 100%, 47%)' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Teams */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Top Teams</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/teams')} className="text-xs">
                View all <ArrowRight size={12} className="ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockTeams.sort((a, b) => b.engagement - a.engagement).slice(0, 5).map(team => (
              <div key={team.id} className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{team.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{team.engagement}%</span>
                  {team.trend === 'up' ? <TrendingUp size={14} className="text-primary" /> : team.trend === 'down' ? <TrendingDown size={14} className="text-destructive" /> : null}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Alerts & Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <AlertTriangle size={16} className="text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">3 users inactive 2+ weeks</p>
                <p className="text-xs text-muted-foreground">Consider sending a nudge</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <TrendingUp size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Engagement up 12%</p>
                <p className="text-xs text-muted-foreground">Engineering team leading</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted border border-border">
              <Activity size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">6 seats available</p>
                <p className="text-xs text-muted-foreground">Consider inviting more users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-72 overflow-y-auto">
            {mockActivityFeed.map(event => (
              <div key={event.id} className="flex items-start gap-3 text-sm">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  event.type === 'workout' ? 'bg-primary' :
                  event.type === 'program' ? 'bg-blue-500' :
                  event.type === 'admin' ? 'bg-orange-500' : 'bg-muted-foreground'
                }`} />
                <div>
                  <p className="text-foreground"><span className="font-medium">{event.user}</span> {event.action}</p>
                  <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
