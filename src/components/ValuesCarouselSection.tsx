import { motion } from 'framer-motion';
import { ShieldCheck, Users, MapPin, HeartHandshake } from 'lucide-react';

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

export default function ValuesCarouselSection() {
  return (
    <section className="bg-white py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-4 md:px-8">
        {/* BANDE DÉFILANTE POUR LES CARTES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden py-3 md:py-4 lg:py-5"
        >
          <div className="flex gap-3 md:gap-5 lg:gap-6 animate-scroll">
            {/* Dupliquer les cartes pour l'effet de boucle infinie */}
            {[...values, ...values, ...values].map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={`${value.title}-${index}`}
                  className="flex-shrink-0 w-[260px] md:w-[300px] lg:w-[320px] bg-white border border-black/5 rounded-lg p-4 md:p-5 lg:p-6 hover:shadow-lg transition-all duration-300"
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
}
