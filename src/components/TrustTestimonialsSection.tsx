import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, Plane, Briefcase, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const ACCENT_BLUE = '#001F3F';

const testimonials = [
  {
    content: 'J\'utilise Taxi Malacrida pour tous mes déplacements professionnels depuis 2 ans. Ponctualité irréprochable, véhicule impeccable, discrétion totale. C\'est exactement ce que j\'attends d\'un service premium. Je recommande sans réserve.',
    name: 'Sophie',
  },
  {
    content: 'Vol à 6h du matin, aucun stress. Prise en charge à l\'heure précise, trajet fluide, véhicule Tesla d\'un confort exceptionnel. J\'ai même pu travailler grâce au WiFi gratuit. Service que je n\'ai trouvé nulle part ailleurs.',
    name: 'Marc',
  },
  {
    content: 'Réservé pour le mariage de ma fille. Véhicule impeccable, chauffeur en costume, service aux petits soins. Les photos avec la Tesla sont magnifiques. C\'est le petit détail qui a fait toute la différence. Merci pour votre professionnalisme.',
    name: 'Julie',
  },
  {
    content: 'Service exceptionnel pour mes déplacements professionnels. Discrétion absolue, ponctualité parfaite, et un confort inégalé. La Tesla est un vrai plus. Je recommande vivement pour tous les professionnels exigeants.',
    name: 'Thomas',
  },
  {
    content: 'Transfert aéroport impeccable. Chauffeur professionnel, véhicule luxueux, trajet optimisé. J\'ai particulièrement apprécié la flexibilité et la réactivité. Un service premium qui mérite ses 5 étoiles.',
    name: 'Marie',
  },
  {
    content: 'Utilisé pour plusieurs événements d\'entreprise. Service irréprochable à chaque fois. Le chauffeur connaît parfaitement la région et évite toujours les embouteillages. Un partenaire de confiance.',
    name: 'Pierre',
  },
  {
    content: 'Première expérience avec Taxi Malacrida et je suis conquis. Véhicule Tesla magnifique, service aux petits soins, ponctualité parfaite. Je reviendrai sans hésitation pour mes prochains déplacements.',
    name: 'Claire',
  },
  {
    content: 'Service de qualité supérieure. Chauffeur très professionnel, véhicule impeccable, et surtout une discrétion totale appréciée pour mes rendez-vous professionnels. Je recommande sans réserve.',
    name: 'Antoine',
  },
  {
    content: 'Transfert depuis la gare TGV parfaitement organisé. Chauffeur à l\'heure, véhicule confortable, et un service personnalisé qui fait toute la différence. Merci pour cette expérience premium.',
    name: 'Isabelle',
  },
  {
    content: 'Utilisé pour plusieurs occasions : mariage, événements professionnels, transferts aéroport. À chaque fois, un service irréprochable. La ponctualité et la discrétion sont au rendez-vous. Excellent rapport qualité-prix.',
    name: 'Laurent',
  },
];

// Composant pour l'animation du compteur
const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  // Threshold réduit à 0.1 pour déclencher plus tôt sur mobile
  const isInView = useInView(ref, { once: true, margin: '-100px', threshold: 0.1 });

  useEffect(() => {
    // Fallback de sécurité : si après 3 secondes l'animation n'a pas démarré, afficher la valeur finale
    const fallbackTimeout = setTimeout(() => {
      if (!hasAnimated && count === 0 && ref.current) {
        setCount(value);
        setHasAnimated(true);
      }
    }, 3000);

    // Animation normale si l'élément est en vue
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      let startTime: number;
      let animationFrameId: number;
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * value));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
      
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        clearTimeout(fallbackTimeout);
      };
    }

    return () => {
      clearTimeout(fallbackTimeout);
    };
  }, [isInView, value, duration, hasAnimated, count]);

  return <span ref={ref}>{count.toLocaleString()}+</span>;
};

const TrustTestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play des témoignages toutes les 4 secondes
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      id="trust-testimonials" 
      className="min-h-screen flex items-start md:items-center bg-white py-12 md:py-16 lg:py-20"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full flex flex-col pt-8 md:pt-12 pb-8 md:pb-12">
        
        {/* 1. SECTION 5000+ AVEC ICÔNES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-8 md:mb-12"
        >
          {/* Chiffre 5000+ avec animation */}
          <div className="mb-4 md:mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[#1a1a1a] mb-2"
            >
              <AnimatedCounter value={5000} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-xs md:text-sm font-light tracking-[0.2em] uppercase text-black/60"
            >
              TRAJETS RÉALISÉS
            </motion.p>
          </div>

          {/* Icônes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center items-center gap-6 md:gap-8"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: ACCENT_BLUE }}>
                <Plane className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: ACCENT_BLUE }}>
                <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: ACCENT_BLUE }}>
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 2. TITRE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-4xl mx-auto mb-6 md:mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#1a1a1a] leading-tight">
            Plus qu'un Taxi, Votre Partenaire de <span style={{ color: ACCENT_BLUE }}>Confiance</span>
          </h2>
        </motion.div>

        {/* 3. PARAGRAPHE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-4xl mx-auto mb-8 md:mb-10"
        >
          <p className="text-xs md:text-sm font-light text-black/70 leading-relaxed">
            Choisir un chauffeur, c'est faire <span style={{ color: ACCENT_BLUE }}>confiance</span>. Confiance en sa ponctualité pour ne jamais rater un vol. Confiance en sa discrétion lors d'appels professionnels sensibles. Confiance en son expertise pour éviter les retards. Depuis 2020, professionnels exigeants, familles et particuliers nous confient leurs déplacements les plus importants. Cette confiance, nous la gagnons chaque jour par notre rigueur, notre professionnalisme et notre engagement sans faille à votre satisfaction.
          </p>
        </motion.div>

        {/* 4. SLIDER AVIS AVEC AUTO-PLAY ET NAVIGATION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl mx-auto relative mb-8 md:mb-10"
        >
          <div className="relative bg-white rounded-lg p-6 md:p-8 min-h-[200px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.article
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center w-full"
              >
                {/* Étoiles */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                {/* Citation */}
                <blockquote className="text-sm md:text-base lg:text-lg font-serif text-[#1a1a1a] leading-relaxed italic mb-4 px-4">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                {/* Prénom */}
                <div className="text-xs md:text-sm font-light text-black/60">
                  - {testimonials[currentTestimonial].name}
                </div>
              </motion.article>
            </AnimatePresence>

            {/* Flèches de navigation */}
            <button
              onClick={prevTestimonial}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-black/10 hover:bg-[#001F3F] hover:text-white transition-all duration-300 flex items-center justify-center shadow-md z-10 group"
              aria-label="Avis précédent"
              style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ACCENT_BLUE;
                e.currentTarget.style.backgroundColor = ACCENT_BLUE;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:text-white" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-black/10 hover:bg-[#001F3F] hover:text-white transition-all duration-300 flex items-center justify-center shadow-md z-10 group"
              aria-label="Avis suivant"
              style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ACCENT_BLUE;
                e.currentTarget.style.backgroundColor = ACCENT_BLUE;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:text-white" />
            </button>
          </div>

          {/* Indicateurs de pagination */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentTestimonial(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'w-8'
                    : 'w-2 bg-black/20 hover:bg-black/40'
                }`}
                style={{
                  backgroundColor: index === currentTestimonial ? ACCENT_BLUE : undefined,
                }}
                aria-label={`Aller à l'avis ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* 5. SÉPARATEUR FIN DE SECTION */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex justify-center mt-auto pt-6 md:pt-8"
        >
          <div className="w-full max-w-[200px] h-px bg-[#E5E7EB]" />
        </motion.div>
      </div>
    </section>
  );
};

export default TrustTestimonialsSection;
