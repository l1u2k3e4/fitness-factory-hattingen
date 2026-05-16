# PROMPT 6.3 — FAQ Scroll-Fix bei Kategorie-Filter + Sektionen-Reihenfolge Startseite

## Kontext
Fitness Factory Hattingen Website — Vite + React 19 + TypeScript + Tailwind CSS 3.4 + Framer Motion 12.

---

## Aufgabe 1: FAQ Kategorie-Filter — Scroll-Position korrigieren

### Problem:
Wenn man auf der FAQ-Seite oben eine Kategorie anklickt (z. B. „Probetraining", „Training & Kurse"), scrollt die Seite zwar nach unten — aber man landet auf Höhe der ersten FRAGE statt auf Höhe des KATEGORIE-TITELS. Der Titel ist nicht sichtbar, man sieht nur die Fragen.

### Gewünschtes Verhalten:
Beim Klick auf einen Kategorie-Filter-Button soll die Seite so scrollen, dass der **Kategorie-Titel** (z. B. „Probetraining", „Mitgliedschaft & Preise") **oben im Viewport** sichtbar ist — mit dem üblichen 80px Offset für den Sticky-Header.

### Implementierung:

1. **Öffne die FAQ-Komponente** (vermutlich `src/components/sections/FaqSection.tsx` oder `src/pages/FaqPage.tsx`)

2. **Finde die Scroll-Logik** beim Klick auf einen Kategorie-Button. Vermutlich scrollt sie zu einem Element per `scrollIntoView()` oder per `ref`.

3. **Ändere das Scroll-Target:**
   - Statt zur ersten Frage der Kategorie zu scrollen, scrolle zum **Kategorie-Heading** (dem `<h2>` oder `<h3>` Element mit dem Kategorienamen)
   - Jede Kategorie-Überschrift braucht eine `id` oder ein `ref` als Anker:
     ```tsx
     <h2 id={`faq-kategorie-${kategorie.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'und')}`}>
       {kategorie}
     </h2>
     ```

4. **Scroll-Funktion mit Header-Offset:**
   ```typescript
   const scrollToCategory = (kategorie: string) => {
     const id = `faq-kategorie-${kategorie.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'und')}`;
     const element = document.getElementById(id);
     if (element) {
       const headerOffset = 80; // Sticky-Header-Höhe
       const elementPosition = element.getBoundingClientRect().top + window.scrollY;
       window.scrollTo({
         top: elementPosition - headerOffset,
         behavior: 'smooth',
       });
     }
   };
   ```

5. **Auf den Filter-Buttons** diese Funktion aufrufen:
   ```tsx
   <button onClick={() => scrollToCategory('Probetraining')}>
     Probetraining
   </button>
   ```

6. **Falls der aktuelle Filter die Fragen gleichzeitig filtert** (also nur die Fragen der gewählten Kategorie anzeigt):
   - Behalte das Filterverhalten bei
   - Aber scrolle IMMER so, dass der Kategorie-Titel sichtbar ist
   - Falls „Alle" ausgewählt ist und man dann eine Kategorie klickt: Filter anwenden UND zum Titel scrollen

---

## Aufgabe 2: Sektionen-Reihenfolge auf der Startseite ändern

### Problem:
Aktuell kommt auf der Startseite der Bereich „MITGLIEDSCHAFT — Dein Preis. Deine Laufzeit." VOR dem Bereich „KURSE — 10+ Live-Kurse. Jede Woche."

### Gewünschtes Verhalten:
Die Sektion **„KURSE"** soll **über** der Sektion **„MITGLIEDSCHAFT"** stehen.

### Implementierung:

1. **Öffne `src/pages/HomePage.tsx`** (oder wo die Startseite ihre Sektionen definiert)

2. **Finde die beiden Sektionen:**
   - Die Kurs-Sektion (Komponente wie `<KursplanSection />` oder `<KurseSection />`)
   - Die Mitgliedschaft-Sektion (Komponente wie `<MitgliedschaftSection />` oder `<PreiseSection />`)

3. **Tausche die Reihenfolge:**
   - Verschiebe die Kurs-Sektion NACH OBEN (vor die Mitgliedschaft-Sektion)
   - Beispiel vorher:
     ```tsx
     <MitgliedschaftSection />
     <KurseSection />
     ```
   - Beispiel nachher:
     ```tsx
     <KurseSection />
     <MitgliedschaftSection />
     ```

4. **Scroll-Anker prüfen:**
   - Falls `id="kurse"` und `id="mitgliedschaft"` (oder `id="preise"`) als Anker existieren, müssen diese NICHT geändert werden — sie bleiben an der Komponente und wandern automatisch mit

5. **Keine anderen Sektionen verschieben** — alle anderen bleiben in der bisherigen Reihenfolge

---

## Verifikation:
```bash
npm run build
npm run dev
# Prüfen: FAQ-Seite → Kategorie klicken → Titel UND Fragen sichtbar (nicht nur Fragen)
# Prüfen: Startseite → Kurse-Sektion ist ÜBER Mitgliedschaft-Sektion
# Prüfen: Navigation-Links zu #kurse und #mitgliedschaft/preise funktionieren noch
# Prüfen: Mobile und Desktop testen
```
