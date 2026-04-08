# PROMPT 1.3 — UX/UI & Conversion-Analyse

> **Phase:** 1 (Analyse)
> **Sub-Agent:** `.claude/agents/ux-auditor.md`
> **Skills:** `website-ux-ui-design` + `website-content-strategie` + `redesign-skill` + `ui-ux-pro-max` — MÜSSEN vor dem Start gelesen werden
> **Input:** `audit/01-bestandsaufnahme.md`, `audit/02-seo-analyse.md`
> **Output:** `audit/03-ux-conversion-analyse.md`
> **Geschätzte Dauer:** 10–15 Minuten

---

## WICHTIG: Vor dem Start

1. **Lies `CLAUDE.md`** im Projektstamm für den vollständigen Projektkontext
2. **Lies den Skill `website-ux-ui-design`** — enthält Conversion-Design Best Practices, CTA-Platzierung, Trust-Signale, visuelle Hierarchie
3. **Lies den Skill `website-content-strategie`** — enthält Seitenstruktur-Typen (Landingpage, Sales-Page, Firmenwebsite), Copywriting-Regeln, Section-Dramaturgie
4. **Lies den Skill `redesign-skill`** — Audit-Framework für bestehende Sites: identifiziert Generic-AI-Patterns und was die Site "billig" wirken lässt. Für Abschnitt 4 (Visuelle Qualität) zwingend erforderlich.
5. **Lies den Skill `ui-ux-pro-max`** — 99 UX Guidelines, nutze für Branchen-Benchmark und Feature-Gap-Analyse
6. **Lies den Sub-Agent** `.claude/agents/ux-auditor.md` für die detaillierte Aufgabenbeschreibung
7. **Lies** `audit/01-bestandsaufnahme.md` und `audit/02-seo-analyse.md`

---

## Auftrag

Du bist ein UX/UI-Experte und Conversion-Optimierer, spezialisiert auf Fitness-Websites. Analysiere **https://fitness-factory-hattingen.de/** aus reiner Nutzersicht.

### 1. Erster Eindruck — 5-Sekunden-Test

Öffne die Homepage und beantworte:

- Was sieht man zuerst? (Above the Fold)
- Ist sofort klar: **WAS** wird angeboten, **WO**, **FÜR WEN**?
- Gibt es einen **sichtbaren CTA** ohne Scrollen?
- Wirkt die Seite **professionell und vertrauenswürdig**?
- Emotional ansprechend oder generisch/austauschbar?
- Würdest du als Nutzer weiterscrollen oder abspringen?

### 2. Nutzer-Journeys simulieren

**Journey A — Neukunde sucht Fitnessstudio:**
1. Googelt "Fitnessstudio Hattingen" → Wie sieht das Suchergebnis aus?
2. Landet auf der Seite → Findet er **sofort** Preise, Öffnungszeiten, Standort?
3. Will **Probetraining** buchen → Wie viele Klicks? Wie einfach?
4. Sucht **Kontaktmöglichkeit** → Telefon, WhatsApp sofort findbar?
5. Will sich informieren (Kurse, Sauna, Team) → Navigation intuitiv?
6. **Gesamturteil:** Wie wahrscheinlich konvertiert dieser Nutzer?

**Journey B — Bestehendes Mitglied:**
1. Will **Kursplan** checken → Wie schnell erreichbar?
2. Sucht spezifischen Kurs (z.B. "Wann ist Yoga?") → Filterbar?
3. Will **Öffnungszeiten** prüfen → Sofort sichtbar?
4. Will Trainer kontaktieren → Möglich?

**Journey C — Mobile User (60%+ des Traffics!):**
1. Alles per **Daumen** erreichbar?
2. Formulare mobil benutzbar?
3. **Click-to-Call** funktional?
4. Ladezeit akzeptabel auf 4G?
5. Hamburger-Menü intuitiv?

### 3. Conversion-Element-Scoring

Bewerte JEDES Element von 0–10 mit Begründung:

| Element | Score (0-10) | Status | Begründung |
|---|---|---|---|
| Hero mit Value Proposition | ? | ✅/⚠️/❌ | |
| Trust-Signale (Bewertungen, Zahlen, Zertifikate) | ? | | |
| Preistransparenz (klar, vergleichbar) | ? | | |
| Probetraining-CTA (Platzierung, Häufigkeit) | ? | | |
| Kontakt sichtbar (Telefon, WhatsApp, Formular) | ? | | |
| FAQ (echte Einwände behandelt?) | ? | | |
| Testimonials (Qualität, Echtheit, mit Foto?) | ? | | |
| Urgency/Scarcity (Aktionen, Limits) | ? | | |
| Sticky CTA auf Mobile | ? | | |
| Social Proof (Mitgliederzahl, Bewertungen) | ? | | |
| Trainer-Vorstellung (Fotos, Qualifikation) | ? | | |
| Studio-Impressionen (Foto/Video-Qualität) | ? | | |
| Formular-UX (Felder, Validierung, Einfachheit) | ? | | |
| Ladegeschwindigkeit / Performance | ? | | |
| **GESAMT-DURCHSCHNITT** | **?/10** | | |

