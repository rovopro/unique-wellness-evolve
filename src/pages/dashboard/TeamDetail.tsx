import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { mockTeams, mockUsers, dashboardMetrics } from '@/data/mock-data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TeamDetail = () => {
  const { id } = useParams();
  const team = mockTeams.find(t => t.id === id) || mockTeams[0];
  const members = mockUsers.filter(u => u.team === team.name);

  const weeklyData = [
    { day: 'Mon', team: 42, company: 35 }, { day: 'Tue', team: 38, company: 33 },
    { day: 'Wed', team: 45, company: 36 }, { day: 'Thu', team: 50, company: 38 },
    { day: 'Fri', team: 35, company: 30 }, { day: 'Sat', team: 20, company: 18 },
    { day: 'Sun', team: 15, company: 12 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/dashboard/teams" className="hover:text-foreground flex items-center gap-1"><ArrowLeft size={14} /> Teams</Link>
        <span>/</span>
        <span className="text-foreground">{team.name}</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{team.name}</h1>
          <p className="text-sm text-muted-foreground">Lead: {team.lead} · {team.members} members</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          <p className="text-3xl font-bold text-foreground mt-1">{members.filter(m => m.status === 'Active').length}/{members.length}</p>
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

      {/* Members */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Members</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {members.map(m => (
            <Link key={m.id} to={`/dashboard/users/${m.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8"><AvatarImage src={m.avatar} /><AvatarFallback>{m.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={`text-xs ${m.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-muted'}`}>{m.status}</Badge>
                <span className="text-sm text-muted-foreground">{m.engagementScore}%</span>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamDetail;
