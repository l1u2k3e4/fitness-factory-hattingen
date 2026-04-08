# PROMPT 2.9 — Testing & Review (alle Sub-Agents durchlaufen)

> **Phase:** 2 (Build — Qualitätssicherung)
> **Sub-Agents:** ALLE — `ux-auditor.md`, `seo-analyst.md`, `design-system-creator.md`, `frontend-builder.md`, `content-strategist.md`
> **Input:** Gesamtes Projekt (`src/`, `public/`, `design/`, `seo/`, `content/`)
> **Output:** `docs/qa-report.md` + Fixes in `src/`
> **Geschätzte Dauer:** 30–45 Minuten

---

## WICHTIG: Vor dem Start

1. **Lies `CLAUDE.md`** — Qualitätsziele, Konventionen, alles
2. **Lies ALLE Sub-Agents** in `.claude/agents/` — jeder Agent hat eigene Pflicht-Skills und Prüfkriterien
3. **Lies ALLE Audit-Ergebnisse** in `audit/` — die Review muss prüfen ob alle identifizierten Probleme gelöst sind
4. **Lies diese Pflicht-Skills (VERBINDLICH):**
   - `redesign-skill` → Identifiziert generische AI-Design-Patterns
   - `ui-ux-pro-max` → 99 UX-Guidelines als Checkliste
   - `web-design-guidelines` → Accessibility + Interface Quality
   - `taste-skill` → Finale Qualitätsprüfung: "Würde ein Mensch das stolz präsentieren?"
   - `output-skill` → Fixes VOLLSTÄNDIG implementieren

---

## Auftrag

Du bist ein QA-Lead der die gesamte Website durch 6 spezialisierte Review-Runden führt. Jede Runde prüft einen anderen Aspekt. Alle gefundenen Probleme werden SOFORT gefixt — nicht nur dokumentiert.

---

### Review-Runde 1: UX/Conversion Audit (Sub-Agent: ux-auditor.md)

Prüfe die neue Website gegen die Schwächen aus `audit/03-ux-conversion-analyse.md`:

| Altes Problem (Score) | Muss jetzt gelöst sein |
|---|---|
| Hero ohne USP (5/10) | Hero mit USP-Triplet, klarer Value Proposition |
| Kein Sticky CTA Mobile (0/10) | Sticky Bottom-Bar nach 30% Scroll mit 3 CTAs |
| Keine Trainer-Profile (0/10) | Team-Section mit Trainer-Cards (ggf. Platzhalter) |
| SEPA auf öffentlicher Website (1/10) | Interesse-Formular statt SEPA |
| Urgency/Scarcity (2/10) | Mindestens Fremdgeh-Aktion prominent |

**Zusätzliche UX-Checks:**
- [ ] 5-Sekunden-Test: Versteht ein neuer Besucher in 5 Sekunden was FF bietet?
- [ ] Jede Seite hat mindestens 1 CTA
- [ ] Mobile: Alle Touch-Targets mindestens 44×44px
- [ ] Click-to-Call funktioniert (tel: Link)
- [ ] WhatsApp-Button funktioniert (wa.me Link)
- [ ] Formular-Validation: Sinnvolle Fehlermeldungen
- [ ] Kursplan: filterbar und auf Mobile lesbar

### Review-Runde 2: SEO Audit (Sub-Agent: seo-analyst.md)

Prüfe gegen die SEO-Checklist aus `seo/seo-checklist.md` und `audit/02-seo-analyse.md`:

- [ ] JEDE Seite hat einzigartigen Title (50–60 Zeichen, Keyword am Anfang)
- [ ] JEDE Seite hat Meta-Description (150–160 Zeichen, USP + CTA)
- [ ] JSON-LD HealthClub Schema validiert (Google Rich Results Test Format)
- [ ] FAQPage Schema validiert
- [ ] BreadcrumbList auf Unterseiten
- [ ] Canonical-Tags: self-referencing, trailing slash
- [ ] sitemap.xml: alle indexierbaren Seiten, keine Legal-Seiten
- [ ] robots.txt: Legal-Seiten blockiert, Sitemap referenziert
- [ ] KEIN Tracking vor Cookie-Consent
- [ ] Alle Bilder: Alt-Text mit Keywords
- [ ] H1-Hierarchie: genau 1× pro Seite
- [ ] Keine Keyword-Kannibalisierung (verschiedene Keywords pro Seite)
- [ ] OG-Tags auf allen Seiten

### Review-Runde 3: Design-System Consistency (Sub-Agent: design-system-creator.md)

- [ ] ALLE Farben nutzen brand-* Tokens — KEIN einziger Hex-Code im JSX
- [ ] ALLE Texte kommen aus content.ts — KEIN hardcoded String im JSX
- [ ] Typography Scale konsistent (clamp()-Werte aus Design-System)
- [ ] Spacing konsistent (4px-Raster, Section-Padding)
- [ ] Schatten und Border-Radii konsistent mit Design-System
- [ ] Button-Komponente überall identisch (keine Inline-Button-Styles, KEIN GlowButton)
- [ ] Cards: gleicher Stil, gleiche Radii, gleiche Padding
- [ ] Animationen: gleiche Presets (aus animations.ts)

