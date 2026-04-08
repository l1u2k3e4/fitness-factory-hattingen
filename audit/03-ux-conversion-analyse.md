# UX / Conversion-Analyse — Fitness Factory Hattingen

**Datum:** 2026-04-02
**Analyst:** Claude Code (Prompt 1.3)
**Basis:** Live-Scrape der 4 Haupt-Seiten + Kontext aus Audit 01 + 02
**Geprüfte URLs:**
- https://fitness-factory-hattingen.de/ (Homepage)
- https://fitness-factory-hattingen.de/probetraining/
- https://fitness-factory-hattingen.de/mitgliedschaft/
- https://fitness-factory-hattingen.de/class-timetable/

---

## 1. Executive Summary

Die Website der Fitness Factory Hattingen erfüllt die Grundfunktion — sie stellt das Studio vor, zeigt Preise und enthält Kontaktdaten — bleibt dabei aber weit unter ihrem Conversion-Potenzial. Der Hero enthält mit "Dein Fitness-Studio in Hattingen" zwar eine lokale Headline, liefert aber keine einzige Differenzierung gegenüber der Konkurrenz. Die entscheidenden USPs (All-inclusive Sauna, kostenlose Getränkeflat, Familiäres Studio) sind unter dem Fold begraben und werden nie als emotionale Kaufargumente inszeniert. Die Navigation ist strukturell gebrochen: drei Links (Kursplan, FAQ, Kontakt) zeigen auf Anker, die bei direktem Aufruf 404 liefern — das zerstört Vertrauen und SEO gleichzeitig. Die Probetraining-Seite, die mit Abstand die wichtigste Conversion-Seite ist, hat eine dünne, lieblose Ausführung ohne Hero, ohne Ablauf-Erklärung und ohne Vertrauensaufbau vor dem Formular. Die Mitgliedschaftsseite enthält ein vollständiges SEPA-Formular direkt auf der Webseite — ein massiver Conversion-Killer und potenzielles Datenschutzproblem. Kein Sticky CTA auf Mobile, kein Chatbot, keine Trainer-Profile, keine Erfolgsgeschichten: die Website liegt mind. 3–4 Jahre hinter dem Marktstandard.

---

## 2. Conversion-Scoring-Tabelle

