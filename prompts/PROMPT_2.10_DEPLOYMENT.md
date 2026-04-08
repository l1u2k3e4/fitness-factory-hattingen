# PROMPT 2.10 — Deployment (Build, finale Checks, Übergabe)

> **Phase:** 2 (Build — Abschluss)
> **Sub-Agent:** `.claude/agents/frontend-builder.md`
> **Input:** Gesamtes Projekt, `docs/qa-report.md` (PROMPT 2.9)
> **Output:** `dist/` (Production Build), `docs/deployment-guide.md`, `docs/uebergabe-protokoll.md`
> **Geschätzte Dauer:** 15–20 Minuten

---

## WICHTIG: Vor dem Start

1. **Lies `CLAUDE.md`** — Hosting-Info (aktuell ALL-INKL.COM), Domain
2. **Lies `docs/qa-report.md`** (PROMPT 2.9) — Alle QA-Checks müssen bestanden sein
3. **Lies diese Pflicht-Skills (VERBINDLICH):**
   - `output-skill` → Vollständige Dokumentation
   - `website-seo` → Finale SEO-Checks vor Go-Live
4. **KEINE offenen kritischen Issues** aus QA-Report → Falls doch: ZUERST fixen, DANN deployen

---

## Auftrag

Du bist ein DevOps Engineer und Projektmanager. Du erstellst den finalen Production Build, führst letzte Checks durch und dokumentierst alles für die Übergabe an den Kunden.

---

### Task 1: Production Build

```bash
npm run build
```

**Prüfe das Build-Ergebnis:**
- [ ] Build erfolgreich (Exit Code 0)
- [ ] Keine Errors, keine Warnings
- [ ] `dist/` Ordner erstellt
- [ ] Bundle-Größen dokumentieren:
  - index.html: < 10KB
  - main.js (oder app-[hash].js): Chunk-Sizes
  - vendor-[hash].js: React + Router
  - style-[hash].css: Tailwind CSS
  - Gesamtgröße aller Assets

### Task 2: Build-Artefakte validieren

```bash
# Lokaler Preview-Server
npx serve dist
```

Prüfe im Browser:
- [ ] Homepage lädt korrekt
- [ ] ALLE Routen funktionieren (SPA-Routing)
- [ ] Bilder laden (WebP + Fallback)
- [ ] Fonts laden (lokal, kein CDN-Request)
- [ ] Keine Console-Errors
- [ ] Keine 404s auf Assets

### Task 3: SPA-Routing Konfiguration

Da es eine Single-Page-App mit React Router ist, muss der Server ALLE Routen auf `index.html` umleiten. Erstelle Konfiguration für verschiedene Hosting-Optionen:

#### Option A: Netlify (empfohlen)
```toml
# public/_redirects
/*    /index.html   200
```

ODER:

```toml
# netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Option B: Vercel
```json
// vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

#### Option C: Cloudflare Pages
Automatisch — Cloudflare Pages unterstützt SPA-Routing nativ.

#### Option D: ALL-INKL.COM (aktueller Hoster)
```apache
# public/.htaccess
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# HTTPS Redirect
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>

# Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>
```

### Task 4: Domain-Migration Checkliste

```markdown
## DNS-Umstellung: fitness-factory-hattingen.de

### Vor der Umstellung
- [ ] Backup der aktuellen WordPress-Seite
- [ ] Alle Redirects von alten URLs zu neuen URLs definieren
- [ ] 301-Redirects für alte WordPress-URLs:
      /category/lifestyle/ → /blog/ (oder 410 Gone)
      /class-timetable/ → /kursplan/
      /home/ → /
      /?page_id=* → entsprechende neue Route
- [ ] SSL-Zertifikat auf neuem Hosting konfiguriert
- [ ] Google Search Console: neue Property oder Ownership verifizieren
- [ ] Google Analytics: prüfen ob GA4-Property korrekt trackt

### Während der Umstellung
- [ ] DNS-Records aktualisieren (A-Record oder CNAME)
- [ ] dist/ Ordner auf Server hochladen
- [ ] .htaccess (oder Hosting-Config) korrekt
- [ ] HTTPS-Redirect funktioniert
- [ ] www → non-www Redirect (oder umgekehrt)

### Nach der Umstellung
- [ ] Alle Seiten manuell durchklicken
- [ ] Google Search Console: URL-Prüfung für Hauptseiten
- [ ] Google Search Console: Sitemap einreichen
- [ ] Rich Results Test: HealthClub + FAQPage Schema prüfen
- [ ] PageSpeed Insights: Core Web Vitals prüfen
- [ ] Mobile-Friendly Test
- [ ] Tracking verifizieren: GA4, GTM, FB Pixel (nach Consent)
- [ ] Kontaktformular testen (E-Mail kommt an?)
- [ ] Click-to-Call testen (Telefon klingelt?)
- [ ] WhatsApp-Button testen (Chat öffnet sich?)
```

### Task 5: Redirect-Map (WordPress → React)

Erstelle vollständige Redirect-Map für alle alten URLs:

