# /update-memory — Fitness Factory Memory aktualisieren

Aktualisiere alle Memory-Dateien basierend auf dem aktuellen Projektfortschritt.

## Deine Aufgabe

Führe folgende Schritte der Reihe nach aus:

### Schritt 1: Audit-Verzeichnis lesen
Lese alle vorhandenen Dateien in `audit/`:
- `audit/01-bestandsaufnahme.md` (falls vorhanden)
- `audit/02-seo-analyse.md` (falls vorhanden)
- `audit/03-ux-conversion-analyse.md` (falls vorhanden)
- `audit/04-wettbewerbsanalyse.md` (falls vorhanden)
- `audit/05-anforderungskatalog.md` (falls vorhanden)

Überprüfe für jede Datei: Existiert sie? Wenn ja, lies die ersten 50 Zeilen um den Stand zu verstehen.

### Schritt 2: project_progress.md aktualisieren

Datei: `/Users/lukekozik/.claude/projects/-Users-lukekozik-Documents-Programme-n8n-Jobs-FitnessFactory-Website-factory/memory/project_progress.md`

Aktualisiere:
- "Letztes Update" auf heute (2026-04-01 oder aktuelles Datum)
- Jeden Prompt der jetzt eine fertige Ausgabedatei in `audit/` hat → auf ✅ Fertig setzen mit Datum
- Jeden Prompt ohne Ausgabedatei → auf ⏳ Offen lassen
- "Aktueller Nächster Schritt" → auf den ersten noch offenen Prompt setzen

### Schritt 3: key_findings.md ergänzen

Datei: `/Users/lukekozik/.claude/projects/-Users-lukekozik-Documents-Programme-n8n-Jobs-FitnessFactory-Website-factory/memory/key_findings.md`

Ergänze neue wichtige Erkenntnisse aus neu abgeschlossenen Analysen:
- Aus 03-ux-conversion-analyse.md → UX-Score, Top-Conversion-Probleme
- Aus 04-wettbewerbsanalyse.md → Hauptwettbewerber, SWOT-Kernaussagen
- Aus 05-anforderungskatalog.md → Finale Anforderungen, Prioritäten
- Aus Phase-2-Dateien → Design-Entscheidungen, Content-Entscheidungen

Ergänze nur was noch NICHT in der Datei steht. Nichts überschreiben, nur hinzufügen.

### Schritt 4: MEMORY.md Index aktualisieren

Datei: `/Users/lukekozik/.claude/projects/-Users-lukekozik-Documents-Programme-n8n-Jobs-FitnessFactory-Website-factory/memory/MEMORY.md`

Aktualisiere:
- **AKTUELLER STATUS** Zeile → korrekte Anzahl erledigter Prompts
- **NÄCHSTER SCHRITT** Zeile → nächster offener Prompt
- Prompt-Status Tabelle → ✅/⏳ für alle Prompts aktuell setzen

### Schritt 5: Bestätigung

Gib eine kurze Zusammenfassung aus:
- Welche Memory-Dateien wurden aktualisiert
- Was der aktuelle Projektstand ist
- Was der nächste Schritt ist

## Wichtige Pfade

| Datei | Pfad |
|---|---|
| MEMORY.md | `/Users/lukekozik/.claude/projects/-Users-lukekozik-Documents-Programme-n8n-Jobs-FitnessFactory-Website-factory/memory/MEMORY.md` |
| project_progress.md | `/Users/lukekozik/.claude/projects/-Users-lukekozik-Documents-Programme-n8n-Jobs-FitnessFactory-Website-factory/memory/project_progress.md` |
| key_findings.md | `/Users/lukekozik/.claude/projects/-Users-lukekozik-Documents-Programme-n8n-Jobs-FitnessFactory-Website-factory/memory/key_findings.md` |
| Audit-Ordner | `/Users/lukekozik/Documents/Programme/n8n/Jobs/FitnessFactory/Website.factory/audit/` |
