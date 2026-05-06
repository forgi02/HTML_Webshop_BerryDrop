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
- Fokus auf konkrete, vage-freie Anforderungen; Admin ausdrücklich ausgeschlossen.

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
- `imprint.html` als erste Pflichtseite ergänzt.
- Rohdaten nach `data/data_raw.md` verschoben und `docs/data.md` auf eine Datenübersicht umgestellt.

### 2026-05-06
**JavaScript-Grundlage für Produktseiten**
- `docs/app-concept.md` als kurzes Konzept für die spätere App ergänzt.
- `product.html` zur generischen Detailseite mit festen ID-Hooks für JavaScript vorbereitet.
- `app.js` angelegt und mit `product.html` verbunden; die Produktdaten werden jetzt über `?product=...` geladen.
- Die alte hardcodierte Produktseite entfernt, damit die Detailseiten künftig nur noch über die Template-Seite laufen.

### 2026-05-06
**JavaScript-Tutorial und Refactor**
- Alle JavaScript-Dateien mit Tutorial-Kommentaren erweitert, damit die Logik in der Präsentation Zeile für Zeile erklaert werden kann.
- `app.js` und `index.js` weiter vereinfacht: Sprachlogik, Textmapping und Karten-Rendering wurden kompakter aufgebaut.
- `constants.js` als gemeinsame Sammelstelle fuer Standardwerte beibehalten und dokumentiert.
- `data.js` um klare Kommentarstruktur fuer den bilingualen Produktdatensatz ergaenzt.

---

## Offene Punkte (für nächste Phase)

- Preisformat finalisieren (`69,00 EUR` vs. `€ 69,00`)?
- Produktdaten: zunächst in `app.js`, später bei Bedarf in eine separate Datenquelle auslagern.
- Formspree-Test: Funktioniert von `file://` oder braucht HTTP-Server?
- Produktbilder noch ergänzen.

## Verworfene Ansätze

- Initiale Überlegung: Admin-Bereich mitabbilden → verworfen, da Scope nur Kundenseite.
- Video-Unterstützung als Must-have → reduziert auf Nice-to-have (keine Videos im MVP nötig).
