import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const navItems = [
  { label: 'Products', href: '#cacao' },
  { label: 'Origin', href: '#origin' },
  { label: 'Traceability', href: '#traceability' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    scrollToSection('#contact');
  };

  return (
    <>
      {/* Fixed Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled 
            ? 'bg-off-white/90 backdrop-blur-md shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
            className="flex items-center gap-2"
          >
            <img 
  src="/logo.png" 
  alt="Five-Star Imports" 
  className="h-12 md:h-16 w-auto"
/>
            <span className={`font-heading font-semibold text-sm hidden sm:block transition-colors ${
              isScrolled ? 'text-navy' : 'text-navy'
            }`}>
              Five-Star Imports
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                className={`text-sm font-medium transition-colors hover:text-gold ${
                  isScrolled ? 'text-navy/80' : 'text-navy/80'
                }`}
              >
                {item.label}
              </a>
            ))}
            <button 
              onClick={scrollToContact}
              className="bg-gold hover:bg-gold/90 text-navy px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
            >
              Request a quote
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-navy' : 'text-navy'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-navy md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                className="text-white text-2xl font-heading font-bold hover:text-gold transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button 
              onClick={scrollToContact}
              className="mt-4 bg-gold hover:bg-gold/90 text-navy px-8 py-3 rounded-full font-medium flex items-center gap-2"
            >
              Request a quote
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
