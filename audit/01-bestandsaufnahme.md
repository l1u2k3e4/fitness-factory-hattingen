# Bestandsaufnahme — Fitness Factory Hattingen
> Erstellt: 2026-04-01
> Quelle: Live-Scraping von https://fitness-factory-hattingen.de/
> Methode: WebFetch auf alle erreichbaren Seiten inkl. Sitemap-Auswertung

---

## 1. Technischer Steckbrief

### CMS & Framework
| Feld | Wert |
|---|---|
| **CMS** | WordPress 6.9.4 |
| **Page Builder** | Elementor + Elementor Pro |
| **Theme** | Powerlift (Mikado Framework) |
| **SEO-Plugin** | Yoast SEO (erkennbar an robots.txt-Header und Sitemap-Struktur) |
| **Formular-Plugin** | Contact Form 7 |
| **Cookie-Plugin** | Borlabs Cookie |
| **Caching / CDN** | Nicht erkennbar (kein Hinweis auf Cloudflare, LiteSpeed oder WP Rocket) |

### Hosting
| Feld | Wert |
|---|---|
| **Hoster** | ALL-INKL.COM – Neue Medien Münnich (aus Datenschutzerklärung) |
| **SSL** | Ja — HTTPS aktiv, HTTP wird auf HTTPS weitergeleitet |
| **Domain** | fitness-factory-hattingen.de |

### Tracking & Analytics
| Tool | ID / Details |
|---|---|
| **Google Analytics 4** | GT-NCTZLR4T |
| **Google Ads** | AW-17671885275 (Conversion-Tracking) |
| **Google Tag Manager** | GTM-PQJ82LFT |
| **Facebook Pixel** | 1477286522471998 |

### Cookie-Management
- **Borlabs Cookie** — vollständige DSGVO-Implementierung
- Google Consent Mode integriert
- Kategorien: Notwendig, Statistik (GA4), Marketing (FB Pixel, Google Ads)
- Ad Storage, Analytics Storage, Personalization Storage konfiguriert

### Technische Dependencies
- jQuery (via WordPress Core)
- MediaElement.js (Video-Player)
- Elementor Frontend Config
- Google reCAPTCHA (Formulare)
- Google Fonts (remote load — Datenschutz-Problem)
- Google Maps eingebettet
- YouTube-Videos eingebettet (mit Consent-Gate)

### WordPress-Hinweise im HTML
- wp-content/ Pfade in Asset-URLs
- Elementor-spezifische CSS-Klassen: `.e-con`, `.e-parent`, `.e-widget`
- Admin-Ajax: `https://fitness-factory-hattingen.de/wp-admin/admin-ajax.php`
- `<meta name="generator" content="WordPress 6.9.4">`

### Performance-Einschätzung (visuell)
- **Kein erkennbares CDN** — Assets werden direkt vom Hoster ausgeliefert
- **Elementor** erzeugt typischerweise großen CSS/JS-Overhead
- **Google Fonts remote** = render-blocking potenziell
- **YouTube-Embed** = schweres iFrame (trotz Consent-Gate)
- **Galerie-Bilder** ohne Alt-Text und vermutlich ohne Lazy-Loading-Optimierung

---

## 2. Sitemap — Alle Seiten

### Haupt-Sitemap-Index
URL: `https://fitness-factory-hattingen.de/sitemap_index.xml`
Enthält 7 Sub-Sitemaps: post, page, event, category, post_tag, testimonials-category, author

### Seiten (page-sitemap.xml) — 11 Einträge

| URL | Letztes Update | Beschreibung |
|---|---|---|
| `https://fitness-factory-hattingen.de/` | 2026-03-01 | Homepage |
| `https://fitness-factory-hattingen.de/class-timetable/` | 2023-10-31 | Kursplan-Seite |
| `https://fitness-factory-hattingen.de/impressum/` | 2023-11-12 | Impressum |
| `https://fitness-factory-hattingen.de/glueckwunsch-mitglied/` | 2023-12-17 | Danke-Seite nach Mitgliedschaft |
| `https://fitness-factory-hattingen.de/kuendigung/` | 2023-12-20 | Kündigungsformular |
| `https://fitness-factory-hattingen.de/probetraining/` | 2025-10-22 | Probetraining-Buchung |
| `https://fitness-factory-hattingen.de/probetraining-gesichert/` | 2025-11-07 | Danke-Seite Probetraining |
| `https://fitness-factory-hattingen.de/aktion-gesichert/` | 2025-12-22 | Danke-Seite Aktion |
| `https://fitness-factory-hattingen.de/agbs/` | 2026-01-29 | AGB & Datenschutz |
| `https://fitness-factory-hattingen.de/neujahr-aktion/` | 2026-02-26 | Neujahrs-Aktion Landingpage |
| `https://fitness-factory-hattingen.de/mitgliedschaft/` | 2026-03-01 | Mitgliedschaft-Seite |

