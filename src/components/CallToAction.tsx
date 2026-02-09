import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 italic">
            Ready to become UN1Q?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands building healthier habits with a system designed by physicians and powered by science. Your personalised journey starts today.
          </p>
          <Button variant="accent" size="xl">
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
