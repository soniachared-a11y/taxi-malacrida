import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ACCENT_BLUE = '#001F3F';

// Animated underline component
const AnimatedUnderline = ({ isInView }: { isInView: boolean }) => {
  return (
    <motion.div
      className="absolute bottom-0 left-0 h-1 rounded-full"
      style={{ backgroundColor: ACCENT_BLUE }}
      initial={{ width: '0%' }}
      animate={isInView ? { width: '100%' } : { width: '0%' }}
      transition={{ 
        duration: 1.2, 
        ease: [0.65, 0, 0.35, 1],
        delay: 0.2
      }}
    />
  );
};

export default function ServicesIntroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-200px", amount: 0.1 });

  return (
    <section 
      id="services" 
      className="bg-white py-8 md:py-12 lg:py-16"
    >
      <div className="container mx-auto px-4 md:px-8 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center px-2 pt-4 md:pt-6 mb-6 md:mb-8"
        >
          {/* Title with animated underline */}
          <div className="inline-block relative pb-3 md:pb-4">
            <h2 
              ref={titleRef}
              className="font-serif text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-[#1a1a1a]"
            >
              Votre <span style={{ color: ACCENT_BLUE }}>Satisfaction</span> est Notre Priorité
            </h2>
            <AnimatedUnderline isInView={isTitleInView} />
          </div>
          
          <h3 className="font-serif text-lg md:text-xl font-light mt-4 md:mt-5 lg:mt-6 mb-3 md:mb-4" style={{ color: ACCENT_BLUE }}>
            L'Excellence au Service de vos Déplacements
          </h3>
          <p className="font-sans text-black/70 max-w-3xl mx-auto text-[15px] md:text-[17px] font-light leading-relaxed md:leading-[1.8] px-2 mb-3 md:mb-4">
            Depuis notre installation à Aix-en-Provence, Taxi Malacrida s'est donné une mission : transformer chaque trajet en une expérience premium et mémorable. Notre flotte diversifiée - Tesla Model Y et Model 3 pour vos déplacements individuels ou en petit groupe, Mercedes V-Class pour vos transferts en famille ou en équipe - incarne notre engagement envers l'innovation, le confort et le respect de l'environnement.
          </p>
          <p className="font-sans text-black/60 max-w-3xl mx-auto mb-3 md:mb-4 text-[14px] md:text-[15px] font-light leading-relaxed px-2">
            Que vous soyez un professionnel pressé, une famille en voyage, un couple en escapade ou un groupe d'amis, nous adaptons notre service à vos besoins. Transferts aéroport, déplacements d'affaires, événements familiaux, sorties entre amis : chaque situation mérite la même attention et le même professionnalisme. Notre connaissance approfondie de la région PACA, de Marseille à Monaco, garantit des trajets optimisés et une disponibilité <span style={{ color: ACCENT_BLUE }}>24h/24, 7j/7</span>.
          </p>
          <p className="font-sans text-black/60 max-w-3xl mx-auto text-[14px] md:text-[15px] font-light leading-relaxed px-2">
            Plus qu'un simple transport, nous offrons une bulle de sérénité où technologie et élégance se rencontrent. Chaque véhicule de notre flotte est soigneusement entretenu et équipé pour vous offrir confort, discrétion et tranquillité d'esprit, quel que soit votre destination.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