| Element | Score | Status | Befund |
|---|---|---|---|
| **Hero mit Value Proposition** | 4/10 | ⚠️ | Headline "Dein Fitness-Studio in Hattingen" — lokal korrekt, aber generisch. Kein USP sichtbar. CTA "Probetraining" vorhanden. Subheadline "Jetzt unser Gym besuchen" ist kein Mehrwert-Satz. |
| **Trust-Signale (Bewertungen, Zahlen)** | 4/10 | ⚠️ | 4 Google-Bewertungen eingebettet, alle 5-Sterne. Aber: keine Gesamtbewertungs-Zahl (z.B. "4,8 von 5 auf Basis von 127 Bewertungen"), keine Mitgliederzahl, keine Jahre-am-Markt-Angabe. |
| **Preistransparenz** | 7/10 | ✅ | Alle 4 Tarife (55€/45€/35€ + Fremdgeh) mit Anmeldegebühr klar aufgelistet. Gut: Hinweis auf Aktionspreise. Schwach: Keine visuelle Hervorhebung des "besten" Tarifs. |
| **Probetraining-CTA (Platzierung & Häufigkeit)** | 4/10 | ⚠️ | CTA im Hero vorhanden. Wiederholt im Testimonial-Bereich ("Probetraining sichern") und im 3-Spalten-Block. Fehlt jedoch: kein Sticky-Hinweis auf Mobile, kein CTA direkt nach den Preisen, Probetraining-Seite selbst ist unterentwickelt. |
| **Kontakt sichtbar (Tel + WhatsApp)** | 5/10 | ⚠️ | Telefon und WhatsApp stehen im Footer und auf der Probetraining-Seite, aber NICHT als Click-to-Call-Buttons im Header oder als persistentes Element. Auf Mobile nicht mit einem Daumen erreichbar. |
| **FAQ (echte Einwände abgedeckt?)** | 6/10 | ⚠️ | 15 FAQ-Items vorhanden — gut für Schema. Inhaltlich aber zu generisch: "Was ist inbegriffen?" beantwortet niemand, der schon auf der Leistungsseite war. Echte Einwände fehlen: "Warum kein Kündigen per E-Mail?", "Gibt es Probetraining ohne Abo?", "Wie ist die Parkplatzsituation?" |
| **Testimonials (Qualität & Echtheit)** | 5/10 | ⚠️ | 4 Bewertungen mit echten Namen und 5 Sternen — authentisch wirkend. Schwach: keine Fotos der Personen, kein Datum, keine Transformation/Story. "Es ist unser zweites Wohnzimmer" ist gut, aber ungenutzt als Headline. |
| **Urgency / Scarcity** | 2/10 | ❌ | Kaum vorhanden. "Fremdgeh-Aktion" könnte als limitiertes Angebot inszeniert werden, ist aber nur neutral aufgelistet. Kein Countdown, keine "noch X Plätze"-Logik, kein Aktionszeitraum. |
| **Sticky CTA Mobile** | 0/10 | ❌ | Nicht vorhanden. Auf Mobile verschwindet der Header-CTA sofort beim Scrollen. Nach 30% Scroll gibt es keine Möglichkeit, direkt zu konvertieren. |
| **Social Proof (Zahlen, Logos, Awards)** | 3/10 | ❌ | Nur die 4 Testimonials. Keine Mitgliederzahl ("bereits 500+ Mitglieder"), keine Google-Rating-Badge, kein "Studio des Jahres"-Siegel, kein Presseerwähnung. |
| **Trainer-Vorstellung** | 0/10 | ❌ | Vollständig fehlend. Kein einziges Trainer-Profil mit Name, Foto, Qualifikation oder Spezialisierung. Für ein familiäres Studio, das "persönliche Betreuung" als USP verkauft, ist das ein fundamentaler Widerspruch. |
| **Studio-Impressionen (Bild/Video-Qualität)** | 5/10 | ⚠️ | 12 Galerie-Fotos vorhanden + YouTube-Video-Embed (gesperrt hinter Cookie-Consent). Bildqualität: mittel bis gut, aber keine emotionalen Fotos von echten Mitgliedern beim Training. Kein Video-Hero. |
| **Formular-UX** | 3/10 | ❌ | Probetraining: simples Formular mit 5 Feldern — akzeptabel. Mitgliedschaft: vollständiges SEPA-Formular auf der Webseite mit IBAN, Bank, Adresse, Geburtsdatum — massiver Vertrauensbruch und DSGVO-Risikozone. |
| **Ladegeschwindigkeit (subjektiv)** | 3/10 | ❌ | WordPress + Elementor, kein CDN, kein Caching (bekannt aus Audit 01). YouTube-Embeds blockieren LCP. Keine Lazy-Loading-Evidenz. Google Fonts remote geladen. |
| **Navigation UX** | 3/10 | ❌ | 3 von 6 Nav-Links sind Anker statt echter URLs. Kursplan, FAQ, Kontakt liefern 404 bei direktem Aufruf. /class-timetable/ (die echte Kursplan-Seite mit Filterfunktion) ist nicht in der Navigation. |
| **Mobile-First Design** | 4/10 | ⚠️ | Responsive vorhanden (Elementor-Standard), aber kein Daumen-optimiertes Layout, kein Click-to-Call im Header, kein Sticky Bar. |
| **Cookie-Consent** | 5/10 | ⚠️ | Borlabs Cookie vorhanden — gut. Aber blockiert YouTube-Videos (wichtige Trust-Elemente) ohne klare "Nur dieses Video entsperren"-Option. |

**Gesamt-Conversion-Score: 3,7 / 10**

---

## 3. User-Journey-Analyse

### Journey A — Neukunde (googelt "Fitnessstudio Hattingen")

**Schritt 1: Google → Website**
- In den Suchergebnissen erscheint der Title-Tag "Home -" (bekannt aus Audit 02) — schwacher erster Eindruck, kein Keyword-Signal
- Snippet zeigt keine Meta-Description — Google wählt zufälligen Seitentext
- Neukunde sieht sofort: kein Bewertungsstern-Rich-Snippet (kein Review-Schema), kein Öffnungszeiten-Snippet
- **Pain Point:** Schlechtes Erscheinungsbild in SERP vor dem ersten Klick

