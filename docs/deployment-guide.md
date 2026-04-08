# Deployment-Guide — Fitness Factory Hattingen

> **Projekt:** Website-Relaunch — Vite + React + TypeScript  
> **Erstellt:** 2026-04-02 | Prompt 2.10  
> **Status:** Production-Ready — bereit für Go-Live nach Kunden-Zulieferungen

---

## Übersicht: 3 Deployment-Optionen

| Option | Empfehlung | Aufwand | Kosten |
|---|---|---|---|
| **A: Cloudflare Pages** | ⭐ EMPFOHLEN | Gering | Kostenlos |
| **B: ALL-INKL.COM** | Aktueller Hoster | Mittel | ~5€/Monat (bereits bezahlt) |
| **C: Netlify** | Alternative | Gering | Kostenlos |

---

## Option A: Cloudflare Pages (EMPFOHLEN)

**Warum Cloudflare Pages?**
- Kostenloses globales CDN (200+ Edge-Standorte weltweit)
- Automatisches HTTPS-Zertifikat
- Automatisches SPA-Routing (kein .htaccess nötig)
- Deployment per Git-Push (CI/CD automatisch)
- Schnellste Ladezeiten für deutsche Nutzer (Frankfurt-Edge)

### Schritt 1: Cloudflare-Konto erstellen

