/**
 * og-tags.ts — Fitness Factory Hattingen
 * Open Graph + Twitter Card Meta-Tags für alle Seiten.
 *
 * Regeln:
 * - og:image: 1200×630px, JPEG, max 300KB
 * - og:image:alt: Beschreibung des Bildes (Barrierefreiheit + SEO)
 * - twitter:card: 'summary_large_image' — zeigt großes Bild in Twitter/X
 * - og:locale: 'de_DE' auf allen deutschen Seiten
 * - og:site_name: immer 'Fitness Factory Hattingen'
 *
 * OG-Image Spezifikation (vom Kunden erstellen lassen / Bildgenerierung):
 * - /public/og-image-home.jpg       — Logo + Gym-Innenaufnahme + "Dein Fitnessstudio in Hattingen"
 * - /public/og-image-probetraining.jpg — "Kostenloses Probetraining" + Studio-Atmosphäre
 * - /public/og-image-mitgliedschaft.jpg — Preise sichtbar + "ab 35€/Monat"
 * - /public/og-image-default.jpg    — Fallback für alle anderen Seiten
 *
 * Basis: audit/02-seo-analyse.md (ALLE OG-Tags fehlend — kein Preview bei WhatsApp/Facebook)
 * Feature: M12 aus Anforderungskatalog
 */

const BASE_URL = 'https://fitness-factory-hattingen.de'
const SITE_NAME = 'Fitness Factory Hattingen'

// ---------------------------------------------------------------------------
// OG_TAGS — Open Graph + Twitter Cards pro Seite
// ---------------------------------------------------------------------------

