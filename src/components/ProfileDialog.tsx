import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { User, Database, CreditCard, Eye, EyeOff, Check, Download, Trash2, Sparkles } from 'lucide-react';

type Section = 'account' | 'data' | 'subscription';

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const navItems: { id: Section; label: string; icon: typeof User }[] = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'data', label: 'Data Controls', icon: Database },
  { id: 'subscription', label: 'Subscription', icon: CreditCard },
];

export const ProfileDialog = ({ open, onOpenChange }: ProfileDialogProps) => {
  const { toast } = useToast();
  const [section, setSection] = useState<Section>('account');
  const [email, setEmail] = useState('admin@uniqfitness.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [analytics, setAnalytics] = useState(true);
  const [personalization, setPersonalization] = useState(false);
  const [marketing, setMarketing] = useState(true);

  const handleSave = (label: string) => {
    toast({ title: `${label} updated`, description: 'Your changes have been saved.' });
  };

  const handleSavePassword = () => {
    if (newPassword.length < 8) {
      toast({ title: 'Password too short', description: 'Use at least 8 characters.', variant: 'destructive' });
      return;
    }
    setPassword('••••••••••••');
    setNewPassword('');
    setEditingPassword(false);
    toast({ title: 'Password updated' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border">
        <div className="flex min-h-[560px]">
          {/* Sidebar */}
          <aside className="w-56 bg-muted/40 border-r border-border p-4 flex flex-col">
            <h2 className="text-lg font-bold text-foreground px-3 py-2 mb-2">Settings</h2>
            <nav className="space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const active = section === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSection(item.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                      active
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 p-8 overflow-y-auto max-h-[80vh]">
            {section === 'account' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-border">
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">PA</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Portal Admin</p>
                    <p className="text-sm text-muted-foreground">UNIQ Fitness Ltd</p>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20">Company Admin</Badge>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email address</label>
                  <div className="flex gap-2">
                    <Input value={email} onChange={e => setEmail(e.target.value)} type="email" />
                    <Button variant="outline" onClick={() => handleSave('Email')}>Save</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  {!editingPassword ? (
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Input value={password} readOnly type={showPassword ? 'text' : 'password'} />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      <Button variant="outline" onClick={() => setEditingPassword(true)}>Change</Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Input
                        type="password"
                        placeholder="New password (min 8 chars)"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleSavePassword} className="bg-primary text-primary-foreground">
                          <Check size={16} /> Update password
                        </Button>
                        <Button variant="outline" onClick={() => { setEditingPassword(false); setNewPassword(''); }}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Language</label>
                  <div className="flex gap-2">
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>English (US)</option>
                      <option>Español</option>
                      <option>Français</option>
                      <option>Deutsch</option>
                    </select>
                    <Button variant="outline" onClick={() => handleSave('Language')}>Save</Button>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground/60 font-mono">acct_4089c800-453f-474a-a853</p>
                </div>
              </div>
            )}

            {section === 'data' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Data Controls</h3>
                  <p className="text-sm text-muted-foreground mt-1">Manage how your data is collected and used.</p>
                </div>

                {[
                  { label: 'Aggregate analytics', desc: 'Allow anonymous usage data to improve the platform', value: analytics, set: setAnalytics },
                  { label: 'Personalization', desc: 'Use your activity to personalize recommendations', value: personalization, set: setPersonalization },
                  { label: 'Marketing communications', desc: 'Receive product updates and tips by email', value: marketing, set: setMarketing },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex-1 pr-4">
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                    <Switch checked={item.value} onCheckedChange={item.set} />
                  </div>
                ))}

                <div className="pt-4 border-t border-border space-y-3">
                  <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: 'Export started', description: 'You\'ll receive an email when ready.' })}>
                    <Download size={16} /> Export my data
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" onClick={() => toast({ title: 'Request submitted', description: 'Account deletion requires confirmation.', variant: 'destructive' })}>
                    <Trash2 size={16} /> Delete account
                  </Button>
                </div>
              </div>
            )}

            {section === 'subscription' && (
              <div className="space-y-6">
                <div className="flex items-start justify-between pb-6 border-b border-border">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="text-primary" size={20} />
                      <h3 className="text-2xl font-bold text-foreground">UN1Q Business</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Your plan renews on July 10, 2026</p>
                  </div>
                  <Button variant="outline" onClick={() => toast({ title: 'Opening billing portal...' })}>
                    Manage
                  </Button>
                </div>

                <div className="space-y-3">
                  {[
                    { title: '50 active seats', desc: 'Unlimited access to all UN1Q features for your team' },
                    { title: 'Aggregate analytics dashboard', desc: 'Real-time team insights with full privacy compliance' },
                    { title: 'Priority support', desc: 'Dedicated success manager and 24h response SLA' },
                    { title: 'SSO & integrations', desc: 'Connect with Slack, HRIS systems, and your identity provider' },
                    { title: 'Custom reports', desc: 'Schedule monthly exports and build custom dashboards' },
                  ].map(feat => (
                    <div key={feat.title} className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary/40 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="text-primary" size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{feat.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => toast({ title: 'Upgrade options', description: 'Contact sales for Enterprise plans.' })}>
                    Upgrade to Enterprise
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
