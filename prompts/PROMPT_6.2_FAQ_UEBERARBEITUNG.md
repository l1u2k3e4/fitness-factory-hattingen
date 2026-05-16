# PROMPT 6.2 — FAQ komplett überarbeiten (Texte, Reihenfolge, Entfernungen)

## Kontext
Fitness Factory Hattingen Website — Vite + React 19 + TypeScript + Tailwind CSS 3.4.
Die FAQ-Daten liegen in `src/data/content.ts` (vermutlich als Array von Objekten mit `frage`/`antwort` oder `question`/`answer`).

## Aufgabe

Ersetze den gesamten FAQ-Inhalt in `src/data/content.ts` mit den folgenden Fragen und Antworten. Achte auf exakte Übernahme der Texte — keine eigenmächtigen Änderungen.

### Zu löschende Fragen:
- **„Wie kündige ich meine Mitgliedschaft?"** → komplett entfernen
- **„Gibt es einen Wochen oder 10ner Karten?"** → wird durch eine neue Frage ersetzt (siehe unten)

### Neue FAQ-Liste (vollständig, in dieser Reihenfolge):

---

**Kategorie: Probetraining**

**F: „Muss ich nach dem Probetraining sofort Mitglied werden?"**
A: „Nein. Du trainierst, schaust dich um — und entscheidest danach in Ruhe. Kein Druck."

**F: „Wie buche ich ein Probetraining?"**
A: „Ruf uns an (02324 33777) oder schreib uns auf WhatsApp (+49 1573 7580001). Ansonsten auch jederzeit buchbar über das Kontaktformular."

**F: „Was soll ich zum Probetraining mitbringen?"**
A: „Sportkleidung, Sportschuhe, ein Handtuch und eine Wasserflasche — mehr brauchst du nicht."

---

**Kategorie: Mitgliedschaft & Preise**

**F: „Gibt es einen Studentenrabatt oder ermäßigte Tarife?"**
A: „Ja — wir bieten vergünstigte Tarife für Studenten, Schüler und Auszubildende an. Komm einfach mit einem gültigen Nachweis vorbei oder ruf uns an, und wir finden den passenden Tarif für dich."

**F: „Wie läuft die Fremdgeh-Aktion genau ab?"**
A: „Du bist noch bei einem anderen Studio Mitglied? Bring deinen bestehenden Vertrag mit und trainiere bis zu 3 Monate bei uns für 0 € — nur die Anmeldegebühr (49 €) fällt an."

**F: „Was ist die Fremdgeh-Aktion?"**
A: „Du hast noch einen laufenden Vertrag bei einem anderen Studio? Kein Problem. Bei uns trainierst du bis zu 3 Monate für 0 € — nur die einmalige Anmeldegebühr (49 €) fällt an. Mehr dazu auf unserer Fremdgeh-Aktion-Seite."

---

**Kategorie: Training & Kurse**

**F: „Ich bin Anfänger und habe noch nie trainiert. Ist das etwas für mich?"**
A: „Ja. Wir haben Mitglieder von 18 bis 70+, Einsteiger und langjährige Sportler. Wir erstellen dir einen Trainingsplan, der zu dir passt und deine Ziele und Wünsche umsetzt. Unsere Trainer sind immer ansprechbar."

**F: „Muss ich Kurse vorher anmelden?"**
A: „Ja, Kurse müssen vorab in einer Gruppe gebucht werden. Wir haben jedoch ausreichend Kursplätze, um die Bedürfnisse unserer Mitglieder zu decken."

**F: „Was für Geräte habt ihr?"**
A: „Wir haben alles da — von Gym 80, Cybex, Life Fitness, Panatta und Nautilus — um unseren Mitgliedern das beste Equipment zu ermöglichen."

---

**Kategorie: Allgemein & Kontakt**

**F: „Wie sind die Öffnungszeiten?"**
A: „Montag bis Freitag von 08:00 bis 23:00 Uhr, Samstag und Sonntag von 10:00 bis 17:30 Uhr. An Feiertagen per Aushang oder sichtbar via Google Maps sowie Instagram."

**F: „Wie komme ich zum Studio?"**
A: „Wir sind im Stadtteil Holthausen: Im Vogelsang 95, 45527 Hattingen. Mit dem Auto direkt vor der Tür parken (kostenlos). Mit dem Bus: Haltestelle Zum Ludwigstal, dann 10 Minuten Fußweg."

**F: „Wie kann ich euch am schnellsten erreichen?"**
A: „Egal ob über WhatsApp oder einen direkten Anruf im Studio — wir sind während der Öffnungszeiten jederzeit erreichbar."

---

## Implementierung

1. **Öffne `src/data/content.ts`** und finde das FAQ-Array (vermutlich `FAQ_ITEMS` oder `FAQ` oder `HAEUFIGE_FRAGEN`).

2. **Ersetze das gesamte Array** mit der neuen Struktur. Achte darauf, dass die Kategorien als eigenes Feld vorhanden sind (z. B. `kategorie` oder `category`). Falls die bestehende Struktur keine Kategorien hat, füge sie hinzu:

