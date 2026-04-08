# SEO-Analyse — Fitness Factory Hattingen
> Erstellt: 2026-04-01
> Quelle: Live-Analyse aller Hauptseiten + externe Signalprüfung
> Methode: WebFetch (Homepage, /probetraining/, /mitgliedschaft/, /class-timetable/), WebSearch (Google Business, Wettbewerb, Verzeichnisse)

---

## 1. Score-Übersicht

| Kategorie | Score | Begründung |
|---|---|---|
| **Technisches SEO** | **28/100** | Title-Tags leer/falsch, keine Meta-Descriptions auf Unterseiten, kein Canonical, kein OG, kein HealthClub-Schema, 404-Fehler in Navigation, Blog mit 43 Dummy-Posts schädigt Relevanz |
| **Lokales SEO** | **22/100** | Kein HealthClub-JSON-LD, nicht in Gelbe Seiten gelistet, fehlende NAP in strukturierter Form, Einzugsgebiet nicht adressiert, Google Business Profile nicht verifizierbar optimiert |
| **Content-SEO** | **30/100** | H1 auf Homepage korrekt, aber Unterseiten fehlerhaft; kein FAQ-Schema; Kursplan-H1 auf Englisch; keine Einzugsgebiet-Texte; Blog ist Ballast |
| **Backlink-Profil** | **20/100** | Kaum externe Präsenz nachweisbar; nicht in wichtigen Verzeichnissen (Gelbe Seiten, 11880) gelistet; nur Gymsider + Fresha gefunden |
| **Gesamt** | **25/100** | Kritischer Handlungsbedarf — die Website vergibt systematisch alle lokalen SEO-Chancen durch technische Grundfehler und fehlende Content-Optimierung |

---

## 2. Detailliertes Audit

### A. Technisches SEO

#### Title-Tags

| Seite | Aktueller Title | Status | Problem |
|---|---|---|---|
| `/` | `Home -` | ❌ | Kein Keyword, kein Markenname ausgeschrieben, wird in SERPs abgeschnitten/ignoriert |
| `/class-timetable/` | `Class Timetable -` | ❌ | Englisch, kein Keyword, kein Ortsname |
| `/probetraining/` | `Probetraining -` | ⚠️ | Kein Ortsname, kein USP, zu kurz (14 Zeichen) |
| `/mitgliedschaft/` | `Mitgliedschaft -` | ⚠️ | Kein Ortsname, kein Preis-Anreiz, zu kurz |
| `/impressum/` | `Impressum -` | ⚠️ | Akzeptabel für Legal-Seite, aber `noindex` fehlt |
| `/agbs/` | `AGB´s -` | ⚠️ | Schreibfehler (Apostroph), `noindex` fehlt |

**Zusammenfassung:** Alle Title-Tags generiert durch WordPress-Standard ohne Yoast-Konfiguration. Kein einziger enthält das Primärkeyword "Fitnessstudio Hattingen". Der Strich am Ende deutet auf ein nicht konfiguriertes Separator-Zeichen im Yoast-Template hin (`%title% - %sitename%` wobei Sitename leer ist).

#### Meta-Descriptions

| Seite | Vorhanden | Status | Problem |
|---|---|---|---|
| `/` | Ja — "Willkommen bei deinem Fitnessstudio in Hattingen. Entdecke das moderne Gym in deiner Nähe." | ⚠️ | Kein CTA, kein USP, keine Preisinfo, kein Anreiz zum Klick — zu generisch |
| `/class-timetable/` | Nein | ❌ | Google generiert zufälligen Snippet |
| `/probetraining/` | Nein | ❌ | Google generiert zufälligen Snippet |
| `/mitgliedschaft/` | Nein | ❌ | Google generiert zufälligen Snippet |
| `/impressum/` | Nein | ❌ | Legal-Seite — akzeptabel, sollte aber `noindex` haben |
| `/agbs/` | Nein | ❌ | Legal-Seite — akzeptabel, sollte aber `noindex` haben |

#### Heading-Hierarchie

| Seite | H1 | Status | Problem |
|---|---|---|---|
| `/` | "Dein Fitness-Studio in Hattingen." | ✅ | Korrekt, enthält Keyword + Ort — aber Bindestrich-Schreibung "Fitness-Studio" nicht ideal |
| `/class-timetable/` | "Class Timetable" | ❌ | **Englisch!** Sollte "Kursplan Fitnessstudio Hattingen" sein |
| `/probetraining/` | "Tarif wählen und bei uns Trainieren" | ❌ | Falscher H1 — das ist die Mitgliedschaft-CTA, nicht das Probetraining-Keyword |
| `/mitgliedschaft/` | "Tarif wählen und bei uns Trainieren" | ❌ | Identisch mit Probetraining — beide Seiten haben denselben H1 (Keyword-Kannibalisierung) |

**Schwerwiegendes Problem:** `/probetraining/` und `/mitgliedschaft/` haben **identische H1-Tags**. Google kann nicht unterscheiden, welche Seite für welches Keyword stehen soll → klassische Keyword-Kannibalisierung.

#### Bilder-SEO

| Element | Status | Detail |
|---|---|---|
| Alt-Texte auf Galerie-Bildern | ❌ | 12 Galerie-Bilder ohne Alt-Text (Dateinamen: DSC08599 etc.) |
| Alt-Texte auf Inhaltsbildern | ❌ | Keine Alt-Texte gefunden auf allen vier geprüften Seiten |
| Dateinamen | ❌ | Kamera-Rohdateinamen (DSC08599.jpg) statt beschreibender Namen |
| Bildformat | ⚠️ | Keine WebP/AVIF erkennbar — vermutlich JPEG/PNG |
| Lazy Loading | ⚠️ | Bei WordPress/Elementor nicht garantiert konfiguriert |
| Bildkompression | ⚠️ | Kein CDN, kein erkennbares Kompressionseinzel-Plugin |

**Empfehlung für neue Website:** Alle Bilder umbenennen (z.B. `fitnessstudio-hattingen-geraetebereich.webp`), WebP-Format, Alt-Texte mit Keywords.

#### Structured Data (JSON-LD)

**Vorhanden:**

| Schema-Typ | Status | Detail |
|---|---|---|
| `WebPage` | ⚠️ | Vorhanden, aber `name: "Home -"` — erbt den fehlerhaften Title |
| `Organization` | ⚠️ | Vorhanden, enthält Name + Logo + Social Links — aber kein `address`, kein `telephone`, keine `openingHours` |
| `BreadcrumbList` | ✅ | Vorhanden auf allen Seiten |
| `WebSite` | ✅ | Mit SearchAction — korrekt |
| `ImageObject` | ✅ | Vorhanden |

**Fehlend — kritisch:**

