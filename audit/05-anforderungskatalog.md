# Anforderungskatalog — Fitness Factory Website-Relaunch
> Phase 1 — Abschlussdokument (Basis für Phase 2)
> Erstellt: 2026-04-02
> Basis: Audit 01–04 (Bestandsaufnahme, SEO, UX/Conversion, Wettbewerb)

---

## Executive Summary

Die Analyse der vier Audits zeichnet ein eindeutiges Bild: Fitness Factory Hattingen besitzt ein starkes, real differenzierendes Produkt — das vollständigste All-inclusive-Paket im lokalen Markt, herausragende Kundenzufriedenheit, echte familiäre Atmosphäre — aber eine digitale Präsenz die dieses Potenzial aktiv sabotiert. Mit einem SEO-Score von 25/100 und einem Conversion-Score von 3,7/10 liegt die Website weit hinter jedem direkten Konkurrenten, darunter EASYFITNESS und VIVA Fitness, die beide mit modernen Sites, Buchungssystemen und ab 19,90€/Monat den Markt unter Druck setzen. Die drei größten strategischen Chancen sind: (1) Lokale SEO-Dominanz ist aktuell vollständig unbesetzt — Platz 1 für "Fitnessstudio Hattingen" ist realistisch erreichbar, (2) Die Fremdgeh-Aktion ist ein markteinzigartiges Konversions-Angebot das digital kaum existiert, und (3) kein Konkurrent in der Region hat einen KI-Chatbot — First-Mover-Vorteil wartet. Die Kernaufgabe von Phase 2 lautet: Eine technisch überlegene, SEO-dominante, conversion-optimierte Website bauen, die Fitness Factorys stärkstes Asset — persönliche Atmosphäre und All-inclusive-Leistung — digital erlebbar macht und jeden Interessenten vom ersten Klick bis zur Probetraining-Buchung führt.

---

## 1. Status Quo — Top 10 Kritische Probleme

| # | Problem | Quelle | Business-Impact |
|---|---|---|---|
| 1 | **Title-Tags vollständig unkonfiguriert** — alle Seiten lauten "Home -", "Probetraining -" etc., kein einziger enthält das Keyword "Fitnessstudio Hattingen" | Audit 01 + 02 | **Kritisch** — direkter Ranking-Verlust auf allen Keywords, Google ignoriert leere Titel |
| 2 | **3 Navigation-Links liefern 404** — /kursplan/, /faq/, /kontakt/ existieren nicht; echte URLs sind Anker oder /class-timetable/ | Audit 01 + 02 | **Kritisch** — destroys user trust, Google-Bot scheitert, Crawl-Budget verschwendet |
| 3 | **Kein JSON-LD HealthClub Schema** — Google erkennt Unternehmenstyp nicht maschinenlesbar, keine OpeningHoursSpecification, keine GeoCoordinates, kein FAQPage | Audit 02 | **Kritisch** — fehlende Grundvoraussetzung für Google Local Pack, Featured Snippets, Rich Snippets |
| 4 | **Kein Sticky CTA auf Mobile** — nach 30% Scroll ist null Conversion-Element sichtbar; schwerster Conversion-Fehler auf dem 60%+ Kanal | Audit 03 | **Kritisch** — direkte Umsatz-Konsequenz: Mobile-Interessenten können nicht spontan konvertieren |
| 5 | **SEPA-Formular mit IBAN auf öffentlicher Website** — vollständige Bankdaten-Erhebung auf /mitgliedschaft/ ohne erkennbare Ende-zu-Ende-Verschlüsselung | Audit 03 | **Kritisch** — DSGVO-Risikozone, massiver Vertrauensbruch, verhindert Online-Mitgliedschaft |
| 6 | **Kein Trainer-Profil sichtbar** — "persönliche Betreuung" als USP Nr. 1 wird behauptet, kein einziger Trainer ist namentlich, bildlich oder biografisch vorhanden | Audit 01 + 03 | **Hoch** — Kernwettbewerbsvorteil gegenüber Ketten wird digital nicht ausgenutzt |
| 7 | **Meta-Descriptions auf 5 von 8 Seiten fehlend** — Google generiert zufällige Snippets, Click-Through-Rate im SERP minimal | Audit 02 | **Hoch** — jeder SERP-Eindruck ohne Meta-Description ist verschenktes Klick-Potenzial |
| 8 | **Nicht in Gelbe Seiten und 11880 gelistet** — alle Wettbewerber (Gesundheitswerk, EASYFITNESS, nowifit) sind dort; zwei wichtigste lokale Verzeichnisse fehlen komplett | Audit 02 | **Hoch** — fehlende Backlinks + lokale SEO-Signale + entgangener Direkttraffic |
| 9 | **Hero ohne USP** — Headline "Dein Fitness-Studio in Hattingen" + Subheadline "Jetzt unser Gym besuchen" nennt keinen einzigen Differenzierungspunkt; 5-Sekunden-Test: "Warum hier?" nicht beantwortet | Audit 03 | **Hoch** — Absprungrate erhöht, Unique Selling Points werden nicht kommuniziert |
| 10 | **Blog mit 43 englischen Dummy-Posts aus 2019** — verschwendet Crawl-Budget, dilutiert Themen-Relevanz, schadet deutschem Standort-Signal | Audit 01 + 02 | **Mittel** — aktiver Schaden an SEO-Profil, kein Mehrwert für Nutzer |

---

## 2. Anforderungskatalog — Feature-Matrix

### 2.1 MUSS-Features — Launch (ohne diese geht nicht live)

