import { useState, useEffect, useRef, useCallback } from 'react';

// Import images localement
import voitureEnRoute from '@/assets/services/voiture-en-route.jpg';
import chauffeurJournee from '@/assets/services/chauffeur-journee.jpg';
import shopping from '@/assets/services/shopping.jpg';
import vieuxPortMarseille from '@/assets/services/vieux-port-marseille.jpg';
import evenements from '@/assets/services/evenements.jpg';
import gare from '@/assets/services/gare.jpg';

const ACCENT_BLUE = '#001F3F';

const services = [
  {
    title: "Transferts Aéroports",
    description: "Marseille-Provence, Nice Côte d'Azur, Toulon Hyères. Ponctualité garantie avec suivi de vol en temps réel pour anticiper tout retard. Prise en charge directe au terminal, assistance bagages incluse. Votre chauffeur vous attend avec pancarte nominative pour un accueil personnalisé et serein.",
    image: voitureEnRoute
  },
  {
    title: "Service à la journée",
    description: "Bénéficiez d'un chauffeur privé dédié pour la journée entière, idéal pour vos rendez-vous professionnels ou vos activités personnelles. Flexibilité totale sur les horaires et les destinations. Véhicule à disposition permanente, pauses comprises. Solution parfaite pour les journées chargées nécessitant plusieurs déplacements.",
    image: chauffeurJournee
  },
  {
    title: "Shopping & Sorties",
    description: "Nos chauffeurs vous accompagnent avec élégance pour vos séances shopping dans les meilleures boutiques de la région. Attente sur place, aide au chargement de vos achats, discrétion absolue. Profitez également de nos services pour vos sorties restaurants, spectacles ou soirées entre amis en toute sérénité.",
    image: shopping
  },
  {
    title: "Tourisme PACA",
    description: "Marseille, Cassis, Aix-en-Provence, les calanques et la Côte d'Azur. Découvrez les trésors de la région Provence-Alpes-Côte d'Azur avec un chauffeur local passionné. Circuits personnalisés, arrêts photos aux meilleurs points de vue, recommandations authentiques. Explorez la Provence à votre rythme dans un confort optimal.",
    image: vieuxPortMarseille
  },
  {
    title: "Événements",
    description: "Mariages, galas, anniversaires, séminaires d'entreprise. Nous transformons vos moments spéciaux en souvenirs inoubliables avec un service irréprochable. Véhicule décoré sur demande, coordination avec vos prestataires, ponctualité exemplaire. Faites de votre événement une expérience exceptionnelle du début à la fin.",
    image: evenements
  },
  {
    title: "Transferts Gares",
    description: "TGV Aix-en-Provence, Marseille Saint-Charles, Avignon TGV. Prise en charge directe à quai avec assistance complète pour vos bagages. Suivi des horaires de train en temps réel pour s'adapter aux éventuels retards. Transfert fluide et sans stress vers votre destination finale dans la région.",
    image: gare
  }
];

export default function ServicesCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate card width including gap
  const getCardWidth = useCallback(() => {
    if (!carouselRef.current) return 0;
    const containerWidth = carouselRef.current.offsetWidth;
    const gap = isMobile ? 16 : 24; // gap-4 = 16px, gap-6 = 24px
    if (isMobile) {
      return containerWidth;
    } else {
      return (containerWidth - gap) / 2;
    }
  }, [isMobile]);

  // Auto-scroll every 3 seconds - NE JAMAIS S'ARRÊTER même si l'utilisateur touche
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = isMobile ? services.length - 1 : services.length - 2;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 3000);
    // Ne jamais nettoyer l'interval - le carrousel doit continuer indéfiniment
    return () => clearInterval(interval);
  }, [isMobile]);

  // Scroll to current index - disable snap during programmatic scroll
  useEffect(() => {
    if (!carouselRef.current) return;
    
    const carousel = carouselRef.current;
    const cardWidth = getCardWidth();
    const gap = isMobile ? 16 : 24;
    const scrollTarget = currentIndex * (cardWidth + gap);
    
    // Disable snap during auto-scroll
    setIsAutoScrolling(true);
    carousel.style.scrollSnapType = 'none';
    
    carousel.scrollTo({
      left: scrollTarget,
      behavior: 'smooth'
    });

    // Re-enable snap after scroll completes
    const timeout = setTimeout(() => {
      carousel.style.scrollSnapType = 'x mandatory';
      setIsAutoScrolling(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentIndex, getCardWidth, isMobile]);

  // Handle manual scroll - NE PAS INTERROMPRE l'auto-scroll
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // Permettre le scroll manuel sans interrompre l'auto-scroll
    const target = e.target as HTMLDivElement;
    const cardWidth = getCardWidth();
    const gap = isMobile ? 16 : 24;
    const newIndex = Math.round(target.scrollLeft / (cardWidth + gap));
    const maxIndex = isMobile ? services.length - 1 : services.length - 2;
    
    // Mettre à jour l'index seulement si différent, mais ne pas arrêter l'auto-scroll
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex <= maxIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const maxDots = isMobile ? services.length : services.length - 1;

  return (
    <section id="services-carousel" className="bg-[#f9f9f9] py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-8 w-full flex flex-col">
        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide gap-4 md:gap-6"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollPaddingLeft: '0px',
            paddingLeft: '0px',
            touchAction: 'pan-y pan-x'
          }}
          onScroll={handleScroll}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="snap-start flex-shrink-0 overflow-hidden rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
              style={{
                background: '#000000',
                height: isMobile ? '520px' : '600px',
                width: isMobile ? '100%' : 'calc(50% - 12px)',
                minWidth: isMobile ? '100%' : 'calc(50% - 12px)',
                touchAction: 'pan-x'
              }}
            >
              {/* Image */}
              <div 
                className="w-full overflow-hidden"
                style={{
                  height: isMobile ? '280px' : '360px',
                  touchAction: 'none',
                  pointerEvents: 'none'
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  style={{
                    touchAction: 'none',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    WebkitTouchCallout: 'none'
                  }}
                  draggable={false}
                />
              </div>
              
              {/* Contenu texte */}
              <div className="p-6 md:p-8 text-white">
                <h3 className="font-serif text-xl md:text-[28px] font-normal mb-3 md:mb-4 text-white">
                  {service.title}
                </h3>
                
                {/* Ligne blanche */}
                <div className="w-12 md:w-[60px] h-0.5 bg-white mb-4 md:mb-5" />
                
                <p className="font-serif text-sm md:text-[15px] font-light leading-relaxed md:leading-[1.7] text-white/90">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6 md:mt-8 mb-0">
          {Array.from({ length: maxDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'scale-110' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              style={{
                backgroundColor: currentIndex === index ? ACCENT_BLUE : undefined
              }}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
