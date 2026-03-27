import { useEffect } from 'react';

// ─── PAGE SEO — Taxi Pertuis ───────────────────────────────────────────────
// Page non visible dans la navigation — indexée uniquement par Google & bots IA
// URL : /taxi-pertuis

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["TaxiService", "LocalBusiness"],
  "@id": "https://www.taximalacrida.fr/taxi-pertuis#service",
  "name": "Taxi Pertuis — Malacrida",
  "description": "Taxi et VTC à Pertuis. Transferts vers l'Aéroport Marseille-Provence, la Gare TGV Aix-en-Provence, Marseille et toute la région PACA. Chauffeur Tesla 24h/24, tarif fixe garanti.",
  "url": "https://www.taximalacrida.fr/taxi-pertuis",
  "telephone": "+33784628640",
  "priceRange": "€€",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00", "closes": "23:59"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Pertuis",
    "postalCode": "84120",
    "addressRegion": "Provence-Alpes-Côte d'Azur",
    "addressCountry": "FR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 43.6950, "longitude": 5.5020 },
  "areaServed": [
    { "@type": "City", "name": "Pertuis" },
    { "@type": "City", "name": "Aix-en-Provence" },
    { "@type": "City", "name": "Meyrargues" },
    { "@type": "City", "name": "La Roque-d'Anthéron" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Taxi Pertuis → Gare TGV Aix-en-Provence" }, "price": "45", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Taxi Pertuis → Aéroport Marseille-Provence" }, "price": "70", "priceCurrency": "EUR" }
    ]
  },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "bestRating": "5", "ratingCount": "47" }
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Taxi Aix-en-Provence", "item": "https://www.taximalacrida.fr/" },
    { "@type": "ListItem", "position": 2, "name": "Taxi Pertuis", "item": "https://www.taximalacrida.fr/taxi-pertuis" }
  ]
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel taxi à Pertuis pour l'aéroport de Marseille ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Taxi Malacrida intervient depuis Pertuis pour l'Aéroport Marseille-Provence. Tarif fixe à partir de 70€ depuis Pertuis, disponible 24h/24 7j/7. Réservation : 07 84 62 86 40." }
    },
    {
      "@type": "Question",
      "name": "Combien coûte un taxi de Pertuis à la Gare TGV d'Aix-en-Provence ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Le tarif fixe entre Pertuis et la Gare TGV d'Aix-en-Provence est à partir de 45€. Prise en charge à domicile à Pertuis, dépose directement à la gare." }
    }
  ]
};

const TaxiPertuis = () => {
  useEffect(() => {
    document.title = 'Taxi Pertuis | Malacrida — Aéroport Marseille, Gare TGV, Aix-en-Provence';

    const s1 = document.createElement('script');
    s1.type = 'application/ld+json'; s1.id = 'schema-pertuis-business';
    s1.textContent = JSON.stringify(SCHEMA);
    document.head.appendChild(s1);

    const s2 = document.createElement('script');
    s2.type = 'application/ld+json'; s2.id = 'schema-pertuis-faq';
    s2.textContent = JSON.stringify(FAQ_SCHEMA);
    document.head.appendChild(s2);

    const s3 = document.createElement('script');
    s3.type = 'application/ld+json'; s3.id = 'schema-pertuis-breadcrumb';
    s3.textContent = JSON.stringify(BREADCRUMB_SCHEMA);
    document.head.appendChild(s3);

    return () => {
      document.getElementById('schema-pertuis-business')?.remove();
      document.getElementById('schema-pertuis-faq')?.remove();
      document.getElementById('schema-pertuis-breadcrumb')?.remove();
    };
  }, []);

  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px 60px' }}>

        <div style={{ marginBottom: '48px' }}>
          <p style={{ color: '#4a90a4', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Taxi & VTC — Pertuis</p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, letterSpacing: '1px', lineHeight: 1.2, marginBottom: '24px' }}>
            Taxi Pertuis
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.6em', fontWeight: 200, marginTop: '8px' }}>
              Aéroport, Gare TGV, Aix-en-Provence — 24h/24
            </span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '17px', lineHeight: 1.7, maxWidth: '600px' }}>
            Taxi Malacrida dessert <strong style={{ color: '#fff' }}>Pertuis</strong> et ses environs (Meyrargues, La Roque-d'Anthéron) pour tous vos transferts vers les gares, l'aéroport et les grandes villes de la région PACA. Véhicule Tesla, tarif fixe, 24h/24.
          </p>
        </div>

        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '32px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px', fontWeight: 400 }}>Tarifs depuis Pertuis</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            {[
              { dest: 'Gare TGV Aix-en-Provence', price: 'dès 45€' },
              { dest: 'Aéroport Marseille-Provence', price: 'dès 70€' },
              { dest: 'Centre Aix-en-Provence', price: 'dès 50€' },
              { dest: 'Gare Saint-Charles Marseille', price: 'dès 80€' },
            ].map(({ dest, price }) => (
              <div key={dest} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>Pertuis → {dest}</span>
                <span style={{ fontWeight: 400, fontSize: '16px' }}>{price}</span>
              </div>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', marginTop: '16px' }}>Prix fixes • Sans supplément nuit</p>
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
          <a href="tel:+33784628640" style={{ display: 'inline-block', background: '#fff', color: '#000', padding: '16px 40px', borderRadius: '4px', fontSize: '18px', fontWeight: 500, textDecoration: 'none', letterSpacing: '1px' }}>07 84 62 86 40</a>
          <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>Disponible 24h/24</p>
          <a href="/" style={{ display: 'block', marginTop: '32px', color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>← Retour au site Taxi Malacrida</a>
        </div>

      </div>
    </main>
  );
};

export default TaxiPertuis;