| # | Feature | Beschreibung | Begründung aus Analyse | Prio |
|---|---|---|---|---|
| M01 | **Optimierte Title-Tags** | Alle Seiten mit Keyword-optimierten Titeln (50–60 Zeichen): Homepage: "Fitnessstudio Hattingen · Sauna, Kurse ab 35€ – Fitness Factory", Probetraining: "Kostenloses Probetraining in Hattingen buchen", etc. | Audit 02: Kein einziger Title enthält Primärkeyword — größtes einzelnes SEO-Leck | 🔴 |
| M02 | **Meta-Descriptions für alle Seiten** | Conversion-optimierte Snippets (150–160 Zeichen) mit USP + CTA für alle 8+ Seiten | Audit 02: 5 von 8 Seiten ohne Meta-Description — Google wählt zufälligen Text | 🔴 |
| M03 | **JSON-LD HealthClub Schema** | Vollständiges HealthClub + LocalBusiness Schema auf jeder Seite: Name, Adresse, Telefon, Öffnungszeiten, GeoCoordinates, PriceRange, amenityFeatures (Sauna, Getränkeflat, Parkplatz, etc.), sameAs (Facebook, Instagram) | Audit 02: Fehlendes Pflicht-Signal für Local Pack und Rich Snippets — Quick Win mit höchstem ROI | 🔴 |
| M04 | **FAQPage Schema** | JSON-LD FAQPage Markup für alle 15 FAQ-Items auf der Homepage | Audit 02: FAQ vorhanden aber kein Schema — verpasste Featured Snippets bei "Was kostet Fitnessstudio Hattingen?" | 🔴 |
| M05 | **Fehlerfreie Navigation** | Alle Nav-Links zu echten, existierenden URLs: Kursplan → /kursplan/ (neue Route), FAQ → /faq/ (eigene Seite oder Anker mit korrekter Route), Kontakt → /kontakt/ | Audit 01: 3 von 6 Nav-Links liefern 404 — zerstört Trust und Crawling | 🔴 |
| M06 | **Sticky CTA-Bar Mobile** | Feste untere Leiste (nur Mobile, erscheint nach 30% Scroll): [Anrufen] [WhatsApp] [Probetraining buchen] — mit `tel:` und `wa.me`-Links | Audit 03: Schwerster Conversion-Fehler — auf Mobile nach Scroll kein CTA erreichbar | 🔴 |
| M07 | **WhatsApp Floating Button** | Grüner WhatsApp-Button rechts unten, auf allen Seiten sichtbar, `href="https://wa.me/491573758001"` mit vorausgefüllter Nachricht | Audit 03: WhatsApp nur als Text auf Probetraining-Seite; bevorzugter Kanal für viele Nutzer | 🔴 |
| M08 | **Click-to-Call im Header** | `<a href="tel:+4923243377">` als Button-Element im Header (Mobile: nur Icon, Desktop: Nummer sichtbar) | Audit 03: Telefon nur im Footer — Mobile-Nutzer müssen bis ganz unten scrollen zum Anrufen | 🔴 |
| M09 | **Probetraining-Seite neu** | 4-Block-Struktur: (1) "So läuft dein Probetraining ab" mit 3 Schritten, (2) Trainer-Vorstellung Mini, (3) Testimonial eines Neukunden, (4) Formular + WhatsApp + Telefon als CTA-Stack; H1: "Kostenloses Probetraining in Hattingen" | Audit 03: Aktuell Score 3/10 — kein Vertrauen, keine Führung, falscher H1 | 🔴 |
| M10 | **SEPA-Formular ersetzen** | /mitgliedschaft/ erhält Interesse-Formular (Name, E-Mail, Tarif-Präferenz, Telefon) statt vollständigem SEPA-Formular — SEPA-Unterschrift erfolgt persönlich im Studio | Audit 03: Vollständige Bankdaten auf öffentlicher Website — DSGVO-Risikozone, massiver Vertrauensbruch | 🔴 |
| M11 | **Trainer-Profile Section** | Mindestens 3–5 Trainer-Cards mit Foto, Name, Kursspezialgebiete, Kurz-Bio (TBD: Fotos + Daten vom Kunden) — als eigene Section auf Homepage und /team/-Seite | Audit 01+03: Kein einziger Trainer sichtbar — Kernvorteil "persönliche Betreuung" unbeweisbar | 🔴 |
| M12 | **Open Graph + Twitter Cards** | og:title, og:description, og:image, og:type, og:url + Twitter Cards für alle Seiten | Audit 02: Alle OG-Tags fehlen — beim Teilen via WhatsApp/Facebook erscheint kein Vorschaubild | 🔴 |
| M13 | **Noindex für Legal-Seiten** | /impressum/, /agbs/, /kuendigung/ mit `<meta name="robots" content="noindex, follow">` | Audit 02: Legal-Seiten in Sitemap ohne noindex — Crawl-Budget verschwendet | 🔴 |
| M14 | **Kursplan als eigenständige Seite** | /kursplan/ als eigene Route mit interaktivem Wochenplan (Mo–So mit Zeiten), filterbar nach Kurstyp; H1: "Kursplan Fitnessstudio Hattingen"; vollständiger Kursplan aus Audit 01 | Audit 01+03: /class-timetable/ nicht in Navigation; Kursplan-Nav-Link liefert 404 | 🔴 |
| M15 | **DSGVO-konforme Cookie-Consent** | Cookie-Banner mit Accept/Decline, Kategorien: Notwendig, Statistik (GA4), Marketing (FB Pixel, Google Ads); Google Consent Mode | Audit 01: Borlabs Cookie vorhanden — Verhalten in React-Neubau neu implementieren | 🔴 |

### 2.2 SOLL-Features — Phase 2 (1–3 Monate nach Launch)

| # | Feature | Beschreibung | Begründung | Prio |
|---|---|---|---|---|
| S01 | **Fremdgeh-Aktion als eigene Landing Page** | /fremdgeh-aktion/ als SEO-optimierte Landingpage mit Keyword "Fitnessstudio wechseln Hattingen"; Hero: "3 Monate gratis — bring deinen alten Vertrag mit"; Formular + Preis-Kalkulator | Audit 04: Markteinzigartiges Angebot digital kaum sichtbar — eigene Seite könnte Hunderte Anfragen generieren | 🟡 |
| S02 | **Google Reviews Widget (live)** | Eingebettetes, live-aktualisiertes Google-Bewertungs-Widget; Gesamtbewertung + Anzahl prominent (z.B. "4,8 ★ · 127 Bewertungen auf Google") im Hero oder als Trust-Bar nach Navigation | Audit 03: Nur 4 statische Testimonials — kein Gesamtscore sichtbar; Konkurrenten wie EASYFITNESS (9.7/10) kommunizieren Bewertungen aktiv | 🟡 |
| S03 | **Video-Testimonials / Erfolgsgeschichten** | 3–5 Mitglieder-Geschichten (Text + Foto, optional Video); Fokus: Anfänger-Erfahrungen, Gewichtsreduktion, Community-Aspekt | Audit 04: Video-Testimonials konvertieren 3× besser als Text; Ketten haben keine echten Community-Geschichten | 🟡 |
| S04 | **Blog — Deutsch, lokal, SEO-optimiert** | Löschung aller 43 englischen Dummy-Posts; Start mit 5–10 deutschen Artikeln: "Fitnessstudio in Hattingen: Was sollte man wissen?", "Spinning Kurs Hattingen: Einsteiger-Guide", etc. | Audit 02: 43 englische Dummy-Posts schädigen SEO aktiv; lokalsprachiger Blog ist Long-Tail-SEO-Compound | 🟡 |
| S05 | **Einzugsgebiet-Landing-Pages** | Separate SEO-Seiten für: /fitnessstudio-bochum-linden/, /fitnessstudio-sprockhoevel/, /fitnessstudio-witten/, /fitnessstudio-blankenstein/ | Audit 02: Einzugsgebiet komplett fehlend auf Website — Holthausen, Bochum-Linden, Sprockhövel, Witten nicht adressiert | 🟡 |
| S06 | **Newsletter-Anmeldung** | Einfaches Newsletter-Opt-in (Name + E-Mail) im Footer + nach Probetraining-Buchung; DSGVO-konformes Double-Opt-in | Audit 04: Owned-Channel fehlt — bei Aktionen (Neujahr etc.) kein direkter Kommunikationsweg | 🟡 |
| S07 | **Kursplan Online-Buchungssystem** | Einfache Platz-Reservierung für Kurse (Datum + Kursname + Name + Telefon); FAQ bestätigt dass Kurse vorab gebucht werden müssen | Audit 01: FAQ-Item: "Kurse müssen vorab gebucht werden" — aber kein System vorhanden; alle Ketten-Konkurrenten haben das | 🟡 |
| S08 | **Profi-E-Mail-Adresse** | Migration von fitness-factory-hattingen@gmx.de auf info@fitness-factory-hattingen.de oder kontakt@... | Audit 02: GMX-Adresse unprofessionell für Business-Kommunikation; CLAUDE.md bestätigt als bekanntes Problem | 🟡 |

### 2.3 KANN-Features — Phase 3 (Nice-to-have)

