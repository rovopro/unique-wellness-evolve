import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, AlertCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRole } from '@/contexts/RoleContext';
import { mockExportHistory } from '@/data/mock-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const engagementData = [
  { month: 'Oct', value: 62 }, { month: 'Nov', value: 68 }, { month: 'Dec', value: 65 },
  { month: 'Jan', value: 72 }, { month: 'Feb', value: 78 }, { month: 'Mar', value: 82 },
];

const adoptionData = [
  { name: 'Exercise', value: 85 }, { name: 'Nutrition', value: 62 }, { name: 'Mindset', value: 74 }, { name: 'Sleep', value: 55 },
];

const contentData = [
  { type: 'Workouts', views: 1240, completions: 890 },
  { type: 'Articles', views: 850, completions: 420 },
  { type: 'Meditations', views: 620, completions: 510 },
  { type: 'Recipes', views: 430, completions: 280 },
];

const COLORS = ['hsl(170, 100%, 47%)', 'hsl(210, 80%, 60%)', 'hsl(280, 70%, 55%)', 'hsl(30, 80%, 55%)'];

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('CSV');
  const [exports, setExports] = useState(mockExportHistory);
  const { toast } = useToast();
  const { role } = useRole();

  const handleExport = () => {
    // Simulate random failure
    const success = Math.random() > 0.3;
    if (success) {
      setExports(prev => [{ id: `e-${Date.now()}`, name: 'Analytics export', date: new Date().toISOString().split('T')[0], format: exportFormat, status: 'Completed' }, ...prev]);
      toast({ title: 'Export completed', description: `${exportFormat} file ready for download` });
    } else {
      setExports(prev => [{ id: `e-${Date.now()}`, name: 'Analytics export', date: new Date().toISOString().split('T')[0], format: exportFormat, status: 'Failed' }, ...prev]);
      toast({ title: 'Export failed', description: 'Please try again', variant: 'destructive' });
    }
    setExportOpen(false);
  };

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const KpiTile = ({ label, value, sub }: { label: string; value: string; sub: string }) => (
    <Card><CardContent className="p-4">
      <p className="text-xs text-muted-foreground uppercase">{label}</p>
      <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
    </CardContent></Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">{role === 'Manager' ? 'Read-only view' : 'Full analytics access'}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={simulateLoading}>Refresh</Button>
          <Button size="sm" onClick={() => setExportOpen(true)} className="bg-primary text-primary-foreground">
            <Download size={14} className="mr-1" /> Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="engagement">
        <TabsList className="flex-wrap">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="adoption">Adoption</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="mt-4 space-y-4">
          {loading ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1,2,3].map(i => <Skeleton key={i} className="h-24 rounded-lg" />)}
              </div>
              <Skeleton className="h-64 rounded-lg" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <KpiTile label="Avg Engagement" value="82%" sub="+6% vs last month" />
                <KpiTile label="Weekly Active" value="22/27" sub="81% of total users" />
                <KpiTile label="Avg Sessions/Week" value="4.2" sub="+0.5 vs prior" />
              </div>
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-base">Engagement Trend</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis domain={[50, 100]} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="hsl(170, 100%, 47%)" strokeWidth={2} dot={{ fill: 'hsl(170, 100%, 47%)' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="adoption" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {adoptionData.map(d => <KpiTile key={d.name} label={d.name} value={`${d.value}%`} sub="feature adoption" />)}
          </div>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Feature Adoption</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={adoptionData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(170, 100%, 47%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <KpiTile label="Active Programs" value="3" sub="across all teams" />
            <KpiTile label="Total Enrolled" value="28" sub="unique participants" />
            <KpiTile label="Completion Rate" value="68%" sub="+4% vs avg" />
          </div>
        </TabsContent>

        <TabsContent value="content" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {contentData.map(c => <KpiTile key={c.type} label={c.type} value={c.views.toString()} sub={`${c.completions} completions`} />)}
          </div>
        </TabsContent>

        <TabsContent value="outcomes" className="mt-4 space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <Info size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Aggregate-only data</p>
              <p className="text-xs text-muted-foreground">Outcomes data is shown in aggregate to protect individual privacy. No individual health data is displayed.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <KpiTile label="Improved Wellbeing" value="72%" sub="self-reported" />
            <KpiTile label="Stress Reduction" value="34%" sub="avg across users" />
            <KpiTile label="Activity Increase" value="45%" sub="vs baseline" />
          </div>
        </TabsContent>
      </Tabs>

      {/* Export history */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Export History</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {exports.map(e => (
            <div key={e.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{e.name}</p>
                <p className="text-xs text-muted-foreground">{e.date} · {e.format}</p>
              </div>
              <Badge variant="outline" className={`text-xs ${e.status === 'Failed' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                {e.status === 'Failed' && <AlertCircle size={12} className="mr-1" />}
                {e.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Export modal */}
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Export Analytics</DialogTitle><DialogDescription>Choose export format and options.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Format</label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="CSV">CSV</SelectItem>
                  <SelectItem value="PDF">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportOpen(false)}>Cancel</Button>
            <Button onClick={handleExport} className="bg-primary text-primary-foreground">Export</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnalyticsPage;
