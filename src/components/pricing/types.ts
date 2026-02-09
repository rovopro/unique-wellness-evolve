export type BillingPeriod = 'monthly' | 'quarterly' | 'yearly';
export type Eligibility = 'nonintender' | 'intender_actor';
export type SubscriptionSource = 'web' | 'apple' | 'google';
export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled' | 'expired' | 'dormant';

export interface Plan {
  id: string;
  name: string;
  subtitle?: string;
  seats: number | 'variable';
  seatOptions?: number[];
  eligibility: 'nonintender' | 'intender_actor' | 'b2b';
  pricing: Record<BillingPeriod, number>;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

export interface UserSubscription {
  source: SubscriptionSource;
  status: SubscriptionStatus;
  planId: string;
  planName: string;
  currentPeriodEnd?: string;
  seatsUsed?: number;
  seatsTotal?: number;
}

export interface InvitedMember {
  email: string;
  status: 'pending' | 'accepted';
  sentAt: string;
}

// Mock plans config — prices are placeholders
export const plans: Plan[] = [
  {
    id: 'individual-reduced',
    name: 'Individual',
    subtitle: 'Reduced',
    seats: 1,
    eligibility: 'nonintender',
    pricing: { monthly: 4.99, quarterly: 11.99, yearly: 39.99 },
    description: 'Science-backed health essentials at a reduced rate.',
    features: [
      'Personalised exercise programs',
      'Nutrition guidance',
      'Mindset coaching',
      'Progress tracking',
    ],
    cta: 'Subscribe',
  },
  {
    id: 'individual-full',
    name: 'Individual',
    subtitle: 'Full',
    seats: 1,
    eligibility: 'intender_actor',
    pricing: { monthly: 14.99, quarterly: 37.99, yearly: 129.99 },
    description: 'The complete UN1Q experience for your health journey.',
    features: [
      'Everything in Reduced',
      'Advanced periodisation',
      'Custom macro splits',
      'Real-time workout updates',
      'Journaling tools',
    ],
    popular: true,
    cta: 'Subscribe',
  },
  {
    id: 'duo',
    name: 'Duo',
    seats: 2,
    eligibility: 'intender_actor',
    pricing: { monthly: 24.99, quarterly: 62.99, yearly: 219.99 },
    description: 'Share the journey. Two seats, one subscription.',
    features: [
      'Everything in Individual Full',
      '2 seats included',
      'Invite via email link',
      'Independent programs per user',
    ],
    cta: 'Subscribe',
  },
  {
    id: 'family',
    name: 'Family',
    seats: 5,
    seatOptions: [4, 5],
    eligibility: 'intender_actor',
    pricing: { monthly: 34.99, quarterly: 89.99, yearly: 299.99 },
    description: 'Health for the whole family. Up to 5 members.',
    features: [
      'Everything in Individual Full',
      'Up to 5 seats',
      'Invite via email links',
      'Independent programs per user',
      'Family progress overview',
    ],
    cta: 'Subscribe',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    seats: 'variable',
    eligibility: 'b2b',
    pricing: { monthly: 9.99, quarterly: 24.99, yearly: 89.99 },
    description: 'Per-seat pricing for organisations. Volume discounts available.',
    features: [
      'Everything in Individual Full',
      'Flexible seat count',
      'Discount codes for employees',
      'Pay-per-active-user option',
      'Block subscription with invites',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
  },
];

export const billingLabels: Record<BillingPeriod, string> = {
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  yearly: 'Yearly',
};

export function getSavingsPercent(plan: Plan, period: BillingPeriod): number {
  if (period === 'monthly') return 0;
  const monthlyTotal =
    period === 'quarterly' ? plan.pricing.monthly * 3 : plan.pricing.monthly * 12;
  const actual = plan.pricing[period];
  return Math.round(((monthlyTotal - actual) / monthlyTotal) * 100);
}

// Placeholder actions
export const actions = {
  subscribe: (planId: string, period: BillingPeriod) => {
    console.log(`[Placeholder] subscribe(${planId}, ${period})`);
    alert(`Subscribe action: ${planId} — ${period}`);
  },
  applyDiscount: (code: string): { valid: boolean; discountPercent: number } => {
    console.log(`[Placeholder] applyDiscount(${code})`);
    if (code.toUpperCase() === 'DEMO20') return { valid: true, discountPercent: 20 };
    return { valid: false, discountPercent: 0 };
  },
  sendInvites: (emails: string[]) => {
    console.log(`[Placeholder] sendInvites`, emails);
    alert(`Invites sent to: ${emails.join(', ')}`);
  },
  syncAppStoreSubscription: () => {
    console.log('[Placeholder] syncAppStoreSubscription()');
    alert('App Store sync initiated');
  },
};
