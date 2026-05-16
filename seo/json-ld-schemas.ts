/**
 * json-ld-schemas.ts — Fitness Factory Hattingen
 * Vollständige JSON-LD Structured Data Schemas.
 *
 * Enthält:
 * 1. healthClubSchema      — HealthClub + LocalBusiness (jede Seite)
 * 2. faqPageSchema         — FAQPage mit ALLEN FAQ-Items (Homepage + /faq/)
 * 3. getBreadcrumbSchema() — BreadcrumbList (dynamisch, Unterseiten)
 *
 * Basis: audit/02-seo-analyse.md (kein HealthClub-Schema, kein FAQPage-Schema)
 * Features: M03, M04 aus Anforderungskatalog
 *
 * GeoCoordinates: Als TBD markiert — vom Kunden zu liefern (Google Maps → Rechtsklick → "Was ist hier?")
 * AggregateRating: Als TBD markiert — Gesamtbewertung + Anzahl vom Kunden oder Google Places API
 */

// ---------------------------------------------------------------------------
// 1. HealthClub + LocalBusiness Schema (auf JEDER Seite einbinden)
// ---------------------------------------------------------------------------

export const healthClubSchema = {
  '@context': 'https://schema.org',
  '@type': ['HealthClub', 'LocalBusiness'],
  name: 'Fitness Factory Hattingen',
  legalName: 'Fitness Factory Hattingen GmbH',
  description:
    'All-inclusive Fitnessstudio in Hattingen mit Sauna, 10+ Live-Kursen, Getränkeflat und persönlicher Betreuung — ab 35€/Monat.',
  url: 'https://fitness-factory-hattingen.de',
  telephone: '+49-2324-33777',
  email: 'fitness-factory-hattingen@gmx.de',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Cash, Credit Card, Debit Card, Bank Transfer',
  priceRange: '€€',

  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Im Vogelsang 95',
    addressLocality: 'Hattingen',
    addressRegion: 'Nordrhein-Westfalen',
    postalCode: '45527',
    addressCountry: 'DE',
  },

  /**
   * GeoCoordinates — TBD: Exakte Koordinaten vom Kunden einholen.
   * So ermitteln: Google Maps → Im Vogelsang 95, Hattingen → Rechtsklick → "Was ist hier?"
   * Ungefähre Werte für Hattingen-Holthausen (zur Verifikation durch Kunden):
   */
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '51.3960', // TBD: Exakter Wert vom Kunden verifizieren lassen
    longitude: '7.2050', // TBD: Exakter Wert vom Kunden verifizieren lassen
  },

  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '23:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '10:00',
      closes: '17:30',
    },
  ],

  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '167',
    bestRating: '5',
    worstRating: '1',
  },

  areaServed: [
    { '@type': 'City', name: 'Hattingen' },
    { '@type': 'City', name: 'Bochum' },
    { '@type': 'City', name: 'Sprockhövel' },
    { '@type': 'City', name: 'Witten' },
    { '@type': 'Place', name: 'Hattingen-Holthausen' },
    { '@type': 'Place', name: 'Bochum-Linden' },
    { '@type': 'Place', name: 'Blankenstein' },
  ],

  amenityFeature: [
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Sauna',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Getränke-Flatrate',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Kostenlose Parkplätze',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Live-Kurse',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Kostenlose Duschen',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Ernährungsberatung',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Individueller Trainingsplan',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'WLAN',
      value: true,
    },
  ],

  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Mitgliedschaftstarife',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Flex-Mitgliedschaft',
        description: 'Monatlich kündbare Mitgliedschaft — voller Leistungsumfang inklusive Sauna, alle Kurse, Getränkeflat.',
        price: '55',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '55',
          priceCurrency: 'EUR',
          unitText: 'Monat',
        },
        eligibleDuration: {
          '@type': 'QuantitativeValue',
          value: '1',
          unitCode: 'MON',
        },
      },
      {
        '@type': 'Offer',
        name: 'Standard-Mitgliedschaft',
        description: '12 Monate Laufzeit — bestes Preis-Leistungs-Verhältnis. Voller Leistungsumfang inklusive.',
        price: '45',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '45',
          priceCurrency: 'EUR',
          unitText: 'Monat',
        },
        eligibleDuration: {
          '@type': 'QuantitativeValue',
          value: '12',
          unitCode: 'MON',
        },
      },
      {
        '@type': 'Offer',
        name: 'Premium-Mitgliedschaft',
        description: '24 Monate Laufzeit — günstigster Monatspreis. Voller Leistungsumfang inklusive.',
        price: '35',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '35',
          priceCurrency: 'EUR',
          unitText: 'Monat',
        },
        eligibleDuration: {
          '@type': 'QuantitativeValue',
          value: '24',
          unitCode: 'MON',
        },
      },
    ],
  },

  sameAs: [
    'https://www.instagram.com/fitness.factory.hattingen/',
    'https://www.facebook.com/fitnessfactoryhattingen',
  ],

  image: 'https://fitness-factory-hattingen.de/og-image-home.jpg',
} as const

// ---------------------------------------------------------------------------
// 2. FAQPage Schema (Homepage + /faq/)
// Alle FAQ-Items aus src/data/content.ts — 12 Fragen in 4 Kategorien
// ---------------------------------------------------------------------------

