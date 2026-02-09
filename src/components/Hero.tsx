import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';

const heroImages = [hero1, hero2, hero3];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[currentImage]}
            alt="Wellness lifestyle"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-none border border-primary/30 mb-6">
            <span className="text-primary-foreground text-sm font-medium">
              Physician-founded • Science-backed
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight">
            Individualised health.
            <br />
            Built on science.
          </h1>

          {/* Subheadline */}
          <p className="text-background/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            UN1Q is a physician-founded, science-backed health and wellness app combining medical expertise and lifestyle medicine across exercise, nutrition, coaching, sleep, and mobility.
          </p>

          {/* CTA */}
          <Button variant="accent" size="xl" className="text-lg">
            Start Free Trial
          </Button>
        </motion.div>

        {/* Carousel Indicators */}
        <div className="mt-10 flex justify-center gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImage
                  ? 'w-8 bg-primary'
                  : 'bg-background/50 hover:bg-background/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
