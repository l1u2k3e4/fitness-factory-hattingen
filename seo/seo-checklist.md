# SEO-Checklist — Fitness Factory Hattingen
> Erstellt: 2026-04-02
> Basis: PROMPT 2.3 SEO-Setup
> Verwendung: Post-Build-Review in PROMPT 2.9 (Testing & Review)
> Ziel: SEO-Score von 25/100 → 90+/100

---

## Anleitung

Diese Checklist wird in PROMPT 2.9 (Testing & Review) vollständig durchgearbeitet.
Jeder Punkt muss einzeln verifiziert werden — kein "sieht gut aus" ohne echten Test.

**Test-Tools:**
- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Schema.org Validator:** https://validator.schema.org/
- **Meta-Tags Tester:** https://metatags.io/ (OG-Tags)
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **Google Search Console:** nach Deployment einrichten
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **robots.txt Tester:** Google Search Console → robots.txt Tester

---

## 1. Meta-Tags (M01, M02)

### 1.1 Title-Tags

| Seite | Erwarteter Title | Zeichen | ✓/✗ |
|---|---|---|---|
| `/` | Fitnessstudio Hattingen · Sauna, Kurse ab 35€ – Fitness Factory | 62 | ☐ |
| `/probetraining/` | Kostenloses Probetraining in Hattingen buchen – Fitness Factory | 63 | ☐ |
| `/mitgliedschaft/` | Mitgliedschaft Hattingen ab 35€ – Preise | Fitness Factory | 55 | ☐ |
| `/kursplan/` | Kursplan Fitnessstudio Hattingen – Yoga, Spinning & mehr | 56 | ☐ |
| `/team/` | Unser Team – Fitness Factory Hattingen | Trainer & Betreuung | 61 | ☐ |
| `/fremdgeh-aktion/` | Fremdgeh-Aktion – 3 Monate 0€ | Fitness Factory Hattingen | 58 | ☐ |
| `/faq/` | FAQ Fitnessstudio Hattingen – alle Fragen beantwortet | 53 | ☐ |
| `/impressum/` | Impressum | Fitness Factory Hattingen GmbH | 42 | ☐ |
| `/datenschutz/` | Datenschutz | Fitness Factory Hattingen GmbH | 44 | ☐ |
| `/agb/` | AGB | Fitness Factory Hattingen GmbH | 36 | ☐ |
| `/kuendigung/` | Kündigung | Fitness Factory Hattingen GmbH | 42 | ☐ |

**Prüf-Kriterien:**
- [ ] Kein Title lautet nur "Home -" oder ähnliches
- [ ] Alle Titles enthalten "Hattingen" oder "Fitness Factory"
- [ ] Homepage-Title beginnt mit "Fitnessstudio Hattingen"
- [ ] Kein Title ist leer oder kürzer als 30 Zeichen
- [ ] Kein Title ist länger als 65 Zeichen

### 1.2 Meta-Descriptions

| Seite | Zeichen-Bereich | ✓/✗ |
|---|---|---|
| `/` | 150–160 Zeichen | ☐ |
| `/probetraining/` | 150–160 Zeichen | ☐ |
| `/mitgliedschaft/` | 150–160 Zeichen | ☐ |
| `/kursplan/` | 150–160 Zeichen | ☐ |
| `/team/` | 145–160 Zeichen | ☐ |
| `/fremdgeh-aktion/` | 140–160 Zeichen | ☐ |
| `/faq/` | 140–160 Zeichen | ☐ |
| `/impressum/` | Vorhanden (kürzer ok) | ☐ |
| `/datenschutz/` | Vorhanden (kürzer ok) | ☐ |

**Prüf-Kriterien:**
- [ ] Jede indexierbare Seite hat eine Meta-Description
- [ ] Descriptions enthalten USP (Sauna, Kurse, Preis oder Probetraining)
- [ ] Descriptions enthalten einen impliziten CTA ("buchen", "testen", "ansehen")
- [ ] Keine Description ist doppelt (Duplicate Content)

### 1.3 Canonical-Tags

- [ ] Jede Seite hat einen `<link rel="canonical" href="..." />`-Tag
- [ ] Canonical-URL ist self-referencing (zeigt auf die eigene Seite)
- [ ] Canonical-URLs verwenden https (kein http)
- [ ] Canonical-URLs haben trailing slash (`/`)
- [ ] Keine Seite zeigt auf eine andere Seite als Canonical