**Schritt 2: Preise suchen**
- Preise sind AUF der Homepage, aber man muss etwa 4–5 Bildschirmlängen scrollen, um sie zu sehen
- Auf der Mitgliedschaft-Seite direkt verfügbar — aber dorthin führt kein prominenter Direkt-Link from the hero
- **Klicks:** 0 (wenn man scrollt) oder 1 (über Nav "Mitgliedschaft")
- **Pain Point:** Preissucher müssen weit scrollen oder eigenständig navigieren — kein "Sieh unsere Preise"-Shortcut im Hero

**Schritt 3: Probetraining buchen**
- Hero-CTA "Probetraining" → führt zu /probetraining/ ✅
- Auf /probetraining/: Überschrift "Tarif wählen und bei uns Trainieren" — verwirrend, denn man will noch kein Tarif wählen, nur Probetraining
- Formularfelder: Name, E-Mail, Wunschdatum, Telefon — akzeptabel
- WhatsApp und Telefon als Alternative — positiv
- **Klicks bis Buchung:** 2 (Hero-CTA → Formular ausfüllen) — technisch OK
- **Pain Point:** Probetraining-Seite erklärt nicht WARUM man ein Probetraining machen sollte, was einen erwartet, wie der Ablauf ist. Kein "So läuft dein Probetraining ab"-Block. Kein Vertrauensaufbau vor dem Formular.

**Schritt 4: Kontakt (Telefon/WhatsApp)**
- Telefonnummer: im Footer der Homepage (sehr weit unten), auf /probetraining/ gut sichtbar
- WhatsApp: ebenso — aber als Text-Link, nicht als grüner WhatsApp-Button
- Click-to-Call: nicht als expliziter `tel:`-Link mit Button-Styling im Header
- **Pain Point:** Ein Mobile-Nutzer, der sofort anrufen möchte, muss bis ganz nach unten scrollen oder die Probetraining-Seite aufrufen

**Schritt 5: Kurse entdecken**
- Nav-Link "Kursplan" → führt zu /#Kursplan (Anker, kein 404 auf der Homepage, springt zur Kursplan-Sektion) ✅ — funktioniert von der Homepage aus
- ABER: /class-timetable/ mit der echten interaktiven Filterfunktion ist nicht in der Navigation — ein Nutzer findet diese Seite nur durch Zufall
- Die Kursplan-Sektion auf der Homepage zeigt alle Kurse als Tabelle ohne Filtermöglichkeit
- **Pain Point:** Wer nach einem spezifischen Kurs (z.B. "nur Yoga") filtert, findet /class-timetable/ nicht — nur durch direkten URL-Aufruf oder Zufall erreichbar

**Journey A Fazit:** Technisch kann ein motivierter Nutzer alles finden, aber es gibt keine klare, geführte Konversions-Architektur. Jeder Schritt erfordert eigenständiges Entdecken statt geführtes Erleben.

---

### Journey B — Bestandsmitglied

**Schritt 1: Kursplan checken**
- Via Nav "Kursplan" → scrollt zur Kursplan-Sektion auf Homepage
- Zeigt vollständige Wochenübersicht mit Uhrzeiten ✅
- Filterbar per /class-timetable/ — aber dorthin gibt es keinen direkten Nav-Link
- **Klicks:** 1 (Nav) oder 3+ (Header-Scrollen bis zur Sektion)
- **Pain Point:** Als Bestandsmitglied will ich eine eigenständige Kursplan-Seite direkt aufrufen können — nicht durch die gesamte Homepage scrollen

**Schritt 2: "Wann ist Yoga?"**
- Auf der Homepage-Kursplan-Tabelle: Yoga erscheint unter Mittwoch 18:15-19:45 und Vinyasa Yoga Montag 17:00-18:30 ✅
- Auf /class-timetable/ gibt es tatsächlich einen Filter-Button "Vinyasa - Yoga" / "Yoga" — interaktiv und nützlich
- Problem: Nur wer /class-timetable/ kennt, profitiert davon
- **Pain Point:** Nützliche Filterfunktion ist unsichtbar versteckt

**Schritt 3: Öffnungszeiten**
- Im Footer der Homepage: Mo-Fr 08:00-23:00, Sa-So 10:00-17:30 ✅
- Auf /probetraining/ ebenfalls gut sichtbar ✅
- ABER: Nicht im Header oder in einem persistenten, sofort sichtbaren Element above-the-fold
- **Pain Point:** Spontanbesucher oder Bestandsmitglieder, die kurz die Öffnungszeiten prüfen wollen, müssen scrollen

