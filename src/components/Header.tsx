import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const goalItems = [
  { label: 'Losing Weight', href: '/goals/losing-weight' },
  { label: 'Getting Fit', href: '/goals/getting-fit' },
  { label: 'Finding Balance', href: '/goals/finding-balance' },
  { label: 'Getting Healthy', href: '/goals/getting-healthy' },
];

const navItems = [
  { label: 'Goals', href: '#goals', hasDropdown: true },
  { label: 'Features', href: '#features' },
  { label: 'For Business', href: '#business' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGoalsOpen, setIsGoalsOpen] = useState(false);
  const goalsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (goalsRef.current && !goalsRef.current.contains(e.target as Node)) {
        setIsGoalsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 shadow-wellness py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Home className="text-primary-foreground" size={20} />
          </div>
          <span className={`font-display font-bold text-xl ${isScrolled ? 'text-foreground' : 'text-background'}`}>
            UN1Q
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            if (item.hasDropdown) {
              return (
                <div key={item.label} ref={goalsRef} className="relative">
                  <button
                    onClick={() => setIsGoalsOpen(!isGoalsOpen)}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                      isScrolled ? 'text-foreground' : 'text-background/90 hover:text-background'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isGoalsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isGoalsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-background rounded-xl shadow-lg border border-border/50 py-2 z-50"
                      >
                        {goalItems.map((goal) => (
                          <Link
                            key={goal.label}
                            to={goal.href}
                            onClick={() => setIsGoalsOpen(false)}
                            className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                          >
                            {goal.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            if (item.href.startsWith('/')) {
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isScrolled ? 'text-foreground' : 'text-background/90 hover:text-background'
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isScrolled ? 'text-foreground' : 'text-background/90 hover:text-background'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Button variant="accent" size="lg">Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-foreground' : 'text-background'}`}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <nav className="container py-4 flex flex-col gap-2">
              {/* Goals with sub-items on mobile */}
              <div className="flex flex-col">
                <span className="py-3 px-4 text-foreground font-medium">Goals</span>
                {goalItems.map((goal) => (
                  <Link
                    key={goal.label}
                    to={goal.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2.5 px-8 text-muted-foreground font-medium hover:bg-muted rounded-lg transition-colors text-sm"
                  >
                    {goal.label}
                  </Link>
                ))}
              </div>
              {navItems.filter(i => !i.hasDropdown).map((item) =>
                item.href.startsWith('/') ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 px-4 text-foreground font-medium hover:bg-muted rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 px-4 text-foreground font-medium hover:bg-muted rounded-lg transition-colors"
                  >
                    {item.label}
                  </a>
                )
              )}
              <Button variant="accent" className="mt-4 w-full">Get Started</Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
