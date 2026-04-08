# PROMPT 2.3 — SEO-Setup (Meta-Tags, JSON-LD, Sitemap, robots.txt)

> **Phase:** 2 (Build)
> **Sub-Agent:** `.claude/agents/seo-analyst.md`
> **Input:** `audit/02-seo-analyse.md`, `audit/05-anforderungskatalog.md` (M01–M04, M12–M13), `src/data/content.ts`
> **Output:** `seo/meta-tags.ts` + `seo/json-ld-schemas.ts` + `seo/sitemap-config.ts` + `seo/seo-checklist.md`
> **Geschätzte Dauer:** 20–30 Minuten

---

## WICHTIG: Vor dem Start

1. **Lies `CLAUDE.md`** — Geschäftsdaten, Adressen, Tracking-IDs (GA4, GTM, FB Pixel, Google Ads)
2. **Lies den Sub-Agent** `.claude/agents/seo-analyst.md`
3. **Lies die Audit-Ergebnisse:**
   - `audit/02-seo-analyse.md` → Alle SEO-Probleme (Score 25/100), fehlende Elemente
   - `audit/05-anforderungskatalog.md` → MUSS-Features M01–M04, M12–M13, Technische Anforderungen
4. **Lies diese Pflicht-Skills (VERBINDLICH):**
   - `website-seo` → Meta-Tags, JSON-LD, Structured Data, Sitemap, robots.txt
   - `taste-skill` → Qualitätsstandards auch für SEO-Markup
5. **Lies den Content** `src/data/content.ts` (Output von PROMPT 2.2) — Meta-Tags müssen zum Content passen

---

## Auftrag

Du bist ein Technical SEO Specialist. Du erstellst das komplette SEO-Foundation-Setup für die neue Fitness Factory Website — von Meta-Tags über JSON-LD bis Sitemap. Ziel: Von SEO-Score 25/100 auf 90+/100.

### Kernprobleme aus Audit (zu lösen)

| Problem | Lösung | Feature-Ref |
|---|---|---|
| Title-Tags unkonfiguriert ("Home -") | Keyword-optimierte Titles pro Seite | M01 |
| Meta-Descriptions auf 5/8 Seiten fehlend | Conversion-optimierte Descriptions | M02 |
| Kein JSON-LD HealthClub Schema | Vollständiges HealthClub + LocalBusiness | M03 |
| Kein FAQPage Schema | FAQPage Markup für alle FAQ-Items | M04 |
| Keine OG-Tags / Twitter Cards | Vollständige Social-Media-Tags | M12 |
| Legal-Seiten in Sitemap (ohne noindex) | noindex für /impressum/, /datenschutz/, /agb/ | M13 |
| Keine Canonical-Tags | Self-referencing Canonicals auf allen Seiten | Audit 02 |
| Google Fonts remote (Datenschutz) | Lokal gehostete Fonts | Audit 01 |

---

### Task 1: Meta-Tags pro Seite

Erstelle optimierte Meta-Tags für JEDE Seite der Website:

```typescript
// seo/meta-tags.ts
export const META_TAGS = {
  home: {
    title: 'Fitnessstudio Hattingen · Sauna, Kurse ab 35€ – Fitness Factory',
    description: 'Dein All-inclusive Fitnessstudio in Hattingen: Sauna, 17 Live-Kurse, Getränkeflat & persönliche Betreuung ab 35€/Monat. Jetzt kostenloses Probetraining buchen!',
    canonical: 'https://fitness-factory-hattingen.de/',
    robots: 'index, follow',
  },
  probetraining: {
    title: 'Kostenloses Probetraining in Hattingen buchen – Fitness Factory',
    description: '...',
    canonical: 'https://fitness-factory-hattingen.de/probetraining/',
    robots: 'index, follow',
  },
  // ... alle weiteren Seiten
} as const
```

**Regeln:**
- Title: 50–60 Zeichen, Primärkeyword am Anfang, Brand am Ende
- Description: 150–160 Zeichen, USP + CTA, emotional
- Canonical: Self-referencing auf jeder Seite (mit trailing slash)
- Legal-Seiten: `robots: 'noindex, follow'`

### Task 2: JSON-LD Structured Data

Erstelle vollständige JSON-LD Schemas:

#### 2a: HealthClub + LocalBusiness (auf jeder Seite)

```json
{
  "@context": "https://schema.org",
  "@type": ["HealthClub", "LocalBusiness"],
  "name": "Fitness Factory Hattingen",
  "description": "All-inclusive Fitnessstudio in Hattingen mit Sauna, Live-Kursen und persönlicher Betreuung",
  "url": "https://fitness-factory-hattingen.de",
  "telephone": "+49-2324-33777",
  "email": "fitness-factory-hattingen@gmx.de",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Im Vogelsang 95",
    "addressLocality": "Hattingen",
    "addressRegion": "NRW",
    "postalCode": "45527",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "TBD",
    "longitude": "TBD"
  },
  "openingHoursSpecification": [
    { "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "23:00" },
    { "dayOfWeek": ["Saturday","Sunday"], "opens": "10:00", "closes": "17:30" }
  ],
  "priceRange": "€€",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Sauna", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Getränkeflat", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Kostenlose Parkplätze", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Live-Kurse", "value": true }
  ],
  "sameAs": [
    "https://www.instagram.com/fitness.factory.hattingen/",
    "https://www.facebook.com/fitnessfactoryhattingen/"
  ]
}
```