### Blog-Posts (post-sitemap.xml) — 43 Einträge
Alle aus 2019, überwiegend englischsprachig, Dummy-Content aus Theme-Installation:
- Themen: Fitness-Motivation, Meal Prep, Gym Tips, Trainer-Profile (Dummy)
- Letzter echter Post: `2023/10/18/hello-world/` (Standard WordPress-Testpost)
- **Fazit: Blog ist komplett inaktiv und mit irrelevantem Dummy-Content befüllt**

### Kategorien (category-sitemap.xml)
- /category/fitness/ (2019)
- /category/health/ (2019)
- /category/lifestyle/ (2019)
- /category/nutrition/ (2019)
- /category/sport-science/ (2019)
- /category/training-program/ (2019)
- /category/uncategorized/ (2023)

### Nicht erreichbare Seiten (404-Fehler)
| URL | Status |
|---|---|
| `https://fitness-factory-hattingen.de/kursplan/` | 404 — URL in Hauptnavigation verlinkt, aber nicht existent! |
| `https://fitness-factory-hattingen.de/faq/` | 404 — URL in Hauptnavigation verlinkt, aber nicht existent! |
| `https://fitness-factory-hattingen.de/kontakt/` | 404 — URL in Footer verlinkt, aber nicht existent! |
| `https://fitness-factory-hattingen.de/datenschutz/` | 404 — Datenschutz ist in /agbs/ integriert |

**KRITISCH: Mehrere verlinkten Seiten existieren nicht (404)!**

### SEO-Übersicht aller Seiten

| Seite | Title-Tag | Meta-Description | H1 |
|---|---|---|---|
| Homepage | "Home -" | "Willkommen bei deinem Fitnessstudio in Hattingen. Entdecke das moderne Gym in deiner Nähe." | "Dein Fitness-Studio in Hattingen." |
| /class-timetable/ | "Class Timetable -" | Keine | "Class Timetable" |
| /probetraining/ | "Probetraining -" | Keine | "Tarif wählen und bei uns Trainieren" |
| /mitgliedschaft/ | "Mitgliedschaft -" | Keine | "Tarif wählen und bei uns Trainieren" |
| /impressum/ | "Impressum -" | Keine | "Impressum" |
| /agbs/ | "AGB´s -" | Keine | "AGB´s & Datenschutz" |
| /kuendigung/ | "Kündigung -" | Keine | "Kündigung" |
| /neujahr-aktion/ | "Neujahr-Aktion -" | Keine | "Sicher Dir den unschlagbaren Preis von einem Euro pro Tag, das sind nur 31€ im Monat" |
| /glueckwunsch-mitglied/ | "Glückwunsch - Mitglied -" | Keine | "Glückwunsch!" |
| /probetraining-gesichert/ | "Probetraining gesichert -" | Keine | "Probetraining gesichert" |
| /aktion-gesichert/ | "Aktion Gesichert -" | Keine | "Glückwunsch!" |

---

## 3. Homepage — Section für Section

### Navigation (Header)
**Hauptmenü-Links:**
- Home → `/`
- Kursplan → `/#Kursplan` (Anker auf Homepage-Section, nicht eigene Seite)
- Probetraining → `/probetraining/`
- Mitgliedschaft → `/mitgliedschaft/`
- FAQ → `/#faq` (Anker auf Homepage-Section)
- Kontakt → `/#nachricht` (Anker auf Homepage-Section)
- Info (Dropdown / Weitere Links)

**Footer-Navigation:**
- Impressum → `/impressum/`
- AGBs / Datenschutz → `/agbs/`
- Kündigung → `/kuendigung/`

**Beobachtung:** Kursplan, FAQ und Kontakt sind KEINE eigenständigen Seiten, sondern Anker-Links auf die Homepage. Die Navigation ist irreführend — "Kursplan" in der Nav sieht aus wie eine eigene Seite, ist aber ein Scroll-Anker. Tatsächliche Kursplan-Seite heißt `/class-timetable/` und ist nicht in der Navigation verlinkt.

---

### Section 1 — Hero

| Element | Inhalt |
|---|---|
| **Headline (H1)** | "Dein Fitness-Studio in Hattingen." |
| **Subheadline** | "Dein familiäres und erstklassiges Fitnessstudio in Hattingen Holthausen!" |
| **CTA Button 1** | "Probetraining" → `/probetraining/` |
| **Hintergrund** | Logo-Bild (nicht aussagekräftiges Hero-Visual) |
| **Kein Video-Hero** | — |

**Probleme:**
- Kein emotionales Bild oder Video als Hero-Background
- Subheadline zu allgemein, kein klares Value-Proposition
- Nur ein CTA-Button (kein sekundärer CTA)

---

