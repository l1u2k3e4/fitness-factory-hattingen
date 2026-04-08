# Fitness Factory Hattingen — Website-Relaunch

> **Diese Datei wird von Claude Code vor JEDER Aktion gelesen.**
> Sie definiert Projektkontext, Tech-Stack, Konventionen und Qualitätsziele.

---

## 1. Projektübersicht

**Kunde:** Fitness Factory Hattingen GmbH
**Branche:** Fitnessstudio / Gesundheit & Sport
**Projekt:** Kompletter Website-Relaunch — von WordPress/Elementor zu einer modernen Vite + React + TypeScript Anwendung
**Ziel:** Lokale Marktdominanz in Hattingen & Umgebung — SEO-Platz 1 für "Fitnessstudio Hattingen", Conversion-optimiert für Probetraining-Buchungen, Anrufe und WhatsApp-Kontakte

**Aktueller Status:** Phase 2 — Build (Prompts 2.1 bis 2.10) — Phase 1 abgeschlossen ✅

### Geschäftsdaten

| Feld | Wert |
|---|---|
| Firma | Fitness Factory Hattingen GmbH |
| Adresse | Im Vogelsang 95, 45527 Hattingen (Stadtteil Holthausen) |
| Telefon | 02324 33777 |
| WhatsApp | +49 1573 7580001 |
| E-Mail | fitness-factory-hattingen@gmx.de |
| Website (aktuell) | https://fitness-factory-hattingen.de/ |
| Instagram | @fitness.factory.hattingen |
| Facebook | /fitnessfactoryhattingen |
| Öffnungszeiten | Mo-Fr 08:00-23:00, Sa-So 10:00-17:30 |

### Preise & Mitgliedschaften

| Vertrag | Monatspreis | Anmeldegebühr | Besonderheit |
|---|---|---|---|
| Flex (1 Monat) | 55€ | 49€ | Monatlich kündbar |
| Standard (12 Monate) | 45€ | 49€ | Bestes Preis-Leistung |
| Premium (24 Monate) | 35€ | 49€ | Günstigster Monatspreis |
| Fremdgeh-Aktion | 0€ (3 Monate) | 49€ | Bei bestehendem Vertrag woanders |

### Inklusive Leistungen (ALLE im Preis enthalten)

Kostenlose Getränkeflat, Gratis Saunazugang, Live-Kurse (Yoga, Spinning, Tabata, Zumba, Pilates, Rücken-Fit, Tae-Bo, Wirbelsäulen-Gymnastik, Bauch-Express, Full Body Intervall), Ernährungsberatung, Trainingsberatung / individueller Trainingsplan, Kostenlose Duschen, Kostenlose Parkplätze

### Kursplan

| Tag | Kurse |
|---|---|
| Montag | Vinyasa-Yoga, Spinning, Wirbelsäulen-Gymnastik |
| Dienstag | Bauch-Express, Spinning |
| Mittwoch | Tabata, Yoga |
| Donnerstag | Tae-Bo, Spinning |
| Freitag | Rücken-Fit, Zumba |
| Sonntag | Spinning, Full Body Intervall, Pilates |

---

## 2. Ordnerstruktur

```
Website.factory/
├── CLAUDE.md                        ← DU BIST HIER — lies mich IMMER zuerst
├── .claude/
│   └── agents/                      ← Sub-Agents für spezialisierte Reviews
│       ├── website-scraper.md
│       ├── seo-analyst.md
│       ├── ux-auditor.md
│       ├── competitor-researcher.md
│       ├── content-strategist.md
│       ├── design-system-creator.md
│       └── frontend-builder.md
├── prompts/                         ← Nummerierte Prompt-Dateien (eigenständig ausführbar)
│   ├── PROMPT_1.1_BESTANDSAUFNAHME.md
│   ├── PROMPT_1.2_SEO_ANALYSE.md
│   ├── PROMPT_1.3_UX_CONVERSION.md
│   ├── PROMPT_1.4_WETTBEWERB.md
│   ├── PROMPT_1.5_ANFORDERUNGSKATALOG.md
│   ├── PROMPT_2.1_DESIGN_SYSTEM.md          ← Phase 2 (nach Phase 1)
│   ├── PROMPT_2.2_CONTENT_STRATEGIE.md
│   ├── PROMPT_2.3_SEO_SETUP.md
│   ├── PROMPT_2.4_TECH_STACK_SETUP.md
│   ├── PROMPT_2.5_KOMPONENTEN.md
│   ├── PROMPT_2.6_PAGES_SECTIONS.md
│   ├── PROMPT_2.7_SEO_IMPLEMENTIERUNG.md
│   ├── PROMPT_2.8_PERFORMANCE.md
│   ├── PROMPT_2.9_TESTING_REVIEW.md
│   └── PROMPT_2.10_DEPLOYMENT.md
├── audit/                           ← Phase 1: Analyse-Ergebnisse
│   ├── 01-bestandsaufnahme.md
│   ├── 02-seo-analyse.md
│   ├── 03-ux-conversion-analyse.md
│   ├── 04-wettbewerbsanalyse.md
│   └── 05-anforderungskatalog.md
├── docs/                            ← Zusätzliche Dokumentation, Review-Reports
├── design/                          ← Design-System (ab Prompt 2.1)
├── content/                         ← Texte & Copywriting (ab Prompt 2.2)
├── seo/                             ← SEO-Setup (ab Prompt 2.3)
├── src/                             ← React-Quellcode (ab Prompt 2.4)
├── public/                          ← Statische Assets (Bilder, Favicon, OG-Image)
└── dist/                            ← Production Build (Prompt 2.10)
```