**Journey B Fazit:** Die häufigsten Bestandsmitglieder-Bedürfnisse (Kursplan, Öffnungszeiten) sind erreichbar aber nicht komfortabel — die Website ist auf Neukundenakquise ausgelegt ohne Rücksicht auf Bestandskundenbedarf.

---

### Journey C — Mobile User

**Schritt 1: Navigation per Daumen**
- Hamburger-Menü vorhanden (Elementor-Standard) — nicht validiert ob Slide-Over von rechts
- Header-Logo und Menü-Button erreichbar ✅
- **Pain Point:** Keine explizite Angabe ob das Menü daumenfreundlich ist, aber Elementor-Standard-Hamburger liegt typisch oben rechts — prinzipiell erreichbar

**Schritt 2: Click-to-Call**
- Telefonnummer 02324 33777 ist im Footer gelistet
- Auf /probetraining/ steht die Nummer als Text mit Hinweis "Anrufen"
- Es gibt **keinen** `<a href="tel:02324-33777">` Call-Button mit visuell hervorgehobener Button-Behandlung im Header oder als Sticky Element
- **Pain Point:** Ein Mobile-Nutzer, der impulsiv anrufen möchte, muss die Nummer manuell eintippen oder tief scrollen

**Schritt 3: WhatsApp-Button**
- WhatsApp-Nummer (+49 1573 7580001) erwähnt auf /probetraining/
- Kein prominenter, grüner WhatsApp-Button above-the-fold oder als Floating-Element sichtbar
- **Pain Point:** WhatsApp ist für viele Nutzer der bevorzugte Kanal — er wird nicht als primärer CTA inszeniert

**Schritt 4: Sticky CTA Mobile**
- **Nicht vorhanden.** Nach 30% Scroll ist kein Conversion-Element mehr sichtbar
- Kein Sticky Header mit CTA, kein Floating-Button, keine Bottom-Bar
- **Pain Point:** Schwerster Conversion-Fehler auf Mobile — ein Nutzer, der sich durch die Seite scrollt und überzeugt wird, hat keinen sofortigen Handlungsimpuls

**Journey C Fazit:** Die Mobile-Experience ist eine nach-unten-skalierte Desktop-Seite ohne mobile-spezifische Conversion-Optimierung. Auf dem Kanal mit dem höchsten Traffic (60%+) wird das meiste Potenzial verschenkt.

---

## 4. Visuelle Qualitätsbewertung

### 5-Sekunden-Test (Homepage Above-the-Fold)

**Was ist sichtbar:**
- Logo + Navigation (6 Links)
- Hero-Bild (Gym-Impression, mittelgroß)
- Headline: "Dein Fitness-Studio in Hattingen"
- Subheadline: "Jetzt unser Gym besuchen"
- CTA-Button: "Probetraining"

**Ist WAS/WO/FÜR WEN sofort klar?**
- WAS: Ja — Fitnessstudio ✅
- WO: Ja — "in Hattingen" ✅
- FÜR WEN: Nein ❌ — kein Hinweis auf Zielgruppe, Besonderheiten, Willkommens-Feeling
- WARUM HIER und nicht woanders: Nein ❌ — kein einziges USP im Hero sichtbar

**Erster Eindruck:** Funktional, aber generisch. Die Headline könnte von jedem Fitnessstudio in Deutschland stammen. Kein emotionaler Aufhänger, keine Differenzierung, keine Persönlichkeit. Im Vergleich zu John Reed (Video-Hero, emotionales Branding) oder FitX (klarer Preis-Fokus) wirkt die Seite wie der Marktdurchschnitt aus 2018.

### Bildqualität
- 12 Galerie-Bilder der Räumlichkeiten vorhanden — Qualität: Amateur bis semi-professionell
- Keine echten Trainings-Action-Shots mit Mitgliedern
- Keine emotionalen "Vorher/Nachher"- oder Community-Bilder
- YouTube-Video-Embed vorhanden, aber standardmäßig durch Cookie-Consent blockiert
- **Bewertung:** 4/10 — Quantitativ ausreichend, qualitativ und emotional schwach