### Section 2 — "Die Fitness Factory in Hattingen"

| Element | Inhalt |
|---|---|
| **H2** | "Die Fitness Factory in Hattingen" |
| **Text** | "Dein familiäres und erstklassiges Fitnessstudio in Hattingen Holthausen!" |
| **Video** | YouTube-Embed (hinter Consent-Gate) |
| **Problem** | Platzhaltertext erscheint statt Video bis Nutzer Cookie zustimmt |

---

### Section 3 — "Alle Leistung Inklusive"

| Element | Inhalt |
|---|---|
| **H2** | "Alle Leistung in Deiner MitglieDschaft inklusive" |
| **Inklusive-Leistungen (Icons)** | Ernährungsberatung, Live Kurse, Gratis Saunazugang, Getränkeflat, Kostenlos parken + weitere |
| **Vollständige Liste** | Aus anderen Seitenquellen: Ernährungsberatung, Trainingsberatung, individueller Trainingsplan, Live-Kurse, Gratis Saunazugang, Getränkeflat, Kostenlose Duschen, Kostenlose Parkplätze |

**Problem:** Falsche Groß-/Kleinschreibung im H2 ("MitglieDschaft" — Stilfehler)

---

### Section 4 — Google Bewertungen / Kunden-Stimmen

| Element | Inhalt |
|---|---|
| **H2** | "Google Bewertungen" / "Kunden-Stimmen" |
| **Anzahl Bewertungen** | 4 Testimonials angezeigt |
| **Testimonial 1** | Thomas Schwindt ⭐⭐⭐⭐⭐: "Tolles Studio mit echt netten Leuten. Die Auswahl an Geräten ist sehr vielfältig und die Betreuung durch die Trainer erstklassig." |
| **Testimonial 2** | Peter Kroll ⭐⭐⭐⭐⭐: "Als einziges mir bekanntes Studio in Hattingen kann man dort auch eine 10-er Karte erwerben." |
| **Testimonial 3** | Martin Sitter ⭐⭐⭐⭐⭐: "Tolles Fitnessstudio. Es ist unser zweites Wohnzimmer." |
| **Testimonial 4** | Jennifer Praus ⭐⭐⭐⭐⭐: "Wollten einmalig dort trainieren. Nach einem kurzen und netten Telefonat möglich." |

**Hinweis:** Google-Gesamtbewertung (Sternanzahl gesamt, Anzahl Reviews) wird nicht angezeigt.

---

### Section 5 — Galerie "Einblicke In Unser Fitnessstudio"

| Element | Inhalt |
|---|---|
| **H2** | "Einblicke In unser Fitnessstudio" |
| **Anzahl Bilder** | 12 Bilder (ursprünglich 9 DSC-Dateinamen gefunden, Homepage nennt 12) |
| **Alt-Texte** | KEINE Alt-Texte vorhanden (SEO-Problem!) |
| **Dateinamen** | DSC08599, DSC08419 etc. — rohe Kamera-Dateinamen ohne Optimierung |
| **Format** | Galerie-Grid (Lightbox vermutlich vorhanden) |

---

### Section 6 — Mitgliedschaft / Preise

| Element | Inhalt |
|---|---|
| **H2** | "Wähle Deine MitgliedSchaft" |
| **H3: Plan 1** | "1 Monats Vertrag" |
| **Preis Plan 1** | 55€/Monat + 49€ Anmeldegebühr, monatlich kündbar |
| **H3: Plan 2** | "12 Monats Vertrag" |
| **Preis Plan 2** | 45€/Monat + 49€ Anmeldegebühr, 12 Monate Laufzeit |
| **H3: Plan 3** | "24 Monats Vertrag" |
| **Preis Plan 3** | 35€/Monat + 49€ Anmeldegebühr, 24 Monate Laufzeit |
| **H3: Sonderaktion** | "FREMDGEH Aktion" |
| **Preis Sonderaktion** | 0€/3 Monate (bei bestehendem Fremd-Vertrag), dann 12- oder 24-Monats-Vertrag + 49€ |
| **Preishinweis** | "Die Preise können bei Aktionen abweichen. Bitte schau auf unseren Aktionsseiten nach." |
| **Inklusive bei allen** | Ernährungsberatung, Live Kurse, Saunazugang, Getränkeflat, Kostenlos parken |
| **CTA** | "Probetraining sichern" → `/probetraining/` |
| **CTA** | "Mitglied werden" → `/mitgliedschaft/?` |

**Problem:** Falsche Groß-/Kleinschreibung ("MitgliedSchaft")

---

### Section 7 — Kursplan (Homepage-Anker #Kursplan)

