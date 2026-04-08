// ---------------------------------------------------------------------------
// Globale TypeScript-Types — Fitness Factory Hattingen
// ---------------------------------------------------------------------------

// Navigation
export interface NavItem {
  label: string
  href: string
  isActive?: boolean
}

// Kurse
export interface KursItem {
  tag: string
  kurse: string[]
}

// Mitgliedschaft / Preise
export type MitgliedschaftTyp = 'flex' | 'standard' | 'premium' | 'fremdgeh'

export interface MitgliedschaftPlan {
  typ: MitgliedschaftTyp
  name: string
  laufzeit: string
  preis: number
  anmeldegebuehr: number
  highlight?: boolean
  badge?: string
  beschreibung: string
  features: string[]
}

// Leistungen / Features
export interface LeistungItem {
  icon: string
  titel: string
  beschreibung: string
}

// Testimonials
export interface TestimonialItem {
  name: string
  bewertung: number
  text: string
  mitgliedSeit?: string
}

// FAQ
export interface FaqItem {
  frage: string
  antwort: string
}

// Team
export interface TeamMitglied {
  name: string
  position: string
  beschreibung: string
  bild?: string
  qualifikationen?: string[]
}

// Galerie
export interface GalerieBild {
  src: string
  alt: string
  kategorie?: string
  type?: 'image' | 'video'
}

// SEO
export interface SeoProps {
  title?: string
  description?: string
  canonical?: string
  robots?: string
  ogImage?: string
  jsonLd?: object | object[]
  noindex?: boolean
}

// Cookie Consent
export type ConsentStatus = 'pending' | 'accepted' | 'declined' | 'partial'

export interface CookieConsent {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  timestamp?: number
  version?: number
}

// Probetraining Formular
export interface ProbetrainingFormData {
  vorname: string
  nachname: string
  email: string
  telefon?: string
  wunschtermin?: string
  nachricht?: string
  datenschutz: boolean
}
