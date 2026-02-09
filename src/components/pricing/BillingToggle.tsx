import { motion } from 'framer-motion';
import { BillingPeriod, billingLabels } from './types';

interface BillingToggleProps {
  selected: BillingPeriod;
  onChange: (period: BillingPeriod) => void;
}

const periods: BillingPeriod[] = ['monthly', 'quarterly', 'yearly'];

const BillingToggle = ({ selected, onChange }: BillingToggleProps) => {
  return (
    <div className="inline-flex items-center rounded-full bg-muted p-1 gap-1">
      {periods.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className="relative px-5 py-2.5 text-sm font-medium rounded-full transition-colors"
        >
          {selected === p && (
            <motion.span
              layoutId="billing-pill"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className={`relative z-10 ${selected === p ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
            {billingLabels[p]}
            {p === 'yearly' && (
              <span className="ml-1 text-xs opacity-80">Save most</span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
};

export default BillingToggle;
