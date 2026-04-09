import { useEffect } from 'react';

// ─── PAGE SEO — Taxi Salon-de-Provence ────────────────────────────────────
// Page non visible dans la navigation — indexée uniquement par Google & bots IA
// URL : /taxi-salon-de-provence

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["TaxiService", "LocalBusiness"],
  "@id": "https://www.taximalacrida.fr/taxi-salon-de-provence#service",
  "name": "Taxi Salon-de-Provence — Malacrida",
  "description": "Taxi et VTC à Salon-de-Provence. Transferts longue distance vers l'Aéroport Marseille-Provence, la Gare TGV d'Aix-en-Provence, Marseille. Chauffeur Tesla 24h/24, tarif fixe garanti sur devis.",
  "url": "https://www.taximalacrida.fr/taxi-salon-de-provence",
  "telephone": "+33784628640",
  "priceRange": "€€",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00", "closes": "23:59"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Salon-de-Provence",
    "postalCode": "13300",
    "addressRegion": "Provence-Alpes-Côte d'Azur",
    "addressCountry": "FR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 43.6406, "longitude": 5.0974 },
  "areaServed": [
    { "@type": "City", "name": "Salon-de-Provence" },
    { "@type": "City", "name": "Aix-en-Provence" },
    { "@type": "City", "name": "Istres" },
    { "@type": "City", "name": "Miramas" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Taxi Salon-de-Provence → Aéroport Marseille-Provence" }, "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Taxi Salon-de-Provence → Gare TGV Aix-en-Provence" }, "priceCurrency": "EUR" }
    ]
  },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "bestRating": "5", "ratingCount": "47" }
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Taxi Aix-en-Provence", "item": "https://www.taximalacrida.fr/" },
    { "@type": "ListItem", "position": 2, "name": "Taxi Salon-de-Provence", "item": "https://www.taximalacrida.fr/taxi-salon-de-provence" }
  ]
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Taxi Malacrida fait-il des courses depuis Salon-de-Provence ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Oui, Taxi Malacrida intervient depuis Salon-de-Provence pour les transferts longue distance : aéroport de Marseille, Gare TGV d'Aix-en-Provence, Marseille. Contactez le 07 84 62 86 40 pour un devis personnalisé." }
    },
    {
      "@type": "Question",
      "name": "Quel est le tarif d'un taxi de Salon-de-Provence à l'aéroport de Marseille ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Le tarif d'un taxi entre Salon-de-Provence et l'Aéroport Marseille-Provence (Marignane) est calculé sur devis selon l'itinéraire exact. Prix fixe garanti à la réservation. Appelez le 07 84 62 86 40 pour obtenir votre tarif." }
    },
    {
      "@type": "Question",
      "name": "Peut-on réserver un taxi à Salon-de-Provence pour un vol tôt le matin ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Absolument. Taxi Malacrida est disponible 24h/24 depuis Salon-de-Provence, y compris pour les vols très tôt le matin. Réservez à l'avance pour garantir votre prise en charge." }
    }
  ]
};

const TaxiSalonDeProvence = () => {
  useEffect(() => {
    document.title = 'Taxi Salon-de-Provence | Malacrida — Aéroport Marseille, Gare TGV, 24h/24';
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://www.taximalacrida.fr/taxi-salon-de-provence');
    document.querySelector('meta[name="description"]')?.setAttribute('content', "Taxi et VTC à Salon-de-Provence. Transferts longue distance vers l'Aéroport Marseille-Provence, la Gare TGV d'Aix-en-Provence, Marseille. Chauffeur Tesla 24h/24, tarif fixe garanti sur devis.");

    const s1 = document.createElement('script');
    s1.type = 'application/ld+json'; s1.id = 'schema-salon-business';
    s1.textContent = JSON.stringify(SCHEMA);
    document.head.appendChild(s1);

    const s2 = document.createElement('script');
    s2.type = 'application/ld+json'; s2.id = 'schema-salon-faq';
    s2.textContent = JSON.stringify(FAQ_SCHEMA);
    document.head.appendChild(s2);

    const s3 = document.createElement('script');
    s3.type = 'application/ld+json'; s3.id = 'schema-salon-breadcrumb';
    s3.textContent = JSON.stringify(BREADCRUMB_SCHEMA);
    document.head.appendChild(s3);

    return () => {
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://www.taximalacrida.fr/');
      document.querySelector('meta[name="description"]')?.setAttribute('content', "Réservez votre chauffeur Taxi Malacrida à Aix-en-Provence et alentours. Transferts Gare TGV, Aéroport Marseille et toutes distances. Disponible 24/7.");
      document.getElementById('schema-salon-business')?.remove();
      document.getElementById('schema-salon-faq')?.remove();
      document.getElementById('schema-salon-breadcrumb')?.remove();
    };
  }, []);

  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px 60px' }}>

        <div style={{ marginBottom: '48px' }}>
          <p style={{ color: '#4a90a4', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Taxi & VTC — Salon-de-Provence</p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, letterSpacing: '1px', lineHeight: 1.2, marginBottom: '24px' }}>
            Taxi Salon-de-Provence
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.6em', fontWeight: 200, marginTop: '8px' }}>
              Aéroport Marseille, Gare TGV, longue distance — 24h/24
            </span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '17px', lineHeight: 1.7, maxWidth: '600px' }}>
            Taxi Malacrida assure les transferts longue distance depuis <strong style={{ color: '#fff' }}>Salon-de-Provence</strong> vers l'aéroport de Marseille-Provence, la Gare TGV d'Aix-en-Provence et toute la région PACA. Véhicule Tesla, tarif fixe, disponible 24h/24.
          </p>
        </div>

        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '32px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px', fontWeight: 400 }}>Tarifs depuis Salon-de-Provence</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            {[
              { from: 'Salon-de-Provence → Aéroport Marseille-Provence', price: 'sur devis' },
              { from: 'Salon-de-Provence → Gare TGV Aix-en-Provence', price: 'sur devis' },
              { from: 'Salon-de-Provence → Gare Saint-Charles Marseille', price: 'sur devis' },
              { from: 'Salon-de-Provence → Centre Aix-en-Provence', price: 'sur devis' },
            ].map(({ from, price }) => (
              <div key={from} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>{from}</span>
                <span style={{ fontWeight: 400, fontSize: '16px' }}>{price}</span>
              </div>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', marginTop: '16px' }}>Prix fixes garantis à la réservation • Aucun supplément</p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 300, marginBottom: '20px' }}>Pourquoi choisir Taxi Malacrida depuis Salon</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
            {[
              'Prise en charge à votre domicile à Salon-de-Provence',
              'Spécialiste des transferts vers l\'aéroport et les gares de la région',
              'Véhicule Tesla — confort optimal pour les longs trajets',
              'Suivi des vols en temps réel pour les transferts aéroport',
              'Tarif fixe annoncé à la réservation, sans mauvaise surprise',
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
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Devis & réservation</p>
          <a href="tel:+33784628640" style={{ display: 'inline-block', background: '#fff', color: '#000', padding: '16px 40px', borderRadius: '4px', fontSize: '18px', fontWeight: 500, textDecoration: 'none', letterSpacing: '1px' }}>
            07 84 62 86 40
          </a>
          <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>Disponible 24h/24 — Devis gratuit et immédiat</p>
          <a href="/" style={{ display: 'block', marginTop: '32px', color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>← Retour au site Taxi Malacrida</a>
        </div>

      </div>
    </main>
  );
};

export default TaxiSalonDeProvence;
