import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Tablet, Zap, Wifi, Droplet, CreditCard, Umbrella } from 'lucide-react';

const features = [
  { icon: Tablet, label: 'Tablette à bord' },
  { icon: Zap, label: 'Chargeurs' },
  { icon: Wifi, label: 'Connexion Wifi' },
  { icon: Droplet, label: 'Rafraîchissements' },
  { icon: CreditCard, label: 'Terminal CB' },
  { icon: Umbrella, label: 'Parapluie' },
];

const VehicleSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative bg-black py-16 md:py-24 px-6 overflow-hidden">
      {/* Subtle checkerboard pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04]" 
        style={{
          backgroundImage: `repeating-conic-gradient(#333333 0% 25%, transparent 0% 50%)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="relative max-w-6xl mx-auto flex flex-col items-center">
        {/* Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h2 
            className="text-white font-light mb-4"
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              letterSpacing: '3px',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}
          >
            TESLA MODEL Y
          </h2>
          <p 
            className="text-white/70 font-extralight max-w-lg mx-auto mb-3"
            style={{
              fontSize: '14px',
              letterSpacing: '1px',
              lineHeight: '1.8',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}
          >
            Une expérience de voyage premium à bord du véhicule électrique le plus avancé de sa catégorie.
          </p>
          <p 
            className="text-white/55 font-extralight max-w-md mx-auto"
            style={{
              fontSize: '13px',
              lineHeight: '1.7',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}
          >
            Toit panoramique intégral, silence absolu et connectivité à bord. Profitez d'un espace de travail mobile ou d'une bulle de détente.
          </p>
        </motion.div>

        {/* Vehicle Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-12 flex justify-center w-full"
        >
          <img 
            src="https://uqjftifudojfgfwfxxia.supabase.co/storage/v1/object/sign/image%20tesla/Image_model_tesla_y_-removebg-preview%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMmY3N2MyMi0wNDFkLTQ5YWQtODE3ZC04MDJiY2M4ODQ0OGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZSB0ZXNsYS9JbWFnZV9tb2RlbF90ZXNsYV95Xy1yZW1vdmViZy1wcmV2aWV3ICgxKS5wbmciLCJpYXQiOjE3Njg3NDA3NTUsImV4cCI6MTgwMDI3Njc1NX0.0NCbznvHI12M4FFgf9wH_MLlGH7szj0tx-xkggUuxQo"
            alt="Tesla Model Y"
            className="w-full h-auto"
            style={{ maxWidth: '600px' }}
          />
        </motion.div>
        
        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-3 md:grid-cols-6 w-full"
          style={{ gap: '40px', maxWidth: '900px' }}
        >
          {features.map((feature, i) => {
            const IconComponent = feature.icon;
            return (
              <motion.div 
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="flex flex-col items-center text-center cursor-default group"
              >
                <div className="transition-transform duration-300 ease-out group-hover:-translate-y-1">
                  <IconComponent 
                    className="text-white" 
                    size={48} 
                    strokeWidth={1.5}
                  />
                </div>
                <p 
                  className="text-white mt-5"
                  style={{ 
                    fontSize: '14px',
                    fontWeight: 400,
                    letterSpacing: '1px'
                  }}
                >
                  {feature.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default VehicleSection;
