# PROMPT 6.6 — Hero Live-Öffnungszeiten + Schriftzug + FAQ-Änderungen

## Kontext
Fitness Factory Hattingen Website — Vite + React 19 + TypeScript + Tailwind CSS 3.4 + Framer Motion 12.

---

## Aufgabe 1: Hero — Live-Öffnungsstatus statt statischem Text

### Problem:
Im Hero-Bereich auf der Startseite (Desktop) steht aktuell der statische Text **„Mo–Fr bis 23 Uhr"**. Das ist nicht dynamisch und zeigt am Wochenende die falsche Zeit.

### Gewünschtes Verhalten:
Der Text soll **live** anzeigen, ob das Studio gerade geöffnet oder geschlossen ist — basierend auf dem aktuellen Wochentag und der Uhrzeit.

### Logik:

**Öffnungszeiten:**
- Montag – Freitag: 08:00 – 23:00 Uhr
- Samstag – Sonntag: 10:00 – 17:30 Uhr

**Anzeige-Texte:**

| Situation | Anzeige |
|---|---|
| Mo–Fr, innerhalb 08:00–23:00 | `Jetzt geöffnet — bis 23:00 Uhr` |
| Sa–So, innerhalb 10:00–17:30 | `Jetzt geöffnet — bis 17:30 Uhr` |
| Außerhalb der Öffnungszeiten (Mo–Fr) | `Aktuell geschlossen — ab 08:00 Uhr` |
| Außerhalb der Öffnungszeiten (Sa–So) | `Aktuell geschlossen — ab 10:00 Uhr` |
| Freitag nach 23:00 | `Aktuell geschlossen — Sa ab 10:00 Uhr` |
| Sonntag nach 17:30 | `Aktuell geschlossen — Mo ab 08:00 Uhr` |

### Implementierung:

1. **Erstelle einen Helper/Hook** `src/hooks/useOpenStatus.ts`:

```typescript
import { useState, useEffect } from 'react';

interface OpenStatus {
  isOpen: boolean;
  label: string; // z.B. "Jetzt geöffnet — bis 23:00 Uhr"
}

export function useOpenStatus(): OpenStatus {
  const [status, setStatus] = useState<OpenStatus>(getStatus());

  useEffect(() => {
    // Jede Minute aktualisieren
    const interval = setInterval(() => {
      setStatus(getStatus());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  return status;
}

function getStatus(): OpenStatus {
  const now = new Date();
  const tag = now.getDay(); // 0 = Sonntag, 1 = Montag, ..., 6 = Samstag
  const stunde = now.getHours();
  const minute = now.getMinutes();
  const zeit = stunde + minute / 60; // z.B. 17.5 = 17:30

  const istWochentag = tag >= 1 && tag <= 5; // Mo–Fr
  const istWochenende = tag === 0 || tag === 6; // Sa, So

  if (istWochentag) {
    if (zeit >= 8 && zeit < 23) {
      return { isOpen: true, label: 'Jetzt geöffnet — bis 23:00 Uhr' };
    }
    // Geschlossen
    if (tag === 5 && zeit >= 23) {
      // Freitag nach 23:00 → nächster Öffnungstag ist Samstag
      return { isOpen: false, label: 'Aktuell geschlossen — Sa ab 10:00 Uhr' };
    }
    return { isOpen: false, label: 'Aktuell geschlossen — ab 08:00 Uhr' };
  }

  if (istWochenende) {
    if (zeit >= 10 && zeit < 17.5) {
      return { isOpen: true, label: 'Jetzt geöffnet — bis 17:30 Uhr' };
    }
    // Geschlossen
    if (tag === 0 && zeit >= 17.5) {
      // Sonntag nach 17:30 → nächster Öffnungstag ist Montag
      return { isOpen: false, label: 'Aktuell geschlossen — Mo ab 08:00 Uhr' };
    }
    if (tag === 6 && zeit >= 17.5) {
      // Samstag nach 17:30 → Sonntag ab 10:00
      return { isOpen: false, label: 'Aktuell geschlossen — So ab 10:00 Uhr' };
    }
    // Vor Öffnung
    return { isOpen: false, label: 'Aktuell geschlossen — ab 10:00 Uhr' };
  }

  return { isOpen: false, label: 'Aktuell geschlossen' };
}
```

2. **Im Hero-Bereich einbauen** (vermutlich `src/components/sections/HeroSection.tsx` oder ähnlich):

