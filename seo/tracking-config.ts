/**
 * tracking-config.ts — Fitness Factory Hattingen
 * Analytics + Tracking + Google Consent Mode Konfiguration.
 *
 * WICHTIG: Alle Tracking-Dienste sind standardmäßig DEAKTIVIERT (Default: 'denied').
 * Tracking wird erst aktiviert wenn der Nutzer im Cookie-Banner zustimmt.
 * Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)
 *
 * Google Consent Mode v2:
 * - analytics_storage: 'denied' bis Nutzer Statistik-Cookies akzeptiert
 * - ad_storage: 'denied' bis Nutzer Marketing-Cookies akzeptiert
 * - ad_user_data: 'denied' bis Nutzer Marketing-Cookies akzeptiert
 * - ad_personalization: 'denied' bis Nutzer Marketing-Cookies akzeptiert
 *
 * Tracking-IDs aus audit/01-bestandsaufnahme.md (verifiziert in Audit):
 * - GA4: GT-NCTZLR4T (Google Analytics 4 + Google Tag)
 * - Google Ads: AW-17671885275
 * - GTM: GTM-PQJ82LFT
 * - Facebook Pixel: 1477286522471998
 *
 * Feature: M15 aus Anforderungskatalog (DSGVO-konforme Cookie-Consent)
 */

// ---------------------------------------------------------------------------
// TRACKING — IDs und Konfiguration aller Tracking-Dienste
// ---------------------------------------------------------------------------

export const TRACKING = {
  /**
   * Google Analytics 4 + Google Tag
   * Verwendet GT-ID (kombiniert GA4 + Google Ads)
   */
  ga4: 'GT-NCTZLR4T',

  /**
   * Google Ads Conversion-Tracking
   */
  googleAds: 'AW-17671885275',

  /**
   * Google Tag Manager
   */
  gtm: 'GTM-PQJ82LFT',

  /**
   * Meta (Facebook) Pixel
   */
  facebookPixel: '1477286522471998',
} as const

// ---------------------------------------------------------------------------
// CONSENT_MODE — Google Consent Mode v2 Default-Einstellungen
// ---------------------------------------------------------------------------

/**
 * Default-Einstellungen für Google Consent Mode v2.
 * Diese werden SOFORT beim Laden der Seite gesetzt (noch vor GTM-Initialisierung).
 * Erst nach Nutzer-Einwilligung werden einzelne Kategorien auf 'granted' gesetzt.
 *
 * Implementierung: In index.html VOR dem GTM-Script-Tag einbinden.
 */
export const CONSENT_MODE_DEFAULTS = {
  analytics_storage: 'denied',       // GA4, Google Analytics
  ad_storage: 'denied',              // Google Ads, Facebook Pixel
  ad_user_data: 'denied',            // Google Ads User-Daten
  ad_personalization: 'denied',      // Personalisierte Werbung
  functionality_storage: 'granted',  // Notwendige Funktionen (Cookie-Banner etc.)
  personalization_storage: 'denied', // Personalisierungs-Features
  security_storage: 'granted',       // Sicherheits-relevante Cookies
  wait_for_update: 500,              // Millisekunden warten auf Consent-Update
} as const

export type ConsentCategory = 'analytics' | 'marketing' | 'necessary'

/**
 * Consent-Kategorien für das Cookie-Banner (Nutzer-sichtbar)
 */
export const COOKIE_CATEGORIES = {
  necessary: {
    label: 'Notwendig',
    description:
      'Diese Cookies sind für den Betrieb der Website technisch erforderlich. Sie ermöglichen z.B. das Cookie-Banner selbst und grundlegende Funktionen.',
    required: true,
    consentModeKeys: ['functionality_storage', 'security_storage'] as const,
    services: ['Cookie-Consent (eigene)', 'Session-Management'],
  },
  analytics: {
    label: 'Statistik',
    description:
      'Diese Cookies helfen uns zu verstehen, wie Besucher die Website nutzen. Die Daten werden anonymisiert ausgewertet.',
    required: false,
    consentModeKeys: ['analytics_storage'] as const,
    services: ['Google Analytics 4 (GA4)', 'Google Tag Manager (anonymisiert)'],
  },
  marketing: {
    label: 'Marketing',
    description:
      'Diese Cookies werden für Werbezwecke genutzt — z.B. um dir auf Facebook oder Google relevante Anzeigen der Fitness Factory zeigen zu können.',
    required: false,
    consentModeKeys: ['ad_storage', 'ad_user_data', 'ad_personalization'] as const,
    services: ['Google Ads', 'Meta (Facebook) Pixel', 'Google Tag Manager (Marketing)'],
  },
} as const

// ---------------------------------------------------------------------------
// GTM_SNIPPET — Google Tag Manager Script-Snippets
// ---------------------------------------------------------------------------

/**
 * GTM Head-Snippet (in <head> einbinden, VOR anderen Scripts)
 * ACHTUNG: Consent Mode Defaults müssen VOR diesem Snippet gesetzt werden!
 */
export const GTM_HEAD_SNIPPET = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${TRACKING.gtm}');</script>
<!-- End Google Tag Manager -->`

/**
 * GTM Body-Snippet (direkt nach <body> einbinden — Fallback für kein JS)
 */
export const GTM_BODY_SNIPPET = `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${TRACKING.gtm}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`

/**
 * Google Consent Mode v2 — Default-Einstellung Script.
 * In index.html in <head> VOR GTM einbinden.
 */
export const CONSENT_MODE_SCRIPT = `<!-- Google Consent Mode v2 — Defaults (MUSS vor GTM stehen) -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', true);
</script>`

// ---------------------------------------------------------------------------
// Consent Update Funktionen (für Cookie-Banner Implementation)
// ---------------------------------------------------------------------------

/**
 * Typen für Consent-Update aus dem Cookie-Banner
 */
export interface ConsentUpdate {
  analytics: boolean
  marketing: boolean
}

/**
 * dataLayer-Events die beim Consent-Update gefeuert werden.
 * Cookie-Banner muss diese Events nach Nutzer-Entscheidung pushen.
 *
 * @example
 * // Nutzer hat Statistik akzeptiert, Marketing abgelehnt:
 * getConsentUpdatePayload({ analytics: true, marketing: false })
 */
export function getConsentUpdatePayload(update: ConsentUpdate) {
  return {
    event: 'consent_update',
    consent: {
      analytics_storage: update.analytics ? 'granted' : 'denied',
      ad_storage: update.marketing ? 'granted' : 'denied',
      ad_user_data: update.marketing ? 'granted' : 'denied',
      ad_personalization: update.marketing ? 'granted' : 'denied',
      functionality_storage: 'granted',
      personalization_storage: update.analytics ? 'granted' : 'denied',
      security_storage: 'granted',
    },
  }
}

/**
 * Cookie-Namen für Consent-Speicherung (LocalStorage oder Cookie)
 */
export const CONSENT_STORAGE_KEY = 'ff_hattingen_consent'

export interface StoredConsent {
  version: number
  timestamp: number
  analytics: boolean
  marketing: boolean
}

export const CONSENT_VERSION = 1 // Erhöhen wenn Cookie-Policy sich ändert
