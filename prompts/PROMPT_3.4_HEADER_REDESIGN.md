# PROMPT 3.4 — Header / Navigation Redesign (Desktop)

## Ziel
Redesigne den Desktop-Header für ein cleaneres, professionelleres Erscheinungsbild mit:
1. Telefonnummer als gestylter Button (statt roher Text)
2. Mega-Menu Navigation mit Haupttopics und Unterseiten
3. Insgesamt aufgeräumteres Layout

## Datei: `src/components/layout/Navigation.tsx`

---

## Teil 1: Telefon-Button

### Aktuell
Die Telefonnummer `02324 33777` wird als reiner Text angezeigt.

### Neu
Ersetze die rohe Telefonnummer durch einen gestylten Button — visuell ähnlich dem "Probetraining Buchen"-Button, aber als Outline/Ghost-Variante:

```tsx
<a
  href="tel:+492324333777"
  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-brand-primary text-brand-primary rounded-[4px] font-display font-bold text-body-sm hover:bg-brand-primary hover:text-white transition-colors duration-200"
  aria-label="Jetzt anrufen: 02324 33777"
>
  <Phone className="w-4 h-4" />
  Jetzt anrufen
</a>
```

- Import: `import { Phone } from 'lucide-react'`
- Style: Outline-Variante (border + text in CI-Rot, Hover: gefüllter Hintergrund)
- Runde Ecken: `rounded-[4px]` (CI-konform, NICHT rounded-full)
- Platzierung: Rechts neben dem "Probetraining Buchen"-Button (primär gefüllt)
- Layout-Reihenfolge im Header rechts: `Jetzt anrufen (outline)` → `Probetraining Buchen (filled)`

---

## Teil 2: Navigation mit Mega-Menu

### Implementiere EINE der folgenden 3 Optionen (wähle Option A):

### Option A — Fitness-fokussiert (EMPFOHLEN)
Hauptnavigation mit Dropdown-Unterseiten:

| Hauptmenü       | Unterseiten (Dropdown)                                        |
|-----------------|---------------------------------------------------------------|
| **Studio**      | Über uns, Rundgang, Ausstattung & Geräte                     |
| **Training**    | Kursplan, Spinning, Functional Training, Personal Training    |
| **Mitglied werden** | Preise & Mitgliedschaften, Probetraining, FAQ             |
| **Kontakt**     | Anfahrt, Öffnungszeiten, Kontaktformular                     |

### Option B — Erweitert mit Community
| Hauptmenü       | Unterseiten (Dropdown)                                        |
|-----------------|---------------------------------------------------------------|
| **Studio**      | Über uns, Team, Rundgang, Gerätepark                         |
| **Angebot**     | Kurse & Kursplan, Personal Training, Ernährungsberatung       |
| **Preise**      | Mitgliedschaften, Probetraining, Aktionen                     |
| **Community**   | Erfolgsgeschichten, Events, Blog                              |
| **Kontakt**     | Anfahrt & Öffnungszeiten, Kontaktformular                    |

### Option C — Minimalistisch
| Hauptmenü       | Unterseiten (Dropdown)                                        |
|-----------------|---------------------------------------------------------------|
| **Angebot**     | Kurse, Equipment, Personal Training                           |
| **Preise**      | Mitgliedschaften, Probetraining                               |
| **Über uns**    | Team, Studio-Rundgang, Bewertungen                            |
| **Kontakt**     | Adresse & Zeiten, Anrufen, Schreiben                          |

---

### Mega-Menu Technische Umsetzung

