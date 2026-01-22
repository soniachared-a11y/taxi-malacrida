import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, PenLine } from 'lucide-react';

const testimonials = [
  {
    name: 'Sophie L.',
    role: 'Directrice Marketing',
    content: 'Un service exceptionnel du début à la fin. Le chauffeur était ponctuel et la Tesla d\'un confort remarquable.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Pierre M.',
    role: 'Chef d\'Entreprise',
    content: 'J\'utilise Malacrida pour tous mes déplacements professionnels. Service constant et fiable.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Marie',
    role: 'Touriste, Canada',
    content: 'Notre journée découverte en Provence était magique. Une expérience inoubliable !',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'T. Bernard',
    role: 'Client Régulier',
    content: 'Deux ans de transferts aéroport impeccables. Professionnalisme toujours au rendez-vous.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Claudette',
    role: 'Retraitée',
    content: 'Un chauffeur charmant et patient. Je me suis sentie en sécurité tout le trajet.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'L. & Emma',
    role: 'Jeunes Mariés',
    content: 'Transport parfait pour notre mariage. Élégance et ponctualité au top !',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'J-P. R.',
    role: 'Homme d\'Affaires',
    content: 'Discrétion et confort pour mes rendez-vous clients. Je recommande vivement.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Amélie',
    role: 'Étudiante',
    content: 'Transfert aéroport parfait pour mes retours de vacances. Prix correct et service pro.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-12 md:py-16 bg-[#f9f9f9] relative overflow-hidden" ref={ref}>
      {/* Decorative */}
      <div className="deco-circle w-80 h-80 -top-40 -left-40" />
      
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="text-sm font-light tracking-[0.2em] uppercase text-charcoal-light block mb-3">
            Témoignages
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-charcoal mb-3">
            Ils Nous Font{' '}
            <span className="text-[#001F3F]">Confiance</span>
          </h2>
          <p className="text-charcoal-light font-light max-w-xl mx-auto text-sm md:text-base">
            Découvrez les retours de nos clients satisfaits qui nous font confiance pour leurs déplacements premium sur la Côte d'Azur.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 relative">
            <Quote className="absolute top-4 right-4 w-12 h-12 text-[#001F3F]/10" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col md:flex-row gap-6 items-center"
              >
                {/* Avatar */}
                <div className="shrink-0">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-3 border-[#001F3F]/20 shadow-md"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Rating */}
                  <div className="flex gap-1 mb-3 justify-center md:justify-start">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#001F3F] text-[#001F3F]" />
                    ))}
                  </div>

                  <blockquote className="text-base md:text-lg font-serif text-charcoal leading-relaxed mb-4 italic">
                    "{testimonials[current].content}"
                  </blockquote>

                  <div className="font-serif text-base text-charcoal">
                    {testimonials[current].name}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current ? 'w-6 bg-[#001F3F]' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Témoignage ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#001F3F] hover:text-[#001F3F] transition-colors"
                  aria-label="Précédent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#001F3F] hover:text-[#001F3F] transition-colors"
                  aria-label="Suivant"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* CTA Déposer un avis */}
          <div className="text-center mt-8">
            <a
              href="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#001F3F] text-white rounded-full font-medium hover:bg-[#001F3F]/90 transition-colors"
            >
              <PenLine className="w-4 h-4" />
              Déposer un avis
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