| Alte URL (WordPress) | Neue URL (React) | Redirect-Type |
|---|---|---|
| `/home/` | `/` | 301 |
| `/class-timetable/` | `/kursplan/` | 301 |
| `/category/lifestyle/` | `/blog/` oder 410 | 301/410 |
| `/category/lifestyle/[slug]/` | 410 Gone | 410 |
| `/?page_id=*` | Entsprechende Route | 301 |
| `/wp-admin/` | 410 Gone | 410 |
| `/wp-login.php` | 410 Gone | 410 |
| `/feed/` | 410 Gone | 410 |
| `/xmlrpc.php` | 410 Gone | 410 |

### Task 6: Übergabe-Dokumentation

Erstelle `docs/uebergabe-protokoll.md`:

```markdown
# Übergabe-Protokoll — Fitness Factory Website-Relaunch

## Projekt-Zusammenfassung
- Technologie: Vite + React 19 + TypeScript + Tailwind CSS
- Seiten: [Anzahl] Seiten implementiert
- Performance: [LCP, INP, CLS Werte]
- SEO-Score: [geschätzt]

## Was wurde geliefert
- [ ] Vollständiger Quellcode in src/
- [ ] Production Build in dist/
- [ ] Design-System Dokumentation
- [ ] SEO-Setup (Meta-Tags, JSON-LD, Sitemap)
- [ ] Performance-optimierte Bilder
- [ ] Deployment-Guide

## Was der Kunde noch liefern muss
- [ ] Professionelle Studio-Fotos (ersetzen Platzhalter-Bilder)
- [ ] Professionelles Video für Hero-Section
- [ ] Trainer-Fotos, Namen, Biografien (für Team-Section)
- [ ] Genaue Mitgliederzahl (für Trust-Bar)
- [ ] Gründungsjahr (für Trust-Bar "Seit 20XX")
- [ ] Google Maps GeoCoordinates (Latitude/Longitude)
- [ ] Professionelle E-Mail-Adresse (statt GMX)
- [ ] Logo als SVG (für scharfe Darstellung)
- [ ] Impressum-Text (anwaltlich geprüft)
- [ ] Datenschutz-Text (anwaltlich geprüft)
- [ ] AGB-Text

## Nächste Schritte (Empfehlung)
1. Fotos + Videos erstellen lassen
2. Bilder in public/images/ ersetzen
3. content.ts Platzhalter [TBD] mit echten Daten füllen
4. Impressum/Datenschutz von Anwalt prüfen lassen
5. Hosting wählen und deployen (siehe Deployment-Guide)
6. Google Search Console einrichten
7. Google My Business aktualisieren (Website-URL)
8. Gelbe Seiten + 11880 Eintrag erstellen
9. Phase 3: Blog starten, KI-Chatbot integrieren
```

### Task 7: Hosting-Empfehlung

Bewerte die Hosting-Optionen für eine statische Vite-React-App:

| Hoster | Preis | Vorteile | Nachteile |
|---|---|---|---|
| **Cloudflare Pages** (empfohlen) | Kostenlos | Global CDN, schnellstes Edge-Network, Auto-HTTPS, einfaches Deployment | Kein Server-Side-Rendering |
| **Netlify** | Kostenlos (100GB) | Einfach, Forms-Backend, Auto-Redirects | Weniger Edge-Locations als CF |
| **Vercel** | Kostenlos (Hobby) | React-optimiert, Analytics | Hobby-Plan limitiert |
| **ALL-INKL.COM** (aktuell) | ~5€/Monat | Bereits bezahlt, .de Domain dort | Kein CDN, langsamer als Alternativen, .htaccess nötig |

**Empfehlung:** Cloudflare Pages (kostenlos, schnellstes CDN, perfekt für statische React-Apps) + Domain bei ALL-INKL.COM belassen (nur DNS-Records auf Cloudflare zeigen).

---

## Output-Dateien

1. **`dist/`** — Production Build (ready to deploy)
2. **`public/_redirects`** oder **`public/.htaccess`** — Hosting-spezifische Konfiguration
3. **`docs/deployment-guide.md`** — Schritt-für-Schritt Deployment-Anleitung
4. **`docs/uebergabe-protokoll.md`** — Übergabe an Kunden
5. **`docs/redirect-map.md`** — Alte → Neue URL Redirects

---

## Verifikation (vor Abschluss)

- [ ] `npm run build` → erfolgreich, 0 Errors
- [ ] `dist/` Ordner vollständig mit allen Assets
- [ ] Lokaler Preview: alle Seiten + Routing funktionieren
- [ ] .htaccess ODER _redirects korrekt für gewähltes Hosting
- [ ] Redirect-Map für WordPress-URLs vollständig
- [ ] Deployment-Guide klar und nachvollziehbar
- [ ] Übergabe-Protokoll: TBD-Liste für Kunden vollständig
- [ ] Alle Dokumente in docs/ abgelegt
- [ ] PROJEKT ABGESCHLOSSEN — bereit für Go-Live nach Kundenzulieferung