| Tag | Zeit | Kurs |
|---|---|---|
| Montag | 17:00–18:30 | Vinyasa-Yoga |
| Montag | 19:00–20:00 | Spinning |
| Montag | 20:00–21:00 | Wirbelsäulen-Gymnastik |
| Dienstag | 18:00–19:00 | Bauch-Express |
| Dienstag | 19:00–20:00 | Spinning |
| Mittwoch | 17:00–18:00 | Tabata |
| Mittwoch | 18:15–19:45 | Yoga |
| Donnerstag | 18:00–19:00 | Tae-Bo |
| Donnerstag | 19:00–20:00 | Spinning |
| Freitag | 17:15–18:15 | Rücken Fit |
| Freitag | 18:15–19:15 | Zumba |
| Sonntag | 10:15–11:00 | Spinning |
| Sonntag | 11:15–12:45 | Full Body Intervall + Bauch |
| Sonntag | 13:15–14:45 | Pilates |

**H2:** "Unser Kursplan"
**H2 (folgende Section):** "Entdecke unsere Kurs Angebote"
**Hinweis:** Samstag hat KEINE Kurse.
**Trainer-Namen:** Nicht auf der Website angegeben.

---

### Section 8 — Probetraining CTA-Banner

| Element | Inhalt |
|---|---|
| **H2** | "Probetraining" |
| **CTA** | "Probetraining vereinbaren" → `/probetraining/` |

---

### Section 9 — FAQ (Anker #faq)

| Element | Inhalt |
|---|---|
| **H2** | "Häufig Gestellte Fragen - FAQ" |
| **Anzahl FAQs** | 15 Fragen |

**Vollständige FAQ-Liste:**

| # | Frage | Antwort |
|---|---|---|
| 1 | Standort des Studios | "Unser Studio befindet sich in Hattingen Holthausen. Adresse: Im Vogelsang 95, 45527 Hattingen" |
| 2 | Kostenlose Parkmöglichkeiten | "Ja, es stehen kostenlose Parkplätze direkt am Fitnessstudio zur Verfügung." |
| 3 | Öffnungszeiten | "Werktags: 8:00 Uhr bis 23:00 Uhr. Wochenende: 10:00 Uhr bis 17:30 Uhr" |
| 4 | Angebotene Leistungen | Mitglieder erhalten: kostenlose Getränkeflat, Saunazugang, Kurse, Trainings- und Ernährungsberatung sowie kostenlose Duschen. |
| 5 | Spezielle Mitgliederangebote | "Ja, Mitglieder erhalten Zugang zu einer gratis Getränkeflat, Sauna, Kursen, Trainings- und Ernährungsberatung sowie kostenlosen Duschen." |
| 6 | Kursbuchung erforderlich | "Ja, Kurse müssen vorab in einer Gruppe gebucht werden." |
| 7 | Anmeldegebühr | "Ja, die einmalige Anmeldegebühr beträgt 49€." |
| 8 | Vertragsmöglichkeiten | Jahresvertrag, 2-Jahresvertrag, Monatsvertrag und Fremdgeh-Vertrag (3 Monate kostenfrei). |
| 9 | Personal Training | "Ja, wir bieten auch Personal Training an. Bitte kontaktiere unser Team für einen kostenlosen Termin." |
| 10 | Programme für Anfänger | "Ja, unser Studio bietet Einführungskurse und Programme für Anfänger an." |
| 11 | Studiobesichtigung möglich | "Ja, Interessierte können gerne eine Besichtigung vereinbaren." |
| 12 | Mitgliedschaftsprozess | Online-Anmeldung oder persönlich im Studio möglich. |
| 13 | Probetraining kostenfrei | "Probetrainings sind bei uns natürlich kostenlos." |
| 14 | Ernährungsberatungskosten | "Der Ernährungsplan ist in der Mitgliedschaft enthalten und kostenfrei für unsere Mitglieder." |
| 15 | Kontaktdaten | Mail: fitness-factory-hattingen@gmx.de; Telefon: 02324 33777; WhatsApp: +49 1573 7580001 |

**"Weitere Fragen?" Section:**
Text: "Schreibt uns gerne eine Nachricht über Mail oder WhatsApp: +49 1573 7580001 oder ruf uns an: 02324 33777"
CTA: "Nachricht senden" → `/#nachricht`

---

### Section 10 — Kontakt / Footer (Anker #nachricht)

| Element | Inhalt |
|---|---|
| **H2** | "Mitglied" / Kontaktformular |
| **Adresse** | Im Vogelsang 95, 45527 Hattingen |
| **Telefon** | 02324 33777 |
| **WhatsApp** | +49 1573 7580001 |
| **E-Mail** | fitness-factory-hattingen@gmx.de |
| **Öffnungszeiten** | Mo–Fr 08:00–23:00 Uhr, Sa–So 10:00–17:30 Uhr |
| **Google Maps** | Eingebettet / verlinkt |
| **Instagram** | https://www.instagram.com/fitness.factory.hattingen/ |
| **Facebook** | https://www.facebook.com/fitnessfactoryhattingen |