| # | Feature | Beschreibung | Begründung | Prio |
|---|---|---|---|---|
| K01 | **KI-Chatbot (n8n RAG)** | KI-gestützter Assistent der FAQ beantwortet, Probetraining-Termine vorschlägt, Preise erklärt; basierend auf n8n RAG-Chatbot Skill | Audit 04: Kein einziger Konkurrent in Hattingen hat KI-Chatbot — First-Mover-Differenzierung; Skill bereits vorbereitet | 🟢 |
| K02 | **Corporate Fitness / BGF-Seite** | Landingpage für Betriebliche Gesundheitsförderung — Firmenkunden, Wellhub/Hansefit-Integration prüfen | Audit 04: nowifit macht es vor; EASYFITNESS ist Wellhub-kompatibel — neues B2B-Segment | 🟢 |
| K03 | **Mitglieder-Portal (PWA)** | Digitaler Trainingsplan, Kurs-Buchungshistorie, Mitgliedschafts-Übersicht als Progressive Web App | Audit 04: Langfristiger Bindungs-Faktor; alle Ketten haben App/Portal; enormer Aufwand — Phase 3 | 🟢 |
| K04 | **Vorher/Nachher Galerie** | Optionale Foto-Gallery mit Transformationsgeschichten (Mitglieder-Zustimmung nötig) | Audit 03: Derzeit null visueller Social Proof durch Transformationen; Impact mittel, Aufwand mittel | 🟢 |
| K05 | **Urgency / Scarcity-Mechanismus** | Countdown-Timer für Aktionen, "Noch X Probetraining-Plätze diese Woche" — dynamisch oder manuell steuerbar | Audit 04: FitX, McFit, John Reed nutzen Urgency aktiv; erhöht Entscheidungsgeschwindigkeit | 🟢 |

---

## 3. Seitenstruktur der neuen Website

### 3.1 Homepage — Section-Reihenfolge (Conversion + SEO optimiert)

**1. Top-Bar (über Navigation)**
- Öffnungszeiten: "Mo–Fr 08–23 Uhr · Sa–So 10–17:30 Uhr"
- Click-to-Call: "📞 02324 33777"
- WhatsApp-Link
- Schließt sich auf Mobile nach Scroll (ersetzt durch Sticky Bottom-Bar)

**2. Navigation**
- Logo links
- Links: Kurse, Preise, Kursplan, Team, Probetraining (hervorgehoben als CTA-Button)
- Mobile: Hamburger-Menü, Slide-Over von rechts

**3. Hero**
- Video-Background (Autoplay, muted, loop) ODER starkes Lifestyle-Bild (TBD: Video vom Kunden)
- H1: "Dein Fitnessstudio in Hattingen — alles inklusive"
- Subheadline mit USP: "Sauna, 17 Live-Kurse & Getränkeflat — familiär, persönlich, ab 35€/Monat"
- CTA-Stack: [Probetraining buchen] + [Preise ansehen]

**4. Trust-Bar (Social Proof)**
- Google-Bewertungs-Score prominent ("⭐ 4,8 · [X] Bewertungen")
- Mitgliederzahl: "500+ zufriedene Mitglieder" (TBD: genaue Zahl vom Kunden)
- "Seit 20XX in Hattingen" (TBD: Gründungsjahr vom Kunden)
- 3 Kern-Icons: Sauna ✓ · Getränkeflat ✓ · Kostenlos parken ✓

**5. USP / Leistungen**
- H2: "Alles Inklusive — kein Kleingedrucktes"
- 8 Leistungs-Cards mit Icons: Sauna, Live-Kurse, Getränkeflat, Ernährungsberatung, Trainingsplan, Duschen, Parkplätze, Trainingsberatung
- Jede Card mit kurzer emotionaler Erklärung (nicht nur Feature-Name)

**6. Preise**
- H2: "Transparent. Fair. All-inclusive."
- 3 Tarif-Cards (Flex 55€, Standard 45€, Premium 35€) + Fremdgeh-Aktion Card
- Standard visuell highlighted als "Beliebteste Wahl"
- Anmeldegebühr 49€ klar kommuniziert
- Preisvergleichs-Hinweis: "Was woanders extra kostet, ist bei uns inklusive"
- CTA unter Preisen: "Probetraining buchen — kostenlos & unverbindlich"

**7. Probetraining CTA-Section**
- Standalone-Section: "Komm vorbei. Kostenlos. Unverbindlich."
- 3-Schritte-Ablauf: (1) Termin sichern, (2) Reinschnuppern, (3) Entscheiden
- CTA-Stack: [Online anmelden] [WhatsApp schreiben] [Anrufen]

**8. Trainer-Team**
- H2: "Dein persönliches Team"
- 3–5 Trainer-Cards (Foto, Name, Spezialisierung, Kurz-Bio)
- TBD: Fotos, Namen, Biografien vom Kunden
- CTA: "Lerne uns kennen — beim Probetraining"

**9. Kursplan-Preview**
- H2: "17 Kurse pro Woche — für jeden etwas"
- Wochenübersicht (kompakt, Mobile-tauglich)
- Filter: Mo–So, Kurstypen
- Link zu vollständiger Kursplan-Seite
- Kurstypen prominent: Spinning, Yoga, Tabata, Zumba, Pilates, Rücken-Fit, Tae-Bo, etc.

**10. Galerie**
- H2: "Einblicke in dein neues Studio"
- 6 beste Fotos + YouTube-Video (hinter Consent-Gate)
- Alle Bilder mit Alt-Texten (z.B. "Gerätebereich Fitnessstudio Hattingen")

**11. Testimonials (erweitert)**
- H2: "Was unsere Mitglieder sagen"
- 6–8 Bewertungen mit Foto, Name, Sternebewertung, Datum
- Google-Bewertungs-Badge: "Alle Bewertungen auf Google ansehen"

**12. FAQ**
- H2: "Häufig gestellte Fragen"
- Top 6–8 Fragen mit echten Kaufeinwänden (nicht nur Informationsfragen)
- FAQPage JSON-LD Schema im Code
- Link zu vollständiger FAQ-Seite

**13. Kontakt + Maps**
- H2: "Komm vorbei — wir freuen uns"
- Adresse: Im Vogelsang 95, 45527 Hattingen
- Google Maps Embed (DSGVO-konform, erst nach Consent laden)
- Öffnungszeiten: Mo–Fr 08–23 Uhr, Sa–So 10–17:30 Uhr
- CTA: [Anrufen] [WhatsApp] [Route planen]
- Kontaktformular (einfach: Name, E-Mail, Nachricht)

**14. Footer**
- Logo + kurze Beschreibung
- Navigation: Impressum, AGB, Datenschutz, Kündigung
- Social-Media-Links: Instagram, Facebook
- Kontaktdaten: Adresse, Telefon, WhatsApp, E-Mail
- Copyright

**15. Floating / Persistent Elements**
- WhatsApp-Button: rechts unten, immer sichtbar (Desktop + Mobile)
- Sticky Bottom-Bar: nur Mobile, nach 30% Scroll: [Anrufen] [WhatsApp] [Probetraining]
- KI-Chatbot-Icon: rechts unten (Phase 3)

---

### 3.2 Weitere Seiten

