import { useState } from 'react';
import { Send, RefreshCw, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { actions, InvitedMember } from './types';

interface InviteFlowProps {
  seatsTotal: number;
  seatsUsed: number;
  existingInvites?: InvitedMember[];
}

const InviteFlow = ({ seatsTotal, seatsUsed, existingInvites = [] }: InviteFlowProps) => {
  const [emailInput, setEmailInput] = useState('');
  const [invites, setInvites] = useState<InvitedMember[]>(existingInvites);

  const handleSendInvites = () => {
    const emails = emailInput
      .split(/[,;\s]+/)
      .map((e) => e.trim())
      .filter((e) => e.includes('@'));
    if (emails.length === 0) return;

    const remaining = seatsTotal - seatsUsed - invites.length;
    const toSend = emails.slice(0, remaining);

    actions.sendInvites(toSend);
    setInvites((prev) => [
      ...prev,
      ...toSend.map((email) => ({
        email,
        status: 'pending' as const,
        sentAt: new Date().toISOString(),
      })),
    ]);
    setEmailInput('');
  };

  const remaining = seatsTotal - seatsUsed - invites.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Seats used</span>
        <span className="font-medium text-foreground">
          {seatsUsed + invites.filter((i) => i.status === 'accepted').length} / {seatsTotal}
        </span>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="email@example.com, another@example.com"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          className="rounded-xl"
          disabled={remaining <= 0}
        />
        <Button
          onClick={handleSendInvites}
          disabled={remaining <= 0 || !emailInput.trim()}
          className="rounded-xl shrink-0"
        >
          <Send className="w-4 h-4 mr-1" />
          Invite
        </Button>
      </div>
      {remaining <= 0 && (
        <p className="text-xs text-muted-foreground">All seats have been allocated.</p>
      )}

      {invites.length > 0 && (
        <div className="space-y-2 mt-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Invited Members</p>
          {invites.map((inv, idx) => (
            <div key={idx} className="flex items-center justify-between bg-muted rounded-xl px-4 py-2.5 text-sm">
              <span className="text-foreground">{inv.email}</span>
              <div className="flex items-center gap-2">
                {inv.status === 'pending' ? (
                  <>
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground text-xs">Pending</span>
                    <button
                      onClick={() => actions.sendInvites([inv.email])}
                      className="text-primary hover:text-primary-dark transition-colors"
                      title="Resend"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    <span className="text-primary text-xs">Accepted</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InviteFlow;