---

## 3. Tech-Stack (neue Website)

| Technologie | Version | Verwendung |
|---|---|---|
| **Vite** | latest | Build-Tool, Dev-Server |
| **React** | 19 | UI-Framework |
| **TypeScript** | strict mode | Typsicherheit |
| **Tailwind CSS** | v3.4+ | Styling (Utility-First) |
| **Framer Motion** | 12+ | Animationen, Scroll-Transitions |
| **React Router** | v6+ | Client-side Routing |
| **Lucide React** | latest | Icon-Bibliothek |
| **clsx + tailwind-merge** | latest | Conditional CSS Klassen |

### Verboten

- **KEIN Next.js** — kein `"use client"`, kein `<Image>`, kein `next/link`
- **KEIN Redux** — React State + Context reichen aus
- **KEINE CSS-Dateien pro Komponente** — nur Tailwind Klassen
- **KEIN jQuery** — modernes React

---

## 4. Code-Konventionen

### Allgemein

- **Functional Components only** — keine Class Components
- **TypeScript strict** — alle Props getypt, keine `any` Types
- **Content aus `src/data/content.ts`** — KEINE Texte direkt in JSX
- **Alle Farben über `brand-*` Tokens** — nie Hex-Codes direkt im JSX
- **Ein Button-Stil = Ein Component** — `Button` für alle CTAs (KEIN "GlowButton")

### Namensgebung

- **Deutsche Namen** für Content-Variablen: `heroHeadline`, `leistungenItems`, `kontaktAdresse`
- **Englische Namen** für Code-Logik: `useState`, `handleClick`, `isMenuOpen`
- **Dateien:** PascalCase für Components (`Button.tsx`), camelCase für Utils (`cn.ts`)

### Datei-Struktur pro Component

```typescript
// 1. Imports
import { motion } from 'framer-motion'
import { COPY } from '@/data/content'

// 2. Types/Interfaces
interface Props { /* ... */ }

// 3. Component
export default function ComponentName({ ...props }: Props) {
  // 4. Hooks, State, Logic
  // 5. Return JSX
}
```

---

## 5. Pflicht-Skills

**Vor JEDER Aufgabe die relevanten Skills lesen:**

### Projekt-eigene Skills (global installiert, immer verfügbar)

| Skill | Wann einsetzen |
|---|---|
| `website-content-strategie` | Bei Content-Erstellung, Seitenstruktur, Copywriting |
| `seo-audit`,`seo-geo`,`ai-seo` | Bei SEO-Analyse, Meta-Tags, Structured Data, Keywords |
| `website-ux-ui-design` | Bei Design-System, Farben, Fonts, Komponenten, Animationen |
| `website-frontend-promptbuilder` | Bei Build-Prompt-Erstellung (Phase 2) |
| `n8n-rag-chatbot` | Bei Chatbot-Integration (Phase 2) |

### Anti-Slop Design Skills (ab Phase 2 — PFLICHT für Design & Build)

| Skill | Wann einsetzen |
|---|---|
| `taste-skill` | IMMER bei Design-System, Komponenten und Code — verhindert generischen KI-Output |
| `soft-skill` | Bei Design-System-Erstellung — definiert Premium-Agentur-Standards für Fonts, Shadows, Animationen |
| `redesign-skill` | Bei UX-Audit der bestehenden Site (Phase 1.3) und Design-Upgrade-Entscheidungen (Phase 2.1) |
| `output-skill` | IMMER beim Frontend-Building (Phase 2.4–2.8) — verhindert Code-Truncation |
| `ui-ux-pro-max` | Bei Farbsystem, Font-Pairing, UX-Entscheidungen aller Art |
| `frontend-design` | Bei Komponenten-Design und Ästhetik-Entscheidungen |
| `web-design-guidelines` | Bei Accessibility- und Interface-Quality-Review |

### Regel: JEDE Prompt-Datei referenziert die nötigen Skills

