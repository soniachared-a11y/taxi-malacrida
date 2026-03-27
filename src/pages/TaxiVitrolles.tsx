import { useEffect } from 'react';

// ─── PAGE SEO — Taxi Vitrolles ─────────────────────────────────────────────
// Page non visible dans la navigation — indexée uniquement par Google & bots IA
// URL : /taxi-vitrolles

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["TaxiService", "LocalBusiness"],
  "@id": "https://www.taximalacrida.fr/taxi-vitrolles#service",
  "name": "Taxi Vitrolles — Malacrida",
  "description": "Service de taxi et VTC à Vitrolles. Transferts vers l'Aéroport Marseille-Provence, la Gare TGV Aix-en-Provence et le centre d'Aix. Chauffeur Tesla 24h/24, tarif fixe, ponctualité garantie.",
  "url": "https://www.taximalacrida.fr/taxi-vitrolles",
  "telephone": "+33784628640",
  "priceRange": "€€",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00", "closes": "23:59"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Vitrolles",
    "postalCode": "13127",
    "addressRegion": "Provence-Alpes-Côte d'Azur",
    "addressCountry": "FR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 43.4600, "longitude": 5.2480 },
  "areaServed": [
    { "@type": "City", "name": "Vitrolles" },
    { "@type": "City", "name": "Aix-en-Provence" },
    { "@type": "City", "name": "Marignane" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Taxi Vitrolles → Aéroport Marseille-Provence" }, "price": "25", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Taxi Vitrolles → Centre Aix-en-Provence" }, "price": "35", "priceCurrency": "EUR" }
    ]
  },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "bestRating": "5", "ratingCount": "47" }
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Taxi Aix-en-Provence", "item": "https://www.taximalacrida.fr/" },
    { "@type": "ListItem", "position": 2, "name": "Taxi Vitrolles", "item": "https://www.taximalacrida.fr/taxi-vitrolles" }
  ]
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel taxi appeler à Vitrolles pour l'aéroport de Marseille ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Taxi Malacrida assure les transferts depuis Vitrolles vers l'Aéroport Marseille-Provence (Marignane), à seulement 10 minutes. Tarif fixe dès 25€, disponible 24h/24. Appelez le 07 84 62 86 40." }
    },
    {
      "@type": "Question",
      "name": "Existe-t-il un taxi VTC à Vitrolles disponible la nuit ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Oui, Taxi Malacrida intervient à Vitrolles 24h/24 7j/7, y compris la nuit et les jours fér��\ˈ]X�[��\0�[Y[�H�Z]\\]p�H�\�H\�Y��^K��B�B�B�N��ۜ�^U�]��\�H

HO�\�QY��X�


HO���[Y[��]HH	�^H�]��\�X[XܚYH8�%p�\��ܝ�\�HՋZ^Y[�T�ݙ[��K�̍	���ۜ��HH��[Y[��ܙX]Q[[Y[�
	��ܚ\	�N�K�\HH	�\X�][ۋ�
ڜ�ۉ���K�YH	���[XK]�]��\�X�\�[�\����K�^�۝[�H��Ӌ���[��Y�J��SPJN��[Y[��XY�\[��[
�JN��ۜ�̈H��[Y[��ܙX]Q[[Y[�
	��ܚ\	�N̋�\HH	�\X�][ۋ�
ڜ�ۉ��̋�YH	���[XK]�]��\�Y�\I�̋�^�۝[�H��Ӌ���[��Y�J�TW���SPJN��[Y[��XY�\[��[
̊N��ۜ���H��[Y[��ܙX]Q[[Y[�
	��ܚ\	�N�˝\HH	�\X�][ۋ�
ڜ�ۉ���˚YH	���[XK]�]��\�X��XYܝ[X���˝^�۝[�H��Ӌ���[��Y�J��PQԕSP����SPJN��[Y[��XY�\[��[
��N��]\��

HO���[Y[���][[Y[��RY
	���[XK]�]��\�X�\�[�\���O˜�[[ݙJ
N��[Y[���][[Y[��RY
	���[XK]�]��\�Y�\I�O˜�[[ݙJ
N��[Y[���][[Y[��RY
	���[XK]�]��\�X��XYܝ[X��O˜�[[ݙJ
NNK�JN��]\��
�XZ[��[O^���X��ܛ�[��	��LLI���܎�	�ٙ���Z[�ZY��	�L�	��۝�[Z[N�	�[�\��\�[K]ZK�[��\�\�Y��_O��]��[O^��X^�Y�	�	�X\��[��	�]]��Y[�Έ	���	�_O���]��[O^��X\��[����N�	�	�_O���[O^����܎�	��NLM	��۝�^�N�	�L�	�]\��X�[�Έ	̜	�^�[�ٛܛN�	�\\��\�I�X\��[����N�	�M�	�_O�^H	���8�%�]��\����H�[O^���۝�^�N�	��[\
���
I��۝�ZY���]\��X�[�Έ	�\	�[�RZY��K��X\��[����N�	̍	�_O��^H�]��\�[��[O^��\�^N�	؛������܎�	ܙؘJ�MK�MK�MK��I��۝�^�N�	���[I��۝�ZY���X\��[���	�	�_O��p�\��ܝX\��Z[K�\�HՋZ^Y[�T�ݙ[��H8�%�̍���[����O���[O^����܎�	ܙؘJ�MK�MK�MK��JI��۝�^�N�	�M�	�[�RZY��K��X^�Y�	͌	�_O��^HX[XܚYH[�\��Y[�0���ۙ��[O^����܎�	�ٙ���_O��]��\����ۙψ�\��\�����[�ٙ\���p�\��ܝHX\�Yۘ[�H0�LZ[��\�HՋ�[��H	�Z^Y[�T�ݙ[��K��]Y��]\�\�K\�Y��^K\�ۚX�H�̍������]����]��[O^���X��ܛ�[��	��LLI��ܙ\��	�\��Y�ؘJ�MK�MK�MK�
I��ܙ\��Y]\Έ	�L�	�Y[�Έ	�̜	�X\��[����N�	�	�_O����[O^���۝�^�N�	�M	�]\��X�[�Έ	̜	�^�[�ٛܛN�	�\\��\�I���܎�	ܙؘJ�MK�MK�MK�JI�X\��[����N�	̌	��۝�ZY��_O�\�Y��\Z\��]��\�����]��[O^��\�^N�	�ܚY	��\�	�M�	�_O����\��	�p�\��ܝX\��Z[KT�ݙ[��I��X�N�	�0���x��	�K��\��	��\�HՈZ^Y[�T�ݙ[��I��X�N�	�0���8��	�K��\��	��[��HZ^Y[�T�ݙ[��I��X�N�	�0���x��	�K��\��	��\�H�Z[�P�\�\�X\��Z[I��X�N�	�0��8��	�K�K�X\

�\��X�HJHO�
�]��^O^�\�H�[O^��\�^N�	ٛ^	��\�Y�P�۝[��	��X�KX�]�Y[���ܙ\����N�	�\��Y�ؘJ�MK�MK�MK�JI�Y[�Л��N�	�L�	�_O���[��[O^����܎�	ܙؘJ�MK�MK�MK��I��۝�^�N�	�M\	�_O��]��\�8����\�O��[����[��[O^���۝�ZY���۝�^�N�	�M�	�_O���X�_O��[����]���
J_B��]����[O^����܎�	ܙؘJ�MK�MK�MK��JI��۝�^�N�	�L�	�X\��[���	�M�	�_O��^�^\�8�(��[���\0�[Y[��Z]����]����]��[O^��X\��[����N�	�	�_O����[O^���۝�^�N�	̌	��۝�ZY���X\��[����N�	̍	�_O�]Y\�[ۜ����\]Y[�\�����ѐTW���SPK�XZ[�[�]K�X\

JHO�
�]��^O^�K��[Y_H�[O^���ܙ\���	�\��Y�ؘJ�MK�MK�MK�
I�Y[����	̌	�Y[�Л��N�	̌	�_O����[O^���۝�^�N�	�M�	��۝�ZY��X\��[����N�	�L	���܎�	�ٙ���_O��K��[Y_O�ς��[O^����܎�	ܙؘJ�MK�MK�MK��I��۝�^�N�	�M\	�[�RZY��K��_O��K�X��\Y[���\��^O����]���
J_B��]����]��[O^��^[Yێ�	��[�\��Y[����	�̜	��ܙ\���	�\��Y�ؘJ�MK�MK�MK�
I�_O���[O^����܎�	ܙؘJ�MK�MK�MK�JI��۝�^�N�	�L�	�]\��X�[�Έ	�\	�^�[�ٛܛN�	�\\��\�I�X\��[����N�	�M�	�_O���\�\��][ۈ	��[��ZYۙ[Y[�����H�Y�H�[����������[O^��\�^N�	�[�[�KX������X��ܛ�[��	�ٙ�����܎�	��	�Y[�Έ	�M�	��ܙ\��Y]\Έ	�	��۝�^�N�	�N	��۝�ZY��L^X�ܘ][ێ�	ۛۙI�]\��X�[�Έ	�\	�_O��������O���[O^��X\��[���	�M�	���܎�	ܙؘJ�MK�MK�MK��JI��۝�^�N�	�L�	�_O�\�ۚX�H�̍���H�Y�H�Ȉ�[O^��\�^N�	؛����X\��[���	�̜	���܎�	ܙؘJ�MK�MK�MK�
I��۝�^�N�	�L�	�^X�ܘ][ێ�	ۛۙI�_O����]�\�]H�]H^HX[XܚYO�O���]�����]����XZ[���
NN�^ܝY�][^U�]��\��