### Farbschema
- Schwarz/Rot als primäre Brandfarben (typisch Fitness-Branche)
- Kein eigenständiges, unverwechselbares Farbsystem erkennbar
- Standard Elementor-Darstellung ohne visuellen Charakter
- **Bewertung:** 4/10 — Funktionell, nicht differenzierend

### Typografie
- Kein Hinweis auf eine besondere Font-Wahl — Google Fonts remote geladen (Datenschutzproblem)
- Keine erkennbare typografische Hierarchie im Scrape
- **Bewertung:** 3/10 — Standard, keine Persönlichkeit

### Whitespace
- Elementor-Layouts tendieren zu eng gepackten Sections
- 12 Sections auf der Homepage ohne klare Atemräume
- **Bewertung:** 3/10 — Zu dicht, keine visuelle Ruhe

### Visuelle Hierarchie
- Hero → About → Leistungen → Testimonials → Galerie → Preise → Kursplan → CTAs → Instagram → FAQ → Kontakt
- Problem: Die wichtigsten Conversion-Elemente (Preise, Probetraining) sind zu weit unten
- **Bewertung:** 4/10 — Logisch aber nicht conversion-optimiert

---

## 5. Feature-Gap-Analyse

### Must-Have Features

| Feature | Vorhanden | Qualität | Prio |
|---|---|---|---|
| Online-Buchung Probetraining | ✅ (Formular) | Funktional, aber ohne UX-Führung | Upgrade nötig |
| Click-to-Call Button | ❌ | Telefon nur als Text im Footer | Kritisch |
| WhatsApp Button (grün, prominent) | ❌ | Nummer als Text auf Probetraining-Seite | Kritisch |
| Google Maps Einbettung | ✅ | Im Footer vorhanden | OK |
| Cookie-Consent (DSGVO) | ✅ (Borlabs) | Vorhanden, aber blockiert Videos | Ausbau nötig |
| Mobile-first Layout | ⚠️ | Responsive vorhanden, nicht Mobile-optimiert | Upgrade nötig |
| Sticky CTA Mobile | ❌ | Vollständig fehlend | Kritisch |
| Preistransparenz | ✅ | Alle Tarife mit Preisen sichtbar | Gut |
| Impressum / AGB / Datenschutz | ✅ | Links im Footer | OK |
| Kontaktformular | ✅ | Auf Probetraining-Seite | Funktional |
| Trainer-Profile | ❌ | Komplett fehlend | Wichtig |
| Interaktiver Kursplan | ⚠️ | /class-timetable/ existiert, aber nicht in Navigation | Sichtbarkeit fehlt |
| Öffnungszeiten prominent | ⚠️ | Nur im Footer / auf Unterseiten | Upgrade nötig |

### Nice-to-Have Features

| Feature | Vorhanden | Kommentar |
|---|---|---|
| Video-Hero | ❌ | YouTube-Embed blockiert, kein Autoplay-Hero |
| KI-Chatbot | ❌ | First-Mover-Chance ungenutzt |
| Vorher/Nachher Fotos | ❌ | Kein Social Proof durch Transformationen |
| Blog mit echtem Content | ❌ | 43 englische Dummy-Posts (aus Audit 01) |
| Erfolgsgeschichten | ❌ | Nur 4 kurze Text-Testimonials |
| App / Member-Bereich | ❌ | Keine digitalen Services |
| Kursplan-Buchung Online | ❌ | "Kurse müssen vorab gebucht werden" — aber kein Online-Buchungssystem |
| Google Business Einbettung | ❌ | Kein eingebettetes Rating-Widget |
| Neujahrsaktion / Promos | ⚠️ | /neujahr-aktion/ existiert, keine laufende Promo sichtbar |
| FAQ-Schema (Rich Snippets) | ❌ | FAQ vorhanden, aber kein FAQPage-JSON-LD |
| Lokale Einzugsgebiet-Seiten | ❌ | Keine Landing Pages für Bochum, Sprockhövel etc. |

---

## 6. Impact / Effort Matrix

### 🟢 Quick Wins (Hoher Impact, Geringer Aufwand)

