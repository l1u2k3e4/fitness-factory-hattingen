/**
 * sitemap-config.ts — Fitness Factory Hattingen
 * Sitemap + robots.txt Konfiguration.
 *
 * Regeln:
 * - Nur indexierbare Seiten in der Sitemap (KEINE Legal-Seiten!)
 * - robots.txt blockiert Legal-Seiten + referenziert Sitemap
 * - priority: 1.0 = Homepage, 0.9 = primäre Conversion-Seiten
 * - changefreq: 'weekly' für dynamische Inhalte (Kursplan), 'monthly' für statische
 *
 * Basis: audit/02-seo-analyse.md (Legal-Seiten in Sitemap ohne noindex, 43 Dummy-Posts)
 * Feature: M13 aus Anforderungskatalog
 */

const BASE_URL = 'https://fitness-factory-hattingen.de'

// ---------------------------------------------------------------------------
// SITEMAP_PAGES — Nur indexierbare Seiten
// ---------------------------------------------------------------------------

export interface SitemapPage {
  url: string
  priority: number
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  lastmod?: string // ISO-Date: 'YYYY-MM-DD' — bei Bedarf manuell setzen
}

export const SITEMAP_PAGES: SitemapPage[] = [
  /**
   * Homepage — höchste Priorität, primäres SEO-Ziel
   * "Fitnessstudio Hattingen" — wöchentlich aktualisiert (Kursplan-Preview)
   */
  {
    url: `${BASE_URL}/`,
    priority: 1.0,
    changefreq: 'weekly',
  },

  /**
   * Probetraining — primäre Conversion-Seite, fast so wichtig wie Homepage
   */
  {
    url: `${BASE_URL}/probetraining/`,
    priority: 0.9,
    changefreq: 'monthly',
  },

  /**
   * Mitgliedschaft & Preise — wichtig für "Fitnessstudio Hattingen Preise"-Suchen
   */
  {
    url: `${BASE_URL}/mitgliedschaft/`,
    priority: 0.8,
    changefreq: 'monthly',
  },

  /**
   * Kursplan — wöchentliche Änderungen möglich
   */
  {
    url: `${BASE_URL}/kursplan/`,
    priority: 0.8,
    changefreq: 'weekly',
  },

  /**
   * Fremdgeh-Aktion — markteinzigartiges Angebot, eigene SEO-Landing-Page
   */
  {
    url: `${BASE_URL}/fremdgeh-aktion/`,
    priority: 0.7,
    changefreq: 'monthly',
  },

  /**
   * Team — Vertrauensseite, wichtig für lokale Suchen
   */
  {
    url: `${BASE_URL}/team/`,
    priority: 0.6,
    changefreq: 'monthly',
  },

  /**
   * FAQ — Featured-Snippet-Potenzial, "Was kostet Fitnessstudio Hattingen?"
   */
  {
    url: `${BASE_URL}/faq/`,
    priority: 0.5,
    changefreq: 'monthly',
  },

  // ---------------------------------------------------------------------------
  // NICHT in der Sitemap (noindex):
  // /impressum/, /datenschutz/, /agb/, /kuendigung/
  // Diese Seiten sind in robots.txt geblockt und erhalten noindex-Tag
  // ---------------------------------------------------------------------------
]

// ---------------------------------------------------------------------------
// ROBOTS_TXT — Vollständige robots.txt Konfiguration
// ---------------------------------------------------------------------------

export const ROBOTS_TXT = `User-agent: *
Allow: /

# Legal-Seiten — kein SEO-Wert, Crawl-Budget schonen
Disallow: /impressum/
Disallow: /datenschutz/
Disallow: /agb/
Disallow: /kuendigung/

# Build-Artefakte und interne Pfade sperren
Disallow: /dist/
Disallow: /.vite/
Disallow: /node_modules/

# Sitemap
Sitemap: ${BASE_URL}/sitemap.xml
`

// ---------------------------------------------------------------------------
// generateSitemap() — Erzeugt vollständiges sitemap.xml als String
// ---------------------------------------------------------------------------

/**
 * Generiert eine vollständige sitemap.xml als String.
 * Wird in Vite build hook oder als statisches Asset in /public/sitemap.xml abgelegt.
 *
 * Verwendung in vite.config.ts:
 *   import { generateSitemap } from './seo/sitemap-config'
 *   // In build.writeBundle: fs.writeFileSync('dist/sitemap.xml', generateSitemap())
 */
export function generateSitemap(lastmod?: string): string {
  const today = lastmod ?? new Date().toISOString().split('T')[0]

  const urlEntries = SITEMAP_PAGES.map((page) => {
    const pageLastmod = page.lastmod ?? today
    return `  <url>
    <loc>${page.url}</loc>
    <lastmod>${pageLastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`
}

// ---------------------------------------------------------------------------
// Statische Vorschau des generierten Sitemaps (für Verifikation)
// ---------------------------------------------------------------------------

/**
 * Statische sitemap.xml Vorschau (ohne Datum).
 * Finale Version per generateSitemap() beim Build erzeugen.
 *
 * Ausgabe wird in /public/sitemap.xml gespeichert, damit sie unter
 * https://fitness-factory-hattingen.de/sitemap.xml erreichbar ist.
 */
export const SITEMAP_PREVIEW = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/probetraining/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_URL}/mitgliedschaft/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/kursplan/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/fremdgeh-aktion/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${BASE_URL}/team/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${BASE_URL}/faq/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`
