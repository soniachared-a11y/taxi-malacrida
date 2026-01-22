import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Users, MapPin, HeartHandshake, Baby } from 'lucide-react';
import clientHappy1 from '@/assets/client-happy-1.jpg';
import clientHappy2 from '@/assets/client-happy-2.jpg';
import clientHappy3 from '@/assets/client-happy-3.jpg';

const values = [
  {
    icon: ShieldCheck,
    title: 'Paiement Sécurisé',
    description: 'CB, espèces ou virement.',
  },
  {
    icon: Users,
    title: 'Discrétion',
    description: 'Vie privée respectée.',
  },
  {
    icon: MapPin,
    title: 'Expertise Locale',
    description: 'Connaissance du Sud.',
  },
  {
    icon: HeartHandshake,
    title: 'Sur-Mesure',
    description: 'Adapté à vos besoins.',
  },
  {
    icon: Baby,
    title: 'Équipement Bébé',
    description: 'Siège enfant disponible.',
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="min-h-[80vh] py-16 md:py-24 texture-overlay bg-secondary flex items-center" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-sm font-light tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
            Pourquoi Malacrida
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            Votre Partenaire de <span style={{ color: '#001F3F' }}>Confiance</span>
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
            Plus de 5 ans d'expérience au service de clients exigeants. 
            Disponibilité 24h/24, véhicule 100% électrique et équipements adaptés 
            pour voyager en famille ou en toute discrétion.
          </p>
          
          {/* Happy Clients Images - centered */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex -space-x-3">
              <img
                src={clientHappy1}
                alt="Cliente satisfaite"
                className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover avatar-ring"
              />
              <img
                src={clientHappy2}
                alt="Client satisfait"
                className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover avatar-ring"
              />
              <img
                src={clientHappy3}
                alt="Clients satisfaits"
                className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover avatar-ring"
              />
            </div>
            <div className="text-left">
              <div className="font-serif text-xl md:text-2xl">2000+</div>
              <div className="text-sm md:text-base font-light text-muted-foreground">Clients Satisfaits</div>
            </div>
          </div>
        </motion.div>

        {/* Values Marquee - centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative overflow-hidden max-w-4xl mx-auto"
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-secondary to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-secondary to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-marquee-slow gap-5">
            {[...values, ...values, ...values].map((value, index) => (
              <div
                key={`${value.title}-${index}`}
                className="flex-shrink-0 card-elegant rounded-xl p-5 md:p-6 w-48 md:w-56 bg-white/80 backdrop-blur-sm"
              >
                <value.icon className="w-7 h-7 md:w-8 md:h-8 mb-3" style={{ color: '#001F3F' }} strokeWidth={1.5} />
                <h3 className="font-serif text-base md:text-lg mb-2">{value.title}</h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