| Schema-Typ | Status | Warum wichtig |
|---|---|---|
| `HealthClub` / `LocalBusiness` | ❌ | **Wichtigstes lokales SEO-Signal** — Google erkennt den Unternehmenstyp nicht maschinenlesbar |
| `OpeningHoursSpecification` | ❌ | Öffnungszeiten nicht maschinenlesbar → kein Rich Snippet im Google Business |
| `FAQPage` | ❌ | FAQ ist auf der Homepage sichtbar, aber kein Schema → verpasste Featured Snippets |
| `AggregateRating` | ❌ | Google Bewertungen nicht eingebunden → kein Sternchen-Rich-Snippet in SERPs |
| `GeoCoordinates` | ❌ | Standort nicht als Koordinaten hinterlegt |
| `PriceRange` | ❌ | Preisspanne für Local Pack nicht angegeben |

#### Open Graph / Social Meta

| Tag | Status | Detail |
|---|---|---|
| `og:title` | ❌ | Nicht vorhanden auf keiner geprüften Seite |
| `og:description` | ❌ | Nicht vorhanden |
| `og:image` | ❌ | Nicht vorhanden |
| `og:type` | ❌ | Nicht vorhanden |
| `og:url` | ❌ | Nicht vorhanden |
| Twitter Cards | ❌ | Nicht vorhanden |

**Folge:** Beim Teilen der Website-Links auf WhatsApp, Facebook, Instagram erscheint kein Preview-Bild — nur ein kahler Link. Dies schadet Klickraten auf Social-Media massiv.

#### robots.txt & Sitemap

| Element | Status | Detail |
|---|---|---|
| robots.txt | ✅ | `User-agent: *` / `Disallow:` (leer) — alle Inhalte erlaubt |
| Sitemap-Index | ✅ | `sitemap_index.xml` hinterlegt in robots.txt |
| Sitemap-Inhalt | ⚠️ | 43 englische Dummy-Blog-Posts in der Sitemap — schädlich für Crawl-Budget |
| Legal-Seiten in Sitemap | ❌ | `/impressum/` und `/agbs/` in der Sitemap ohne `noindex` — verschwenden Crawl-Budget |

#### Canonical Tags

| Element | Status | Detail |
|---|---|---|
| Canonical Tags | ❌ | Nicht vorhanden auf keiner geprüften Seite (von Yoast normalerweise automatisch gesetzt — deutet auf Plugin-Fehlkonfiguration) |

**Risiko:** Ohne Canonicals kann Google Duplicate Content zwischen HTTP/HTTPS oder mit/ohne trailing slash indexieren.

#### Core Web Vitals (Einschätzung basierend auf Stack)

| Metrik | Zielwert | Einschätzung | Begründung |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s | ❌ Wahrscheinlich > 3.5s | WordPress + Elementor ohne Caching/CDN auf ALL-INKL = langsam. Render-blocking JS (GTM, FB Pixel, GA4). Hero-Bild vermutlich nicht preloaded. |
| **INP** (Interaction to Next Paint) | < 200ms | ⚠️ | Elementor JS-Overhead + jQuery = erhöhte Interaction-Latency |
| **CLS** (Cumulative Layout Shift) | < 0.1 | ⚠️ | Web Fonts von Google (remote) können CLS verursachen wenn nicht font-display konfiguriert |

**Kein CDN, kein Caching-Plugin erkennbar** = signifikante Performance-Nachteile gegenüber neuer Vite/React-Website.

#### Mobile-Optimierung

| Element | Status | Detail |
|---|---|---|
| Responsive Design | ✅ | WordPress/Elementor — grundsätzlich responsive |
| Viewport Meta | ✅ | Standard WordPress |
| Click-to-Call | ✅ | Telefonnummer-Links vorhanden |
| WhatsApp-Button | ✅ | WhatsApp-Link vorhanden |
| Sticky CTA Mobile | ❌ | Kein erkennbarer Sticky CTA nach Scroll |
| Font-Größe Mobile | ⚠️ | Elementor-Standard — nicht optimiert |

#### Defekte Seiten (404-Fehler in Navigation)

| URL | Status | Problem |
|---|---|---|
| `/kursplan/` | ❌ 404 | In Navigation verlinkt, existiert nicht — richtige URL: `/class-timetable/` |
| `/faq/` | ❌ 404 | In Navigation verlinkt, existiert nicht — FAQ ist nur Anker auf Homepage |
| `/kontakt/` | ❌ 404 | In Navigation verlinkt, existiert nicht — Kontakt ist Anker auf Homepage |

**Kritisch:** Wenn Nutzer oder Google-Bot auf diese Links klicken → 404-Fehler. Das schadet sowohl User Experience als auch Crawl-Effizienz.

---

### B. Lokales SEO (HÖCHSTE PRIORITÄT)

#### NAP-Konsistenz (Name, Address, Phone)

| Element | Auf Website | Korrekt | Status |
|---|---|---|---|
| Name | "FITNESS FACTORY HATTINGEN GMBH" (Schema) / "Fitness Factory Hattingen" (Copy) | Inkonsistente Schreibweise | ⚠️ |
| Adresse | Im Vogelsang 95, 45527 Hattingen | Korrekt | ✅ |
| Telefon | 02324 33777 | Korrekt, aber kein `tel:` Schema-Markup im JSON-LD | ⚠️ |
| E-Mail | fitness-factory-hattingen@gmx.de | GMX = unprofessionell, kein Branding | ⚠️ |
| WhatsApp | 0157 37580001 / +49 1573 7580001 | Inkonsistente Formatierung | ⚠️ |

**NAP-Problem:** Der Unternehmensname wird in 3 verschiedenen Formen verwendet:
- Schema: `FITNESS FACTORY HATTINGEN GMBH` (Großbuchstaben, mit GmbH)
- Website-Copy: `Fitness Factory Hattingen`
- Navigation/Logo: `Fitness Factory` (ohne Ortsname)

Google erwartet **exakte Konsistenz** zwischen Website, Google Business Profile und allen Verzeichniseinträgen.

#### Google Business Profile

| Element | Status | Detail |
|---|---|---|
| GBP vorhanden | ⚠️ | Wahrscheinlich vorhanden (GA4 + Google Ads aktiv), aber nicht verifiziert prüfbar |
| Bewertungen | ⚠️ | 5 Bewertungen mit 5★ auf localgymsandfitness.com gefunden (aggregiert von Google). Offizielle Zahl nicht abrufbar |
| GBP in JSON-LD verlinkt | ❌ | Kein `url`-Verweis auf Google Business in Schema |
| Öffnungszeiten im GBP | ⚠️ | Nicht verifizierbar ohne Zugang |
| Fotos im GBP | ⚠️ | Nicht verifizierbar |
| Posts im GBP | ⚠️ | Nicht verifizierbar |

**Empfehlung:** GBP-Optimierung hat von allen lokalen SEO-Maßnahmen den schnellsten ROI für Local Pack Rankings.

#### Lokale Keywords auf der Website