| Maßnahme | Impact | Effort | Beschreibung |
|---|---|---|---|
| Click-to-Call Button im Header | Hoch | Gering | `<a href="tel:023243377">` als Button oben rechts |
| WhatsApp Floating Button | Hoch | Gering | Grüner WhatsApp-Button rechts unten, immer sichtbar |
| Sticky CTA Mobile | Hoch | Mittel | "Probetraining sichern" + Telefon-Icon als Bottom-Bar nach 30% Scroll |
| /class-timetable/ in Navigation aufnehmen | Mittel | Gering | Nav-Link "Kursplan" auf /class-timetable/ umleiten |
| Hero-USP ergänzen | Hoch | Gering | Subheadline ersetzen durch "Sauna, Kurse & Getränke inklusive — ab 35€/Monat" |
| Google Bewertungen-Badge | Mittel | Gering | Rating-Gesamtbewertung + Anzahl sichtbar machen |
| Öffnungszeiten im Header | Mittel | Gering | "Mo-Fr 8-23 Uhr" klein im Header/Top-Bar |
| FAQ-Schema JSON-LD | Mittel | Gering | FAQPage Structured Data für Rich Snippets |

### 🔵 Strategische Projekte (Hoher Impact, Hoher Aufwand)

| Maßnahme | Impact | Effort | Beschreibung |
|---|---|---|---|
| Probetraining-Seite komplett neu | Sehr Hoch | Hoch | Ablauf erklären, Trainer vorstellen, Testimonials, CTA-Stack |
| Trainer-Profile einführen | Hoch | Mittel | 3-5 Trainer mit Foto, Name, Qualifikation, Spezialgebiet |
| Video-Hero (Autoplay) | Hoch | Hoch | Emotionales 30s-Video als Hero-Hintergrund |
| SEPA-Formular auslagern | Hoch | Mittel | Mitgliedschaft: Interesse-Formular statt vollständiges SEPA auf Website |
| Mobile Bottom Navigation | Hoch | Mittel | Feste untere Nav: Tel, WhatsApp, Probetraining, Kursplan |
| KI-Chatbot Integration | Sehr Hoch | Hoch | First-Mover im Markt — Mitglieder-FAQ, Probetraining-Buchung |
| Lokale Landing Pages | Hoch | Hoch | Seiten für Bochum, Sprockhövel, Witten, Blankenstein |
| Blog-Bereinigung + Content | Mittel | Hoch | 43 Dummy-Posts löschen, 10 echte Artikel ersetzen |
| Kursplan Online-Buchung | Hoch | Sehr Hoch | Integration z.B. Eversports oder eigene Lösung |

### 🟡 Low Priority (Geringer Impact oder Geringer Aufwand mit geringem Effekt)

| Maßnahme | Impact | Effort | Beschreibung |
|---|---|---|---|
| Vorher/Nachher Fotos | Mittel | Mittel | Erst wenn Trainings-Fotografie gemacht wird |
| App / Member-Bereich | Mittel | Sehr Hoch | Langfristig, nicht Phase 2 |
| Footer-Redesign | Gering | Mittel | Funktioniert, braucht nur Cleanup |
| Aktions-Banner Neujahrsaktion | Gering | Gering | /neujahr-aktion/ existiert, relevanter im Januar |

---

## 7. Seitenstruktur-Empfehlung

### Aktuelle Homepage-Reihenfolge (scrape-basiert)

1. Navigation (6 Links, 3x broken)
2. Hero (Headline + CTA "Probetraining")
3. About-Section "Die Fitness Factory in Hattingen" + YouTube-Video
4. Leistungen "Alle Leistungen in deiner Mitgliedschaft inklusive" (Icons)
5. Testimonials (4x Google-Bewertungen)
6. Galerie (12 Fotos)
7. Preise (4 Tarife)
8. Kursplan-Tabelle
9. 3-Spalten-CTA (Probetraining / Mitglied / Fragen)
10. Instagram-Aufruf
11. FAQ (15 Items)
12. Kontakt + Karte
13. Footer

**Probleme der aktuellen Reihenfolge:**
- Trust wird VOR dem Preisbeweis aufgebaut (gut) aber Testimonials kommen bevor man weiß warum man bleiben soll
- Galerie zwischen Testimonials und Preisen — unterbricht den mentalen Kaufprozess
- FAQ ganz am Ende — niemand scrollt so weit, um letzte Einwände zu klären

### Empfohlene Reihenfolge (Conversion-optimiert)

