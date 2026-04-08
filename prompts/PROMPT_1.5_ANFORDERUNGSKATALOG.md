# PROMPT 1.5 — Anforderungskatalog (Zusammenführung)

> **Phase:** 1 (Analyse — FINALER PROMPT)
> **Skills:** `website-content-strategie` + `website-seo` + `website-ux-ui-design` — ALLE DREI vor dem Start lesen
> **Input:** ALLE bisherigen Audit-Dokumente
> **Output:** `audit/05-anforderungskatalog.md`
> **Geschätzte Dauer:** 15–20 Minuten

---

## WICHTIG: Vor dem Start

1. **Lies `CLAUDE.md`** im Projektstamm für den vollständigen Projektkontext
2. **Lies den Skill `website-content-strategie`** — für Seitenstruktur-Typen, Section-Dramaturgie, Content-Patterns
3. **Lies den Skill `website-seo`** — für SEO-Anforderungen, Keyword-Strategie, technische SEO-Checkliste
4. **Lies den Skill `website-ux-ui-design`** — für Design-Anforderungen, Komponenten, Animationen, Conversion-Design
5. **Lies ALLE Audit-Dokumente:**
   - `audit/01-bestandsaufnahme.md`
   - `audit/02-seo-analyse.md`
   - `audit/03-ux-conversion-analyse.md`
   - `audit/04-wettbewerbsanalyse.md`

---

## Auftrag

Du bist Projektmanager und strategischer Berater. Erstelle aus ALLEN bisherigen Analysen den **vollständigen Anforderungskatalog** für die neue Fitness Factory Website. Dieses Dokument wird das FUNDAMENT für Phase 2 (Design & Build).

### 1. Status Quo — Top 10 Probleme

Fasse die KRITISCHSTEN Probleme der aktuellen Website zusammen. Priorisiere nach Business-Impact:

| # | Problem | Quelle | Impact |
|---|---|---|---|
| 1 | [z.B. Title-Tag "Home -"] | SEO-Analyse | Kritisch |
| 2 | ... | ... | ... |
| ... | | | |
| 10 | ... | ... | ... |

### 2. Anforderungskatalog — Feature-Matrix

#### MUSS-Features (Launch-kritisch)

| # | Feature | Beschreibung | Begründung (aus Analyse) | Prio |
|---|---|---|---|---|
| M1 | | | | 🔴 |
| M2 | | | | 🔴 |
| ... | | | | |

#### SOLL-Features (Phase 2 — 1-3 Monate nach Launch)

| # | Feature | Beschreibung | Begründung | Prio |
|---|---|---|---|---|
| S1 | | | | 🟡 |
| ... | | | | |

#### KANN-Features (Phase 3 — Nice-to-have)

| # | Feature | Beschreibung | Begründung | Prio |
|---|---|---|---|---|
| K1 | | | | 🟢 |
| ... | | | | |

### 3. Seitenstruktur der neuen Website

Nutze die Dramaturgie-Typen aus dem `website-content-strategie` Skill.

**Empfehlung:** Typ A (Lead-Generation Landingpage) + Elemente von Typ C (Firmenwebsite)

#### Homepage — Section-Reihenfolge + Beschreibung

