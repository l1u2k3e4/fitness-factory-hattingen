# PROMPT 2.6 — Pages & Sections (Seiten zusammenbauen, Routing)

> **Phase:** 2 (Build)
> **Sub-Agent:** `.claude/agents/frontend-builder.md`
> **Input:** `audit/05-anforderungskatalog.md` (Abschnitt 3: Seitenstruktur), `src/data/content.ts`, alle Komponenten aus PROMPT 2.5, Design-System aus PROMPT 2.1
> **Output:** Alle Section-Komponenten in `src/components/sections/` + alle Seiten in `src/pages/`
> **Geschätzte Dauer:** 45–60 Minuten (größter Prompt)

---

## WICHTIG: Vor dem Start

1. **Lies `CLAUDE.md`** — Geschäftsdaten, Konventionen, Verboten-Liste
2. **Lies den Sub-Agent** `.claude/agents/frontend-builder.md`
3. **Lies die vorherigen Outputs:**
   - `audit/05-anforderungskatalog.md` Abschnitt 3 → 15 Homepage-Sections + alle Unterseiten
   - `design/design-system.md` (PROMPT 2.1) → Design-Tokens: **Weiß + Rot + Schwarz CI, scharfe Radii, keine Glows**
   - `src/data/content.ts` (PROMPT 2.2) → ALLE Texte
   - `src/components/ui/` (PROMPT 2.5) → Button (KEIN GlowButton), Card, Badge etc.
   - `src/components/layout/` (PROMPT 2.5) → Layout-Komponenten
   - `src/lib/animations.ts` → Framer Motion Presets (dezent)
4. **Lies diese Pflicht-Skills (VERBINDLICH):**
   - `output-skill` → JEDE Section und Page VOLLSTÄNDIG — kein "// similar to above", kein Truncation
   - `taste-skill` → Premium-Layouts, keine generischen Muster
   - `frontend-design` → Production-Grade-Ästhetik
   - `ui-ux-pro-max` → UX-Guidelines für Seitenstruktur und User-Flow
   - `web-design-guidelines` → Semantic HTML, Accessibility

---

## DESIGN-RICHTUNG (KRITISCH — in jeder Section beachten)

> **Clean White Theme.** Die Website hat einen weißen Hintergrund mit abwechselnden Sections (Weiß / Fast-Weiß). Rote CTAs, schwarze Headlines, viel Weißraum. Professionell und schlicht wie von einem Webdesigner.

