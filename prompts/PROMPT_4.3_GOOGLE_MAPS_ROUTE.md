# PROMPT 4.3 — Google Maps Embed Fix + Universelle Route-Navigation

## Ziel
1. Die Google Maps Karte in der "Komm Vorbei"-Sektion soll den echten Standort laden
2. "Route planen" soll universell funktionieren (Google Maps / Apple Maps / Geräte-Navigation)

## Datei 1: `src/data/content.ts` — SITE-Objekt

### Google Maps Embed URL korrigieren
Die aktuelle `googleMapsEmbedUrl` ist ein Platzhalter mit falschen Koordinaten. Ersetze sie mit der echten Embed-URL:

Vorher:
```typescript
googleMapsEmbedUrl:
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2480!2d7.2050!3d51.3960!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sFitness+Factory+Hattingen!5e0!3m2!1sde!2sde!4v1000000000000',
```

Nachher:
```typescript
googleMapsEmbedUrl:
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2488.5!2d7.1834!3d51.3837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b919a3a2d7e5f3%3A0x4c3e65e9cfb08f47!2sFitness%20Factory%20Hattingen!5e0!3m2!1sde!2sde!4v1712345678901!5m2!1sde!2sde',
```

**WICHTIG:** Falls die Embed-URL oben nicht exakt stimmt, generiere die korrekte URL wie folgt:
1. Gehe zu https://www.google.com/maps und suche "Fitness Factory Hattingen, Im Vogelsang 95, 45527 Hattingen"
2. Alternativ verwende diese funktionierende Fallback-URL die auf die Adresse zeigt:
```
https://www.google.com/maps/embed/v1/place?key=&q=Im+Vogelsang+95,+45527+Hattingen,+Germany
```
3. Oder verwende die OpenStreetMap-Alternative als Fallback (kein API-Key nötig):
```
https://www.openstreetmap.org/export/embed.html?bbox=7.178,51.380,7.190,51.387&layer=mapnik&marker=51.3837,7.1834
```

### Google Maps URL für Route aktualisieren
Ersetze die `googleMapsUrl` mit einer Directions-URL:

Vorher:
```typescript
googleMapsUrl: 'https://maps.google.com/?q=Im+Vogelsang+95,+45527+Hattingen',
```

Nachher — füge eine NEUE Property hinzu und behalte die alte:
```typescript
googleMapsUrl: 'https://maps.google.com/?q=Im+Vogelsang+95,+45527+Hattingen',
googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Im+Vogelsang+95,+45527+Hattingen',
```

## Datei 2: `src/components/sections/KontaktSection.tsx`

### "Route planen" Button universell machen
Der "Route planen" Button soll eine Funktion nutzen die automatisch das passende Navigationssystem erkennt:

Füge diese Hilfsfunktion VOR der Komponente ein:

```typescript
/**
 * Öffnet die beste verfügbare Navigations-App für die Route zum Studio.
 * iOS → Apple Maps, Android → Google Maps App, Desktop → Google Maps Web
 */
function openRouteNavigation() {
  const destination = encodeURIComponent('Im Vogelsang 95, 45527 Hattingen, Germany')
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isAndroid = /Android/.test(navigator.userAgent)

  if (isIOS) {
    // Apple Maps mit Routenplanung
    window.open(`maps://maps.apple.com/?daddr=${destination}&dirflg=d`, '_blank')
  } else if (isAndroid) {
    // Google Maps App (Intent) mit Fallback auf Web
    window.open(`google.navigation:q=${destination}`, '_blank')
    // Fallback nach kurzer Verzögerung falls Intent nicht funktioniert
    setTimeout(() => {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank')
    }, 500)
  } else {
    // Desktop: Google Maps im neuen Tab
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank')
  }
}
```

Dann ersetze den "Route planen" Button:

Vorher:
```tsx
<Button
  href={SITE.adresse.googleMapsUrl}
  variant="secondary"
  icon={Navigation}
  aria-label="Route in Google Maps planen"
>
  Route planen
</Button>
```

Nachher:
```tsx
<Button
  onClick={openRouteNavigation}
  variant="secondary"
  icon={Navigation}
  aria-label="Route zum Studio planen"
>
  Route planen
</Button>
```

**Hinweis:** Falls die `Button`-Komponente kein `onClick` ohne `href` unterstützt, passe den Button so an:

```tsx
<button
  onClick={openRouteNavigation}
  className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-brand-border text-brand-text rounded-[4px] font-display font-bold text-body-sm hover:border-brand-primary hover:text-brand-primary transition-colors duration-200"
  aria-label="Route zum Studio planen"
>
  <Navigation className="w-4 h-4" />
  Route planen
</button>
```

## Datei 3: `src/components/layout/CookieConsent.tsx` (falls nötig)

Stelle sicher, dass nach Cookie-Zustimmung der `mapsConsented`-State korrekt gesetzt wird, damit die Karte sofort lädt. Falls die Karte nach Zustimmung nicht automatisch erscheint, füge in `KontaktSection.tsx` einen Event-Listener hinzu:

```typescript
useEffect(() => {
  const handleConsentChange = () => {
    const consent = getConsent()
    if (consent && (consent.statistics || consent.marketing)) {
      setMapsConsented(true)
    }
  }
  window.addEventListener('cookie-consent-update', handleConsentChange)
  return () => window.removeEventListener('cookie-consent-update', handleConsentChange)
}, [])
```

## Verifikation
1. `npm run build` fehlerfrei
2. Nach Cookie-Zustimmung: Google Maps Karte zeigt den echten Standort "Im Vogelsang 95, 45527 Hattingen"
3. Ohne Cookie-Zustimmung: Fallback-Anzeige mit "In Google Maps öffnen" Link funktioniert
4. "Route planen" Button:
   - Desktop: Öffnet Google Maps Directions im neuen Tab
   - Mobile iOS: Öffnet Apple Maps mit Route
   - Mobile Android: Öffnet Google Maps App mit Navigation
5. Karte ist visuell korrekt eingebettet (kein leeres Iframe, kein Fehler)
