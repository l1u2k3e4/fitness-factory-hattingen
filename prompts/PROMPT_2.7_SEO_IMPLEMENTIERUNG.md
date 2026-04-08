# PROMPT 2.7 — SEO-Implementierung (HTML-Struktur, Schema, technisches SEO)

> **Phase:** 2 (Build)
> **Sub-Agent:** `.claude/agents/seo-analyst.md`
> **Input:** `seo/` (alle Dateien aus PROMPT 2.3), `src/` (Code aus PROMPT 2.4–2.6), `audit/02-seo-analyse.md`
> **Output:** SEO-optimierter Code in `src/`, `public/sitemap.xml`, `public/robots.txt`, SEO-Review in `docs/seo-review.md`
> **Geschätzte Dauer:** 20–30 Minuten

---

## WICHTIG: Vor dem Start

1. **Lies `CLAUDE.md`** — Tracking-IDs, Domain, technische Anforderungen
2. **Lies den Sub-Agent** `.claude/agents/seo-analyst.md`
3. **Lies die vorherigen Outputs:**
   - `seo/meta-tags.ts` (PROMPT 2.3) → Alle Meta-Tags
   - `seo/json-ld-schemas.ts` (PROMPT 2.3) → Structured Data
   - `seo/og-tags.ts` (PROMPT 2.3) → Social-Tags
   - `seo/sitemap-config.ts` (PROMPT 2.3) → Sitemap-Konfiguration
   - `seo/tracking-config.ts` (PROMPT 2.3) → Analytics + Consent
   - `src/` (PROMPT 2.4–2.6) → Gesamter Code
4. **Lies diese Pflicht-Skills (VERBINDLICH):**
   - `website-seo` → Technisches SEO, Structured Data, HTML-Struktur
   - `output-skill` → Vollständige Implementierung, kein Truncation
   - `taste-skill` → Qualitätsstandards

---

## Auftrag

Du bist ein Technical SEO Engineer. Du implementierst ALLE SEO-Maßnahmen aus dem SEO-Setup (PROMPT 2.3) in den bestehenden Code. Nach diesem Prompt ist die Website technisch SEO-optimiert und ready für Indexierung.

---

### Task 1: HTML-Semantik prüfen und korrigieren

Gehe durch JEDE Seite und stelle sicher:

- **H-Tag-Hierarchie:** Genau 1× `<h1>` pro Seite, dann `<h2>`, `<h3>` — keine Sprünge
- **Semantic HTML:** `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>` korrekt eingesetzt
- **Landmark Roles:** Nicht doppelt (HTML5-Tags reichen, keine redundanten `role`-Attribute)
- **Alt-Texte:** JEDES `<img>` hat einen beschreibenden, keyword-enthaltenden Alt-Text
- **Lang-Attribut:** `<html lang="de">` gesetzt

### Task 2: Meta-Tags implementieren

Stelle sicher, dass die SEO Head Component (`src/lib/seo.tsx`) auf JEDER Seite korrekt eingebunden ist:

- Title-Tags (aus `seo/meta-tags.ts`)
- Meta-Descriptions
- Canonical-Tags (self-referencing, mit trailing slash)
- robots (index/noindex je nach Seite)
- viewport (responsive)

### Task 3: JSON-LD Schemas einbinden

- **HealthClub + LocalBusiness:** Auf JEDER Seite als `<script type="application/ld+json">`
- **FAQPage:** Auf Homepage und /faq/ — dynamisch aus FAQ-Items in content.ts generiert
- **BreadcrumbList:** Auf allen Unterseiten
- Schema-Validierung: Alle Pflichtfelder befüllt, keine Warnings

### Task 4: Open Graph + Twitter Cards

- Alle OG-Tags auf jeder Seite (aus `seo/og-tags.ts`)
- OG-Image Spezifikation (1200×630px) — Placeholder-Referenz oder TBD
- `og:locale: de_DE`
- `og:site_name: Fitness Factory Hattingen`

### Task 5: Sitemap generieren

Erstelle `public/sitemap.xml`:
- Basierend auf `seo/sitemap-config.ts`
- Alle indexierbaren Seiten mit Priority und Changefreq
- KEINE Legal-Seiten (noindex)
- `<lastmod>` auf heutiges Datum

### Task 6: robots.txt erstellen

Erstelle `public/robots.txt`:
- Legal-Seiten mit Disallow
- Sitemap-Referenz
- Alle Crawler erlaubt

### Task 7: Analytics + Cookie-Consent Integration

Implementiere das Tracking-Setup:
- **Google Tag Manager (GTM-PQJ82LFT):** Als Container-Tag — lädt GA4, Ads, FB Pixel
- **Google Consent Mode v2:** Default denied, Update nach Cookie-Consent
- **Consent-Kategorien:**
  - Notwendig: immer aktiv
  - Statistik: GA4 (analytics_storage)
  - Marketing: FB Pixel + Google Ads (ad_storage, ad_user_data, ad_personalization)
- **KEIN Tracking vor Consent** — DSGVO-Pflicht

```typescript
// Consent Mode Default (in <head> vor GTM):
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'functionality_storage': 'granted',
  'security_storage': 'granted',
  'wait_for_update': 500
});
```

### Task 8: Bilder-SEO

- Alle Bilder mit beschreibenden `alt`-Attributen (Keywords enthalten)
- Dateinamen SEO-freundlich (bereits erledigt bei Scraping: `studio-dsc-01.jpg`, etc.)
- `loading="lazy"` auf allen Bildern AUSSER Hero (above-the-fold)
- `width` und `height` Attribute für CLS-Vermeidung

### Task 9: Performance-relevantes SEO

- `<link rel="preload">` für kritische Fonts (WOFF2)
- `<link rel="preconnect">` für externe Dienste (GTM, Maps)
- `<link rel="dns-prefetch">` für Google Maps Domain
- Canonical Tags validieren (keine Duplicates)

---

## Output-Dateien

1. **Aktualisierte Dateien in `src/`** — SEO-Optimierungen im bestehenden Code
2. **`public/sitemap.xml`** — Fertige Sitemap
3. **`public/robots.txt`** — Fertige robots.txt
4. **`docs/seo-review.md`** — Dokumentation aller SEO-Maßnahmen + Checklist

---

## Verifikation (vor Abschluss)

- [ ] Genau 1× H1 pro Seite (HTML-Validator-Check)
- [ ] ALLE Seiten haben Title + Description + Canonical + OG-Tags
- [ ] JSON-LD HealthClub Schema: Google Rich Results Test bestehen
- [ ] JSON-LD FAQPage Schema: Google Rich Results Test bestehen
- [ ] sitemap.xml enthält alle indexierbaren Seiten
- [ ] robots.txt blockiert Legal-Seiten, referenziert Sitemap
- [ ] KEIN Tracking-Script lädt vor Cookie-Consent
- [ ] Google Consent Mode Default = denied
- [ ] ALLE Bilder haben Alt-Texte mit Keywords
- [ ] Hero-Bild: eager loading, Rest: lazy loading
- [ ] Font-Preload im Head
- [ ] `<html lang="de">` gesetzt
- [ ] Keine Duplicate Canonicals
- [ ] `npm run build` kompiliert ohne Fehler