| Element | Richtig | FALSCH (KI-Pattern) |
|---|---|---|
| Hintergrund | Weiß (#FFF) / Fast-Weiß (#F7F7F8) abwechselnd | Dunkelgrau, Schwarz |
| Buttons | Rot (brand-primary), 4px radius | Gradient, Glow, rounded-full |
| Headlines | Schwarz (brand-dark), font-bold/black | Gradient-Text, uppercase |
| Cards | Weiß, Border, 6px radius | Dark-Cards, Glow-Border, rounded-2xl |
| Hover | Farbwechsel, Border-Rot | scale(), translateY(), Glow |
| Sections | Flach, kein extra radius | Rounded-Section-Container |
| Abstände | Viel Weißraum, Sections atmen | Alles eng zusammengepackt |

**Ausnahme:** Hero-Section und Footer dürfen dunklen Hintergrund (brand-dark/Schwarz) haben — für visuellen Kontrast.

---

## Auftrag

Du bist ein Senior Frontend Engineer. Du baust ALLE 15 Homepage-Sections und ALLE Unterseiten der Fitness Factory Website. Dies ist der umfangreichste Prompt — nimm dir Zeit, schreibe JEDE Komponente VOLLSTÄNDIG aus.

### Wichtige Regeln

- **KEIN Code-Truncation** — jede Datei bis zur letzten Zeile ausschreiben
- **ALLE Texte aus `content.ts`** — Import am Dateianfang
- **ALLE Farben über brand-* Tokens** — nie Hex direkt
- **Framer Motion** für Scroll-Animationen — DEZENT: nur fadeIn oder fadeInUp(20px), 0.4s
- **SectionWrapper** aus PROMPT 2.5 um jede Section
- **Responsive** — Mobile-first, dann Tablet, dann Desktop
- **Component = `Button`** — NICHT "GlowButton"

---

### Task 1: Homepage-Sections (`src/components/sections/`)

#### Section 3 — HeroSection.tsx
```
DARF dunklen Hintergrund haben (Ausnahme) — für visuellen Impact:
- Hintergrund: Bild aus public/images/ mit dunklem Overlay (bg-brand-dark/70)
- ODER bg-brand-dark mit Bild-Akzenten
- H1: text-white, font-black, clamp() Typography
- Subheadline: text-white/80
- CTA-Stack: Button variant="primary" (ROT) + Button variant="secondary" (weißer Rand)
- Framer Motion: fadeInUp auf Texte, staggered (0.06 delay)
- Min-Height: 85vh (nicht ganz fullscreen — etwas Footer durchscheinen lassen)
- Bilder aus public/images/banner-hero-*.jpg als Hintergrund
```

#### Section 4 — TrustBar.tsx
```
- bg-brand-bg (leichtes Grau) — dezente Abgrenzung vom Hero
- Horizontale Leiste: Google-Score, Mitgliederzahl, Seit-Wann, 3 Icons
- Counter-Animation für Zahlen
- Responsive: 1 Zeile Desktop, 2×2 Grid Mobile
- Text: brand-dark, Icons: brand-primary (Rot)
- KEIN eigener Container-Radius — flach, full-width
```

#### Section 5 — LeistungenSection.tsx
```
- bg-white (brand-white)
- H2 schwarz (brand-dark), font-bold
- 8 Leistungs-Cards im Grid
- Card: bg-white, border brand-border, rounded-md (6px)
  - Icon (Lucide, Farbe: brand-primary/Rot) + Headline (font-semibold) + Beschreibung (brand-dark-soft)
- Grid: 4×2 Desktop, 2×4 Tablet, 1er-Stack Mobile
- Staggered fadeIn (dezent, 0.06 pro Card)
- Hover: border-brand-primary (roter Rand)
```

#### Section 6 — PreiseSection.tsx
```
- bg-brand-bg (leichtes Grau — abwechselnd)
- H2 + 3 Tarif-Cards + Fremdgeh-Aktion Card
- Standard-Tarif highlighted: border-2 border-brand-primary + Badge "Beliebteste Wahl" (rot)
- Card-Struktur: Name, Preis/Monat (groß, font-black), Laufzeit, Features-Liste, CTA
- CTA: Button variant="primary" → /probetraining
- Responsive: 4 nebeneinander Desktop (oder 3+1), Stack Mobile
- KEIN scale-hover — nur border-change auf hover
```

#### Section 7 — ProbetrainingCta.tsx
```
- bg-brand-primary (ROT) — volle Farbfläche als Eye-Catcher
- Text: weiß
- H2: "Komm vorbei. Kostenlos. Unverbindlich." — font-bold, text-white
- 3-Schritte-Ablauf in Reihe (1→2→3 mit Nummern, nicht Icons)
- CTA: Button mit weißem Hintergrund + rotem Text (invertiert) oder border-white variant
- KEIN Gradient — reine Farbfläche, clean
```

#### Section 8 — TeamSection.tsx
```
- bg-white
- H2 + 3–5 Trainer-Cards
- Card: Foto (quadratisch, object-cover, rounded-md 6px), Name darunter, Spezialisierung, Kurz-Bio
- Kein Card-Container-Border um das gesamte Element — Foto + Text darunter reicht
- Minimalistisch: Foto spricht für sich
- CTA: "Lerne uns kennen" → Button variant="secondary"
```

#### Section 9 — KursplanPreview.tsx
```
- bg-brand-bg
- H2 + kompakter Wochenplan
- Tabelle oder Card-Grid pro Tag (Mo–So)
- Kursnamen als Badges (brand-primary-light bg, brand-primary text)
- Link: "Vollständiger Kursplan →" als text-link mit Pfeil, brand-primary
- Clean, tabellarisch, gut lesbar
```

#### Section 10 — GalerieSection.tsx
```
- bg-white
- H2 + Grid mit 6 Studio-Fotos
- Bilder aus public/images/ (studio-dsc-*, studio-galerie-*)
- Grid: 3×2 Desktop, 2×3 Tablet, 1×6 Mobile
- Bilder: rounded-md (6px), object-cover
- Alt-Texte mit Keywords
- KEIN Lightbox nötig — sauberes Grid reicht
```

#### Section 11 — TestimonialsSection.tsx
```
- bg-brand-bg
- H2 + 4–6 Testimonial-Cards
- Card: Anführungszeichen-Icon (Lucide: Quote), Text, Name, Sternebewertung
- Cards: bg-white, border brand-border, rounded-md
- Google-Link: "Alle Bewertungen auf Google ansehen →"
- Responsive: 3er-Grid Desktop, 2er Tablet, Stack Mobile
```

#### Section 12 — FaqSection.tsx
```
- bg-white
- H2 + Accordion
- Accordion-Stil: flach, border-bottom zwischen Items, KEIN umrandeter Container
- Fragen: font-semibold text-brand-dark
- Antworten: text-brand-dark-soft
- Link zu /faq/ für alle Fragen
- JSON-LD FAQPage Schema injizieren
```

#### Section 13 — KontaktSection.tsx
```
- bg-brand-bg
- H2 + Split-Layout: Links Info, Rechts Formular
- Adresse, Öffnungszeiten, Kontakt-Buttons (Telefon, WhatsApp, E-Mail)
- Google Maps Platzhalter (Consent-Gate)
- Formular: Name, E-Mail, Nachricht, Einwilligung-Checkbox
- Submit: Button variant="primary"
- Formular-Inputs: brand-border, 4px radius, clean
```

### Task 2: Pages (`src/pages/`)

#### HomePage.tsx
```
Sections in Reihenfolge:
HeroSection (dark bg) → TrustBar (light bg) → LeistungenSection (white) →
PreiseSection (light) → ProbetrainingCta (red bg) → TeamSection (white) →
KursplanPreview (light) → GalerieSection (white) → TestimonialsSection (light) →
FaqSection (white) → KontaktSection (light)

Abwechselnde Hintergründe für visuelle Trennung — KEINE Borders/Divider zwischen Sections nötig
+ SEO Head Component
```

#### ProbetrainingPage.tsx
```
4-Block-Struktur:
1. Hero-mini: bg-brand-dark, H1 weiß
2. "So läuft dein Probetraining ab" — 3 Schritte, bg-white
3. Testimonial + Trainer-Mini — bg-brand-bg
4. Formular + CTA-Stack — bg-white
+ SEO Head
```

#### MitgliedschaftPage.tsx
```
- Erweiterte Tarif-Übersicht
- Leistungsvergleichs-Tabelle (clean, border brand-border)
- Interesse-Formular (KEIN SEPA!)
- bg-white / bg-brand-bg abwechselnd
+ SEO Head
```

#### KursplanPage.tsx
```
- Vollständiger Wochenplan
- Filter als Tabs/Buttons (brand-primary wenn aktiv)
- Tabelle: clean, borders, gut lesbar auf Mobile
- H1: "Kursplan Fitnessstudio Hattingen"
+ SEO Head
```

#### TeamPage.tsx
```
- Größere Trainer-Cards als auf Homepage
- Foto, Name, Spezialisierung, Bio
- Grid: 2er Desktop, Stack Mobile
+ SEO Head
```

#### FremdgehAktionPage.tsx
```
- Landing-Page: Problem → Lösung → Beweis → Angebot → CTA
- Hero-mini mit bg-brand-primary (Rot) + weißem Text
- Schritte auf bg-white
- CTA-Section mit Formular
+ SEO Head
```

#### FaqPage.tsx
```
- Vollständige FAQ (15+ Fragen)
- Kategorien als Sections
- Accordion-Komponente
- FAQPage JSON-LD
+ SEO Head
```

#### Legal-Seiten
```
- Minimal-Layout, bg-white
- Prose-Styling (Tailwind Typography)
- noindex Meta-Tag
- KEINE CTAs, KEIN Hero
+ SEO Head
```

---

## Verifikation (vor Abschluss)

- [ ] ALLE 15 Homepage-Sections implementiert
- [ ] ALLE Unterseiten implementiert mit korrektem Routing
- [ ] JEDE Datei VOLLSTÄNDIG — kein Truncation
- [ ] Hintergrund ist WEISS (abwechselnd white / brand-bg) — KEIN Dunkelgrau
- [ ] Buttons sind ROT (brand-primary), 4px radius
- [ ] Headlines SCHWARZ (brand-dark)
- [ ] Cards: weiß, border, 6px radius — KEIN dark-bg, KEIN rounded-2xl
- [ ] KEIN Glow, KEIN Gradient-Text, KEIN Scale-Hover
- [ ] Hero + Footer dürfen dunkel sein (Kontrast) — Rest = weiß
- [ ] Responsive: funktioniert auf 375px, 768px, 1280px
- [ ] Scroll-Animationen: DEZENT (fadeIn, 0.4s, 20px offset max)
- [ ] Component heißt `Button` — nicht `GlowButton`
- [ ] "Sieht das aus wie von einem Webdesigner?" → JA
- [ ] `npm run build` kompiliert ohne Fehler
