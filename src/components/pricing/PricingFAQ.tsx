import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'What is Nonintender pricing?',
    a: 'Nonintender pricing is a reduced subscription tier for users who are in the early stages of behaviour change (contemplation or pre-contemplation). It provides access to core features at a lower cost to support your health journey. Eligibility is determined automatically based on your health behaviour assessment during onboarding.',
  },
  {
    q: 'How do invites work for Duo, Family, and Corporate plans?',
    a: 'After purchasing a multi-seat plan, you can invite additional members by entering their email addresses. Each person receives a unique activation link. Once they sign up (or log in) and accept the invite, a seat is allocated to them and they get full access to the app.',
  },
  {
    q: 'What is Dormant?',
    a: 'Dormant is a low-cost web-only status (€0.99/month) that preserves your account and data when you no longer need full access. You won\'t be able to use app features, but your progress and history are retained. You can reactivate to a full plan at any time. For App Store subscribers, dormant isn\'t available as a status — instead, switch to the dedicated "Dormant" tier in your app store.',
  },
  {
    q: 'I subscribed via Apple / Google — how do I access the website?',
    a: 'Sign in on the website with the same account you used in the app, then use the "Restore Purchases / Sync" feature to mirror your subscription status. Your app store subscription continues to be managed by Apple or Google, but we sync it for web access.',
  },
  {
    q: 'Can I switch between billing periods?',
    a: 'Yes. You can switch between monthly, quarterly, and yearly billing at any time. Changes take effect at the start of your next billing cycle. Longer periods offer increasing discounts.',
  },
  {
    q: 'What corporate billing models do you offer?',
    a: 'We support three models: (1) Discount codes — employees use a company-provided code for reduced pricing. (2) Pay-per-active-user — the company only pays for employees who actively use the service. (3) Block subscriptions — purchase a set number of seats and invite team members via email.',
  },
];

const PricingFAQ = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="section-padding"
    >
      <div className="container mx-auto max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-left text-sm md:text-base font-medium hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
};

export default PricingFAQ;
