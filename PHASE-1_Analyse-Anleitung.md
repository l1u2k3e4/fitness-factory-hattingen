# Phase 1: Analyse & Audit — Anleitung

> **Status:** AKTIV — Hier starten wir!
> **Voraussetzung:** Öffne den Ordner `Website.factory/` in VS Code mit Claude Code.
> **Claude Code liest automatisch die CLAUDE.md** und kennt dann alle Firmendaten und den Projektkontext.

---

## So arbeitest du mit den Prompts

### Setup (einmalig)
1. Öffne **VS Code** und navigiere zum Ordner `Website.factory/`
2. Claude Code liest automatisch die `CLAUDE.md` — das gibt Claude den vollen Projektkontext
3. Die Sub-Agents liegen in `.claude/agents/` und können von Claude Code referenziert werden

### Pro Prompt
1. Kopiere den Prompt-Text aus dem jeweiligen Abschnitt unten
2. Füge ihn in Claude Code ein
3. Warte bis der Prompt vollständig abgearbeitet ist
4. Prüfe das Ergebnis im `audit/` Ordner
5. Erst dann den nächsten Prompt eingeben

---

## Prompt 1 — Website-Scraping & Bestandsaufnahme

> **Sub-Agent:** `website-scraper`
> **Output:** `audit/01-bestandsaufnahme.md`
> **Dauer:** ~5-10 Minuten

```
Lies die CLAUDE.md für den Projektkontext und nutze den website-scraper Agent (.claude/agents/website-scraper.md) als Leitfaden.

Besuche https://fitness-factory-hattingen.de/ und erstelle eine vollständige Bestandsaufnahme.

Dokumentiere ALLES:
1. Technische Basis (CMS, Plugins, Tracking)
2. Alle Seiten mit URL, Title, Meta-Description, Headings
3. Homepage Section-für-Section (jeder Text, jedes Bild, jeder CTA)
4. Geschäftsdaten (EXAKT wie auf der Website dargestellt)
5. Visuelles Inventar (Farben, Fonts, Bildstil)
6. Interaktive Elemente (Formulare, Kursplan, FAQ, Galerie)

Prüfe auch die Unterseiten: /kursplan, /probetraining, /mitgliedschaft, /faq, /kontakt, /impressum, /datenschutz und eventuelle Blog-/Lifestyle-Seiten.

Speichere als audit/01-bestandsaufnahme.md.
Sei EXTREM gründlich — dieses Dokument ist die Basis für alles.
```

---

## Prompt 2 — SEO-Tiefenanalyse

> **Sub-Agent:** `seo-analyst`
> **Output:** `audit/02-seo-analyse.md`
> **Voraussetzung:** Prompt 1 abgeschlossen

```
Lies die CLAUDE.md und den seo-analyst Agent (.claude/agents/seo-analyst.md) für deine Aufgabe.
Lies außerdem audit/01-bestandsaufnahme.md für die technischen Details.

Führe ein vollständiges SEO-Audit der Website https://fitness-factory-hattingen.de/ durch.

Prüfe mit ✅/⚠️/❌ und Score (0-100%):
A) Technisches SEO (Title, Meta, Headings, Images, Structured Data, OG, robots.txt, Sitemap, Performance, Mobile)
B) Lokales SEO (NAP-Konsistenz, Google Business, lokale Keywords, Einzugsgebiet, Maps)
C) Content-SEO (Keyword-Nutzung, Content-Qualität, interne Verlinkung)
D) Backlink-Profil (Branchenverzeichnisse, lokale Einträge)

WICHTIG: Der aktuelle Title-Tag ist "Home -" — das ist ein kritisches Problem. Dokumentiere alle solchen Befunde.

Erstelle eine Keyword-Map:
- Primär: "Fitnessstudio Hattingen"
- Sekundär: "Fitnesskurse Hattingen", "Probetraining Hattingen", "Sauna Fitnessstudio Hattingen"
- Long-Tail: "bestes Fitnessstudio in Hattingen", "Fitnessstudio mit Sauna Hattingen"
- Lokal: Einzugsgebiet abdecken (Holthausen, Bochum-Linden, Sprockhövel, Witten, Blankenstein)

Speichere als audit/02-seo-analyse.md mit: Scores, Quick Wins, Keyword-Map, priorisierte Empfehlungen.
```

---

## Prompt 3 — UX/UI & Conversion-Analyse

> **Sub-Agent:** `ux-auditor`
> **Output:** `audit/03-ux-conversion-analyse.md`
> **Voraussetzung:** Prompt 1 und 2 abgeschlossen