```
1. Navigation
   └── Sticky, transparent → solid on scroll
   └── Logo links, Links Mitte, CTA rechts
   └── Mobile: Hamburger → Slide-Over von rechts

2. Hero-Section
   └── Fullscreen, dunkler Hintergrund mit Gradient/Video
   └── Headline + Subline + CTA
   └── Trust-Signal unter CTA
   └── Scroll-Indicator

3. Trust-Bar
   └── 4-5 Kennzahlen (Mitglieder, Bewertung, Jahre, Kurse/Woche)
   └── AnimatedCounter

4. Problem-Section
   └── 3 Schmerzpunkte der Zielgruppe
   └── Cards mit Icons

5. Leistungen-Section
   └── 8-10 Feature-Cards (All-inclusive)
   └── Grid: 2 mobil, 4 desktop

6. Kursplan-Section
   └── Interaktiver Wochenplan
   └── Filter nach Wochentag
   └── Responsive: Cards mobil, Tabelle desktop

7. Preise-Section
   └── 3 Mitgliedschafts-Pakete
   └── Mittlere hervorgehoben
   └── Fremdgeh-Aktion als Banner

8. Team-Section
   └── Trainer-Karten mit Foto + Qualifikation
   └── Hover-Effekt

9. Testimonials-Section
   └── Google-Bewertungen
   └── Carousel mobil, Grid desktop

10. Galerie-Section
    └── Studio-Fotos (Masonry/Grid)
    └── Lightbox bei Klick

11. FAQ-Section
    └── 10-15 Fragen als Accordion
    └── FAQ Schema Markup

12. Kontakt-Section
    └── Formular + Google Maps + Öffnungszeiten
    └── Click-to-Call + WhatsApp

13. Footer
    └── 4 Spalten: Info, Links, Kontakt, Social

14. Chatbot-Widget
    └── Floating Button rechts unten

15. Cookie-Banner
    └── DSGVO-konform
```

#### Weitere Seiten

| Seite | URL | Zweck | Priorität |
|---|---|---|---|
| Probetraining | /probetraining | Dedizierte Landingpage für Ads | 🔴 Hoch |
| Kurse | /kurse | Detaillierter Kursplan mit Beschreibungen | 🔴 Hoch |
| Preise | /preise | Ausführliche Preisseite mit FAQ | 🔴 Hoch |
| Team | /team | Trainer-Profile | 🟡 Mittel |
| Impressum | /impressum | Rechtliche Pflichtseite | 🔴 Hoch |
| Datenschutz | /datenschutz | DSGVO | 🔴 Hoch |
| Blog | /blog | Content-Marketing | 🟢 Phase 2 |

### 4. Technische Anforderungen

| Anforderung | Spezifikation |
|---|---|
| Tech-Stack | Vite + React 19 + TypeScript + Tailwind CSS 3.4 + Framer Motion 12 |
| Routing | React Router v6 |
| Hosting | Vercel / Netlify / eigener Server |
| Domain | fitness-factory-hattingen.de |
| SSL | HTTPS Pflicht |
| Performance | LCP < 2.5s, CLS < 0.1, INP < 200ms |
| Mobile | Mobile-first, responsive ab 375px |
| Browser-Support | Chrome, Firefox, Safari, Edge (letzte 2 Versionen) |
| Analytics | Google Analytics 4 + Google Tag Manager |
| DSGVO | Cookie-Consent, Datenschutzerklärung, Impressum |

### 5. Design-Anforderungen

Basierend auf `website-ux-ui-design` Skill und Wettbewerbsanalyse:

| Element | Anforderung |
|---|---|
| Farbschema | Energetisch aber zugänglich, WCAG AA Kontrast |
| Typografie | Sportlich + lesbar (z.B. Oswald + DM Sans) |
| Bildstil | Professionelle Studio-Fotos, authentisch, warm |
| Animationen | Framer Motion: Fade-in, Stagger, Counter, Hover |
| Hintergrund-Muster | Alternierend weiß/surface |
| Section-Padding | py-16 md:py-24 |
| Container | max-w-[1200px] |

### 6. Content-Anforderungen

| Content-Typ | Status | Aktion nötig |
|---|---|---|
| Headlines & Sublines | Neu schreiben | Copywriting nach Skill-Regeln |
| Body-Texte | Neu schreiben | SEO-optimiert, Du-Ansprache |
| FAQ | Teilweise vorhanden | Erweitern, Einwände behandeln |
| Preise | Vorhanden | Übernehmen, besser darstellen |
| Kursplan | Vorhanden | Interaktiv machen |
| Trainer-Profile | FEHLT | Fotos + Texte vom Kunden nötig |
| Testimonials | Teilweise vorhanden | Google-Bewertungen einbinden |
| Studio-Fotos | Vorhanden | Qualität prüfen, ggf. neue nötig |
| Video | YouTube vorhanden | Prüfen ob qualitativ ausreichend |
| Logo | Vorhanden | Prüfen ob SVG verfügbar |
| Impressum | Vorhanden | Übernehmen + prüfen |