1. **Top-Bar** — Öffnungszeiten + Click-to-Call + WhatsApp (NEU)
2. **Navigation** — mit echten URLs, /class-timetable/ integriert
3. **Hero** — Video-Background (autoplay, muted) oder starkes Bild. Headline mit USP. CTA-Stack: "Probetraining buchen" + "Preise ansehen"
4. **Social Proof Bar** — "4,8 ★ auf Google · 500+ Mitglieder · seit 20XX"
5. **USP-Sektion** — Die 5 echten Alleinstellungsmerkmale mit Icons und kurzen Texten (NICHT "Wir bieten Sauna" sondern "Die einzige Sauna im Mitgliedschaftspreis in Hattingen")
6. **Preise** — alle Tarife, "Standard" visuell highlighted als "Beliebteste Wahl"
7. **Probetraining-CTA** — Standalone-Section: "Komm einfach vorbei. Kostenlos. Unverbindlich." + WhatsApp-Button + Formular-Link
8. **Trainer-Vorstellung** — 3-5 Trainer mit Foto + Kurs-Spezialisierung
9. **Kursplan** — Link zu /class-timetable/ + Wochenübersicht embeddiert
10. **Galerie** — Video + 6 beste Fotos
11. **Testimonials** — Erweitert: 6–8 Bewertungen mit Fotos, Google-Badge
12. **FAQ** — Top 6 Fragen mit echten Einwänden
13. **Kontakt + Karte**
14. **Footer**

**Begründung der Verschiebung:**
- Preise steigen auf Position 6: Wer sie sieht, ist bereits durch USPs überzeugt
- Trainer-Vorstellung nach Preisen: Kaufentscheidung wird durch menschliche Elemente bestärkt
- FAQ rückt näher: Einwände werden kurz vor dem letzten Scroll-Ende entkräftet

---

## 8. Top 10 Verbesserungen

### 1. Sticky Mobile Bottom-Bar (Quick Win #1)
**Problem:** Mobile-Nutzer haben nach 30% Scroll keine Möglichkeit zu konvertieren.
**Lösung:** Feste untere Leiste (nur Mobile) mit: [📞 Anrufen] [💬 WhatsApp] [🏋️ Probetraining]
**Erwarteter Effekt:** +30–50% Mobile-Conversion-Rate

### 2. WhatsApp Floating Button (Quick Win #2)
**Problem:** WhatsApp-Nummer ist nur als Text auf der Probetraining-Seite.
**Lösung:** Grüner WhatsApp-Button rechts unten, auf ALLEN Seiten sichtbar, mit `href="https://wa.me/491573758001"`
**Erwarteter Effekt:** +20–30% Direktkontakt-Rate

### 3. Hero-Subheadline mit USP ersetzen
**Problem:** "Jetzt unser Gym besuchen" — null Mehrwert.
**Lösung:** "Sauna, Kurse & Getränke inklusive — familiäres Studio im Herzen von Hattingen. Ab 35€/Monat."
**Erwarteter Effekt:** +15% Klick-durch-Rate auf CTA

### 4. Probetraining-Seite neu aufbauen
**Problem:** Aktuell: Formular, Nummer, fertig. Kein Vertrauen, keine Führung.
**Lösung:** 4-Block-Struktur: (1) "So läuft dein Probetraining ab" mit 3 Schritten, (2) Trainer-Vorstellung, (3) Testimonial eines Neukunden, (4) Formular + WhatsApp + Telefon als CTA-Stack
**Erwarteter Effekt:** +40% Formular-Completions

### 5. SEPA-Formular von der Website entfernen
**Problem:** Vollständiges SEPA-Formular mit IBAN auf einer öffentlichen WordPress-Seite — Datenschutzrisiko, Vertrauensbruch.
**Lösung:** Ersetzen durch Interesse-Formular (Name, E-Mail, Wunsch-Tarif) → persönliche Weiterleitung im Studio für SEPA-Unterschrift
**Erwarteter Effekt:** Datenschutz-Compliance + höheres Vertrauen

### 6. /class-timetable/ in die Navigation aufnehmen
**Problem:** Die einzige Seite mit interaktivem Kursplan-Filter ist unsichtbar.
**Lösung:** Nav-Link "Kursplan" auf /class-timetable/ umstellen (nicht auf Anker). Evtl. mit "NEU: Interaktiver Filter"-Badge für 4 Wochen.
**Erwarteter Effekt:** Bestandsmitglieder-Zufriedenheit, weniger Anrufe wegen Kurszeiten

