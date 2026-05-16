# PROMPT 6.5 — Sonder-Öffnungszeiten Pop-Up (Dashboard → Website)

## Kontext
Fitness Factory Hattingen Website — Vite + React 19 + TypeScript + Tailwind CSS 3.4 + Framer Motion 12.
Content Dashboard (Express + Multer, Port 3001) mit JSON-Overrides-System.
Das Dashboard hat bereits ein Modul **„Sonder-Öffnungszeiten"** (siehe Screenshot), in dem Datum, Anlass, Öffnungszeit und Schließzeit eingetragen werden können.

## Aufgabe
Erstelle ein **Pop-Up / Banner** auf der Website, das Mitglieder automatisch über Sonder-Öffnungszeiten informiert (z. B. Feiertage wie Ostern, Weihnachten etc.).

---

## Funktionslogik

### Wann wird das Pop-Up angezeigt?
1. **Automatisch 2 Tage VOR** dem eingetragenen Sonder-Öffnungszeiten-Datum
2. **Am Tag selbst** — den ganzen Tag über
3. **Verschwindet automatisch** am Ende des eingetragenen Tages (23:59 Uhr)
4. **Mehrere Einträge möglich** — wenn z. B. Karfreitag + Ostermontag eingetragen sind, werden beide angezeigt

### Beispiel-Timeline:
```
Eintrag im Dashboard: 18.04.2026, Anlass: "Karfreitag", 10:00–14:00

→ 16.04. ab 00:00 Uhr: Pop-Up erscheint ("In 2 Tagen: Karfreitag — 10:00 bis 14:00 Uhr")
→ 17.04.: Pop-Up bleibt ("Morgen: Karfreitag — 10:00 bis 14:00 Uhr")
→ 18.04.: Pop-Up bleibt ("Heute: Karfreitag — 10:00 bis 14:00 Uhr")
→ 19.04. ab 00:00 Uhr: Pop-Up verschwindet automatisch
```

### Zusätzlich: Tastenkürzel für Live-Demo
- **`Cmd + 0`** (Mac) / **`Ctrl + 0`** (Windows) → Zeigt das Pop-Up sofort an (auch wenn kein aktueller Sonder-Eintrag existiert)
- Damit kann man dem Kunden die Funktion live demonstrieren
- Ein erneutes Drücken von `Cmd + 0` schließt das Pop-Up wieder
- Im Demo-Modus wird ein Beispiel-Eintrag angezeigt: „Beispiel: Karfreitag — 10:00 bis 14:00 Uhr"

---

## Implementierung

### 1. Dashboard-Seite: Sonder-Öffnungszeiten speichern

Prüfe die bestehende Dashboard-Logik. Die Sonder-Öffnungszeiten müssen als JSON gespeichert und vom Frontend abrufbar sein.

**Datenstruktur** (in `overrides.json` oder separater Datei `sonder-oeffnungszeiten.json`):

```json
{
  "sonderOeffnungszeiten": [
    {
      "id": "so-001",
      "datum": "2026-04-18",
      "anlass": "Karfreitag",
      "oeffnung": "10:00",
      "schliessung": "14:00",
      "bannerAktiv": true
    },
    {
      "id": "so-002",
      "datum": "2026-04-20",
      "anlass": "Ostermontag",
      "oeffnung": "10:00",
      "schliessung": "16:00",
      "bannerAktiv": true
    }
  ]
}
```

**API-Endpunkt** (falls noch nicht vorhanden):
```
GET  /api/sonder-oeffnungszeiten   → Gibt alle Einträge zurück
POST /api/sonder-oeffnungszeiten   → Neuen Eintrag speichern
DELETE /api/sonder-oeffnungszeiten/:id → Eintrag löschen
```

### 2. Frontend-Komponente: `SonderOeffnungszeitenPopup.tsx`

Erstelle `src/components/ui/SonderOeffnungszeitenPopup.tsx`:

```tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SonderEintrag {
  id: string;
  datum: string;       // "2026-04-18"
  anlass: string;      // "Karfreitag"
  oeffnung: string;    // "10:00"
  schliessung: string; // "14:00"
  bannerAktiv: boolean;
}

export function SonderOeffnungszeitenPopup() {
  const [eintraege, setEintraege] = useState<SonderEintrag[]>([]);
  const [sichtbar, setSichtbar] = useState(false);
  const [demoModus, setDemoModus] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // 1. Daten vom Server laden
  useEffect(() => {
    fetch('/api/sonder-oeffnungszeiten')
      .then(res => res.json())
      .then(data => setEintraege(data.sonderOeffnungszeiten || []))
      .catch(() => {}); // Stille Fehlerbehandlung
  }, []);

  // 2. Prüfen ob Pop-Up angezeigt werden soll (2 Tage vorher bis Ende des Tages)
  useEffect(() => {
    if (dismissed) return;

    const jetzt = new Date();
    const aktiveEintraege = eintraege.filter(eintrag => {
      if (!eintrag.bannerAktiv) return false;

      const eventDatum = new Date(eintrag.datum + 'T00:00:00');
      const zweiTageVorher = new Date(eventDatum);
      zweiTageVorher.setDate(zweiTageVorher.getDate() - 2);

      const endeDesTages = new Date(eventDatum);
      endeDesTages.setDate(endeDesTages.getDate() + 1); // Nächster Tag 00:00

      return jetzt >= zweiTageVorher && jetzt < endeDesTages;
    });

    setSichtbar(aktiveEintraege.length > 0);
  }, [eintraege, dismissed]);

  // 3. Tastenkürzel: Cmd+0 / Ctrl+0 für Demo-Modus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key === '0') {
        e.preventDefault();
        setDemoModus(prev => !prev);
        setDismissed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 4. Aktive Einträge bestimmen
  const getAktiveEintraege = (): SonderEintrag[] => {
    if (demoModus) {
      return [{
        id: 'demo',
        datum: new Date().toISOString().split('T')[0],
        anlass: 'Karfreitag (Demo)',
        oeffnung: '10:00',
        schliessung: '14:00',
        bannerAktiv: true,
      }];
    }

    const jetzt = new Date();
    return eintraege.filter(eintrag => {
      if (!eintrag.bannerAktiv) return false;
      const eventDatum = new Date(eintrag.datum + 'T00:00:00');
      const zweiTageVorher = new Date(eventDatum);
      zweiTageVorher.setDate(zweiTageVorher.getDate() - 2);
      const endeDesTages = new Date(eventDatum);
      endeDesTages.setDate(endeDesTages.getDate() + 1);
      return jetzt >= zweiTageVorher && jetzt < endeDesTages;
    });
  };

  // 5. Relative Tagesanzeige berechnen
  const getTagLabel = (datumStr: string): string => {
    const heute = new Date();
    heute.setHours(0, 0, 0, 0);
    const eventTag = new Date(datumStr + 'T00:00:00');
    eventTag.setHours(0, 0, 0, 0);

    const diffMs = eventTag.getTime() - heute.getTime();
    const diffTage = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffTage === 0) return 'Heute';
    if (diffTage === 1) return 'Morgen';
    if (diffTage === 2) return 'In 2 Tagen';
    return `Am ${eventTag.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}`;
  };

  const aktive = getAktiveEintraege();
  const istSichtbar = (sichtbar || demoModus) && !dismissed && aktive.length > 0;

  return (
    <AnimatePresence>
      {istSichtbar && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white shadow-2xl"
        >
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            {/* Icon */}
            <div className="flex-shrink-0 text-2xl">🕐</div>

            {/* Inhalt */}
            <div className="flex-1 text-center">
              {aktive.map((eintrag, i) => (
                <div key={eintrag.id} className={i > 0 ? 'mt-1 pt-1 border-t border-white/20' : ''}>
                  <p className="font-bold text-sm md:text-base">
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs mr-2">
                      {getTagLabel(eintrag.datum)}
                    </span>
                    {eintrag.anlass}
                  </p>
                  <p className="text-white/90 text-xs md:text-sm mt-0.5">
                    Geänderte Öffnungszeiten: {eintrag.oeffnung} – {eintrag.schliessung} Uhr
                  </p>
                </div>
              ))}
              {demoModus && (
                <p className="text-white/60 text-[10px] mt-1 uppercase tracking-wider">
                  Demo-Modus — Cmd+0 zum Schließen
                </p>
              )}
            </div>

            {/* Schließen-Button */}
            <button
              onClick={() => {
                setDismissed(true);
                setDemoModus(false);
              }}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white"
              aria-label="Hinweis schließen"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### 3. In App.tsx einbinden

Die Komponente muss EINMAL global eingebunden werden, damit sie auf jeder Seite sichtbar ist:

```tsx
import { SonderOeffnungszeitenPopup } from './components/ui/SonderOeffnungszeitenPopup';

// Im JSX, innerhalb des äußersten Wrappers, VOR allem anderen:
function App() {
  return (
    <ThemeVariantProvider>
      <SonderOeffnungszeitenPopup />
      {/* ... restlicher App-Code (Router etc.) ... */}
    </ThemeVariantProvider>
  );
}
```

### 4. Header-Offset anpassen

Wenn das Pop-Up sichtbar ist, muss der Sticky-Header nach unten rücken, damit nichts verdeckt wird:

- Prüfe `src/components/layout/Header.tsx` (oder `Navigation.tsx`)
- Wenn das Pop-Up sichtbar ist, braucht der Header ein zusätzliches `top`-Offset
- **Option A (einfach):** Das Pop-Up wird als festes Banner über dem Header gerendert und der gesamte Seiteninhalt bekommt ein `padding-top`
- **Option B (elegant):** Nutze einen Context oder CSS-Variable:
  ```css
  :root {
    --popup-height: 0px;
  }
  [data-sonder-popup="visible"] {
    --popup-height: 60px; /* Höhe des Banners */
  }
  .sticky-header {
    top: var(--popup-height);
  }
  body {
    padding-top: calc(var(--popup-height) + var(--header-height, 80px));
  }
  ```

### 5. Dashboard-Server: API-Route sicherstellen

Prüfe in `server.js` / `server.ts` ob die Sonder-Öffnungszeiten bereits per API abrufbar sind. Falls nicht, füge hinzu:

```javascript
// GET: Sonder-Öffnungszeiten abrufen
app.get('/api/sonder-oeffnungszeiten', (req, res) => {
  const data = readJSON('sonder-oeffnungszeiten.json');
  res.json(data);
});