#### 2b: FAQPage Schema (auf Homepage + /faq/)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was kostet ein Fitnessstudio in Hattingen?",
      "acceptedAnswer": { "@type": "Answer", "text": "..." }
    }
    // ... alle FAQ-Items aus content.ts
  ]
}
```

#### 2c: BreadcrumbList (auf Unterseiten)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://fitness-factory-hattingen.de/" },
    { "@type": "ListItem", "position": 2, "name": "Probetraining", "item": "https://fitness-factory-hattingen.de/probetraining/" }
  ]
}
```

### Task 3: Open Graph + Twitter Cards

```typescript
// Pro Seite:
export const OG_TAGS = {
  home: {
    'og:title': '...',
    'og:description': '...',
    'og:image': '/og-image-home.jpg', // 1200x630px
    'og:type': 'website',
    'og:url': 'https://fitness-factory-hattingen.de/',
    'og:locale': 'de_DE',
    'og:site_name': 'Fitness Factory Hattingen',
    'twitter:card': 'summary_large_image',
    'twitter:title': '...',
    'twitter:description': '...',
    'twitter:image': '/og-image-home.jpg',
  },
  // ... alle Seiten
}
```

**OG-Image:** Erstelle Spezifikation für OG-Images (1200×630px):
- Homepage: Logo + Gym-Foto + "Dein All-inclusive Fitnessstudio"
- Probetraining: "Kostenloses Probetraining" + Gym-Atmosphäre
- TBD: Vom Kunden erstellen lassen oder mit Bildgenerierung

### Task 4: Sitemap & robots.txt

**sitemap.xml Konfiguration:**
```typescript
export const SITEMAP_PAGES = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/probetraining/', priority: 0.9, changefreq: 'monthly' },
  { url: '/mitgliedschaft/', priority: 0.8, changefreq: 'monthly' },
  { url: '/kursplan/', priority: 0.8, changefreq: 'weekly' },
  { url: '/team/', priority: 0.6, changefreq: 'monthly' },
  { url: '/fremdgeh-aktion/', priority: 0.7, changefreq: 'monthly' },
  { url: '/faq/', priority: 0.5, changefreq: 'monthly' },
  // KEINE Legal-Seiten!
]
```

**robots.txt:**
```
User-agent: *
Allow: /

Disallow: /impressum/
Disallow: /datenschutz/
Disallow: /agb/
Disallow: /kuendigung/

Sitemap: https://fitness-factory-hattingen.de/sitemap.xml
```

### Task 5: Tracking-Setup Konfiguration

Erstelle Konfiguration für Analytics (ALLE über Cookie-Consent gesteuert):

```typescript
export const TRACKING = {
  ga4: 'GT-NCTZLR4T',
  googleAds: 'AW-17671885275',
  gtm: 'GTM-PQJ82LFT',
  facebookPixel: '1477286522471998',
  consentMode: {
    analytics_storage: 'denied', // Default: denied bis Consent
    ad_storage: 'denied',
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted',
  }
}
```

### Task 6: SEO-Checklist

Erstelle eine Verifikations-Checklist die nach dem Build (PROMPT 2.9) geprüft wird.

---

## Output-Dateien

1. **`seo/meta-tags.ts`** — Alle Meta-Tags, Titles, Descriptions pro Seite
2. **`seo/json-ld-schemas.ts`** — HealthClub, FAQPage, BreadcrumbList Schemas
3. **`seo/og-tags.ts`** — Open Graph + Twitter Card Tags pro Seite
4. **`seo/sitemap-config.ts`** — Sitemap-Konfiguration
5. **`seo/tracking-config.ts`** — Analytics + Consent-Mode Setup
6. **`seo/seo-checklist.md`** — Vollständige SEO-Checklist für Post-Build-Review

---

## Verifikation (vor Abschluss)

- [ ] JEDE Seite hat Title (50–60 Zeichen) mit Primärkeyword
- [ ] JEDE Seite hat Meta-Description (150–160 Zeichen) mit USP + CTA
- [ ] JSON-LD HealthClub Schema ist vollständig (alle Felder aus Anforderungskatalog)
- [ ] FAQPage Schema enthält ALLE FAQ-Items aus content.ts
- [ ] OG-Tags auf allen Seiten definiert (inkl. og:image Spezifikation)
- [ ] Legal-Seiten haben noindex, follow
- [ ] Canonical-Tags sind self-referencing mit trailing slash
- [ ] Sitemap enthält NUR indexierbare Seiten
- [ ] robots.txt blockiert Legal-Seiten und referenziert Sitemap
- [ ] Tracking-IDs stimmen mit Audit 01 überein (GA4, GTM, FB Pixel, Google Ads)
- [ ] Google Consent Mode Default = denied
- [ ] GeoCoordinates als TBD markiert (vom Kunden zu liefern)
