import { useEffect } from 'react';

// ─── PAGE SEO — Taxi Gare Saint-Charles Marseille ─────────────────────────
// Page non visible dans la navigation — indexée uniquement par Google & bots IA
// URL : /taxi-gare-saint-charles

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["TaxiService", "LocalBusiness"],
  "@id": "https://www.taximalacrida.fr/taxi-gare-saint-charles#service",
  "name": "Taxi Gare Saint-Charles Marseille — Malacrida",
  "description": "Taxi et VTC entre Aix-en-Provence et la Gare Saint-Charles de Marseille. Chauffeur Tesla 24h/24, tarif fixe 55€, prise en charge à domicile, pas de supplément nuit.",
  "url": "https://www.taximalacrida.fr/taxi-gare-saint-charles",
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
    "addressLocality": "Marseille",
    "postalCode": "13001",
    "addressRegion": "Provence-Alpes-Côte d'Azur",
    "addressCountry": "FR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 43.3033, "longitude": 5.3806 },
  "areaServed": [
    { "@type": "City", "name": "Aix-en-Provence" },
    { "@type": "City", "name": "Marseille" },
    { "@type": "TrainStation", "name": "Gare de Marseille-Saint-Charles" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [{
      "@type": "Offer",
      "itemOffered": { "@type": "Service", "name": "Taxi Aix-en-Provence → Gare Saint-Charles Marseille" },
      "price": "55", "priceCurrency": "EUR"
    }]
  },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "bestRating": "5", "ratingCount": "47" }
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Taxi Aix-en-Provence", "item": "https://www.taximalacrida.fr/" },
    { "@type": "ListItem", "position": 2, "name": "Taxi Gare Saint-Charles Marseille", "item": "https://www.taximalacrida.fr/taxi-gare-saint-charles" }
  ]
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel est le prix du taxi entre Aix-en-Provence et la Gare Saint-Charles de Marseille ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Le tarif fixe entre Aix-en-Provence et la Gare Saint-Charles de Marseille est de 55€. Tarif garanti à la réservation, sans supplément de nuit ni de weekend." }
    },
    {
      "@type": "Question",
      "name": "Combien de temps pour aller d'Aix-en-Provence à la Gare Saint-Charles ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Le trajet entre Aix-en-Provence et la Gare Saint-Charles dure environ 35 à 50 minutes selon le trafic. Taxi Malacrida calcule l'heure de départ pour arriver 15 à 20 minutes avant votre train." }
    },
    {
      "@type": "Question",
      "name": "Taxi Malacrida fait-il aussi le trajet retour depuis la Gare Saint-Charles ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Oui, Taxi Malacrida assure les transferts aller et retour entre la Gare Saint-Charles et Aix-en-Provence. Réservez votre retour à l'avance pour un accueil direct à votre descente de train." }
    }
  ]
};

const TaxiGareSaintCharles = () => {
  useEffect(() => {
    document.title = 'Taxi Gare Saint-Charles Marseille | Malacrida — Depuis Aix-en-Provence, tarif 55€';
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://www.taximalacrida.fr/taxi-gare-saint-charles');
    document.querySelector('meta[name="description"]')?.setAttribute('content', "Taxi et VTC entre Aix-en-Provence et la Gare Saint-Charles de Marseille. Chauffeur Tesla 24h/24, tarif fixe 55€, prise en charge à domicile, pas de supplément nuit.");

    const s1 = document.createElement('script');
    s1.type = 'application/ld+json'; s1.id = 'schema-stcharles-business';
    s1.textContent = JSON.stringify(SCHEMA);
    document.head.appendChild(s1);

    const s2 = document.createElement('script');
    s2.type = 'application/ld+json'; s2.id = 'schema-stcharles-faq';
    s2.textContent = JSON.stringify(FAQ_SCHEMA);
    document.head.appendChild(s2);

    const s3 = document.createElement('script');
    s3.type = 'application/ld+json'; s3.id = 'schema-stcharles-breadcrumb';
    s3.textContent = JSON.stringify(BREADCRUMB_SCHEMA);
    document.head.appendChild(s3);

    return () => {
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://www.taximalacrida.fr/');
      document.querySelector('meta[name="description"]')?.setAttribute('content', "Réservez votre chauffeur Taxi Malacrida à Aix-en-Provence et alentours. Transferts Gare TGV, Aéroport Marseille et toutes distances. Disponible 24/7.");
      document.getElementById('schema-stcharles-business')?.remove();
      document.getElementById('schema-stcharles-faq')?.remove();
      document.getElementById('schema-stcharles-breadcrumb')?.remove();
    };
  }, []);

  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px 60px' }}>

        <div style={{ marginBottom: '48px' }}>
          <p style={{ color: '#4a90a4', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Taxi & VTC — Aix-en-Provence</p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, letterSpacing: '1px', lineHeight: 1.2, marginBottom: '24px' }}>
            Taxi Gare Saint-Charles
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.6em', fontWeight: 200, marginTop: '8px' }}>
              Marseille — Transfert depuis Aix-en-Provence, tarif fixe 55€
            </span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '17px', lineHeight: 1.7, maxWidth: '600px' }}>
            Taxi Malacrida assure votre transfert entre Aix-en-Provence et la <strong style={{ color: '#fff' }}>Gare Saint-Charles de Marseille</strong> en Tesla, avec ponctualité garantie. Tarif fixe 55€, disponible 24h/24 7j/7.
          </p>
        </div>

        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '32px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px', fontWeight: 400 }}>Tarif fixe garanti</h2>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '52px', fontWeight: 200 }}>55€</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>Aix-en-Provence ↔ Gare Saint-Charles</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>Prix fixe • Aucun supplément nuit ou weekend • Tesla Model S/X</p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 300, marginBottom: '20px' }}>Le service</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
            {[
              'Prise en charge à domicile ou à l\'adresse de votre choix à Aix-en-Provence',
              'Dépose directement devant la Gare Saint-Charles, accès immédiat aux quais',
              'Retour depuis la gare : service aller-retour disponible',
              'Idéal pour les déplacements professionnels vers Marseille',
              'Wifi à bord, chargeurs iPhone et Android disponibles',
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

export default TaxiGareSaintCharles;
