// Page de confirmation de réservation — Taxi Malacrida
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, ArrowLeft } from 'lucide-react';

const ACCENT_BLUE = '#001F3F';

const Merci = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-zinc-900 pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none opacity-10"
        style={{ backgroundColor: ACCENT_BLUE }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 text-center max-w-lg mx-auto"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8 flex items-center justify-center"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ border: `1px solid ${ACCENT_BLUE}`, backgroundColor: `${ACCENT_BLUE}20` }}
          >
            <CheckCircle size={40} strokeWidth={1.2} style={{ color: '#4A9EBA' }} />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-3xl md:text-4xl text-white mb-4 tracking-tight"
        >
          Réservation confirmée
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/60 text-base md:text-lg mb-2 leading-relaxed font-light"
        >
          Merci pour votre confiance.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-white/60 text-base md:text-lg mb-10 leading-relaxed font-light"
        >
          Nous avons bien reçu votre demande et vous contacterons très rapidement pour confirmer votre course.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-16 h-px mx-auto mb-10"
          style={{ backgroundColor: `${ACCENT_BLUE}80` }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          <p className="text-white/40 text-xs mb-3 uppercase tracking-widest">Besoin urgent ?</p>
          <a
            href="tel:+33784628640"
            className="inline-flex items-center gap-3 text-xl font-light transition-colors duration-200"
            style={{ color: '#4A9EBA' }}
          >
            <Phone size={18} strokeWidth={1.5} />
            07 84 62 86 40
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-12"
        >
          <a href="/" className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors duration-200">
            <ArrowLeft size={16} />
            Retour à l'accueil
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Merci;