### 4. Visuelle Qualität

- **Bildqualität:** Professionell oder Amateur?
- **Konsistenter Bildstil** oder zusammengewürfelt?
- **Farbschema:** Harmonisch? Zur Branche passend? Energetisch?
- **Typografie:** Gut lesbar? Hierarchie klar?
- **Whitespace:** Genug Luft oder überladen?
- **Visuelle Hierarchie:** Klar, wohin das Auge wandert?
- **Animations-Qualität:** Smooth, purposeful oder ablenkend?

### 5. Feature-Gap vs. Branchen-Standard

Vergleiche mit den besten Fitness-Websites (FitX, John Reed, McFit) und nutze die Erkenntnisse aus den Skills.

**Must-Haves (fehlt = Problem):**

| Feature | Vorhanden? | Priorität |
|---|---|---|
| Online-Buchungssystem (Probetraining, Kurse) | ? | Hoch |
| Trainer-Profile mit Fotos + Qualifikation | ? | Hoch |
| Interaktiver Kursplan mit Filter | ? | Hoch |
| Click-to-Call + WhatsApp Button | ? | Hoch |
| Google Maps Integration | ? | Mittel |
| Cookie-Consent Banner (DSGVO) | ? | Hoch |
| Sticky CTA-Bar auf Mobile | ? | Mittel |
| Responsive / Mobile-first | ? | Hoch |

**Nice-to-Haves (hebt ab):**

| Feature | Vorhanden? | Priorität |
|---|---|---|
| Virtuelle Studio-Tour / 360° | ? | Mittel |
| Video-Testimonials | ? | Niedrig |
| Vorher/Nachher Transformationen | ? | Mittel |
| BMI/Kalorienrechner | ? | Niedrig |
| KI-Chatbot / Live-Chat | ? | Hoch |
| Member-App / Self-Service | ? | Mittel |
| Blog mit Fitness-Tipps | ? | Mittel |
| Newsletter-Anmeldung | ? | Niedrig |
| Exit-Intent Popup | ? | Niedrig |
| Erfolgsgeschichten | ? | Mittel |

### 6. Seitenstruktur-Bewertung

Nutze die Dramaturgie-Typen aus dem `website-content-strategie` Skill:
- Welchem Typ entspricht die aktuelle Seite (A, B, oder C)?
- Welcher Typ wäre OPTIMAL für Fitness Factory?
- Welche Sections fehlen in der Dramaturgie?
- Wie sollte die ideale Section-Reihenfolge aussehen?

### 7. Accessibility-Check (WCAG 2.1 AA)

- Farbkontraste ausreichend (4.5:1)?
- Keyboard-Navigation möglich?
- Alt-Texte auf Bildern?
- Focus-Styles sichtbar?
- Skip-Link vorhanden?
- Semantisches HTML korrekt?

---

## Output-Format

Erstelle `audit/03-ux-conversion-analyse.md` mit:

1. **Executive Summary** (5 Sätze: Was ist gut, was ist kritisch)
2. **Scoring-Tabelle** aller Conversion-Elemente
3. **User-Journey-Analyse** mit Pain Points pro Journey
4. **Visuelle Qualitätsbewertung**
5. **Feature-Gap-Analyse** (Was fehlt vs. Branchenstandard)
6. **Impact/Effort Matrix:**
   - 🟢 Quick Wins (hoher Impact, niedriger Aufwand)
   - 🔵 Strategische Projekte (hoher Impact, hoher Aufwand)
   - 🟡 Low Priority (niedriger Impact)
7. **Seitenstruktur-Empfehlung** (ideale Section-Reihenfolge)
8. **Top 10 Verbesserungen** mit Mockup-Beschreibungen

---

## Verification

- [ ] 5-Sekunden-Test durchgeführt?
- [ ] Alle 3 User-Journeys simuliert?
- [ ] Conversion-Scoring vollständig (alle Elemente)?
- [ ] Feature-Gap komplett?
- [ ] Impact/Effort Matrix erstellt?
- [ ] Seitenstruktur-Empfehlung basiert auf Skill-Dramaturgie?
- [ ] Skills `website-ux-ui-design` + `website-content-strategie` als Referenz genutzt?

---

## Output

Speichere als **`audit/03-ux-conversion-analyse.md`**
