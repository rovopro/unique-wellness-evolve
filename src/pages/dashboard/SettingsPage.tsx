import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockAuditLog } from '@/data/mock-data';
import { useToast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const { toast } = useToast();
  const [companyName, setCompanyName] = useState('UNIQ Fitness Ltd');
  const [aggregateOnly, setAggregateOnly] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage company profile, roles, and privacy</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Company Profile</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <Card><CardContent className="p-5 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Company Name</label>
              <input value={companyName} onChange={e => setCompanyName(e.target.value)}
                className="w-full mt-1.5 px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Industry</label>
              <input defaultValue="Technology / SaaS" className="w-full mt-1.5 px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Size</label>
              <input defaultValue="50-100 employees" className="w-full mt-1.5 px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <Button size="sm" onClick={() => toast({ title: 'Settings saved' })} className="bg-primary text-primary-foreground">Save Changes</Button>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="roles" className="mt-4">
          <Card><CardContent className="p-5 space-y-4">
            {[
              { role: 'Company Admin', desc: 'Full access including billing, integrations, and settings', count: 2 },
              { role: 'Manager', desc: 'User management for own team, read-only analytics', count: 3 },
              { role: 'Analyst', desc: 'Analytics and reports only, read-only users', count: 1 },
            ].map(r => (
              <div key={r.role} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{r.role}</p>
                  <p className="text-xs text-muted-foreground">{r.desc}</p>
                </div>
                <Badge variant="outline" className="text-xs">{r.count} users</Badge>
              </div>
            ))}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-4">
          <Card><CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Aggregate-only analytics</p>
                <p className="text-xs text-muted-foreground">When enabled, outcomes data shows only aggregate metrics</p>
              </div>
              <Switch checked={aggregateOnly} onCheckedChange={setAggregateOnly} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Data retention (90 days)</p>
                <p className="text-xs text-muted-foreground">Activity logs are retained for 90 days</p>
              </div>
              <Badge variant="outline" className="text-xs">Active</Badge>
            </div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="audit" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Actor</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAuditLog.map(log => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm font-medium">{log.action}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{log.actor}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{log.target}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{log.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
