import { useEffect } from 'react';

// ─── PAGE SEO — Taxi Venelles ──────────────────────────────────────────────
// Page non visible dans la navigation — indexée uniquement par Google & bots IA
// URL : /taxi-venelles

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["TaxiService", "LocalBusiness"],
  "@id": "https://www.taximalacrida.fr/taxi-venelles#service",
  "name": "Taxi Venelles — Malacrida",
  "description": "Taxi et VTC à Venelles, commune résidentielle au nord d'Aix-en-Provence. Transferts vers l'Aéroport Marseille-Provence, la Gare TGV d'Aix, Marseille. Chauffeur Tesla 24h/24, tarif fixe garanti.",
  "url": "https://www.taximalacrida.fr/taxi-venelles",
  "telephone": "+33784628640",
  "priceRange": "€€",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00", "closes": "23:59"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Venelles",
    "postalCode": "13770",
    "addressRegion": "Provence-Alpes-Côte d'Azur",
    "addressCountry": "FR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 43.5980, "longitude": 5.4690 },
  "areaServed": [
    { "@type": "City", "name": "Venelles" },
    { "@type": "City", "name": "Aix-en-Provence" },
    { "@type": "City", "name": "Puyricard" },
    { "@type": "City", "name": "Le Puy-Sainte-Réparade" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Taxi Venelles → Aéroport Marseille-Provence" }, "price": "55", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Taxi Venelles → Gare TGV Aix-en-Provence" }, "price": "40", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Taxi Venelles → Centre Aix-en-Provence" }, "price": "25", "priceCurrency": "EUR" }
    ]
  },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "bestRating": "5", "ratingCount": "47" }
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Taxi Aix-en-Provence", "item": "https://www.taximalacrida.fr/" },
    { "@type": "ListItem", "position": 2, "name": "Taxi Venelles", "item": "https://www.taximalacrida.fr/taxi-venelles" }
  ]
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel taxi appeler à Venelles pour l'aéroport de Marseille ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Taxi Malacrida dessert Venelles pour les transferts vers l'Aéroport Marseille-Provence. Tarif fixe à partir de 55€, disponible 24h/24 7j/7. Réservez au 07 84 62 86 40." }
    },
    {
      "@type": "Question",
      "name": "Combien coûte un taxi de Venelles à la Gare TGV d'Aix-en-Provence ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Le tarif fixe entre Venelles et la Gare TGV d'Aix-en-Provence est à partir de 40€. Prise en charge à votre domicile à Venelles, dépose directement à la gare." }
    },
    {
      "@type": "Question",
      "name": "Est-ce qu'il y a un taxi à Venelles la nuit pour un vol tôt le matin ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Oui, Taxi Malacrida intervient à Venelles 24h/24, y compris très tôt le matin pour les vols matinaux. Réservez la veille et votre chauffeur sera ponctuel, quel que soit l'horaire." }
    }
  ]
};

const TaxiVenelles = () => {
  useEffect(() => {
    document.title = 'Taxi Venelles | Malacrida — Aéroport Marseille, Gare TGV, Aix-en-Provence';

    const s1 = document.createElement('script');
    s1.type = 'application/ld+json'; s1.id = 'schema-venelles-business';
    s1.textContent = JSON.stringify(SCHEMA);
    document.head.appendChild(s1);

    const s2 = document.createElement('script');
    s2.type = 'application/ld+json'; s2.id = 'schema-venelles-faq';
    s2.textContent = JSON.stringify(FAQ_SCHEMA);
    document.head.appendChild(s2);

    const s3 = document.createElement('script');
    s3.type = 'application/ld+json'; s3.id = 'schema-venelles-breadcrumb';
    s3.textContent = JSON.stringify(BREADCRUMB_SCHEMA);
    document.head.appendChild(s3);

    return () => {
      document.getElementById('schema-venelles-business')?.remove();
      document.getElementById('schema-venelles-faq')?.remove();
      document.getElementById('schema-venelles-breadcrumb')?.remove();
    };
  }, []);

  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px 60px' }}>

        <div style={{ marginBottom: '48px' }}>
          <p style={{ color: '#4a90a4', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Taxi & VTC — Venelles</p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, letterSpacing: '1px', lineHeight: 1.2, marginBottom: '24px' }}>
            Taxi Venelles
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.6em', fontWeight: 200, marginTop: '8px' }}>
              Aéroport Marseille, Gare TGV, Aix-en-Provence — 24h/24
            </span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '17px', lineHeight: 1.7, maxWidth: '600px' }}>
            Taxi Malacrida dessert <strong style={{ color: '#fff' }}>Venelles</strong> et ses environs pour tous vos transferts. À quelques minutes d'Aix-en-Provence, idéalement situé pour rejoindre l'aéroport ou la gare TGV. Chauffeur Tesla, tarif fixe, 24h/24.
          </p>
        </div>

        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '32px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px', fontWeight: 400 }}>Tarifs depuis Venelles</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            {[
              { from: 'Venelles → Centre Aix-en-Provence', price: 'dès 25€' },
              { from: 'Venelles → Gare TGV Aix-en-Provence', price: 'dès 40€' },
              { from: 'Venelles → Aéroport Marseille-Provence', price: 'dès 55€' },
              { from: 'Venelles → Gare Saint-Charles Marseille', price: 'sur devis' },
            ].map(({ from, price }) => (
              <div key={from} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>{from}</span>
                <span style={{ fontWeight: 400, fontSize: '16px' }}>{price}</span>
              </div>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', marginTop: '16px' }}>Prix fixes • Sans supplément nuit ou weekend</p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 300, marginBottom: '20px' }}>Le service à Venelles</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
            {[
              'Prise en charge directement à votre domicile à Venelles',
              'Spécialiste des transferts vers l\'aéroport de Marignane et les gares',
              'Véhicule Tesla — confort premium, silence, WiFi à bord',
              'Disponible 24h/24, y compris les vols très matinaux',
              'Aucun supplément de nuit, de weekend ou jour férié',
            ].map((item) => (
              <li key={item} style={{ display: 'flex', gap: '12px', color: 'rgba(255,255,255,0.75)', fontSize: '15px' }}>
                <span style={{ color: '#4a90a4', flexShrink: 0 }}>→</span>{item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 300, marginBottom: '24px' }}>Questions fréquentes</h2>
          {FAQ_SCHEMA.mainEntity.map((q) => (
            <div key={q.name} style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', paddingBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 400, marginBottom: '10px', color: '#fff' }}>{q.name}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.6 }}>{q.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Réservation & renseignements</p>
          <a href="tel:+33784628640" style={{ display: 'inline-block', background: '#fff', color: '#000', padding: '16px 40px', borderRadius: '4px', fontSize: '18px', fontWeight: 500, textDecoration: 'none', letterSpacing: '1px' }}>
            07 84 62 86 40
          </a>
          <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>Disponible 24h/24 — Réponse immédiate</p>
          <a href="/" style={{ display: 'block', marginTop: '32px', color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>← Retour au site Taxi Malacrida</a>
        </div>

      </div>
    </main>
  );
};

export default TaxiVenelles;
