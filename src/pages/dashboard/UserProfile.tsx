import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, MoreHorizontal, Shield, Clock, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { mockUsers } from '@/data/mock-data';
import { useToast } from '@/hooks/use-toast';

const UserProfile = () => {
  const { id } = useParams();
  const user = mockUsers.find(u => u.id === id) || mockUsers[0];
  const { toast } = useToast();
  const [nudgeOpen, setNudgeOpen] = useState(false);
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([
    { id: '1', text: 'Great progress on the program. Keep it up!', author: 'Manager', date: '2026-02-28' },
    { id: '2', text: 'Discussed setting new goals for Q2.', author: 'Admin', date: '2026-02-20' },
  ]);

  const timeline = [
    { action: 'Completed strength workout', date: '2026-03-03 09:30', type: 'workout' },
    { action: 'Logged nutrition for the day', date: '2026-03-02 18:45', type: 'nutrition' },
    { action: 'Completed Week 6 check-in', date: '2026-03-01 14:00', type: 'program' },
    { action: 'Achieved new personal best', date: '2026-02-28 10:15', type: 'workout' },
    { action: 'Started mindset session', date: '2026-02-27 08:00', type: 'mindset' },
    { action: 'Logged in from mobile', date: '2026-02-26 07:30', type: 'login' },
  ];

  const programHistory = [
    { name: 'Nutrition Basics', status: 'Completed', progress: 100 },
    { name: '8-Week Mindset Reset', status: 'Completed', progress: 100 },
  ];

  const addNote = () => {
    if (!noteText.trim()) return;
    setNotes(prev => [{ id: `n-${Date.now()}`, text: noteText, author: 'Admin', date: new Date().toISOString().split('T')[0] }, ...prev]);
    setNoteText('');
    toast({ title: 'Note added' });
  };

  const statusColor = user.status === 'Active' ? 'bg-primary/10 text-primary' : user.status === 'Invited' ? 'bg-blue-50 text-blue-600' : user.status === 'Inactive' ? 'bg-orange-50 text-orange-600' : 'bg-destructive/10 text-destructive';

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/dashboard/users" className="hover:text-foreground flex items-center gap-1"><ArrowLeft size={14} /> Users</Link>
        <span>/</span>
        <span className="text-foreground">{user.name}</span>
      </div>

      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-lg">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
                <Badge variant="outline" className={statusColor}>{user.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                <span>Team: <span className="text-foreground font-medium">{user.team}</span></span>
                <span>Role: <span className="text-foreground font-medium">{user.role}</span></span>
                <span>Seat: <span className="text-foreground font-medium">{user.seatAssigned ? 'Assigned' : 'None'}</span></span>
                <span>Last active: <span className="text-foreground font-medium">{user.lastActive}</span></span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setNudgeOpen(true)}>
                <Mail size={14} className="mr-1" /> Send Nudge
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card><CardContent className="p-5">
              <p className="text-xs text-muted-foreground uppercase">Engagement Score</p>
              <p className="text-3xl font-bold text-foreground mt-1">{user.engagementScore}<span className="text-base text-muted-foreground">/100</span></p>
              <Progress value={user.engagementScore} className="mt-3 h-2" />
            </CardContent></Card>
            <Card><CardContent className="p-5">
              <p className="text-xs text-muted-foreground uppercase">Program Status</p>
              <p className="text-lg font-bold text-foreground mt-1">{user.programStatus}</p>
              <p className="text-xs text-muted-foreground mt-1">Started {user.joinedDate}</p>
            </CardContent></Card>
            <Card><CardContent className="p-5">
              <p className="text-xs text-muted-foreground uppercase">Avg Min/Week</p>
              <p className="text-3xl font-bold text-foreground mt-1">{Math.round(user.engagementScore * 1.4)}</p>
              <p className="text-xs text-muted-foreground mt-1">+12% vs company avg</p>
            </CardContent></Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <Card><CardContent className="p-5 space-y-4">
            {timeline.map((evt, i) => (
              <div key={i} className="flex items-start gap-4 border-l-2 border-border pl-4 py-1">
                <div>
                  <p className="text-sm font-medium text-foreground">{evt.action}</p>
                  <p className="text-xs text-muted-foreground">{evt.date}</p>
                </div>
              </div>
            ))}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="programs" className="mt-4 space-y-4">
          <Card><CardHeader className="pb-2"><CardTitle className="text-base">Current Program</CardTitle></CardHeader>
            <CardContent>
              <p className="font-medium text-foreground">12-Week Wellness Journey</p>
              <p className="text-sm text-muted-foreground mb-2">{user.programStatus}</p>
              <Progress value={50} className="h-2" />
            </CardContent>
          </Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-base">History</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {programHistory.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{p.name}</span>
                  <Badge variant="outline" className="bg-primary/10 text-primary text-xs">{p.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-4 space-y-4">
          <Card><CardContent className="p-5">
            <div className="flex gap-2 mb-4">
              <input value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Add a note..."
                className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              <Button size="sm" onClick={addNote} className="bg-primary text-primary-foreground">Add</Button>
            </div>
            <div className="space-y-3">
              {notes.map(note => (
                <div key={note.id} className="p-3 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-foreground">{note.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{note.author} · {note.date}</p>
                </div>
              ))}
            </div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="permissions" className="mt-4">
          <Card><CardContent className="p-5 space-y-4">
            {[
              { label: 'Can view team analytics', enabled: true },
              { label: 'Can participate in programs', enabled: true },
              { label: 'Can export own data', enabled: false },
            ].map((perm, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{perm.label}</span>
                <Switch defaultChecked={perm.enabled} />
              </div>
            ))}
            <div className="pt-4 border-t border-border">
              <Button variant="destructive" size="sm" onClick={() => setDeactivateOpen(true)}>Deactivate User</Button>
            </div>
          </CardContent></Card>
        </TabsContent>
      </Tabs>

      {/* Nudge modal */}
      <Dialog open={nudgeOpen} onOpenChange={setNudgeOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Send Nudge</DialogTitle><DialogDescription>Send a motivational message to {user.name}.</DialogDescription></DialogHeader>
          <textarea placeholder="Write your message..." className="w-full p-3 border border-border rounded-lg text-sm bg-background min-h-[80px] focus:outline-none focus:ring-2 focus:ring-ring" />
          <DialogFooter>
            <Button variant="outline" onClick={() => setNudgeOpen(false)}>Cancel</Button>
            <Button onClick={() => { setNudgeOpen(false); toast({ title: 'Nudge sent', description: `Message sent to ${user.name}` }); }} className="bg-primary text-primary-foreground">Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deactivate modal */}
      <Dialog open={deactivateOpen} onOpenChange={setDeactivateOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Deactivate User</DialogTitle><DialogDescription>Are you sure you want to deactivate {user.name}? They will lose access to the platform.</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeactivateOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => { setDeactivateOpen(false); toast({ title: 'User deactivated' }); }}>Deactivate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
