import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

// Enregistrer le plugin GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ACCENT_BLUE = '#001F3F';

const faqQuestions: Array<{ question: string; answer: string | React.ReactNode }> = [
  {
    question: 'Quels sont vos tarifs fixes pour les destinations courantes ?',
    answer: (
      <ul className="list-disc list-inside space-y-2" style={{ color: ACCENT_BLUE }}>
        <li><strong style={{ color: ACCENT_BLUE }}>Gare Aix-en-Provence TGV :</strong> À partir de 35€</li>
        <li><strong style={{ color: ACCENT_BLUE }}>Aéroport Marseille-Provence :</strong> À partir de 50€</li>
        <li><strong style={{ color: ACCENT_BLUE }}>Marseille Centre / Gare St Charles :</strong> À partir de 55€</li>
      </ul>
    ),
  },
  {
    question: 'Combien de temps à l\'avance puis-je réserver ?',
    answer: 'Jusqu\'à 3 mois à l\'avance pour garantir votre créneau.',
  },
  {
    question: 'Quel est le délai pour une course immédiate ?',
    answer: '30 minutes minimum, disponible 24h/24.',
  },
  {
    question: 'Proposez-vous la facturation pour entreprises ?',
    answer: 'Oui, avec paiement différé et suivi personnalisé.',
  },
  {
    question: 'Surveillez-vous les vols en cas de retard ?',
    answer: 'Oui, suivi en temps réel sans frais supplémentaires.',
  },
  {
    question: 'Où m\'attendez-vous à l\'aéroport ?',
    answer: 'Hall des arrivées avec tablette à votre nom.',
  },
  {
    question: 'Le supplément de 4€ concerne quoi ?',
    answer: 'Uniquement 4ème bagage ou siège enfant. Les 3 premiers inclus.',
  },
  {
    question: 'Y a-t-il un prix minimum ?',
    answer: '25€ sur certaines destinations courtes.',
  },
  {
    question: 'Couvrez-vous toute la région PACA ?',
    answer: 'Oui : aéroports, gares, centres-villes, événements.',
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Animation GSAP au scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation titre
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Écouter l'événement personnalisé pour ouvrir une question spécifique
  useEffect(() => {
    const handleOpenQuestion = (event: CustomEvent<number>) => {
      setSelectedIndex(event.detail);
      setIsOpen(false);
    };

    window.addEventListener('openFaqQuestion', handleOpenQuestion as EventListener);
    return () => window.removeEventListener('openFaqQuestion', handleOpenQuestion as EventListener);
  }, []);

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(false);
  };

  return (
    <section 
      ref={sectionRef}
      id="faq"
      className="bg-white py-6 md:py-8 border-t border-b border-gray-300"
    >
      <div className="max-w-3xl mx-auto px-4 md:px-6 border-x border-gray-300 py-3 md:py-4">
        {/* Titre principal */}
        <div className="text-center mb-4 md:mb-5">
          <h2 
            ref={titleRef}
            className="font-serif text-xl md:text-2xl lg:text-3xl text-black mb-1"
          >
            Questions Fréquentes
          </h2>
          <p className="text-xs" style={{ color: ACCENT_BLUE }}>
            Tout pour voyager sereinement
          </p>
        </div>

        {/* Menu déroulant */}
        <div className="relative" ref={dropdownRef}>
          <button
            data-faq-question="dropdown"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center px-4 py-2.5 rounded-full bg-black text-white text-left hover:bg-gray-900 transition-colors duration-300"
          >
            <span className="font-sans font-medium text-sm md:text-base text-white">
              {selectedIndex !== null 
                ? faqQuestions[selectedIndex].question 
                : 'Sélectionnez une question'}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-white transition-transform duration-300 flex-shrink-0 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
            />
          </button>

          {/* Liste déroulante - Dans le flux du document */}
          {isOpen && (
            <div className="w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
              {faqQuestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-0"
                >
                  <span className="font-sans font-medium text-xs md:text-sm text-black">
                    {item.question}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Réponse affichée - Dans le flux du document */}
        {selectedIndex !== null && (
          <div 
            data-faq-question={selectedIndex}
            data-faq-answer
            className="bg-gray-50 border border-gray-200 rounded-lg p-3 md:p-4 mt-4"
          >
            <div className="text-xs md:text-sm leading-relaxed font-sans font-normal" style={{ color: ACCENT_BLUE }}>
              {typeof faqQuestions[selectedIndex].answer === 'string' 
                ? faqQuestions[selectedIndex].answer 
                : faqQuestions[selectedIndex].answer}
            </div>
          </div>
        )}

        {/* CTA Final */}
        <div className="text-center mt-5 md:mt-6">
          <p className="text-gray-500 mb-3 text-xs">
            Une autre question ? Notre équipe est à votre écoute
          </p>
          <a
            href="tel:0784628640"
            className="inline-block border-2 px-5 py-2 rounded-full font-medium transition-all duration-400 text-xs bg-white"
            style={{ 
              borderColor: ACCENT_BLUE, 
              color: ACCENT_BLUE 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = ACCENT_BLUE;
            }}
          >
            07 84 62 86 40
          </a>
        </div>
      </div>
    </section>
  );
}
