import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, Star, CheckCircle } from "lucide-react";

const TaxiVitrolles = () => {
  const schemaLocal = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Taxi Malacrida — Vitrolles",
    "description": "Service de taxi et VTC à Vitrolles : transferts aéroport Marseille-Provence, gares, hôpitaux et déplacements longue distance. Disponible 24h/24.",
    "url": "https://www.taximalacrida.fr/taxi-vitrolles",
    "telephone": "+33600000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Vitrolles",
      "addressLocality": "Vitrolles",
      "postalCode": "13127",
      "addressCountry": "FR"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 43.461, "longitude": 5.248 },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "€€",
    "areaServed": "Vitrolles",
    "serviceType": "Taxi et VTC"
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.taximalacrida.fr/" },
      { "@type": "ListItem", "position": 2, "name": "Taxi Vitrolles", "item": "https://www.taximalacrida.fr/taxi-vitrolles" }
    ]
  };

  const schemaFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Combien coûte un taxi de Vitrolles à l'aéroport Marseille-Provence ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Le tarif fixe entre Vitrolles et l'aéroport Marseille-Provence est d'environ 25 à 35 €. Vitrolles étant adjacente à l'aéroport, la course est très courte. Contactez Taxi Malacrida pour un devis précis." }
      },
      {
        "@type": "Question",
        "name": "Peut-on commander un taxi à Vitrolles pour aller à Aix-en-Provence ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Oui, Taxi Malacrida assure des transferts réguliers entre Vitrolles et Aix-en-Provence. Le trajet dure environ 20 à 30 minutes. Réservation possible à l'avance ou à la demande." }
      },
      {
        "@type": "Question",
        "name": "Existe-t-il un taxi VTC à Vitrolles disponible la nuit ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Oui, Taxi Malacrida intervient à Vitrolles 24h/24, 7j/7, y compris la nuit et les jours fériés. Disponibilité garantie pour les vols tôt le matin ou tard le soir." }
      },
      {
        "@type": "Question",
        "name": "Taxi Malacrida propose-t-il des courses médicales à Vitrolles ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Oui, nous assurons le transport vers les hôpitaux et cliniques : Hôpital Nord, Timone, cliniques d'Aix et de Marseille." }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Taxi Vitrolles — Taxi et VTC Aéroport Marseille | Taxi Malacrida</title>
        <meta name="description" content="Taxi à Vitrolles 24h/24 : transferts aéroport Marseille-Provence, Aix-en-Provence, gares et hôpitaux. Réservation rapide, tarifs fixes, véhicule Tesla haut de gamme." />
        <link rel="canonical" href="https://www.taximalacrida.fr/taxi-vitrolles" />
        <script type="application/ld+json">{JSON.stringify(schemaLocal)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFaq)}</script>
      </Helmet>
      <Header />
      <main>
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4 text-yellow-400">
              <MapPin size={20} />
              <span className="text-sm font-medium uppercase tracking-wide">Vitrolles — Bouches-du-Rhône</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Taxi Vitrolles<br />
              <span className="text-yellow-400">et Aéroport Marseille-Provence</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Vitrolles, ville porte de l'aéroport Marseille-Provence. Taxi Malacrida vous transporte
              vers l'aéroport, Aix-en-Provence, les gares et hôpitaux. Disponible 24h/24, 7j/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold">
                <a href="tel:+33600000000"><Phone size={20} className="mr-2" />Appeler maintenant</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                <a href="/#reservation">Réserver en ligne</a>
              </Button>
            </div>
          </div>
        </section>
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Disponible 24h/24", desc: "Nuit, week-end et jours fériés inclus" },
              { title: "Véhicule Tesla premium", desc: "Confort optimal, climatisation, Wi-Fi" },
              { title: "Tarifs fixes garantis", desc: "Prix annoncé à la réservation, sans surprise" }
            ].map(({ title, desc }) => (
              <div key={title} className="text-center p-6 rounded-xl border border-gray-100 shadow-sm">
                <CheckCircle size={32} className="text-yellow-400 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">Nos services de taxi à Vitrolles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Transfert aéroport Marseille-Provence", desc: "Vitrolles est la commune limitrophe de l'aéroport. Prise en charge à domicile et dépose aux terminaux, à l'heure." },
                { title: "Taxi Vitrolles vers Aix-en-Provence", desc: "Liaison directe vers le centre d'Aix ou la Gare TGV. Environ 20-30 min, tarif fixe convenu à la réservation." },
                { title: "Transport médical non urgent", desc: "Accompagnement vers Hôpital Nord, Timone, cliniques d'Aix-en-Provence et Marseille." },
                { title: "Mise à disposition et longue distance", desc: "Chauffeur disponible pour la journée ou des trajets vers Paris, Lyon, Nice ou Monaco." }
              ].map(({ title, desc }) => (
                <div key={title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">Tarifs indicatifs depuis Vitrolles</h2>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="text-left px-4 py-3">Destination</th>
                    <th className="text-right px-4 py-3">Tarif indicatif</th>
                    <th className="text-right px-4 py-3">Durée</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Aéroport Marseille-Provence", "25 – 35 €", "5 – 10 min"],
                    ["Aix-en-Provence Centre", "35 – 50 €", "20 – 30 min"],
                    ["Gare TGV Aix-en-Provence", "30 – 45 €", "15 – 25 min"],
                    ["Marseille Centre", "45 – 65 €", "30 – 45 min"],
                    ["Gare Saint-Charles", "45 – 60 €", "30 – 40 min"]
                  ].map(([dest, prix, duree]) => (
                    <tr key={dest} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">{dest}</td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">{prix}</td>
                      <td className="px-4 py-3 text-right text-gray-500">{duree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">Tarifs indicatifs, variables selon heure et trafic. Devis précis sur demande.</p>
          </div>
        </section>
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">Questions fréquentes — Taxi Vitrolles</h2>
            <div className="space-y-4">
              {schemaFaq.mainEntity.map((q) => (
                <details key={q.name} className="bg-white rounded-xl border border-gray-100 shadow-sm">
                  <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    {q.name}<span className="text-yellow-400 text-xl">+</span>
                  </summary>
                  <div className="px-6 pb-4 text-gray-600 text-sm">{q.acceptedAnswer.text}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12 px-4 bg-gray-900 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Réservez votre taxi à Vitrolles</h2>
            <p className="text-gray-300 mb-8">Disponible 24h/24 — Réponse immédiate par téléphone ou formulaire en ligne.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold">
                <a href="tel:+33600000000"><Phone size={20} className="mr-2" />Appeler maintenant</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                <a href="/#reservation">Réserver en ligne</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TaxiVitrolles;