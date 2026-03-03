import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Link2, Shield, MessageSquare, Webhook, Key, Check, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: typeof Shield;
  connected: boolean;
}

const IntegrationsPage = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: 'sso', name: 'SSO (SAML/OIDC)', description: 'Single sign-on via Okta, Azure AD, or Google Workspace', icon: Shield, connected: true },
    { id: 'hr', name: 'HR Sync', description: 'Auto-sync users from BambooHR, Workday, or Personio', icon: Link2, connected: false },
    { id: 'slack', name: 'Slack', description: 'Post activity updates and alerts to Slack channels', icon: MessageSquare, connected: false },
    { id: 'teams', name: 'Microsoft Teams', description: 'Integrate with Teams for notifications and updates', icon: MessageSquare, connected: false },
    { id: 'webhooks', name: 'Webhooks', description: 'Send event data to your own endpoints', icon: Webhook, connected: false },
    { id: 'api', name: 'API Keys', description: 'Programmatic access to your portal data', icon: Key, connected: true },
  ]);
  const [connectModal, setConnectModal] = useState<Integration | null>(null);
  const { toast } = useToast();

  const toggleConnection = (id: string) => {
    setIntegrations(prev => prev.map(i => i.id === id ? { ...i, connected: !i.connected } : i));
    const integration = integrations.find(i => i.id === id)!;
    toast({
      title: integration.connected ? 'Disconnected' : 'Connected',
      description: `${integration.name} has been ${integration.connected ? 'disconnected' : 'connected'}.`,
    });
    setConnectModal(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Integrations</h1>
        <p className="text-sm text-muted-foreground">Connect third-party services to enhance your portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map(integration => (
          <Card key={integration.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <integration.icon size={20} className="text-primary" />
                </div>
                {integration.connected && <Badge variant="outline" className="text-xs bg-primary/10 text-primary"><Check size={10} className="mr-1" /> Connected</Badge>}
              </div>
              <h3 className="font-semibold text-foreground mb-1">{integration.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
              <Button
                variant={integration.connected ? 'outline' : 'default'}
                size="sm"
                className={integration.connected ? '' : 'bg-primary text-primary-foreground'}
                onClick={() => integration.connected ? toggleConnection(integration.id) : setConnectModal(integration)}
              >
                {integration.connected ? 'Disconnect' : 'Connect'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Connect modal */}
      <Dialog open={!!connectModal} onOpenChange={() => setConnectModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect {connectModal?.name}</DialogTitle>
            <DialogDescription>Configure your {connectModal?.name} integration. In a real implementation, this would include configuration fields.</DialogDescription>
          </DialogHeader>
          <div className="p-4 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground">
            <p>This is a simulated connection flow. Click "Connect" to simulate a successful connection.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConnectModal(null)}>Cancel</Button>
            <Button onClick={() => connectModal && toggleConnection(connectModal.id)} className="bg-primary text-primary-foreground">Connect</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IntegrationsPage;
