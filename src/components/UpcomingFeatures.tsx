import { motion } from 'framer-motion';
import { Eye, Watch, Utensils, Zap } from 'lucide-react';

const upcomingFeatures = [
  {
    icon: Eye,
    title: 'Computer vision',
    description: 'Advanced AI-powered form analysis and movement tracking.',
  },
  {
    icon: Watch,
    title: 'Smartwatch integration',
    description: 'Seamless sync with your favorite wearable devices.',
  },
  {
    icon: Utensils,
    title: 'Smarter nutrition programs',
    description: 'Advanced portion control and meal planning.',
  },
  {
    icon: Zap,
    title: 'Advanced exercise features',
    description: 'Plateau-breaking techniques for continued progress.',
  },
];

const UpcomingFeatures = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Coming Soon</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Upcoming Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            UN1Q is actively evolving. New features are currently in development and will be released progressively in upcoming updates throughout the year.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-card hover-lift text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingFeatures;