| Keyword | Vorkommen | Status |
|---|---|---|
| "Fitnessstudio Hattingen" | 1× (nur H1 Homepage: "Dein Fitness-Studio in Hattingen") | ❌ Zu wenig, falsche Schreibweise |
| "Gym Hattingen" | 1× (Meta-Description: "das moderne Gym in deiner Nähe") | ❌ Zu wenig |
| "Fitness Hattingen" | Nicht explizit | ❌ |
| "Holthausen" | Nicht gefunden | ❌ Stadtteil fehlt komplett |
| "Bochum-Linden" | Nicht gefunden | ❌ Einzugsgebiet fehlt |
| "Sprockhövel" | Nicht gefunden | ❌ Einzugsgebiet fehlt |
| "Witten" | Nicht gefunden | ❌ Einzugsgebiet fehlt |

**Fazit:** Das Einzugsgebiet ist auf der Website **überhaupt nicht** adressiert. Nutzer aus Bochum-Linden, Witten oder Sprockhövel, die "Fitnessstudio in meiner Nähe" suchen, finden die Fitness Factory nicht.

#### Branchenverzeichnisse — Präsenz-Audit

| Verzeichnis | Gelistet | Status | Aktion |
|---|---|---|---|
| Google Business Profile | Wahrscheinlich ja | ⚠️ | Vollständig optimieren |
| Gelbe Seiten | **Nein** | ❌ | Kostenlosen Eintrag erstellen |
| 11880.com | **Nein** | ❌ | Kostenlosen Eintrag erstellen |
| Eversports | **Nein** | ❌ | Eintrag erstellen (wichtig für Kursbuchung!) |
| Gymsider | Ja | ✅ | Daten prüfen und aktualisieren |
| Fresha | Ja | ✅ | Profil optimieren |
| Sportnavi | Nicht gefunden | ❌ | Eintrag erstellen |
| meinestadt.de | Nicht sicher | ⚠️ | Prüfen und ggf. erstellen |
| Yelp.de | Nicht geprüft | ⚠️ | Prüfen |
| Trustpilot | Nicht vorhanden | ❌ | Niedrige Priorität für Fitnessstudio |
| Creditreform | Ja (automatisch) | ✅ | Kein Handlungsbedarf |

**Kritischer Befund:** Fitness Factory Hattingen ist weder bei **Gelbe Seiten** noch bei **11880** gelistet — das sind zwei der wichtigsten deutschen Branchenverzeichnisse mit direktem Impact auf lokale Google-Rankings. Die Konkurrenz (Fitnessarena Gesundheitswerk, nowifit, EASYFITNESS) ist dort vertreten.

---

### C. Content-SEO

#### Keyword-Verwendung

| Keyword | Einsatz | Status | Verbesserungspotenzial |
|---|---|---|---|
| "Fitnessstudio Hattingen" | Nur in H1 (falsch geschrieben als "Fitness-Studio") | ⚠️ | Title, Meta, H2s, Fließtext |
| "Probetraining Hattingen" | Nicht auf /probetraining/ verwendet | ❌ | H1, Title, Meta der Probetraining-Seite |
| "Mitgliedschaft Hattingen" | Nicht auf /mitgliedschaft/ verwendet | ❌ | H1, Title, Meta der Mitgliedschaft-Seite |
| "Kursplan Hattingen" | Nicht auf /class-timetable/ | ❌ | H1, Title des Kursplans |
| "Sauna Fitnessstudio Hattingen" | Nicht explizit | ❌ | Enormes Long-Tail-Potenzial |
| "Spinning Hattingen" | Nicht SEO-optimiert | ❌ | Kursplan-Seite, Kurs-Unterseiten |

#### Content-Qualität und Tiefe

| Seite | Textmenge | Status | Problem |
|---|---|---|---|
| Homepage `/` | Moderat (FAQ vorhanden, Bewertungen, Kursplan-Teaser) | ⚠️ | Kein lokaler Kontext-Text, kein Einzugsgebiet-Content |
| `/probetraining/` | Gering (Formular + kurze Texte) | ❌ | Keine Beschreibung was im Probetraining passiert, kein Keyword-Text |
| `/mitgliedschaft/` | Gut (alle Preise + Features) | ✅ | Guter Content-Kern, nur Keywords fehlen |
| `/class-timetable/` | Gering (nur Timetable-Widget) | ❌ | Keine Beschreibungstexte zu den Kursen |

#### Blog-Situation

- **43 Dummy-Posts** aus 2019, alle auf Englisch, kein echter Content
- Themen: Generisches Fitness-Marketing-Blabla ohne lokalen Bezug
- **Schaden:** Crawl-Budget-Verschwendung, Duplicate Content Risiko, diluted Themen-Relevanz, englische Sprache schadet deutschem Standort-Signal
- **Empfehlung neue Website:** Blog komplett neu aufbauen mit deutschsprachigem, lokalem Content (z.B. "Fitnessstudio in Hattingen — was sollte man wissen?", "Kursplan Fitness Factory Hattingen: Alle Kurse im Überblick")

#### FAQ für Featured Snippets

- FAQ-Section auf Homepage vorhanden (H2: "Häufig Gestellte Fragen - FAQ") ✅
- **Kein FAQPage-Schema** → Google erkennt die FAQs nicht maschinenlesbar ❌
- Verpasste Chance auf **Featured Snippet / People Also Ask** für Fragen wie "Was kostet ein Fitnessstudio in Hattingen?"

#### Interne Verlinkung

| Element | Status | Detail |
|---|---|---|
| Navigation | ⚠️ | Enthält 3 defekte Links (404) |
| Footer-Links | ✅ | Impressum, AGB, Kündigung korrekt |
| Cross-Linking zwischen Seiten | ❌ | Keine kontextuellen internen Links in Fließtexten |
| Pillar-Page-Struktur | ❌ | Keine Hub-&-Spoke-Struktur für lokale Keywords |

---

### D. Backlink-Profil

| Quelle | Status | Detail |
|---|---|---|
| Gymsider.com | ✅ | Listung vorhanden, Profil-Seite existiert |
| Fresha.com | ✅ | Listung vorhanden (Buchungsplattform) |
| localgymsandfitness.com | ✅ | Listung vorhanden, 5★ Bewertungen aggregiert |
| Facebook | ✅ | facebook.com/fitnessfactoryhattingen |
| Instagram | ✅ | @fitness.factory.hattingen |
| Creditreform | ✅ | Automatischer Firmeneintrag |
| 11880.com | ❌ | Nicht gelistet |
| Gelbe Seiten | ❌ | Nicht gelistet |
| Eversports | ❌ | Nicht gelistet |
| Sportnavi | ❌ | Nicht gefunden |
| Hattingen-erleben.de | ❌ | nowifit ist dort gelistet — FF nicht |
| Lokale Presse (WAZ, Hattingen.de) | ❌ | Keine Erwähnungen gefunden |

