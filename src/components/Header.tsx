import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, ChevronDown, Dumbbell, Apple, Heart, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const goalItems = [
  { label: 'Losing Weight', href: '/goals/losing-weight' },
  { label: 'Getting Fit', href: '/goals/getting-fit' },
  { label: 'Finding Balance', href: '/goals/finding-balance' },
  { label: 'Getting Healthy', href: '/goals/getting-healthy' },
];

const featureItems = [
  { label: 'Exercise', icon: Dumbbell, pillar: 'exercise' },
  { label: 'Nutrition', icon: Apple, pillar: 'nutrition' },
  { label: 'Mindset', icon: Heart, pillar: 'mindset' },
];

type DropdownKey = 'goals' | 'features';

const navItems = [
  { label: 'Goals', href: '#goals', dropdown: 'goals' as DropdownKey },
  { label: 'Features', href: '#features', dropdown: 'features' as DropdownKey },
  { label: 'For Business', href: '#business' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToFeatures = (pillar: string) => {
    setOpenDropdown(null);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'features', pillar } });
    } else {
      const el = document.getElementById('features');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Dispatch a custom event so CorePillars can pick up the pillar switch
      window.dispatchEvent(new CustomEvent('switch-pillar', { detail: pillar }));
    }
  };

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown(prev => prev === key ? null : key);
  };

  const renderDropdownContent = (key: DropdownKey) => {
    if (key === 'goals') {
      return goalItems.map((goal) => (
        <Link
          key={goal.label}
          to={goal.href}
          onClick={() => setOpenDropdown(null)}
          className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
        >
          {goal.label}
        </Link>
      ));
    }
    if (key === 'features') {
      return featureItems.map((feat) => (
        <button
          key={feat.label}
          onClick={() => scrollToFeatures(feat.pillar)}
          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
        >
          <feat.icon className="w-4 h-4 text-primary" />
          {feat.label}
        </button>
      ));
    }
    return null;
  };

  const renderMobileDropdownContent = (key: DropdownKey) => {
    if (key === 'goals') {
      return goalItems.map((goal) => (
        <Link
          key={goal.label}
          to={goal.href}
          onClick={() => setIsMobileMenuOpen(false)}
          className="py-2.5 px-8 text-muted-foreground font-medium hover:bg-muted rounded-lg transition-colors text-sm"
        >
          {goal.label}
        </Link>
      ));
    }
    if (key === 'features') {
      return featureItems.map((feat) => (
        <button
          key={feat.label}
          onClick={() => { setIsMobileMenuOpen(false); scrollToFeatures(feat.pillar); }}
          className="flex items-center gap-3 py-2.5 px-8 text-muted-foreground font-medium hover:bg-muted rounded-lg transition-colors text-sm w-full text-left"
        >
          <feat.icon className="w-4 h-4 text-primary" />
          {feat.label}
        </button>
      ));
    }
    return null;
  };

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
        <nav className="hidden lg:flex items-center gap-8" ref={dropdownRef}>
          {navItems.map((item) => {
            if (item.dropdown) {
              const isOpen = openDropdown === item.dropdown;
              return (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => toggleDropdown(item.dropdown!)}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                      isScrolled ? 'text-foreground' : 'text-background/90 hover:text-background'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-background rounded-xl shadow-lg border border-border/50 py-2 z-50"
                      >
                        {renderDropdownContent(item.dropdown)}
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

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/dashboard">
            <Button variant="outline" size="lg">Dashboard</Button>
          </Link>
          <Button variant="accent" size="lg">Get Started</Button>
          <Link to="/account" aria-label="Account settings">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-11 w-11"
            >
              <User size={18} />
            </Button>
          </Link>
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
              {navItems.map((item) => {
                if (item.dropdown) {
                  return (
                    <div key={item.label} className="flex flex-col">
                      <span className="py-3 px-4 text-foreground font-medium">{item.label}</span>
                      {renderMobileDropdownContent(item.dropdown)}
                    </div>
                  );
                }
                if (item.href.startsWith('/')) {
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-3 px-4 text-foreground font-medium hover:bg-muted rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 px-4 text-foreground font-medium hover:bg-muted rounded-lg transition-colors"
                  >
                    {item.label}
                  </a>
                );
              })}
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="mt-2 w-full">Dashboard</Button>
              </Link>
              <Button variant="accent" className="mt-2 w-full">Get Started</Button>
              <Button
                variant="outline"
                className="mt-2 w-full"
                onClick={() => { setIsMobileMenuOpen(false); setProfileOpen(true); }}
              >
                <User size={16} /> Profile
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
    </header>
  );
};

export default Header;
