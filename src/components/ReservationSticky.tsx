import { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ReservationSticky = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  
  const handleReserve = () => {
    // Scroll to top and focus on hero booking form
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Small delay to ensure scroll completes
    setTimeout(() => {
      const heroForm = document.querySelector('input[placeholder="Adresse de départ"]') as HTMLInputElement;
      if (heroForm) {
        heroForm.focus();
      }
    }, 500);
    setIsExpanded(false);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isExpanded ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleReserve}
            className="bg-[#001F3F] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 font-light tracking-wide"
          >
            <Calendar size={18} />
            Réserver une course
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default ReservationSticky;