Jede `PROMPT_*.md` enthält am Anfang einen **"WICHTIG: Vor dem Start"**-Block mit den relevanten Skills. Diese werden VOR der eigentlichen Arbeit gelesen. Das ist **VERBINDLICH**.

### Regel: Skill nicht installiert?

Falls ein Skill nicht gefunden wird → dem Nutzer den Skill-Namen nennen und Installationshinweis geben.

---

## 6. Sub-Agents

Spezialisierte Agents liegen unter `.claude/agents/`. Sie werden für Analyse und Qualitätssicherung eingesetzt:

| Agent | Datei | Phase | Wann einsetzen |
|---|---|---|---|
| **Website Scraper** | `website-scraper.md` | 1 | Bestandsaufnahme der aktuellen Website |
| **SEO Analyst** | `seo-analyst.md` | 1 | SEO-Tiefenanalyse |
| **UX Auditor** | `ux-auditor.md` | 1 | UX/Conversion-Analyse |
| **Competitor Researcher** | `competitor-researcher.md` | 1 | Wettbewerbsanalyse |
| **Content Strategist** | `content-strategist.md` | 2 | Texte, Seitenstruktur, Copywriting |
| **Design System Creator** | `design-system-creator.md` | 2 | Farben, Fonts, Komponenten |
| **Frontend Builder** | `frontend-builder.md` | 2 | Website-Entwicklung |

**Workflow:** Sub-Agents nutzen frische Kontextfenster für optimale Leistung pro Aufgabe.

---

## 7. Zielgruppe & Positionierung

- **Zielgruppe:** Breiter Mix aller Altersgruppen — junge Erwachsene, Berufstätige, Familien, Senioren
- **Positionierung:** Premium-Qualität zum fairen Preis, familiäre Atmosphäre, persönliche Betreuung
- **Tonalität:** Du-Ansprache, motivierend, familiär, energetisch, inklusiv (alle willkommen)
- **Einzugsgebiet:** Hattingen, Hattingen-Holthausen, Bochum-Linden, Sprockhövel, Witten, Blankenstein

### USPs (Alleinstellungsmerkmale)

1. Familiäres Studio — keine anonyme Massenabfertigung
2. All-inclusive zum fairen Preis — Sauna, Getränke, Kurse, alles drin
3. Persönliche Betreuung — Ernährungsberatung + Trainingsplan inklusive
4. Breites Kursangebot — von Yoga bis Tabata, für jeden etwas
5. Kostenlose Parkplätze — kein Parkplatzstress

---

## 8. Wettbewerb

### Direkte Konkurrenz

- **Gesundheitswerk Hattingen** (gesundheitswerk.net) — Hauptkonkurrent, "Studio Nr.1 in Hattingen", Öffnung ab 06:30
- Weitere lokale Studios im Umkreis 15km (über Eversports, Google Maps recherchieren)

### Benchmark (große Ketten)

- **FitX** (fitx.de) — 29€/Monat, App, Self-Service, "NO BULLSH!T PREIS"
- **John Reed** (johnreed.fitness) — Premium-Design, Video-Hero, emotionales Branding
- **McFit** (mcfit.com) — 24/7, Modernisierung, massive Reichweite

### Wettbewerbsvorteile Fitness Factory

- Familiäre Atmosphäre (Ketten können das nicht)
- All-inclusive inkl. Sauna (FitX hat keine Sauna)
- Persönliche Betreuung und Ernährungsberatung
- Lokale Community-Verankerung
- KI-Chatbot geplant (kein Wettbewerber hat das — First Mover!)

---

## 9. Bekannte Probleme der aktuellen Website

### SEO (Kritisch!)
- Title-Tag ist nur "Home -" — muss "Fitnessstudio Hattingen" enthalten
- Meta-Description unvollständig — keine Value Proposition, kein CTA
- Kein lokales SEO für Einzugsgebiet optimiert
- Fehlende JSON-LD Structured Data (LocalBusiness/HealthClub)
- Keine FAQ-Schema-Markup → verpasste Featured Snippets

### UX/Conversion
- Kein Online-Buchungssystem für Probetraining/Kurse
- Keine Trainer-Profile mit Fotos und Qualifikationen
- Keine Erfolgsgeschichten / Transformationen
- Kein Member-Bereich / App-Integration
- Kein Chatbot / KI-Assistent

### Technisch
- WordPress/Elementor (langsam, aufgebläht)
- GMX E-Mail-Adresse (unprofessionell)
- Performance-Optimierung dringend nötig

---

## 10. Qualitätsziele

### SEO — Lokale Dominanz

