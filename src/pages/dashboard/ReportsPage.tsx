import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Calendar, Download, Plus } from 'lucide-react';
import { mockReports } from '@/data/mock-data';
import { useToast } from '@/hooks/use-toast';

const templates = ['Team Wellness Report', 'Monthly Engagement Summary', 'Program Outcomes', 'Adoption Metrics', 'Custom Report'];

const ReportsPage = () => {
  const [reports, setReports] = useState(mockReports);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const { toast } = useToast();

  const scheduleReport = () => {
    setReports(prev => [
      { id: `r-${Date.now()}`, name: selectedTemplate, type: 'Scheduled', lastRun: 'Pending', format: 'PDF', schedule: 'Monthly' },
      ...prev,
    ]);
    setScheduleOpen(false);
    toast({ title: 'Report scheduled', description: `${selectedTemplate} will run monthly` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground">Manage saved and scheduled reports</p>
        </div>
        <Button size="sm" onClick={() => setScheduleOpen(true)} className="bg-primary text-primary-foreground">
          <Plus size={14} className="mr-1" /> Schedule Report
        </Button>
      </div>

      {/* Saved reports */}
      <div className="space-y-3">
        {reports.map(report => (
          <Card key={report.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10"><FileText size={18} className="text-primary" /></div>
                <div>
                  <p className="text-sm font-medium text-foreground">{report.name}</p>
                  <p className="text-xs text-muted-foreground">Last run: {report.lastRun} · {report.format}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">{report.type}</Badge>
                {report.schedule && <Badge variant="outline" className="text-xs bg-primary/10 text-primary"><Calendar size={10} className="mr-1" /> {report.schedule}</Badge>}
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast({ title: 'Downloading', description: report.name })}>
                  <Download size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Templates */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Report Templates</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {templates.map(t => (
            <div key={t} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <span className="text-sm text-foreground">{t}</span>
              <Button variant="outline" size="sm" onClick={() => { setSelectedTemplate(t); setScheduleOpen(true); }}>Use Template</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Schedule modal */}
      <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Schedule Report</DialogTitle><DialogDescription>Set up a recurring report.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Template</label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>{templates.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleOpen(false)}>Cancel</Button>
            <Button onClick={scheduleReport} className="bg-primary text-primary-foreground">Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportsPage;
