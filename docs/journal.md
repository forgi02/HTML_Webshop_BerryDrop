# Arbeitsprotokoll - Jewelry Webshop (Vanilla HTML)

## Einträge

### 2026-05-04
**Projektstart und Analyse**
- Originalprojekt (Next.js Webshop) analysiert und Anforderungen destilliert.
- Entscheidung: Nur Kundenseite (keine Admin), Formspree-Integration beibehalten, EN/DE Navigation.
- Fragen zur Umsetzung offen gelassen (Preisformat, Datenquelle, Formspree + file://).

### 2026-05-04
**Requirements-Dokument erstellt**
- Erste Version von `requirements.md` mit Must-have, Nice-to-have, Offene Fragen.
- Fokus auf konkrete Anforderungen; Admin ausdrücklich ausgeschlossen.

### 2026-05-04
**Requirements-Dokument überarbeitet**
- Komprimierung und Entfernung von Redundanzen (z.B. Punkt 4 + 5 zu Navigation zusammengefasst).
- Explizite Anmerkung hinzugefügt: Admin ausgeschlossen, Video nur Nice-to-have (nicht Must-have wie im Original).
- Offene Fragen klarer formuliert: Datenquelle (hardcoded vs. JSON), Preisformat, Formspree-Verhalten bei file://.

### 2026-05-04
**Visual-Design-Dokument erstellt**
- Basis-Skizze (textuelle Layout), Farbschema (#fdfbf7), Typografie-Grundsätze.
- Entscheidungsrationale hinzugefügt (minimales Design, fokussiert auf Produkte).
- Problem erkannt: Admin-Bereich in Punkt 6 erwähnt, obwohl nicht im Scope → später gelöscht.

### 2026-05-04
**Visual Design korrigiert**
- Punkt zur Admin-Ausgrenzung gelöscht (nicht relevant für Kundenseite).
- Logo-Anforderung im Header eingebaut: „Selbstgemaltes Logo links" hinzugefügt.
- Layout-Skizze damit konsistent mit Anforderung.

### 2026-05-04
**Dokumentation finalisiert**
- `requirements.md`, `visual-design.md` und `journal.md` abgeschlossen.
- Nächste Phase: HTML-Dateien generieren.

### 2026-05-05
**Produktdaten importiert**
- Die gelieferten Produkttexte für Raspberry Pearlette Necklace, Raspberry Swirl Earrings und Bijou Berry Bracelet wurden in `data.md` übernommen.
- Bilder fehlen noch; deshalb bleibt `data.md` an der Stelle bewusst als Materialsammlung mit Platzhaltern offen.

### 2026-05-06
**Seitenaufbau und Doku-Umstellung**
- `index.html` als kommentiertes HTML-Gerüst aufgebaut.
- `imprint.html` als erste Pflichtseite ergänzt (mit Platzhaltertext).
- Rohdaten nach `data/data_raw.md` verschoben und `docs/data.md` auf eine Datenübersicht umgestellt.

### 2026-05-06
**JavaScript-Grundlage für Produktseiten**
- `docs/app-concept.md` als kurzes Konzept für die spätere App ergänzt.
- `product.html` zur generischen Detailseite mit festen ID-Hooks für JavaScript vorbereitet.
- `app.js` angelegt und mit `product.html` verbunden; die Produktdaten werden jetzt über `?product=...` geladen.
- Die alte hardcodierte Produktseite entfernt, damit die Detailseiten künftig nur noch über die Template-Seite laufen.

### 2026-05-06
**JavaScript-Tutorial und Refactor**
- Alle JavaScript-Dateien mit Tutorial-Kommentaren erweitert, damit die Logik in der Präsentation Zeile für Zeile erklärt werden kann.
- `app.js` und `index.js` weiter vereinfacht: Sprachlogik, Textmapping und Karten-Rendering wurden kompakter aufgebaut (2x).
- `constants.js` als gemeinsame Sammelstelle für Standardwerte beibehalten und dokumentiert (KI hat mich davon überzeugt, dass das sinnvoll ist).
- `data.js` um klare Kommentarstruktur für den bilingualen Produktdatensatz ergänzt.

### 2026-05-06
**Weitere JavaScript-Vereinfachungen und Validierung**
- `app.js` auf einen einheitlichen Content-Helper umgestellt (`setContent` für Texte und Listen).
- Commit und Push ausgeführt: `Vereinfacherungen des JavaScripts`.

### 2026-05-06
**Gemeinsame Helper ausgelagert**
- Duplizierte Funktionen aus `app.js` und `index.js` in `shared-utils.js` verschoben (`resolveLanguage`, `getLocalizedValue`, `escapeHtml`).
- `index.html` und `product.html` um die Einbindung von `shared-utils.js` erweitert.
- Commits und Pushes ausgeführt: `Weitere Vereinfacherungen in index.js` sowie `Gemeinsame JS-Helper fuer app und index ausgelagert`.

### 2026-05-07
**Konfigurationen vereinigt**
- `config.js` erstellt und kombiniert `constants.js` (Konstanten) + `shared-utils.js` (Hilfsfunktionen).
- `constants.js` und `shared-utils.js` gelöscht; `index.html` und `product.html` angepasst.
- Jetzt nur noch 4 JS-Dateien nötig: `config.js`, `data.js`, `app.js`, `index.js` (Vereinfachungen sind doch möglich - hartnäckig bleiben).
- Commit und Push: `Vereinigte Konfiguration: config.js ersetzt constants.js und shared-utils.js`.

### 2026-05-07
**JS-Dateien in js/ Ordner organisiert**
- Alle 4 JS-Dateien in einen neuen `js/` Ordner verschoben: `config.js`, `data.js`, `app.js`, `index.js` und Pfade angepasst.
- Projektstruktur ist jetzt sauberer: HTML/CSS im Root, JS im js/-Ordner.

### 2026-06-20
**Bilder & Pfade ergänzt**
- Bilder + Pfade manuell eingefügt, um die neuen Credits nicht zu verbrauchen (Journal wird künftig auch komplett ohne KI geschrieben).
- Pfade von Agent repariert und ergänzt (`app.js`, `index.js`).
- `contact.html` liest jetzt den SLUG aus und fügt den entsprechenden Produkttext im Subject ein wenn man von `product.html` kommt .

### 2026-06-21
**Imprint update**
- Impressium mit adsimple.at erstellt.

### 2026-06-21
**Vollständige Sprachumschaltung**
- Navigation, Seitentitel und sichtbare Texte auf Index-, Kontakt-, Produkt- und Impressumsseite sind jetzt auf Deutsch und Englisch umschaltbar.
- Code weiter vereinfacht, gepusht und commited.
