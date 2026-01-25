import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import logoTaxiMalacrida from '@/assets/logo-taxi-malacrida.png';

const Footer = () => {
  const year = new Date().getFullYear();

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Notre Flotte', href: '#fleet' },
    { name: 'Témoignages', href: '#testimonials' },
    { name: 'Tarifs', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-black text-white/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-12">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12">
          
          {/* Logo */}
          <div className="flex-shrink-0 text-center lg:text-left">
            <a href="#hero" className="inline-block">
              <img 
                src={logoTaxiMalacrida} 
                alt="Taxi Malacrida" 
                width={120}
                height={112}
                className="h-24 md:h-28 w-auto object-contain mx-auto lg:mx-0"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>

          {/* Links & Contact - Compact Grid */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 text-center md:text-left">
            
            {/* Navigation Links - Horizontal on desktop */}
            <div>
              <h4 className="text-white font-serif text-base mb-3">Navigation</h4>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-light text-white/70 hover:text-[#001F3F] transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                ))}
                <Link 
                  to="/mentions-legales" 
                  className="text-sm font-light text-white/70 hover:text-[#001F3F] transition-colors duration-300"
                >
                  Mentions Légales
                </Link>
              </div>
            </div>

            {/* Contact - Compact */}
            <div>
              <h4 className="text-white font-serif text-base mb-3">Contact</h4>
              <div className="space-y-2">
                <a 
                  href="tel:0784628640" 
                  className="flex items-center justify-center md:justify-start gap-2 text-sm font-light text-white/70 hover:text-[#001F3F] transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 text-white/50" />
                  07 84 62 86 40
                </a>
              </div>
            </div>

            {/* Address & Hours - Compact */}
            <div>
              <h4 className="text-white font-serif text-base mb-3">Adresse</h4>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-light text-white/70 mb-2">
                <MapPin className="w-4 h-4 text-white/50 flex-shrink-0" />
                <span>Aix-en-Provence</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-light text-white/70">
                <Clock className="w-4 h-4 text-white/50" />
                <span>24h/24, 7j/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-center md:justify-between items-center gap-2 text-center">
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
            <p className="text-xs font-light text-white/50">
              © {year} Taxi Malacrida Aix-en-Provence. Tous droits réservés.
            </p>
            <span className="hidden md:inline text-white/30">•</span>
            <a 
              href="https://pertinentia.fr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-light text-white/40 hover:text-white/60 transition-colors duration-300 no-underline"
            >
              Créé par : Pertinentia
            </a>
          </div>
          <p className="text-xs font-light text-white/50">
            SIRET : 884 511 346 00022 • APE : 4932Z
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