```
Lies die CLAUDE.md und den ux-auditor Agent (.claude/agents/ux-auditor.md).
Lies auch audit/01-bestandsaufnahme.md und audit/02-seo-analyse.md.

Analysiere https://fitness-factory-hattingen.de/ aus reiner Nutzersicht.

1. 5-Sekunden-Test: Was sieht man zuerst? Ist sofort klar was + wo + für wen?

2. Simuliere 3 Nutzer-Journeys:
   A) Neukunde sucht Fitnessstudio → Preise finden → Probetraining buchen
   B) Bestandsmitglied → Kursplan checken → Kurs finden
   C) Mobile User → Alles per Daumen erreichbar?

3. Bewerte ALLE Conversion-Elemente (0-10):
   Hero, Trust-Signale, Preistransparenz, CTA-Platzierung, Kontakt-Sichtbarkeit, FAQ-Qualität, Testimonials, Urgency, Sticky CTA, Social Proof, Trainer-Vorstellung, Studio-Fotos, Formular-UX, Performance

4. Feature-Gap vs. Branchen-Standard:
   Was haben FitX, John Reed, McFit was Fitness Factory NICHT hat?

5. Accessibility-Check (WCAG 2.1 AA)

Speichere als audit/03-ux-conversion-analyse.md mit: Scoring-Tabelle, User-Journeys, Impact/Effort Matrix.
```

---

## Prompt 4 — Wettbewerbsanalyse

> **Sub-Agent:** `competitor-researcher`
> **Output:** `audit/04-wettbewerbsanalyse.md`
> **Voraussetzung:** Prompt 1-3 abgeschlossen

```
Lies die CLAUDE.md und den competitor-researcher Agent (.claude/agents/competitor-researcher.md).

Recherchiere und analysiere die Konkurrenz von Fitness Factory Hattingen.

1. DIREKTE KONKURRENZ (15km Umkreis):
   - Gesundheitswerk Hattingen (gesundheitswerk.net) — Hauptkonkurrent!
   - Alle Studios via Google Maps im Umkreis finden
   - Pro Studio: Preise, Öffnungszeiten, USPs, Website-Qualität, Google-Bewertung

2. BENCHMARK (große Ketten):
   - FitX (fitx.de) — 29€, App, Self-Service, "NO BULLSH!T"
   - John Reed (johnreed.fitness) — Premium-Design, Video-Hero, emotionales Branding
   - McFit (mcfit.com) — 24/7, Modernisierung
   - Jeweils: Website analysieren, Features dokumentieren, Learnings ableiten

3. BEST-IN-CLASS Fitness-Websites:
   - Top 5 Design-Trends 2025/2026
   - Top 5 Must-Have Features
   - Top 5 Conversion-Strategien

4. SWOT-Analyse für Fitness Factory
5. Pricing-Benchmark-Tabelle
6. Feature-Gap-Analyse

Speichere als audit/04-wettbewerbsanalyse.md.
```

---

## Prompt 5 — Anforderungskatalog (ZUSAMMENFÜHRUNG)

> **Output:** `audit/05-anforderungskatalog.md`
> **Voraussetzung:** Prompts 1-4 ALLE abgeschlossen

```
Lies die CLAUDE.md und ALLE bisherigen Audit-Dokumente:
- audit/01-bestandsaufnahme.md
- audit/02-seo-analyse.md
- audit/03-ux-conversion-analyse.md
- audit/04-wettbewerbsanalyse.md

Erstelle den VOLLSTÄNDIGEN Anforderungskatalog für die neue Website.

1. STATUS QUO: Top 10 Probleme der aktuellen Website
2. ANFORDERUNGSKATALOG:
   - MUSS-Features (Launch-kritisch) mit Begründung
   - SOLL-Features (Phase 2, 1-3 Monate nach Launch)
   - KANN-Features (Nice-to-have, Phase 3)
3. SEITENSTRUKTUR: Alle Seiten + Sections der neuen Website definieren
4. TECHNISCHE ANFORDERUNGEN: Stack, Hosting, Performance, DSGVO
5. DESIGN-ANFORDERUNGEN: Farben, Fonts, Bildstil, Animationen
6. CONTENT-ANFORDERUNGEN: Was muss geschrieben/produziert werden?
7. SEO-STRATEGIE: Keywords, Lokales SEO, Content-Plan
8. CONVERSION-STRATEGIE: CTAs, Lead-Magnete, Tracking

Dieses Dokument ist das FUNDAMENT für Phase 2 (Design & Build).
Speichere als audit/05-anforderungskatalog.md.
```

---

## Nach Phase 1

Wenn alle 5 Prompts abgearbeitet sind, hast du im `audit/` Ordner:

```
audit/
├── 01-bestandsaufnahme.md      ← Was ist da?
├── 02-seo-analyse.md           ← Wo stehen wir bei Google?
├── 03-ux-conversion-analyse.md ← Wie gut konvertiert die Seite?
├── 04-wettbewerbsanalyse.md    ← Was macht die Konkurrenz?
└── 05-anforderungskatalog.md   ← Was muss die neue Seite können?
```

Damit haben wir die perfekte Grundlage für Phase 2 (Design-System, Content, SEO-Setup, Build).
Komm dann zu mir zurück und wir besprechen die Ergebnisse bevor wir Phase 2 starten.
