# PROMPT 4.4 — WhatsApp Button Pulse-Animation verlangsamen

## Ziel
Der aktuelle `animate-ping` Effekt auf dem WhatsApp-Button ist zu aggressiv und stresst den Nutzer. Ersetze ihn durch eine deutlich langsamere, subtilere Puls-Animation.

## Datei: `src/components/layout/WhatsAppButton.tsx`

### Aktuelle Animation (zu entfernen)
```tsx
<span
  className="absolute inset-0 rounded-full bg-brand-whatsapp animate-ping opacity-60"
  aria-hidden="true"
/>
```

`animate-ping` ist die Standard-Tailwind-Animation: 1s Dauer, aggressiver Scale + Opacity-Wechsel.

### Neue Animation — langsamer, subtiler Puls

Ersetze den `<span>` mit einer custom Framer Motion Animation:

```tsx
<motion.span
  className="absolute inset-0 rounded-full bg-brand-whatsapp"
  aria-hidden="true"
  animate={{
    scale: [1, 1.4, 1],
    opacity: [0.4, 0, 0.4],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
/>
```

**Alternativ** per custom Tailwind-Klasse (falls Framer Motion hier nicht gewünscht):

Füge in `tailwind.config.ts` unter `extend.animation` hinzu:

```typescript
animation: {
  // ... bestehende Animationen ...
  'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
},
keyframes: {
  // ... bestehende Keyframes ...
  'pulse-slow': {
    '0%, 100%': { transform: 'scale(1)', opacity: '0.35' },
    '50%': { transform: 'scale(1.35)', opacity: '0' },
  },
},
```

Dann in `WhatsAppButton.tsx`:
```tsx
<span
  className="absolute inset-0 rounded-full bg-brand-whatsapp animate-pulse-slow"
  aria-hidden="true"
/>
```

### Zusammenfassung der Änderungen
| Eigenschaft | Vorher (`animate-ping`) | Nachher (`pulse-slow`) |
|-------------|------------------------|----------------------|
| Dauer | 1s | 3s |
| Scale | 1 → 2 | 1 → 1.35 |
| Opacity | 1 → 0 | 0.35 → 0 |
| Effekt | Aggressiv, hektisch | Sanft, ruhig atmend |
| Easing | cubic-bezier(0,0,0.2,1) | ease-in-out |

## Verifikation
1. `npm run build` fehlerfrei
2. WhatsApp-Button pulsiert deutlich langsamer (ca. 3 Sekunden pro Zyklus)
3. Der Puls ist subtiler — weniger Scale, weniger Opacity-Kontrast
4. Der Puls wirkt "atmend" statt "blinkend"
5. Button bleibt klickbar und der Hover-Effekt funktioniert weiterhin
