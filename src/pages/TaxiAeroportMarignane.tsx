import { useEffect } from 'react';

// ─── PAGE SEO — Taxi Aéroport Marseille-Provence (Marignane) ───────────────
// Page non visible dans la navigation — indexée uniquement par Google & bots IA
// URL : /taxi-aeroport-marignane

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["TaxiService", "LocalBusiness"],
  "@id": "https://www.taximalacrida.fr/taxi-aeroport-marignane#service",
  "name": "Taxi Aéroport Marseille-Provence — Malacrida",
  "description": "Service de taxi et VTC depuis Aix-en-Provence vers l'Aéroport Marseille-Provence de Marignane. Chauffeur Tesla 24h/24, tarif fixe 50€, suivi des vols en temps réel, accueil avec panneau nominatif au Hall des arrivées.",
  "url": "https://www.taximalacrida.fr/taxi-aeroport-marignane",
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
    "addressLocality": "Marignane",
    "postalCode": "13700",
    "addressRegion": "Provence-Alpes-Côte d'Azur",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.4356,
    "longitude": 5.2218
  },
  "areaServed": [
    { "@type": "City", "name": "Aix-en-Provence" },
    { "@type": "City", "name": "Marignane" },
    { "@type": "Airport", "name": "Aéroport Marseille-Provence" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Taxi Aix-en-Provence → Aéroport Marseille-Provence" },
        "price": "50", "priceCurrency": "EUR"
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
    { "@type": "ListItem", "position": 2, "name": "Taxi Aéroport Marseille-Provence", "item": "https://www.taximalacrida.fr/taxi-aeroport-marignane" }
  ]
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel est le tarif du taxi entre Aix-en-Provence et l'aéroport de Marignane ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Le tarif fixe entre Aix-en-Provence et l'Aéroport Marseille-Provence (Marignane) est de 50€. Prix fixe garanti, aucun supplément de nuit ni de weekend." }
    },
    {
      "@type": "Question",
      "name": "Le chauffeur suit-il les vols en cas de retard à l'aéroport de Marignane ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Oui, Taxi Malacrida assure un suivi des vols en temps réel. En cas de retard de votre vol à l'Aéroport Marseille-Provence, votre chauffeur adapte automatiquement l'heure de prise en charge, sans frais supplémentaires." }
    },
    {
      "@type": "Question",
      "name": "Où le chauffeur attend-il à l'aéroport Marseille-Provence ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Votre chauffeur vous attend au Hall des arrivées de l'Aéroport Marseille-Provence avec un panneau nominatif. Service disponible 24h/24 7j/7." }
    }
  ]
};

const TaxiAeroportMarignane = () => {
  useEffect(() => {
    // Titre de la page
    document.title = 'Taxi Aéroport Marseille-Provence (Marignane) | Malacrida — Tarif fixe 50€, 24h/24';

    // Injection Schema.org
    const scriptBusiness = document.createElement('script');
    scriptBusiness.type = 'application/ld+json';
    scriptBusiness.id = 'schema-aeroport-business';
    scriptBusiness.textContent = JSON.stringify(SCHEMA);
    document.head.appendChild(scriptBusiness);

    const scriptFaq = document.createElement('script');
    scriptFaq.type = 'application/ld+json';
    scriptFaq.id = 'schema-aeroport-faq';
    scriptFaq.textContent = JSON.stringify(FAQ_SCHEMA);
    document.head.appendChild(scriptFaq);

    const scriptBreadcrumb = document.createElement('script');
    scriptBreadcrumb.type = 'application/ld+json';
    scriptBreadcrumb.id = 'schema-aeroport-breadcrumb';
    scriptBreadcrumb.textContent = JSON.stringify(BREADCRUMB_SCHEMA);
    document.head.appendChild(scriptBreadcrumb);

    return () => {
      document.getElementById('schema-aeroport-business')?.remove();
      document.getElementById('schema-aeroport-faq')?.remove();
      document.getElementById('schema-aeroport-breadcrumb')?.remove();
    };
  }, []);

  return (
    <main
      style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px 60px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <p style={{ color: '#4a90a4', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
            Taxi & VTC — Aix-en-Provence
          </p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, letterSpacing: '1px', lineHeight: 1.2, marginBottom: '24px' }}>
            Taxi Aéroport Marseille-Provence
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.6em', fontWeight: 200, marginTop: '8px' }}>
              Marignane — Transfert depuis Aix-en-Provence
            </span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '17px', lineHeight: 1.7, maxWidth: '600px' }}>
            Service de taxi et VTC entre Aix-en-Provence et l'Aéroport Marseille-Provence (Marignane).
            Chauffeur Tesla disponible <strong style={{ color: '#fff' }}>24h/24 7j/7</strong>, tarif fixe garanti,
            suivi de vol en temps réel, accueil nominatif au Hall des arrivées.
          </p>
        </div>

        {/* Tarif */}
        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '32px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px', fontWeight: 400 }}>
            Tarif fixe garanti
          </h2>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '52px', fontWeight: 200 }}>50€</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>Aix-en-Provence ↔ Aéroport Marignane</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>
            Prix fixe • Aucun supplément nuit ou weekend • Tesla Model S/X
          </p>
        </div>

        {/* Services */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 300, marginBottom: '20px' }}>Inclus dans votre transfert</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
            {[
              'Suivi des vols en temps réel — adaptation automatique en cas de retard',
              'Accueil au Hall des arrivées avec panneau nominatif',
              'Véhicule Tesla — wifi, chargeurs, climatisation',
              'Tarif fixe annoncé à la réservation, sans surprise',
              'Disponible 24h/24 — y compris vols de nuit et tôt le matin',
            ].map((item) => (
              <li key={item} style={{ display: 'flex', gap: '12px', color: 'rgba(255,255,255,0.75)', fontSize: '15px' }}>
                <span style={{ color: '#4a90a4', flexShrink: 0 }}>→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 300, marginBottom: '24px' }}>Questions fréquentes</h2>
          {FAQ_SCHEMA.mainEntity.map((q) => (
            <div key={q.name} style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', paddingBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 400, marginBottom: '10px', color: '#fff' }}>{q.name}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.6 }}>{q.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
            Réservation & renseignements
          </p>
          <a
            href="tel:+33784628640"
            style={{
              display: 'inline-block', background: '#fff', color: '#000',
              padding: '16px 40px', borderRadius: '4px', fontSize: '18px',
              fontWeight: 500, textDecoration: 'none', letterSpacing: '1px'
            }}
          >
            07 84 62 86 40
          </a>
          <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>
            Disponible 24h/24 — Réponse immédiate
          </p>
          <a href="/" style={{ display: 'block', marginTop: '32px', color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>
            ← Retour au site Taxi Malacrida
          </a>
        </div>

      </div>
    </main>
  );
};

export default TaxiAeroportMarignane;
