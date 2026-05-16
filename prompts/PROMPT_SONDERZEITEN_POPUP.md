# BUILD-PROMPT — Sonder-Öffnungszeiten Popup (Feiertags-Hinweis)

> **Ziel:** Auf der Fitness-Factory-Website soll automatisch ein Popup erscheinen, sobald in den nächsten 2 Tagen eine im Dashboard gepflegte **Sonder-Öffnungszeit** (z. B. Ostern, Weihnachten) ansteht — und zwar **2 Kalendertage vor dem Eintrag bis zum Ende des eingetragenen Tages (23:59 lokale Zeit)**. Zusätzlich soll der Inhaber das Popup mit `⌘ + 0` (macOS) / `Ctrl + 0` (Windows/Linux) jederzeit **manuell triggern** können — für Live-Demos vor Kunden.

---

## Kontext (so ist das Projekt aufgebaut — NICHT umbauen, nur erweitern)

- **Stack:** Vite + React 18 + TypeScript + Tailwind CSS + Framer Motion + React Router 6
- **Working Directory:** `/Users/lukekozik/Documents/Jobs/FitnessFactory/Website_Factory`
- **Content-Quelle:** Dashboard schreibt `public/data/content-overrides.json`. Das wird in `src/lib/contentLoader.ts` per `loadOverrides()` gefetcht und in `src/contexts/ContentContext.tsx` über `useContent()` bereitgestellt.
- **Sonder-Öffnungszeiten liegen unter:**
  ```ts
  overrides.oeffnungszeiten.sonder: Array<{
    datum: string           // ISO-Format "YYYY-MM-DD" aus dem <input type="date">
    anlass: string          // z. B. "Karfreitag", "Heiligabend"
    geschlossen: boolean    // true => "Geschlossen" anzeigen, ohne von/bis
    von?: string            // "HH:MM" 24h
    bis?: string            // "HH:MM" 24h
  }>
  ```
- **Layout-Mount-Point:** `src/components/layout/Layout.tsx` (Outlet-Wrapper für ALLE Routen außer `/trainer/*`).
- **Bestehendes Modal-Pattern** (Vorlage übernehmen, aber NICHT importieren): siehe `src/components/booking/BookingModal.tsx` — Overlay `fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50`, Card `bg-brand-bg border border-brand-border rounded-card-lg shadow-xl`.
- **Bestehendes Banner-Pattern** (Farben übernehmen): siehe `src/components/layout/AnnouncementBanner.tsx`.
- **Brand-Tokens** (in `tailwind.config.js`): `brand-primary`, `brand-bg`, `brand-text`, `brand-border`, `brand-muted`. Fonts: `font-display` (Headlines), `font-body` (Body).

---

## Aufgabe (Schritt für Schritt)

### Schritt 1 — Hook anlegen: `useSonderzeitPopup`

Datei: `src/hooks/useSonderzeitPopup.ts`

Funktion: Liest `oeffnungszeiten.sonder[]` aus `useContent()`, ermittelt den **nächsten relevanten Eintrag** (= der Eintrag, dessen `datum` heute oder maximal 2 Tage in der Zukunft liegt, und dessen Tag noch nicht abgelaufen ist), und gibt zurück:

```ts
type SonderzeitEntry = {
  datum: string
  anlass: string
  geschlossen: boolean
  von?: string
  bis?: string
}

export function useSonderzeitPopup(): {
  activeEntry: SonderzeitEntry | null      // null wenn kein Eintrag im Fenster
  allUpcoming: SonderzeitEntry[]           // sortiert nach Datum aufsteigend, NUR Einträge im Fenster (für Demo/manuellen Trigger)
}
```

**Zeitfenster-Logik (genau so implementieren):**
- `now = new Date()` — aktuelle Uhrzeit lokal
- Für jeden Eintrag:
  - `eventStart = new Date(eintrag.datum + 'T00:00:00')` minus 2 Tage (also Datum 00:00 Uhr 2 Tage vorher)
  - `eventEnd = new Date(eintrag.datum + 'T23:59:59')` (Ende des Eintragstages)
  - Eintrag ist „aktiv" wenn `now >= eventStart && now <= eventEnd`
- `activeEntry` = der **früheste** aktive Eintrag (sortiert nach `datum` aufsteigend)
- Defensiv: ungültige Datums (`Number.isNaN(eventStart.getTime())`) ignorieren — niemals crashen.

---

### Schritt 2 — Komponente bauen: `SonderzeitPopup`

Datei: `src/components/layout/SonderzeitPopup.tsx`

**Props:** keine. Self-contained. Default-Export.

