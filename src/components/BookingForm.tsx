import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Flag, Clock, User, Phone, Mail, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { supabase, type Reservation } from '@/lib/supabase';
import { calculateRoute } from '@/lib/routing';
import { sendTelegramNotification } from '@/lib/telegram';

// Validation schema
const bookingSchema = z.object({
  depart: z.string().trim().min(5, 'Adresse de départ requise (min 5 caractères)').max(200, 'Adresse trop longue'),
  arrivee: z.string().trim().min(5, "Adresse d'arrivée requise (min 5 caractères)").max(200, 'Adresse trop longue'),
  date: z.date({ required_error: 'Date requise' }),
  heure: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format heure invalide (HH:MM)'),
  nom: z.string().trim().min(2, 'Nom requis (min 2 caractères)').max(100, 'Nom trop long'),
  telephone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Numéro de téléphone invalide'),
  email: z.string().trim().email('Email invalide').max(255, 'Email trop long'),
  message: z.string().trim().max(500, 'Message trop long (max 500 caractères)').optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface QuoteResult {
  distance_km: number;
  prix_euros: number;
}

type FormStep = 'initial' | 'details' | 'quote' | 'success' | 'error';

const BookingForm = () => {
  const [step, setStep] = useState<FormStep>('initial');
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      heure: format(new Date(), 'HH:mm'),
    },
  });

  const watchedDepart = watch('depart');
  const watchedArrivee = watch('arrivee');

  // Step 1: Scroll to main booking form and pre-fill
  const handleGetQuote = () => {
    if (!watchedDepart || !watchedArrivee || watchedDepart.length < 5 || watchedArrivee.length < 5) {
      setErrorMessage('Veuillez entrer des adresses valides');
      return;
    }

    // Dispatch event to pre-fill the main booking form
    const event = new CustomEvent('prefillBookingForm', {
      detail: {
        departure: watchedDepart,
        arrival: watchedArrivee,
      },
    });
    window.dispatchEvent(event);

    // Scroll to the main booking form
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Step 2: Submit full reservation
  const onSubmit = async (data: BookingFormData) => {
    if (!quote) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      const dateHeure = new Date(data.date);
      const [hours, minutes] = data.heure.split(':');
      dateHeure.setHours(parseInt(hours), parseInt(minutes));

      const reservationData: Reservation = {
        depart: data.depart,
        arrivee: data.arrivee,
        date_heure: dateHeure.toISOString(),
        nom: data.nom,
        telephone: data.telephone,
        email: data.email,
        distance_km: quote.distance_km,
        prix_euros: quote.prix_euros,
        message: data.message || '',
      };

      // Save to Supabase
      const { error: dbError } = await supabase
        .from('reservations')
        .insert(reservationData);

      if (dbError) {
        console.error('Erreur Supabase:', dbError);
        throw new Error('Erreur lors de l\'enregistrement');
      }

      // Send Telegram notification
      await sendTelegramNotification({
        ...reservationData,
        date_heure: format(dateHeure, "dd/MM/yyyy 'à' HH:mm", { locale: fr }),
        distance_km: quote.distance_km,
        prix_euros: quote.prix_euros,
        message: data.message || '',
      });

      setStep('success');
    } catch (error) {
      console.error('Erreur réservation:', error);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer ou nous appeler.');
      setStep('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    setQuote(null);
    setSelectedDate(undefined);
    setErrorMessage('');
    setStep('initial');
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setValue('date', date);
    }
  };

  return (
    <>
      {/* Initial Form - Inline in Hero - Horizontal on all screens */}
      <div className="flex flex-row gap-3 flex-wrap justify-center lg:justify-start">
        {/* Départ Input - Simple */}
        <div className="relative w-32 sm:w-40 md:w-44 flex-shrink-0">
          <MapPin 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" 
            size={16} 
            strokeWidth={1.5}
          />
          <input
            {...register('depart')}
            type="text"
            placeholder="Adresse de départ"
            className="w-full pl-10 pr-3 py-3 bg-transparent border border-white/30 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors duration-300 font-extralight text-sm"
          />
        </div>
        
        {/* Arrivée Input - Simple */}
        <div className="relative w-32 sm:w-40 md:w-44 flex-shrink-0">
          <Flag 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" 
            size={16} 
            strokeWidth={1.5}
          />
          <input
            {...register('arrivee')}
            type="text"
            placeholder="Adresse d'arrivée"
            className="w-full pl-10 pr-3 py-3 bg-transparent border border-white/30 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors duration-300 font-extralight text-sm"
          />
        </div>
        
        {/* Submit Button */}
        <button
          onClick={handleGetQuote}
          disabled={isLoading}
          className="bg-[#001F3F] text-white px-6 py-3 rounded font-light transition-all duration-300 hover:bg-[#003366] border border-transparent text-sm tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              CALCUL...
            </>
          ) : (
            'RÉSERVER'
          )}
        </button>
      </div>

      {errorMessage && step === 'initial' && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-2 font-light"
        >
          {errorMessage}
        </motion.p>
      )}

      {/* Modal for details/confirmation */}
      <AnimatePresence>
        {(step === 'details' || step === 'quote' || step === 'success' || step === 'error') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={(e) => e.target === e.currentTarget && handleReset()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-light tracking-wide text-gray-900">
                  {step === 'success' ? 'Réservation confirmée' : step === 'error' ? 'Erreur' : 'Votre trajet'}
                </h2>
                <button
                  onClick={handleReset}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {step === 'success' ? (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto text-green-500 mb-4" size={64} strokeWidth={1} />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Merci pour votre réservation !</h3>
                    <p className="text-gray-600 mb-4">
                      Nous vous contacterons rapidement pour confirmer votre trajet.
                    </p>
                    {quote && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <p className="text-2xl font-light text-gray-900">{quote.prix_euros.toFixed(2)} €</p>
                        <p className="text-sm text-gray-500">{quote.distance_km} km</p>
                      </div>
                    )}
                    <Button onClick={handleReset} className="w-full">
                      Nouvelle réservation
                    </Button>
                  </div>
                ) : step === 'error' ? (
                  <div className="text-center py-8">
                    <AlertCircle className="mx-auto text-red-500 mb-4" size={64} strokeWidth={1} />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Une erreur est survenue</h3>
                    <p className="text-gray-600 mb-4">{errorMessage}</p>
                    <p className="text-gray-600 mb-6">
                      Appelez-nous au <a href="tel:0784628640" className="text-black font-medium">07 84 62 86 40</a>
                    </p>
                    <Button onClick={handleReset} variant="outline" className="w-full">
                      Réessayer
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Quote Display */}
                    {quote && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500">Estimation</p>
                            <p className="text-3xl font-light text-gray-900">{quote.prix_euros.toFixed(2)} €</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Distance</p>
                            <p className="text-xl font-light text-gray-900">{quote.distance_km} km</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Route summary */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="text-gray-400 mt-0.5 shrink-0" size={18} />
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">Départ</p>
                          <p className="text-sm text-gray-900">{watchedDepart}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Flag className="text-gray-400 mt-0.5 shrink-0" size={18} />
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">Arrivée</p>
                          <p className="text-sm text-gray-900">{watchedArrivee}</p>
                        </div>
                      </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1.5">Date</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal h-11",
                                !selectedDate && "text-gray-400"
                              )}
                            >
                              <Clock className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Choisir"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={handleDateSelect}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        {errors.date && (
                          <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1.5">Heure</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            {...register('heure')}
                            type="time"
                            className="w-full h-11 pl-10 pr-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          />
                        </div>
                        {errors.heure && (
                          <p className="text-red-500 text-xs mt-1">{errors.heure.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Personal Info */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Nom complet</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          {...register('nom')}
                          type="text"
                          placeholder="Jean Dupont"
                          className="w-full h-11 pl-10 pr-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                      </div>
                      {errors.nom && (
                        <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Téléphone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          {...register('telephone')}
                          type="tel"
                          placeholder="06 12 34 56 78"
                          className="w-full h-11 pl-10 pr-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                      </div>
                      {errors.telephone && (
                        <p className="text-red-500 text-xs mt-1">{errors.telephone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="jean.dupont@email.com"
                          className="w-full h-11 pl-10 pr-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">
                        Message ou précisions <span className="text-gray-400">(optionnel)</span>
                      </label>
                      <textarea
                        {...register('message')}
                        placeholder="Informations complémentaires, demandes spéciales..."
                        rows={3}
                        className="w-full pl-3 pr-3 pt-2.5 pb-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {errorMessage && (
                      <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 bg-black hover:bg-gray-800 text-white font-light tracking-wide"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin mr-2" size={18} />
                          Réservation en cours...
                        </>
                      ) : (
                        `Confirmer - ${quote?.prix_euros.toFixed(2)} €`
                      )}
                    </Button>

                    <p className="text-xs text-gray-400 text-center">
                      En confirmant, vous acceptez nos conditions générales
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BookingForm;
