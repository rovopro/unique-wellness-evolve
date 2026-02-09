import { motion } from 'framer-motion';
import featurePlaceholder from '@/assets/feature-placeholder.png';

const features = [
  {
    label: 'Science-Led Training',
    title: 'Take the guesswork out of exercise.',
    description: 'Designed by physicians and behavioural scientists, UN1Q adapts your training using over 70 data points — so every session is built for your body, not a template.',
  },
  {
    label: 'Smart Nutrition',
    title: 'Fuel your body with precision.',
    description: 'Personalised nutrition plans that adapt to your goals, preferences, and lifestyle. AI-powered portion guidance and macro tracking without the overwhelm.',
  },
  {
    label: 'Mindset Coaching',
    title: 'Build habits that actually stick.',
    description: 'Behaviour-change focused coaching built to support sustainable habits rather than short-term motivation. Real psychology, not generic tips.',
  },
  {
    label: 'Progress Tracking',
    title: 'See your transformation unfold.',
    description: 'AI-powered body composition estimates, visual goal setting, and a unified dashboard to track progress across all health domains in one place.',
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
            UN1Q brings together exercise, nutrition, and mindset into one adaptive system that evolves with your body, behaviour, and goals.
          </p>
        </motion.div>

        {/* Feature Rows */}
        <div className="space-y-20 md:space-y-28">
          {features.map((feature, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={index}
                className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-14 lg:gap-20`}
              >
                {/* Text */}
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

                {/* Phone Mockup */}
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
      </div>
    </section>
  );
};

export default Features;