export const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    // --- Probetraining ---
    {
      '@type': 'Question',
      name: 'Muss ich nach dem Probetraining sofort Mitglied werden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nein. Du trainierst, schaust dich um — und entscheidest danach in Ruhe. Kein Druck.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie buche ich ein Probetraining?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ruf uns an (02324 33777) oder schreib uns auf WhatsApp (+49 1573 7580001). Ansonsten auch jederzeit buchbar über das Kontaktformular.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was soll ich zum Probetraining mitbringen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sportkleidung, Sportschuhe, ein Handtuch und eine Wasserflasche — mehr brauchst du nicht.',
      },
    },

    // --- Mitgliedschaft & Preise ---
    {
      '@type': 'Question',
      name: 'Gibt es einen Studentenrabatt oder ermäßigte Tarife?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja — wir bieten vergünstigte Tarife für Studenten, Schüler und Auszubildende an. Komm einfach mit einem gültigen Nachweis vorbei oder ruf uns an, und wir finden den passenden Tarif für dich.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie läuft die Fremdgeh-Aktion genau ab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Du bist noch bei einem anderen Studio Mitglied? Bring deinen bestehenden Vertrag mit und trainiere bis zu 3 Monate bei uns für 0 € — nur die Anmeldegebühr (49 €) fällt an.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist die Fremdgeh-Aktion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Du hast noch einen laufenden Vertrag bei einem anderen Studio? Kein Problem. Bei uns trainierst du bis zu 3 Monate für 0 € — nur die einmalige Anmeldegebühr (49 €) fällt an. Mehr dazu auf unserer Fremdgeh-Aktion-Seite.',
      },
    },

    // --- Training & Kurse ---
    {
      '@type': 'Question',
      name: 'Ich bin Anfänger und habe noch nie trainiert. Ist das etwas für mich?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Wir haben Mitglieder von 18 bis 70+, Einsteiger und langjährige Sportler. Wir erstellen dir einen Trainingsplan, der zu dir passt und deine Ziele und Wünsche umsetzt. Unsere Trainer sind immer ansprechbar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Muss ich Kurse vorher anmelden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, Kurse müssen vorab in einer Gruppe gebucht werden. Wir haben jedoch ausreichend Kursplätze, um die Bedürfnisse unserer Mitglieder zu decken.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was für Geräte habt ihr?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wir haben alles da — von Gym 80, Cybex, Life Fitness, Panatta und Nautilus — um unseren Mitgliedern das beste Equipment zu ermöglichen.',
      },
    },

    // --- Allgemein & Kontakt ---
    {
      '@type': 'Question',
      name: 'Wie sind die Öffnungszeiten?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Montag bis Freitag von 08:00 bis 23:00 Uhr, Samstag und Sonntag von 10:00 bis 17:30 Uhr. An Feiertagen per Aushang oder sichtbar via Google Maps sowie Instagram.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie komme ich zum Studio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wir sind im Stadtteil Holthausen: Im Vogelsang 95, 45527 Hattingen. Mit dem Auto direkt vor der Tür parken (kostenlos). Mit dem Bus: Haltestelle Zum Ludwigstal, dann 10 Minuten Fußweg.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie kann ich euch am schnellsten erreichen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Egal ob über WhatsApp oder einen direkten Anruf im Studio — wir sind während der Öffnungszeiten jederzeit erreichbar.',
      },
    },
  ],
} as const

// ---------------------------------------------------------------------------
// 3. BreadcrumbList Schema (dynamisch — Unterseiten)
// ---------------------------------------------------------------------------

export interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * Erstellt ein BreadcrumbList-Schema für eine Unterseite.
 * Wird auf allen Seiten außer der Homepage eingebunden.
 *
 * @example
 * getBreadcrumbSchema([
 *   { name: 'Home', url: 'https://fitness-factory-hattingen.de/' },
 *   { name: 'Probetraining', url: 'https://fitness-factory-hattingen.de/probetraining/' }
 * ])
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// ---------------------------------------------------------------------------
// Vordefinierte Breadcrumbs pro Seite
// ---------------------------------------------------------------------------

const BASE_URL = 'https://fitness-factory-hattingen.de'

export const BREADCRUMBS = {
  probetraining: getBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Probetraining', url: `${BASE_URL}/probetraining/` },
  ]),
  mitgliedschaft: getBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Mitgliedschaft & Preise', url: `${BASE_URL}/mitgliedschaft/` },
  ]),
  kursplan: getBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Kursplan', url: `${BASE_URL}/kursplan/` },
  ]),
  team: getBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Unser Team', url: `${BASE_URL}/team/` },
  ]),
  fremdgehAktion: getBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Fremdgeh-Aktion', url: `${BASE_URL}/fremdgeh-aktion/` },
  ]),
  faq: getBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'FAQ', url: `${BASE_URL}/faq/` },
  ]),
  impressum: getBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Impressum', url: `${BASE_URL}/impressum/` },
  ]),
  datenschutz: getBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Datenschutz', url: `${BASE_URL}/datenschutz/` },
  ]),
  agb: getBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'AGB', url: `${BASE_URL}/agb/` },
  ]),
  kuendigung: getBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Kündigung', url: `${BASE_URL}/kuendigung/` },
  ]),
} as const

// ---------------------------------------------------------------------------
// Hilfsfunktion: Schema als JSON-String für <script type="application/ld+json">
// ---------------------------------------------------------------------------

export function serializeSchema(schema: unknown): string {
  return JSON.stringify(schema, null, 2)
}
