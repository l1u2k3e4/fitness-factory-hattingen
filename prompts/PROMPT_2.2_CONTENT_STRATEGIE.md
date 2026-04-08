# PROMPT 2.2 — Content-Strategie (Texte, Seitenstruktur, content.ts)

> **Phase:** 2 (Build)
> **Sub-Agent:** `.claude/agents/content-strategist.md`
> **Input:** `audit/05-anforderungskatalog.md` (Abschnitt 3: Seitenstruktur), `audit/03-ux-conversion-analyse.md`, `audit/04-wettbewerbsanalyse.md`, `CLAUDE.md` (Geschäftsdaten, Preise, Kurse)
> **Output:** `content/seitenstruktur.md` + `src/data/content.ts` + `content/copywriting-guide.md`
> **Geschätzte Dauer:** 30–45 Minuten

---

## WICHTIG: Vor dem Start

1. **Lies `CLAUDE.md`** — Geschäftsdaten, Preise, Kursplan, Öffnungszeiten, USPs, Tonalität
2. **Lies den Sub-Agent** `.claude/agents/content-strategist.md`
3. **Lies die Audit-Ergebnisse:**
   - `audit/05-anforderungskatalog.md` → Abschnitt 3 (komplette Seitenstruktur mit 15 Sections)
   - `audit/03-ux-conversion-analyse.md` → Conversion-Schwächen der aktuellen Texte
   - `audit/04-wettbewerbsanalyse.md` → Wie Wettbewerber kommunizieren, Messaging-Lücken
4. **Lies diese Pflicht-Skills (VERBINDLICH):**
   - `website-content-strategie` → Seitenstruktur, Dramaturgie, Content-Objekte
   - `taste-skill` → Verhindert generischen KI-Copy ("Erlebe", "Entdecke", "Dein Partner für...")
   - `soft-skill` → Premium-Agentur-Copywriting-Standards
   - `redesign-skill` → Erkennung generischer Formulierungen
5. **Lies das Design-System** `design/design-system.md` (Output von PROMPT 2.1) — Content muss zur visuellen Identität passen

---

## Auftrag

Du bist ein Senior Content Strategist und Conversion-Copywriter. Du erstellst den GESAMTEN textlichen Inhalt der neuen Fitness Factory Website — strukturiert, conversion-optimiert und in einer `content.ts`-Datei gebündelt.

### Tonalität (aus CLAUDE.md)

- **Du-Ansprache** — motivierend, familiär, energetisch, inklusiv
- **KEINE generischen Fitness-Floskeln:** "Erlebe dein neues Ich", "Dein Partner für Fitness", "Entdecke die Möglichkeiten"
- **STATTDESSEN:** Direkt, ehrlich, selbstbewusst — wie ein Freund der sein Lieblings-Gym empfiehlt
- **USP-Fokus:** Alles inklusive, familiär, persönlich, fair — das ist der rote Faden

---

### Task 1: Seitenstruktur finalisieren

Übernimm die 15-Section-Struktur aus `audit/05-anforderungskatalog.md` (Abschnitt 3.1) und ergänze für jede Section:

```
Section [Nr]: [Name]
├── H-Tag: H1/H2/H3
├── Headline: [Finaler Text]
├── Subheadline: [Finaler Text]
├── Body-Copy: [Finaler Text]
├── CTA-Text: [Button-Label] → [Ziel]
├── Bilder-Bedarf: [Was wird gebraucht]
├── Conversion-Ziel: [Was soll der Nutzer tun]
```

### Task 2: Homepage-Texte (alle 15 Sections)

Schreibe ALLE Texte für die Homepage-Sections aus dem Anforderungskatalog:

**Section 1 — Top-Bar:**
- Öffnungszeiten-String, Telefonnummer, WhatsApp-Link

**Section 2 — Navigation:**
- Nav-Labels: Kurse, Preise, Kursplan, Team, Probetraining (CTA)

**Section 3 — Hero:**
- H1: "Dein Fitnessstudio in Hattingen — alles inklusive" (aus Anforderungskatalog)
- Subheadline mit USP-Triplet: Sauna + Kurse + Getränkeflat
- CTA-Stack: Primär + Sekundär

**Section 4 — Trust-Bar:**
- Google-Score-Text, Mitglieder-Zahl, Seit-Wann-Text, 3 Icons

**Section 5 — USP / Leistungen:**
- H2 + 8 Leistungs-Cards (je Headline + emotionale Beschreibung, NICHT nur Feature-Name)
- Beispiel: NICHT "Sauna" → SONDERN "Sauna inklusive — nach dem Training entspannen, ohne Aufpreis"

**Section 6 — Preise:**
- H2, 3 Tarif-Cards + Fremdgeh-Aktion Card, Preisvergleichs-Hinweis, CTA

**Section 7 — Probetraining CTA:**
- Standalone-Section, 3-Schritte-Ablauf, CTA-Stack

**Section 8 — Trainer-Team:**
- H2, Platzhalter-Struktur für 3–5 Trainer (TBD: echte Daten vom Kunden)

**Section 9 — Kursplan-Preview:**
- H2, Kompakt-Übersicht der Kurse, Link zu /kursplan/

**Section 10 — Galerie:**
- H2, Bildunterschriften/Alt-Texte für vorhandene Bilder aus `public/images/`

