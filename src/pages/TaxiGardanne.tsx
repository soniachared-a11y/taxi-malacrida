import { useEffect } from 'react';

// ─── PAGE SEO — Taxi Gardanne ──────────────────────────────────────────────
// Page non visible dans la navigation — indexée uniquement par Google & bots IA
// URL : /taxi-gardanne

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["TaxiService", "LocalBusiness"],
  "@id": "https://www.taximalacrida.fr/taxi-gardanne#service",
  "name": "Taxi Gardanne — Malacrida",
  "description": "Taxi et VTC à Gardanne. Transferts vers l'Aéroport Marseille-Provence, la Gare TGV Aix-en-Provence, Marseille et toute la région PACA. Chauffeur Tesla 24h/24, tarif fixe garanti, aucun supplément.",
  "url": "https://www.taximalacrida.fr/taxi-gardanne",
  "telephone": "+33784628640",
  "priceRange": "€€",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00", "closes": "23:59"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Gardanne",
    "postalCode": "13120",
    "addressRegion": "Provence-Alpes-Côte d'Azur",
    "addressCountry": "FR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 43.4550, "longitude": 5.4700 },
  "areaServed": [
    { "@type": "City", "name": "Gardanne" },
    { "@type": "City", "name": "Aix-en-Provence" },
    { "@type": "City", "name": "Meyreuil" },
    { "@type": "City", "name": "Trets" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Taxi Gardanne → Aéroport Marseille-Provence" }, "price": "55", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Taxi Gardanne → Gare TGV Aix-en-Provence" }, "price": "40", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Taxi Gardanne → Centre Aix-en-Provence" }, "price": "30", "priceCurrency": "EUR" }
    ]
  },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "bestRating": "5", "ratingCount": "47" }
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Taxi Aix-en-Provence", "item": "https://www.taximalacrida.fr/" },
    { "@type": "ListItem", "position": 2, "name": "Taxi Gardanne", "item": "https://www.taximalacrida.fr/taxi-gardanne" }
  ]
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel taxi appeler à Gardanne pour l'aéroport de Marseille ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Taxi Malacrida intervient depuis Gardanne pour l'Aéroport Marseille-Provence. Tarif fixe à partir de 55€ depuis Gardanne, disponible 24h/24 7j/7. Réservez au 07 84 62 86 40." }
    },
    {
      "@type": "Question",
      "name": "Combien coûte un taxi de Gardanne à la Gare TGV d'Aix-en-Provence ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Le tarif fixe entre Gardanne et la Gare TGV d'Aix-en-Provence est à partir de 40€. Prise en charge à domicile à Gardanne, dépose directement devant la gare." }
    },
    {
      "@type": "Question",
      "name": "Y a-t-il un taxi VTC à Gardanne disponible la nuit ou le weekend ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Oui, Taxi Malacrida est disponible à Gardanne 24h/24 7j/7, y compris la nuit, les weekends et les jours fériés. Le tarif fixe reste identique, sans aucun supplément horaire." }
    }
  ]
};

const TaxiGardanne = () => {
  useEffect(() => {
    document.title = 'Taxi Gardanne | Malacrida — Aéroport Marseille, Gare TGV, Aix-en-Provence';
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://www.taximalacrida.fr/taxi-gardanne');
    document.querySelector('meta[name="description"]')?.setAttribute('content', "Taxi et VTC à Gardanne. Transferts vers l'Aéroport Marseille-Provence, la Gare TGV Aix-en-Provence, Marseille et toute la région PACA. Chauffeur Tesla 24h/24, tarif fixe garanti, aucun supplément.");

    const s1 = document.createElement('script');
    s1.type = 'application/ld+json'; s1.id = 'schema-gardanne-business';
    s1.textContent = JSON.stringify(SCHEMA);
    document.head.appendChild(s1);

    const s2 = document.createElement('script');
    s2.type = 'application/ld+json'; s2.id = 'schema-gardanne-faq';
    s2.textContent = JSON.stringify(FAQ_SCHEMA);
    document.head.appendChild(s2);

    const s3 = document.createElement('script');
    s3.type = 'application/ld+json'; s3.id = 'schema-gardanne-breadcrumb';
    s3.textContent = JSON.stringify(BREADCRUMB_SCHEMA);
    document.head.appendChild(s3);

    return () => {
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://www.taximalacrida.fr/');
      document.querySelector('meta[name="description"]')?.setAttribute('content', "Réservez votre chauffeur Taxi Malacrida à Aix-en-Provence et alentours. Transferts Gare TGV, Aéroport Marseille et toutes distances. Disponible 24/7.");
      document.getElementById('schema-gardanne-business')?.remove();
      document.getElementById('schema-gardanne-faq')?.remove();
      document.getElementById('schema-gardanne-breadcrumb')?.remove();
    };
  }, []);

  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px 60px' }}>

        <div style={{ marginBottom: '48px' }}>
          <p style={{ color: '#4a90a4', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Taxi & VTC — Gardanne</p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, letterSpacing: '1px', lineHeight: 1.2, marginBottom: '24px' }}>
            Taxi Gardanne
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.6em', fontWeight: 200, marginTop: '8px' }}>
              Aéroport Marseille, Gare TGV, Aix-en-Provence — 24h/24
            </span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '17px', lineHeight: 1.7, maxWidth: '600px' }}>
            Taxi Malacrida dessert <strong style={{ color: '#fff' }}>Gardanne</strong> et ses environs pour tous vos transferts. Aéroport de Marignane, Gare TGV d'Aix, centre-ville. Chauffeur Tesla, tarif fixe, disponible 24h/24 7j/7.
          </p>
        </div>

        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '32px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px', fontWeight: 400 }}>Tarifs depuis Gardanne</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            {[
              { from: 'Gardanne → Centre Aix-en-Provence', price: 'dès 30€' },
              { from: 'Gardanne → Gare TGV Aix-en-Provence', price: 'dès 40€' },
              { from: 'Gardanne → Aéroport Marseille-Provence', price: 'dès 55€' },
              { from: 'Gardanne → Gare Saint-Charles', price: 'sur devis' },
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
          <h2 style={{ fontSize: '20px', fontWeight: 300, marginBottom: '20px' }}>Le service à Gardanne</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
            {[
              'Prise en charge à domicile à Gardanne et dans toutes les communes voisines',
              'Transferts vers l\'aéroport avec suivi des vols en temps réel',
              'Véhicule Tesla — silence et confort pour vos déplacements professionnels',
              'Disponible 24h/24, réservation jusqu\'à 3 mois à l\'avance',
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

export default TaxiGardanne;