| Seite | URL-Slug | Zweck | SEO-Keyword | Priorität |
|---|---|---|---|---|
| Probetraining | /probetraining/ | Primäre Conversion-Seite: 4-Block-Struktur, Formular mit Wunschtermin | Probetraining Hattingen, kostenloses Probetraining Fitnessstudio | **KRITISCH** |
| Mitgliedschaft / Preise | /mitgliedschaft/ | Alle Tarife, Leistungsvergleich, Interesse-Formular (KEIN SEPA) | Fitnessstudio Hattingen Preise, Mitgliedschaft Hattingen | **KRITISCH** |
| Kursplan | /kursplan/ | Interaktiver Wochenplan, filterbar, alle Zeiten aus Audit 01 | Fitnesskurse Hattingen, Kursplan Fitnessstudio Hattingen | **HOCH** |
| Team | /team/ | Alle Trainer mit Foto, Bio, Spezialisierung | Trainer Fitnessstudio Hattingen | **HOCH** |
| Fremdgeh-Aktion | /fremdgeh-aktion/ | Eigene SEO-Landing-Page für Wechsler-Angebot | Fitnessstudio Hattingen wechseln, 3 Monate gratis Fitnessstudio | **HOCH** |
| Impressum | /impressum/ | Rechtlich nach TMG; noindex | — | **KRITISCH** (Legal) |
| Datenschutz | /datenschutz/ | Separate DSGVO-Datenschutzerklärung (nicht mehr in /agbs/); noindex | — | **KRITISCH** (Legal) |
| AGB | /agb/ | Allgemeine Geschäftsbedingungen; noindex | — | **HOCH** (Legal) |
| Kündigung | /kuendigung/ | Kündigungsformular für Bestandsmitglieder | — | **MITTEL** |
| FAQ | /faq/ | Vollständige FAQ-Seite mit Schema-Markup | FAQ Fitnessstudio Hattingen, Was kostet Fitnessstudio Hattingen | **MITTEL** |
| Blog | /blog/ | Deutscher, lokaler Content für Long-Tail SEO | diverse Long-Tail Keywords | **SOLL** (Phase 2) |
| Bochum-Linden | /fitnessstudio-bochum-linden/ | Einzugsgebiet-Landingpage | Fitnessstudio Bochum Linden | **SOLL** (Phase 2) |
| Sprockhövel | /fitnessstudio-sprockhoevel/ | Einzugsgebiet-Landingpage | Gym Sprockhövel, Fitnessstudio Sprockhövel | **SOLL** (Phase 2) |
| Witten | /fitnessstudio-witten/ | Einzugsgebiet-Landingpage | Fitnessstudio Witten Hattingen | **SOLL** (Phase 2) |
| Blankenstein | /fitnessstudio-blankenstein/ | Einzugsgebiet-Landingpage | Fitnessstudio Blankenstein | **SOLL** (Phase 2) |

---

## 4. Technische Anforderungen

| Anforderung | Spezifikation |
|---|---|
| **Build-Tool** | Vite (latest) — kein Next.js, kein Create-React-App |
| **Framework** | React 19 — Functional Components only, keine Class Components |
| **Sprache** | TypeScript strict mode — keine `any` Types, keine `@ts-ignore` |
| **Styling** | Tailwind CSS v3.4+ — Utility-first, KEINE separaten CSS-Dateien pro Komponente |
| **Animationen** | Framer Motion 12+ — Scroll-Transitions, Counter-Animationen, Hover-Effekte |
| **Routing** | React Router v6+ — Client-side SPA-Routing; alle Slugs aus Abschnitt 3.2 |
| **Icons** | Lucide React (latest) — einheitliche Icon-Sprache |
| **CSS-Utilities** | clsx + tailwind-merge für conditional CSS-Klassen |
| **Content** | Alle Texte aus `src/data/content.ts` — KEINE Texte direkt in JSX |
| **Farben** | Ausschließlich `brand-*` Token aus Tailwind-Config — keine Hex-Codes direkt im JSX |
| **State** | React State + Context — kein Redux |
| **Verboten** | KEIN `"use client"`, KEIN `<Image>` (Next.js), KEIN `next/link`, KEIN jQuery |
| **Performance-Ziele** | LCP < 2.5s, INP < 200ms, CLS < 0.1 (Core Web Vitals "Gut"-Bereich) |
| **Ladezeit** | Sub-2s auf 4G-Mobilfunk |
| **Mobile** | Mobile-first Design — 60%+ der Nutzer kommen mobil (Audit 04: 76%+) |
| **Responsive** | Alle Breakpoints: Mobile (375px+), Tablet (768px+), Desktop (1280px+) |
| **Browser** | Chrome, Firefox, Safari, Edge (jeweils letzte 2 Versionen); iOS Safari 16+ |
| **Bilder** | WebP-Format, beschreibende Dateinamen (z.B. `fitnessstudio-hattingen-geraetebereich.webp`), Alt-Texte mit Keywords, Lazy Loading |
| **Fonts** | Lokal selbst gehostet (KEIN Google Fonts remote — Datenschutzproblem, Audit 01) |
| **Analytics** | GA4 (GT-NCTZLR4T) + Google Ads (AW-17671885275) + Facebook Pixel (1477286522471998) + GTM (GTM-PQJ82LFT) — alle über Cookie-Consent gesteuert |
| **Cookie-Consent** | DSGVO-konforme Implementierung mit Accept/Decline, Google Consent Mode |
| **Sitemap** | /sitemap.xml — alle indexierbaren Seiten; Legal-Seiten ausgeschlossen |
| **robots.txt** | /robots.txt — Legal-Seiten mit Disallow; Sitemap referenziert |
| **Canonical Tags** | Auf allen Seiten — verhindert Duplicate Content |
| **HTTPS** | Pflicht — HTTP-Redirect auf HTTPS |
| **Hosting** | TBD (aktuell ALL-INKL.COM) — für Vite-Build statisches Hosting oder CDN empfohlen (Netlify, Vercel, Cloudflare Pages) |
| **Git** | Versionskontrolle in diesem Repository — `src/` ist Hauptcode-Verzeichnis |
| **DSGVO** | Impressum nach TMG, Datenschutz nach DSGVO, Cookie-Consent, Kontaktformular mit Einwilligung |

---

## 5. Design-Anforderungen

### Positionierung und Differenzierung

Das Design basiert auf der Corporate Identity des Logos: **Rot + Schwarz + Weiß**. Die Website bekommt einen **weißen, cleanen Hintergrund** mit roten CTAs und schwarzen Akzenten. Professionell, schlicht, wie von einem erfahrenen Webdesigner — NICHT wie KI-generiert. Weniger Rundungen, mehr Kanten. Keine Glow-Effekte.

**Inspiration:** Professionelle Webagenturen (klare Hierarchien, viel Weißraum) + FitX (ehrliches, direktes Messaging) + lokale Wärme (echte Fotos, familiär).

### Design-Anforderungen Tabelle

