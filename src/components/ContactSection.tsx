import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, ArrowRight, Flag, Phone, Mail, MessageSquare, User } from 'lucide-react';
import AddressInputWithSuggestions from '@/components/AddressInputWithSuggestions';
import SimpleRouteMap from '@/components/SimpleRouteMap';

const ACCENT_BLUE = '#001F3F';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Listen for pre-fill event from Hero form
  useEffect(() => {
    const handlePrefill = (event: CustomEvent) => {
      const { departure: dep, arrival: arr } = event.detail;
      if (dep) setDeparture(dep);
      if (arr) setArrival(arr);
    };

    window.addEventListener('prefillBookingForm', handlePrefill as EventListener);
    return () => {
      window.removeEventListener('prefillBookingForm', handlePrefill as EventListener);
    };
  }, []);

  return (
    <section 
      id="contact" 
      className="relative py-8 md:py-10 overflow-visible"
      ref={ref}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/contact-bg-tesla.webp)' }}
      />
      
      {/* Subtle Gradient Overlay - Only behind text area, image stays clear */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-black/60 lg:via-black/25 lg:to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full flex flex-col">
        <div className="grid lg:grid-cols-5 gap-4 lg:gap-8 items-start lg:items-center">
          
          {/* Left Column - Text Content (40%) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-2 text-left mb-6 lg:mb-0"
          >
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-tight mb-4 md:mb-5 drop-shadow-2xl"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.7)' }}
            >
              Voyagez l'Esprit Libre.
              <br />
              <span className="text-white/90">L'Excellence du Transport Privé.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-white font-light text-sm md:text-base leading-relaxed drop-shadow-xl"
              style={{ textShadow: '0 3px 15px rgba(0,0,0,0.95), 0 1px 6px rgba(0,0,0,0.9), 0 0 25px rgba(0,0,0,0.6)' }}
            >
              Ne laissez plus vos déplacements au hasard. Que ce soit pour un transfert 
              aéroportuaire stratégique ou un retour tardif de gare TGV, nous garantissons 
              une ponctualité absolue et une discrétion totale. Votre chauffeur vous attendra 
              personnellement, avec un tarif fixé à l'avance et sans mauvaise surprise. 
              Profitez d'un service sur-mesure, disponible 24h/24, pensé pour votre tranquillité.
            </motion.p>
          </motion.div>

          {/* Right Column - Floating Form (60%) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-3 relative"
            style={{ zIndex: 1 }}
          >
            <form 
              action="https://formsubmit.co/ouerfelli.yassino@gmail.com"
              method="POST"
              className="bg-white rounded-xl shadow-xl p-4 md:p-5 relative"
              style={{ boxShadow: '0 15px 40px rgba(0,0,0,0.25)' }}
            >
              {/* FormSubmit hidden fields */}
              <input type="hidden" name="_subject" value="🚖 Nouvelle Réservation TAXI" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="https://taximalacrida.com/merci" />

              <h3 
                className="font-serif text-lg md:text-xl mb-3 md:mb-4 text-center"
                style={{ color: ACCENT_BLUE }}
              >
                Réservez votre Chauffeur
              </h3>

              <div className="space-y-3">
                {/* Departure & Arrival - Side by side on larger screens */}
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Adresse de départ
                    </label>
                    <AddressInputWithSuggestions
                      value={departure}
                      onChange={(value) => {
                        setDeparture(value);
                        // Mettre à jour aussi le champ du formulaire pour la soumission
                        const form = document.querySelector('form') as HTMLFormElement;
                        if (form) {
                          const input = form.querySelector('[name="departure"]') as HTMLInputElement;
                          if (input) input.value = value;
                        }
                      }}
                      placeholder="Ex: Aéroport Marseille"
                      icon={MapPin}
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#001F3F] focus:ring-2 focus:ring-[#001F3F]/20 outline-none transition-all text-gray-800 text-sm"
                      iconClassName="text-gray-400"
                      loaderClassName="text-gray-400"
                    />
                    <input type="hidden" name="departure" value={departure} required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Adresse d'arrivée
                    </label>
                    <AddressInputWithSuggestions
                      value={arrival}
                      onChange={(value) => {
                        setArrival(value);
                        // Mettre à jour aussi le champ du formulaire pour la soumission
                        const form = document.querySelector('form') as HTMLFormElement;
                        if (form) {
                          const input = form.querySelector('[name="arrival"]') as HTMLInputElement;
                          if (input) input.value = value;
                        }
                      }}
                      placeholder="Ex: Aix-en-Provence"
                      icon={Flag}
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#001F3F] focus:ring-2 focus:ring-[#001F3F]/20 outline-none transition-all text-gray-800 text-sm"
                      iconClassName="text-gray-400"
                      loaderClassName="text-gray-400"
                    />
                    <input type="hidden" name="arrival" value={arrival} required />
                  </div>
                </div>

                {/* Map - Conditionally rendered when both addresses are filled */}
                {departure.length >= 5 && arrival.length >= 5 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1.5">Visualisation de l'itinéraire</p>
                    <SimpleRouteMap 
                      departure={departure} 
                      arrival={arrival} 
                    />
                  </div>
                )}

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="reservation-date" className="block text-xs font-medium text-gray-500 mb-1">
                      Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="reservation-date"
                        type="date"
                        name="date"
                        required
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#001F3F] focus:ring-2 focus:ring-[#001F3F]/20 outline-none transition-all text-gray-800 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="reservation-time" className="block text-xs font-medium text-gray-500 mb-1">
                      Heure
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="reservation-time"
                        type="time"
                        name="time"
                        required
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#001F3F] focus:ring-2 focus:ring-[#001F3F]/20 outline-none transition-all text-gray-800 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Nom */}
                <div>
                  <label htmlFor="reservation-nom" className="block text-xs font-medium text-gray-500 mb-1">
                    Nom complet
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="reservation-nom"
                      type="text"
                      name="nom"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Jean Dupont"
                      required
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#001F3F] focus:ring-2 focus:ring-[#001F3F]/20 outline-none transition-all text-gray-800 text-sm"
                    />
                  </div>
                </div>

                {/* Téléphone */}
                <div>
                  <label htmlFor="reservation-telephone" className="block text-xs font-medium text-gray-500 mb-1">
                    Téléphone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="reservation-telephone"
                      type="tel"
                      name="telephone"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      placeholder="06 12 34 56 78"
                      required
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#001F3F] focus:ring-2 focus:ring-[#001F3F]/20 outline-none transition-all text-gray-800 text-sm"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="reservation-email" className="block text-xs font-medium text-gray-500 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="reservation-email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jean.dupont@email.com"
                      required
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#001F3F] focus:ring-2 focus:ring-[#001F3F]/20 outline-none transition-all text-gray-800 text-sm"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="reservation-message" className="block text-xs font-medium text-gray-500 mb-1">
                    Message ou précisions <span className="text-gray-400">(optionnel)</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      id="reservation-message"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Informations complémentaires, demandes spéciales..."
                      rows={3}
                      maxLength={500}
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#001F3F] focus:ring-2 focus:ring-[#001F3F]/20 outline-none transition-all text-gray-800 text-sm resize-none"
                    />
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 md:py-3 rounded-lg text-white font-medium text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 mt-2"
                  style={{ 
                    backgroundColor: ACCENT_BLUE,
                    boxShadow: '0 4px 14px rgba(14,77,100,0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0a3d50';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = ACCENT_BLUE;
                  }}
                >
                  <span>Obtenir mon Tarif & Réserver</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
