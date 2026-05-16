# PROMPT 6.1 — „Kurse Buchen" Seite löschen + Design-Varianten per Tastenkürzel

## Kontext
Fitness Factory Hattingen Website — Vite + React 19 + TypeScript + Tailwind CSS 3.4 + Framer Motion 12 + React Router v7.

## Aufgabe 1: Seite „Kurse Buchen" vollständig entfernen

### Was zu tun ist:

1. **Route entfernen:**
   - Öffne `src/App.tsx` (oder wo die React-Router-Routen definiert sind)
   - Entferne die Route für die „Kurse Buchen"-Seite (vermutlich `/kurse-buchen` oder `/kurs-buchung`)
   - Entferne den zugehörigen `import` der Page-Komponente

2. **Page-Komponente löschen:**
   - Lösche die Datei der Kurse-Buchen-Seite (z. B. `src/pages/KurseBuchenPage.tsx` oder ähnlich)

3. **Navigation bereinigen:**
   - Öffne `src/data/content.ts` und entferne den Eintrag „Kurse Buchen" aus `NAV_ITEMS` (falls vorhanden)
   - Öffne `src/components/layout/Navigation.tsx` und stelle sicher, dass kein Link mehr auf die gelöschte Seite zeigt
   - Prüfe auch die Mobile-Navigation und den Footer auf Verweise

4. **Interne Verlinkungen prüfen:**
   - Suche im gesamten `src/`-Ordner nach dem Pfad der gelöschten Route (z. B. `kurse-buchen`)
   - Entferne oder ersetze alle verbleibenden Links auf diese Seite
   - `grep -r "kurse-buchen\|KurseBuchen\|kurs-buchung" src/`

5. **Keine Fehler hinterlassen:**
   - `npm run build` muss fehlerfrei durchlaufen
   - Es dürfen keine toten Links in der Navigation oder auf anderen Seiten übrig bleiben

---

## Aufgabe 2: Versteckte Design-Varianten per Tastenkürzel umschalten

### Beschreibung
Es sollen drei Design-Varianten existieren, die **nicht sichtbar** für den normalen Nutzer sind, aber per geheimem Tastenkürzel umgeschaltet werden können. Damit kann man dem Kunden verschiedene Looks live zeigen.

### Varianten:
| Shortcut | Variante | Beschreibung |
|---|---|---|
| `Cmd + 5` (Mac) / `Ctrl + 5` (Windows) | **Klassisch** | Aktuelles Design, keine Änderung |
| `Cmd + 6` / `Ctrl + 6` | **Energetisch** | Variante mit höherem Kontrast, kräftigerem Rot, dunkleren Hintergründen |
| `Cmd + 7` / `Ctrl + 7` | **Energetisch V2** | Variante mit Gradient-Akzenten, leichtem Glow-Effekt auf CTAs, subtiler Animation |

### Implementierung:

1. **Theme-Context erstellen** (`src/contexts/ThemeVariantContext.tsx`):
   ```tsx
   import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

   type DesignVariant = 'klassisch' | 'energetisch' | 'energetisch-v2';

   interface ThemeVariantContextType {
     variant: DesignVariant;
     setVariant: (v: DesignVariant) => void;
   }

   const ThemeVariantContext = createContext<ThemeVariantContextType>({
     variant: 'klassisch',
     setVariant: () => {},
   });

   export const useThemeVariant = () => useContext(ThemeVariantContext);

   export function ThemeVariantProvider({ children }: { children: ReactNode }) {
     const [variant, setVariant] = useState<DesignVariant>('klassisch');

     useEffect(() => {
       const handleKeyDown = (e: KeyboardEvent) => {
         const isMeta = e.metaKey || e.ctrlKey;
         if (isMeta && e.key === '5') { e.preventDefault(); setVariant('klassisch'); }
         if (isMeta && e.key === '6') { e.preventDefault(); setVariant('energetisch'); }
         if (isMeta && e.key === '7') { e.preventDefault(); setVariant('energetisch-v2'); }
       };
       window.addEventListener('keydown', handleKeyDown);
       return () => window.removeEventListener('keydown', handleKeyDown);
     }, []);

     // CSS-Klasse auf <html> setzen für globale Styles
     useEffect(() => {
       document.documentElement.setAttribute('data-variant', variant);
     }, [variant]);

     return (
       <ThemeVariantContext.Provider value={{ variant, setVariant }}>
         {children}
       </ThemeVariantContext.Provider>
     );
   }
   ```

2. **Provider in `App.tsx` einbinden:**
   ```tsx
   import { ThemeVariantProvider } from './contexts/ThemeVariantContext';
   // ... App wrappen:
   <ThemeVariantProvider>
     <RouterProvider ... />
   </ThemeVariantProvider>
   ```

3. **CSS-Variablen pro Variante** (in `src/index.css` oder `globals.css`):
   ```css
   /* Klassisch (Default) */
   :root,
   [data-variant="klassisch"] {
     --color-primary: #C8102E;
     --color-primary-hover: #A00D24;
     --color-bg-dark: #1A1A1A;
     --color-bg-section: #0A0A0A;
     --cta-glow: none;
     --cta-gradient: none;
   }

   /* Energetisch */
   [data-variant="energetisch"] {
     --color-primary: #E70711;
     --color-primary-hover: #C8102E;
     --color-bg-dark: #0D0D0D;
     --color-bg-section: #050505;
     --cta-glow: none;
     --cta-gradient: none;
   }

   /* Energetisch V2 */
   [data-variant="energetisch-v2"] {
     --color-primary: #E70711;
     --color-primary-hover: #FF1A1A;
     --color-bg-dark: #0D0D0D;
     --color-bg-section: #050505;
     --cta-glow: 0 0 20px rgba(231, 7, 17, 0.3);
     --cta-gradient: linear-gradient(135deg, #E70711, #FF4444);
   }
   ```

4. **Buttons/CTAs anpassen** — in allen CTA-Komponenten die CSS-Variablen nutzen:
   ```css
   .cta-button {
     background: var(--cta-gradient, var(--color-primary));
     box-shadow: var(--cta-glow);
     transition: all 0.3s ease;
   }
   ```

5. **Kurze Toast-Benachrichtigung** beim Umschalten (optional aber empfohlen):
   - Beim Variantenwechsel kurz unten rechts einblenden: „Design: Klassisch ✓" / „Design: Energetisch ✓" / „Design: Energetisch V2 ✓"
   - Nach 2 Sekunden automatisch ausblenden
   - Nur sichtbar wenn man den Shortcut nutzt, kein UI-Element dafür

### Wichtig:
- Die Varianten dürfen NICHT in der Navigation, im Footer oder sonst irgendwo sichtbar sein
- Kein Toggle-Button, kein Menüpunkt — nur per Tastenkürzel erreichbar
- Standardmäßig ist immer „Klassisch" aktiv
- Die Variante wird NICHT persistiert (kein localStorage) — beim Neuladen ist wieder Klassisch aktiv
- `npm run build` muss fehlerfrei durchlaufen

### Verifikation:
```bash
npm run build
npm run dev
# Im Browser: Cmd+5, Cmd+6, Cmd+7 testen
# Prüfen: Buttons, Hintergrundfarben, Hover-Effekte ändern sich
# Prüfen: "Kurse Buchen" Seite ist nicht mehr erreichbar (404)
```