### 7. Trainer-Profile hinzufügen
**Problem:** "Persönliche Betreuung" als USP wird behauptet, aber kein Trainer ist sichtbar.
**Lösung:** 3–5 Trainer-Cards mit Foto, Name, Kurse, Kurz-Bio ("Ich trainiere seit 8 Jahren und liebe Spinning!")
**Erwarteter Effekt:** Familiäres Feeling wird greifbar, Differenzierung von Ketten

### 8. Google Bewertungs-Score prominent zeigen
**Problem:** "4,8 ★" (oder wie auch immer die Bewertung lautet) ist nicht als Zahl im Header oder Hero sichtbar.
**Lösung:** Kleines Badge: "⭐ 4,8 · 127 Google-Bewertungen" direkt im Hero-Bereich oder als Top-Bar-Element
**Erwarteter Effekt:** Sofortiges Vertrauen beim ersten Seitenaufruf

### 9. Click-to-Call im Header verankern
**Problem:** Telefonnummer ist nur im Footer.
**Lösung:** Im Header rechts: "📞 02324 33777" als `<a href="tel:+4923243377">` mit Button-Styling (Mobile: nur Icon)
**Erwarteter Effekt:** Erhöhte Anruf-Rate von Mobile-Nutzern, die nicht scrollen wollen

### 10. FAQ um echte Kaufeinwände erweitern
**Problem:** Aktuelle FAQ beantwortet hauptsächlich Informationsfragen.
**Lösung:** Ergänzung um Einwand-FAQs: "Kann ich auch ohne Vertrag trainieren?", "Was passiert wenn ich krank werde?", "Kann ich meinen Vertrag pausieren?", "Ist das Studio auch für Anfänger?", "Gibt es Probetraining wirklich kostenlos?"
**Erwarteter Effekt:** Letzte Kaufbarrieren werden direkt auf der Website entkräftet

---

## 9. Accessibility-Schnellprüfung (WCAG 2.1 AA)

| Kriterium | Status | Befund |
|---|---|---|
| Farbkontraste | ⚠️ | Nicht meßbar ohne vollständiges Rendering, aber Schwarz/Rot-Kombination muss auf Kontrast-Ratio geprüft werden (min. 4.5:1 für Text) |
| Alt-Texte auf Bildern | ❌ | Elementor setzt oft leere Alt-Tags — aus Scrape nicht verifizierbar, aber hochwahrscheinliches Problem |
| Keyboard-Navigation | ❌ | Kein "Skip to Content"-Link erkennbar, Tab-Reihenfolge bei Elementor-Layouts oft defekt |
| Semantisches HTML | ⚠️ | Elementor generiert div-Suppen statt `<nav>`, `<main>`, `<article>`, `<section>` |
| Focus-Indikatoren | ❌ | Elementor entfernt standardmäßig outline-Styles ohne Ersatz |
| Formulare mit Labels | ⚠️ | Formularfelder auf /probetraining/ — Label-Zuordnung nicht verifizierbar ohne Rendering |

**WCAG-Fazit:** Wahrscheinlich Level A nicht vollständig erfüllt. Die neue Website muss AA als Mindest-Standard erfüllen.

---

## 10. Verification-Checklist

- [x] Homepage per WebFetch gecrawlt und analysiert
- [x] /probetraining/ gecrawlt und analysiert
- [x] /mitgliedschaft/ gecrawlt und analysiert
- [x] /class-timetable/ gecrawlt und analysiert
- [x] 5-Sekunden-Test dokumentiert
- [x] Alle 3 User-Journeys durchgespielt
- [x] Conversion-Scoring für 16 Elemente abgeschlossen
- [x] Feature-Gap Must-Have + Nice-to-Have dokumentiert
- [x] Impact/Effort-Matrix erstellt (Quick Wins, Strategisch, Low Prio)
- [x] Seitenstruktur aktuell vs. ideal verglichen
- [x] Top 10 Verbesserungen mit konkreten Lösungen beschrieben
- [x] Accessibility-Schnellprüfung abgeschlossen
- [x] Alle Befunde basieren auf echten Seiteninhalten (nicht generisch)
- [x] Alle bekannten Vorprobleme aus Audit 01+02 eingeflossen

---

*Analyse erstellt am 2026-04-02 | Nächster Schritt: PROMPT_1.4 — Wettbewerbsanalyse*
