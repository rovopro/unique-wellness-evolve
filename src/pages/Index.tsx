import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CorePillars from '@/components/CorePillars';
import UpcomingFeatures from '@/components/UpcomingFeatures';
import Testimonials from '@/components/Testimonials';
import Download from '@/components/Download';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <CorePillars />
        <UpcomingFeatures />
        <Testimonials />
        <Download />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
