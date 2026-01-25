import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';
import logoTaxiMalacrida from '@/assets/logo-taxi-malacrida.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services-carousel' },
    { name: 'Flotte', href: '#fleet' },
    { name: 'Témoignages', href: '#trust-testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-charcoal shadow-lg py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <a href="#hero" className="relative z-10">
            <img 
              src={logoTaxiMalacrida} 
              alt="Taxi Malacrida" 
              width={120}
              height={56}
              className="h-12 md:h-14 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-light tracking-wide transition-colors link-underline py-1 ${
                  isScrolled ? 'text-white/80 hover:text-white' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <a 
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                // Ouvrir la première question (tarifs) immédiatement
                const event = new CustomEvent('openFaqQuestion', { detail: 0 });
                window.dispatchEvent(event);
                // Scroll vers la question tarifs avec centrage après un court délai
                setTimeout(() => {
                  const pricingQuestion = document.querySelector('[data-faq-question="0"]');
                  if (pricingQuestion) {
                    pricingQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  } else {
                    // Fallback vers la section FAQ si l'élément n'est pas trouvé
                    const faqSection = document.getElementById('faq');
                    if (faqSection) {
                      faqSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }
                }, 100);
              }}
              className="px-5 py-2 border border-white/50 text-white font-serif font-light text-sm tracking-[0.12em] uppercase rounded-full bg-transparent hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              Estimer mon tarif
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 relative z-10 ${isScrolled ? 'text-white' : 'text-white'}`}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-charcoal/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-cream shadow-2xl p-8 pt-24"
            >
              <ul className="space-y-6">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl font-serif text-charcoal hover:text-navy transition-colors"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 pt-8 border-t border-stone"
              >
                <a 
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    // Ouvrir la première question (tarifs) immédiatement
                    const event = new CustomEvent('openFaqQuestion', { detail: 0 });
                    window.dispatchEvent(event);
                    // Scroll vers la question tarifs avec centrage après un court délai
                    setTimeout(() => {
                      const pricingQuestion = document.querySelector('[data-faq-question="0"]');
                      if (pricingQuestion) {
                        pricingQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      } else {
                        // Fallback vers la section FAQ si l'élément n'est pas trouvé
                        const faqSection = document.getElementById('faq');
                        if (faqSection) {
                          faqSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }
                    }, 100);
                  }}
                  className="block w-full py-3 bg-[#001F3F] text-white text-center rounded-md hover:bg-[#003366] transition-all duration-300"
                >
                  Estimer mon tarif
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