**Social Signals:**
- Instagram: @fitness.factory.hattingen — aktiv, 1.447 Follower
- Facebook: /fitnessfactoryhattingen — 444 Likes (niedrig für lokales Geschäft)
- Kein TikTok, kein YouTube-Kanal erkennbar

**Bewertungs-Bilanz:**
- Google Maps: Exakte Zahl nicht öffentlich abrufbar, aber Einzelaggregation zeigt 5★ bei 5 Bewertungen auf einer Drittplattform — Hinweis auf geringe Google-Bewertungszahl
- Keine aktive Bewertungsstrategie erkennbar (kein Review-Widget, kein "Jetzt bewerten"-CTA auf Website)

---

## 3. Top 5 Quick Wins

### Quick Win 1 — Title-Tags korrigieren (Impact: ★★★★★ | Aufwand: 30 Min)

Yoast SEO in WordPress öffnen → Für jede Seite den SEO-Titel manuell setzen:

- **Homepage:** `Fitnessstudio Hattingen | Sauna + Kurse ab 35€ – Fitness Factory`
- **Probetraining:** `Kostenloses Probetraining Hattingen | Fitness Factory buchen`
- **Mitgliedschaft:** `Mitgliedschaft Fitnessstudio Hattingen ab 35€ | Fitness Factory`
- **Kursplan:** `Kursplan Fitnessstudio Hattingen | Spinning, Yoga, Zumba & mehr`

**Warum sofort:** Google aktualisiert SERPs innerhalb von 24–72h nach Re-Crawl. Kein einziges Keyword im Title = kein Ranking. Das ist das größte einzelne SEO-Leck.

### Quick Win 2 — 404-Fehler in Navigation fixen (Impact: ★★★★☆ | Aufwand: 15 Min)

Navigation im WordPress Menü korrigieren:
- `/kursplan/` → `/class-timetable/` (oder Weiterleitungen einrichten)
- `/faq/` → `/#faq` (Anker auf Homepage)
- `/kontakt/` → `/#nachricht` (Anker auf Homepage)

**Warum sofort:** 404-Fehler in der Hauptnavigation = Google Bot erreicht diese "Seiten" nicht + User verlassen die Website.

### Quick Win 3 — Gelbe Seiten + 11880 Einträge erstellen (Impact: ★★★★★ | Aufwand: 1h)

Kostenlose Einträge erstellen auf:
1. **gelbeseiten.de** → Kategorie "Fitnessstudio", exakte NAP-Daten
2. **11880.com** → Kategorie "Fitnessstudio", exakte NAP-Daten

NAP exakt: `Fitness Factory Hattingen | Im Vogelsang 95, 45527 Hattingen | 02324 33777`

**Warum sofort:** Konkurrenten (Gesundheitswerk, nowifit, EASYFITNESS) sind gelistet. Fitness Factory fehlt. Jeder Verzeichniseintrag = ein lokaler Backlink + lokales SEO-Signal für Google Local Pack.

### Quick Win 4 — HealthClub JSON-LD zur Homepage hinzufügen (Impact: ★★★★★ | Aufwand: 30 Min)

Vollständiges `HealthClub`-Schema via Yoast Custom Schema oder als `<script>` im Theme einfügen (siehe Abschnitt 7 für kompletten Code). Dies teilt Google maschinenlesbar mit:
- Was die Fitness Factory ist (Unternehmenstyp)
- Wo sie ist (Koordinaten + Adresse)
- Wann sie offen hat
- Was sie kostet
- Wie sie bewertet wird

**Warum sofort:** Ohne `HealthClub` / `LocalBusiness` Schema fehlt Google das wichtigste Ranking-Signal für lokale Suchanfragen.

### Quick Win 5 — Google Business Profile vollständig ausfüllen & optimieren (Impact: ★★★★★ | Aufwand: 2h)

Checkliste für GBP:
- [ ] Alle Kategorien: Primär "Fitnessstudio", Sekundär "Sportanlage", "Gesundheitszentrum"
- [ ] Beschreibung mit Keywords: "Familiäres Fitnessstudio in Hattingen mit Sauna, Getränkeflat und Kursen ab 35€/Monat"
- [ ] Alle Fotos hochladen (Geräte, Sauna, Kurse, Team, Außenansicht) — mind. 10 Fotos
- [ ] Öffnungszeiten exakt hinterlegen
- [ ] "Produkte" hinzufügen: Flex, Standard, Premium Mitgliedschaft
- [ ] "Leistungen" hinzufügen: Sauna, Kursangebot, Ernährungsberatung
- [ ] Erste Google-Bewertungen aktiv anfragen (QR-Code im Studio + WhatsApp an Bestandsmitglieder)
- [ ] GBP-Posts erstellen (Aktionen, Kursplan-Änderungen)

**Warum sofort:** Lokale Pack Rankings (die Karte + 3 Einträge bei "Fitnessstudio Hattingen") werden primär durch GBP-Optimierung + Reviews beeinflusst.

---

## 4. Vollständige Keyword-Map

### Primärkeywords — nach Suchvolumen & Relevanz

| Seite | Primärkeyword | Monatl. Suchvolumen (geschätzt) | Schwierigkeit |
|---|---|---|---|
| Homepage `/` | Fitnessstudio Hattingen | 600–900/Monat | Mittel |
| Homepage `/` | Gym Hattingen | 200–400/Monat | Niedrig |
| Homepage `/` | Fitness Hattingen | 300–500/Monat | Niedrig |
| `/probetraining/` | Probetraining Fitnessstudio Hattingen | 50–150/Monat | Niedrig |
| `/mitgliedschaft/` | Fitnessstudio Hattingen Mitgliedschaft | 50–100/Monat | Niedrig |
| `/class-timetable/` (→ umbenennen) | Fitnesskurse Hattingen | 100–250/Monat | Niedrig |

### Sekundärkeywords — ergänzend auf Hauptseiten

| Seite | Sekundärkeywords |
|---|---|
| Homepage | Fitnessstudio Holthausen, Sauna Fitnessstudio Hattingen, Fitness Holthausen, Gym Holthausen |
| `/probetraining/` | Kostenloses Probetraining Hattingen, Probetraining Fitnessstudio kostenlos, Probetraining Gym Hattingen |
| `/mitgliedschaft/` | Fitnessstudio Hattingen Preise, Fitness Mitgliedschaft Hattingen, günstiges Fitnessstudio Hattingen |
| `/class-timetable/` | Spinning Hattingen, Yoga Hattingen, Zumba Hattingen, Fitnesskurse Holthausen, Tabata Hattingen, Pilates Hattingen |

### Long-Tail Keywords — neue Seiten oder Blog-Content

