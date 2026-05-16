// ─────────────────────────────────────────────────────────────────
// Fitness Factory — Relaunch Deck: alle neuen Slides anlegen
// Einmaliger Figma Plugin API Script (use_figma)
// Template-Slide: 11:261 ("Website aktuell Fitness Factory")
// ─────────────────────────────────────────────────────────────────

await figma.loadFontAsync({ family: "Inter", style: "Bold" });
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });

// Template zum Klonen
const template = await figma.getNodeByIdAsync("11:261");
if (!template) throw new Error("Template 11:261 not found");

// Farben
const WHITE = { r: 1, g: 1, b: 1 };
const DIM = { r: 0.65, g: 0.65, b: 0.65 };
const RED = { r: 0.91, g: 0.33, b: 0.12 };
const GREEN = { r: 0.13, g: 0.77, b: 0.36 };
const AMBER = { r: 0.94, g: 0.63, b: 0.13 };

// Slide-Daten
const slides = [
  { id: "D1", type: "divider", page: "11", kicker: "KAPITEL 1", title: "Die aktuelle\nWebsite.", subtitle: "Wo sie steht. Was sie kostet." },
  { id: "P1", type: "problem", page: "12", kicker: "PROBLEM 01 · NAVIGATION", title: "4 Hauptseiten\nliefern 404.", bullets: ["/kursplan/ — nicht erreichbar", "/kontakt/ — nicht erreichbar", "/faq/ — nicht erreichbar", "/leistungen/ — nicht erreichbar"], footer: "Jeder vierte Klick im Hauptmenü landet im Nichts.", screenshot: "old/03-404-error.png" },
  { id: "P2", type: "problem", page: "13", kicker: "PROBLEM 02 · DATENSCHUTZ", title: "Bankdaten\noffen im Netz.", bullets: ["SEPA-Formular mit IBAN-Feld öffentlich zugänglich", "Keine Einwilligungsstrecke, kein Server-seitiger Schutz", "Massives DSGVO-Risiko für die GmbH"], footer: "Ein einziger Screenshot reicht für eine Abmahnung.", screenshot: "old/02-mitgliedschaft.png" },
  { id: "P3", type: "problem", page: "14", kicker: "PROBLEM 03 · MOBILE", title: "Kein CTA\nauf dem Handy.", bullets: ["Nach 30% Scroll kein sichtbarer Call-to-Action mehr", "Kein Sticky-Bar, kein Click-to-Call im Header", "60%+ der Besucher kommen über das Handy"], footer: "Erwartbarer Uplift bei Fix: +30–50% Mobile-Conversion." },
  { id: "P4", type: "problem", page: "15", kicker: "PROBLEM 04 · VERTRAUEN", title: "Die Trainer\nsind unsichtbar.", bullets: ["Kein einziger Trainer mit Name, Foto oder Qualifikation", "USP „familiäres Studio\" ohne Gesichter", "Ketten wie FitX/McFit haben das gleiche Bild"], footer: "Das stärkste Differenzierungsmerkmal bleibt ungenutzt." },
  { id: "P5", type: "problem", page: "16", kicker: "PROBLEM 05 · CONVERSION", title: "Conversion-\nScore: 3,7/10.", bullets: ["Keine Sticky-CTA, keine Trust-Signale im Hero", "Preise & Probetraining zu weit unten", "Keine Urgency, kein Scarcity-Framing"], footer: "Die Seite konvertiert weit unter ihrem Potenzial." },
  { id: "P6", type: "problem", page: "17", kicker: "PROBLEM 06 · ERREICHBARKEIT", title: "Telefon nur\nim Footer.", bullets: ["Keine Telefonnummer im Header", "Kein Click-to-Call für Mobile", "Kein WhatsApp-Kontakt sichtbar"], footer: "Der schnellste Weg zum Kunden ist unter 3 Scrolls vergraben." },
  { id: "P7", type: "problem", page: "18", kicker: "PROBLEM 07 · CONTENT", title: "Detailfehler\nüberall.", bullets: ["„MitgliedSchaft\" — Schreibfehler im Seitentitel", "H1 auf Probetraining-Seite spricht über Tarife", "12 Galerie-Bilder ohne Alt-Text"], footer: "Kleine Fehler. Großer Eindruck von Unprofessionalität.", screenshot: "old/01-startseite.png" },
  { id: "P8", type: "problem", page: "19", kicker: "PROBLEM 08 · TECHNIK", title: "Technologie-\nBallast.", bullets: ["WordPress + Elementor + WPBakery parallel", "Google Fonts remote, reCAPTCHA, unsemantisches HTML", "Videos hinter Cookie-Gate, YouTube blockiert"], footer: "Jede Optimierung kämpft gegen den Stack, nicht mit ihm." },
  { id: "D2", type: "divider", page: "20", kicker: "KAPITEL 2", title: "Die neue\nWebsite.", subtitle: "Gebaut für Handys. Gebaut für Kunden." },
  { id: "V1", type: "benefit", page: "21", kicker: "VORTEIL 01 · MOBILE", title: "Sticky-CTA.\nImmer sichtbar.", bullets: ["Anrufen · WhatsApp · Probetraining — immer sichtbar", "Kein Scrollen zur Conversion mehr nötig", "Header mit Click-to-Call Desktop + Mobile"], footer: "Erwartbarer Uplift: +30–50% Mobile-Conversion-Rate.", screenshot: "new/01-hero.png" },
  { id: "V2", type: "benefit", page: "22", kicker: "VORTEIL 02 · WHATSAPP", title: "WhatsApp auf\njeder Seite.", bullets: ["Grüner Button fixiert unten rechts, alle Routen", "Direktkontakt ohne Formular, ohne Hürde", "Vorformulierte Nachricht je nach Einstiegsseite"], footer: "Erwartbarer Uplift: +20–30% Direktkontakt-Rate." },
  { id: "V3", type: "benefit", page: "23", kicker: "VORTEIL 03 · TRAINER", title: "Das Team\nwird sichtbar.", bullets: ["Trainer-Profile mit Foto, Name, Spezialisierung", "„Familiäres Studio\" bekommt Gesichter", "Differenzierung vs. Ketten wird greifbar"], footer: "Vertrauen entsteht durch Menschen, nicht durch Slogans.", screenshot: "new/06-ueber-uns.png" },
  { id: "V4", type: "benefit", page: "24", kicker: "VORTEIL 04 · DATENSCHUTZ", title: "DSGVO-sicher\nby design.", bullets: ["SEPA-Formular komplett entfernt", "Interesse-Formular, Bankdaten-Unterschrift im Studio", "Alle Formulare mit Einwilligung + SSL"], footer: "Keine Bankdaten mehr im öffentlichen Netz." },
  { id: "V5", type: "benefit", page: "25", kicker: "VORTEIL 05 · PROBETRAINING", title: "Probetraining,\nneu gedacht.", bullets: ["4-Block-Flow: Termin → Ankommen → Trainieren → Entscheiden", "Trust-Anker, Trainer-Foto, Testimonial", "CTA-Stack am Seitenende"], footer: "Erwartbarer Uplift: +40% Formular-Completions.", screenshot: "new/02-probetraining.png" },
  { id: "V6", type: "benefit", page: "26", kicker: "VORTEIL 06 · TRUST", title: "Trust im\nHero.", bullets: ["Google-Rating + Review-Count im ersten Blick", "Echte Mitglieder-Testimonials", "Trust-Bar: Mitgliederzahl, Jahre, Kurse"], footer: "Social Proof, bevor der Kunde scrollt." },
  { id: "V7", type: "benefit", page: "27", kicker: "VORTEIL 07 · TECH", title: "Vite · React ·\nTypeScript.", bullets: ["Kein WordPress, kein Elementor, kein Plugin-Zoo", "Statisches Build, Auto-Deploy bei jedem Commit", "Unter 2 Sekunden Ladezeit auf 4G"], footer: "Eine Codebasis, die mitwächst statt zu bremsen." },
  { id: "V8", type: "benefit", page: "28", kicker: "VORTEIL 08 · PERFORMANCE", title: "Core Web\nVitals: grün.", bullets: ["LCP unter 2,5s — schneller Erstinhalt", "INP unter 200ms — sofortige Reaktion", "CLS unter 0,1 — kein springendes Layout"], footer: "Schnell genug, dass niemand mehr wartet.", screenshot: "new/04-mitgliedschaft.png" },
  { id: "D3", type: "divider", page: "29", kicker: "KAPITEL 3", title: "Mehr als\nRelaunch.", subtitle: "Weitere Verbesserungen, die du bekommst." },
  { id: "W1", type: "benefit", page: "30", kicker: "EXTRA 01 · POSITIONIERUNG", title: "All-inclusive,\nnicht Aufpreis.", bullets: ["Sauna, Getränkeflat, alle Kurse, Beratung", "Alle Tarife, dieselbe Leistung", "Keine versteckten Extras, keine Upsells"], footer: "Der größte USP bekommt endlich die Bühne." },
  { id: "W2", type: "benefit", page: "31", kicker: "EXTRA 02 · AKTION", title: "Fremdgehen\nlohnt sich.", bullets: ["3 Monate gratis bei bestehendem Vertrag woanders", "Eigenes Aktions-Banner auf Mitgliedschafts-Seite", "Markteinzigartiges Angebot — endlich sichtbar"], footer: "Ein Switcher-Hebel, den kein Mitbewerber hat." },
  { id: "W3", type: "benefit", page: "32", kicker: "EXTRA 03 · WETTBEWERB", title: "Du vs. die\nKetten.", bullets: ["FitX: keine Sauna, keine Beratung", "McFit: 24/7 aber unpersönlich", "VIVA: günstiger, aber keine Atmosphäre"], footer: "Familiär schlägt Kette — auf jeder einzelnen Metrik." },
  { id: "W4", type: "benefit", page: "33", kicker: "EXTRA 04 · ERWARTUNG", title: "Familiär statt\nMassenstudio.", bullets: ["Persönliche Ernährungsberatung inklusive", "Individueller Trainingsplan inklusive", "Community statt Self-Service"], footer: "Was man in einer Kette vermisst — bei dir Standard." },
  { id: "W5", type: "benefit", page: "34", kicker: "EXTRA 05 · FAQ", title: "FAQ beantwortet\nKaufeinwände.", bullets: ["„Gibt es Verträge ohne Laufzeit?\"", "„Kann ich pausieren bei Krankheit?\"", "„Bin ich als Anfänger willkommen?\""], footer: "Jede Frage, die sonst zum Absprung führt — sofort geklärt." },
  { id: "W6", type: "benefit", page: "35", kicker: "EXTRA 06 · KURSPLAN", title: "Kursplan, der\nwirklich hilft.", bullets: ["11 Kurstypen, klar nach Wochentag", "Filter nach Kursart, Level, Trainer", "Direkte Buchung aus dem Plan heraus"], footer: "Vom statischen PDF zum interaktiven Plan.", screenshot: "new/03-kursplan.png" },
  { id: "W7", type: "benefit", page: "36", kicker: "EXTRA 07 · ROADMAP", title: "Phase 3:\nKI-Chatbot.", bullets: ["24/7 Beratung via n8n + RAG auf eurem Content", "Probetraining-Buchung direkt im Chat", "First Mover im Hattinger Markt"], footer: "Kein Wettbewerber hat das. Noch nicht." },
];

