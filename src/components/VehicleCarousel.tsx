import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Users, Briefcase } from 'lucide-react';
import { vehicles } from '@/data/vehicles';

// CRITIQUE : enregistrer AVANT le composant
gsap.registerPlugin(ScrollTrigger);

export default function VehicleCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedTextIndex, setDisplayedTextIndex] = useState(0); // Index du texte affiché (peut différer pendant transition)
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false); // Ref pour éviter les problèmes de closure
  const currentIndexRef = useRef(0); // Ref pour avoir la valeur à jour

  // Utiliser displayedTextIndex pour l'affichage du texte, currentIndex pour la voiture
  const current = vehicles[currentIndex];
  const displayedVehicle = vehicles[displayedTextIndex];
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const animOffset = isMobile ? 400 : 800;

  // Synchroniser les refs avec les states
  useEffect(() => {
    isAnimatingRef.current = isAnimating;
    currentIndexRef.current = currentIndex;
  }, [isAnimating, currentIndex]);

  // Fonction transition - TRANSITION ASYNCHRONE : Voiture sort seule, texte reste, puis swap brutal
  const animateTransition = useCallback((direction: 'next' | 'prev') => {
    if (isAnimatingRef.current || !carRef.current || !textRef.current || !specsRef.current || !featuresRef.current) {
      return;
    }
    
    setIsAnimating(true);
    isAnimatingRef.current = true;

    // Utiliser la valeur à jour depuis le ref
    const currentIdx = currentIndexRef.current;
    const nextIndex = direction === 'next' 
      ? (currentIdx + 1) % vehicles.length
      : (currentIdx - 1 + vehicles.length) % vehicles.length;

    // S'ASSURER que le texte est visible au début (sécurité)
    gsap.set([textRef.current, specsRef.current, featuresRef.current], { opacity: 1, display: 'block', visibility: 'visible' });

    const tl = gsap.timeline({
      onComplete: () => {
        // FORCER l'affichage du texte à la fin (sécurité absolue)
        gsap.set([textRef.current, specsRef.current, featuresRef.current], { 
          opacity: 1, 
          display: 'block', 
          visibility: 'visible',
          zIndex: 10
        });
        setDisplayedTextIndex(nextIndex);
        setIsAnimating(false);
        isAnimatingRef.current = false;
      }
    });

    // ÉTAPE 1: Sortie de la voiture SEULE (texte reste visible et ne bouge pas)
    tl.to(carRef.current, {
      x: direction === 'next' ? animOffset : -animOffset,
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      ease: "power2.in"
    }, 0)

    // ÉTAPE 2: Changement de l'index pour la nouvelle voiture (texte actuel reste visible)
    .call(() => {
      setCurrentIndex(nextIndex);
      currentIndexRef.current = nextIndex;
    }, [], 0.3)

    // ÉTAPE 3: Entrée de la nouvelle voiture
    .fromTo(carRef.current,
      { x: direction === 'next' ? -animOffset : animOffset, opacity: 0, scale: 0.95 },
      { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    , 0.3)

    // ÉTAPE 4: Swap brutal du texte à 50% du mouvement (environ 0.8s-1s) - SNAPPY
    .call(() => {
      // Changer le texte pendant que la voiture est encore en mouvement (à ~50% de l'animation)
      setDisplayedTextIndex(nextIndex);
      // FORCER l'affichage immédiatement (pas de fade)
      gsap.set([textRef.current, specsRef.current, featuresRef.current], { 
        opacity: 1, 
        display: 'block', 
        visibility: 'visible',
        zIndex: 10
      });
    }, [], 0.9); // À 0.9s du début (0.3s sortie + 0.6s d'entrée = ~50% du mouvement total)
  }, [animOffset]);

  const handleNext = useCallback(() => {
    if (isAnimatingRef.current) return; // Vérifier avec ref
    
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    
    animateTransition('next');
  }, [animateTransition]);

  // ANIMATION INITIALE au scroll - CORRIGÉE pour fonctionner dans les deux sens
  useEffect(() => {
    if (!sectionRef.current || !carRef.current) return;

    // Vérifier si la section est déjà visible au chargement
    const checkIfVisible = () => {
      const rect = sectionRef.current!.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
      return isVisible;
    };

    // Si déjà visible, rendre la voiture visible immédiatement
    if (checkIfVisible() && !hasStarted) {
      gsap.set(carRef.current, { x: 0, opacity: 1, scale: 1 });
      gsap.set([textRef.current, specsRef.current, featuresRef.current], { opacity: 1 });
      setHasStarted(true);
      setDisplayedTextIndex(0); // Synchroniser avec l'index initial
      return;
    }

    // Sinon, état initial : voiture invisible à gauche, autres éléments VISIBLES
    gsap.set(carRef.current, { x: -animOffset, opacity: 0, scale: 0.95 });
    gsap.set([textRef.current, specsRef.current, featuresRef.current], { opacity: 1 });
    setDisplayedTextIndex(0); // Synchroniser avec l'index initial

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 15%",
        once: false, // Permet de se redéclencher si on scroll dans les deux sens
        toggleActions: "play none none reverse", // Play en entrant, reverse en sortant
        onEnter: () => {
          console.log("ScrollTrigger activé - Entrée !");
          if (!hasStarted) {
            setHasStarted(true);
          }
        },
        onEnterBack: () => {
          console.log("ScrollTrigger activé - Retour !");
          if (!hasStarted) {
            setHasStarted(true);
          }
        },
        markers: false
      }
    });

    // Seule la voiture bouge
    tl.to(carRef.current, {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 1.6,
      ease: "power3.out"
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars && st.vars.trigger === sectionRef.current) {
          st.kill();
        }
      });
    };
  }, [animOffset, hasStarted]);

  // Redémarrer auto-rotation après chaque transition
  useEffect(() => {
    if (!hasStarted || isAnimating) return;

    // Nettoyer l'ancien interval
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }

    // Redémarrer après un court délai
    const timeout = setTimeout(() => {
      if (!isAnimatingRef.current && hasStarted) {
        autoplayRef.current = setInterval(() => {
          if (!isAnimatingRef.current) {
            handleNext();
          }
        }, 4000);
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [isAnimating, hasStarted, handleNext]);

  // Auto-rotation initiale après le premier déclenchement
  useEffect(() => {
    if (!hasStarted) return;

    // Nettoyer l'ancien interval
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }

    // Démarrer l'auto-rotation après un délai
    const timeout = setTimeout(() => {
      if (!isAnimatingRef.current) {
        autoplayRef.current = setInterval(() => {
          if (!isAnimatingRef.current) {
            handleNext();
          }
        }, 4000);
      }
    }, 2000); // Attendre 2s après l'animation initiale

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      clearTimeout(timeout);
    };
  }, [hasStarted, handleNext]);


  const handlePrev = useCallback(() => {
    if (isAnimatingRef.current) return; // Vérifier avec ref
    
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    
    animateTransition('prev');
  }, [animateTransition]);

  const handleDotClick = useCallback((index: number) => {
    if (index === currentIndexRef.current || isAnimatingRef.current) return;
    
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    
    const currentIdx = currentIndexRef.current;
    const direction = index > currentIdx ? 'next' : 'prev';
    
    if (Math.abs(index - currentIdx) === 1) {
      if (direction === 'next') {
        handleNext();
      } else {
        handlePrev();
      }
    } else {
      // Pour un saut direct, on peut simplement changer l'index
      setCurrentIndex(index);
      currentIndexRef.current = index;
    }
  }, [handleNext, handlePrev]);

  // Pause au hover
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseEnter = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };

    const handleMouseLeave = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      setTimeout(() => {
        if (!isAnimatingRef.current && hasStarted) {
          autoplayRef.current = setInterval(() => {
            if (!isAnimatingRef.current) {
              handleNext();
            }
          }, 4000);
        }
      }, 500);
    };

    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isAnimating, hasStarted, handleNext]);

  // Navigation clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch swipe
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndRef.current = null;
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const distance = touchStartRef.current - touchEndRef.current;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="fleet"
      className="relative bg-black min-h-[85vh] md:min-h-screen flex items-center md:items-center justify-center px-3 md:px-4 lg:px-6 pt-12 md:pt-8 lg:pt-12 pb-4 md:pb-8 lg:pb-12 overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Badge Notre Flotte */}
      <div className="absolute top-3 md:top-4 lg:top-6 left-3 md:left-4 lg:left-6 z-10">
        <div className="px-3 md:px-4 lg:px-6 py-1.5 md:py-2 lg:py-3 border border-white/20 rounded-full backdrop-blur-sm bg-white/10">
          <span className="text-white/80 text-[10px] md:text-xs lg:text-sm font-light tracking-wider uppercase">
            Notre Flotte
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full h-full flex flex-col">
        <div className="flex-1 flex flex-col pt-2 md:pt-12 lg:pt-16 pb-2 md:pb-6 lg:pb-8">
          
          {/* Titre + Description */}
          <div ref={textRef} className="text-center mb-3 md:mb-6 lg:mb-8 px-2 relative z-10" style={{ opacity: 1 }}>
            <h3 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-white tracking-wider leading-tight mb-2 md:mb-3">
              {displayedVehicle.title}
            </h3>
            <p className="text-xs md:text-sm lg:text-base xl:text-lg text-white/90 font-light max-w-3xl mx-auto leading-relaxed line-clamp-2 md:line-clamp-none px-1">
              {displayedVehicle.description}
            </p>
          </div>

          {/* Voiture - PROPORTIONS NATURELLES */}
          <div ref={carRef} className="flex justify-center flex-shrink-0 my-3 md:my-6 lg:my-8">
            <img 
              src={current.image} 
              alt={current.title}
              width={750}
              height={500}
              className="w-auto max-w-[280px] md:max-w-[450px] lg:max-w-[600px] xl:max-w-[750px] h-auto"
              loading="lazy"
              decoding="async"
              style={{ 
                willChange: 'transform',
                objectFit: 'contain',
                width: 'auto',
                height: 'auto',
                maxHeight: '28vh'
              }}
            />
          </div>

          {/* Specs */}
          <div ref={specsRef} className="flex justify-center gap-4 md:gap-6 lg:gap-8 xl:gap-12 flex-shrink-0 mb-3 md:mb-6 relative z-10" style={{ opacity: 1 }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Users className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white text-xs md:text-sm lg:text-base xl:text-lg font-medium">{displayedVehicle.passengers}</div>
                <div className="text-white/60 text-[9px] md:text-[10px] lg:text-xs">Passagers</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Briefcase className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white text-xs md:text-sm lg:text-base xl:text-lg font-medium">{displayedVehicle.luggage}</div>
                <div className="text-white/60 text-[9px] md:text-[10px] lg:text-xs">Bagages</div>
              </div>
            </div>
          </div>

          {/* Équipements - SANS CERCLES - 1 ligne desktop / 2 lignes mobile */}
          <div ref={featuresRef} className="flex-shrink-0 mb-auto relative z-10" style={{ opacity: 1 }}>
            
            {/* DESKTOP : 1 ligne horizontale, 6 icônes SANS cercles */}
            <div className="hidden md:flex justify-center items-center gap-4 lg:gap-6 xl:gap-8">
              {displayedVehicle.features.map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5 lg:gap-2">
                    <IconComponent className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-white/80 stroke-[1.5]" />
                    <span className="text-[9px] lg:text-xs xl:text-sm text-white/80 font-light text-center leading-tight max-w-[70px] lg:max-w-[90px]">
                      {feature.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* MOBILE : 2 lignes, 3 icônes par ligne SANS cercles */}
            <div className="md:hidden space-y-2.5">
              {/* Ligne 1 */}
              <div className="flex justify-between items-center px-2">
                {displayedVehicle.features.slice(0, 3).map((feature, idx) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                      <IconComponent className="w-4 h-4 text-white/80 stroke-[1.5]" />
                      <span className="text-[8px] text-white/80 font-light text-center leading-tight">
                        {feature.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              {/* Ligne 2 */}
              <div className="flex justify-between items-center px-2">
                {displayedVehicle.features.slice(3, 6).map((feature, idx) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={idx + 3} className="flex flex-col items-center gap-1 flex-1">
                      <IconComponent className="w-4 h-4 text-white/80 stroke-[1.5]" />
                      <span className="text-[8px] text-white/80 font-light text-center leading-tight">
                        {feature.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-2 md:gap-3 lg:gap-4 pt-2 md:pt-6 lg:pt-8 pb-1 md:pb-4 flex-shrink-0">
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Véhicule précédent"
          >
            <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" />
          </button>

          <div className="flex gap-1 md:gap-1.5">
            {vehicles.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                disabled={isAnimating}
                className={`h-1 md:h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'w-6 md:w-8 lg:w-10 xl:w-12 bg-white' 
                    : 'w-1 md:w-1.5 bg-white/30 hover:bg-white/50 hover:scale-125'
                }`}
                aria-label={`Aller au véhicule ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Véhicule suivant"
          >
            <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
