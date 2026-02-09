import { motion } from 'framer-motion';
import { CreditCard, Apple, Smartphone, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserSubscription, SubscriptionStatus as StatusType } from './types';
import InviteFlow from './InviteFlow';

interface SubscriptionStatusProps {
  subscription: UserSubscription | null;
}

const sourceIcon: Record<string, React.ReactNode> = {
  web: <CreditCard className="w-5 h-5" />,
  apple: <Apple className="w-5 h-5" />,
  google: <Smartphone className="w-5 h-5" />,
};

const sourceLabel: Record<string, string> = {
  web: 'Web (WooCommerce / Stripe)',
  apple: 'Apple App Store',
  google: 'Google Play',
};

const statusColors: Record<StatusType, string> = {
  trialing: 'bg-blue-100 text-blue-700',
  active: 'bg-emerald-100 text-emerald-700',
  past_due: 'bg-amber-100 text-amber-700',
  canceled: 'bg-muted text-muted-foreground',
  expired: 'bg-muted text-muted-foreground',
  dormant: 'bg-orange-100 text-orange-700',
};

const SubscriptionStatusPanel = ({ subscription }: SubscriptionStatusProps) => {
  if (!subscription) return null;

  const isDormant = subscription.status === 'dormant';
  const isAppStore = subscription.source === 'apple' || subscription.source === 'google';
  const hasSeats = subscription.seatsTotal && subscription.seatsTotal > 1;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="section-padding"
    >
      <div className="container mx-auto max-w-2xl">
        <div className="card-wellness">
          <h3 className="font-display text-xl font-bold text-foreground mb-6">Your Subscription</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Source</span>
              <div className="flex items-center gap-2 text-foreground text-sm font-medium">
                {sourceIcon[subscription.source]}
                {sourceLabel[subscription.source]}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Plan</span>
              <span className="text-sm font-medium text-foreground">{subscription.planName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge className={`${statusColors[subscription.status]} border-0`}>
                {subscription.status.replace('_', ' ')}
              </Badge>
            </div>

            {subscription.currentPeriodEnd && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current period ends</span>
                <span className="text-sm text-foreground">{subscription.currentPeriodEnd}</span>
              </div>
            )}
          </div>

          {/* Dormant status handling */}
          {isDormant && (
            <div className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Dormant Subscription</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    You are paying €0.99/month to keep your account and data. You do not have access to app features.
                  </p>
                  {isAppStore ? (
                    <p className="text-xs text-muted-foreground bg-muted rounded-lg p-2">
                      <strong>Note:</strong> Dormant status is not supported as a native status on {subscription.source === 'apple' ? 'Apple App Store' : 'Google Play'}. Please switch to the low-tier "Dormant" subscription product in your app store to downgrade.
                    </p>
                  ) : (
                    <Button variant="accent" size="sm">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      Reactivate Full Access
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Seat invite flow for multi-seat plans */}
          {hasSeats && (
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-display text-base font-semibold text-foreground mb-4">Manage Members</h4>
              <InviteFlow
                seatsTotal={subscription.seatsTotal!}
                seatsUsed={subscription.seatsUsed || 0}
              />
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default SubscriptionStatusPanel;