1. Gehe zu [dash.cloudflare.com](https://dash.cloudflare.com) → Konto erstellen (kostenlos)
2. Keine Kreditkarte nötig für Cloudflare Pages Free Plan

### Schritt 2: Repository auf GitHub/GitLab hochladen

```bash
# Im Projektordner Website.factory/
git init
git add .
git commit -m "Initial commit: Fitness Factory Website"
git remote add origin https://github.com/[username]/fitness-factory-hattingen.git
git push -u origin main
```

### Schritt 3: Cloudflare Pages verbinden

1. Cloudflare Dashboard → **Workers & Pages** → **Create Application** → **Pages**
2. **Connect to Git** → GitHub/GitLab-Repository auswählen
3. Build-Einstellungen:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. **Save and Deploy** → Erstes Deployment startet automatisch

### Schritt 4: Domain verbinden (fitness-factory-hattingen.de)

1. Cloudflare Dashboard → Pages-Projekt → **Custom domains**
2. **Set up a custom domain** → `fitness-factory-hattingen.de` eingeben
3. Cloudflare zeigt DNS-Records → Diese bei ALL-INKL.COM eintragen:
   - **A-Record:** `@` → Cloudflare IP-Adresse
   - **CNAME:** `www` → `[projektname].pages.dev`
4. SSL wird automatisch von Cloudflare ausgestellt (~5 Minuten)

### Schritt 5: Verify

```
https://fitness-factory-hattingen.de → Homepage ✓
https://fitness-factory-hattingen.de/kursplan → Kursplan ✓
https://fitness-factory-hattingen.de/probetraining → Probetraining ✓
```

---

## Option B: ALL-INKL.COM (FTP-Upload)

**Für wen:** Wenn Domain + Hosting bei ALL-INKL.COM bleiben sollen.

### Schritt 1: Production Build erstellen

```bash
# Im Projektordner Website.factory/
npm run build
```

Output liegt in `dist/` — dieser Ordner wird hochgeladen.

### Schritt 2: FTP-Verbindung herstellen

**FTP-Daten (aus ALL-INKL.COM KAS):**
- Host: `ftp.fitness-factory-hattingen.de` (oder wie im KAS angegeben)
- Benutzer: FTP-Account aus KAS
- Passwort: FTP-Passwort aus KAS
- Verzeichnis: `www/` oder `httpdocs/` (je nach ALL-INKL-Setup)

**FTP-Client:**
- [FileZilla](https://filezilla-project.org/) (kostenlos, empfohlen)
- [Cyberduck](https://cyberduck.io/) (macOS)

### Schritt 3: Dateien hochladen

1. **ZUERST: Backup der aktuellen WordPress-Seite!**
   - Alle WordPress-Dateien in `alt/wordpress-backup/` verschieben (nicht löschen!)
   - Oder: Eigenen FTP-Backup-Download erstellen

2. **Alles aus `dist/` in das Web-Root hochladen:**

```
dist/
├── index.html          → www/index.html
├── .htaccess           → www/.htaccess  ← WICHTIG: aus public/ (nicht dist/)
├── sitemap.xml         → www/sitemap.xml
├── robots.txt          → www/robots.txt
└── assets/
    ├── index-[hash].js     → www/assets/
    ├── vendor-[hash].js    → www/assets/
    ├── animations-[hash].js → www/assets/
    └── index-[hash].css    → www/assets/
```

> **Wichtig:** Die `.htaccess` kommt aus `public/` (nicht aus `dist/`) — Vite kopiert sie beim Build automatisch nach `dist/`.

### Schritt 4: .htaccess prüfen

Öffne im Browser: `https://fitness-factory-hattingen.de/kursplan`

- Lädt die Seite korrekt → .htaccess SPA-Routing funktioniert ✓
- Zeigt 404-Fehler → .htaccess wurde nicht hochgeladen oder mod_rewrite ist deaktiviert

Bei Problemen: ALL-INKL.COM Support fragen ob `mod_rewrite` aktiviert ist.

### Schritt 5: Verify

```
https://fitness-factory-hattingen.de           → Homepage
https://fitness-factory-hattingen.de/kursplan  → Kursplan
https://fitness-factory-hattingen.de/probetraining → Probetraining
https://www.fitness-factory-hattingen.de       → Redirect zu non-www ✓
http://fitness-factory-hattingen.de            → Redirect zu HTTPS ✓
```

---

## Option C: Netlify

### Schritt 1: Build & Netlify-CLI

```bash
npm run build
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

Oder per Drag & Drop:
1. [app.netlify.com](https://app.netlify.com) → New site from Git → oder Drag & Drop `dist/`
2. Custom domain → `fitness-factory-hattingen.de`
3. DNS-Records anpassen (Netlify zeigt welche)

---

## Vor dem Go-Live: Pflicht-Checkliste

### 24 Stunden vorher

- [ ] **WordPress-Backup** erstellen (FTP + phpMyAdmin Datenbank-Export)
- [ ] **Alte WordPress-URLs** dokumentieren (Google Search Console → Seiten → exportieren)
- [ ] **Google Search Console** — Property für neue Domain vorbereiten
- [ ] **Fonts herunterladen** (Links in `design/typography.md` Abschnitt 4):
  - Barlow Condensed (700, 800, 900 Italic) → `public/fonts/barlow-condensed/`
  - Plus Jakarta Sans (400, 500, 600) → `public/fonts/plus-jakarta-sans/`

### Bei der Umstellung

- [ ] DNS-Records auf neuen Server/CDN umzeigen
- [ ] TTL vorher auf 300 (5 Minuten) reduzieren → schnellere Propagation
- [ ] `dist/` Ordner hochladen (oder per CI/CD deployen)
- [ ] `.htaccess` prüfen (SPA-Routing + HTTPS-Redirect)

### Nach dem Go-Live (erste 24 Stunden)

- [ ] **Alle Hauptseiten** manuell durchklicken:
  - `/` → Homepage
  - `/kursplan` → Kursplan (mit Filter-Funktion testen)
  - `/probetraining` → Formular ausfüllen und abschicken
  - `/mitgliedschaft` → Preistabelle prüfen
  - `/team` → Trainer-Karten prüfen
  - `/fremdgeh-aktion` → Sonderaktion-Seite
  - `/faq` → Akkordeon auf- und zuklappen
  - `/impressum`, `/datenschutz`, `/agb` → Seiten laden
- [ ] **Mobile-Test** auf echtem iPhone + Android
- [ ] **Click-to-Call** testen: Tel-Link auslösen → 02324 33777 klingelt
- [ ] **WhatsApp-Button** testen: Chat öffnet sich korrekt
- [ ] **Kontaktformular** testen: E-Mail kommt an?
- [ ] **Keine Console-Errors** (Chrome DevTools → Console)
- [ ] **HTTPS grün** (kein Mixed-Content-Warning)
- [ ] **Google Search Console:** Sitemap einreichen → `sitemap.xml`
- [ ] **PageSpeed Insights:** [pagespeed.web.dev](https://pagespeed.web.dev) → Score prüfen
- [ ] **Rich Results Test:** [search.google.com/test/rich-results](https://search.google.com/test/rich-results) → HealthClub + FAQPage Schema prüfen
- [ ] **Mobile-Friendly Test:** [search.google.com/test/mobile-friendly](https://search.google.com/test/mobile-friendly)
- [ ] **Cookie-Consent** erscheint beim ersten Besuch

---

## Bundle-Größen (Production Build 2026-04-02)

| Datei | Raw | Gzip | Status |
|---|---|---|---|
| `index.html` | 8.98 kB | 2.83 kB | ✅ < 10 kB |
| `index-[hash].css` | 46.54 kB | 8.77 kB | ✅ gut |
| `vendor-[hash].js` | 46.25 kB | 16.04 kB | ✅ React + Router |
| `animations-[hash].js` | 132.96 kB | 42.58 kB | ✅ Framer Motion |
| `index-[hash].js` | 308.30 kB | **89.77 kB** | ✅ unter 100 kB gzip |
| Unterseiten (lazy) | 1.8–11 kB | je | ✅ Code Splitting aktiv |
| **Gesamt gzip** | — | **~163 kB** | ✅ sehr gut |

**Fazit:** Gzip-Transfer von ~163 kB für den kompletten Initial-Load. Sub-2s Ladezeit auf 4G realistisch.

---

## DNS-Umstellung: Schritt-für-Schritt

### Bei ALL-INKL.COM (KAS)

1. Login: [kas.all-inkl.com](https://kas.all-inkl.com)
2. Domain → DNS-Einstellungen → `fitness-factory-hattingen.de`
3. A-Record `@` → IP-Adresse des neuen Servers (oder Cloudflare-IP)
4. TTL: 300 (für schnelle Propagation)
5. Warten: DNS-Propagation dauert 15–60 Minuten (selten bis 24h)

### DNS-Propagation prüfen

```bash
# Terminal
dig fitness-factory-hattingen.de A +short
# Oder: https://dnschecker.org
```

---

## Troubleshooting

### Problem: Unterseiten zeigen 404

**Ursache:** .htaccess SPA-Routing fehlt oder mod_rewrite deaktiviert  
**Lösung:** .htaccess hochladen + ALL-INKL.COM Support kontaktieren wegen mod_rewrite

### Problem: Fonts laden nicht (FOUT — Flash of Unstyled Text)

**Ursache:** Font-Dateien fehlen in `public/fonts/`  
**Lösung:** Fonts gemäß `design/typography.md` herunterladen und in `public/fonts/` ablegen

### Problem: Bilder laden nicht

**Ursache:** `public/images/` nicht vollständig hochgeladen  
**Lösung:** Alle Dateien aus `public/images/` auf den Server laden

### Problem: Cookie-Consent erscheint nicht

**Ursache:** LocalStorage-Eintrag von vorherigem Test gesetzt  
**Lösung:** Browser-LocalStorage leeren (DevTools → Application → Local Storage → Clear)

### Problem: WhatsApp-Button öffnet falsche Nummer

**Ursache:** Nummer in `src/data/content.ts` falsch  
**Lösung:** `KONTAKT.whatsapp` prüfen — muss `+4915737580001` sein

---

## Phase 3: Nächste Schritte nach Go-Live

1. **Fotos + Videos:** Professionellen Fotografen beauftragen, Studio-Bilder erstellen lassen
2. **Bilder ersetzen:** Placeholder in `public/images/` durch echte Fotos ersetzen
3. **content.ts befüllen:** `[TBD]`-Platzhalter mit echten Daten (Trainer, Mitgliederzahl, Gründungsjahr)
4. **Google Business:** Website-URL in Google Business Profile aktualisieren
5. **Bewertungen:** Aktiv um Google-Bewertungen bitten (QR-Code aufstellen)
6. **Blog starten:** `/blog`-Sektion mit lokalen SEO-Inhalten (z.B. "Fitnessstudio Hattingen-Holthausen")
7. **KI-Chatbot:** n8n-RAG-Chatbot integrieren (First Mover in der Region!)
8. **Gelbe Seiten + 11880:** Einträge mit neuer Website-URL aktualisieren
9. **Google Search Console:** Rankings nach 4 Wochen analysieren, Content-Lücken schließen
