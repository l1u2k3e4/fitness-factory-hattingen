# PROMPT 3.3 — Google Reviews (Echte Bewertungen statt Platzhalter)

## Ziel
Ersetze die Platzhalter-Testimonials durch echte Google-Bewertungen der Fitness Factory Hattingen.

## Echte Daten

### Gesamtbewertung
- **4.9 Sterne** bei **167 Bewertungen** auf Google Maps
- Google Maps Link: https://maps.google.com/?cid=fitness-factory-hattingen

### Einzelne Bewertungen

**Bewertung 1:**
- Name: Florian Kurth
- Sterne: 5/5
- Text: "Das Studio macht einen sehr coolen Eindruck, bei dem es bock macht zu trainieren. Der Maschinenpark ist richtig gut und die Trainer sind sehr freundlich und hilfsbereit."
- Zeitraum: vor 2 Monaten

**Bewertung 2:**
- Name: Dominik Sociera
- Sterne: 5/5
- Text: "Ich war zum Probetraining dort und bin wirklich begeistert. Das Studio ist modern ausgestattet, sehr sauber und die Atmosphäre ist super angenehm. Die Trainer nehmen sich Zeit und gehen individuell auf einen ein."
- Zeitraum: vor 3 Monaten

**Bewertung 3:**
- Name: Luca Vielmetter
- Sterne: 5/5
- Text: "Richtig starkes Gym. Die Fitness Factory überzeugt mit einer top Geräteauswahl, sauberen Räumlichkeiten und einem motivierenden Ambiente. Besonders hervorzuheben ist die persönliche Betreuung."
- Zeitraum: vor 1 Monat

## Dateien die geändert werden müssen

### 1. `src/data/content.ts` — TESTIMONIALS / SOCIAL_PROOF Objekt

Suche das Objekt das die Testimonials/Bewertungen/Social-Proof-Daten enthält (vermutlich `SOCIAL_PROOF` oder `TESTIMONIALS`) und ersetze es vollständig:

```typescript
export const SOCIAL_PROOF = {
  sectionBadge: 'Bewertungen',
  headline: '4.9 Sterne bei 167 Google-Bewertungen',
  subheadline:
    'Was unsere Mitglieder über die Fitness Factory sagen.',
  overallRating: 4.9,
  totalReviews: 167,
  platform: 'Google',
  bewertungen: [
    {
      name: 'Florian Kurth',
      rating: 5,
      text: 'Das Studio macht einen sehr coolen Eindruck, bei dem es bock macht zu trainieren. Der Maschinenpark ist richtig gut und die Trainer sind sehr freundlich und hilfsbereit.',
      zeitraum: 'vor 2 Monaten',
    },
    {
      name: 'Dominik Sociera',
      rating: 5,
      text: 'Ich war zum Probetraining dort und bin wirklich begeistert. Das Studio ist modern ausgestattet, sehr sauber und die Atmosphäre ist super angenehm. Die Trainer nehmen sich Zeit und gehen individuell auf einen ein.',
      zeitraum: 'vor 3 Monaten',
    },
    {
      name: 'Luca Vielmetter',
      rating: 5,
      text: 'Richtig starkes Gym. Die Fitness Factory überzeugt mit einer top Geräteauswahl, sauberen Räumlichkeiten und einem motivierenden Ambiente. Besonders hervorzuheben ist die persönliche Betreuung.',
      zeitraum: 'vor 1 Monat',
    },
  ],
  ctaLabel: 'Alle Bewertungen auf Google →',
  ctaHref: 'https://www.google.com/maps/place/Fitness+Factory+Hattingen/',
} as const
```

**WICHTIG:** Prüfe den genauen Namen des Objekts in `content.ts`. Es könnte `SOCIAL_PROOF`, `TESTIMONIALS`, `REVIEWS` oder ähnlich heißen. Passe den Export-Namen und alle Imports in den Section-Komponenten entsprechend an.

### 2. Section-Komponente (z.B. `SocialProofSection.tsx` oder `TestimonialsSection.tsx`)

Stelle sicher, dass die Komponente:
- Die Gesamtbewertung (4.9★ / 167 Bewertungen) prominent anzeigt
- Echte Google-Sterne (gefüllte Sterne-Icons) rendert, nicht Platzhalter
- Den Google-Link als CTA-Button hat
- Die `zeitraum`-Property anzeigt
- KEINE Platzhalter-Texte oder `[TBD]`-Einträge mehr enthält

### 3. Design-Hinweise
- Sterne: Verwende `Star` Icon aus `lucide-react`, gefüllt in `text-yellow-400` oder `text-brand-primary`
- Google-Logo oder -Badge: Optional, aber empfohlen für Vertrauenswürdigkeit
- Karten-Design: Weiße Cards (`bg-white`) mit `border border-brand-border rounded-[6px]` — CI-konform
- Zitat-Styling: `font-body text-body text-brand-muted` mit Anführungszeichen
- Name: `font-display font-bold text-brand-text`

## Verifikation
1. `npm run build` fehlerfrei
2. Im Browser: 3 echte Google-Bewertungen mit korrekten Namen und Texten
3. Gesamtbewertung "4.9 ★ bei 167 Bewertungen" sichtbar
4. Keine `[TBD]`-Texte mehr
5. Sterne werden korrekt angezeigt (5/5 für alle drei)
6. Google-Link funktioniert