### 1.4 Robots-Meta-Tag

- [ ] `/impressum/` hat `<meta name="robots" content="noindex, follow">`
- [ ] `/datenschutz/` hat `<meta name="robots" content="noindex, follow">`
- [ ] `/agb/` hat `<meta name="robots" content="noindex, follow">`
- [ ] `/kuendigung/` hat `<meta name="robots" content="noindex, follow">`
- [ ] Alle anderen Seiten haben `<meta name="robots" content="index, follow">` oder keinen robots-Tag (Standard ist index, follow)

---

## 2. JSON-LD Structured Data (M03, M04)

### 2.1 HealthClub + LocalBusiness Schema

**Test:** Google Rich Results Test mit URL der Homepage
**Erwartung:** Kein Fehler, Typ "HealthClub" oder "LocalBusiness" erkannt

| Feld | Erwarteter Wert | ✓/✗ |
|---|---|---|
| @type | ["HealthClub", "LocalBusiness"] | ☐ |
| name | Fitness Factory Hattingen | ☐ |
| telephone | +49-2324-33777 | ☐ |
| email | fitness-factory-hattingen@gmx.de | ☐ |
| streetAddress | Im Vogelsang 95 | ☐ |
| addressLocality | Hattingen | ☐ |
| postalCode | 45527 | ☐ |
| addressCountry | DE | ☐ |
| priceRange | €€ | ☐ |
| Mo-Fr opens/closes | 08:00 / 23:00 | ☐ |
| Sa-So opens/closes | 10:00 / 17:30 | ☐ |
| Sauna amenityFeature | true | ☐ |
| Getränkeflat amenityFeature | true | ☐ |
| Parkplätze amenityFeature | true | ☐ |
| sameAs Instagram | vorhanden | ☐ |
| sameAs Facebook | vorhanden | ☐ |

**TBD-Felder (nach Kunden-Input einzutragen):**
- [ ] `geo.latitude` und `geo.longitude` — exakte Koordinaten vom Kunden verifizieren
- [ ] `aggregateRating` — ratingValue + reviewCount aus Google Business Profile

### 2.2 FAQPage Schema

**Test:** Google Rich Results Test → FAQPage Typ erkannt
**Erwartung:** Rich Results für FAQs in Google SERPs (Featured Snippets)

- [ ] FAQPage Schema ist auf `/` vorhanden
- [ ] FAQPage Schema ist auf `/faq/` vorhanden
- [ ] Alle 8 Homepage-FAQ-Items sind im Schema enthalten
- [ ] Alle weiteren FAQ-Items (Vollständige FAQ) sind im Schema enthalten
- [ ] Kein `mainEntity`-Item hat leere `text`-Felder (TBD-Platzhalter prüfen)
- [ ] Rich Results Test zeigt keine Fehler (Warnung für TBD-Items ggf. akzeptabel)

**Erwartete Featured Snippets bei:**
- "Was kostet Fitnessstudio Hattingen" → FAQ-Item "Was kostet eine Mitgliedschaft..."
- "Probetraining Hattingen kostenlos" → FAQ-Item "Was kostet das Probetraining?"
- "Sauna Fitnessstudio Hattingen" → FAQ-Item "Was kostet die Sauna extra?"

### 2.3 BreadcrumbList Schema

- [ ] Alle Unterseiten haben BreadcrumbList-Schema
- [ ] Homepage hat KEIN BreadcrumbList-Schema
- [ ] Position 1 zeigt immer auf `https://fitness-factory-hattingen.de/`
- [ ] Letztes Element zeigt auf die aktuelle Seite

---

## 3. Open Graph + Twitter Cards (M12)

**Test:** https://metatags.io/ und https://cards-dev.twitter.com/validator

### 3.1 Open Graph

| Seite | og:title | og:description | og:image | og:url | ✓/✗ |
|---|---|---|---|---|---|
| `/` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `/probetraining/` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `/mitgliedschaft/` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `/kursplan/` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `/team/` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `/fremdgeh-aktion/` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `/faq/` | ☐ | ☐ | ☐ | ☐ | ☐ |

