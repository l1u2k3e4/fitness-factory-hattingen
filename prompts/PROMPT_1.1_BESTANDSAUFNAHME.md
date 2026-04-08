# PROMPT 1.1 — Vollständige Bestandsaufnahme

> **Phase:** 1 (Analyse)
> **Sub-Agent:** `.claude/agents/website-scraper.md`
> **Output:** `audit/01-bestandsaufnahme.md`
> **Geschätzte Dauer:** 10–15 Minuten

---

## WICHTIG: Vor dem Start

1. **Lies `CLAUDE.md`** im Projektstamm für den vollständigen Projektkontext
2. **Lies den Sub-Agent** `.claude/agents/website-scraper.md` für die detaillierte Aufgabenbeschreibung
3. **Erstelle den Ordner** `audit/` falls noch nicht vorhanden

---

## Auftrag

Du bist ein erfahrener Web-Analyst. Besuche die Website **https://fitness-factory-hattingen.de/** und dokumentiere ALLES in einem vollständigen, strukturierten Markdown-Dokument.

### 1. Technische Basis

- CMS/Framework identifizieren (WordPress? Elementor? Welche Versionen?)
- Hosting-Provider (wenn erkennbar)
- SSL-Zertifikat Status
- Cookie-Management-Lösung (Borlabs Cookie?)
- Tracking-Pixel (Google Analytics ID, Facebook Pixel, Google Ads?)
- Formulare-Plugin (Contact Form 7?)
- Caching-Lösung?
- CDN im Einsatz?

### 2. Sitemap — Alle erreichbaren Seiten

Besuche JEDE Seite und dokumentiere pro Seite:

| Seite | URL | Title-Tag | Meta-Description | H1 |
|---|---|---|---|---|
| Homepage | / | ? | ? | ? |
| Kursplan | /kursplan | ? | ? | ? |
| Probetraining | /probetraining | ? | ? | ? |
| Mitgliedschaft | /mitgliedschaft | ? | ? | ? |
| FAQ | /faq | ? | ? | ? |
| Kontakt | /kontakt | ? | ? | ? |
| Impressum | /impressum | ? | ? | ? |
| Datenschutz | /datenschutz | ? | ? | ? |
| Blog/Lifestyle | /category/lifestyle/ | ? | ? | ? |

### 3. Homepage — Section für Section

Dokumentiere jede Section der Homepage einzeln:

```
Section [Nummer]: [Name/Beschreibung]
├── Position: [Reihenfolge auf der Seite]
├── Hintergrund: [Farbe/Bild/Gradient]
├── Headline: [EXAKTER Text]
├── Subline/Body: [EXAKTER Text]
├── CTA-Buttons: [Text → Ziel-URL]
├── Bilder: [Beschreibung, Alt-Text falls vorhanden]
├── Videos: [YouTube/Vimeo URL, Beschreibung]
└── Besonderheiten: [Slider, Accordion, Grid, etc.]
```

### 4. Geschäftsdaten (EXAKT wie auf der Website)

Dokumentiere aus der Website — keine Daten aus der CLAUDE.md verwenden, sondern prüfen ob die Website-Daten mit der CLAUDE.md übereinstimmen:

- Firmenname + Rechtsform
- Adresse (exakt wie dargestellt)
- Telefonnummer(n)
- E-Mail-Adresse(n)
- WhatsApp-Nummer
- Öffnungszeiten (exakt)
- Social Media URLs
- **Preise** (alle Pakete mit exakten Zahlen und Bedingungen)
- **Kursplan** (alle Kurse, Tage, Uhrzeiten)
- Trainer-Namen (falls genannt)
- Google-Bewertungen (exakte Zitate)
- Impressum-Daten (Geschäftsführer, HRB, USt-IdNr.)

### 5. Visuelles Inventar

- **Logo:** Beschreibung, Varianten, Position
- **Farbschema:** Hauptfarben identifizieren (Hex-Codes aus CSS extrahieren)
- **Schriftarten:** Font-Families aus dem CSS
- **Bilder:** Kategorisieren (Studio-Fotos, Trainer, Stock, Icons) mit Anzahl
- **Videos:** Quellen, Inhalte
- **Icons:** Icon-Set (FontAwesome? Elementor-Icons? Custom?)

### 6. Interaktive Elemente & Features

- Kontaktformular: Felder, Pflichtfelder, Validierung, Ziel
- Kursplan: Darstellung (Tabelle/Cards?), filterbar?, buchbar?
- Galerie: Lightbox?, Slider?, Grid?, Anzahl Bilder
- FAQ: Accordion?, Alle offen?, Anzahl Fragen
- Bewertungen: Quelle (Google?), Darstellung, Anzahl
- Navigation: Desktop-Layout, Mobile Hamburger, Smooth Scroll?
- Cookie-Banner: Optionen, Plugin
- Chat/Chatbot: vorhanden?

---

## Verification

Bevor du speicherst, prüfe:

- [ ] Alle Seiten der Website besucht und dokumentiert?
- [ ] Homepage Section-für-Section komplett?
- [ ] Alle Geschäftsdaten exakt übernommen?
- [ ] Preise und Kursplan vollständig?
- [ ] Impressum-Daten dokumentiert?
- [ ] Visuelles Inventar komplett?
- [ ] Alle interaktiven Elemente erfasst?

---

## Output

Speichere als **`audit/01-bestandsaufnahme.md`**

Dieses Dokument ist die GRUNDLAGE für alle weiteren Analysen. Sei EXTREM gründlich — nichts darf fehlen.
