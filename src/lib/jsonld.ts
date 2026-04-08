/**
 * jsonld.ts — JSON-LD Schema Helpers
 * Wiederverwendbare Schema-Generatoren für alle Seiten.
 */

const BASE_URL = 'https://fitness-factory-hattingen.de'

// ---------------------------------------------------------------------------
// BreadcrumbList — Navigationspfad für Unterseiten
// ---------------------------------------------------------------------------

export function makeBreadcrumbSchema(items: { name: string; url: string }[]) {
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
// FAQPage — aus content.ts FAQ-Items generieren
// ---------------------------------------------------------------------------

export function makeFaqPageSchema(items: ReadonlyArray<{ frage: string; antwort: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.frage,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.antwort,
      },
    })),
  }
}

// ---------------------------------------------------------------------------
// Vordefinierte Breadcrumbs pro Seite
// ---------------------------------------------------------------------------

export const BREADCRUMBS = {
  probetraining: makeBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Probetraining', url: `${BASE_URL}/probetraining/` },
  ]),
  mitgliedschaft: makeBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Mitgliedschaft & Preise', url: `${BASE_URL}/mitgliedschaft/` },
  ]),
  kursplan: makeBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Kursplan', url: `${BASE_URL}/kursplan/` },
  ]),
  team: makeBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Unser Team', url: `${BASE_URL}/team/` },
  ]),
  fremdgehAktion: makeBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Fremdgeh-Aktion', url: `${BASE_URL}/fremdgeh-aktion/` },
  ]),
  faq: makeBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'FAQ', url: `${BASE_URL}/faq/` },
  ]),
  impressum: makeBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Impressum', url: `${BASE_URL}/impressum/` },
  ]),
  datenschutz: makeBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Datenschutz', url: `${BASE_URL}/datenschutz/` },
  ]),
  agb: makeBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'AGB', url: `${BASE_URL}/agb/` },
  ]),
  kuendigung: makeBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Kündigung', url: `${BASE_URL}/kuendigung/` },
  ]),
  ueberUns: makeBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Über uns', url: `${BASE_URL}/ueber-uns/` },
  ]),
  galerie: makeBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Galerie', url: `${BASE_URL}/galerie/` },
  ]),
  kontakt: makeBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Kontakt', url: `${BASE_URL}/kontakt/` },
  ]),
} as const
