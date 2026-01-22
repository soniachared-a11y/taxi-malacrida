import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingPhoneButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        // Cacher le bouton seulement quand la section contact est visible dans le viewport
        // Le bouton est visible par défaut, et se cache quand on arrive à la section contact
        const isContactInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(!isContactInViewport);
      } else {
        // Si la section contact n'existe pas, afficher le bouton
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérifier au chargement initial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          href="tel:+33784628640"
          className="fixed bottom-6 right-2 z-40 w-11 h-11 md:w-14 md:h-14 bg-[#001F3F] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#003366] transition-colors duration-300 hover:scale-110"
          aria-label="Appeler Taxi Malacrida"
        >
          <Phone className="w-5 h-5 md:w-6 md:h-6" />
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default FloatingPhoneButton;
