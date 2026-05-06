/**
 * DYNAMISCHE PRODUKTSEITE - app.js
 *
 * Zweck: Diese Datei macht product.html zu einer dynamischen Template-Seite.
 * Statt mehrere hartcodierte HTML-Dateien für jedes Produkt zu haben,
 * nutzen wir eine einzige product.html und füllen sie mit Daten basierend
 * auf dem URL-Parameter ?product=...
 *
 * Arbeitsablauf:
 * 1. Browser lädt product.html?product=raspberry-pearlette-necklace
 * 2. app.js liest den Parameter aus
 * 3. app.js sucht das Produkt in der globalen products-Variable (aus data.js)
 * 4. app.js füllt alle HTML-Elemente mit ID-Attributen mit den Produktdaten
 * 5. Besucher sieht die fertige Produktdetailseite
 */

/**
 * Helper-Funktion: setText
 *
 * Findet ein HTML-Element anhand seiner ID und ändert seinen Text.
 * Beispiel: setText("product-price", "€49,95")
 *   → sucht das Element mit id="product-price"
 *   → setzt seinen Textinhalt auf "€49,95"
 *
 * Parameter:
 *   id: Die HTML-ID des Elements, das wir ändern wollen
 *   value: Der neue Textinhalt
 */
function setText(id, value) {
  // Findet das Element mit der gegebenen ID im DOM
  const element = document.getElementById(id);
  // Nur wenn das Element existiert, ändern wir seinen Text
  if (element) {
    element.textContent = value;
  }
}

/**
 * Helper-Funktion: setList
 *
 * Findet ein HTML-List-Element (ul/ol) und füllt es mit neuen Einträgen (li).
 * Beispiel: setList("product-materials", ["Gold", "Perlen"])
 *   → sucht das <ul id="product-materials">
 *   → leert es (entfernt alte <li> Elemente)
 *   → erstellt neue <li> für jeden Eintrag in der Liste
 *
 * Parameter:
 *   id: Die HTML-ID der <ul> oder <ol> Liste
 *   items: Ein JavaScript-Array mit den neuen Listeneinträgen
 */
function setList(id, items) {
  // Findet die List-Container-Element mit der gegebenen ID
  const list = document.getElementById(id);
  // Falls das Element nicht existiert, brechen wir ab (return)
  if (!list) return;
  // Löscht alle bestehenden <li> Kinder der Liste (leerer Zustand)
  list.innerHTML = "";
  // Für jeden Eintrag im items-Array...
  items.forEach((item) => {
    // Erstelle ein neues <li> Element
    const listItem = document.createElement("li");
    // Setze seinen Text auf den aktuellen Eintrag
    listItem.textContent = item;
    // Füge das <li> zur Liste hinzu
    list.appendChild(listItem);
  });
}

/**
 * HAUPTLOGIK: Produktdaten aus URL laden und Seite füllen
 */

// Schritt 1: URL-Parameter auslesen
// window.location.search enthält die Query-String-Teile der URL (z.B. "?product=raspberry-pearlette-necklace")
// URLSearchParams macht es einfach, diese Parameter auszulesen
const params = new URLSearchParams(window.location.search);
// .get("product") extrahiert den Wert des "product"-Parameters
// Beispiel: Bei "product.html?product=necklace" erhält productSlug den Wert "necklace"
const productSlug = params.get("product");

// Schritt 2: Produktdaten abrufen
// Die globale Variable products kommt aus data.js
// Wir suchen das Produkt mit dem Slug aus der URL
// Beispiel: products["raspberry-pearlette-necklace"] gibt uns das Halsketten-Objekt
const product = products[productSlug];

// Schritt 3: Produkt gefunden? Dann Seite befüllen
// Nur wenn ein passendes Produkt gefunden wurde, führen wir den Code aus
if (product) {
  // Ändere den Browser-Tab-Titel, damit er aussagekräftig ist
  // Statt "Product | Jewelry Webshop" zeigen wir jetzt "Raspberry Pearlette Necklace | Jewelry Webshop"
  document.title = `${product.name} | Jewelry Webshop`;

  // Schritt 4: Einzelne Felder befüllen (einfache Textfelder)
  // Alle diese Funktionsaufrufe finden Elemente mit bestimmten IDs
  // in product.html und setzen deren Textinhalt auf die Produktdaten
  setText("product-heading", product.name);                 // Hauptüberschrift
  setText("product-name", product.name);                   // Bildunterschrift
  setText("product-price", product.price);                 // Preis
  setText("product-category", product.category);           // Kategorie (Necklace, Earrings, etc.)
  setText("product-made-in", product.madeIn);              // Herkunftsland
  setText("product-shipping", product.shipping);           // Versandzeit
  setText("product-availability", product.availability);   // Verfügbarkeitsstatus
  setText("product-description", product.description);     // Lange Beschreibung

  // Schritt 5: Listen befüllen (Materials, Measurements, Notes)
  // Diese Felder enthalten mehrere Einträge, deshalb nutzen wir setList() statt setText()
  setList("product-materials", product.materials);         // Materialliste
  setList("product-measurements", product.measurements);   // Größenangaben
  setList("product-notes", product.notes);                 // Zusätzliche Hinweise

  // Schritt 6: Produktbild alt-Text aktualisieren
  // Der alt-Text ist wichtig für Barrierefreiheit (Screenreader)
  // und SEO, daher setzen wir ihn auf einen aussagekräftigen Text
  const image = document.getElementById("product-image");
  if (image) {
    image.alt = product.imageAlt;
  }

  // Schritt 7: Kontakt-Link anpassen
  // Der "Ask about this product" Link soll zum Kontaktformular führen
  // und dabei den Produktnamen mitteilen (als URL-Parameter product_slug)
  // So weiß das Kontaktformular, um welches Produkt es geht
  const contactLink = document.getElementById("product-contact-link");
  if (contactLink) {
    // Der Link wird mit einem Parameter versehen: contact.html?product_slug=raspberry-pearlette-necklace
    contactLink.href = `contact.html?product_slug=${productSlug}`;
  }
}
// Falls kein Produkt gefunden wurde (ungültiger Parameter),
// bleibt die Seite mit den Platzhalter-Texten sichtbar (siehe product.html).