### Review-Runde 4: Anti-Slop Design Check (Skills: redesign-skill, taste-skill)

**Suche aktiv nach diesen generischen KI-Patterns und eliminiere sie:**

**CI-Check (Rot + Schwarz + Weiß):**
- [ ] Hintergrund ist WEISS (#FFF / brand-bg) — KEIN Dunkelgrau/Schwarz (Ausnahme: Hero + Footer)
- [ ] Buttons sind ROT (brand-primary) mit 4px Radius — KEIN Gradient, KEIN Glow
- [ ] Headlines sind SCHWARZ (brand-dark) — KEIN Gradient-Text
- [ ] Cards sind WEISS mit Border (brand-border) und 6px Radius — KEIN dark-bg
- [ ] Component heißt `Button` — NICHT `GlowButton`

**Anti-KI-Pattern-Check:**
- [ ] Kein `transition: all` → nur spezifische Properties
- [ ] Kein farbiger box-shadow / Glow-Effekt nirgendwo
- [ ] Keine Poppins/Roboto Default → gewählter System-Font
- [ ] Kein `rounded-2xl`, `rounded-3xl`, `rounded-full` auf Buttons/Cards
- [ ] Kein `scale()` oder `translateY(-8px)` auf Card-Hover
- [ ] Keine generischen Gradients (`from-blue-500 to-purple-600`)
- [ ] Kein `text-transparent bg-clip-text bg-gradient` (Gradient-Text)
- [ ] Kein `uppercase tracking-wider` auf Buttons
- [ ] Keine Stock-Photo-Platzhalter
- [ ] Keine generischen Texte: "Erlebe", "Entdecke", "Dein Partner für..."
- [ ] Kein Bootstrap-Aura: gleich große Cards ohne Hierarchie
- [ ] Keine Animation die `left`, `top`, `width`, `height` animiert
- [ ] Animationen dezent: max 0.4s, max 20px y-offset, kein Bounce
- [ ] **"Sieht das aus wie von einem professionellen Webdesigner oder wie von ChatGPT?"** → Webdesigner

### Review-Runde 5: Accessibility Check (Skill: web-design-guidelines)

- [ ] `<html lang="de">`
- [ ] Skip-to-Content Link vorhanden
- [ ] ALLE Bilder haben Alt-Text
- [ ] ALLE Formular-Inputs haben `<label>`
- [ ] Focus-Visible Ring auf allen interaktiven Elementen
- [ ] Keyboard-Navigation: Tab-Reihenfolge logisch
- [ ] Mobile-Menü: Focus-Trap, Escape schließt
- [ ] Farbkontraste: WCAG AA (4.5:1 für Text, 3:1 für große Texte)
- [ ] ARIA-Attributes: aria-expanded, aria-label, aria-describedby wo nötig
- [ ] `prefers-reduced-motion`: Animationen respektieren Einstellung
- [ ] Touch-Targets: min 44×44px auf Mobile

### Review-Runde 6: Code Quality (Sub-Agent: frontend-builder.md)

- [ ] `npm run build` kompiliert OHNE Fehler und OHNE Warnings
- [ ] TypeScript strict: KEIN `any`, KEIN `@ts-ignore`, KEIN `as any`
- [ ] Keine ungenutzten Imports oder Variablen
- [ ] Keine Next.js Imports (`use client`, `Image`, `next/link`)
- [ ] Konsistente Datei-Benennung: PascalCase Components, camelCase Utils
- [ ] Alle Routes in App.tsx definiert und erreichbar
- [ ] Content.ts: alle Exports korrekt getypt, `as const` überall
- [ ] Keine Memory-Leaks: useEffect Cleanup, Event-Listener-Removal
- [ ] React Keys: einzigartig in allen Listen
- [ ] Bundle-Size: kein Chunk > 200KB (Vite Build Check)

---

## Prozess

1. **Durchlaufe alle 6 Reviews** — dokumentiere jeden Fund
2. **Fixes sofort implementieren** — nicht nur auflisten
3. **Nach allen Fixes:** erneut `npm run build` + stichprobenartig Re-Check
4. **QA-Report schreiben** mit Status aller Checks

---

## Output-Dateien

1. **`docs/qa-report.md`** — Vollständiger QA-Report mit:
   - Gefundene Probleme (pro Review-Runde)
   - Angewandte Fixes
   - Finale Status-Checkliste (alle ✅ oder begründetes ⚠️)
2. **Fixes in `src/`** — Alle Probleme direkt im Code behoben

---

## Verifikation (vor Abschluss)

- [ ] ALLE 6 Review-Runden durchlaufen
- [ ] ALLE kritischen Probleme gefixt (keine offenen 🔴)
- [ ] `npm run build` → 0 Errors, 0 Warnings
- [ ] QA-Report vollständig dokumentiert
- [ ] Anti-Slop-Check bestanden: "Kein generischer KI-Output"
- [ ] Website ist bereit für Deployment (PROMPT 2.10)
