import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, CreditCard, Download, Plus, Minus } from 'lucide-react';
import { subscriptionInfo, mockInvoices } from '@/data/mock-data';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

const BillingPage = () => {
  const [changeSeatsOpen, setChangeSeatsOpen] = useState(false);
  const [seatDelta, setSeatDelta] = useState(0);
  const [overUtilization, setOverUtilization] = useState(false);
  const { toast } = useToast();
  const s = subscriptionInfo;

  const newSeats = s.seatsPurchased + seatDelta;
  const pricePerSeat = 81.67;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Subscriptions & Billing</h1>
        <p className="text-sm text-muted-foreground">Manage your plan, seats, and invoices</p>
      </div>

      {/* Simulate over-utilization */}
      <div className="flex items-center gap-3 text-sm">
        <span className="text-muted-foreground">Simulate over-utilization:</span>
        <Switch checked={overUtilization} onCheckedChange={setOverUtilization} />
      </div>

      {overUtilization && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
          <AlertTriangle size={18} className="text-destructive mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Over-utilization warning</p>
            <p className="text-xs text-muted-foreground">You have assigned more seats (35) than purchased (30). Please add seats to remain compliant.</p>
          </div>
          <Button size="sm" variant="destructive" onClick={() => setChangeSeatsOpen(true)}>Add Seats</Button>
        </div>
      )}

      {/* Subscription overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Subscription</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Plan</span><span className="font-medium text-foreground">{s.plan}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Monthly Cost</span><span className="font-medium text-foreground">{s.monthlyPrice}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Renewal Date</span><span className="font-medium text-foreground">{s.renewalDate}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Add-ons</span><span className="font-medium text-foreground">{s.addOns.join(', ')}</span></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Seats</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Purchased</span><span className="font-bold text-foreground text-lg">{s.seatsPurchased}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Assigned</span><span className="font-medium text-foreground">{s.seatsAssigned}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Available</span><span className="font-medium text-primary">{s.seatsPurchased - s.seatsAssigned}</span></div>
            <Button size="sm" variant="outline" onClick={() => setChangeSeatsOpen(true)} className="w-full mt-2">Change Seats</Button>
          </CardContent>
        </Card>
      </div>

      {/* Payment info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Payment Method</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <CreditCard size={20} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{s.paymentMethod}</span>
              <Button variant="ghost" size="sm" className="ml-auto" onClick={() => toast({ title: 'Update payment', description: 'Payment update flow would open here' })}>Update</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Billing Contact</CardTitle></CardHeader>
          <CardContent>
            <span className="text-sm text-foreground">{s.billingContact}</span>
            <Button variant="ghost" size="sm" className="ml-4" onClick={() => toast({ title: 'Edit contact' })}>Edit</Button>
          </CardContent>
        </Card>
      </div>

      {/* Invoices */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Invoices</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.map(inv => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium text-sm">{inv.id}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{inv.date}</TableCell>
                  <TableCell className="text-sm">{inv.amount}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs bg-primary/10 text-primary">{inv.status}</Badge></TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast({ title: 'Downloading', description: `${inv.id}.pdf` })}>
                      <Download size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Change seats modal */}
      <Dialog open={changeSeatsOpen} onOpenChange={setChangeSeatsOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Change Seats</DialogTitle><DialogDescription>Adjust your seat count. Changes take effect immediately.</DialogDescription></DialogHeader>
          <div className="flex items-center justify-center gap-6 py-6">
            <Button variant="outline" size="icon" onClick={() => setSeatDelta(d => d - 1)} disabled={newSeats <= s.seatsAssigned}><Minus size={16} /></Button>
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">{newSeats}</p>
              <p className="text-xs text-muted-foreground">seats</p>
            </div>
            <Button variant="outline" size="icon" onClick={() => setSeatDelta(d => d + 1)}><Plus size={16} /></Button>
          </div>
          {seatDelta !== 0 && (
            <div className="text-center text-sm text-muted-foreground">
              New monthly cost: <span className="font-medium text-foreground">€{(newSeats * pricePerSeat).toFixed(2)}</span>
              <span className="text-xs"> ({seatDelta > 0 ? '+' : ''}{seatDelta} seats)</span>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setChangeSeatsOpen(false); setSeatDelta(0); }}>Cancel</Button>
            <Button onClick={() => { setChangeSeatsOpen(false); setSeatDelta(0); toast({ title: 'Seats updated', description: `Plan now has ${newSeats} seats` }); }} className="bg-primary text-primary-foreground" disabled={seatDelta === 0}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BillingPage;