export const OG_TAGS = {
  /**
   * Homepage — stärkstes OG-Image, kommuniziert USP sofort
   */
  home: {
    // Open Graph
    'og:title': 'Fitness Factory Hattingen — Dein All-inclusive Fitnessstudio ab 35€',
    'og:description':
      'Sauna, 10+ Live-Kurse, Getränkeflat & persönliche Betreuung — alles inklusive. Jetzt kostenloses Probetraining buchen!',
    'og:image': `${BASE_URL}/og-image-home.jpg`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'Fitness Factory Hattingen — Modernes Fitnessstudio in Hattingen-Holthausen',
    'og:image:type': 'image/jpeg',
    'og:type': 'website',
    'og:url': `${BASE_URL}/`,
    'og:locale': 'de_DE',
    'og:site_name': SITE_NAME,
    // Twitter Cards
    'twitter:card': 'summary_large_image',
    'twitter:title': 'Fitness Factory Hattingen — Fitnessstudio ab 35€ all-inclusive',
    'twitter:description':
      'Sauna, Live-Kurse, Getränkeflat & Trainingsplan — alles drin. Kostenloses Probetraining jetzt buchen!',
    'twitter:image': `${BASE_URL}/og-image-home.jpg`,
    'twitter:image:alt': 'Fitness Factory Hattingen — Fitnessstudio in Hattingen',
  },

  /**
   * Probetraining — Conversion-optimiert, direkter CTA im Bild
   */
  probetraining: {
    'og:title': 'Kostenloses Probetraining in Hattingen — Fitness Factory',
    'og:description':
      'Einfach vorbeikommen, trainieren und die Sauna testen — kein Vertrag, kein Druck. Termin per WhatsApp oder Anruf.',
    'og:image': `${BASE_URL}/og-image-probetraining.jpg`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'Kostenloses Probetraining im Fitness Factory Hattingen',
    'og:image:type': 'image/jpeg',
    'og:type': 'website',
    'og:url': `${BASE_URL}/probetraining/`,
    'og:locale': 'de_DE',
    'og:site_name': SITE_NAME,
    'twitter:card': 'summary_large_image',
    'twitter:title': 'Kostenloses Probetraining in Hattingen — Fitness Factory',
    'twitter:description':
      'Einfach vorbeikommen, trainieren und in die Sauna — kein Vertrag, kein Druck.',
    'twitter:image': `${BASE_URL}/og-image-probetraining.jpg`,
    'twitter:image:alt': 'Probetraining im Fitness Factory Hattingen',
  },

  /**
   * Mitgliedschaft — Preise prominent, klarer Mehrwert
   */
  mitgliedschaft: {
    'og:title': 'Mitgliedschaft ab 35€/Monat — Fitness Factory Hattingen',
    'og:description':
      'Flex 55€, Standard 45€, Premium 35€/Monat — inkl. Sauna, alle Kurse & Getränkeflat. Keine versteckten Kosten.',
    'og:image': `${BASE_URL}/og-image-mitgliedschaft.jpg`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'Mitgliedschaftstarife der Fitness Factory Hattingen ab 35€/Monat',
    'og:image:type': 'image/jpeg',
    'og:type': 'website',
    'og:url': `${BASE_URL}/mitgliedschaft/`,
    'og:locale': 'de_DE',
    'og:site_name': SITE_NAME,
    'twitter:card': 'summary_large_image',
    'twitter:title': 'Fitnessstudio Hattingen ab 35€ — Preise & Mitgliedschaft',
    'twitter:description':
      'Alle Tarife mit Sauna, Kursen & Getränkeflat — keine versteckten Kosten.',
    'twitter:image': `${BASE_URL}/og-image-mitgliedschaft.jpg`,
    'twitter:image:alt': 'Mitgliedschaftspreise Fitness Factory Hattingen',
  },

  /**
   * Kursplan — Kurse visuell präsentieren
   */
  kursplan: {
    'og:title': 'Kursplan — Yoga, Spinning, Zumba & mehr | Fitness Factory Hattingen',
    'og:description':
      '10+ Live-Kurse pro Woche — inklusive in jeder Mitgliedschaft. Yoga, Spinning, Tabata, Zumba, Tae-Bo und mehr.',
    'og:image': `${BASE_URL}/og-image-default.jpg`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'Kursangebot im Fitness Factory Hattingen — Yoga, Spinning, Zumba',
    'og:image:type': 'image/jpeg',
    'og:type': 'website',
    'og:url': `${BASE_URL}/kursplan/`,
    'og:locale': 'de_DE',
    'og:site_name': SITE_NAME,
    'twitter:card': 'summary_large_image',
    'twitter:title': 'Kursplan Fitness Factory Hattingen — 10+ Kurse inklusive',
    'twitter:description':
      'Yoga, Spinning, Tabata, Zumba & mehr — alle inklusive, keine Anmeldung nötig.',
    'twitter:image': `${BASE_URL}/og-image-default.jpg`,
    'twitter:image:alt': 'Kursplan Fitness Factory Hattingen',
  },

  /**
   * Team — Vertrauen aufbauen, Gesichter zeigen
   */
  team: {
    'og:title': 'Unser Team — Persönliche Betreuung | Fitness Factory Hattingen',
    'og:description':
      'Qualifizierte Trainer, die sich wirklich Zeit nehmen. Trainingsplan, Ernährungsberatung und Unterstützung auf Augenhöhe.',
    'og:image': `${BASE_URL}/og-image-default.jpg`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'Trainer-Team der Fitness Factory Hattingen',
    'og:image:type': 'image/jpeg',
    'og:type': 'website',
    'og:url': `${BASE_URL}/team/`,
    'og:locale': 'de_DE',
    'og:site_name': SITE_NAME,
    'twitter:card': 'summary_large_image',
    'twitter:title': 'Das Team der Fitness Factory Hattingen',
    'twitter:description':
      'Deine persönlichen Trainer — für Trainingsplan, Ernährung und echte Betreuung.',
    'twitter:image': `${BASE_URL}/og-image-default.jpg`,
    'twitter:image:alt': 'Trainer Fitness Factory Hattingen',
  },

  /**
   * Fremdgeh-Aktion — Angebot klar kommunizieren
   */
  fremdgehAktion: {
    'og:title': '3 Monate gratis — Fremdgeh-Aktion | Fitness Factory Hattingen',
    'og:description':
      'Noch Mitglied woanders? Trainiere 3 Monate kostenlos bei uns — nur 49€ Anmeldegebühr. Bring deinen alten Vertrag mit.',
    'og:image': `${BASE_URL}/og-image-default.jpg`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'Fremdgeh-Aktion: 3 Monate gratis im Fitness Factory Hattingen',
    'og:image:type': 'image/jpeg',
    'og:type': 'website',
    'og:url': `${BASE_URL}/fremdgeh-aktion/`,
    'og:locale': 'de_DE',
    'og:site_name': SITE_NAME,
    'twitter:card': 'summary_large_image',
    'twitter:title': 'Fremdgeh-Aktion Hattingen — 3 Monate für 0€',
    'twitter:description': 'Noch woanders Mitglied? 3 Monate gratis bei Fitness Factory — nur 49€ Anmeldegebühr.',
    'twitter:image': `${BASE_URL}/og-image-default.jpg`,
    'twitter:image:alt': 'Fremdgeh-Aktion Fitness Factory Hattingen',
  },

  /**
   * FAQ — Informationsseite
   */
  faq: {
    'og:title': 'FAQ — alle Fragen beantwortet | Fitness Factory Hattingen',
    'og:description':
      'Preise, Kündigung, Sauna, Probetraining, Öffnungszeiten — alle häufigen Fragen zur Mitgliedschaft auf einen Blick.',
    'og:image': `${BASE_URL}/og-image-default.jpg`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'FAQ Fitness Factory Hattingen',
    'og:image:type': 'image/jpeg',
    'og:type': 'website',
    'og:url': `${BASE_URL}/faq/`,
    'og:locale': 'de_DE',
    'og:site_name': SITE_NAME,
    'twitter:card': 'summary_large_image',
    'twitter:title': 'FAQ Fitness Factory Hattingen — alle Fragen zur Mitgliedschaft',
    'twitter:description':
      'Preise, Kündigung, Sauna, Probetraining — alle Antworten auf einen Blick.',
    'twitter:image': `${BASE_URL}/og-image-default.jpg`,
    'twitter:image:alt': 'FAQ Fitness Factory Hattingen',
  },

  /**
   * Legal-Seiten — Minimale OG-Tags (werden nicht geteilt, aber sollten vorhanden sein)
   */
  impressum: {
    'og:title': 'Impressum | Fitness Factory Hattingen GmbH',
    'og:description': 'Impressum der Fitness Factory Hattingen GmbH.',
    'og:image': `${BASE_URL}/og-image-default.jpg`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'Fitness Factory Hattingen',
    'og:image:type': 'image/jpeg',
    'og:type': 'website',
    'og:url': `${BASE_URL}/impressum/`,
    'og:locale': 'de_DE',
    'og:site_name': SITE_NAME,
    'twitter:card': 'summary',
    'twitter:title': 'Impressum | Fitness Factory Hattingen GmbH',
    'twitter:description': 'Impressum der Fitness Factory Hattingen GmbH.',
    'twitter:image': `${BASE_URL}/og-image-default.jpg`,
    'twitter:image:alt': 'Fitness Factory Hattingen',
  },

  datenschutz: {
    'og:title': 'Datenschutz | Fitness Factory Hattingen GmbH',
    'og:description': 'Datenschutzerklärung der Fitness Factory Hattingen GmbH gemäß DSGVO.',
    'og:image': `${BASE_URL}/og-image-default.jpg`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'Fitness Factory Hattingen',
    'og:image:type': 'image/jpeg',
    'og:type': 'website',
    'og:url': `${BASE_URL}/datenschutz/`,
    'og:locale': 'de_DE',
    'og:site_name': SITE_NAME,
    'twitter:card': 'summary',
    'twitter:title': 'Datenschutz | Fitness Factory Hattingen GmbH',
    'twitter:description': 'Datenschutzerklärung gemäß DSGVO.',
    'twitter:image': `${BASE_URL}/og-image-default.jpg`,
    'twitter:image:alt': 'Fitness Factory Hattingen',
  },

  agb: {
    'og:title': 'AGB | Fitness Factory Hattingen GmbH',
    'og:description': 'Allgemeine Geschäftsbedingungen der Fitness Factory Hattingen GmbH.',
    'og:image': `${BASE_URL}/og-image-default.jpg`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'Fitness Factory Hattingen',
    'og:image:type': 'image/jpeg',
    'og:type': 'website',
    'og:url': `${BASE_URL}/agb/`,
    'og:locale': 'de_DE',
    'og:site_name': SITE_NAME,
    'twitter:card': 'summary',
    'twitter:title': 'AGB | Fitness Factory Hattingen GmbH',
    'twitter:description': 'Allgemeine Geschäftsbedingungen.',
    'twitter:image': `${BASE_URL}/og-image-default.jpg`,
    'twitter:image:alt': 'Fitness Factory Hattingen',
  },

  kuendigung: {
    'og:title': 'Kündigung | Fitness Factory Hattingen GmbH',
    'og:description': 'Kündigungsformular der Fitness Factory Hattingen GmbH.',
    'og:image': `${BASE_URL}/og-image-default.jpg`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'Fitness Factory Hattingen',
    'og:image:type': 'image/jpeg',
    'og:type': 'website',
    'og:url': `${BASE_URL}/kuendigung/`,
    'og:locale': 'de_DE',
    'og:site_name': SITE_NAME,
    'twitter:card': 'summary',
    'twitter:title': 'Kündigung | Fitness Factory Hattingen GmbH',
    'twitter:description': 'Kündigungsformular für deine Mitgliedschaft.',
    'twitter:image': `${BASE_URL}/og-image-default.jpg`,
    'twitter:image:alt': 'Fitness Factory Hattingen',
  },
} as const