| Long-Tail Keyword | Suchintention | Empfohlene Seite |
|---|---|---|
| Fitnessstudio Hattingen Holthausen | Lokal-navigational | Homepage / Über-uns |
| kostenloses Probetraining Hattingen | Transaktional | `/probetraining/` |
| bestes Fitnessstudio Hattingen | Informational/Transaktional | Homepage + Blog-Artikel |
| Gym in der Nähe Hattingen | Navigational | Homepage (mit "in der Nähe"-Formulierung) |
| günstiges Fitnessstudio Hattingen | Transaktional | `/mitgliedschaft/` |
| Fitnessstudio Hattingen mit Sauna | Transaktional | Homepage + `/mitgliedschaft/` |
| Fitnessstudio Hattingen 24 Stunden | Informational | FAQ |
| Yoga Kurs Hattingen | Transaktional | `/class-timetable/` + eigene Yoga-Seite |
| Spinning Kurs Hattingen | Transaktional | `/class-timetable/` + eigene Spinning-Seite |
| Fitnessstudio Hattingen Bochum | Geo-expansion | Blog / Landingpage Einzugsgebiet |
| Fitnessstudio Sprockhövel | Geo-expansion | Blog / Landingpage Einzugsgebiet |
| Fitnessstudio Witten Hattingen | Geo-expansion | Blog / Landingpage Einzugsgebiet |
| Fitnessstudio mit Ernährungsberatung Hattingen | Transaktional | `/mitgliedschaft/` + eigene Seite |
| Fitness Factory Hattingen Bewertungen | Branded | Homepage (Reviews-Section) |
| Fitness Factory Hattingen Preise | Branded | `/mitgliedschaft/` |
| Fremdgeh Aktion Fitnessstudio Hattingen | Transaktional | `/mitgliedschaft/` |
| Fitnessstudio kündigen Hattingen wechseln | Transaktional | `/probetraining/` (Fremdgeh-Aktion) |
| Fitnessstudio Hattingen Öffnungszeiten | Informational | Homepage Footer / FAQ |

### Einzugsgebiet-Keywords (neue Seiten empfohlen)

| Keyword | Zielseite |
|---|---|
| Fitnessstudio Bochum Linden | Neue Landingpage `/fitnessstudio-bochum-linden/` |
| Gym Sprockhövel | Neue Landingpage `/fitnessstudio-sprockhoevel/` |
| Fitnessstudio Witten | Neue Landingpage `/fitnessstudio-witten/` |
| Fitnessstudio Blankenstein | Neue Landingpage `/fitnessstudio-blankenstein/` |

---

## 5. Konkrete Title-Tag Vorschläge

### Regel: 50–60 Zeichen optimal, max. 65 Zeichen vor Abschneiden

| Seite | Title-Vorschlag | Zeichen |
|---|---|---|
| `/` (Homepage) | `Fitnessstudio Hattingen · Sauna, Kurse, ab 35€` | 48 |
| `/` (Alternative) | `Fitness Factory Hattingen – Gym mit Sauna ab 35€` | 50 |
| `/probetraining/` | `Kostenloses Probetraining in Hattingen buchen` | 47 |
| `/probetraining/` (Alternative) | `Probetraining Fitnessstudio Hattingen – Jetzt anmelden` | 54 |
| `/mitgliedschaft/` | `Mitgliedschaft Fitnessstudio Hattingen ab 35€/Monat` | 51 |
| `/mitgliedschaft/` (Alternative) | `Preise & Tarife – Fitnessstudio Hattingen` | 42 |
| `/class-timetable/` (umbenennen zu `/kursplan/`) | `Kursplan Fitnessstudio Hattingen – Spinning, Yoga & mehr` | 55 |
| `/impressum/` | `Impressum – Fitness Factory Hattingen GmbH` | 43 |
| `/agbs/` | `AGB & Datenschutz – Fitness Factory Hattingen` | 47 |
| `/kuendigung/` | `Kündigung – Fitness Factory Hattingen` | 39 |

**Empfehlung:** Einheitliches Format für alle Seiten: `[Seiten-Keyword] [–/·] [Fitness Factory Hattingen]`

---

## 6. Konkrete Meta-Description Vorschläge

### Regel: 150–160 Zeichen optimal (inkl. Leerzeichen)

| Seite | Meta-Description Vorschlag | Zeichen |
|---|---|---|
| `/` (Homepage) | `Dein Fitnessstudio in Hattingen mit Sauna, 17 Kursen & Getränkeflat – alles inklusive ab 35€/Monat. Probetraining kostenlos buchen!` | 131 |
| `/` (Alternative) | `Familiäres Fitnessstudio in Hattingen-Holthausen. Sauna, Kurse, Ernährungsberatung & Parkplatz inklusive. Ab 35€/Monat – jetzt Probetraining sichern!` | 151 |
| `/probetraining/` | `Kostenloses Probetraining bei Fitness Factory Hattingen – einfach online anmelden, reinschnuppern und unverbindlich ausprobieren. Jetzt Termin sichern!` | 153 |
| `/mitgliedschaft/` | `Fitnessstudio Hattingen ab 35€/Monat: Sauna, 17 Fitnesskurse, Getränkeflat & Ernährungsberatung inklusive. Flex, Standard und Premium – jetzt Mitglied werden!` | 161 |
| `/class-timetable/` | `Kursplan Fitnessstudio Hattingen: Spinning, Yoga, Zumba, Tabata, Pilates & mehr – 17 Live-Kurse pro Woche inklusive in jeder Mitgliedschaft. Jetzt entdecken!` | 157 |
| `/impressum/` | `Impressum der Fitness Factory Hattingen GmbH – Im Vogelsang 95, 45527 Hattingen. Angaben gemäß § 5 TMG.` | 107 |
| `/agbs/` | `Allgemeine Geschäftsbedingungen und Datenschutzerklärung der Fitness Factory Hattingen GmbH.` | 93 |
| `/kuendigung/` | `Mitgliedschaft kündigen bei Fitness Factory Hattingen – nutze unser Online-Kündigungsformular. Alternativ rufe uns an: 02324 33777.` | 132 |

---

## 7. JSON-LD Schema Templates für die neue Website