**Section 11 — Testimonials:**
- H2, 4–6 Platzhalter-Testimonials (TBD: echte Google Reviews)

**Section 12 — FAQ:**
- H2, Top 8 Fragen mit Antworten (echte Kaufeinwände)
- Basierend auf FAQ-Items aus Audit 01

**Section 13 — Kontakt + Maps:**
- H2, Adresse, Öffnungszeiten, CTA-Stack

**Section 14 — Footer:**
- Logo-Text, Nav-Links, Social-Links, Copyright

**Section 15 — Floating Elements:**
- WhatsApp-Vorausgefüllte Nachricht, Sticky-Bar Labels

### Task 3: Unterseiten-Texte

Schreibe Texte für alle Unterseiten aus dem Anforderungskatalog (Abschnitt 3.2):

| Seite | H1 | Kern-Content |
|---|---|---|
| `/probetraining/` | "Kostenloses Probetraining in Hattingen buchen" | 4-Block-Struktur: Ablauf, Trainer-Mini, Testimonial, Formular-CTA-Stack |
| `/mitgliedschaft/` | "Mitgliedschaft & Preise — Fitness Factory Hattingen" | Tarif-Vergleich, Leistungs-Inklusion, Interesse-Formular (KEIN SEPA!) |
| `/kursplan/` | "Kursplan Fitnessstudio Hattingen" | Interaktiver Wochenplan-Daten (Mo–So mit Zeiten aus CLAUDE.md) |
| `/team/` | "Unser Team — Fitness Factory Hattingen" | Trainer-Card-Platzhalter (TBD: echte Daten) |
| `/fremdgeh-aktion/` | "3 Monate gratis — die Fremdgeh-Aktion" | Angebot-Erklärung, Bedingungen, Kalkulator-Logik, CTA |
| `/faq/` | "Häufig gestellte Fragen — Fitness Factory" | Vollständige FAQ (15+ Fragen) mit Schema-Markup-Hinweis |
| `/impressum/` | "Impressum" | Legal-Text (TMG-konform, Daten aus CLAUDE.md) |
| `/datenschutz/` | "Datenschutzerklärung" | DSGVO-konforme Datenschutzerklärung |

### Task 4: content.ts erstellen

Bündle ALLE Texte in einer strukturierten TypeScript-Datei:

```typescript
// src/data/content.ts

export const SITE = {
  name: 'Fitness Factory Hattingen',
  tagline: '...',
  phone: '02324 33777',
  whatsapp: '+49 1573 7580001',
  email: 'fitness-factory-hattingen@gmx.de',
  address: { street: 'Im Vogelsang 95', zip: '45527', city: 'Hattingen' },
  hours: { weekday: 'Mo–Fr 08:00–23:00', weekend: 'Sa–So 10:00–17:30' },
  social: { instagram: '...', facebook: '...' },
} as const

export const HERO = {
  headline: '...',
  subheadline: '...',
  ctaPrimary: { label: '...', href: '/probetraining' },
  ctaSecondary: { label: '...', href: '/mitgliedschaft' },
} as const

export const TRUST_BAR = { /* ... */ } as const
export const LEISTUNGEN = { headline: '...', items: [...] } as const
export const PREISE = { headline: '...', tarife: [...], fremdgeh: {...} } as const
export const PROBETRAINING_CTA = { /* ... */ } as const
export const TEAM = { headline: '...', members: [...] } as const
export const KURSPLAN = { headline: '...', kurse: [...] } as const
export const GALERIE = { headline: '...', images: [...] } as const
export const TESTIMONIALS = { headline: '...', items: [...] } as const
export const FAQ = { headline: '...', items: [...] } as const
export const KONTAKT = { /* ... */ } as const
export const FOOTER = { /* ... */ } as const
export const META = { /* SEO Meta-Daten pro Seite */ } as const
```

**Regeln für content.ts:**
- `as const` für Typ-Sicherheit
- Deutsche Namen für Content-Variablen
- Alle Texte HIER — KEINE Texte direkt im JSX
- Platzhalter klar markiert: `'[TBD: Vom Kunden]'`
- WhatsApp-Nachricht URL-encoded

### Task 5: Copywriting-Guide

Erstelle einen kurzen Copywriting-Guide für zukünftige Texte:

- Tonalität-Regeln (Do's und Don'ts)
- Verbotene Floskeln (generische KI-Texte)
- CTA-Formeln (was funktioniert für Fitness)
- SEO-Keyword-Integration in Copy

---

## Verifikation (vor Abschluss)

- [ ] Alle 15 Homepage-Sections haben vollständige Texte
- [ ] Alle Unterseiten haben H1, Body-Copy und CTAs
- [ ] content.ts ist syntaktisch korrektes TypeScript (keine Tippfehler)
- [ ] KEINE generischen Floskeln: "Erlebe", "Entdecke", "Dein Partner für"
- [ ] Alle Preise, Öffnungszeiten, Kontaktdaten stimmen mit CLAUDE.md überein
- [ ] Platzhalter sind klar als `[TBD]` markiert
- [ ] FAQ beantwortet echte Kaufeinwände, nicht nur Infofragen
- [ ] Tonalität: Du-Ansprache, motivierend, familiär — durchgehend konsistent
- [ ] CTA-Texte sind aktionsorientiert ("Probetraining sichern" statt "Mehr erfahren")
