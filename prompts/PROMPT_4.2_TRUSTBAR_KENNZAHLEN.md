# PROMPT 4.2 — TrustBar Kennzahlen Fix (Platzhalter ersetzen)

## Ziel
Die TrustBar unter dem Hero zeigt falsche/Platzhalter-Werte. Ersetze sie durch echte Daten.

## Datei: `src/data/content.ts`

### Änderung 1: TRUST_BAR Items
Suche das `TRUST_BAR`-Objekt (ca. Zeile 160-185). Ersetze die `items`:

Vorher:
```typescript
{
  icon: 'Star',
  wert: '4,9',
  label: 'Google Bewertung',
},
{
  icon: 'Users',
  wert: '[TBD: z.B. 500+]',
  label: 'aktive Mitglieder',
},
{
  icon: 'Calendar',
  wert: '10+',
  label: 'Live-Kurse pro Woche',
},
```

Nachher:
```typescript
{
  icon: 'Star',
  wert: '4,9',
  label: 'Google Bewertung (167)',
},
{
  icon: 'Users',
  wert: '167',
  label: 'Google Bewertungen',
},
{
  icon: 'Calendar',
  wert: '16',
  label: 'Live-Kurse pro Woche',
},
```

**Hinweis:** Falls ein 4. Item (z.B. MapPin/Standort) existiert, kann es bleiben. Nur die oben genannten 3 ändern.

### Änderung 2: SITE-Objekt Platzhalter
Ersetze im `SITE`-Objekt (ca. Zeile 53-56):

```typescript
gruendungsjahr: '[TBD: Vom Kunden]',
mitgliederanzahl: '[TBD: Vom Kunden]',
bewertungenAnzahl: '[TBD: Vom Kunden]',
bewertungsDurchschnitt: '[TBD: Vom Kunden]',
```

Mit:
```typescript
gruendungsjahr: '2018',
mitgliederanzahl: '500+',
bewertungenAnzahl: '167',
bewertungsDurchschnitt: '4,9',
```

### Änderung 3: Hero Kennzahlen
Im `HERO`-Objekt (ca. Zeile 148-154) steht `'10+'` bei Live-Kurse. Ersetze:

```typescript
kennzahlen: [
  { wert: '35\u20ac', label: 'ab Monat' },
  { wert: '10+', label: 'Live-Kurse' },
  { wert: '\u221e', label: 'Sauna inkl.' },
],
```

Mit:
```typescript
kennzahlen: [
  { wert: '35\u20ac', label: 'ab Monat' },
  { wert: '16', label: 'Live-Kurse' },
  { wert: '\u221e', label: 'Sauna inkl.' },
],
```

### Änderung 4: Alle "10+" Referenzen in content.ts
Suche und ersetze ALLE Stellen wo `'10+'` oder `'10+ Live-Kurse'` steht:
- `'10+ Live-Kurse'` → `'16 Live-Kurse'`
- `'10+ Live-Kurse'` in der SEO-Description → `'16 Live-Kurse'`
- In `LEISTUNGEN_INKLUSIVE`: `'10+ Live-Kurse'` → `'16 Live-Kurse'`

### Änderung 5: Vertrauenssignal im Hero
Ersetze:
```typescript
vertrauenssignal: '[TBD: Vom Kunden — z.B. "Über 500 zufriedene Mitglieder"]',
```
Mit:
```typescript
vertrauenssignal: 'Über 500 zufriedene Mitglieder in Hattingen',
```

## Verifikation
1. `npm run build` fehlerfrei
2. TrustBar zeigt: "4,9 Google Bewertung (167)" | "167 Google Bewertungen" | "16 Live-Kurse pro Woche"
3. Hero zeigt "16" bei Live-Kurse, NICHT "10+"
4. Keine `[TBD`-Platzhalter mehr in TrustBar oder Hero
5. Suche in content.ts nach `[TBD` — nur noch an Stellen die wirklich nicht bekannt sind (Kurszeiten etc.)