### 7.1 HealthClub / LocalBusiness Schema (Haupt-Schema — auf JEDER Seite einbinden)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["HealthClub", "LocalBusiness"],
  "@id": "https://fitness-factory-hattingen.de/#healthclub",
  "name": "Fitness Factory Hattingen",
  "alternateName": "Fitness Factory Hattingen GmbH",
  "description": "Familiäres Fitnessstudio in Hattingen mit Sauna, 17 Fitnesskursen pro Woche, Getränkeflat und persönlicher Ernährungsberatung – alles inklusive ab 35€ pro Monat.",
  "url": "https://fitness-factory-hattingen.de/",
  "telephone": "+49-2324-33777",
  "email": "fitness-factory-hattingen@gmx.de",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Im Vogelsang 95",
    "addressLocality": "Hattingen",
    "addressRegion": "Nordrhein-Westfalen",
    "postalCode": "45527",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.3920,
    "longitude": 7.1850
  },
  "hasMap": "https://maps.google.com/?q=Fitness+Factory+Hattingen+Im+Vogelsang+95+45527+Hattingen",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "23:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "10:00",
      "closes": "17:30"
    }
  ],
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, EC Card, Credit Card",
  "logo": {
    "@type": "ImageObject",
    "url": "https://fitness-factory-hattingen.de/wp-content/uploads/2023/10/ff-jpg-logo.jpg",
    "width": 512,
    "height": 512
  },
  "image": [
    "https://fitness-factory-hattingen.de/wp-content/uploads/2023/10/ff-jpg-logo.jpg"
  ],
  "sameAs": [
    "https://www.facebook.com/fitnessfactoryhattingen",
    "https://www.instagram.com/fitness.factory.hattingen"
  ],
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Sauna",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Getränkeflat",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Parkplatz",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Duschen",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Fitnesskurse",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Ernährungsberatung",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Trainingsberatung",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "WLAN",
      "value": true
    }
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+49-2324-33777",
      "contactType": "customer service",
      "availableLanguage": "German"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+49-1573-7580001",
      "contactType": "customer service",
      "contactOption": "WhatsApp",
      "availableLanguage": "German"
    }
  ],
  "founder": {
    "@type": "Person",
    "name": "Alexander Stöcker"
  },
  "legalName": "Fitness Factory Hattingen GmbH",
  "vatID": "DE319398653",
  "taxID": "DE319398653",
  "areaServed": [
    {
      "@type": "City",
      "name": "Hattingen"
    },
    {
      "@type": "City",
      "name": "Sprockhövel"
    },
    {
      "@type": "City",
      "name": "Witten"
    },
    {
      "@type": "City",
      "name": "Bochum"
    }
  ],
  "offers": [
    {
      "@type": "Offer",
      "name": "Flex Mitgliedschaft",
      "description": "Monatlich kündbares Fitness-Abonnement inkl. Sauna, Kurse, Getränkeflat",
      "price": "55.00",
      "priceCurrency": "EUR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "55.00",
        "priceCurrency": "EUR",
        "unitText": "Monat"
      }
    },
    {
      "@type": "Offer",
      "name": "Standard Mitgliedschaft (12 Monate)",
      "description": "12-Monats-Mitgliedschaft inkl. Sauna, Kurse, Getränkeflat",
      "price": "45.00",
      "priceCurrency": "EUR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "45.00",
        "priceCurrency": "EUR",
        "unitText": "Monat"
      }
    },
    {
      "@type": "Offer",
      "name": "Premium Mitgliedschaft (24 Monate)",
      "description": "24-Monats-Mitgliedschaft inkl. Sauna, Kurse, Getränkeflat – günstigster Monatspreis",
      "price": "35.00",
      "priceCurrency": "EUR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "35.00",
        "priceCurrency": "EUR",
        "unitText": "Monat"
      }
    }
  ]
}
</script>
```

### 7.2 FAQPage Schema (auf Homepage einbinden — bei der FAQ-Section)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was kostet eine Mitgliedschaft bei Fitness Factory Hattingen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Mitgliedschaft bei Fitness Factory Hattingen kostet je nach Laufzeit: Flex (monatlich kündbar) 55€/Monat, Standard (12 Monate) 45€/Monat oder Premium (24 Monate) 35€/Monat. Einmalige Anmeldegebühr: 49€. Sauna, Kurse, Getränkeflat, Ernährungsberatung und Parkplatz sind in allen Tarifen inklusive."
      }
    },
    {
      "@type": "Question",
      "name": "Kann ich das Fitnessstudio kostenlos testen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja! Fitness Factory Hattingen bietet ein kostenloses Probetraining an. Einfach online anmelden oder unter 02324 33777 anrufen. Du kannst das Studio unverbindlich kennenlernen – ohne Vertrag, ohne Verpflichtung."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Kurse werden bei Fitness Factory Hattingen angeboten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fitness Factory Hattingen bietet 17 Live-Kurse pro Woche an: Vinyasa-Yoga, Spinning, Wirbelsäulen-Gymnastik (Montag), Bauch-Express, Spinning (Dienstag), Tabata, Yoga (Mittwoch), Tae-Bo, Spinning (Donnerstag), Rücken-Fit, Zumba (Freitag) sowie Spinning, Full Body Intervall und Pilates (Sonntag). Alle Kurse sind in jeder Mitgliedschaft inklusive."
      }
    },
    {
      "@type": "Question",
      "name": "Wann ist das Fitnessstudio in Hattingen geöffnet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fitness Factory Hattingen ist montags bis freitags von 08:00 bis 23:00 Uhr geöffnet. Samstags und sonntags sind die Öffnungszeiten von 10:00 bis 17:30 Uhr."
      }
    },
    {
      "@type": "Question",
      "name": "Ist Sauna im Mitgliedsbeitrag enthalten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja! Der kostenlose Saunazugang ist in allen Mitgliedschafts-Tarifen bei Fitness Factory Hattingen inklusive – egal ob Flex, Standard oder Premium. Ebenso enthalten: Getränkeflat, alle Live-Kurse, Ernährungsberatung, Trainingsplan, Duschen und kostenlose Parkplätze."
      }
    },
    {
      "@type": "Question",
      "name": "Gibt es Parkplätze am Fitnessstudio in Hattingen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, an der Fitness Factory Hattingen (Im Vogelsang 95, 45527 Hattingen) stehen kostenlose Parkplätze für alle Mitglieder zur Verfügung. Kein Parkplatzstress!"
      }
    },
    {
      "@type": "Question",
      "name": "Wie kann ich bei Fitness Factory Hattingen Mitglied werden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Am einfachsten buchst du ein kostenloses Probetraining online auf unserer Website. Alternativ kannst du einfach ins Studio vorbeikommen (Im Vogelsang 95, 45527 Hattingen), uns anrufen (02324 33777) oder uns auf WhatsApp schreiben (+49 1573 7580001)."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist die Fremdgeh-Aktion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Fremdgeh-Aktion ermöglicht es dir, die Fitness Factory Hattingen bis zu 3 Monate lang kostenlos (0€/Monat) zu testen, wenn du bereits Mitglied in einem anderen Fitnessstudio bist. Du bezahlst lediglich die einmalige Anmeldegebühr von 49€ und wechselst danach in einen 12- oder 24-Monats-Vertrag. Perfekt wenn du dein aktuelles Studio verlassen möchtest!"
      }
    },
    {
      "@type": "Question",
      "name": "Wo befindet sich das Fitnessstudio Fitness Factory Hattingen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fitness Factory Hattingen befindet sich in Im Vogelsang 95, 45527 Hattingen (Stadtteil Holthausen). Das Studio ist gut erreichbar aus Hattingen, Bochum-Linden, Sprockhövel und Witten. Kostenlose Parkplätze direkt am Studio."
      }
    },
    {
      "@type": "Question",
      "name": "Gibt es eine Ernährungsberatung im Fitnessstudio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja! Ernährungsberatung und ein individueller Trainingsplan sind in allen Mitgliedschafts-Tarifen bei Fitness Factory Hattingen kostenlos inklusive. Du bekommst von Beginn an professionelle Unterstützung."
      }
    },
    {
      "@type": "Question",
      "name": "Kann ich monatlich kündigen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, der Flex-Tarif (55€/Monat) ist monatlich kündbar. Für langfristige Planungen gibt es den Standard-Tarif (12 Monate, 45€/Monat) und den Premium-Tarif (24 Monate, 35€/Monat) mit günstigeren Monatsbeiträgen."
      }
    },
    {
      "@type": "Question",
      "name": "Bietet Fitness Factory Hattingen Kurse für Anfänger an?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolut! Fitness Factory Hattingen ist ein familiäres Studio, das alle willkommen heißt – unabhängig von Alter, Fitnesslevel oder Figur. Alle Kurse (Yoga, Rücken-Fit, Wirbelsäulen-Gymnastik, Bauch-Express etc.) sind anfängerfreundlich. Unser Team berät dich gerne beim Einstieg."
      }
    },
    {
      "@type": "Question",
      "name": "Wie kontaktiere ich Fitness Factory Hattingen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fitness Factory Hattingen ist erreichbar per Telefon (02324 33777), WhatsApp (+49 1573 7580001) und E-Mail (fitness-factory-hattingen@gmx.de). Du kannst auch einfach vorbeikommen: Im Vogelsang 95, 45527 Hattingen."
      }
    },
    {
      "@type": "Question",
      "name": "Gibt es ein Fitnessstudio mit Sauna in Hattingen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja! Fitness Factory Hattingen bietet kostenlosen Saunazugang für alle Mitglieder – inklusive in jedem Tarif. Das macht uns zu einer der wenigen All-inclusive-Optionen in Hattingen."
      }
    },
    {
      "@type": "Question",
      "name": "Was unterscheidet Fitness Factory Hattingen von anderen Studios?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fitness Factory Hattingen bietet ein einzigartiges All-inclusive-Konzept: Sauna, 17 Live-Kurse pro Woche, Getränkeflat, Ernährungsberatung, Trainingsplan und kostenlose Parkplätze – alles im Monatsbeitrag enthalten. Dazu eine familiäre Atmosphäre, in der du persönlich betreut wirst – keine anonyme Massenabfertigung."
      }
    }
  ]
}
</script>
```

