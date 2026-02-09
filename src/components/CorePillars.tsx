import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Apple, Heart } from 'lucide-react';
import featurePlaceholder from '@/assets/feature-placeholder.png';

type PillarKey = 'exercise' | 'nutrition' | 'mindset';

interface PillarFeature {
  label: string;
  title: string;
  description: string;
}

const pillars: Record<PillarKey, {
  icon: typeof Dumbbell;
  title: string;
  description: string;
  features: PillarFeature[];
}> = {
  exercise: {
    icon: Dumbbell,
    title: 'Exercise',
    description: 'Training that adapts as you train. UN1Q exercise programming responds in real time to performance, fatigue, and progression.',
    features: [
      {
        label: 'Extensive Exercise Library',
        title: '600+ exercises across all equipment types.',
        description: 'From free weights to machines, bodyweight to bands — access a comprehensive library designed to fit any gym or home setup.',
      },
      {
        label: 'Smart Training Modes',
        title: 'Station, superset, and circuit training.',
        description: 'Train the way you like with intelligent workout structures that adapt to your preferred training style and available time.',
      },
      {
        label: 'Built-in Periodisation',
        title: 'Progressive overload, automated.',
        description: 'Your program evolves week by week with built-in periodisation cycles that prevent plateaus and optimise recovery.',
      },
      {
        label: 'Custom Splits & Styles',
        title: 'Your training, your rules.',
        description: 'Choose your split, select your training style, and let UN1Q build the perfect program around your preferences.',
      },
      {
        label: 'Real-Time Updates',
        title: 'Adapts while you train.',
        description: 'Workouts adjust in real time based on your performance, so you always train at the right intensity.',
      },
      {
        label: 'Auto Program Updates',
        title: 'Every session makes the next one better.',
        description: 'After each workout, your program automatically recalibrates based on your results and recovery.',
      },
    ],
  },
  nutrition: {
    icon: Apple,
    title: 'Nutrition',
    description: 'Flexible structure without restriction. Nutrition adapts to real life while still driving measurable progress.',
    features: [
      {
        label: 'Flexible Dieting',
        title: 'Time-restricted feeding and diet breaks.',
        description: 'Choose from multiple nutritional approaches including intermittent fasting, flexible dieting, and structured diet breaks.',
      },
      {
        label: 'Smart Food Logging',
        title: 'Log by barcode, image, or manual entry.',
        description: 'Track your nutrition effortlessly with multiple logging methods — scan a barcode, snap a photo, or type it in manually.',
      },
      {
        label: 'Custom Macros',
        title: 'Precision-tailored macro splits.',
        description: 'Get macro targets personalised to your body composition goals, activity level, and dietary preferences.',
      },
      {
        label: 'Daily Nutrition Updates',
        title: 'Your nutrition evolves daily.',
        description: 'Recommendations adjust each day based on your activity, progress, and adherence patterns.',
      },
      {
        label: 'Progress Reassessments',
        title: 'Ongoing check-ins that keep you on track.',
        description: 'Regular reassessments ensure your nutrition plan stays aligned with your changing body and goals.',
      },
    ],
  },
  mindset: {
    icon: Heart,
    title: 'Mindset',
    description: 'Change the way you think, not just what you do. Mindset coaching bridges the gap between intention and action.',
    features: [
      {
        label: 'Stage-Based Coaching',
        title: 'Coaching based on your stage of change.',
        description: 'Whether you\'re contemplating change or maintaining habits, coaching adapts to where you are in your journey.',
      },
      {
        label: 'Bite-Sized Sessions',
        title: 'Just 5 minutes a day.',
        description: 'Short, focused coaching sessions that fit into any schedule — no hour-long commitments required.',
      },
      {
        label: 'Engaging Content',
        title: 'Learning that you actually enjoy.',
        description: 'Interactive and enjoyable content designed to keep you engaged while building lasting psychological skills.',
      },
      {
        label: 'Journaling Tools',
        title: 'Reflect, process, and grow.',
        description: 'Built-in journaling prompts help you track your mindset shifts and build self-awareness over time.',
      },
      {
        label: 'Practical Techniques',
        title: 'Real tools for real life.',
        description: 'Evidence-based mindset techniques you can apply immediately to overcome barriers and build resilience.',
      },
    ],
  },
};

const CorePillars = () => {
  const [activePillar, setActivePillar] = useState<PillarKey | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showFloating, setShowFloating] = useState(false);

  const currentPillar = activePillar ? pillars[activePillar] : null;

  useEffect(() => {
    if (!activePillar || !contentRef.current) {
      setShowFloating(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloating(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    );

    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [activePillar]);

  const handleTabClick = (key: PillarKey) => {
    if (activePillar === key) {
      setActivePillar(null);
      setShowFloating(false);
    } else {
      setActivePillar(key);
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleFloatingTabSwitch = (key: PillarKey) => {
    setActivePillar(key);
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="goals" ref={sectionRef} className="section-padding bg-background scroll-mt-20">
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

        {/* Pillar Cards — click to expand */}
        <div className="flex justify-center gap-3 md:gap-6 mb-12">
          {(Object.keys(pillars) as PillarKey[]).map((key) => {
            const pillar = pillars[key];
            const isActive = activePillar === key;
            return (
              <button
                key={key}
                onClick={() => handleTabClick(key)}
                className={`flex flex-col items-center gap-2 px-6 py-4 md:px-10 md:py-5 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-wellness-lg ring-2 ring-primary ring-offset-2 ring-offset-background scale-105'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <pillar.icon className="w-6 h-6 md:w-8 md:h-8" />
                <span className="font-medium text-sm md:text-base">{pillar.title}</span>
              </button>
            );
          })}
        </div>

        {/* Floating Sticky Tabs — only when pillar active & scrolled past */}
        <div
          className={`fixed top-20 left-0 right-0 z-40 flex justify-center transition-all duration-300 pointer-events-none ${
            showFloating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="pointer-events-auto flex gap-2 md:gap-4 bg-background/80 backdrop-blur-lg rounded-full shadow-lg px-3 py-2 border border-border/50">
            {(Object.keys(pillars) as PillarKey[]).map((key) => {
              const pillar = pillars[key];
              const isActive = activePillar === key;
              return (
                <button
                  key={key}
                  onClick={() => handleFloatingTabSwitch(key)}
                  className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <pillar.icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium text-xs md:text-sm">{pillar.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pillar Content — shown only when selected */}
        <div ref={contentRef} className="scroll-mt-24">
          <AnimatePresence mode="wait">
            {currentPillar && activePillar && (
              <motion.div
                key={activePillar}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-16 max-w-3xl mx-auto">
                  <p className="text-muted-foreground text-lg">
                    {currentPillar.description}
                  </p>
                </div>

                <div className="space-y-20 md:space-y-28">
                  {currentPillar.features.map((feature, index) => {
                    const isReversed = index % 2 !== 0;
                    return (
                      <div
                        key={index}
                        className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-14 lg:gap-20`}
                      >
                        <motion.div
                          initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                          className="flex-1 text-center md:text-left"
                        >
                          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                            {feature.label}
                          </span>
                          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4 italic">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground text-lg max-w-md mx-auto md:mx-0">
                            {feature.description}
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.15 }}
                          className="flex-1 flex justify-center"
                        >
                          <img
                            src={featurePlaceholder}
                            alt={`${feature.label} app screen`}
                            className="max-w-[280px] md:max-w-[320px]"
                          />
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CorePillars;
