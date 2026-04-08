# PROMPT 3.1 — Trainer-Profile Fix

## Ziel
Ersetze die 3 Platzhalter-Trainerprofile durch genau 2 echte Profile (Alex und Carla). Entferne den dritten Platzhalter komplett.

## Dateien die geändert werden müssen

### 1. `src/data/content.ts` — TEAM-Objekt

Ersetze das komplette `TEAM`-Objekt mit folgendem Inhalt:

```typescript
export const TEAM = {
  sectionBadge: 'Unser Team',
  headline: 'Menschen, keine Maschinen.',
  subheadline:
    'Wir kennen dich beim Namen — und wissen, was dich weiterbringt. Persönliche Betreuung statt anonymem Großstudio.',
  mitglieder: [
    {
      name: 'Alex',
      rolle: 'Inhaber & Cheftrainer',
      qualifikationen: [
        'Fitnessfachwirt (IHK)',
        'Personal Trainer',
        'Ernährungsberater',
      ],
      beschreibung:
        'Alex hat die Fitness Factory mit einer klaren Vision gegründet: Ein Studio, in dem jeder Mensch individuell betreut wird. Als Inhaber und Cheftrainer kennt er jedes Mitglied persönlich und sorgt dafür, dass Training Ergebnisse liefert — nicht nur Schweiß.',
      foto: '/Trainer/Alex.jpeg',
    },
    {
      name: 'Carla',
      rolle: 'Spinning-Trainerin',
      qualifikationen: [
        'Indoor Cycling Instructor',
        'Group Fitness Trainer',
      ],
      beschreibung:
        'Carla bringt Energie in jede Spinning-Stunde. Mit mitreißender Musik und motivierenden Ansagen sorgt sie dafür, dass du deine Grenzen sprengst — und dabei Spaß hast. Ihre Kurse sind legendär und regelmäßig ausgebucht.',
      foto: '/Trainer/Carla.jpeg',
    },
  ],
  ctaLabel: 'Lerne uns beim Probetraining kennen →',
  ctaHref: '#probetraining',
} as const
```

### 2. `src/components/sections/TeamSection.tsx`

Die Komponente muss NICHT strukturell geändert werden — sie rendert bereits dynamisch aus `TEAM.mitglieder`. Da jetzt nur noch 2 Trainer vorhanden sind, ändere das Grid-Layout:

- Ersetze `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` mit `grid-cols-1 sm:grid-cols-2`
- Damit werden die 2 Karten auf Desktop nebeneinander und auf Mobile untereinander angezeigt
- Optional: Füge `max-w-[800px] mx-auto` zum Grid-Container hinzu, damit die 2 Karten nicht zu breit werden

## Wichtig
- Es gibt genau 2 Trainer — NICHT mehr, NICHT weniger
- Fotos liegen bereits unter `public/Trainer/Alex.jpeg` und `public/Trainer/Carla.jpeg`
- Die Foto-Pfade im Content MÜSSEN ohne `public/` Präfix sein (Vite served `public/` als Root)
- KEINE Platzhalter `[TBD]` mehr im TEAM-Objekt
- `as const` am Ende des Objekts beibehalten

## Verifikation
Nach der Änderung:
1. `npm run build` muss fehlerfrei durchlaufen
2. Im Browser prüfen: 2 Trainer-Karten mit echten Fotos, Namen und Beschreibungen
3. Keine `[TBD]`-Texte mehr sichtbar
4. Fotos laden korrekt (kein 404)
