import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BillingToggle from '@/components/pricing/BillingToggle';
import PlanCards from '@/components/pricing/PlanCards';
import CorporateSection from '@/components/pricing/CorporateSection';
import SubscriptionStatusPanel from '@/components/pricing/SubscriptionStatus';
import AppStoreSync from '@/components/pricing/AppStoreSync';
import PricingFAQ from '@/components/pricing/PricingFAQ';
import { BillingPeriod, Eligibility, plans, UserSubscription } from '@/components/pricing/types';
import { Info } from 'lucide-react';

// ── Mock state — in production, these come from auth + API ──
const MOCK_LOGGED_IN = true;
const MOCK_ELIGIBILITY: Eligibility = 'intender_actor' as Eligibility; // change to 'nonintender' to test reduced pricing
const MOCK_SUBSCRIPTION: UserSubscription | null = null;
// Example active sub: { source: 'web', status: 'active', planId: 'individual-full', planName: 'Individual Full', currentPeriodEnd: '2026-03-09', seatsUsed: 0, seatsTotal: 1 }

const Pricing = () => {
  const [period, setPeriod] = useState<BillingPeriod>('monthly');

  const isLoggedIn = MOCK_LOGGED_IN;
  const eligibility: Eligibility | null = isLoggedIn ? MOCK_ELIGIBILITY : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section id="pricing" className="pt-28 pb-8 md:pt-36 md:pb-12 section-padding">
          <div className="container mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="label-badge mx-auto w-fit mb-4">Transparent & Fair</div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Choose your plan
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg mb-8">
                Fair subscriptions aligned with real value. Pick the plan that fits your stage and goals.
              </p>
            </motion.div>

            {/* Eligibility message */}
            {isLoggedIn && eligibility && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-primary-light text-primary-dark px-4 py-2 rounded-xl text-sm font-medium mb-6"
              >
                <Info className="w-4 h-4" />
                {eligibility === 'nonintender'
                  ? 'You qualify for reduced pricing on Individual plans.'
                  : 'You qualify for standard pricing and multi-seat plans.'}
              </motion.div>
            )}

            {!isLoggedIn && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-muted-foreground mb-6"
              >
                Prices shown are indicative. Log in to confirm your eligibility and final pricing.
              </motion.p>
            )}

            {/* Billing toggle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <BillingToggle selected={period} onChange={setPeriod} />
            </motion.div>
          </div>
        </section>

        {/* Plan cards */}
        <section className="pb-16 px-4 md:px-8">
          <PlanCards plans={plans} period={period} eligibility={eligibility} isLoggedIn={isLoggedIn} />
        </section>

        {/* Corporate section */}
        <CorporateSection period={period} />

        {/* Subscription status (logged in only) */}
        {isLoggedIn && MOCK_SUBSCRIPTION && (
          <SubscriptionStatusPanel subscription={MOCK_SUBSCRIPTION} />
        )}

        {/* App Store sync */}
        <AppStoreSync />

        {/* FAQ */}
        <PricingFAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
