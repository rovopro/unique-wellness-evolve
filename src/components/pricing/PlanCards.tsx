import { motion } from 'framer-motion';
import { Check, Users, Building2, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plan, BillingPeriod, Eligibility, getSavingsPercent, actions } from './types';

interface PlanCardsProps {
  plans: Plan[];
  period: BillingPeriod;
  eligibility: Eligibility | null;
  isLoggedIn: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  'individual-reduced': <Crown className="w-5 h-5" />,
  'individual-full': <Crown className="w-5 h-5" />,
  duo: <Users className="w-5 h-5" />,
  family: <Users className="w-5 h-5" />,
  corporate: <Building2 className="w-5 h-5" />,
};

const PlanCards = ({ plans, period, eligibility, isLoggedIn }: PlanCardsProps) => {
  const visiblePlans = plans.filter((plan) => {
    if (!isLoggedIn || !eligibility) return plan.eligibility !== 'b2b'; // show retail plans when logged out
    if (eligibility === 'nonintender') return plan.eligibility === 'nonintender';
    return plan.eligibility === 'intender_actor'; // intender_actor sees full, duo, family
  });

  return (
    <div className={`flex flex-wrap justify-center gap-6 max-w-6xl mx-auto`}>
      {visiblePlans.map((plan, i) => {
        const savings = getSavingsPercent(plan, period);
        return (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl p-6 md:p-8 flex flex-col bg-card border transition-shadow hover:shadow-wellness-lg w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] ${
              plan.popular ? 'border-primary shadow-wellness-lg ring-2 ring-primary/20' : 'border-border shadow-card'
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1">
                Most Popular
              </Badge>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                {iconMap[plan.id]}
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {plan.name}
                </h3>
                {plan.subtitle && (
                  <span className="text-xs text-muted-foreground font-medium">{plan.subtitle}</span>
                )}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-5">{plan.description}</p>

            <div className="mb-6">
              <div className="flex items-end gap-1">
                <span className="font-display text-4xl font-bold text-foreground">
                  €{plan.pricing[period].toFixed(2)}
                </span>
                <span className="text-muted-foreground text-sm mb-1">
                  /{period === 'monthly' ? 'mo' : period === 'quarterly' ? 'qtr' : 'yr'}
                </span>
              </div>
              {savings > 0 && (
                <span className="text-sm font-medium text-primary mt-1 inline-block">
                  Save {savings}% vs monthly
                </span>
              )}
              {typeof plan.seats === 'number' && (
                <p className="text-xs text-muted-foreground mt-1">{plan.seats} seat{plan.seats > 1 ? 's' : ''}</p>
              )}
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Button
              variant={plan.popular ? 'accent' : 'outline'}
              size="lg"
              className="w-full"
              onClick={() => {
                if (!isLoggedIn) {
                  alert('Please log in first. Final eligibility is confirmed after login.');
                  return;
                }
                actions.subscribe(plan.id, period);
              }}
            >
              {plan.cta}
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PlanCards;
