import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Wifi, Shield, Leaf, Sparkles, Battery, Check } from 'lucide-react';
import teslaExterior from '@/assets/hero-tesla-riviera.jpg';
import teslaInterior from '@/assets/tesla-interior.jpg';

const features = [
  { icon: Zap, label: '100% Électrique' },
  { icon: Shield, label: 'Sécurité Maximale' },
  { icon: Wifi, label: 'Wi-Fi Gratuit' },
  { icon: Battery, label: 'Autonomie 500km' },
  { icon: Sparkles, label: 'Intérieur Premium' },
  { icon: Leaf, label: 'Éco-Responsable' },
];

const specs = [
  { label: 'Passagers', value: '4 personnes' },
  { label: 'Bagages', value: '3 grandes valises' },
  { label: 'Écran', value: '15" tactile' },
  { label: 'Toit', value: 'Panoramique' },
];

const FleetSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="fleet" className="relative overflow-hidden py-12 md:py-16 lg:py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-10"
        >
          <span className="accent-line mb-4 block mx-auto" />
          <span className="text-xs md:text-sm font-light tracking-[0.2em] uppercase text-charcoal-light block mb-3">
            Notre Flotte
          </span>
          <h2 className="mb-4 text-2xl md:text-3xl lg:text-4xl">
            Tesla Model Y{' '}
            <span className="text-gold">2025</span>
          </h2>
          <p className="text-sm md:text-base text-charcoal-light max-w-2xl mx-auto font-light">
            L'alliance parfaite entre technologie de pointe, confort absolu 
            et responsabilité environnementale.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-start lg:items-center mb-0">
          {/* Left - Main Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-7 relative"
          >
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={teslaExterior}
                alt="Tesla Model Y 2025"
                width={800}
                height={400}
                className="w-full h-[280px] md:h-[350px] lg:h-[400px] object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="img-overlay" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
                <span className="badge-premium mb-2 md:mb-3 text-xs">
                  Flotte Premium
                </span>
                <h3 className="text-white text-xl md:text-2xl lg:text-3xl mb-1 md:mb-2">Tesla Model Y</h3>
                <p className="text-white/70 font-light text-sm md:text-base">SUV 100% Électrique • 2025</p>
              </div>
            </div>

            {/* Features Grid Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -right-2 md:-right-4 lg:-right-8 top-4 md:top-6 lg:top-8 grid grid-cols-2 gap-2 md:gap-3"
            >
              {features.slice(0, 4).map((feature, i) => (
                <div
                  key={i}
                  className="card-float !p-2 md:!p-3 lg:!p-4 flex items-center gap-2 md:gap-3"
                >
                  <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-gold" />
                  <span className="text-xs md:text-sm font-light text-charcoal whitespace-nowrap">{feature.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 space-y-5 md:space-y-6"
          >
            {/* Interior Image */}
            <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
              <img
                src={teslaInterior}
                alt="Intérieur Tesla Model Y"
                width={600}
                height={192}
                className="w-full h-32 md:h-40 lg:h-48 object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Specs */}
            <div className="card-float !p-5 md:!p-6 lg:!p-8">
              <h4 className="font-serif text-lg md:text-xl mb-4 md:mb-5">Caractéristiques</h4>
              <div className="space-y-3 md:space-y-4">
                {specs.map((spec, i) => (
                  <div key={i} className="flex items-center justify-between py-2 md:py-2.5 border-b border-stone/50 last:border-0">
                    <span className="text-charcoal-light font-light text-sm md:text-base">{spec.label}</span>
                    <span className="font-medium text-charcoal text-sm md:text-base">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included */}
            <div className="space-y-2 md:space-y-3">
              <h4 className="font-serif text-base md:text-lg mb-3 md:mb-4">Toujours inclus</h4>
              {['Eau minérale fraîche', 'Chargeurs USB-C', 'Climatisation premium'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-success" />
                  </div>
                  <span className="text-charcoal-light font-light text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
