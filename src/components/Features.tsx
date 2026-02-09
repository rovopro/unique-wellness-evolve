import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Beaker, 
  Brain, 
  Target, 
  Scale, 
  TrendingUp, 
  BarChart3, 
  CreditCard 
} from 'lucide-react';

const generalFeatures = [
  {
    icon: Beaker,
    title: 'Science-led and expert-built',
    description: 'Designed by physicians and behavioural scientists using medical and lifestyle medicine principles.',
  },
  {
    icon: Brain,
    title: 'Behaviour-change focused',
    description: 'Built to support sustainable habits rather than short-term motivation.',
  },
  {
    icon: Target,
    title: 'True individualisation',
    description: 'Programs adapt using over 70 data points collected through onboarding and ongoing use.',
  },
  {
    icon: Scale,
    title: 'Flexible body composition tracking',
    description: 'AI-powered estimates with optional manual input from calipers or devices.',
  },
  {
    icon: TrendingUp,
    title: 'Smart goal setting',
    description: 'Visual and aesthetic targets help users plan realistic timelines and outcomes.',
  },
  {
    icon: BarChart3,
    title: 'Progress statistics dashboard',
    description: 'One place to track progress across all health domains.',
  },
  {
    icon: CreditCard,
    title: 'Fair subscriptions',
    description: 'Transparent pricing aligned with real value, without hidden limitations.',
  },
];

const Features = () => {
  return (
    <section id="features" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Health, built around you
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            UN1Q brings together exercise, nutrition, and mindset into one adaptive system that evolves with your body, behaviour, and goals — guided by science, not trends.
          </p>
        </motion.div>

        {/* General Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">General Features</h3>
            <p className="text-muted-foreground">
              UN1Q is not a collection of disconnected tools. It is a complete health system designed to support real, long-term change. Every feature works together to remove guesswork, reduce overwhelm, and help users move forward with clarity and confidence.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {generalFeatures.map((feature, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-2xl border-none shadow-card px-6"
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{feature.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 pl-14">
                  {feature.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