**Prüf-Kriterien:**
- [ ] Alle Seiten haben `og:locale = de_DE`
- [ ] Alle Seiten haben `og:site_name = Fitness Factory Hattingen`
- [ ] `og:type = website` auf allen Seiten
- [ ] OG-Images existieren unter `/public/og-image-*.jpg` (4 Dateien)
- [ ] OG-Images sind 1200×630px und kleiner als 300KB

### 3.2 Twitter Cards

- [ ] Alle primären Seiten haben `twitter:card = summary_large_image`
- [ ] Legal-Seiten haben `twitter:card = summary`
- [ ] `twitter:image` verweist auf existierende Bilddateien
- [ ] Preview in Twitter Card Validator zeigt Bild korrekt an

### 3.3 OG-Image Dateien (vom Kunden erstellen lassen)

- [ ] `/public/og-image-home.jpg` — 1200×630px ✓/☐
- [ ] `/public/og-image-probetraining.jpg` — 1200×630px ✓/☐
- [ ] `/public/og-image-mitgliedschaft.jpg` — 1200×630px ✓/☐
- [ ] `/public/og-image-default.jpg` — 1200×630px ✓/☐

---

## 4. Sitemap & robots.txt

### 4.1 sitemap.xml

**Test:** `https://fitness-factory-hattingen.de/sitemap.xml` im Browser öffnen

- [ ] Sitemap ist unter `/sitemap.xml` erreichbar (HTTP 200)
- [ ] Sitemap enthält genau 7 URLs (keine Legal-Seiten)
- [ ] Homepage hat priority 1.0
- [ ] `/probetraining/` hat priority 0.9
- [ ] `/kursplan/` hat changefreq weekly
- [ ] KEINE der folgenden URLs ist in der Sitemap: `/impressum/`, `/datenschutz/`, `/agb/`, `/kuendigung/`
- [ ] Sitemap wird in robots.txt referenziert

### 4.2 robots.txt

**Test:** `https://fitness-factory-hattingen.de/robots.txt` im Browser öffnen

- [ ] robots.txt ist unter `/robots.txt` erreichbar (HTTP 200)
- [ ] `Disallow: /impressum/` vorhanden
- [ ] `Disallow: /datenschutz/` vorhanden
- [ ] `Disallow: /agb/` vorhanden
- [ ] `Disallow: /kuendigung/` vorhanden
- [ ] `Sitemap: https://fitness-factory-hattingen.de/sitemap.xml` vorhanden
- [ ] `Allow: /` vorhanden (Basis-Erlaubnis)

### 4.3 Google Search Console (nach Deployment)

- [ ] Sitemap in Google Search Console eingereicht
- [ ] Keine Coverage-Fehler für indexierbare Seiten
- [ ] Legal-Seiten als "Excluded: Blocked by robots.txt" angezeigt

---

## 5. Tracking & Consent (M15)

### 5.1 Google Tag Manager

- [ ] GTM lädt korrekt (im Browser: DevTools → Network → googletagmanager.com)
- [ ] GTM Container ID: `GTM-PQJ82LFT`
- [ ] GTM-Head-Snippet ist in `<head>` vor anderen Scripts
- [ ] GTM-Body-Snippet ist direkt nach `<body>`

### 5.2 Google Consent Mode v2

- [ ] Consent Mode Script steht VOR GTM-Snippet in `<head>`
- [ ] Default-Werte: `analytics_storage: 'denied'`, `ad_storage: 'denied'`
- [ ] `functionality_storage: 'granted'`, `security_storage: 'granted'`
- [ ] Nach Cookie-Accept-All: dataLayer enthält `consent_update`-Event
- [ ] Nach Cookie-Decline: Tracking bleibt geblockt (Network-Tab prüfen)

### 5.3 Cookie-Banner

- [ ] Cookie-Banner erscheint beim ersten Seitenaufruf
- [ ] Banner bietet: Alle akzeptieren / Nur notwendige / Einstellungen
- [ ] Kategorie-Beschreibungen stimmen mit tracking-config.ts überein
- [ ] Consent wird in LocalStorage unter `ff_hattingen_consent` gespeichert
- [ ] Banner erscheint nach Consent-Auswahl nicht mehr
- [ ] "Einstellungen widerrufen"-Link im Footer vorhanden