// Grid-Positionierung: 6 Spalten, beginnt rechts von bestehendem Content
const GRID_START_X = 88000;
const GRID_START_Y = 1400;
const SLIDE_W = 3840;
const SLIDE_H = 2160;
const GAP_X = 400;
const GAP_Y = 400;
const COLS = 6;
const PAD = 148;

function hexFill(rgb) {
  return [{ type: "SOLID", color: rgb }];
}

function makeText(chars, opts) {
  const t = figma.createText();
  t.fontName = { family: "Inter", style: opts.style || "Bold" };
  t.fontSize = opts.size;
  t.characters = chars;
  t.fills = hexFill(opts.color || WHITE);
  if (opts.width) {
    t.textAutoResize = "HEIGHT";
    t.resize(opts.width, t.height);
  }
  if (opts.lineHeight) {
    t.lineHeight = { unit: "PERCENT", value: opts.lineHeight };
  }
  if (opts.letterSpacing !== undefined) {
    t.letterSpacing = { unit: "PERCENT", value: opts.letterSpacing };
  }
  return t;
}

const createdIds = [];
const slidesNeedingScreenshot = [];

for (let i = 0; i < slides.length; i++) {
  const s = slides[i];
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const x = GRID_START_X + col * (SLIDE_W + GAP_X);
  const y = GRID_START_Y + row * (SLIDE_H + GAP_Y);

  // Template klonen (behält Logo, Line, Page-Number-Positionen)
  const clone = template.clone();
  clone.x = x;
  clone.y = y;
  clone.name = `Neu_${String(i + 1).padStart(2, "0")}_${s.id}_${s.title.replace(/\n/g, " ").slice(0, 40)}`;

  // Bestehenden Titel-Text entfernen (wird neu angelegt)
  const oldTitle = clone.findOne(n => n.type === "TEXT" && n.name === "Website aktuell Fitness Factory");
  if (oldTitle) oldTitle.remove();

  // Bestehende Page-Number finden und aktualisieren
  const oldPageNum = clone.findOne(n => n.type === "TEXT" && n.name === "05");
  if (oldPageNum) {
    oldPageNum.characters = s.page;
    oldPageNum.name = s.page;
  }

  // KICKER (oranger Eyebrow)
  const kicker = makeText(s.kicker, {
    style: "Bold",
    size: 48,
    color: s.type === "problem" ? RED : (s.type === "benefit" ? GREEN : AMBER),
    width: 3400,
    letterSpacing: 8,
  });
  kicker.x = x + PAD;
  kicker.y = y + 180;
  clone.appendChild(kicker);

  // TITLE (große Headline)
  const title = makeText(s.title, {
    style: "Bold",
    size: s.type === "divider" ? 380 : 260,
    color: WHITE,
    width: 3500,
    lineHeight: 95,
    letterSpacing: -2,
  });
  title.x = x + PAD;
  title.y = y + 260;
  clone.appendChild(title);

  if (s.type === "divider") {
    // Divider: Subtitle
    const sub = makeText(s.subtitle, {
      style: "Regular",
      size: 110,
      color: DIM,
      width: 3500,
      lineHeight: 130,
    });
    sub.x = x + PAD;
    sub.y = y + 1200;
    clone.appendChild(sub);
  } else {
    // Content-Slide: Bullet-Liste + Footer

    // BULLETS
    const bulletText = s.bullets.map(b => `•  ${b}`).join("\n\n");
    const body = makeText(bulletText, {
      style: "Regular",
      size: 80,
      color: WHITE,
      width: s.screenshot ? 1900 : 3500,
      lineHeight: 140,
    });
    body.x = x + PAD;
    body.y = y + 900;
    clone.appendChild(body);

    // FOOTER (Quote-Style)
    if (s.footer) {
      const footer = makeText(`„${s.footer}\"`, {
        style: "Semi Bold",
        size: 60,
        color: s.type === "problem" ? RED : GREEN,
        width: 3500,
        lineHeight: 140,
      });
      footer.x = x + PAD;
      footer.y = y + SLIDE_H - 340;
      clone.appendChild(footer);
    }

    // SCREENSHOT-Platzhalter (rechts)
    if (s.screenshot) {
      const shotW = 1620;
      const shotH = 1050;
      const shotX = x + SLIDE_W - PAD - shotW;
      const shotY = y + 900;
      const shotFrame = figma.createFrame();
      shotFrame.name = `[SCREENSHOT] ${s.screenshot}`;
      shotFrame.resize(shotW, shotH);
      shotFrame.x = shotX;
      shotFrame.y = shotY;
      shotFrame.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
      shotFrame.strokes = [{ type: "SOLID", color: { r: 0.3, g: 0.3, b: 0.3 } }];
      shotFrame.strokeWeight = 4;
      shotFrame.dashPattern = [20, 20];
      shotFrame.cornerRadius = 12;

      const label = makeText(`SCREENSHOT\n${s.screenshot}`, {
        style: "Semi Bold",
        size: 48,
        color: DIM,
        width: shotW - 80,
        lineHeight: 140,
      });
      label.textAlignHorizontal = "CENTER";
      label.x = 40;
      label.y = shotH / 2 - 60;
      shotFrame.appendChild(label);

      clone.appendChild(shotFrame);
      slidesNeedingScreenshot.push({ slideId: s.id, file: s.screenshot, frameId: shotFrame.id });
    }
  }

  createdIds.push({ id: clone.id, slideId: s.id, name: clone.name, x, y });
}

return {
  count: createdIds.length,
  created: createdIds,
  screenshotsNeeded: slidesNeedingScreenshot,
  gridRange: {
    startX: GRID_START_X,
    startY: GRID_START_Y,
    endX: GRID_START_X + COLS * (SLIDE_W + GAP_X),
    endY: GRID_START_Y + Math.ceil(slides.length / COLS) * (SLIDE_H + GAP_Y),
  },
};