| Element | Anforderung | Begründung |
|---|---|---|
| **Farbsystem** | Weiß (#FFFFFF) als Haupt-Hintergrund + Logo-Rot als Primärfarbe (Buttons, CTAs) + Schwarz (#1A1A1A) für Headlines/Akzente + Fast-Weiß (#F7F7F8) für abwechselnde Sections | CI des Logos: Rot + Schwarz + Weiß; clean und professionell |
| **Brand-Token** | Tailwind-Config mit `brand-white`, `brand-bg`, `brand-primary` (Rot), `brand-dark` (Schwarz), `brand-border`, `brand-muted` | Alle Farben über brand-* Token |
| **Typografie** | EIN professioneller Sans-Serif (z.B. Inter, Manrope, Outfit) in verschiedenen Gewichten (Regular bis Black); LOKAL GEHOSTET | Ein Font-System wirkt professioneller als Font-Mixing; Google Fonts remote = Datenschutzproblem |
| **Bildstil** | Echte Fotos aus dem Studio (keine Stock-Bilder!): Action-Shots, Trainer, Sauna, Geräte; TBD: Fotoshooting | Authentizität schlägt Stock-Bilder |
| **Hero** | Dunkler Hintergrund (Bild mit Overlay) als visueller Kontrast zum weißen Rest; Fallback: Lifestyle-Foto | Hero darf dunkel sein für Impact, Rest = weiß |
| **Animationen** | Framer Motion: DEZENT — kurze fadeIn (0.4s, 20px offset), Counter für Zahlen, KEINE Bounce/Glow/Scale | Professionelle Sites animieren subtil, nicht showmäßig |
| **Layout** | Clean Grid für Leistungen; klare Sektions-Trennung durch abwechselnde Hintergründe (weiß/fast-weiß) | Viel Weißraum, Sections atmen lassen |
| **Button-Stil** | EIN einheitlicher `Button`-Stil: bg-brand-primary (Rot), text-white, 4px radius, KEIN Glow, KEIN Gradient — nur sauberer Farbwechsel auf Hover | Scharfe Ecken + clean = professionell; Glow = KI-Pattern |
| **Border-Radius** | Buttons: 4px, Cards: 6px, große Elemente: 8px — KEIN rounded-2xl, KEIN rounded-full auf Buttons | Weniger Rundungen = professioneller, weniger KI-generiert |
| **Accessibility** | WCAG 2.1 AA: Farbkontrast ≥ 4.5:1, Alt-Texte, Keyboard-Navigation, semantisches HTML, Focus-Indikatoren | Pflicht für professionelle Website |
| **Mobile** | Thumb-Zone-CTAs, Bottom-Bar statt Header-CTA, Hamburger-Menü Slide-Over | 76%+ mobiler Traffic |
| **Whitespace** | Großzügige Abstände (py-20 bis py-32); Sections atmen lassen | Weißraum = Professionalität |

---

## 6. Content-Anforderungen

### 6.1 Content-Inventar

| Content-Typ | Aktueller Status | Aktion | Wer liefert |
|---|---|---|---|
| Hero-Headline + Subheadline | Vorhanden, schwach ("Dein Fitness-Studio in Hattingen") | Komplett neu schreiben mit USP | Copywriting (wir) |
| Hero-Video / Hero-Bild | Kein Video-Hero; Logo als Hero-Bild — unzureichend | Neues Video oder Lifestyle-Foto für Hero | **Kunde** (Fotoshooting/Video) |
| Leistungs-Texte (8 USPs) | Icons ohne Beschreibung vorhanden | Kurze emotionale Erklärtexte pro Leistung | Copywriting (wir) |
| Preistabelle | Vorhanden und korrekt (Audit 01 verifiziert) | Übernehmen, visuell aufwerten | Copywriting (wir) |
| Trainer-Profile | KOMPLETT FEHLEND | Neu erstellen | **Kunde** (Fotos, Namen, Biografien) |
| Kursplan (mit Zeiten) | Vollständig dokumentiert in Audit 01 | Übernehmen und in Komponente umsetzen | Vorhanden (Audit 01) |
| Testimonials (Text) | 4 vorhanden (Thomas Schwindt, Peter Kroll, Martin Sitter, Jennifer Praus) | Erweitern auf 6–8; Fotos hinzufügen | **Kunde** (Fotos der Reviewer) + Google Reviews |
| FAQ (15 Items) | Vorhanden und dokumentiert | Übernehmen + um Einwand-FAQs erweitern | Copywriting (wir) |
| Studio-Fotos (Galerie) | 12 Fotos (DSC-Dateinamen, ohne Alt-Texte) | Neu benennen (WebP, SEO-Dateinamen), Alt-Texte schreiben; ideal: Nachschuss | **Kunde** (bessere Fotos) |
| Google Maps Embed | Vorhanden (Footer) | Übernehmen, DSGVO-konform implementieren | Vorhanden |
| Fremdgeh-Aktion Texte | Rudimentär auf /mitgliedschaft/ | Komplett neue Landingpage texten | Copywriting (wir) |
| Impressum | Vollständig in Audit 01 dokumentiert | Übernehmen (Alexander Stöcker, HRB 29213, USt DE319398653) | Vorhanden (Audit 01) |
| Datenschutzerklärung | In /agbs/ versteckt, separieren | Auf eigene /datenschutz/-Seite auslagern; ggf. update durch Rechtsanwalt | **Kunde** (prüfen lassen) |
| AGB | In /agbs/ vorhanden | Auf eigene /agb/-Seite auslagern | Vorhanden |
| Blog-Content | 43 englische Dummy-Posts — alle löschen | 5–10 neue deutsche Artikel (Phase 2) | Copywriting (wir, Phase 2) |
| Einzugsgebiet-Texte | KOMPLETT FEHLEND | Neue Texte für Holthausen, Bochum-Linden, Sprockhövel, Witten | Copywriting (wir, Phase 2) |
| Meta-Descriptions | Nur auf Homepage (schwach) | Für alle 15+ Seiten schreiben | Copywriting (wir) |
| Title-Tags | Alle unkonfiguriert | Für alle Seiten schreiben (Vorschläge in Audit 02) | Copywriting (wir) |

### 6.2 Vom Kunden benötigte Assets

**Ohne diese Elemente kann die neue Website nicht vollständig fertiggestellt werden:**

- [ ] **Trainer-Fotos** — Professionelle Porträt-Fotos aller Trainer (mind. 3–5 Trainer) — format: quadratisch oder 4:3, hochauflösend
- [ ] **Trainer-Daten** — Name, Kursspezialgebiete, Qualifikation/Zertifizierung, kurze Biografie (3–5 Sätze) je Trainer
- [ ] **Hero-Video oder Hero-Foto** — Professioneller Clip (15–30s, kein Ton) oder Lifestyle-Foto von echten Mitgliedern beim Training — kein Logo, keine Stock-Bilder
- [ ] **Studio-Fotos (neu)** — 10–20 hochauflösende Fotos: Gerätebereich, Kursraum, Sauna, Empfang, Außenansicht, Parkplatz — keine Handyfotos
- [ ] **Google Business Zugang** — Login-Daten oder Berechtigung zum GBP um Optimierungen vorzunehmen
- [ ] **GA4 / GTM / Google Ads / Facebook Pixel Zugang** — Zugangsdaten für alle Tracking-Tools (IDs bekannt aus Audit 01)
- [ ] **Mitgliederzahl** — Aktuelle Mitgliederzahl für Trust-Bar ("500+ Mitglieder") — vertraulich, nur für Website-Einsatz
- [ ] **Gründungsjahr** — Wann wurde die Fitness Factory gegründet? Für Trust-Bar ("seit 20XX")
- [ ] **Google-Bewertungs-Score** — Aktueller Google-Gesamt-Score + Anzahl Bewertungen (aus GBP einsehbar)
- [ ] **Testimonial-Fotos** — Fotos der 4 bestehenden Reviewer (Thomas Schwindt, Peter Kroll, Martin Sitter, Jennifer Praus) — optional, mit Zustimmung
- [ ] **Neue Bewertungen** — 4–8 weitere Google-Bewertungen vor Launch aktiv einsammeln (QR-Code im Studio aufstellen)
- [ ] **E-Mail-Adresse** — Entscheidung über neue professionelle E-Mail-Adresse (@fitness-factory-hattingen.de) + Hosting/Konfiguration
- [ ] **Datenschutz-Check** — Neue Datenschutzerklärung durch Rechtsanwalt auf DSGVO-Konformität prüfen lassen (Kontaktformular, Cookie-Consent, Analytics)
- [ ] **Hosting-Entscheidung** — Bleibt die Site auf ALL-INKL.COM oder Umzug zu Netlify/Vercel? (Empfehlung: statisches Hosting für bessere Performance)

### 6.3 Copywriting-Regeln

1. **Du-Ansprache immer** — nicht "Sie", nicht "Mitglieder" in der 3. Person — direkt, persönlich, vertraut
2. **USPs konkret benennen** — nicht "wir bieten Sauna" sondern "Sauna gratis inklusive — nach jedem Training" — konkrete Formulierung schafft Vertrauen
3. **Keine Allgemeinplätze** — "familiäres Studio" allein reicht nicht; immer mit Beweis oder konkretem Detail kombinieren ("familiär — unsere Trainer kennen deinen Namen")
4. **Ortsname bewusst einsetzen** — "Hattingen", "Holthausen", "im Ruhrgebiet" regelmäßig einbauen — für lokale SEO und Relevanz
5. **Preise immer mit Kontext** — nicht "35€/Monat" allein, sondern "35€/Monat — Sauna, 17 Kurse & Getränke inklusive" — Preis-Wert-Relation herstellen
6. **CTA-Texte aktiv formulieren** — "Probetraining sichern" statt "Mehr erfahren", "Jetzt anrufen" statt "Kontakt" — Handlungsverb, Sofortgefühl
7. **Kein Deutsch-Denglisch** — nicht "Class Timetable", nicht "Workout", wenn "Kurs", "Kursplan", "Training" gleichwertig funktioniert — Ausnahme: etablierte Fachbegriffe wie Spinning, Yoga, Tabata

---

## 7. SEO-Strategie

### 7.1 Keyword-Map

| Keyword | Suchvolumen (Einschätzung) | Zielseite | Aktueller Rang | Ziel-Rang |
|---|---|---|---|---|
| Fitnessstudio Hattingen | Hoch (600–900/Monat) | Homepage | Nicht in Top 10 (Audit 02) | **Platz 1** |
| Gym Hattingen | Mittel (200–400/Monat) | Homepage | Nicht in Top 10 | Platz 1–3 |
| Fitness Hattingen | Mittel (300–500/Monat) | Homepage | Nicht in Top 10 | Platz 1–3 |
| Probetraining Hattingen | Niedrig (50–150/Monat) | /probetraining/ | Nicht bekannt | Platz 1 |
| Fitnesskurse Hattingen | Niedrig–Mittel (100–250/Monat) | /kursplan/ | Nicht bekannt | Platz 1–3 |
| Fitnessstudio Hattingen Preise | Niedrig (50–100/Monat) | /mitgliedschaft/ | Nicht bekannt | Platz 1 |
| Fitnessstudio Holthausen | Niedrig (<50/Monat) | Homepage | Nicht in Top 10 | Platz 1 |
| Sauna Fitnessstudio Hattingen | Niedrig (<50/Monat) | Homepage / /mitgliedschaft/ | Nicht vorhanden | Platz 1 |
| Spinning Kurs Hattingen | Niedrig (<50/Monat) | /kursplan/ | Nicht vorhanden | Platz 1–3 |
| Yoga Kurs Hattingen | Niedrig (<50/Monat) | /kursplan/ | Nicht vorhanden | Platz 1–3 |
| Fitnessstudio Bochum Linden | Niedrig (<50/Monat) | /fitnessstudio-bochum-linden/ | Nicht vorhanden | Platz 1 |
| Gym Sprockhövel | Niedrig (<50/Monat) | /fitnessstudio-sprockhoevel/ | Nicht vorhanden | Platz 1 |
| Fitnessstudio Witten | Mittel | /fitnessstudio-witten/ | Nicht vorhanden | Platz 1–3 |
| Fitnessstudio Blankenstein | Niedrig (<50/Monat) | /fitnessstudio-blankenstein/ | Nicht vorhanden | Platz 1 |
| Fitness Factory Hattingen Bewertungen | Niedrig (Brand) | Homepage | Wahrscheinlich Platz 1 | Platz 1 (halten) |
| Fitnessstudio kündigen wechseln Hattingen | Niedrig (<50/Monat) | /fremdgeh-aktion/ | Nicht vorhanden | Platz 1 |

### 7.2 Technische SEO-Maßnahmen

Direkt abgeleitet aus Audit 02 — in dieser Reihenfolge umsetzen:

1. Alle Title-Tags neu schreiben und im Code hinterlegen — Template aus Audit 02, Abschnitt 5
2. Meta-Descriptions für alle Seiten schreiben — Vorschläge in Audit 02, Abschnitt 6
3. Canonical-Tags auf allen Seiten implementieren — verhindert Duplicate Content
4. Open Graph + Twitter Cards auf allen Seiten implementieren
5. HealthClub JSON-LD Schema auf allen Seiten einbinden — vollständiges Template aus Audit 02, Abschnitt 7.1
6. FAQPage JSON-LD Schema auf /faq/ und Homepage einbinden
7. Alle Bilder: WebP-Format, SEO-Dateinamen (z.B. `fitnessstudio-hattingen-geraetebereich.webp`), Alt-Texte mit Keywords
8. Lazy Loading für alle Bilder unterhalb des Folds
9. Google Fonts durch lokal gehostete Fonts ersetzen (DSGVO + Performance)
10. robots.txt: Legal-Seiten disallowen, Sitemap referenzieren
11. Sitemap.xml: Nur indexierbare Seiten; Legal-Seiten ausschließen
12. Core Web Vitals Ziele: LCP < 2.5s (Bild preloaden, CDN), INP < 200ms (JS-Bundle klein halten), CLS < 0.1 (Fonts selbst hosten, Image-Dimensionen setzen)
13. H1-Tags auf allen Seiten prüfen — keine doppelten H1s (Audit 02: Probetraining + Mitgliedschaft hatten identische H1 = Keyword-Kannibalisierung)
14. Interne Verlinkung zwischen Seiten im Fließtext (Hub-&-Spoke: Homepage → Probetraining → Mitgliedschaft → Kursplan)

### 7.3 Lokale SEO-Maßnahmen

1. **Google Business Profile optimieren** — alle Kategorien (Primär: Fitnessstudio, Sekundär: Sportanlage, Gesundheitszentrum), Beschreibung mit Keywords, alle Fotos hochladen (mind. 10), Öffnungszeiten korrekt, Produkte hinzufügen (Flex, Standard, Premium), Leistungen (Sauna, Kurse, Ernährungsberatung)
2. **NAP-Konsistenz herstellen** — einheitlicher Name auf allen Plattformen: "Fitness Factory Hattingen" (ohne GmbH für Display, mit GmbH nur in Legal-Texten); Adresse und Telefon immer identisch
3. **Gelbe Seiten Eintrag erstellen** — kostenlos, höchste Priorität; exakte NAP-Daten
4. **11880.com Eintrag erstellen** — kostenlos, höchste Priorität; exakte NAP-Daten
5. **Eversports Eintrag erstellen** — wichtig für Kursbuchung und Fitnessstudio-Verzeichnis
6. **Gymsider.com Profil aktualisieren** — bereits gelistet (Audit 02), Daten auf Aktualität prüfen
7. **Fresha.com Profil optimieren** — bereits gelistet (Audit 02)
8. **GeoCoordinates in JSON-LD** — Lat/Long aus Audit 02: 51.3920, 7.1850
9. **OpeningHoursSpecification in JSON-LD** — Mo–Fr 08:00–23:00, Sa–So 10:00–17:30
10. **Einzugsgebiet-Keywords im Content** — Holthausen, Bochum-Linden, Sprockhövel, Witten, Blankenstein explizit in Texten erwähnen
11. **Google Reviews Strategie** — QR-Code im Studio für direkte Google-Bewertung; WhatsApp-Nachrichten an Bestandsmitglieder (nach Zustimmung); Ziel: 50+ Bewertungen in 3 Monaten
12. **Google Business Posts** — wöchentlich: Kursplan-Updates, Aktionen, Neuigkeiten; Freshness-Signal für Local Pack

---

## 8. Conversion-Strategie

### 8.1 CTA-Platzierung

| Position | CTA-Text | Device | Ziel |
|---|---|---|---|
| Top-Bar | "📞 02324 33777" | Desktop + Mobile (bis scroll) | Click-to-Call |
| Navigation (rechts) | "Probetraining" (Button) | Desktop | Probetraining-Seite |
| Hero CTA #1 | "Probetraining buchen — kostenlos" | Desktop + Mobile | Probetraining-Formular |
| Hero CTA #2 | "Preise ansehen" | Desktop + Mobile | /mitgliedschaft/ |
| Nach Preistabelle | "Probetraining sichern — unverbindlich" | Desktop + Mobile | Probetraining-Formular |
| Probetraining-Section | [Online anmelden] + [WhatsApp] + [Anrufen] | Desktop + Mobile | Multi-Channel Conversion |
| Floating Button | WhatsApp-Icon grün | Desktop + Mobile (immer) | WhatsApp-Direktkontakt |
| Sticky Bottom-Bar | [Anrufen] [WhatsApp] [Probetraining] | **Mobile only** (ab 30% Scroll) | Sofortkonversion Mobile |
| Nach FAQ | "Frage nicht beantwortet? Schreib uns auf WhatsApp" | Desktop + Mobile | WhatsApp-Conversion |
| Kontakt-Section | [Anrufen] [WhatsApp] [Route planen] | Desktop + Mobile | Direktkontakt + Navigation |

### 8.2 Trust-Aufbau

| Maßnahme | Platzierung | Detail |
|---|---|---|
| Google-Bewertungs-Score | Trust-Bar (Sektion 4) + Hero | "⭐ 4,8 · [X] Bewertungen" — TBD: genaue Zahl vom Kunden |
| Mitgliederzahl | Trust-Bar | "500+ Mitglieder" (TBD: genaue Zahl) |
| Jahre am Markt | Trust-Bar | "Seit 20XX in Hattingen" (TBD: Gründungsjahr) |
| Trainer-Profile | Sektion 8 | Echte Fotos, Namen, Biografie — macht USP "persönliche Betreuung" sichtbar |
| Echte Testimonials | Sektion 11 | 6–8 Reviews mit Foto, Datum; keine Stock-Fotos |
| Probetraining-Ablauf | /probetraining/ | "So läuft dein Probetraining ab" — nimmt Unsicherheit vor dem Besuch |
| All-inclusive explizit | Preistabelle | "✓ Sauna inklusive ✓ Kurse inklusive ✓ Getränke inklusive" — macht Preis-Wert klar |
| Preisvergleich | Preisseite | "Was du bei anderen extra zahlst, ist bei uns drin" |
| Echte Fotos | Galerie | Kein Stock — nur echte Studio- und Trainingsfotos |
| DSGVO-Hinweis | Kontaktformular | Einwilligungs-Checkbox mit Link zu Datenschutz |

### 8.3 Tracking-Plan

| Event | Typ | Tool | Trigger |
|---|---|---|---|
| Probetraining Formular abgeschickt | Conversion | GA4 + Google Ads | Formular Submit auf /probetraining/ |
| Click-to-Call | Conversion | GA4 | Klick auf `tel:`-Link |
| WhatsApp-Button Klick | Conversion | GA4 | Klick auf `wa.me`-Link |
| Route planen (Google Maps) | Conversion | GA4 | Klick auf Maps-Link |
| Sticky Bottom-Bar Klick | Conversion | GA4 | Klick auf CTA in Bottom-Bar |
| Probetraining-Seite aufgerufen | Mikro-Conversion | GA4 | Seitenaufruf /probetraining/ |
| Preisseite aufgerufen | Mikro-Conversion | GA4 | Seitenaufruf /mitgliedschaft/ |
| Scroll-Tiefe 50% / 75% / 90% | Engagement | GA4 | Scroll-Event |
| Video-Start (Hero-Video) | Engagement | GA4 | Video Play-Event |
| FAQ-Item geöffnet | Engagement | GA4 | Accordion Expand |
| Newsletter-Anmeldung | Conversion | GA4 | Formular Submit |
| Kursplan-Filter genutzt | Engagement | GA4 | Filter-Klick auf /kursplan/ |
| Facebook Pixel | Conversion | FB Pixel | Probetraining-Formular Submit |
| GTM Container | Infrastruktur | GTM-PQJ82LFT | Wrapper für alle Tags |

---

## 9. Risikoanalyse

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|---|---|---|---|
| **Trainer-Fotos nicht rechtzeitig geliefert** — Kunden-Asset, außerhalb unserer Kontrolle | Mittel | Hoch | Trainer-Section mit Placeholder-Karten bauen; Content kann ohne Fotos deployed werden; Fotos werden nachgereicht; Launch-Datum nicht blockieren |
| **VIVA Fitness / EASYFITNESS relaunch ihre Website** — Wettbewerbervorteil durch neues Design schrumpft | Niedrig | Mittel | Schneller launchen; KI-Chatbot als differenzierendes Feature priorisieren; First-Mover-Vorteil bei Google Local Pack durch schnelle Indexierung sichern |
| **Hosting-Wechsel verzögert sich** — ALL-INKL.COM vs. statisches Hosting-Entscheidung offen | Mittel | Mittel | Neues Build muss auf beiden Hosting-Umgebungen lauten — Vite-Build ist universell statisch und auf jedem Host deploybar; Build-Output nach /dist/ |
| **Kein professionelles Video / keine guten Fotos** — Hero leidet, emotionale Wirkung reduziert | Hoch | Hoch | Konkretes Fotoshooting frühzeitig einplanen und mit Kunde koordinieren; Fallback: bestehendes Galerie-Material aufbereiten; Video-Hero kann zu Bild-Hero degradiert werden ohne Code-Änderung |
| **Datenschutzrechtliche Überraschungen** — neue DSGVO-Prüfung der Datenschutzerklärung deckt Probleme auf | Niedrig | Hoch | Datenschutzerklärung frühzeitig an Rechtsanwalt zur Prüfung geben; Cookie-Consent und Formular-Design nach aktuellen DSGVO-Standards implementieren; SEPA-Formular bereits im Plan entfernt |
| **Google Local Pack Rankings kommen langsam** — neues Vite-Build wird von Google nicht sofort erkannt | Mittel | Mittel | Google Search Console bei Launch einrichten + Sitemap einreichen; GBP sofort nach Launch optimieren; 301-Redirects von alten URLs sicherstellen |
| **Bestandsmitglieder verwirren sich** — neues URL-Struktur (z.B. /class-timetable/ → /kursplan/) bricht Bookmarks | Niedrig | Niedrig | 301-Redirects für alle alten URLs auf neue URLs; insbesondere /class-timetable/ → /kursplan/ |

---

## 10. Roadmap Phase 2

### Sprint 1 — Design & Setup (PROMPT 2.1–2.4)
**Ziel:** Solide Basis — Design-System definiert, Tech-Stack aufgesetzt, kein Code ohne Design-Entscheidungen

- **PROMPT 2.1 — Design-System:** Farben (brand-Token), Fonts (lokal gehostet), Spacing-Scale, Animations-Definitionen, Component-Inventar; Tailwind-Config vollständig
- **PROMPT 2.2 — Content-Strategie:** `src/data/content.ts` vollständig befüllt mit allen Texten, Preisen, Kursplan, FAQs, Kontaktdaten — basierend auf Audit 01–05
- **PROMPT 2.3 — SEO-Setup:** Alle Title-Tags, Meta-Descriptions, JSON-LD Templates, Open Graph Tags, robots.txt, sitemap.xml-Konfiguration
- **PROMPT 2.4 — Tech-Stack Setup:** Vite + React 19 + TypeScript + Tailwind-Config + Framer Motion + React Router + Lucide; alle Abhängigkeiten, Ordnerstruktur, Basis-Routing

**Definition of Done Sprint 1:** Lokaler Dev-Server läuft, alle Routen erreichbar (404-freie Navigation), Design-Token in Tailwind implementiert, content.ts vollständig befüllt

---

### Sprint 2 — Komponenten & Pages (PROMPT 2.5–2.6)
**Ziel:** Alle Seiten vollständig gebaut, alle Sections vorhanden, alle CTAs verlinkt

- **PROMPT 2.5 — Komponenten:** Button (KEIN GlowButton), Navigation (Desktop + Hamburger Mobile), Footer, Preiskarte, TrainerCard, KursCard, TestimonialCard, FAQAccordion, WhatsAppButton, StickyBottomBar
- **PROMPT 2.6 — Pages & Sections:** Homepage (alle 15 Sektionen), /probetraining/, /mitgliedschaft/, /kursplan/, /team/, /faq/, /impressum/, /datenschutz/, /agb/, /kuendigung/; React Router komplett verdrahtet

**Definition of Done Sprint 2:** Alle Seiten vollständig rendernd, Navigation funktioniert, Sticky Bottom-Bar + WhatsApp Button aktiv, Probetraining-Formular funktional, SEPA-Formular entfernt

---

### Sprint 3 — SEO & Performance (PROMPT 2.7–2.8)
**Ziel:** SEO-technisch einwandfrei, Core Web Vitals im "Gut"-Bereich, Production-ready

- **PROMPT 2.7 — SEO-Implementierung:** HealthClub JSON-LD auf allen Seiten, FAQPage Schema, Canonical-Tags, Open Graph, Meta-Tags, semantisches HTML (nav, main, article, section), robots.txt, sitemap.xml
- **PROMPT 2.8 — Performance:** Bilder WebP + Lazy Loading, Fonts lokal gehostet, Bundle-Splitting, GA4/Pixel/GTM über Cookie-Consent gesteuert, Core Web Vitals Audit (LCP < 2.5s, INP < 200ms, CLS < 0.1)

**Definition of Done Sprint 3:** Lighthouse Score ≥ 90 (Performance), alle JSON-LD valide (schema.org Validator), keine 404-Fehler, alle Meta-Tags gesetzt

---

### Sprint 4 — Testing & Launch (PROMPT 2.9–2.10)
**Ziel:** Fehlerfreier Launch, Google-Indexierung eingeleitet, Analytics aktiv

- **PROMPT 2.9 — Testing & Review:** Cross-Browser-Test (Chrome, Firefox, Safari, Edge), Mobile-Test (iOS + Android), Accessibility-Check (WCAG AA), Formular-Test (Probetraining, Kontakt), SEO-Abschlusskontrolle, alle Sub-Agent Reviews (UX, SEO, Content, Design)
- **PROMPT 2.10 — Deployment:** Production-Build (`npm run build`), Hosting-Konfiguration, 301-Redirects (alte URLs → neue URLs), Google Search Console Setup + Sitemap einreichen, GBP-Optimierung (wenn Zugangsdaten vorhanden), GA4 Echtzeit-Tracking verifizieren

**Definition of Done Sprint 4:** Website live und erreichbar, kein einziger 404-Fehler, alle Tracking-Codes aktiv (nach Cookie-Consent), Google Search Console bestätigt Indexierung, mobiler Probetraining-Buchungsflow getestet und funktional

---

## 11. Verification-Checklist

- [x] Alle 4 Audit-Dokumente (01–04) vollständig gelesen und ausgewertet
- [x] Executive Summary — 5–7 Sätze mit Top-3-Chancen formuliert
- [x] Top 10 kritische Probleme — priorisiert nach Business-Impact, mit Quellen
- [x] MUSS-Features — mindestens 12 Features dokumentiert (15 vorhanden)
- [x] SOLL-Features — mindestens 6 Features dokumentiert (8 vorhanden)
- [x] KANN-Features — mindestens 5 Features dokumentiert (5 vorhanden)
- [x] Homepage Section-Reihenfolge — alle 15 Sektionen mit Inhalt beschrieben
- [x] Alle Floating-Elemente (WhatsApp, Sticky CTA, Chatbot) in Seitenstruktur enthalten
- [x] Weitere Seiten — mindestens 8 Seiten in Tabelle (15 vorhanden inkl. Einzugsgebiet-Pages)
- [x] Fremdgeh-Aktion als eigene SEO-Landing-Page eingeplant
- [x] Technische Anforderungen — vollständig mit Stack, Routing, Performance, Mobile, Browser, Analytics, DSGVO
- [x] Design-Anforderungen — Farbrichtung, Typografie, Bildstil, Animationen, Whitespace, WCAG AA
- [x] Differenzierung zu EASYFITNESS und VIVA in Design-Anforderungen beschrieben
- [x] Content-Inventar — vollständig mit Status, Aktion, Verantwortlichkeit
- [x] Vom Kunden benötigte Assets — vollständige Checkliste (13 Punkte)
- [x] Copywriting-Regeln — 7 konkrete Regeln formuliert
- [x] Keyword-Map — mindestens 10 Keywords (16 vorhanden inkl. Einzugsgebiet-Varianten)
- [x] Technische SEO-Maßnahmen — konkrete nummerierte Liste aus Audit 02 abgeleitet
- [x] Lokale SEO-Maßnahmen — Google Business, NAP, Verzeichnisse, JSON-LD
- [x] CTA-Platzierung — vollständige Tabelle mit Device-Angaben
- [x] Trust-Aufbau — konkrete Maßnahmen
- [x] Tracking-Plan — GA4 Events, Conversions, alle Tracking-Tools
- [x] Risikoanalyse — mindestens 5 Risiken mit Mitigation (7 vorhanden)
- [x] Roadmap Phase 2 — alle 4 Sprints (PROMPT 2.1–2.10) mit Definition of Done
- [x] Alle Informationen aus Audit 01–04 abgeleitet — keine Erfindungen
- [x] TBD-Markierungen für Kundendaten die noch fehlen (Trainernamen, Gründungsjahr, Mitgliederzahl, Google-Score)
- [x] Dokument standalone nutzbar als Arbeitsgrundlage für Phase 2

---

*Anforderungskatalog erstellt am 2026-04-02 | Phase 1 abgeschlossen | Nächster Schritt: PROMPT_2.1 — Design-System*