**Verhalten:**
1. Zieht `activeEntry` und `allUpcoming` aus `useSonderzeitPopup()`.
2. Hat einen internen State `forceOpen: boolean` (manueller Trigger via Tastenkürzel).
3. Hat einen internen State `dismissed: boolean` (per `useState`, **kein localStorage** — Popup soll bei nächstem Reload wieder sichtbar sein, damit es seinen Hinweis-Charakter behält; nur Session-basiert).
4. **Sichtbarkeit:** Popup ist sichtbar wenn `(activeEntry !== null && !dismissed) || forceOpen`. Bei `forceOpen` wird `dismissed` ignoriert.
5. **Manueller Trigger:** Globaler Keydown-Listener auf `window`:
   - `(e.metaKey || e.ctrlKey) && e.key === '0'` → `e.preventDefault()` → `forceOpen = true`, `dismissed = false`. Falls `activeEntry` `null` ist, soll trotzdem ein Popup erscheinen — mit Inhalt aus `allUpcoming[0]`; falls auch das leer ist, **Fallback-Demo-Eintrag** anzeigen (Anlass "Ostermontag", Datum heute + 2 Tage, von "10:00", bis "14:00", `geschlossen: false`) damit Luke vor Kunden immer was zeigen kann.
   - Listener nur einmal registrieren (`useEffect` mit leerem Deps + Cleanup).
6. **Schließen:**
   - Klick auf X-Button → `dismissed = true`, `forceOpen = false`.
   - Klick auf Overlay (außerhalb der Card) → dito.
   - `Escape`-Taste → dito.
   - Bei `forceOpen` wird beim Schließen `forceOpen = false` gesetzt (damit bei nächstem Cmd+0 wieder geöffnet werden kann).
7. **Body-Scroll-Lock:** Solange Popup offen ist, `document.body.style.overflow = 'hidden'` setzen, im Cleanup wiederherstellen.

**Design (Tailwind-Klassen — exakt so):**

```
Overlay:    fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm
            (z-60 damit über StickyCtaBar/WhatsAppButton; mit Framer-Motion fade-in 200ms)

Card:       bg-brand-bg border border-brand-border rounded-card-lg shadow-2xl
            w-full max-w-md p-6 sm:p-8 relative
            (mit Framer-Motion scale 0.95 → 1, fade-in 250ms)

Icon:       Oben-mittig, kreisförmig 64x64, bg-brand-primary/10, text-brand-primary,
            <CalendarHeart> (Lucide), 32x32

Anlass:     font-display font-bold text-h3 text-brand-text text-center mt-4
            (z. B. "Karfreitag")

Datum:      font-body text-body-sm text-brand-muted text-center mt-1
            Format: "Freitag, 18. April 2026" (de-DE, lange Wochentage)

Divider:    border-t border-brand-border my-6

Zeiten:     Wenn geschlossen === true:
              Großer Badge "Geschlossen" mit roter Akzentfarbe (bg-red-50 text-red-700 border border-red-200, rounded-full, px-4 py-2, font-semibold)
              + Text "An diesem Tag bleibt das Studio geschlossen."
            Sonst:
              Großes Zeit-Display "10:00 – 14:00 Uhr" (font-display font-bold text-h2 text-brand-primary text-center)
              + Subline "Sonder-Öffnungszeiten" (font-body text-body-sm text-brand-muted text-center)

CTA:        Ein Button "Verstanden" (Variante "primary" — Button-Komponente aus @/components/ui/Button verwenden), full-width, mt-6

X-Button:   absolute top-4 right-4, p-2 hover:bg-brand-border/30 rounded-full, <X> 20x20 von Lucide

Hinweis-    Falls allUpcoming.length > 1: kleiner Hinweis unten
Multi:      "+1 weiterer Sondertag in den nächsten Tagen" — font-body text-body-xs text-brand-muted text-center mt-4
```

**Datums-Formatierung (Helper im selben File):**
```ts
function formatLongDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('de-DE', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })
}
```

