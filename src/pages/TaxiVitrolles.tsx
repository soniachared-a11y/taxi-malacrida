import { useEffect } from 'react';

// ─── PAGE SEO — Taxi Vitrolles ──────────────────────────────────────────────
// Page non visible dans la navigation — indexée uniquement par Google & bots IA
// URL : /taxi-vitrolles

const SCHEMA_LOCAL = {
  "@context": "https://schema.org",
  "@type": ["TaxiService", "LocalBusiness"],
  "@id": "https://www.taximalacrida.fr/taxi-vitrolles#service",
  "name": "Taxi Malacrida — Vitrolles",
  "description": "Service de taxi et VTC à Vitrolles 24h/24 : transferts aéroport Marseille-Provence, Aix-en-Provence, gares et hôpitaux. Véhicule Tesla, tarifs fixes.",
  "url": "https://www.taximalacrida.fr/taxi-vitrolles",
  "telephone": "+33784628640",
  "address": {
    "@type": "PostalAddress",
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
  "priceRange": "\u20ac\u20ac",
  "areaServed": "Vitrolles",
  "serviceType": "Taxi et VTC"
};

const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.taximalacrida.fr/" },
    { "@type": "ListItem", "position": 2, "name": "Taxi Vitrolles", "item": "https://www.taximalacrida.fr/taxi-vitrolles" }
  ]
};

const SCHEMA_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte un taxi de Vitrolles à l'aéroport Marseille-Provence ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Le trajet Vitrolles vers l'aéroport coûte environ 25 à 35 euros. Vitrolles étant adjacente à l'aéroport, la course est très courte. Contactez Taxi Malacrida pour un devis précis." }
    },
    {
      "@type": "Question",
      "name": "Peut-on commander un taxi à Vitrolles pour aller à Aix-en-Provence ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Oui, Taxi Malacrida assure des transferts réguliers Vitrolles vers Aix-en-Provence. Durée environ 20 à 30 minutes. Réservation à l'avance ou à la demande." }
    },
    {
      "@type": "Question",
      "name": "Existe-t-il un taxi VTC à Vitrolles disponible la nuit ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Oui, Taxi Malacrida intervient à Vitrolles 24h sur 24, 7 jours sur 7, y compris la nuit et les jours fériés." }
    },
    {
      "@type": "Question",
      "name": "Taxi Malacrida propose-t-il des courses médicales à Vitrolles ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Oui, nous assurons le transport vers les hôpitaux et cliniques de la région : Hôpital Nord, Timone, cliniques d'Aix-en-Provence et de Marseille." }
    }
  ]
};

