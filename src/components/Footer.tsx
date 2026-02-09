import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-foreground text-background section-padding">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Mission */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">U</span>
              </div>
              <span className="font-display font-bold text-xl">UN1Q</span>
            </div>
            <p className="text-background/70 text-sm mb-6">
              Physician-founded, science-backed health and wellness — individualised for you.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">About</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">Press</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">Blog</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-display font-semibold mb-4">Features</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">Exercise</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">Nutrition</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">Mindset</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">For Business</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">Cookie Policy</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">GDPR</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 text-center">
          <p className="text-background/50 text-sm">
            © {currentYear} UN1Q. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
