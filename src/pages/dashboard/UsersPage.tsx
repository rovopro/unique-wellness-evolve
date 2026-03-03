import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Upload, UserPlus, MoreHorizontal, Mail, ArrowUpDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockUsers, MockUser } from '@/data/mock-data';
import { useToast } from '@/hooks/use-toast';
import { useRole } from '@/contexts/RoleContext';

const statusColors: Record<string, string> = {
  Active: 'bg-primary/10 text-primary border-primary/20',
  Invited: 'bg-blue-50 text-blue-600 border-blue-200',
  Inactive: 'bg-orange-50 text-orange-600 border-orange-200',
  Suspended: 'bg-destructive/10 text-destructive border-destructive/20',
};

const UsersPage = () => {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmails, setInviteEmails] = useState('');
  const [inviteTeam, setInviteTeam] = useState('Engineering');
  const [confirmAction, setConfirmAction] = useState<{ user: MockUser; action: string } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { role } = useRole();

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    const matchTeam = teamFilter === 'all' || u.team === teamFilter;
    return matchSearch && matchStatus && matchTeam;
  });

  const handleInvite = () => {
    const emails = inviteEmails.split(/[,\n]/).map(e => e.trim()).filter(Boolean);
    if (!emails.length) return;
    const newUsers: MockUser[] = emails.map((email, i) => ({
      id: `new-${Date.now()}-${i}`,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      status: 'Invited' as const,
      team: inviteTeam as any,
      role: 'Member',
      lastActive: 'Never',
      engagementScore: 0,
      programStatus: 'Not started',
      seatAssigned: true,
      joinedDate: new Date().toISOString().split('T')[0],
    }));
    setUsers(prev => [...newUsers, ...prev]);
    setInviteOpen(false);
    setInviteEmails('');
    toast({ title: 'Invitations sent', description: `${emails.length} user(s) invited to ${inviteTeam}` });
  };

  const handleAction = (user: MockUser, action: string) => {
    if (action === 'view') { navigate(`/dashboard/users/${user.id}`); return; }
    if (action === 'deactivate' || action === 'suspend') { setConfirmAction({ user, action }); return; }
    if (action === 'resend') {
      toast({ title: 'Invite resent', description: `Re-sent invitation to ${user.email}` });
      return;
    }
    toast({ title: 'Action completed', description: `${action} for ${user.name}` });
  };

  const confirmDestructive = () => {
    if (!confirmAction) return;
    setUsers(prev => prev.map(u => u.id === confirmAction.user.id
      ? { ...u, status: confirmAction.action === 'deactivate' ? 'Inactive' as const : 'Suspended' as const }
      : u
    ));
    toast({ title: `User ${confirmAction.action}d`, description: confirmAction.user.name });
    setConfirmAction(null);
  };

  const teams = Array.from(new Set(mockUsers.map(u => u.team)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} of {users.length} users</p>
        </div>
        <div className="flex items-center gap-2">
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

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
          <input
            type="text" placeholder="Search name or email..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32 h-9 text-sm"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Invited">Invited</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
            <SelectItem value="Suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Select value={teamFilter} onValueChange={setTeamFilter}>
          <SelectTrigger className="w-36 h-9 text-sm"><SelectValue placeholder="Team" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Teams</SelectItem>
            {teams.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="hidden md:table-cell">Last Active</TableHead>
                <TableHead className="hidden lg:table-cell">Engagement</TableHead>
                <TableHead className="hidden lg:table-cell">Program</TableHead>
                <TableHead className="hidden md:table-cell">Seat</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(user => (
                <TableRow key={user.id} className="cursor-pointer" onClick={() => navigate(`/dashboard/users/${user.id}`)}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs ${statusColors[user.status]}`}>{user.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.team}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{user.lastActive}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${user.engagementScore}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{user.engagementScore}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{user.programStatus}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.seatAssigned ? <Badge variant="outline" className="text-xs bg-primary/10 text-primary">Assigned</Badge> : <Badge variant="outline" className="text-xs">None</Badge>}
                  </TableCell>
                  <TableCell onClick={e => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal size={14} /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction(user, 'view')}>View Profile</DropdownMenuItem>
                        {role !== 'Analyst' && (
                          <>
                            <DropdownMenuItem onClick={() => handleAction(user, 'resend')}>Resend Invite</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction(user, 'assign')}>Assign Seat</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction(user, 'move')}>Move Team</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleAction(user, 'deactivate')}>Deactivate</DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Invite Modal */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Users</DialogTitle>
            <DialogDescription>Add email addresses to invite users to the platform.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Email addresses</label>
              <textarea
                value={inviteEmails} onChange={e => setInviteEmails(e.target.value)}
                placeholder="Enter emails separated by commas or new lines..."
                className="w-full mt-1.5 p-3 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring min-h-[100px]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Team</label>
              <Select value={inviteTeam} onValueChange={setInviteTeam}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {teams.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
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

      {/* Confirm destructive */}
      <Dialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm {confirmAction?.action}</DialogTitle>
            <DialogDescription>
              Are you sure you want to {confirmAction?.action} <strong>{confirmAction?.user.name}</strong>? This action can be reversed later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmAction(null)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDestructive}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
