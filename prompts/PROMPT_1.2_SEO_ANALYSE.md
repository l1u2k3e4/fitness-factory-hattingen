# PROMPT 1.2 — SEO-Tiefenanalyse

> **Phase:** 1 (Analyse)
> **Sub-Agent:** `.claude/agents/seo-analyst.md`
> **Skill:** `website-seo` — MUSS vor dem Start gelesen werden
> **Input:** `audit/01-bestandsaufnahme.md`
> **Output:** `audit/02-seo-analyse.md`
> **Geschätzte Dauer:** 10–15 Minuten

---

## WICHTIG: Vor dem Start

1. **Lies `CLAUDE.md`** im Projektstamm für den vollständigen Projektkontext
2. **Lies den Skill `website-seo`** — der enthält die vollständige SEO-Checkliste, Structured Data Templates, Keyword-Strategie-Framework und lokale SEO Best Practices
3. **Lies den Sub-Agent** `.claude/agents/seo-analyst.md` für die detaillierte Aufgabenbeschreibung
4. **Lies `audit/01-bestandsaufnahme.md`** für die technischen Details der aktuellen Website

---

## Auftrag

Du bist ein SEO-Experte mit Spezialisierung auf lokales SEO für die Fitnessbranche. Führe ein vollständiges SEO-Audit der Website **https://fitness-factory-hattingen.de/** durch.

### A. Technisches SEO

Prüfe und bewerte JEDES Element mit ✅ (gut), ⚠️ (verbesserungswürdig) oder ❌ (fehlt/schlecht):

**1. Title-Tags:**
- Einzigartiger Title pro Seite? (< 60 Zeichen)
- Primärkeyword im Title?
- BEKANNTES PROBLEM: Aktueller Title ist "Home -" — das ist KRITISCH

**2. Meta-Descriptions:**
- Einzigartige Description pro Seite? (150–160 Zeichen)
- Call-to-Action enthalten?
- BEKANNTES PROBLEM: Unvollständig, keine klare Value Proposition

**3. Heading-Hierarchie:**
- Genau ein H1 pro Seite?
- H1 → H2 → H3 logisch?
- Keywords in den Headings?

**4. Bilder-SEO:**
- Alt-Texte auf ALLEN Bildern?
- Beschreibende Alt-Texte mit Keywords?
- WebP/AVIF Format? Kompression?
- Lazy Loading?

**5. Structured Data (Schema.org):**
- LocalBusiness / HealthClub Markup vorhanden?
- FAQ Schema?
- OpeningHoursSpecification korrekt?
- GeoCoordinates gesetzt?
- Nutze die Templates aus dem `website-seo` Skill

**6. Open Graph + Twitter Cards:**
- og:title, og:description, og:image?
- OG-Image 1200×630px?
- Twitter Card Tags?

**7. Technische Dateien:**
- robots.txt vorhanden und korrekt?
- XML Sitemap vorhanden?
- Canonical Tags gesetzt?

**8. Performance (Core Web Vitals):**
- LCP (Largest Contentful Paint) — Ziel: < 2.5s
- CLS (Cumulative Layout Shift) — Ziel: < 0.1
- INP (Interaction to Next Paint) — Ziel: < 200ms
- Mobile Page Speed Score

**9. Mobile:**
- Mobile-friendly?
- Touch-Ziele ≥ 48×48px?
- Kein horizontales Scrollen?

### B. Lokales SEO (HÖCHSTE PRIORITÄT!)

Für ein Fitnessstudio ist lokales SEO der wichtigste Hebel:

**1. NAP-Konsistenz (Name, Address, Phone):**
- Identisch auf: Footer, Kontaktseite, JSON-LD, Google Business?

**2. Google Business Profile:**
- Vollständig ausgefüllt?
- Korrekte Kategorie "Fitnessstudio"?
- Bewertungen + Antworten aktiv?
- Regelmäßige Posts?

**3. Lokale Keywords:**
- "Fitnessstudio Hattingen" im Title?
- Stadtname in H1?
- Einzugsgebiet angesprochen? (Hattingen, Bochum-Linden, Sprockhövel, Witten, Blankenstein)
- Stadtteil Holthausen erwähnt?

**4. Google Maps:**
- Maps-Embed auf Kontaktseite?
- Anfahrtsbeschreibung als Text?

**5. Branchenverzeichnisse:**
- 11880, Gelbe Seiten, Yelp, Eversports, Fresha, Studiosuche.de?
- Überall identische NAP-Daten?

### C. Content-SEO

**1. Keyword-Nutzung:**
- Primärkeywords: "Fitnessstudio Hattingen", "Gym Hattingen", "Fitness Hattingen"
- Sekundär: "Fitnesskurse Hattingen", "Probetraining Hattingen", "Sauna Fitnessstudio Hattingen"
- Long-Tail: "bestes Fitnessstudio in Hattingen", "kostenloses Probetraining Fitnessstudio Hattingen"
- Werden diese auf der Website verwendet?

**2. Content-Qualität:**
- Mindestens 300 Wörter pro Seite?
- Einzigartige Texte?
- Blog/Content-Marketing aktiv?
- FAQ für Featured Snippets optimiert?

**3. Interne Verlinkung:**
- Seiten verlinken untereinander?
- Beschreibende Ankertexte?
- Verwaiste Seiten?

### D. Backlink-Profil

- Branchenverzeichnisse eingetragen?
- Lokale Verzeichnisse?
- Social Media Profile verlinkt?
- Sportverein-/Kooperations-Links?

---

## Output-Format

Erstelle `audit/02-seo-analyse.md` mit:

### 1. Score-Übersicht

| Kategorie | Score | Status |
|---|---|---|
| Technisches SEO | ?/100 | ✅/⚠️/❌ |
| Lokales SEO | ?/100 | |
| Content-SEO | ?/100 | |
| Backlink-Profil | ?/100 | |
| **Gesamt** | **?/100** | |

### 2. Top 5 Quick Wins (sofort umsetzbar, größter Impact)

### 3. Vollständige Keyword-Map

| Seite | Primärkeyword | Sekundärkeywords | Long-Tail |
|---|---|---|---|
| Homepage | Fitnessstudio Hattingen | ... | ... |
| Probetraining | ... | ... | ... |
| Preise | ... | ... | ... |
| Kurse | ... | ... | ... |

### 4. Priorisierte Empfehlungen (Hoch/Mittel/Niedrig)

### 5. Lokale SEO Maßnahmen-Plan

### 6. Geschätzter Impact jeder Maßnahme

---

## Verification

- [ ] Alle SEO-Elemente geprüft (Title, Meta, Headings, Images, Schema, OG)?
- [ ] Lokales SEO vollständig analysiert?
- [ ] Keyword-Map für alle Seiten erstellt?
- [ ] Quick Wins identifiziert?
- [ ] Scores nachvollziehbar begründet?
- [ ] `website-seo` Skill als Referenz verwendet?

---

## Output

Speichere als **`audit/02-seo-analyse.md`**