```tsx
import { useOpenStatus } from '../../hooks/useOpenStatus';

// Im Komponenten-Body:
const { isOpen, label } = useOpenStatus();

// Im JSX — ersetze den statischen Text "Mo–Fr bis 23 Uhr" mit:
<span className={`inline-flex items-center gap-2 ${isOpen ? 'text-green-400' : 'text-red-400'}`}>
  <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
  {label}
</span>
```

3. **Suche den statischen Text** im Code:
```bash
grep -r "Mo.*Fr.*23\|bis 23 Uhr\|Mo–Fr" src/
```
Ersetze ALLE Vorkommen von „Mo–Fr bis 23 Uhr" (oder ähnliche statische Öffnungszeiten-Texte im Hero) durch die dynamische Komponente.

---

## Aufgabe 2: Hero — Schriftzug ändern

### Änderung:
Im Hero-Bereich steht aktuell **„Fitnessstudio Hattingen"**. Ändere diesen Text zu:

**„Fitness Factory"**

### Implementierung:
1. Suche den Text im Code:
```bash
grep -r "Fitnessstudio Hattingen" src/
```
2. Ersetze **„Fitnessstudio Hattingen"** mit **„Fitness Factory"** — aber NUR im Hero-Bereich
3. Falls der Text in `src/data/content.ts` steht, ändere ihn dort
4. **SEO-Hinweis:** Falls der Text als `<h1>` gerendert wird, ist „Fitness Factory" als Hauptüberschrift in Ordnung — der Standort „Hattingen" sollte dann aber weiterhin irgendwo im Hero als Subtext oder in der Meta-Description vorkommen

---

## Aufgabe 3: FAQ — Frage ersetzen

### Änderung:
Ersetze die folgende FAQ-Frage:

**ALT:**
- Frage: „Gibt es einen Studentenrabatt oder ermäßigte Tarife?"
- Kategorie: „Mitgliedschaft & Preise"

**NEU:**
- Frage: **„Was bietet ihr für Mitgliedschaften?"**
- Kategorie: „Mitgliedschaft & Preise"
- Antwort: **„Wir bieten flexible Mitgliedschaften — von monatlich kündbar bis hin zu vergünstigten Laufzeitverträgen. Ob Einzelperson, Paar oder Familie: Wir finden den passenden Tarif für dich. Komm einfach vorbei oder ruf uns an, und wir beraten dich persönlich."**

### Implementierung:
1. Öffne `src/data/content.ts` und finde das FAQ-Array
2. Suche den Eintrag mit der Frage „Gibt es einen Studentenrabatt oder ermäßigte Tarife?"
3. Ersetze Frage und Antwort komplett:

```typescript
{
  kategorie: 'Mitgliedschaft & Preise',
  frage: 'Was bietet ihr für Mitgliedschaften?',
  antwort: 'Wir bieten flexible Mitgliedschaften — von monatlich kündbar bis hin zu vergünstigten Laufzeitverträgen. Ob Einzelperson, Paar oder Familie: Wir finden den passenden Tarif für dich. Komm einfach vorbei oder ruf uns an, und wir beraten dich persönlich.',
},
```

4. Die Reihenfolge innerhalb der Kategorie „Mitgliedschaft & Preise" bleibt gleich — die neue Frage steht an derselben Position wie die alte

---

## Wichtig:
- Der Live-Öffnungsstatus aktualisiert sich **jede Minute** automatisch (kein Page-Reload nötig)
- Der grüne/rote Punkt macht den Status sofort visuell erkennbar
- Desktop UND Mobile sollen den Live-Status anzeigen
- Alle anderen Hero-Elemente (Bilder, Buttons, Subtext) bleiben UNVERÄNDERT
- `npm run build` muss fehlerfrei durchlaufen

---

## Verifikation:
```bash
npm run build
npm run dev
# 1. Hero: "Fitness Factory" statt "Fitnessstudio Hattingen" prüfen
# 2. Hero: Live-Status prüfen — je nach Uhrzeit "Jetzt geöffnet" oder "Aktuell geschlossen"
# 3. Hero: Grüner Punkt (geöffnet) oder roter Punkt (geschlossen) sichtbar
# 4. FAQ-Seite: "Was bietet ihr für Mitgliedschaften?" ist vorhanden
# 5. FAQ-Seite: "Gibt es einen Studentenrabatt..." ist NICHT mehr vorhanden
# 6. Mobile + Desktop testen
# 7. Browser-Uhrzeit manuell ändern zum Testen verschiedener Zeiten (DevTools → Sensors → Override location/time)
```
