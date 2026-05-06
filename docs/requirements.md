# Requirements - Jewelry Webshop (Vanilla HTML)

## Must-have

1. Die Website muss als statischer HTML-Webshop für handgemachten Schmuck funktionieren und im Browser erreichbar sein.
2. Die Startseite muss mindestens drei veröffentlichte Produkte (Necklaces, Earrings, Rings) anzeigen; jede Produktansicht muss Bild, Name, Preis und Verfügbarkeitsstatus enthalten.
3. Jedes Produkt muss eine eigene Detailseite haben, die Bild, Name, Preis in EUR, Kategorie, Bestandsstatus und Beschreibung zeigt.
4. Die Website muss eine obere Navigation mit den Links Shop (Startseite), Contact/Kontakt und Imprint/Impressum enthalten.
5. Die Navigation muss einen Language-Switch unterstützen, der über URL-Parameter `?lang=en` und `?lang=de` funktioniert.
6. Alle Navigationslabels, Produkttexte und Formularfelder müssen sowohl auf Englisch als auch auf Deutsch verfügbar sein.
7. Die Website muss eine Kontaktseite mit einem HTML-Formular enthalten; das Formular muss die Felder Name, E-Mail, Betreff und Nachricht haben.
8. Das Kontaktformular muss per POST an `https://formspree.io/f/mvzvjwyg` senden.
9. Das Kontaktformular muss ein optionales, verstecktes Feld für einen Produkt-Slug akzeptieren, damit Anfragen produktspezifisch sind.
10. Die Website muss `impressum.html` (Deutsch) und `imprint.html` (Englisch) mit Platzhaltertext enthalten.
11. Alle HTML-Dateien müssen gültiges HTML5 sein und ohne Browser-Fehler laden.
12. Die Auslieferung darf kein JavaScript und kein externes CSS-Framework enthalten; Inline-Styles sind für grundlegende Lesbarkeit erlaubt.
13. Der Lieferumfang schließt Admin-Funktionen (Login, Produktverwaltung) aus; es werden nur statische Kundenseiten geliefert.

## Nice-to-have

1. Basis-Layout-Verbesserungen mit Inline-Styles (Abstände, einfache Farben, lesbare Typografie).
2. Kategorienanzeige oder einfacher Filter auf der Startseite.
3. Unterstützung für Videodateien (MP4) in Produktdetailseiten.
4. Mehrere Bilder pro Produkt, statisch als Galerie oder Bildliste dargestellt.
5. Ein responsive, mobilfreundliches Layout zur besseren Lesbarkeit auf kleinen Bildschirmen.

## Offene Fragen

1. Sollen die Produktdaten als hardcodierte Inhalte in den einzelnen HTML-Dateien liegen oder zentral in `data.json` gepflegt werden?
2. Soll der Language-Switch ausschließlich per URL-Parameter funktionieren oder zusätzlich als sichtbares UI-Element (Dropdown/Button) angeboten werden?
3. Welches Format ist für Preise gewünscht: `69,00 EUR` oder `€ 69,00`?
4. Muss die Seite über einen lokalen HTTP-Server (`http://localhost`) ausgeliefert werden, damit Formspree POSTs ohne CORS-Probleme funktionieren, oder genügt lokale Datei-Auslieferung (`file://`)?
5. Welcher konkrete Platzhaltertext soll für `impressum.html` und `imprint.html` verwendet werden?

## Anmerkungen zur Vollständigkeit und Konsistenz

- Alle zuvor identifizierten Kernanforderungen (Produktlisting, Detailseiten, Kontakt mit Formspree, EN/DE-Text) sind enthalten, weil sie für die funktionale Kundenseite notwendig sind.
- Admin- und Persistenzfunktionen aus dem Originalprojekt wurden bewusst ausgeschlossen, da der Scope auf statische HTML-Seiten begrenzt ist.
- Unklare Punkte, die noch definiert werden müssen, sind unter "Offene Fragen" gelistet; die wichtigsten sind Datenquelle (hardcoded vs. `data.json`) und Formspree-Verhalten bei `file://`.

Bitte überprüfe die offene Fragen und bestätige das gewünschte Preisformat sowie die bevorzugte Datenquelle, damit ich die HTML-Dateien konsistent erzeugen kann.