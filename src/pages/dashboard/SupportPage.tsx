import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockTickets } from '@/data/mock-data';
import { useToast } from '@/hooks/use-toast';

const priorityColors: Record<string, string> = {
  High: 'bg-destructive/10 text-destructive',
  Medium: 'bg-orange-50 text-orange-600',
  Low: 'bg-muted text-muted-foreground',
};
const statusColors: Record<string, string> = {
  Open: 'bg-blue-50 text-blue-600',
  'In Progress': 'bg-primary/10 text-primary',
  Resolved: 'bg-primary/10 text-primary',
  Closed: 'bg-muted text-muted-foreground',
};

const SupportPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [replyText, setReplyText] = useState('');

  // Ticket detail view
  if (ticketId) {
    const ticket = mockTickets.find(t => t.id === ticketId);
    if (!ticket) return <div className="text-center py-12 text-muted-foreground">Ticket not found</div>;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/dashboard/support" className="hover:text-foreground flex items-center gap-1"><ArrowLeft size={14} /> Support</Link>
          <span>/</span>
          <span className="text-foreground">{ticket.id}</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">{ticket.subject}</h1>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className={`text-xs ${statusColors[ticket.status]}`}>{ticket.status}</Badge>
              <Badge variant="outline" className={`text-xs ${priorityColors[ticket.priority]}`}>{ticket.priority}</Badge>
            </div>
          </div>
        </div>
        <Card><CardContent className="p-5 space-y-4">
          {ticket.comments.map((c, i) => (
            <div key={i} className={`p-3 rounded-lg ${c.author === 'Admin' ? 'bg-primary/5 border border-primary/10' : 'bg-muted/50 border border-border'}`}>
              <p className="text-sm font-medium text-foreground mb-1">{c.author}</p>
              <p className="text-sm text-muted-foreground">{c.text}</p>
              <p className="text-xs text-muted-foreground mt-2">{c.date}</p>
            </div>
          ))}
          <div className="flex gap-2 pt-2">
            <input value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Write a reply..."
              className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => { setReplyText(''); toast({ title: 'Reply sent' }); }}>Reply</Button>
          </div>
        </CardContent></Card>
      </div>
    );
  }

  // Ticket list
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Support</h1>
          <p className="text-sm text-muted-foreground">{mockTickets.length} tickets</p>
        </div>
        <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => toast({ title: 'New ticket', description: 'Ticket creation form would open' })}>
          New Ticket
        </Button>
      </div>

      {mockTickets.length === 0 ? (
        <Card><CardContent className="p-12 text-center">
          <MessageSquare size={40} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium text-foreground">No tickets yet</p>
          <p className="text-sm text-muted-foreground">Create a support ticket to get help.</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-3">
          {mockTickets.map(ticket => (
            <Card key={ticket.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/dashboard/support/${ticket.id}`)}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground font-mono">{ticket.id}</span>
                    <Badge variant="outline" className={`text-xs ${statusColors[ticket.status]}`}>{ticket.status}</Badge>
                    <Badge variant="outline" className={`text-xs ${priorityColors[ticket.priority]}`}>{ticket.priority}</Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground">{ticket.subject}</p>
                  <p className="text-xs text-muted-foreground mt-1">Updated {ticket.updatedAt}</p>
                </div>
                <span className="text-xs text-muted-foreground">{ticket.comments.length} comments</span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupportPage;