---

## 4. Geschäftsdaten-Inventar

### Firmendaten (aus Impressum)

| Feld | Wert |
|---|---|
| **Firmenname** | FITNESS FACTORY HATTINGEN GMBH |
| **Rechtsform** | GmbH |
| **Adresse** | Im Vogelsang 95, 45527 Hattingen, Deutschland |
| **Telefon** | 02324 33777 |
| **E-Mail** | fitness-factory-hattingen@gmx.de |
| **WhatsApp** | +49 1573 7580001 / 0157 37580001 |
| **Geschäftsführer** | Alexander Stöcker |
| **Handelsregister** | HRB 29213 |
| **Registergericht** | Essen |
| **USt-IdNr.** | DE319398653 |
| **Hosting** | ALL-INKL.COM – Neue Medien Münnich |

### Öffnungszeiten (auf Website)

| Tag | Zeiten |
|---|---|
| Montag–Freitag | 08:00–23:00 Uhr |
| Samstag | 10:00–17:30 Uhr |
| Sonntag | 10:00–17:30 Uhr |

### Preise & Mitgliedschaften (exakt von Website)

| Vertrag | Monatspreis | Anmeldegebühr | Laufzeit / Kündigung |
|---|---|---|---|
| 1 Monats Vertrag | 55€ | 49€ | Monatlich kündbar |
| 12 Monats Vertrag | 45€ | 49€ | 12 Monate, 4 Wochen Kündigungsfrist zum Monatsende |
| 24 Monats Vertrag | 35€ | 49€ | 24 Monate, 4 Wochen Kündigungsfrist zum Monatsende |
| FREMDGEH Aktion | 0€ (3 Monate) | 49€ | Bei bestehendem Fremd-Vertrag, dann 12- oder 24-Monats-Vertrag |
| Neujahr-Aktion (abgelaufen) | 31€ | 24,50€ (50% reduziert) | 12 Monate, limitiert auf 100 Plätze |

**AGB-Details zu Verträgen:**
- Verträge verlängern sich automatisch nach Ablauf, wenn nicht mit 4-Wochen-Frist zum Monatsende gekündigt wird
- SEPA-Lastschriftmandat wird bei Anmeldung erteilt
- 5€ Bearbeitungsgebühr bei Rücklastschriften
- Inkasso-Dienstleister: Finion Capital GmbH
- Online-Verträge: 14-tägiges Widerrufsrecht vor erstem Probetraining
- Mindestalter: 18 Jahre online, 14+ mit Elternzustimmung im Studio

### Kursplan (vollständig, mit Uhrzeiten)

| Tag | Uhrzeit | Kurs |
|---|---|---|
| Montag | 17:00–18:30 | Vinyasa-Yoga |
| Montag | 19:00–20:00 | Spinning |
| Montag | 20:00–21:00 | Wirbelsäulen-Gymnastik |
| Dienstag | 18:00–19:00 | Bauch-Express |
| Dienstag | 19:00–20:00 | Spinning |
| Mittwoch | 17:00–18:00 | Tabata |
| Mittwoch | 18:15–19:45 | Yoga |
| Donnerstag | 18:00–19:00 | Tae-Bo |
| Donnerstag | 19:00–20:00 | Spinning |
| Freitag | 17:15–18:15 | Rücken Fit |
| Freitag | 18:15–19:15 | Zumba |
| Samstag | — | Keine Kurse |
| Sonntag | 10:15–11:00 | Spinning |
| Sonntag | 11:15–12:45 | Full Body Intervall + Bauch |
| Sonntag | 13:15–14:45 | Pilates |

**Trainer-Namen:** Nicht auf der Website angegeben (wichtige Lücke!)

### Inklusive Leistungen (alle Mitgliedschaften)

Laut Website in allen Mitgliedschaften enthalten:
1. Ernährungsberatung (Gratis)
2. Individueller Trainingsplan (Gratis)
3. Trainingsberatung
4. Live-Kurse (alle Kurse inklusive)
5. Gratis Saunazugang
6. Getränkeflat (kostenlose Getränke)
7. Kostenlose Duschen
8. Kostenlose Parkplätze

### Social Media

| Plattform | URL / Handle |
|---|---|
| **Instagram** | https://www.instagram.com/fitness.factory.hattingen/ |
| **Facebook** | https://www.facebook.com/fitnessfactoryhattingen |

### Kontakt-Wege (auf Website)

| Kanal | Details |
|---|---|
| Telefon | 02324 33777 |
| WhatsApp | +49 1573 7580001 |
| E-Mail | fitness-factory-hattingen@gmx.de |
| Probetraining-Formular | `/probetraining/` |
| Kündigungs-Formular | `/kuendigung/` |
| Kontakt-Anker | `/#nachricht` |