const TaxiVitrolles = () => {
  useEffect(() => {
    document.title = "Taxi Vitrolles — Taxi et VTC Aéroport Marseille | Taxi Malacrida";

    const metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    metaDesc.setAttribute('content', 'Taxi à Vitrolles 24h/24 : transferts aéroport Marseille-Provence, Aix-en-Provence, gares et hôpitaux. Tarifs fixes, véhicule Tesla.');
    metaDesc.id = 'seo-desc-vitrolles';
    document.head.appendChild(metaDesc);

    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', 'https://www.taximalacrida.fr/taxi-vitrolles');
    canonical.id = 'seo-canonical-vitrolles';
    document.head.appendChild(canonical);

    const injectSchema = (id: string, data: object) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.id = id;
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
    };

    injectSchema('schema-local-vitrolles', SCHEMA_LOCAL);
    injectSchema('schema-breadcrumb-vitrolles', SCHEMA_BREADCRUMB);
    injectSchema('schema-faq-vitrolles', SCHEMA_FAQ);

    return () => {
      ['seo-desc-vitrolles','seo-canonical-vitrolles','schema-local-vitrolles','schema-breadcrumb-vitrolles','schema-faq-vitrolles']
        .forEach(id => document.getElementById(id)?.remove());
    };
  }, []);

  const styles = {
    page: { background: '#0a0a0a', color: '#f0f0f0', fontFamily: 'system-ui, sans-serif', minHeight: '100vh' },
    container: { maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' },
    hero: { textAlign: 'center' as const, padding: '3rem 0 2rem' },
    h1: { fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#FFD700', marginBottom: '1rem' },
    subtitle: { fontSize: '1.1rem', color: '#aaa', maxWidth: '600px', margin: '0 auto 2rem' },
    cta: { display: 'inline-block', background: '#FFD700', color: '#0a0a0a', fontWeight: 700, padding: '0.9rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '1rem' },
    section: { marginTop: '3rem' },
    h2: { fontSize: '1.6rem', fontWeight: 700, color: '#FFD700', marginBottom: '1rem' },
    card: { background: '#181818', borderRadius: '10px', padding: '1.25rem', marginBottom: '1rem', border: '1px solid #222' },
    cardTitle: { fontWeight: 600, color: '#FFD700', marginBottom: '0.4rem' },
    cardText: { color: '#ccc', lineHeight: 1.6, fontSize: '0.95rem' },
    table: { width: '100%', borderCollapse: 'collapse' as const, marginTop: '1rem' },
    th: { background: '#1a1a1a', color: '#FFD700', padding: '0.75rem 1rem', textAlign: 'left' as const, fontWeight: 600 },
    td: { padding: '0.75rem 1rem', borderBottom: '1px solid #222', color: '#ccc' },
    faqItem: { background: '#181818', borderRadius: '10px', padding: '1.25rem', marginBottom: '0.75rem', border: '1px solid #222' },
    faqQ: { fontWeight: 600, color: '#FFD700', marginBottom: '0.5rem' },
    faqA: { color: '#ccc', fontSize: '0.95rem', lineHeight: 1.6 }
  };

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <section style={styles.hero}>
          <h1 style={styles.h1}>Taxi Vitrolles &amp; Aéroport Marseille-Provence</h1>
          <p style={styles.subtitle}>
            Vitrolles, commune porte de l'aéroport Marseille-Provence. Taxi Malacrida assure vos transferts aéroport, Aix-en-Provence, gares et hôpitaux — disponible 24h/24, 7j/7.
          </p>
          <a href="tel:+33600000000" style={styles.cta}>Appeler maintenant</a>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Nos services de taxi à Vitrolles</h2>
          {[
            { t: "Transfert aéroport Marseille-Provence", d: "Vitrolles est la commune limitrophe de l'aéroport. Prise en charge à domicile et dépose aux terminaux, à l'heure, quel que soit l'horaire." },
            { t: "Taxi Vitrolles vers Aix-en-Provence", d: "Liaison directe vers le centre d'Aix-en-Provence ou la Gare TGV. Environ 20 à 30 minutes. Tarif fixe convenu à la réservation." },
            { t: "Transport médical non urgent", d: "Accompagnement vers Hôpital Nord, Timone, cliniques d'Aix-en-Provence et de Marseille. Service ponctuel et discret." },
            { t: "Mise à disposition et longue distance", d: "Chauffeur disponible pour la journée ou des trajets vers Paris, Lyon, Nice ou Monaco. Devis sur demande." }
          ].map(({ t, d }) => (
            <div key={t} style={styles.card}>
              <div style={styles.cardTitle}>{t}</div>
              <div style={styles.cardText}>{d}</div>
            </div>
          ))}
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Tarifs indicatifs depuis Vitrolles</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Destination</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Tarif indicatif</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Durée</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Aéroport Marseille-Provence", "25 – 35 €", "5 – 10 min"],
                ["Aix-en-Provence Centre", "35 – 50 €", "20 – 30 min"],
                ["Gare TGV Aix-en-Provence", "30 – 45 €", "15 – 25 min"],
                ["Marseille Centre", "45 – 65 €", "30 – 45 min"],
                ["Gare Saint-Charles", "45 – 60 €", "30 – 40 min"]
              ].map(([dest, prix, duree]) => (
                <tr key={dest}>
                  <td style={styles.td}>{dest}</td>
                  <td style={{ ...styles.td, textAlign: 'right', fontWeight: 600, color: '#FFD700' }}>{prix}</td>
                  <td style={{ ...styles.td, textAlign: 'right' }}>{duree}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Questions fréquentes — Taxi Vitrolles</h2>
          {SCHEMA_FAQ.mainEntity.map((q) => (
            <div key={q.name} style={styles.faqItem}>
              <div style={styles.faqQ}>{q.name}</div>
              <div style={styles.faqA}>{q.acceptedAnswer.text}</div>
            </div>
          ))}
        </section>

        <section style={{ ...styles.section, textAlign: 'center', paddingBottom: '3rem' }}>
          <h2 style={styles.h2}>Réservez votre taxi à Vitrolles</h2>
          <p style={styles.subtitle}>Disponible 24h/24 — Réponse immédiate par téléphone.</p>
          <a href="tel:+33600000000" style={styles.cta}>Appeler maintenant</a>
        </section>
      </div>
    </main>
  );
};

export default TaxiVitrolles;
