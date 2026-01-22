import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ShieldCheck, Users, MapPin, HeartHandshake } from 'lucide-react';

const steps = [
  {
    number: '1',
    title: 'Demande de course',
    description: 'Réservez par téléphone au 07 84 62 86 40 ou via notre formulaire. Réponse très rapide garantie.',
  },
  {
    number: '2',
    title: 'Confirmation & Tarif',
    description: 'Nous validons votre créneau instantanément et fixons le prix à l\'avance. Aucune surprise.',
  },
  {
    number: '3',
    title: 'Prise en charge',
    description: 'Votre chauffeur vous attend à l\'heure dite. Installez-vous et profitez du confort.',
  },
  {
    number: '4',
    title: 'Paiement & Arrivée',
    description: 'Voyage serein et règlement facile à bord : espèces ou Carte Bancaire.',
  }
];

const ACCENT_BLUE = '#001F3F';

const values = [
  {
    icon: ShieldCheck,
    title: 'Sécurité & Conformité',
    description: 'Taxi Malacrida est titulaire d\'une licence professionnelle officielle et dispose de toutes les assurances requises. Nos véhicules subissent un contrôle technique renforcé régulier. Votre sécurité n\'est jamais négociée.',
  },
  {
    icon: Users,
    title: 'Discrétion Absolue',
    description: 'Professionnels de haut niveau, personnalités ou particuliers exigeants : nous comprenons l\'importance de la confidentialité. Conversations respectées, données protégées, service irréprochable sans intrusion.',
  },
  {
    icon: MapPin,
    title: 'Expertise Locale',
    description: '5 ans d\'expérience sur la Côte d\'Azur. Connaissance approfondie de chaque route, chaque raccourci et chaque zone de la région. Évitez les embouteillages, anticipez les heures de pointe, optimisez vos trajets.',
  },
  {
    icon: HeartHandshake,
    title: 'Service Sur-Mesure',
    description: 'Siège enfant, facture entreprise, arrêt imprévu, recommandations locales : nous nous adaptons. Votre satisfaction guide chaque décision. Service premium personnalisé à chaque trajet.',
  },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mobileTimelineRef = useRef<HTMLDivElement>(null);
  const desktopTimelineRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  
  // IntersectionObserver for strict visibility detection with replay
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Section enters viewport - trigger animation
            setIsInView(true);
            setAnimationKey(prev => prev + 1);
          } else {
            // Section leaves viewport - reset animation
            setIsInView(false);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  
  // Scroll progress for mobile timeline
  const { scrollYProgress: mobileScrollProgress } = useScroll({
    target: mobileTimelineRef,
    offset: ["start 80%", "end 40%"]
  });
  
  // Scroll progress for desktop/tablet timeline
  const { scrollYProgress: desktopScrollProgress } = useScroll({
    target: desktopTimelineRef,
    offset: ["start 80%", "end 40%"]
  });
  
  const lineHeight = useTransform(mobileScrollProgress, [0, 1], ["0%", "100%"]);
  const desktopPathLength = useTransform(desktopScrollProgress, [0, 1], [0, 1]);
  const desktopOpacity = useTransform(desktopScrollProgress, [0, 0.2, 1], [0, 0, 0.4]);

  return (
    <section 
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-20 bg-white overflow-hidden"
      aria-labelledby="process-title"
    >
      <div className="container mx-auto px-6 max-w-[1200px] flex flex-col">
        {/* Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 
            id="process-title"
            className="font-serif text-2xl md:text-3xl lg:text-4xl font-light tracking-wide leading-tight text-[#1a1a1a] mb-5 md:mb-6"
          >
            Votre <span style={{ color: ACCENT_BLUE }}>Trajet</span> en 4 Étapes Simples
          </h2>
          <p className="font-sans text-sm md:text-base text-black/70 font-light max-w-2xl mx-auto mb-3 md:mb-4">
            Une organisation millimétrée pour supprimer tout stress. De la réservation à l'arrivée, tout est clair et transparent.
          </p>
          <p className="font-sans text-xs md:text-sm text-black/60 font-light max-w-2xl mx-auto">
            Nous avons simplifié chaque étape de votre expérience pour vous offrir un service fluide et sans surprise. 
            Réservez en quelques clics, recevez une confirmation immédiate avec le tarif exact, 
            et profitez d'un suivi en temps réel jusqu'à votre destination. Notre objectif : vous faire gagner du temps et de la sérénité.
          </p>
        </motion.div>

        {/* Desktop Zig-Zag Layout */}
        <div ref={desktopTimelineRef} className="hidden lg:block relative">
          {/* Animated SVG Roadmap */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 500"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <motion.path
              key={`path-${animationKey}`}
              d="M200 80 
                 C350 80, 350 80, 500 80
                 C650 80, 650 80, 800 80
                 C920 80, 920 180, 800 180
                 C650 180, 650 180, 500 180
                 C350 180, 350 180, 200 180
                 C80 180, 80 280, 200 280
                 C350 280, 350 280, 500 280
                 C650 280, 650 280, 800 280
                 C920 280, 920 380, 800 380
                 C650 380, 650 380, 500 380
                 C350 380, 350 380, 200 380"
              stroke={ACCENT_BLUE}
              strokeWidth="5"
              strokeDasharray="14 10"
              strokeLinecap="round"
              fill="none"
              style={{
                pathLength: desktopPathLength,
                opacity: desktopOpacity
              }}
            />
          </svg>

          {/* Grid Layout - 2 Rows x 2 Columns */}
          <div className="relative grid grid-cols-2 gap-x-12 gap-y-10">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1.0, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`relative ${isLeft ? 'justify-self-end' : 'justify-self-start'}`}
                >
                  {/* Card */}
                  <div 
                    className="bg-white border border-[#e5e5e5] rounded-xl p-6 max-w-[380px] min-h-[220px] flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
                    style={{
                      boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
                    }}
                  >
                    {/* Number Circle */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.3 + index * 0.15,
                        type: "spring",
                        stiffness: 150,
                        damping: 15
                      }}
                      className="w-16 h-16 rounded-full bg-white border-3 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                      style={{
                        borderColor: ACCENT_BLUE,
                        borderWidth: '3px',
                        boxShadow: '0 8px 30px rgba(14,77,100,0.2)'
                      }}
                    >
                      <span 
                        className="font-serif text-3xl font-light"
                        style={{ color: ACCENT_BLUE }}
                      >
                        {step.number}
                      </span>
                    </motion.div>

                    {/* Content */}
                    <h3 className="font-serif text-xl font-medium mb-3 text-center tracking-[0.02em]" style={{ color: ACCENT_BLUE }}>
                      {step.title}
                    </h3>
                    <p className="text-sm font-light text-[#4a4a4a] leading-relaxed text-center">
                      {step.description.includes('07 84 62 86 40') ? (
                        <>
                          {step.description.split('07 84 62 86 40')[0]}
                          <span style={{ color: ACCENT_BLUE }}>07 84 62 86 40</span>
                          {step.description.split('07 84 62 86 40')[1]}
                        </>
                      ) : (
                        step.description
                      )}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:block lg:hidden relative">
          <div className="grid grid-cols-2 gap-6 gap-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.0, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div 
                  className="bg-white border border-[#e5e5e5] rounded-xl p-6 h-full min-h-[200px] flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                  }}
                >
                  {/* Number Circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                    className="w-16 h-16 rounded-full bg-white border-2 flex items-center justify-center mb-4"
                    style={{
                      borderColor: ACCENT_BLUE,
                      boxShadow: '0 6px 20px rgba(14,77,100,0.15)'
                    }}
                  >
                    <span 
                      className="font-serif text-3xl font-light"
                      style={{ color: ACCENT_BLUE }}
                    >
                      {step.number}
                    </span>
                  </motion.div>

                  <h3 className="font-serif text-lg font-medium mb-2 text-center" style={{ color: ACCENT_BLUE }}>
                    {step.title}
                  </h3>
                  <p className="text-sm font-light text-[#4a4a4a] leading-relaxed text-center">
                    {step.description.includes('07 84 62 86 40') ? (
                      <>
                        {step.description.split('07 84 62 86 40')[0]}
                        <span style={{ color: ACCENT_BLUE }}>07 84 62 86 40</span>
                        {step.description.split('07 84 62 86 40')[1]}
                      </>
                    ) : (
                      step.description
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Layout - Vertical with Animated Progress Line */}
        <div ref={mobileTimelineRef} className="md:hidden relative">
          {/* Vertical Dashed Line (Background) */}
          <div 
            className="absolute left-[26px] top-2 bottom-2 w-0.5"
            style={{ 
              backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 4px, #d1d5db 4px, #d1d5db 10px)`,
            }}
          />
          
          {/* Animated Solid Blue Line (Progress) */}
          <motion.div 
            className="absolute left-[26px] top-2 w-0.5 origin-top"
            style={{ 
              height: lineHeight,
              backgroundColor: ACCENT_BLUE,
            }}
          />

          <div className="space-y-2 pl-14">
            {steps.map((step, index) => {
              const stepProgress = (index + 1) / steps.length;
              
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1.0, delay: 0.2 + index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative"
                >
                  {/* Number Circle with scroll-activated state */}
                  <motion.div
                    className="absolute -left-[52px] top-2 w-9 h-9 rounded-full bg-white border-2 flex items-center justify-center transition-all duration-300"
                    style={{
                      borderColor: ACCENT_BLUE,
                      boxShadow: '0 3px 12px rgba(14,77,100,0.15)'
                    }}
                  >
                    <span 
                      className="font-serif text-base font-light"
                      style={{ color: ACCENT_BLUE }}
                    >
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Card - Compact */}
                  <div 
                    className="bg-white border border-[#e5e5e5] rounded-lg px-3 py-2.5"
                    style={{
                      boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
                    }}
                  >
                    <h3 className="font-serif text-[14px] font-normal mb-1" style={{ color: ACCENT_BLUE }}>
                      {step.title}
                    </h3>
                    <p className="text-[11px] font-light text-[#4a4a4a] leading-relaxed">
                      {step.description.includes('07 84 62 86 40') ? (
                        <>
                          {step.description.split('07 84 62 86 40')[0]}
                          <span style={{ color: ACCENT_BLUE }}>07 84 62 86 40</span>
                          {step.description.split('07 84 62 86 40')[1]}
                        </>
                      ) : (
                        step.description
                      )}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* BANDE DÉFILANTE POUR LES CARTES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative overflow-hidden py-4 md:py-5 lg:py-6 mt-10 md:mt-12 lg:mt-14"
        >
          <div className="flex gap-3 md:gap-5 lg:gap-6 animate-scroll">
            {/* Dupliquer les cartes pour l'effet de boucle infinie */}
            {[...values, ...values, ...values].map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={`${value.title}-${index}`}
                  className="flex-shrink-0 w-[260px] md:w-[300px] lg:w-[320px] bg-white border border-[#e5e5e5] rounded-lg p-4 md:p-5 lg:p-6 hover:shadow-lg transition-all duration-300"
                  style={{
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
                  }}
                >
                  <div className="flex items-start gap-2 md:gap-3 mb-2 md:mb-3">
                    <div className="w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: ACCENT_BLUE }}>
                      <IconComponent 
                        className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" 
                        strokeWidth={1.5} 
                      />
                    </div>
                    <h3 className="font-serif text-sm md:text-base lg:text-lg font-medium text-[#1a1a1a]">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-[11px] md:text-xs lg:text-sm font-light text-black/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex justify-center mt-10 md:mt-12 lg:mt-14 mb-0"
        >
          <a
            href="#contact"
            className="inline-block text-white font-serif text-[13px] md:text-[14px] font-light tracking-[0.1em] uppercase px-8 py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              backgroundColor: '#000000',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = ACCENT_BLUE;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
            }}
          >
            Réserver mon chauffeur
          </a>
        </motion.div>
      </div>

      {/* Styles CSS pour l'animation de la bande défilante */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-260px * 4 - 0.75rem * 4));
          }
        }
        @media (min-width: 768px) {
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-300px * 4 - 1.25rem * 4));
            }
          }
        }
        @media (min-width: 1024px) {
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-320px * 4 - 1.5rem * 4));
            }
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          will-change: transform;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default ProcessSection;