// POST: Neuen Eintrag speichern (vom Dashboard)
app.post('/api/sonder-oeffnungszeiten', (req, res) => {
  const data = readJSON('sonder-oeffnungszeiten.json');
  if (!data.sonderOeffnungszeiten) data.sonderOeffnungszeiten = [];

  const neuerEintrag = {
    id: `so-${Date.now()}`,
    datum: req.body.datum,
    anlass: req.body.anlass,
    oeffnung: req.body.oeffnung,
    schliessung: req.body.schliessung,
    bannerAktiv: true,
  };

  data.sonderOeffnungszeiten.push(neuerEintrag);
  writeJSON('sonder-oeffnungszeiten.json', data);
  res.json({ success: true, eintrag: neuerEintrag });
});

// DELETE: Eintrag löschen
app.delete('/api/sonder-oeffnungszeiten/:id', (req, res) => {
  const data = readJSON('sonder-oeffnungszeiten.json');
  data.sonderOeffnungszeiten = (data.sonderOeffnungszeiten || [])
    .filter(e => e.id !== req.params.id);
  writeJSON('sonder-oeffnungszeiten.json', data);
  res.json({ success: true });
});
```

### 6. Dashboard: „Als Banner speichern"-Button (optional)

Im Dashboard-Modul „Sonder-Öffnungszeiten" den bereits vorhandenen Speichern-Button nutzen. Beim Speichern eines Sonder-Öffnungszeiten-Eintrags:
- Der Eintrag wird in `sonder-oeffnungszeiten.json` gespeichert
- Das Pop-Up auf der Website wird automatisch aktiv (2 Tage vorher bis Ende des Tages)
- Im Dashboard kann man den Banner-Status per Toggle ein-/ausschalten (`bannerAktiv: true/false`)
- Das Icon 🏳️ (Flagge) neben dem Papierkorb-Icon im Dashboard → damit kann man gezielt den Banner für einzelne Einträge aktivieren/deaktivieren

---

## Design-Spezifikationen

### Pop-Up Aussehen:
- **Position:** Ganz oben, fixiert, über ALLEM (z-index: 9999)
- **Hintergrund:** Gradient Rot (from-red-700 via-red-600 to-red-700) — passt zur CI
- **Text:** Weiß, zentriert
- **Höhe:** Auto, ca. 50–70px je nach Inhalt
- **Animation:** Slide-in von oben (Framer Motion spring)
- **Schließen:** X-Button rechts, oder automatisch nach Ablauf
- **Responsive:** Auf Mobile etwas kompakter (kleinere Schrift)

### Pop-Up Inhalt (Beispiel):
```
🕐  [Heute]  Karfreitag
    Geänderte Öffnungszeiten: 10:00 – 14:00 Uhr           ✕
```

Bei mehreren aktiven Einträgen werden alle untereinander angezeigt.

---

## Wichtige Regeln:
- Das Pop-Up darf **NICHT** bei regulären Öffnungszeiten erscheinen — NUR bei Sonder-Einträgen
- Wenn der User das Pop-Up schließt (✕), bleibt es für die aktuelle Session geschlossen (kein localStorage, nur State)
- Bei Seiten-Reload erscheint es wieder (falls noch aktiv)
- `Cmd+0` / `Ctrl+0` überschreibt den Dismissed-State und zeigt das Demo-Pop-Up
- Das bestehende Design (Header, Navigation, alle anderen Komponenten) darf NICHT verändert werden
- `npm run build` muss fehlerfrei durchlaufen

---

## Verifikation:
```bash
npm run build
npm run dev
# 1. Cmd+0 drücken → Demo-Pop-Up erscheint mit "Karfreitag (Demo)"
# 2. Cmd+0 erneut drücken → Pop-Up schließt sich
# 3. Im Dashboard: Sonder-Öffnungszeit eintragen (z.B. heutiges Datum, "Test", 10:00-14:00)
# 4. Website reload → Pop-Up erscheint automatisch mit "Heute: Test — 10:00 – 14:00 Uhr"
# 5. ✕ klicken → Pop-Up verschwindet
# 6. Seite neu laden → Pop-Up erscheint wieder
# 7. Datum auf übermorgen setzen → Pop-Up erscheint mit "In 2 Tagen: ..."
# 8. Datum auf letzte Woche setzen → Pop-Up erscheint NICHT
# 9. Mobile testen: Pop-Up ist responsive und verdeckt nichts
# 10. Header scrollt korrekt unter dem Pop-Up
```