**Vom Kunden benötigt:**
- [ ] Trainer-Fotos (professionell, einheitlicher Stil)
- [ ] Trainer-Qualifikationen und Spezialisierungen
- [ ] Aktuelle Mitgliederzahl (für Trust-Bar)
- [ ] Gründungsjahr des Studios
- [ ] Logo als SVG-Datei
- [ ] Ggf. neue Studio-Fotos (Trainingsbereich, Sauna, Empfang)
- [ ] Bestätigung aller Preise und Konditionen
- [ ] E-Mail-Adresse auf eigener Domain (info@fitness-factory-hattingen.de)

### 7. SEO-Strategie

Basierend auf `website-seo` Skill und SEO-Analyse:

**Primärkeywords:**
| Keyword | Zielseite | Aktueller Rank | Ziel-Rank |
|---|---|---|---|
| Fitnessstudio Hattingen | Homepage | ? | #1 |
| Gym Hattingen | Homepage | ? | #1-3 |
| Probetraining Hattingen | /probetraining | ? | #1 |
| Fitnesskurse Hattingen | /kurse | ? | #1-3 |
| Fitnessstudio mit Sauna Hattingen | Homepage | ? | #1 |

**Lokale SEO Maßnahmen:**
1. Google Business Profile optimieren
2. NAP-Konsistenz herstellen
3. JSON-LD HealthClub + FAQPage
4. Einzugsgebiet-Keywords integrieren
5. Branchenverzeichnis-Einträge prüfen

**Content-Marketing (Phase 2+):**
- Blog starten: 2 Artikel/Monat
- Themen: Fitness-Tipps, Kursvorstellungen, Erfolgsgeschichten, lokale Events

### 8. Conversion-Strategie

**CTA-Platzierung:**
- Hero: Primär-CTA "Kostenloses Probetraining"
- Nach Problem-Section: CTA
- Nach Preise-Section: CTA
- Sticky Bar Mobile: CTA nach 30% Scroll
- Footer: Kontakt-CTAs

**Lead-Magnete (Phase 2):**
- Kostenloses Probetraining (primär)
- "7-Tage Fitness Challenge" Download
- Ernährungsplan als PDF

**Tracking:**
- Google Analytics 4 Events: Probetraining-Klick, Anruf-Klick, WhatsApp-Klick, Formular-Submit
- Google Ads Conversion Tracking
- Facebook Pixel Events

---

## Verification

- [ ] Alle 4 Audit-Dokumente als Basis verwendet?
- [ ] Top 10 Probleme identifiziert und priorisiert?
- [ ] Feature-Matrix vollständig (MUSS/SOLL/KANN)?
- [ ] Seitenstruktur basiert auf Skill-Dramaturgie?
- [ ] Technische Anforderungen komplett?
- [ ] Design-Anforderungen basieren auf Skill + Wettbewerb?
- [ ] Content-Anforderungen mit "Vom Kunden benötigt" Liste?
- [ ] SEO-Strategie mit konkreten Keywords und Ziel-Rankings?
- [ ] Conversion-Strategie mit CTA-Platzierung und Tracking?
- [ ] Alle 3 Skills als Referenz verwendet?
- [ ] Dieses Dokument ist als FUNDAMENT für Phase 2 nutzbar?

---

## Output

Speichere als **`audit/05-anforderungskatalog.md`**

**Dies ist das letzte Dokument von Phase 1.** Danach hat der Nutzer alles was er für Phase 2 (Design & Build) braucht.
