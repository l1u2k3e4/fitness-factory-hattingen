/**
 * meta-tags.ts — Fitness Factory Hattingen
 * SEO-optimierte Meta-Tags für alle Seiten der Website.
 *
 * Regeln:
 * - Title: 50–60 Zeichen, Primärkeyword am Anfang, Brand am Ende
 * - Description: 150–160 Zeichen, USP + CTA, emotional
 * - Canonical: Self-referencing auf jeder Seite (mit trailing slash)
 * - Legal-Seiten: robots: 'noindex, follow'
 * - Alle Canonical-URLs ohne www, mit https, mit trailing slash
 *
 * Basis: audit/02-seo-analyse.md (SEO-Score 25/100 → Ziel: 90+/100)
 * Features: M01, M02, M13 aus Anforderungskatalog
 */

const BASE_URL = 'https://fitness-factory-hattingen.de'

// ---------------------------------------------------------------------------
// META_TAGS — Vollständige Title + Description + Canonical + Robots pro Seite
// ---------------------------------------------------------------------------

export const META_TAGS = {
  /**
   * Homepage — Primäres Ranking-Ziel: "Fitnessstudio Hattingen"
   * Title: 62 Zeichen (Google-akzeptable Länge, Keyword an Position 1)
   * Description: 152 Zeichen
   */
  home: {
    title: 'Fitnessstudio Hattingen · Sauna, Kurse ab 35€ – Fitness Factory',
    description:
      'Dein Fitnessstudio in Hattingen: Sauna, 10+ Live-Kurse, Getränkeflat & Trainingsplan — alles inklusive ab 35€. Jetzt kostenloses Probetraining buchen!',
    canonical: `${BASE_URL}/`,
    robots: 'index, follow',
    keywords:
      'Fitnessstudio Hattingen, Gym Hattingen, Fitness Hattingen, Probetraining Hattingen, Studio Hattingen, Sport Hattingen',
  },

  /**
   * Probetraining — Primäres Conversion-Ziel der Website
   * Keyword: "Probetraining Hattingen" / "kostenloses Probetraining Fitnessstudio"
   * Title: 63 Zeichen
   * Description: 158 Zeichen
   */
  probetraining: {
    title: 'Kostenloses Probetraining in Hattingen buchen – Fitness Factory',
    description:
      'Teste dein neues Fitnessstudio in Hattingen kostenlos. Kein Vertrag, kein Druck — einfach vorbeikommen, trainieren und die Sauna genießen. Termin per WhatsApp!',
    canonical: `${BASE_URL}/probetraining/`,
    robots: 'index, follow',
    keywords:
      'Probetraining Hattingen, Fitnessstudio testen Hattingen, gratis Probetraining Hattingen, kostenloses Probetraining Fitnessstudio',
  },

  /**
   * Mitgliedschaft & Preise — Keyword: "Fitnessstudio Hattingen Preise"
   * Title: 55 Zeichen
   * Description: 155 Zeichen
   */
  mitgliedschaft: {
    title: 'Mitgliedschaft Hattingen ab 35€ – Preise | Fitness Factory',
    description:
      'Flex ab 55€, Standard ab 45€, Premium ab 35€/Monat — inkl. Sauna, Live-Kurse & Getränkeflat. Keine versteckten Kosten. Transparente Mitgliedschaftspreise.',
    canonical: `${BASE_URL}/mitgliedschaft/`,
    robots: 'index, follow',
    keywords:
      'Fitnessstudio Preise Hattingen, Mitgliedschaft Hattingen, Gym Kosten Hattingen, günstiges Fitnessstudio Hattingen',
  },

  /**
   * Kursplan — Keyword: "Kursplan Fitnessstudio Hattingen", "Yoga Hattingen" etc.
   * Title: 56 Zeichen
   * Description: 153 Zeichen
   */
  kursplan: {
    title: 'Kursplan Fitnessstudio Hattingen – Yoga, Spinning & mehr',
    description:
      'Yoga, Spinning, Tabata, Zumba, Tae-Bo, Pilates & mehr — alle Live-Kurse im Überblick. Inklusive in jeder Mitgliedschaft. Keine Anmeldung, kein Aufpreis.',
    canonical: `${BASE_URL}/kursplan/`,
    robots: 'index, follow',
    keywords:
      'Kurse Fitnessstudio Hattingen, Yoga Hattingen, Spinning Hattingen, Zumba Hattingen, Kursplan Hattingen, Tabata Hattingen',
  },

  /**
   * Team — Keyword: "Trainer Fitnessstudio Hattingen"
   * Title: 56 Zeichen
   * Description: 150 Zeichen
   */
  team: {
    title: 'Unser Team – Fitness Factory Hattingen | Trainer & Betreuung',
    description:
      'Lerne unser Team kennen. Qualifizierte Trainer, die sich Zeit für dich nehmen — Trainingsplan, Ernährungsberatung und echte Unterstützung auf Augenhöhe.',
    canonical: `${BASE_URL}/team/`,
    robots: 'index, follow',
    keywords:
      'Trainer Fitnessstudio Hattingen, Betreuung Fitnessstudio Hattingen, Ernährungsberatung Hattingen',
  },

  /**
   * Fremdgeh-Aktion — Keyword: "Fitnessstudio wechseln Hattingen", "3 Monate gratis Fitnessstudio"
   * Title: 58 Zeichen
   * Description: 143 Zeichen
   */
  fremdgehAktion: {
    title: 'Fremdgeh-Aktion – 3 Monate 0€ | Fitness Factory Hattingen',
    description:
      'Noch bei einem anderen Studio? Trainiere 3 Monate gratis in Hattingen — nur 49€ Anmeldegebühr. Bring deinen alten Vertrag mit und wechsel ohne Risiko.',
    canonical: `${BASE_URL}/fremdgeh-aktion/`,
    robots: 'index, follow',
    keywords:
      'Fremdgeh-Aktion Hattingen, Fitnessstudio wechseln Hattingen, 3 Monate gratis Fitnessstudio, günstiges Gym Hattingen',
  },

  /**
   * FAQ — Keyword: "FAQ Fitnessstudio Hattingen", "Was kostet Fitnessstudio Hattingen"
   * Title: 53 Zeichen
   * Description: 143 Zeichen
   */
  faq: {
    title: 'FAQ Fitnessstudio Hattingen – alle Fragen beantwortet',
    description:
      'Alle Fragen vor der Mitgliedschaft: Preise, Kündigung, Sauna, Probetraining, Öffnungszeiten & Parkplätze. Fitness Factory Hattingen — direkt beantwortet.',
    canonical: `${BASE_URL}/faq/`,
    robots: 'index, follow',
    keywords: 'FAQ Fitnessstudio Hattingen, Fragen Gym Hattingen, Was kostet Fitnessstudio Hattingen',
  },

  /**
   * Impressum — Legal-Seite: noindex, follow
   * Kein SEO-Traffic erwünscht, aber Links folgen
   */
  impressum: {
    title: 'Impressum | Fitness Factory Hattingen GmbH',
    description: 'Impressum der Fitness Factory Hattingen GmbH gemäß § 5 TMG.',
    canonical: `${BASE_URL}/impressum/`,
    robots: 'noindex, follow',
    keywords: '',
  },

  /**
   * Datenschutz — Legal-Seite: noindex, follow
   */
  datenschutz: {
    title: 'Datenschutz | Fitness Factory Hattingen GmbH',
    description: 'Datenschutzerklärung der Fitness Factory Hattingen GmbH gemäß DSGVO.',
    canonical: `${BASE_URL}/datenschutz/`,
    robots: 'noindex, follow',
    keywords: '',
  },

  /**
   * AGB — Legal-Seite: noindex, follow
   */
  agb: {
    title: 'AGB | Fitness Factory Hattingen GmbH',
    description: 'Allgemeine Geschäftsbedingungen der Fitness Factory Hattingen GmbH.',
    canonical: `${BASE_URL}/agb/`,
    robots: 'noindex, follow',
    keywords: '',
  },

  /**
   * Kündigung — Legal/Service-Seite: noindex, follow
   */
  kuendigung: {
    title: 'Kündigung | Fitness Factory Hattingen GmbH',
    description:
      'Kündigungsformular und Informationen zur Kündigung deiner Mitgliedschaft bei der Fitness Factory Hattingen GmbH.',
    canonical: `${BASE_URL}/kuendigung/`,
    robots: 'noindex, follow',
    keywords: '',
  },
} as const

// ---------------------------------------------------------------------------
// Typen
// ---------------------------------------------------------------------------

export type PageKey = keyof typeof META_TAGS

export interface MetaTagSet {
  title: string
  description: string
  canonical: string
  robots: string
  keywords: string
}