---

## 5. Visuelles Inventar

### Logo

| Element | Beschreibung |
|---|---|
| **Haupt-Logo (hell)** | `logo-1.png` (151×69px) — vermutlich weißes Logo für dunklen Hintergrund |
| **Haupt-Logo (dunkel)** | `cropped-ff-jpg-logo.jpg` — für hellen Hintergrund |
| **Favicon-Logo** | `ff-jpg-logo.jpg` (512×512px) — quadratisches Format |
| **Logo-Typ** | Wortmarke mit "FITNESS FACTORY" Text + Grafik-Element |
| **Schriftstil** | Kursiv/Bold-Erscheinung basierend auf Dateinamen |

### Farbschema

Aus dem Seitentext und typischen Elementor-Theme-Farben erkennbar:
- **Primärfarbe:** Schwarz / Dunkelgrau (Studio-Industrie-Ästhetik)
- **Akzentfarbe:** Rot oder Orange (typisch für Fitness-Studios, basierend auf Logo-Kontext)
- **Hintergrund:** Weiß / Dunkel

**Hinweis:** Exakte Hex-Codes konnten nicht aus dem CSS extrahiert werden — würde direkten CSS-Zugriff erfordern. Im Relaunch-Prozess: Design-System neu definieren.

### Schriftarten

- Google Fonts wird remote geladen (aus Datenschutzerklärung)
- Genaue Font-Namen nicht aus dem Scraping extrahierbar
- Elementor nutzt häufig: Roboto, Open Sans, Lato als Defaults

### Bildmaterial

| Kategorie | Details |
|---|---|
| **Studio-Fotos** | 12 Galerie-Bilder (DSC-Dateinamen = unkomprimierte Kamera-RAWs) |
| **Bildqualität** | Unklar — Dateinamen deuten auf direkte Kamera-Uploads hin |
| **Alt-Texte** | KEINE Alt-Texte bei Galerie-Bildern (SEO-kritisch!) |
| **Hero-Bild** | Logo-basiert, kein echtes Lifestyle-Foto |
| **Geräte-Fotos** | Im Galerie-Bereich vorhanden |
| **FREMDGEH-Bild** | `fremdgeh-aktion.jpg` (1024×1024px) |
| **Maps-Bild** | `ff-maps-300x188.png` (Screenshot Google Maps) |
| **Video** | YouTube-Embed (Consent-pflichtig) |

---

## 6. Content-Inventar

### Wichtige Texte / Copywriting auf der Website

**Haupt-Slogan / Tagline:**
"Dein familiäres und erstklassiges Fitnessstudio in Hattingen Holthausen!"

**Studio-Beschreibung (Footer / Über-uns):**
"Die Fitness Factory Hattingen steht für ein familiäres, modernes und offenen Gym für alle. Das Fitnessstudio in Hattingen."

**Probetraining-Text:**
"Dann sicher Dir ganz einfach Dein kostenloses Probetraining bei uns in der Fitness Factory Hattingen. Schreib uns jederzeit auf WhatsApp unter der 0157 37580001 oder ruf und direkt an unter 02324 33777."

**Probetraining-Seite H1:** "Tarif wählen und bei uns Trainieren"
*(Problem: H1 auf Probetraining-Seite beschreibt Tarife, nicht Probetraining — irreführend)*

**Probetraining-Erfolgsseite:**
"Glückwunsch dein Probetraining ist gesichert"

**Kündigung-Intro:**
"Es tut uns leid, dass du dich entschieden hast zu gehen, und wir hoffen, dich bald wieder als Mitglied willkommen zu heißen. Wenn es noch andere Anliegen gibt, zögere nicht, dich persönlich, telefonisch oder per E-Mail bei uns zu melden."

**Willkommen-Seite (nach Mitgliedschaft):**
"Herzlich willkommen in der Fitness Factory! Vielen Dank für deine Anmeldung bei der Fitness Factory! Wir freuen uns sehr, dich in unserer Community begrüßen zu dürfen. Um deinen Mitgliedsvertrag abzuholen und dich persönlich kennenzulernen, besuche uns einfach im Studio und gib bei Ankunft an unserer Theke Bescheid."

**Neujahr-Aktion H1:**
"Sicher Dir den unschlagbaren Preis von einem Euro pro Tag, das sind nur 31€ im Monat"

**Neujahr-Aktion Beschreibung:**
"Super! Du hast dir unsere Aktion rechtzeitig gesichert und bist einer der 100 Glücklichen, die die Aktion wahrnehmen dürfen und nun Mitglied sind."

### Blog-Content
- 43 Blog-Posts, alle aus 2019
- Überwiegend englischsprachig
- Dummy-/Placeholder-Content aus dem gekauften Theme
- Kein Mehrwert für lokale SEO
- Kein redaktioneller Prozess erkennbar