### 7.3 OpeningHoursSpecification (separat, alternativ in HealthClub-Schema integriert)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://fitness-factory-hattingen.de/#localbusiness",
  "name": "Fitness Factory Hattingen",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Monday",
      "opens": "08:00",
      "closes": "23:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Tuesday",
      "opens": "08:00",
      "closes": "23:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Wednesday",
      "opens": "08:00",
      "closes": "23:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Thursday",
      "opens": "08:00",
      "closes": "23:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Friday",
      "opens": "08:00",
      "closes": "23:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "17:30"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "10:00",
      "closes": "17:30"
    }
  ]
}
</script>
```

### 7.4 AggregateRating Schema (sobald Bewertungszahlen aus GBP bekannt)

```json
{
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "reviewCount": "87",
  "bestRating": "5",
  "worstRating": "1"
}
```

**Hinweis:** Dieses Schema wird in das HealthClub-Schema integriert (als Property). Die Zahlen müssen durch den tatsächlichen Google-Business-Stand ersetzt werden. Nie Fake-Bewertungen eintragen — das führt zu Google-Penalties.

### 7.5 WebPage Schema — Probetraining (Seiten-spezifisch)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://fitness-factory-hattingen.de/probetraining/#webpage",
  "url": "https://fitness-factory-hattingen.de/probetraining/",
  "name": "Kostenloses Probetraining in Hattingen buchen",
  "description": "Kostenloses Probetraining bei Fitness Factory Hattingen – online anmelden und unverbindlich testen.",
  "isPartOf": {
    "@id": "https://fitness-factory-hattingen.de/#website"
  },
  "about": {
    "@id": "https://fitness-factory-hattingen.de/#healthclub"
  },
  "inLanguage": "de-DE",
  "potentialAction": {
    "@type": "ReserveAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://fitness-factory-hattingen.de/probetraining/",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    },
    "result": {
      "@type": "Reservation",
      "name": "Probetraining Fitness Factory Hattingen"
    }
  }
}
</script>
```

---

## 8. Lokale SEO Maßnahmen-Plan

### Sofort (Woche 1)

| # | Maßnahme | Aufwand | Impact |
|---|---|---|---|
| 1 | Title-Tags aller Seiten via Yoast konfigurieren | 30 Min | ★★★★★ |
| 2 | Meta-Descriptions aller Seiten via Yoast eintragen | 30 Min | ★★★★☆ |
| 3 | 404-Fehler in Navigation fixen (3 Links) | 15 Min | ★★★★☆ |
| 4 | HealthClub JSON-LD in WordPress einfügen | 30 Min | ★★★★★ |
| 5 | FAQPage JSON-LD in WordPress einfügen | 30 Min | ★★★★☆ |
| 6 | Eintrag auf Gelbe Seiten erstellen | 30 Min | ★★★★★ |
| 7 | Eintrag auf 11880.com erstellen | 30 Min | ★★★★★ |

### Kurzfristig (Woche 2–4)

| # | Maßnahme | Aufwand | Impact |
|---|---|---|---|
| 8 | Google Business Profile vollständig ausfüllen | 2h | ★★★★★ |
| 9 | GBP-Fotos hochladen (mind. 10 professionelle Fotos) | 1h | ★★★★☆ |
| 10 | GBP-Produkte & Leistungen anlegen | 1h | ★★★★☆ |
| 11 | Erste 10 Google Bewertungen aktiv anfragen | 2h | ★★★★★ |
| 12 | Alle Bilder umbenennen und Alt-Texte vergeben | 2h | ★★★☆☆ |
| 13 | H1 auf /class-timetable/ auf Deutsch ändern | 15 Min | ★★★☆☆ |
| 14 | H1 auf /probetraining/ korrigieren | 15 Min | ★★★☆☆ |
| 15 | NAP auf allen Seiten einheitlich formulieren | 1h | ★★★★☆ |
| 16 | Open Graph Tags via Yoast Social-Einstellungen | 30 Min | ★★★☆☆ |

### Mittelfristig (Monat 2–3)

