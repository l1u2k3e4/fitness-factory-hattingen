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

  /**
   * AggregateRating — TBD: Werte aus Google Business Profile einholen.
   * Eintragen sobald bekannt: ratingValue (z.B. 4.8), reviewCount (z.B. 127)
   */
  // aggregateRating: {
  //   '@type': 'AggregateRating',
  //   ratingValue: 'TBD',   // z.B. '4.8'
  //   reviewCount: 'TBD',   // z.B. '127'
  //   bestRating: '5',
  //   worstRating: '1',
  // },

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
// Alle FAQ-Items aus src/data/content.ts — Homepage (8) + Vollständige FAQ (weitere 13)
// ---------------------------------------------------------------------------

export const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    // --- Homepage FAQ (8 Items — direkt conversion-relevant) ---
    {
      '@type': 'Question',
      name: 'Muss ich nach dem Probetraining sofort Mitglied werden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nein. Du trainierst, schaust dich um — und entscheidest danach in Ruhe. Kein Verkäufer, kein Druck.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was kostet die Sauna extra?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nichts. Die Sauna ist in jeder Mitgliedschaft inklusive — vom 35€-Premium-Tarif bis zum 55€-Flex-Tarif.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ich bin Anfänger und habe noch nie trainiert. Passt das für mich?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Wir haben Mitglieder von 18 bis 70+. Wir erstellen dir einen Trainingsplan, der zu deinem aktuellen Level passt — nicht zu dem, den du irgendwann mal haben willst.',
      },
    },
    {
      '@type': 'Question',
      name: 'Gibt es versteckte Kosten?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nein. Du zahlst deinen Monatsbeitrag und einmalig 49€ Anmeldegebühr. Kurse, Sauna, Getränke, Trainingsplan — alles drin.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kann ich monatlich kündigen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mit dem Flex-Tarif (55€/Monat) ja — jederzeit monatlich kündbar. Standard und Premium haben 12 bzw. 24 Monate Laufzeit, dafür deutlich günstiger.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wo parke ich?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Direkt vor dem Studio — kostenlos. Kein Parkhaus, kein Parkticket, kein Stress.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie läuft die Fremdgeh-Aktion genau ab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Du bist noch bei einem anderen Studio Mitglied? Bring deinen bestehenden Vertrag mit und trainiere 3 Monate bei uns für 0€ — nur die Anmeldegebühr (49€) fällt an.',
      },
    },
    {
      '@type': 'Question',
      name: 'Gibt es Kurse für Einsteiger oder ältere Mitglieder?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Wirbelsäulen-Gymnastik, Yoga, Pilates und Rücken-Fit sind explizit für alle Levels — auch für Menschen, die lange nicht trainiert haben.',
      },
    },

    // --- Vollständige FAQ — Mitgliedschaft & Preise ---
    {
      '@type': 'Question',
      name: 'Was kostet eine Mitgliedschaft im Fitnessstudio Hattingen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flex: 55€/Monat (monatlich kündbar), Standard: 45€/Monat (12 Monate Laufzeit), Premium: 35€/Monat (24 Monate Laufzeit). Dazu kommt einmalig eine Anmeldegebühr von 49€. Keine weiteren Kosten.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist in der Mitgliedschaft enthalten?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Alles: Zugang zu allen Geräten, alle Live-Kurse, Sauna, Getränkeflat, kostenlose Duschen und Parkplätze, Ernährungsberatung und individueller Trainingsplan. Kein Aufpreis für irgendetwas davon.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie kündige ich meine Mitgliedschaft?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Schriftlich — per Brief, E-Mail oder persönlich vor Ort. Achte auf die Kündigungsfristen deines Tarifs. Details findest du in deinem Mitgliedsvertrag oder frag direkt bei uns nach.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist die Fremdgeh-Aktion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Du hast noch einen laufenden Vertrag bei einem anderen Studio? Kein Problem. Bei uns trainierst du die ersten 3 Monate für 0€ — nur die einmalige Anmeldegebühr (49€) fällt an. Mehr dazu auf unserer Fremdgeh-Aktion-Seite unter https://fitness-factory-hattingen.de/fremdgeh-aktion/.',
      },
    },

    // --- Vollständige FAQ — Probetraining ---
    {
      '@type': 'Question',
      name: 'Wie buche ich ein Probetraining?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ruf uns an (02324 33777) oder schreib uns auf WhatsApp (+49 1573 7580001). Du kannst auch einfach vorbeikommen — wir nehmen uns Zeit für dich.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was kostet das Probetraining?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Das Probetraining ist kostenlos und unverbindlich.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was soll ich zum Probetraining mitbringen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sportkleidung, Sportschuhe, ein Handtuch und eine Wasserflasche. Falls du in die Sauna möchtest, auch ein großes Badetuch. Mehr brauchst du nicht.',
      },
    },

    // --- Vollständige FAQ — Ausstattung & Leistungen ---
    {
      '@type': 'Question',
      name: 'Muss ich Kurse vorher anmelden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nein. Du kommst einfach zur Kurszeit dazu. Keine Anmeldung, kein Aufpreis.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie sind die Öffnungszeiten des Fitnessstudios in Hattingen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Montag bis Freitag von 08:00 bis 23:00 Uhr, Samstag und Sonntag von 10:00 bis 17:30 Uhr.',
      },
    },
    {
      '@type': 'Question',
      name: 'Gibt es kostenlose Parkplätze am Fitnessstudio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Direkt vor dem Studio — kostenlos und in der Regel ausreichend Plätze vorhanden.',
      },
    },

    // --- Vollständige FAQ — Für wen geeignet? ---
    {
      '@type': 'Question',
      name: 'Gibt es Kurse für ältere Menschen oder bei Rückenproblemen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Wirbelsäulen-Gymnastik, Pilates, Yoga und Rücken-Fit sind explizit für alle Level ausgelegt und besonders geeignet bei Rückenbeschwerden oder nach langen Sitztagen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Sind die Kurse für alle Level geeignet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die meisten unserer Kurse sind für alle Level ausgelegt. Tabata und Tae-Bo sind etwas intensiver — wer neu einsteigt, kann aber auch dort sein eigenes Tempo gehen.',
      },
    },

    // --- Vollständige FAQ — Kontakt & Anreise ---
    {
      '@type': 'Question',
      name: 'Wie komme ich zum Fitnessstudio Fitness Factory Hattingen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wir sind im Stadtteil Holthausen: Im Vogelsang 95, 45527 Hattingen. Mit dem Auto direkt vor der Tür parken (kostenlos). Aus Richtung Hattingen-Mitte: B51 Richtung Holthausen, Im Vogelsang abbiegen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie kann ich die Fitness Factory Hattingen am schnellsten erreichen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WhatsApp ist am schnellsten: +49 1573 7580001. Telefonisch erreichst du uns auf 02324 33777 während der Öffnungszeiten.',
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