### 5.4 Tracking-IDs Verifikation

| Service | Erwartete ID | Im Code vorhanden | ✓/✗ |
|---|---|---|---|
| GA4 / Google Tag | GT-NCTZLR4T | ☐ | ☐ |
| Google Ads | AW-17671885275 | ☐ | ☐ |
| GTM Container | GTM-PQJ82LFT | ☐ | ☐ |
| Facebook Pixel | 1477286522471998 | ☐ | ☐ |

---

## 6. HTML-Grundstruktur (SEO-relevant)

### 6.1 Basis-Elemente

- [ ] `<html lang="de">` auf allen Seiten
- [ ] `<meta charset="UTF-8">` vorhanden
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1.0">` vorhanden
- [ ] `<title>` immer befüllt (nie leer)
- [ ] `<meta name="description">` immer befüllt

### 6.2 Heading-Hierarchie

| Seite | Erwarteter H1 | ✓/✗ |
|---|---|---|
| `/` | "Dein Studio. Keine Ausreden." oder "Dein Fitnessstudio in Hattingen" | ☐ |
| `/probetraining/` | Enthält "Probetraining" + "Hattingen" | ☐ |
| `/mitgliedschaft/` | Enthält "Mitgliedschaft" oder "Preise" | ☐ |
| `/kursplan/` | Enthält "Kursplan" + "Hattingen" | ☐ |
| `/team/` | Enthält "Team" | ☐ |
| `/fremdgeh-aktion/` | Enthält "Fremdgeh-Aktion" | ☐ |
| `/faq/` | Enthält "FAQ" oder "Fragen" | ☐ |

**Prüf-Kriterien:**
- [ ] Jede Seite hat genau einen `<h1>`-Tag
- [ ] Keine Seite hat zwei H1-Tags (Audit-Problem war: /probetraining/ und /mitgliedschaft/ hatten identische H1)
- [ ] H2-Tags folgen auf H1 (keine Hierarchiesprünge H1 → H3)

### 6.3 Bilder-SEO

- [ ] Alle `<img>`-Tags haben `alt`-Attribute
- [ ] Alt-Texte sind beschreibend mit Keywords (z.B. "Gerätebereich Fitnessstudio Hattingen")
- [ ] Hero-Bild hat `loading="eager"` (kein Lazy Loading für LCP-Element!)
- [ ] Alle anderen Bilder haben `loading="lazy"`
- [ ] Bilder sind WebP-Format oder haben WebP-Fallback
- [ ] Dateinamen sind sprechend (z.B. `fitnessstudio-hattingen-geraetebereich.webp`, nicht `DSC08599.jpg`)

---

## 7. Core Web Vitals (Zielwerte)

**Test:** https://pagespeed.web.dev/ mit der Live-URL

| Metrik | Zielwert | Mobile | Desktop | ✓/✗ |
|---|---|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | ☐ | ☐ | ☐ |
| INP (Interaction to Next Paint) | < 200ms | ☐ | ☐ | ☐ |
| CLS (Cumulative Layout Shift) | < 0.1 | ☐ | ☐ | ☐ |
| FCP (First Contentful Paint) | < 1.8s | ☐ | ☐ | ☐ |
| TTFB (Time to First Byte) | < 800ms | ☐ | ☐ | ☐ |

**Maßnahmen bei Unterschreitung:**
- LCP > 2.5s: Hero-Bild preloaden, Bildgröße reduzieren, CDN prüfen
- CLS > 0.1: Bildgrößen im HTML angeben, keine dynamisch eingefügten Inhalte ohne Platzhalter
- INP > 200ms: JS-Bundle analysieren, Framer Motion Code-Splitting prüfen

---

## 8. Lokales SEO

### 8.1 NAP-Konsistenz (Name, Address, Phone)

Auf der gesamten Website muss die NAP-Information konsistent sein:
- **Name:** Fitness Factory Hattingen (einheitlich — NICHT: "FITNESS FACTORY HATTINGEN GMBH" in Großbuchstaben)
- **Adresse:** Im Vogelsang 95, 45527 Hattingen
- **Telefon:** 02324 33777 (oder +49-2324-33777 im Schema)