```tsx
// Typ-Definition
interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string; description?: string }[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Studio',
    href: '#studio',
    children: [
      { label: 'Über uns', href: '#about', description: 'Unsere Geschichte und Vision' },
      { label: 'Rundgang', href: '#rundgang', description: 'Entdecke unser Studio' },
      { label: 'Ausstattung & Geräte', href: '#equipment', description: 'Moderner Gerätepark' },
    ],
  },
  {
    label: 'Training',
    href: '#training',
    children: [
      { label: 'Kursplan', href: '#kursplan', description: 'Alle Kurse auf einen Blick' },
      { label: 'Spinning', href: '#spinning', description: 'Indoor Cycling mit Carla' },
      { label: 'Functional Training', href: '#functional', description: 'Ganzkörper-Workouts' },
      { label: 'Personal Training', href: '#personal', description: 'Eins-zu-eins Betreuung' },
    ],
  },
  {
    label: 'Mitglied werden',
    href: '#pricing',
    children: [
      { label: 'Preise & Mitgliedschaften', href: '#pricing', description: 'Unsere Tarife' },
      { label: 'Probetraining', href: '#probetraining', description: 'Kostenlos testen' },
      { label: 'FAQ', href: '#faq', description: 'Häufige Fragen' },
    ],
  },
  {
    label: 'Kontakt',
    href: '#kontakt',
    children: [
      { label: 'Anfahrt', href: '#location', description: 'So findest du uns' },
      { label: 'Öffnungszeiten', href: '#hours', description: 'Wann wir geöffnet haben' },
      { label: 'Kontaktformular', href: '#contact', description: 'Schreib uns eine Nachricht' },
    ],
  },
]
```

### Dropdown-Verhalten
- **Trigger:** `onMouseEnter` auf dem Hauptmenü-Item
- **Schließen:** `onMouseLeave` auf dem gesamten Dropdown-Container (mit kleiner Verzögerung ~150ms)
- **Animation:** Framer Motion `AnimatePresence` mit `fadeIn` + leichtem `translateY(-4px → 0)`
- **Design:**
  - Dropdown: `bg-white border border-brand-border rounded-[6px] shadow-lg`
  - Items: `px-4 py-3 hover:bg-brand-surface transition-colors`
  - Label: `font-display font-bold text-body-sm text-brand-text`
  - Description: `font-body text-caption text-brand-muted mt-0.5`
  - Aktiver Hauptpunkt: `text-brand-primary` Farbe + dünner `border-bottom` Indikator

### Desktop Header Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Logo]    Studio  Training  Mitglied werden  Kontakt    [Anrufen] [Probetraining] │
└─────────────────────────────────────────────────────────────────────┘
```

- Hintergrund: `bg-white border-b border-brand-border` (NICHT dunkel)
- Logo: Links, `h-10` max
- Navigation: Zentriert oder links nach dem Logo
- CTAs: Rechts ausgerichtet
  - "Jetzt anrufen" — Outline-Button (border-brand-primary)
  - "Probetraining Buchen" — Filled-Button (bg-brand-primary text-white)
- Sticky: `sticky top-0 z-50`
- Max-Width: `max-w-[1280px] mx-auto px-4 md:px-8`
- Höhe: `h-16 md:h-18` (kompakt)

### Mobile: Bestehenden Hamburger-Menü beibehalten
- Die Mega-Menu Dropdowns sind NUR für Desktop (≥1024px / `lg:`)
- Mobile bleibt beim bestehenden Hamburger/Slide-Out Pattern
- Im Mobile-Menü: Unterseiten als aufklappbare Akkordeons

---

## Design-Regeln (CI-konform)
- KEINE `rounded-full` Buttons
- KEINE Glow-Effekte
- KEINE Gradients im Header
- Border-Radius: 4px (Buttons), 6px (Dropdown-Cards)
- Farben: Nur `brand-primary` (#C8102E), `brand-text` (#1A1A1A), `brand-white`, `brand-surface`, `brand-border`
- Fonts: `font-display` für Labels, `font-body` für Descriptions

## Verifikation
1. `npm run build` fehlerfrei
2. Desktop: Cleaner weißer Header mit Logo links, Nav-Items mittig, 2 CTA-Buttons rechts
3. Hover über Nav-Item: Dropdown mit Unterseiten erscheint smooth animiert
4. "Jetzt anrufen" Button mit Phone-Icon funktioniert als `tel:` Link
5. "Probetraining Buchen" Button weiterhin prominent (filled/primary)
6. Mobile: Hamburger-Menü funktioniert weiterhin
7. Header ist sticky und scrollt mit
8. Keine AkquiseFlow-Referenzen mehr sichtbar