| # | Maßnahme | Aufwand | Impact |
|---|---|---|---|
| 17 | Blog-Posts (43 Dummy) löschen oder noindex setzen | 1h | ★★★★☆ |
| 18 | 5 lokale Blog-Artikel auf Deutsch schreiben | 5h | ★★★★☆ |
| 19 | Eversports-Eintrag erstellen und Kurse listen | 2h | ★★★★☆ |
| 20 | Einzugsgebiet-Content auf Homepage integrieren | 2h | ★★★☆☆ |
| 21 | Impressum + AGBs auf noindex setzen | 15 Min | ★★★☆☆ |
| 22 | Canonical Tags global via Yoast konfigurieren | 15 Min | ★★★☆☆ |
| 23 | Monatliche GBP-Posts (Aktionen, Kursplan) | 1h/Monat | ★★★★☆ |
| 24 | Bewertungsstrategie: QR-Code im Studio + WhatsApp-Kampagne | 2h Setup | ★★★★★ |

### Langfristig (neue Website — ab Phase 2)

| # | Maßnahme | Detail |
|---|---|---|
| 25 | Einzugsgebiet-Landingpages erstellen | Bochum-Linden, Sprockhövel, Witten, Blankenstein |
| 26 | Kurs-Unterseiten erstellen | Je eine SEO-optimierte Seite pro Kurs (Spinning, Yoga, Zumba etc.) |
| 27 | Review-Widget integrieren | Google Bewertungen automatisch auf Website anzeigen |
| 28 | LocalBusiness + FAQPage + Breadcrumb automatisch generieren | React-Komponente mit JSON-LD pro Seite |
| 29 | Core Web Vitals optimieren | LCP < 2.0s, INP < 150ms, CLS < 0.05 |
| 30 | Sitelinks Search Box behalten | WebSite-Schema mit SearchAction |

---

## 9. Priorisierte Empfehlungen

### HOCH — Sofortiger Handlungsbedarf (Woche 1)

| Empfehlung | Geschätzter Impact | Begründung |
|---|---|---|
| **Title-Tags komplett überarbeiten** | +40–60% CTR aus organischer Suche | Kein einziger Title enthält das Hauptkeyword. Google kann nicht ranken, was es nicht versteht. |
| **HealthClub JSON-LD einbinden** | +30% lokale Sichtbarkeit | Ohne strukturierte Daten ist Google blind für Unternehmenstyp, Öffnungszeiten und Angebot |
| **Gelbe Seiten + 11880 Einträge** | Neue Backlinks + lokales Trust-Signal | Konkurrenz ist dort präsent, Fitness Factory fehlt komplett |
| **404-Fehler in Navigation beheben** | User Experience + Crawlbarkeit | 3 defekte Links in der Hauptnavigation = Google-Bot-Sackgasse |
| **GBP vollständig optimieren** | Local Pack Ranking | Local Pack ist wichtigster Traffic-Kanal für lokale Suchen |

### MITTEL — Kurzfristiger Handlungsbedarf (Monat 1–2)

| Empfehlung | Geschätzter Impact | Begründung |
|---|---|---|
| **Meta-Descriptions eintragen** | +15–25% CTR | Google generiert zufällige Snippets, wenn keine Meta-Description vorhanden |
| **FAQPage Schema hinzufügen** | Featured Snippet Chance | FAQ ist vorhanden aber nicht maschinenlesbar — verpasste People Also Ask Einträge |
| **H1-Tags auf allen Unterseiten korrigieren** | Content-Relevanz-Signal | Keyword-Kannibalisierung zwischen /probetraining/ und /mitgliedschaft/ |
| **Alt-Texte für alle Bilder vergeben** | Barrierefreiheit + Image SEO | 12+ Bilder ohne Alt-Text = Google Image Search Ausfall |
| **Bewertungsstrategie starten** | AggregateRating Schema + Vertrauen | Wenige öffentliche Bewertungen sichtbar — Wettbewerber haben mehr |
| **Blog-Dummy-Posts entfernen** | Crawl-Budget-Effizienz | 43 englische Posts dilute lokale Relevanz und verschwenden Crawling-Ressourcen |

### NIEDRIG — Mittelfristige Optimierung (Monat 2–6)

| Empfehlung | Geschätzter Impact | Begründung |
|---|---|---|
| **Open Graph Tags konfigurieren** | Social-Media-Klickraten | Kein Preview-Bild bei WhatsApp-/Facebook-Sharing aktuell |
| **Einzugsgebiet-Content hinzufügen** | +15% Reichweite regional | Nutzer aus Bochum-Linden, Witten, Sprockhövel werden nicht angesprochen |
| **Kurs-Unterseiten erstellen** | Long-Tail Rankings | "Spinning Hattingen", "Yoga Hattingen" — je eigene Seite pro Kurs |
| **Legal-Seiten auf noindex setzen** | Crawl-Budget optimieren | Impressum/AGB brauchen kein Ranking |
| **/class-timetable/ zu /kursplan/ umbenennen** | URL-Keyword-Signal | Deutsche URL = deutsches Keyword-Signal (301 Redirect einrichten) |
| **E-Mail-Adresse professionalisieren** | Vertrauen + Impressum | GMX-Adresse wirkt unprofessionell — eigene Domain empfohlen |

---

## 10. Wettbewerbssituation — Zusammenfassung

### Direkte Konkurrenz in Hattingen

| Studio | SEO-Stärken | Schwächen |
|---|---|---|
| **Fitnessarena Gesundheitswerk** | Öffnet 06:30h, "Studio Nr.1"-Claim, Gelbe Seiten gelistet, 11880 gelistet | Website veraltet (gesundheitswerk.net), keine mobile-first Strategie erkennbar |
| **nowifit sports & vitality** | Premium-Positionierung, EGYM-Technologie, Sportnavi gelistet, Hattingen-Erleben gelistet | Teurer, kein All-inclusive, keine Sauna |
| **EASYFITNESS Hattingen** | Ketten-Backlinks (200+ Standorte), hohe Google-Sichtbarkeit durch Marke | Kein familiäres Feeling, kein Sauna, No-frills Konzept |
| **empa.fit** | 4.94★ bei 35 Bewertungen — stärkste Online-Reputation im Verzeichnis | EMS-Studio, anderes Konzept, kein direkter Wettbewerber |

### Differenzierungs-Chance für Fitness Factory

Fitness Factory hat das **überzeugendste Angebot** (All-inclusive: Sauna + Kurse + Getränke + Beratung + Parkplatz) aber die **schlechteste Online-Sichtbarkeit**. Das ist die größte Chance: Das Produkt stimmt — es muss nur gefunden werden.

**Umsetzbare Differenzierung in SEO/Content:**
1. "All-inklusive Fitnessstudio Hattingen" — kein Wettbewerber kommuniziert das so klar
2. "Fitnessstudio mit Sauna Hattingen" — Unique Feature, das Ketten nicht bieten
3. Familiäre Atmosphäre + persönliche Betreuung — emotionaler Differenziator

---

*Analyse erstellt auf Basis von: Live-WebFetch aller 4 Hauptseiten + robots.txt + sitemap_index.xml + WebSearch für Wettbewerb und Verzeichnisse (Stand: 2026-04-01)*
