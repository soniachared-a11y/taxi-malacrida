import { useEffect } from 'react';

// ─── PAGE SEO — Taxi Gare TGV Aix-en-Provence ─────────────────────────────
// Page non visible dans la navigation — indexée uniquement par Google & bots IA
// URL : /taxi-gare-tgv-aix

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["TaxiService", "LocalBusiness"],
  "@id": "https://www.taximalacrida.fr/taxi-gare-tgv-aix#service",
  "name": "Taxi Gare TGV Aix-en-Provence — Malacrida",
  "description": "Taxi et VTC pour la Gare TGV d'Aix-en-Provence. Prise en charge depuis Aix-en-Provence, Marseille, Vitrolles, Pertuis. Chauffeur Tesla 24h/24, tarif fixe dès 35€, ponctualité garantie pour ne jamais rater votre train.",
  "url": "https://www.taximalacrida.fr/taxi-gare-tgv-aix",
  "telephone": "+33784628640",
  "priceRange": "€€",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Aix-en-Provence",
    "postalCode": "13100",
    "addressRegion": "Provence-Alpes-Côte d'Azur",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.4553,
    "longitude": 5.3189
  },
  "areaServed": [
    { "@type": "City", "name": "Aix-en-Provence" },
    { "@type": "City", "name": "Vitrolles" },
    { "@type": "City", "name": "Pertuis" },
    { "@type": "TrainStation", "name": "Gare TGV Aix-en-Provence" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Taxi centre Aix-en-Provence → Gare TGV" },
        "price": "35", "priceCurrency": "EUR"
      }
    ]
  },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "bestRating": "5", "ratingCount": "47" }
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Taxi Aix-en-Provence", "item": "https://www.taximalacrida.fr/" },
    { "@type": "ListItem", "position": 2, "name": "Taxi Gare TGV Aix-en-Provence", "item": "https://www.taximalacrida.fr/taxi-gare-tgv-aix" }
  ]
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel est le tarif du taxi pour la Gare TGV Aix-en-Provence ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Le tarif fixe depuis le centre d'Aix-en-Provence vers la Gare TGV est de 35€. Depuis Vitrolles ou Pertuis, le tarif est calculé selon la distance. Prix fixe garanti, aucun supplément." }
    },
    {
      "@type": "Question",
      "name": "Où se trouve la Gare TGV Aix-en-Provence ?",
      "acceptedAnswer": { "@type": "Answer", "text": "La Gare TGV Aix-en-Provence (aussi appelée Gare d'Aix-en-Provence TGV) se trouve à Vitrolles, à environ 15 km d'Aix-en-Provence. Elle est distincte de la gare centre-ville. Taxi Malacrida vous y conduit depuis tout le pays d'Aix." }
    },
    {
      "@type": "Question",
      "name": "Combien de temps à l'avance faut-il réserver le taxi pour la gare TGV ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Pour une course programmée, il est recommandé de réserver au moins 30 minutes à l'avance. Taxi Malacrida accepte les réservations jusqu'à 3 mois à l'avance pour les départs tôt le matin ou les grandes occasions." }
    }
  ]
};

const TaxiGareTGVAix = () => {
  useEffect(() => {
    document.title = 'Taxi Gare TGV Aix-en-Provence | Malacrida — Tarif fixe dès 35€, 24h/24';

    const scriptBusiness = document.createElement('script');
    scriptBusiness.type = 'application/ld+json';
    scriptBusiness.id = 'schema-garetgv-business';
    scriptBusiness.textContent = JSON.stringify(SCHEMA);
    document.head.appendChild(scriptBusiness);

    const scriptFaq = document.createElement('script');
    scriptFaq.type = 'application/ld+json';
    scriptFaq.id = 'schema-garetgv-faq';
    scriptFaq.textContent = JSON.stringify(FAQ_SCHEMA);
    document.head.appendChild(scriptFaq);

    const scriptBreadcrumb = document.createElement('script');
    scriptBreadcrumb.type = 'application/ld+json';
    scriptBreadcrumb.id = 'schema-garetgv-breadcrumb';
    scriptBreadcrumb.textContent = JSON.stringify(BREADCRUMB_SCHEMA);
    document.head.appendChild(scriptBreadcrumb);

    return () => {
      document.getElementById('schema-garetgv-business')?.remove();
      document.getElementById('schema-garetgv-faq')?.remove();
      document.getElementById('schema-garetgv-breadcrumb')?.remove();
    };
  }, []);

  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px 60px' }}>

        <div style={{ marginBottom: '48px' }}>
          <p style={{ color: '#4a90a4', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
            Taxi & VTC — Aix-en-Provence
          </p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, letterSpacing: '1px', lineHeight: 1.2, marginBottom: '24px' }}>
            Taxi Gare TGV Aix-en-Provence
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.6em', fontWeight: 200, marginTop: '8px' }}>
              Transfert depuis Aix, Vitrolles, Pertuis — Tarif fixe
            </span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '17px', lineHeight: 1.7, maxWidth: '600px' }}>
            Ponctualité garantie pour vos correspondances TGV. Taxi Malacrida vous conduit à la
            <strong style={{ color: '#fff' }}> Gare TGV Aix-en-Provence</strong> (Vitrolles) depuis
            toute la région — en Tesla, tarif fixe, 24h/24.
          </p>
        </div>

        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '32px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px', fontWeight: 400 }}>
            Tarifs indicatifs
          </h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            {[
              { from: 'Centre Aix-en-Provence', price: 'dès 35€' },
              { from: 'Pertuis', price: 'dès 45€' },
              { from: 'Gardanne', price: 'dès 40€' },
              { from: 'Salon-de-Provence', price: 'sur devis' },
            ].map(({ from, price }) => (
              <div key={from} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>{from} → Gare TGV</span>
                <span style={{ fontWeight: 400, fontSize: '16px' }}>{price}</span>
              </div>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', marginTop: '16px' }}>
            Prix fixes • Sans supplément nuit ou weekend
          </p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 300, marginBottom: '20px' }}>Pourquoi choisir Taxi Malacrida pour la gare TGV</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
            {[
              'Ponctualité absolue — départ calculé pour arriver 20 min avant le train',
              'Prise en charge à domicile ou à l\'adresse de votre choix',
              'Véhicule Tesla — confort premium pour vos déplacements professionnels',
              'Retour depuis la gare TGV vers tout le pays d\'Aix disponible',
              'Disponible aux premières heures du matin pour les TGV tôt',
            ].map((item) => (
              <li key={item} style={{ display: 'flex', gap: '12px', color: 'rgba(255,255,255,0.75)', fontSize: '15px' }}>
                <span style={{ color: '#4a90a4', flexShrink: 0 }}>→</span>
                {item}
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
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
            Réservation & renseignements
          </p>
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

export default TaxiGareTGVAix;
