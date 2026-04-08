# PROMPT 4.1 — Trainer Foto & Qualifikationen Update

## Ziel
1. Alex' Foto auf das neue Bild `Alex_02.jpeg` ändern
2. Qualifikationen beider Trainer aktualisieren

## Datei: `src/data/content.ts` — TEAM-Objekt

### Änderung 1: Alex Foto
Ersetze:
```typescript
foto: '/Trainer/Alex.jpeg',
```
Mit:
```typescript
foto: '/Trainer/Alex_02.jpeg',
```

Das neue Bild liegt bereits unter `public/Trainer/Alex_02.jpeg`.

### Änderung 2: Alex Qualifikationen
Entferne `'Fitnessfachwirt (IHK)'` aus Alex' Qualifikationen-Array.

Vorher:
```typescript
qualifikationen: [
  'Fitnessfachwirt (IHK)',
  'Personal Trainer',
  'Ernährungsberater',
],
```

Nachher:
```typescript
qualifikationen: [
  'Personal Trainer',
  'Ernährungsberater',
],
```

### Änderung 3: Carla Qualifikationen
Ersetze Carlas Qualifikationen:

Vorher:
```typescript
qualifikationen: [
  'Indoor Cycling Instructor',
  'Group Fitness Trainer',
],
```

Nachher:
```typescript
qualifikationen: [
  'Indoor Cycling Trainerin',
  'Personal Trainer',
],
```

## Verifikation
1. `npm run build` fehlerfrei
2. Im Browser: Alex' neues Foto (`Alex_02.jpeg`) wird geladen (kein 404)
3. Alex zeigt nur 2 Qualifikationen: "Personal Trainer", "Ernährungsberater"
4. Carla zeigt: "Indoor Cycling Trainerin", "Personal Trainer"
5. Keine `Fitnessfachwirt (IHK)` mehr sichtbar