- **Platz 1** bei Google für: "Fitnessstudio Hattingen", "Gym Hattingen", "Fitness Hattingen", "Probetraining Hattingen"
- **JSON-LD Structured Data:** HealthClub, FAQPage, OpeningHoursSpecification
- **Core Web Vitals:** LCP < 2.5s, INP < 200ms, CLS < 0.1
- **Lokales SEO:** NAP-Konsistenz, Google Business, Einzugsgebiet-Keywords

### UX/UI — Clean, professionell, CI-konform

- **Corporate Identity:** Logo-Farben = Rot + Schwarz + Weiß — diese CI durchzieht ALLES
- **Weißer Hintergrund** — KEIN dunkles/graues Theme (Ausnahme: Hero + Footer)
- **Rote Buttons** (brand-primary), schwarze Headlines (brand-dark), cleane Borders
- **Scharfe Ecken:** Buttons 4px, Cards 6px — KEIN rounded-2xl, KEIN rounded-full auf Buttons
- **KEIN Glow/Gradient** — keine farbigen Shadows, kein Gradient-Text, kein Pulsieren
- **Dezente Animationen** — kurz (0.4s), subtil (20px offset), professionell
- **Button heißt `Button`** — NICHT "GlowButton"
- **Mobile-first** Design — 60%+ der Nutzer kommen mobil
- **Sub-2s Ladezeit** auf 4G-Mobilfunk
- **Professioneller Look** — wie von einem Webdesigner, NICHT wie KI-generiert

### Conversion — Jede Seite konvertiert

- **CTA above-the-fold** auf jeder Seite (Probetraining, Anruf, WhatsApp)
- **Sticky CTA-Bar** auf Mobile nach 30% Scroll
- **Click-to-Call + WhatsApp** Button immer sichtbar
- **Trust-Signale** prominent (Bewertungen, Mitgliederzahl)

### DSGVO — Rechtlich korrekt

- Impressum vollständig nach TMG
- Datenschutzerklärung vollständig nach DSGVO
- Cookie-Consent Banner mit Accept/Decline
- Kontaktformular mit Einwilligungserklärung

---

## 11. Prompt-Reihenfolge

Die Prompts werden nacheinander ausgeführt. Jeder Prompt ist eigenständig — keine Abhängigkeit auf Chat-Kontext aus vorherigen Prompts:

### Phase 1 — Analyse & Audit
1. **PROMPT_1.1** — Bestandsaufnahme (Website scrapen, alles dokumentieren)
2. **PROMPT_1.2** — SEO-Tiefenanalyse (Technisch, Lokal, Content, Backlinks)
3. **PROMPT_1.3** — UX/Conversion-Analyse (User Journeys, Scoring, Gaps)
4. **PROMPT_1.4** — Wettbewerbsanalyse (Region, Ketten, Best Practices)
5. **PROMPT_1.5** — Anforderungskatalog (Zusammenführung, Roadmap)

### Phase 2 — Design & Build (ERST nach Phase 1!)
6. **PROMPT_2.1** — Design-System (Farben, Fonts, Spacing, Komponenten)
7. **PROMPT_2.2** — Content-Strategie (Texte, Seitenstruktur, content.ts)
8. **PROMPT_2.3** — SEO-Setup (Meta-Tags, JSON-LD, Sitemap)
9. **PROMPT_2.4** — Tech-Stack Setup (Vite + React + TS + Tailwind)
10. **PROMPT_2.5** — Komponenten (Buttons, Cards, Nav, Formulare)
11. **PROMPT_2.6** — Pages & Sections (Seiten zusammenbauen, Routing)
12. **PROMPT_2.7** — SEO-Implementierung (HTML-Struktur, Schema)
13. **PROMPT_2.8** — Performance (Lazy Loading, Bilder, Bundle)
14. **PROMPT_2.9** — Testing & Review (alle Sub-Agents durchlaufen)
15. **PROMPT_2.10** — Deployment (Build, finale Checks, Übergabe)

---

## 12. Wichtige Regeln

1. **Alle Arbeit findet in `Website.factory/` statt**
2. **Jeder Prompt ist eigenständig** — bei frischem Kontext diese CLAUDE.md erneut lesen
3. **Skills werden IMMER zuerst gelesen** — kein Prompt startet ohne Skill-Check
4. **Sub-Agents nutzen frische Kontextfenster** — genau dafür sind sie da
5. **Kein Prompt ohne Verification** — jeder Prompt endet mit einer Prüfung
6. **Content NIEMALS erfinden** — alle Texte basieren auf echten Fitness Factory Daten
7. **TypeScript strict** — keine `any` Types, keine `@ts-ignore`
8. **Phase 1 zuerst** — keine Design-/Build-Arbeit bevor die Analyse komplett ist
9. **Deutsch** — alle Dokumente und Website-Texte auf Deutsch
10. **Gründlichkeit vor Geschwindigkeit** — lieber zu viel analysieren als zu wenig
