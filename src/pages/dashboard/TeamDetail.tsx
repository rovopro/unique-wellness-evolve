import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { mockTeams, userAggregates } from '@/data/mock-data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TeamDetail = () => {
  const { id } = useParams();
  const team = mockTeams.find(t => t.id === id) || mockTeams[0];
  const teamAgg = userAggregates.byTeam.find(t => t.team === team.name);

  const weeklyData = [
    { day: 'Mon', team: 42, company: 35 }, { day: 'Tue', team: 38, company: 33 },
    { day: 'Wed', team: 45, company: 36 }, { day: 'Thu', team: 50, company: 38 },
    { day: 'Fri', team: 35, company: 30 }, { day: 'Sat', team: 20, company: 18 },
    { day: 'Sun', team: 15, company: 12 },
  ];

  const statusBreakdown = [
    { status: 'Active', count: teamAgg?.active || 0 },
    { status: 'Other', count: (teamAgg?.total || 0) - (teamAgg?.active || 0) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/dashboard/teams" className="hover:text-foreground flex items-center gap-1"><ArrowLeft size={14} /> Teams</Link>
        <span>/</span>
        <span className="text-foreground">{team.name}</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-foreground">{team.name}</h1>
        <p className="text-sm text-muted-foreground">{team.members} members — aggregate team metrics</p>
      </div>

      {/* Privacy notice */}
      <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
        <Info size={16} className="text-primary mt-0.5 flex-shrink-0" />
        <p className="text-xs text-muted-foreground">Showing aggregate team data only. Individual member data is not displayed.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card><CardContent className="p-5">
          <p className="text-xs text-muted-foreground uppercase">Activation Rate</p>
          <p className="text-3xl font-bold text-foreground mt-1">{team.activationRate}%</p>
          <Progress value={team.activationRate} className="mt-2 h-1.5" />
        </CardContent></Card>
        <Card><CardContent className="p-5">
          <p className="text-xs text-muted-foreground uppercase">Engagement</p>
          <p className="text-3xl font-bold text-foreground mt-1">{team.engagement}%</p>
          <Progress value={team.engagement} className="mt-2 h-1.5" />
        </CardContent></Card>
        <Card><CardContent className="p-5">
          <p className="text-xs text-muted-foreground uppercase">Active Members</p>
          <p className="text-3xl font-bold text-foreground mt-1">{teamAgg?.active || 0}<span className="text-base text-muted-foreground">/{team.members}</span></p>
        </CardContent></Card>
        <Card><CardContent className="p-5">
          <p className="text-xs text-muted-foreground uppercase">Avg Engagement</p>
          <p className="text-3xl font-bold text-foreground mt-1">{teamAgg?.avgEngagement || 0}%</p>
          <Badge variant="outline" className="text-xs mt-2">
            {(teamAgg?.avgEngagement || 0) > userAggregates.avgEngagement ? 'Above' : 'Below'} company avg ({userAggregates.avgEngagement}%)
          </Badge>
        </CardContent></Card>
      </div>

      {/* Compare vs company */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Team vs Company Average (min/day)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="team" fill="hsl(170, 100%, 47%)" radius={[4, 4, 0, 0]} name="Team" />
              <Bar dataKey="company" fill="hsl(210, 20%, 85%)" radius={[4, 4, 0, 0]} name="Company" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Status breakdown */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Member Status Breakdown</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {statusBreakdown.map(s => (
            <div key={s.status} className="flex items-center justify-between text-sm">
              <span className="text-foreground">{s.status}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${(s.count / team.members) * 100}%` }} />
                </div>
                <span className="text-muted-foreground w-6 text-right">{s.count}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamDetail;