```typescript
export const FAQ_ITEMS = [
  // Kategorie: Probetraining
  {
    kategorie: 'Probetraining',
    frage: 'Muss ich nach dem Probetraining sofort Mitglied werden?',
    antwort: 'Nein. Du trainierst, schaust dich um — und entscheidest danach in Ruhe. Kein Druck.',
  },
  {
    kategorie: 'Probetraining',
    frage: 'Wie buche ich ein Probetraining?',
    antwort: 'Ruf uns an (02324 33777) oder schreib uns auf WhatsApp (+49 1573 7580001). Ansonsten auch jederzeit buchbar über das Kontaktformular.',
  },
  {
    kategorie: 'Probetraining',
    frage: 'Was soll ich zum Probetraining mitbringen?',
    antwort: 'Sportkleidung, Sportschuhe, ein Handtuch und eine Wasserflasche — mehr brauchst du nicht.',
  },

  // Kategorie: Mitgliedschaft & Preise
  {
    kategorie: 'Mitgliedschaft & Preise',
    frage: 'Gibt es einen Studentenrabatt oder ermäßigte Tarife?',
    antwort: 'Ja — wir bieten vergünstigte Tarife für Studenten, Schüler und Auszubildende an. Komm einfach mit einem gültigen Nachweis vorbei oder ruf uns an, und wir finden den passenden Tarif für dich.',
  },
  {
    kategorie: 'Mitgliedschaft & Preise',
    frage: 'Wie läuft die Fremdgeh-Aktion genau ab?',
    antwort: 'Du bist noch bei einem anderen Studio Mitglied? Bring deinen bestehenden Vertrag mit und trainiere bis zu 3 Monate bei uns für 0 € — nur die Anmeldegebühr (49 €) fällt an.',
  },
  {
    kategorie: 'Mitgliedschaft & Preise',
    frage: 'Was ist die Fremdgeh-Aktion?',
    antwort: 'Du hast noch einen laufenden Vertrag bei einem anderen Studio? Kein Problem. Bei uns trainierst du bis zu 3 Monate für 0 € — nur die einmalige Anmeldegebühr (49 €) fällt an. Mehr dazu auf unserer Fremdgeh-Aktion-Seite.',
  },

  // Kategorie: Training & Kurse
  {
    kategorie: 'Training & Kurse',
    frage: 'Ich bin Anfänger und habe noch nie trainiert. Ist das etwas für mich?',
    antwort: 'Ja. Wir haben Mitglieder von 18 bis 70+, Einsteiger und langjährige Sportler. Wir erstellen dir einen Trainingsplan, der zu dir passt und deine Ziele und Wünsche umsetzt. Unsere Trainer sind immer ansprechbar.',
  },
  {
    kategorie: 'Training & Kurse',
    frage: 'Muss ich Kurse vorher anmelden?',
    antwort: 'Ja, Kurse müssen vorab in einer Gruppe gebucht werden. Wir haben jedoch ausreichend Kursplätze, um die Bedürfnisse unserer Mitglieder zu decken.',
  },
  {
    kategorie: 'Training & Kurse',
    frage: 'Was für Geräte habt ihr?',
    antwort: 'Wir haben alles da — von Gym 80, Cybex, Life Fitness, Panatta und Nautilus — um unseren Mitgliedern das beste Equipment zu ermöglichen.',
  },

  // Kategorie: Allgemein & Kontakt
  {
    kategorie: 'Allgemein & Kontakt',
    frage: 'Wie sind die Öffnungszeiten?',
    antwort: 'Montag bis Freitag von 08:00 bis 23:00 Uhr, Samstag und Sonntag von 10:00 bis 17:30 Uhr. An Feiertagen per Aushang oder sichtbar via Google Maps sowie Instagram.',
  },
  {
    kategorie: 'Allgemein & Kontakt',
    frage: 'Wie komme ich zum Studio?',
    antwort: 'Wir sind im Stadtteil Holthausen: Im Vogelsang 95, 45527 Hattingen. Mit dem Auto direkt vor der Tür parken (kostenlos). Mit dem Bus: Haltestelle Zum Ludwigstal, dann 10 Minuten Fußweg.',
  },
  {
    kategorie: 'Allgemein & Kontakt',
    frage: 'Wie kann ich euch am schnellsten erreichen?',
    antwort: 'Egal ob über WhatsApp oder einen direkten Anruf im Studio — wir sind während der Öffnungszeiten jederzeit erreichbar.',
  },
];
```

3. **Prüfe die FAQ-Komponente** (vermutlich `src/components/sections/FaqSection.tsx` oder `src/pages/FaqPage.tsx`):
   - Stelle sicher, dass sie die `kategorie`-Felder korrekt liest
   - Falls die Kategorie-Filter-Buttons bereits existieren, müssen die Label an die neuen Kategorienamen angepasst werden: „Probetraining", „Mitgliedschaft & Preise", „Training & Kurse", „Allgemein & Kontakt"

4. **Gelöschte Fragen prüfen:**
   - Stelle sicher, dass „Wie kündige ich meine Mitgliedschaft?" vollständig entfernt ist
   - Stelle sicher, dass „Gibt es einen Wochen oder 10ner Karten?" durch die neue Frage „Gibt es einen Studentenrabatt oder ermäßigte Tarife?" ersetzt wurde

## Verifikation:
```bash
npm run build
npm run dev
# Prüfen: FAQ-Seite zeigt alle neuen Fragen korrekt an
# Prüfen: Kategorie-Filter funktionieren mit den neuen Namen
# Prüfen: Gelöschte Fragen tauchen nirgends mehr auf
# Prüfen: Keine Rechtschreibfehler in den neuen Texten
```
