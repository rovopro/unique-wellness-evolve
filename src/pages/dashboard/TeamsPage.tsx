import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Minus, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockTeams } from '@/data/mock-data';

const trendIcon = (t: string) => t === 'up' ? <TrendingUp size={14} className="text-primary" /> : t === 'down' ? <TrendingDown size={14} className="text-destructive" /> : <Minus size={14} className="text-muted-foreground" />;

const TeamsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Teams</h1>
        <p className="text-sm text-muted-foreground">{mockTeams.length} teams — aggregate performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockTeams.map(team => (
          <Card key={team.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/dashboard/teams/${team.id}`)}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-foreground text-lg">{team.name}</h3>
                <div className="flex items-center gap-1">
                  {trendIcon(team.trend)}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Members</span>
                  <span className="font-medium text-foreground flex items-center gap-1"><Users size={14} /> {team.members}</span>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Activation</span>
                    <span className="font-medium text-foreground">{team.activationRate}%</span>
                  </div>
                  <Progress value={team.activationRate} className="h-1.5" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Engagement</span>
                    <span className="font-medium text-foreground">{team.engagement}%</span>
                  </div>
                  <Progress value={team.engagement} className="h-1.5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
