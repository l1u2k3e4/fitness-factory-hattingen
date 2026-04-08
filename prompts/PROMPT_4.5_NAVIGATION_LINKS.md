# PROMPT 4.5 — Navigation Links reparieren + Section-IDs setzen

## Problem
Die Desktop-Navigation (Mega-Menu) verlinkt auf Anker wie `/#studio`, `/#about`, `/#equipment`, `/#personal`, `/#location`, `/#hours`, `/#contact` — aber diese IDs existieren NICHT auf der Homepage. Die tatsächlichen Section-IDs sind z.B. `kontakt`, `preise-headline`, `team-headline` etc. — und vielen Sections fehlt ein top-level `id` ganz.

## Ziel
1. Jeder Homepage-Section ein sinnvolles `id`-Attribut geben
2. Alle Navigation-Links auf die richtigen Ziele verlinken (Sections ODER eigenständige Seiten)
3. Sicherstellen, dass Anchor-Scroll sauber funktioniert

---

## Teil 1: Section-IDs setzen

Füge folgende `id`-Attribute zu den `<section>`-Tags der jeweiligen Komponenten hinzu:

| Komponente | Datei | ID setzen auf `<section>` |
|---|---|---|
| HeroSection | `src/components/sections/HeroSection.tsx` | `id="hero"` |
| TrustBar | `src/components/sections/TrustBar.tsx` | `id="trust"` |
| LeistungenSection | `src/components/sections/LeistungenSection.tsx` | `id="leistungen"` |
| PreiseSection | `src/components/sections/PreiseSection.tsx` | `id="preise"` |
| ProbetrainingCta | `src/components/sections/ProbetrainingCta.tsx` | `id="probetraining"` |
| TeamSection | `src/components/sections/TeamSection.tsx` | `id="team"` |
| KursplanPreview | `src/components/sections/KursplanPreview.tsx` | `id="kursplan"` |
| GalerieSection | `src/components/sections/GalerieSection.tsx` | `id="galerie"` |
| TestimonialsSection | `src/components/sections/TestimonialsSection.tsx` | `id="bewertungen"` |
| FaqSection | `src/components/sections/FaqSection.tsx` | `id="faq"` |
| KontaktSection | `src/components/sections/KontaktSection.tsx` | bereits `id="kontakt"` ✅ |

**Beispiel** (LeistungenSection.tsx):
```tsx
// Vorher:
<section className="py-16 md:py-24 bg-white" aria-labelledby="leistungen-headline">

// Nachher:
<section id="leistungen" className="py-16 md:py-24 bg-white" aria-labelledby="leistungen-headline">
```

---

## Teil 2: Navigation-Links korrigieren

### Datei: `src/components/layout/Navigation.tsx`

Ersetze das gesamte `NAV_ITEMS`-Array:

```typescript
const NAV_ITEMS: NavItem[] = [
  {
    label: 'Studio',
    href: '/#leistungen',
    children: [
      { label: 'Über uns', href: '/#leistungen', description: 'Was die Fitness Factory ausmacht' },
      { label: 'Team', href: '/team', description: 'Lerne unsere Trainer kennen' },
      { label: 'Galerie', href: '/#galerie', description: 'Rundgang durch unser Studio' },
    ],
  },
  {
    label: 'Training',
    href: '/kursplan',
    children: [
      { label: 'Kursplan', href: '/kursplan', description: 'Alle 16 Kurse pro Woche' },
      { label: 'Spinning', href: '/kursplan#spinning', description: 'Indoor Cycling mit Carla' },
      { label: 'Personal Training', href: '/#leistungen', description: 'Individuelle Betreuung' },
    ],
  },
  {
    label: 'Mitglied werden',
    href: '/mitgliedschaft',
    children: [
      { label: 'Preise & Mitgliedschaften', href: '/mitgliedschaft', description: 'Unsere Tarife' },
      { label: 'Probetraining', href: '/probetraining', description: 'Kostenlos testen' },
      { label: 'Fremdgeh-Aktion', href: '/fremdgeh-aktion', description: '3 Monate gratis' },
      { label: 'FAQ', href: '/faq', description: 'Häufige Fragen' },
    ],
  },
  {
    label: 'Kontakt',
    href: '/#kontakt',
    children: [
      { label: 'Anfahrt & Öffnungszeiten', href: '/#kontakt', description: 'So findest du uns' },
      { label: 'Bewertungen', href: '/#bewertungen', description: '4.9★ bei 167 Google Reviews' },
      { label: 'Nachricht schreiben', href: '/#kontakt', description: 'Wir antworten in 24h' },
    ],
  },
]
```

**Mapping-Logik:**

| Nav-Link | Ziel | Typ |
|---|---|---|
| Über uns → `/#leistungen` | LeistungenSection auf Homepage | Scroll to Section |
| Team → `/team` | TeamPage (existiert ✅) | Eigene Seite |
| Galerie → `/#galerie` | GalerieSection auf Homepage | Scroll to Section |
| Kursplan → `/kursplan` | KursplanPage (existiert ✅) | Eigene Seite |
| Spinning → `/kursplan#spinning` | KursplanPage Spinning-Bereich | Seite + Anchor |
| Personal Training → `/#leistungen` | LeistungenSection | Scroll to Section |
| Preise → `/mitgliedschaft` | MitgliedschaftPage (existiert ✅) | Eigene Seite |
| Probetraining → `/probetraining` | ProbetrainingPage (existiert ✅) | Eigene Seite |
| Fremdgeh-Aktion → `/fremdgeh-aktion` | FremdgehAktionPage (existiert ✅) | Eigene Seite |
| FAQ → `/faq` | FaqPage (existiert ✅) | Eigene Seite |
| Anfahrt → `/#kontakt` | KontaktSection | Scroll to Section |
| Bewertungen → `/#bewertungen` | TestimonialsSection | Scroll to Section |
| Nachricht → `/#kontakt` | KontaktSection Formular | Scroll to Section |

---

## Teil 3: Smooth Scroll für Anchor-Links

Stelle sicher, dass Anchor-Links auf der Homepage smooth scrollen. Falls noch nicht vorhanden, füge in `src/main.tsx` oder `src/App.tsx` hinzu:

```css
/* In index.css oder global.css */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* Höhe des sticky Headers */
}
```

Oder per React Router ScrollRestoration + manuellem Scroll:

In der Navigation-Komponente, beim Click auf Anker-Links:

```typescript
const handleNavClick = (href: string) => {
  if (href.startsWith('/#')) {
    const elementId = href.replace('/#', '')
    const element = document.getElementById(elementId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth',
      })
    }
  }
  setOpenDropdown(null)
  setMenuOpen(false)
}
```

---

## Verifikation
1. `npm run build` fehlerfrei
2. JEDER Nav-Link führt zum richtigen Ziel:
   - Anchor-Links (`/#...`) scrollen sanft zur Section auf der Homepage
   - Seiten-Links (`/team`, `/kursplan`, etc.) öffnen die richtige Seite
3. Scroll-Offset: Section-Header wird nicht unter dem sticky Header versteckt
4. Mobile Hamburger-Menü funktioniert weiterhin mit den aktualisierten Links
5. Dropdown-Unterseiten-Links funktionieren korrekt
6. Von einer Unterseite (z.B. `/team`) zurück zur Homepage-Section (z.B. `/#kontakt`) funktioniert