**Accessibility:**
- Root-Overlay: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="sonderzeit-titel"`
- Anlass-`<h2>` bekommt `id="sonderzeit-titel"`
- X-Button: `aria-label="Hinweis schließen"`
- Bei Open: Focus-Trap nicht zwingend, aber `autoFocus` auf den primären Button setzen.

---

### Schritt 3 — In Layout einbinden

Datei: `src/components/layout/Layout.tsx`

Import hinzufügen:
```tsx
import SonderzeitPopup from './SonderzeitPopup'
```

Direkt **vor** `<CookieConsent ... />` einfügen (Cookie-Consent bleibt zuoberst — das Popup soll bei Kunden ohne Cookie-Entscheidung warten, aber das ist Standard-Verhalten weil das Popup eh nur visuell drüber liegt, nicht blockierend). Beispiel:

```tsx
<SonderzeitPopup />
<CookieConsent onVisibilityChange={setCookieBannerVisible} />
```

Das Popup soll auch im Trainer-Bereich nicht erscheinen — das ist automatisch erfüllt, da `Layout` nur für Public-Routes verwendet wird.

---

### Schritt 4 — Framer-Motion Animation

`SonderzeitPopup` nutzt `AnimatePresence` und `motion.div`:

```tsx
import { AnimatePresence, motion } from 'framer-motion'

<AnimatePresence>
  {isOpen && (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] ..."
    >
      <motion.div
        key="card"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-brand-bg ..."
      >
        ...
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

---

### Schritt 5 — Testdaten zum Verifizieren

Nach dem Build folgenden Eintrag temporär in `public/data/content-overrides.json` unter `oeffnungszeiten.sonder` einfügen (falls noch nicht vorhanden), um das Auto-Trigger-Fenster zu prüfen:

```json
{
  "datum": "<HEUTE + 1 Tag im Format YYYY-MM-DD>",
  "anlass": "Karfreitag",
  "geschlossen": false,
  "von": "10:00",
  "bis": "14:00"
}
```

Erwartung:
1. `npm run dev` → Popup erscheint automatisch (heute liegt im 2-Tage-Fenster vor dem Eintrag).
2. X klicken → Popup schließt, kommt nicht wieder (Session-State).
3. Reload → Popup erscheint wieder (kein localStorage-Persist gewollt).
4. `⌘ + 0` drücken → Popup öffnet sich, auch wenn vorher dismissed.
5. JSON-Eintrag entfernen, `⌘ + 0` drücken → Popup öffnet sich mit Fallback-Demo-Eintrag.
6. Eintrag mit `"geschlossen": true` testen → Popup zeigt "Geschlossen"-Badge statt Zeit-Range.

---

### Schritt 6 — Build-Verifizierung

Am Ende **zwingend** ausführen:

```bash
cd /Users/lukekozik/Documents/Jobs/FitnessFactory/Website_Factory
npm run build
```

Build muss ohne TypeScript-Fehler durchlaufen. Falls Fehler: fixen, nicht ignorieren.

---

## Akzeptanzkriterien (Checkliste)

- [ ] Neue Datei: `src/hooks/useSonderzeitPopup.ts` mit korrekter Fenster-Logik (2 Tage vor → 23:59 am Eintragstag, lokal).
- [ ] Neue Datei: `src/components/layout/SonderzeitPopup.tsx` als Default-Export, self-contained.
- [ ] `Layout.tsx` rendert `<SonderzeitPopup />` vor `<CookieConsent />`.
- [ ] Auto-Open: Popup erscheint nur im Zeitfenster, max. 1× pro Session (per `useState`-Dismiss).
- [ ] Manueller Trigger: `⌘ + 0` / `Ctrl + 0` öffnet das Popup jederzeit, auch nach Dismiss; mit Fallback-Demo-Eintrag wenn keine Daten.
- [ ] Schließen funktioniert via X-Button, Overlay-Klick, Escape-Taste.
- [ ] `geschlossen: true`-Eintrag zeigt roten "Geschlossen"-Badge statt Zeit-Range.
- [ ] Datumsformat: Deutsche Lokalisierung, lange Form (`Freitag, 18. April 2026`).
- [ ] Body-Scroll wird gelockt während Popup offen ist.
- [ ] Framer-Motion fade/scale-Animation greift.
- [ ] `npm run build` läuft fehlerfrei durch.
- [ ] Keine Änderungen an Dashboard, contentLoader oder content-overrides.json-Struktur — nur Lese-Zugriff auf bestehende Daten.

---

## NICHT machen (wichtig)

- ❌ Kein localStorage / sessionStorage für Dismiss-State (Inhaber will dass Popup bei Reload wiederkommt — wirkt sonst „weg" beim Kundengespräch).
- ❌ Keine Anpassung am Dashboard (`Dashboard/index.html`) — die Datenpflege ist dort schon fertig.
- ❌ Kein neues Modal-System / keine Library wie `react-modal` — handgebauter `<div>`-Overlay reicht und matcht den BookingModal-Stil.
- ❌ Kein Auto-Reopen nach Dismiss innerhalb derselben Session — nur Cmd+0 darf reopen.
- ❌ Den AnnouncementBanner NICHT anfassen — der bleibt parallel bestehen.