// ---------------------------------------------------------------------------
// OG-Image Spezifikation (für Kunden / Bildgenerierung)
// ---------------------------------------------------------------------------

/**
 * Spezifikation für alle OG-Images.
 * Format: 1200×630px JPEG, max 300KB (optimiert für WhatsApp, Facebook, LinkedIn)
 *
 * Bilder müssen erstellt und in /public/ abgelegt werden:
 *
 * og-image-home.jpg:
 *   - Hintergrund: Gym-Innenaufnahme (Gerätebereich oder Kursraum), dunkel getönt
 *   - Overlay: Fitness Factory Logo (weiß, oben links)
 *   - Text: "Dein Fitnessstudio in Hattingen" (groß, weiß, Mitte)
 *   - Subtext: "Sauna · Kurse · ab 35€" (klein, Akzentfarbe)
 *   - Stil: Dunkel, energetisch, premium
 *
 * og-image-probetraining.jpg:
 *   - Hintergrund: Gym-Atmosphäre, Menschen beim Training
 *   - Text: "Kostenloses Probetraining" (groß)
 *   - Subtext: "Kein Vertrag · Kein Druck · Einfach vorbeikommen"
 *
 * og-image-mitgliedschaft.jpg:
 *   - Preiskarten-Visualisierung oder Gym-Bild
 *   - Text: "Ab 35€/Monat" (groß, Akzentfarbe)
 *   - Subtext: "Sauna, Kurse & Getränkeflat inklusive"
 *
 * og-image-default.jpg:
 *   - Logo-zentriert auf dunklem Gym-Hintergrund
 *   - "Fitness Factory Hattingen" als Text
 *   - Fallback für alle Seiten ohne eigenes OG-Image
 */
export const OG_IMAGE_SPEC = {
  width: 1200,
  height: 630,
  format: 'image/jpeg',
  maxFileSizeKB: 300,
  required: [
    '/public/og-image-home.jpg',
    '/public/og-image-probetraining.jpg',
    '/public/og-image-mitgliedschaft.jpg',
    '/public/og-image-default.jpg',
  ],
} as const

export type OGPageKey = keyof typeof OG_TAGS