- [ ] Footer enthält NAP-Information
- [ ] Kontaktseite enthält NAP-Information
- [ ] JSON-LD Schema enthält NAP in korrektem Format
- [ ] Keine abweichende Adressschreibweise auf der Website

### 8.2 Einzugsgebiet-Keywords (Homepage)

- [ ] "Hattingen" kommt in H1 oder Subheadline vor
- [ ] "Holthausen" kommt mindestens 1× vor (Stadtteil)
- [ ] Mindestens einer der folgenden Orte ist erwähnt: Bochum-Linden, Sprockhövel, Witten
- [ ] Alternativ: Text wie "Einzugsgebiet" oder Anfahrtsbeschreibung mit Ortsnamen

### 8.3 Google Business Profile (nach Launch)

- [ ] GBP-URL auf der Website verlinkt (optional: im Footer oder Kontaktseite)
- [ ] NAP im GBP stimmt exakt mit Website überein
- [ ] Öffnungszeiten im GBP stimmen mit Website überein
- [ ] Mindestens 5 Fotos im GBP hochgeladen
- [ ] Website-URL im GBP hinterlegt

---

## 9. DSGVO / Rechtliches

- [ ] Impressum unter `/impressum/` erreichbar (HTTP 200)
- [ ] Datenschutzerklärung unter `/datenschutz/` erreichbar
- [ ] AGB unter `/agb/` erreichbar
- [ ] Impressum und Datenschutz von jeder Seite erreichbar (Footer-Links)
- [ ] Kontaktformulare enthalten DSGVO-Einwilligungstext
- [ ] Google Maps nur nach Cookie-Consent laden
- [ ] YouTube-Videos (falls vorhanden) nur nach Cookie-Consent laden
- [ ] Facebook-Pixel nur nach Marketing-Consent aktiv
- [ ] Google Analytics nur nach Statistik-Consent aktiv

---

## 10. Post-Launch Monitoring (Empfehlung)

### Erste Woche nach Launch

- [ ] Google Search Console: Website-Eigentumsnachweis hinterlegen
- [ ] Sitemap in GSC einreichen
- [ ] URL-Inspektion für Homepage und /probetraining/ durchführen
- [ ] "Indexierung beantragen" für alle Hauptseiten

### Erste 4 Wochen nach Launch

- [ ] Ranking für "Fitnessstudio Hattingen" beobachten (Ziel: Top 10 nach 30 Tagen)
- [ ] Rich Snippets für FAQ in SERPs prüfen
- [ ] Google Business Profile: Bewertungsanzahl und Durchschnitt in JSON-LD eintragen
- [ ] Core Web Vitals in GSC prüfen (erscheinen nach 28 Tagen)

---

## Zusammenfassung: Kritische Punkte vor Go-Live

| # | Prüfpunkt | Priorität |
|---|---|---|
| 1 | HealthClub JSON-LD Schema ohne Fehler (Rich Results Test) | 🔴 KRITISCH |
| 2 | FAQPage JSON-LD Schema ohne Fehler | 🔴 KRITISCH |
| 3 | Homepage Title enthält "Fitnessstudio Hattingen" | 🔴 KRITISCH |
| 4 | Legal-Seiten haben noindex-Meta-Tag | 🔴 KRITISCH |
| 5 | Legal-Seiten NICHT in sitemap.xml | 🔴 KRITISCH |
| 6 | robots.txt sperrt Legal-Seiten | 🔴 KRITISCH |
| 7 | Google Consent Mode Default = denied | 🔴 KRITISCH |
| 8 | Canonical-Tags self-referencing mit trailing slash | 🟡 HOCH |
| 9 | OG-Tags + OG-Images für WhatsApp/Facebook-Sharing | 🟡 HOCH |
| 10 | GeoCoordinates vom Kunden verifiziert und eingetragen | 🟡 HOCH |
| 11 | alle Meta-Descriptions 150–160 Zeichen | 🟡 HOCH |
| 12 | Core Web Vitals: LCP < 2.5s auf Mobile | 🟡 HOCH |

---

*Diese Checklist ist das Abnahme-Dokument für PROMPT 2.9 (Testing & Review).*
*Alle 🔴 KRITISCH-Punkte müssen vor dem Deployment (PROMPT 2.10) bestanden sein.*