---

## 7. Feature-Liste

### Vorhandene Features (aktuell aktiv)

| Feature | Status | Details |
|---|---|---|
| Probetraining-Formular | Aktiv | Contact Form 7, Consent-Checkboxen, Weiterleitung auf Danke-Seite |
| Kursplan (Timetable) | Aktiv | `/class-timetable/`, tabellen-basiert, keine Live-Daten |
| Preisübersicht | Aktiv | 3 Tarife + FREMDGEH-Aktion, statisch |
| Direktmitgliedschaft online | Aktiv | Formular auf `/mitgliedschaft/` + `/neujahr-aktion/` mit SEPA-Mandat |
| Kündigungsformular | Aktiv | `/kuendigung/`, Contact Form 7 |
| Cookie-Consent | Aktiv | Borlabs Cookie, DSGVO-konform |
| Google Maps Embed | Aktiv | Eingebettet im Footer |
| YouTube-Embed | Aktiv | Consent-Gate vorhanden |
| WhatsApp-Button | Aktiv | `https://wa.me/4915737580001` |
| Facebook / Instagram Links | Aktiv | Footer + Social-Section |
| Google Analytics 4 | Aktiv | GT-NCTZLR4T |
| Google Ads Conversion | Aktiv | AW-17671885275 |
| Facebook Pixel | Aktiv | 1477286522471998 |
| FAQ-Section | Aktiv | 15 FAQs, auf Homepage als Anker-Section |
| Galerie | Aktiv | 12 Bilder, keine Lightbox-Info |
| Testimonials | Aktiv | 4 Google-Bewertungen, statisch eingebettet |

### Fehlende Features (Lücken für Relaunch)

| Feature | Priorität | Begründung |
|---|---|---|
| Online-Kursbuchungssystem | Hoch | FAQ: "Kurse müssen vorab gebucht werden" — kein Buchungssystem vorhanden |
| Trainer-Profile | Hoch | Keine Trainer mit Namen, Foto, Qualifikation sichtbar |
| Erfolgsgeschichten/Transformationen | Mittel | Kein Social Proof außer 4 Bewertungen |
| Live Google Review Widget | Mittel | Nur 4 statische Bewertungen — kein Live-Feed |
| Blog / Wissens-Content | Mittel | Blog existiert, aber inaktiv und englischsprachig |
| KI-Chatbot | Hoch | Geplant, nicht vorhanden — First-Mover-Vorteil |
| Sticky CTA auf Mobile | Hoch | Kein Sticky-Element sichtbar |
| Mitglieder-Login / App | Niedrig | Langfristig |
| Bewertungs-Widget (live) | Mittel | Derzeit statisch |
| Eigener Datenschutz-Link | Mittel | Datenschutz steckt in /agbs/ kombiniert |

---

## 8. Abweichungen von CLAUDE.md

### Bestätigte Übereinstimmungen (Website stimmt mit CLAUDE.md überein)

| Feld | CLAUDE.md | Website |
|---|---|---|
| Firmenname | FITNESS FACTORY HATTINGEN GMBH | FITNESS FACTORY HATTINGEN GMBH ✓ |
| Adresse | Im Vogelsang 95, 45527 Hattingen | Im Vogelsang 95, 45527 Hattingen ✓ |
| Telefon | 02324 33777 | 02324 33777 ✓ |
| WhatsApp | +49 1573 7580001 | +49 1573 7580001 ✓ |
| E-Mail | fitness-factory-hattingen@gmx.de | fitness-factory-hattingen@gmx.de ✓ |
| Öffnungszeiten Mo–Fr | 08:00–23:00 | 08:00–23:00 ✓ |
| Öffnungszeiten Sa–So | 10:00–17:30 | 10:00–17:30 ✓ |
| Flex (1 Monat) | 55€ / 49€ | 55€ / 49€ ✓ |
| Standard (12 Monate) | 45€ / 49€ | 45€ / 49€ ✓ |
| Premium (24 Monate) | 35€ / 49€ | 35€ / 49€ ✓ |
| FREMDGEH | 0€ (3 Monate) / 49€ | 0€ (3 Monate) / 49€ ✓ |
| Instagram | @fitness.factory.hattingen | @fitness.factory.hattingen ✓ |
| Facebook | /fitnessfactoryhattingen | /fitnessfactoryhattingen ✓ |
| Geschäftsführer | (nicht in CLAUDE.md) | Alexander Stöcker (NEU ermittelt) |
| HRB | (nicht in CLAUDE.md) | HRB 29213 (NEU ermittelt) |
| USt-IdNr. | (nicht in CLAUDE.md) | DE319398653 (NEU ermittelt) |
| Registergericht | (nicht in CLAUDE.md) | Essen (NEU ermittelt) |

### Abweichungen / Neue Erkenntnisse gegenüber CLAUDE.md

