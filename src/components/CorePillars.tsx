import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Dumbbell, Apple, Heart } from 'lucide-react';

type PillarKey = 'exercise' | 'nutrition' | 'mindset';

const pillars = {
  exercise: {
    icon: Dumbbell,
    title: 'Exercise',
    description: 'Training that adapts as you train. UN1Q exercise programming responds in real time to performance, fatigue, and progression.',
    features: [
      '600+ exercises across all equipment types',
      'Station, superset, and circuit training',
      'Built-in periodisation',
      'Custom training splits and styles',
      'Real-time updates during workouts',
      'Automatic program updates after each session',
      'Workout reassessment support',
    ],
  },
  nutrition: {
    icon: Apple,
    title: 'Nutrition',
    description: 'Flexible structure without restriction. Nutrition adapts to real life while still driving measurable progress.',
    features: [
      'Time-restricted feeding, flexible dieting, diet breaks',
      'Food logging via barcode, image, or manual entry',
      'Custom macro splits',
      'Daily nutrition updates',
      'Ongoing progress reassessments',
    ],
  },
  mindset: {
    icon: Heart,
    title: 'Mindset',
    description: 'Change the way you think, not just what you do. Mindset coaching bridges the gap between intention and action.',
    features: [
      'Coaching based on stage of change',
      'Short 5-minute sessions',
      'Enjoyable learning content',
      'Journaling tools',
      'Practical mindset techniques',
    ],
  },
};

const CorePillars = () => {
  const [activePillar, setActivePillar] = useState<PillarKey>('exercise');
  const currentPillar = pillars[activePillar];

  return (
    <section id="goals" className="section-padding bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Core Pillars</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Three pillars of change
          </h2>
        </motion.div>

        {/* Pillar Tabs */}
        <div className="flex justify-center gap-3 md:gap-6 mb-12">
          {(Object.keys(pillars) as PillarKey[]).map((key) => {
            const pillar = pillars[key];
            const isActive = activePillar === key;
            return (
              <button
                key={key}
                onClick={() => setActivePillar(key)}
                className={`flex flex-col items-center gap-2 px-6 py-4 md:px-10 md:py-5 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-wellness-lg'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <pillar.icon className="w-6 h-6 md:w-8 md:h-8" />
                <span className="font-medium text-sm md:text-base">{pillar.title}</span>
              </button>
            );
          })}
        </div>

        {/* Pillar Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            {/* Description */}
            <div className="text-center mb-8">
              <p className="text-muted-foreground text-lg">
                {currentPillar.description}
              </p>
            </div>

            {/* Features Accordion */}
            <Accordion type="single" collapsible className="space-y-3">
              {currentPillar.features.map((feature, index) => (
                <AccordionItem
                  key={index}
                  value={`feature-${index}`}
                  className="bg-card rounded-2xl border-none shadow-card px-6"
                >
                  <AccordionTrigger className="hover:no-underline py-5">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold text-sm">{index + 1}</span>
                      </div>
                      <span className="font-medium text-foreground">{feature}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 pl-12">
                    This feature is designed to help you achieve sustainable results through evidence-based approaches.
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CorePillars;
