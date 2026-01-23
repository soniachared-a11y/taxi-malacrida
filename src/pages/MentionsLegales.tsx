import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-charcoal text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif">Mentions Légales</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {/* Éditeur */}
          <section>
            <h2 className="text-2xl font-serif text-charcoal mb-6">Éditeur du site</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-3 font-light text-charcoal-light">
              <p><strong className="text-charcoal">Nom :</strong> Taxi Malacrida Aix-en-Provence</p>
              <p><strong className="text-charcoal">Activité :</strong> Transports de voyageurs par taxis</p>
              <p><strong className="text-charcoal">SIRET :</strong> 884 511 346 00022</p>
              <p><strong className="text-charcoal">Code APE :</strong> 4932Z</p>
              <p><strong className="text-charcoal">Adresse postale :</strong> 18 avenue Henri Malacrida, 13100 Aix-en-Provence</p>
              <p><strong className="text-charcoal">Adresse d'exploitation :</strong> 14 avenue Cible, 13100 Aix-en-Provence</p>
              <p><strong className="text-charcoal">Téléphone :</strong> <a href="tel:0784628640" className="text-gold hover:underline">07 84 62 86 40</a></p>
              <p><strong className="text-charcoal">Email :</strong> <a href="mailto:contact@taximalacrida.fr" className="text-gold hover:underline">contact@taximalacrida.fr</a></p>
            </div>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-2xl font-serif text-charcoal mb-6">Services proposés</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm font-light text-charcoal-light">
              <ul className="space-y-2">
                <li>• Courses toutes distances</li>
                <li>• Transferts gares (Aix-en-Provence TGV, Marseille Saint-Charles)</li>
                <li>• Transferts aéroports (Marseille Provence, Nice Côte d'Azur)</li>
                <li>• Déplacements dans toute la région PACA</li>
                <li>• Véhicule : Tesla Model Y 2025</li>
                <li>• Disponibilité : 24h/24, 7j/7</li>
              </ul>
            </div>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-2xl font-serif text-charcoal mb-6">Hébergement</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm font-light text-charcoal-light">
              <p>Ce site est hébergé par Vercel Inc.</p>
              <p className="mt-2">440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl font-serif text-charcoal mb-6">Propriété intellectuelle</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm font-light text-charcoal-light leading-relaxed">
              <p>
                L'ensemble du contenu de ce site (textes, images, logos, éléments graphiques) 
                est la propriété exclusive de Taxi Malacrida Aix-en-Provence, sauf mention contraire.
              </p>
              <p className="mt-4">
                Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie 
                des éléments du site est interdite sans autorisation écrite préalable.
              </p>
            </div>
          </section>

          {/* Protection des données */}
          <section>
            <h2 className="text-2xl font-serif text-charcoal mb-6">Protection des données personnelles</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm font-light text-charcoal-light leading-relaxed">
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD), 
                vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.
              </p>
              <p className="mt-4">
                Les informations collectées via les formulaires de contact et de réservation sont utilisées 
                uniquement pour le traitement de vos demandes et ne sont jamais transmises à des tiers.
              </p>
              <p className="mt-4">
                Pour exercer vos droits, contactez-nous à : <a href="mailto:contact@taximalacrida.fr" className="text-gold hover:underline">contact@taximalacrida.fr</a>
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-serif text-charcoal mb-6">Cookies</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm font-light text-charcoal-light leading-relaxed">
              <p>
                Ce site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement. 
                Aucun cookie publicitaire ou de tracking n'est utilisé.
              </p>
            </div>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-stone">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-charcoal-light hover:text-gold transition-colors font-light"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;
