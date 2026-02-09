import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Tag, Users, BarChart3, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BillingPeriod, actions, plans } from './types';
import InviteFlow from './InviteFlow';

interface CorporateSectionProps {
  period: BillingPeriod;
}

const corporatePlan = plans.find((p) => p.id === 'corporate')!;

const seatBlocks = [10, 25, 50];

const CorporateSection = ({ period }: CorporateSectionProps) => {
  const [discountCode, setDiscountCode] = useState('');
  const [discountResult, setDiscountResult] = useState<{ valid: boolean; discountPercent: number } | null>(null);
  const [selectedSeats, setSelectedSeats] = useState(10);
  const [customSeats, setCustomSeats] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [showBlockInvites, setShowBlockInvites] = useState(false);

  const handleApplyDiscount = () => {
    const result = actions.applyDiscount(discountCode);
    setDiscountResult(result);
  };

  const totalSeats = customSeats ? parseInt(customSeats, 10) || selectedSeats : selectedSeats;
  const blockPrice = corporatePlan.pricing[period] * totalSeats;

  return (
    <section id="business" className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="label-badge mx-auto w-fit mb-4">
            <Building2 className="w-4 h-4" />
            For Business
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Corporate Plans
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Flexible models for organisations of any size. Choose the approach that works for your team.
          </p>
        </motion.div>

        <Tabs defaultValue="discount" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-1 rounded-2xl">
            <TabsTrigger value="discount" className="rounded-xl py-3 text-xs sm:text-sm">
              <Tag className="w-4 h-4 mr-1.5 hidden sm:inline" />
              Discount Codes
            </TabsTrigger>
            <TabsTrigger value="payper" className="rounded-xl py-3 text-xs sm:text-sm">
              <BarChart3 className="w-4 h-4 mr-1.5 hidden sm:inline" />
              Pay-per-User
            </TabsTrigger>
            <TabsTrigger value="block" className="rounded-xl py-3 text-xs sm:text-sm">
              <Users className="w-4 h-4 mr-1.5 hidden sm:inline" />
              Block Seats
            </TabsTrigger>
          </TabsList>

          {/* Model 1: Discount Codes */}
          <TabsContent value="discount">
            <div className="card-wellness max-w-lg mx-auto">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Employee Discount Codes</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Your employer provides a discount code for reduced subscription pricing. Codes may be time-limited or usage-limited.
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter discount code"
                  value={discountCode}
                  onChange={(e) => { setDiscountCode(e.target.value); setDiscountResult(null); }}
                  className="rounded-xl"
                />
                <Button onClick={handleApplyDiscount} variant="default" className="rounded-xl shrink-0">
                  Apply
                </Button>
              </div>
              {discountResult && (
                <div className={`mt-4 flex items-center gap-2 text-sm ${discountResult.valid ? 'text-primary' : 'text-destructive'}`}>
                  {discountResult.valid ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {discountResult.valid
                    ? `Code applied! ${discountResult.discountPercent}% discount on your subscription.`
                    : 'Invalid, expired, or fully redeemed code. Please check and try again.'}
                </div>
              )}
              {discountResult?.valid && (
                <div className="mt-4 p-4 rounded-xl bg-primary-light">
                  <p className="text-sm font-medium text-foreground">
                    Discounted price: <span className="text-primary font-bold">€{(corporatePlan.pricing[period] * (1 - discountResult.discountPercent / 100)).toFixed(2)}</span> / {period}
                  </p>
                  <Button variant="accent" className="mt-3 w-full" onClick={() => actions.subscribe('corporate-discount', period)}>
                    Subscribe with Discount
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Model 2: Pay-per-active-user */}
          <TabsContent value="payper">
            <div className="card-wellness max-w-lg mx-auto">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Pay-per-Active-User</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your company only pays for employees who actively use UN1Q. Enter your company identifier to link your account.
              </p>
              <p className="text-xs text-muted-foreground mb-6 bg-muted rounded-xl p-3">
                Billing is metered — your organisation is charged only for users who log in and engage each billing cycle.
              </p>
              <div className="space-y-3">
                <Input
                  placeholder="Company ID, Email Domain, or Employer Code"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  className="rounded-xl"
                />
                <Button
                  variant="accent"
                  className="w-full"
                  disabled={!companyId.trim()}
                  onClick={() => {
                    alert(`[Placeholder] Activate access for company: ${companyId}`);
                  }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Activate Access
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Model 3: Block Subscription */}
          <TabsContent value="block">
            <div className="card-wellness max-w-lg mx-auto">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Block Seat Subscription</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Purchase a block of seats and invite team members via email.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {seatBlocks.map((n) => (
                  <button
                    key={n}
                    onClick={() => { setSelectedSeats(n); setCustomSeats(''); }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                      selectedSeats === n && !customSeats
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card text-foreground border-border hover:border-primary'
                    }`}
                  >
                    {n} seats
                  </button>
                ))}
                <Input
                  placeholder="Custom"
                  type="number"
                  min={2}
                  value={customSeats}
                  onChange={(e) => setCustomSeats(e.target.value)}
                  className="w-24 rounded-xl"
                />
              </div>

              <div className="bg-muted rounded-xl p-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  {totalSeats} seats × €{corporatePlan.pricing[period].toFixed(2)} / {period}
                </p>
                <p className="font-display text-2xl font-bold text-foreground mt-1">
                  €{blockPrice.toFixed(2)}<span className="text-sm text-muted-foreground font-normal"> / {period}</span>
                </p>
              </div>

              {!showBlockInvites ? (
                <Button
                  variant="accent"
                  className="w-full"
                  onClick={() => {
                    actions.subscribe(`corporate-block-${totalSeats}`, period);
                    setShowBlockInvites(true);
                  }}
                >
                  Purchase {totalSeats} Seats
                </Button>
              ) : (
                <InviteFlow seatsTotal={totalSeats} seatsUsed={0} />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CorporateSection;