| Punkt | CLAUDE.md-Annahme | Tatsächlicher Website-Status |
|---|---|---|
| Kursplan-URL | Nicht spezifiziert | Echter URL: `/class-timetable/` (nicht `/kursplan/`) |
| Kurszeiten | Nicht spezifiziert | Vollständige Zeiten jetzt dokumentiert (siehe Tabelle oben) |
| Kurs "Wirbelsäulen-Gymnastik" | In CLAUDE.md unter Montag gelistet | Bestätigt: Montag 20:00–21:00 ✓ |
| "Rücken-Fit" (CLAUDE.md) | "Rücken-Fit" | Website schreibt "Rücken Fit" (ohne Bindestrich) |
| "Full Body Intervall" | In CLAUDE.md erwähnt | Website: "Full Body Intervall + Bauch" am Sonntag |
| Kurs "Pilates" | CLAUDE.md: Sonntag | Bestätigt: Sonntag 13:15–14:45 ✓ |
| Datenschutz | Separate Seite angenommen | In `/agbs/` kombiniert, keine eigene `/datenschutz/`-Seite |
| FAQ-Seite | `/faq/` angenommen | FAQ ist Anker auf Homepage (`/#faq`), keine eigene Seite |
| Kursplan-Seite | `/kursplan/` angenommen | `/kursplan/` gibt 404, echte URL: `/class-timetable/` |
| Kontakt-Seite | `/kontakt/` angenommen | `/kontakt/` gibt 404, Kontakt ist Anker `/#nachricht` |
| Kursplan Samstag | Nicht in CLAUDE.md erwähnt | Samstag hat KEINE Kurse (Lücke im Kursplan!) |
| 10er-Karte | Nicht in CLAUDE.md | In Testimonial erwähnt: "10er-Karte erwerben" (Gelegenheitstraining ohne Vertrag) |
| Neujahr-Aktion | Nicht in CLAUDE.md | Aktive Sonderaktion: 31€/Monat, 50% auf Anmeldegebühr (abgelaufen Feb 2026) |

### Kritische Befunde für den Relaunch

| Befund | Schweregrad | Handlungsbedarf |
|---|---|---|
| Title-Tags unvollständig (z.B. "Home -") | KRITISCH | Alle Titles neu schreiben mit Keywords |
| Meta-Descriptions fast überall fehlend | KRITISCH | Für alle Seiten schreiben |
| H1-Tags teilweise falsch/irrelevant | HOCH | z.B. Probetraining-H1 spricht über Tarife |
| 404-Seiten in der Navigation | KRITISCH | `/kursplan/`, `/kontakt/` → 404 |
| Keine Alt-Texte bei Galerie-Bildern | HOCH | 12 Bilder ohne Alt-Text |
| Kein JSON-LD HealthClub Schema | KRITISCH | Für Local SEO essentiell |
| Open Graph Tags fehlen | HOCH | Social Sharing ohne Bild/Description |
| Kein Canonical-Tag | MITTEL | Duplicate Content Risiko |
| Blog mit Dummy-Content (Englisch) | MITTEL | Schadet lokaler Relevanz |
| GMX E-Mail (unprofessionell) | MITTEL | fitness-factory-hattingen@gmx.de |
| Keine Trainer-Profile | HOCH | Wichtig für E-E-A-T (Google-Ranking) |
| Kursplan-H1 auf Englisch ("Class Timetable") | HOCH | Deutschsprachige SEO-Relevanz verpasst |
| WordPress/Elementor Performance | HOCH | Schwere Payload, langsame Ladezeiten |
| Google Fonts remote | MITTEL | DSGVO-Grauzone + Performance |
| 10er-Karte erwähnt aber nicht beworben | NIEDRIG | Potenzielle Conversion-Chance |

---

## Anhang: Robots.txt

```
# START YOAST BLOCK
# ---------------------------
User-agent: *
Disallow:

Sitemap: https://fitness-factory-hattingen.de/sitemap_index.xml
# ---------------------------
# END YOAST BLOCK
```

**Bewertung:** Alle Crawlers dürfen alles crawlen (kein Disallow). Sitemap korrekt hinterlegt.

---

## Anhang: JSON-LD Structured Data (IST-Stand)

Aktuell vorhanden:
- `WebPage` Schema (unvollständig, Name: "Home -")
- `Organization` Schema (Basis-Daten)
- `ImageObject` Schema
- `BreadcrumbList` Schema
- `WebSite` Schema (mit Suchfunktion)

**Fehlend (für Relaunch):**
- `HealthClub` / `LocalBusiness` Schema mit vollständigen Öffnungszeiten
- `FAQPage` Schema für Featured Snippets
- `OpeningHoursSpecification`
- `AggregateRating` (Bewertungen strukturiert)
- `Event` Schema für Kurs-Events
