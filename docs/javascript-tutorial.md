# JavaScript-Tutorial: Jewelry Webshop

Dieses Dokument erklärt den JavaScript-Code des Jewelry Webshops Zeile für Zeile, damit Sie ihn in einer Präsentation erklären können.

---

## Übersicht: Wie funktioniert der Webshop?

Der Webshop arbeitet nach diesem Prinzip:

1. **config.js** lädt zuerst → stellt Konstanten und Hilfsfunktionen bereit
2. **data.js** lädt danach → enthält alle Produktdaten
3. **app.js** oder **index.js** lädt dann → nutzt die Daten, um die Seite zu füllen

**Browser-Tab-Ladeorder (wichtig!)**
```html
<script src="js/config.js" defer></script>   <!-- zuerst -->
<script src="js/data.js" defer></script>     <!-- zweiten -->
<script src="js/app.js" defer></script>      <!-- zuletzt -->
```

Das `defer`-Attribut sorgt dafür, dass die Skripte geladen werden, *nachdem* das HTML geladen ist, aber *in der korrekten Reihenfolge*.

---

## 1. config.js – Zentrale Konfiguration

**Zweck:** Definiert Konstanten und Hilfsfunktionen, die alle Seiten gemeinsam nutzen.

### Konstanten definieren

```javascript
const DEFAULT_LANG = "en";
```
- `const` = Konstante, kann nicht verändert werden
- Diese Variable sagt: **Wenn der Benutzer keine Sprache wählt, benutze Englisch**
- Nutzen: In der URL kann der Nutzer `?lang=de` hinzufügen, um Deutsch zu wählen

```javascript
const SUPPORTED_LANGS = ["en", "de"];
```
- Array mit zwei Elementen: `"en"` (Englisch) und `"de"` (Deutsch)
- Nutzen: Wir können überprüfen, ob eine angeforderte Sprache gültig ist
- Beispiel: `["en", "de"].includes("de")` → `true` ✓

```javascript
const CARD_IMAGE_PLACEHOLDER = "data:image/svg+xml;charset=UTF-8,%3Csvg...";
```
- **Sehr langer String**, der ein SVG-Bild (als Text) enthält
- SVG = Skalierbare Vektorgrafik (kann beliebig vergrößert werden)
- Nutzen: Temporärer Platzhalter für Produktbilder auf der Startseite, bis echte Bilder da sind

### Hilfsfunktionen definieren

```javascript
function resolveLanguage(requestedLang) {
  return SUPPORTED_LANGS.includes(requestedLang) ? requestedLang : DEFAULT_LANG;
}
```

**Zeile für Zeile:**
- `function resolveLanguage(requestedLang) {` = Funktionsdefinition mit Parameter `requestedLang`
- `SUPPORTED_LANGS.includes(requestedLang)` = Ist `requestedLang` in der Liste `["en", "de"]` enthalten?
- `? requestedLang : DEFAULT_LANG` = Ternärer Operator (Kurzform von if/else)
  - Wenn `true` → gib `requestedLang` zurück
  - Wenn `false` → gib `DEFAULT_LANG` (also `"en"`) zurück

**Beispiele:**
```
resolveLanguage("de")  → "de"  (gültig, daher return "de")
resolveLanguage("fr")  → "en"  (ungültig, daher return DEFAULT_LANG = "en")
resolveLanguage("en")  → "en"  (gültig, daher return "en")
```

---

```javascript
function getLocalizedValue(item, field, language) {
  const localizedKey = `${field}DE`;
  if (language === "de" && item[localizedKey]) return item[localizedKey];
  return item[field];
}
```

**Zweck:** Holt den lokalisierten (übersetzten) Wert eines Produktfeldes.

**Zeile für Zeile:**
- `const localizedKey = `${field}DE`;` = Baut einen Schlüssel zusammen
  - Wenn `field = "name"`, dann `localizedKey = "nameDE"`
  - Das ist Template-Literal mit Backticks und `${}` für Variablen
- `if (language === "de" && item[localizedKey])` = Wenn Deutsch aktiv UND das deutsche Feld existiert
- `return item[localizedKey];` = Gib den deutschen Wert zurück
- `return item[field];` = Sonst gib den englischen Wert (Standard) zurück

**Beispiel aus data.js:**
```javascript
const product = {
  name: "Raspberry Swirl Earrings",        // Englisch
  nameDE: "Raspberry Swirl Ohrringe",      // Deutsch
};

getLocalizedValue(product, "name", "de")  → "Raspberry Swirl Ohrringe"
getLocalizedValue(product, "name", "en")  → "Raspberry Swirl Earrings"
```

---

```javascript
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
```

**Zweck:** Schützt vor XSS-Angriffen (Cross-Site Scripting).

**Was passiert hier?**
- `.replace(/&/g, "&amp;")` = Ersetze alle `&` durch `&amp;`
- `/&/g` = Regulärer Ausdruck: `&` = Zeichen, `/g` = global (alle Vorkommen)
- Andere Replacements machen das gleiche für `<`, `>`, `"`, `'`

**Beispiel:**
```
escapeHtml("<script>alert('Hack')</script>")
→ "&lt;script&gt;alert(&#39;Hack&#39;)&lt;/script&gt;"
```
Jetzt wird das nicht als Code ausgeführt, sondern als Text angezeigt.

---

## 2. data.js – Produktdaten

**Zweck:** Enthält alle Produktinformationen.

```javascript
const products = {
  "raspberry-swirl-earrings": {
    name: "Raspberry Swirl Earrings",
    nameDE: "Raspberry Swirl Ohrringe",
    // ...weitere Felder
  },
  // ...weitere Produkte
};
```

**Struktur:**
- `const products` = Ein großes JavaScript-Objekt
- `"raspberry-swirl-earrings"` = Schlüssel (wie ein eindeutiger Name/ID)
- Das dahinter ist ein kleineres Objekt mit allen Details dieses Produkts

**Warum in JS und nicht in einer externen Datei?**
- Bei `file://` Protocol gibt es CORS-Probleme (Cross-Origin)
- Mit JavaScript direkt im Browser kein Problem
- Skalierbar: Bei 100 Produkten wird diese Datei eben größer

**Datenstruktur eines Produkts:**
```javascript
{
  name: "Englischer Name",
  nameDE: "Deutscher Name",
  price: "€39,95",           // Preis (sprachunabhängig)
  category: "Earrings",
  categoryDE: "Ohrringe",
  // ... weitere bilingual Fields
  materials: ["Material 1", "Material 2"],      // Array (Liste)
  materialsDE: ["Material 1 DE", "Material 2 DE"],
}
```

**Merke:** Felder mit `DE` am Ende sind deutsche Übersetzungen.

---

## 3. app.js – Produktdetailseite

**Zweck:** Füllt die Produktdetailseite (`product.html`) mit Daten basierend auf der URL.

### Hilfsfunktion: setContent

```javascript
function setContent(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  if (Array.isArray(value)) {
    el.innerHTML = value.map((v) => `<li>${escapeHtml(v)}</li>`).join("");
  } else {
    el.textContent = value ?? "";
  }
}
```

**Zeile für Zeile:**
- `const el = document.getElementById(id);` = Suche das HTML-Element mit dieser ID
  - Beispiel: `setContent("product-name", "Earrings")` sucht `<span id="product-name">`
- `if (!el) return;` = Wenn Element nicht gefunden, beende die Funktion (return)
- `if (Array.isArray(value))` = Ist der Wert ein Array? (Liste)

**Wenn Array (z.B. Materialien):**
```javascript
el.innerHTML = value.map((v) => `<li>${escapeHtml(v)}</li>`).join("");
```
- `.map((v) => ...)` = Für jedes Element in der Liste...
- `` `<li>${escapeHtml(v)}</li>` `` = ...baue ein `<li>` mit dem Element
- `.join("")` = Verbinde alle `<li>` ohne Trennzeichen

**Beispiel:**
```javascript
setContent("product-materials", ["Gold", "Glass"]);
// Erzeugt im HTML:
// <ul id="product-materials"><li>Gold</li><li>Glass</li></ul>
```

**Wenn kein Array:**
```javascript
el.textContent = value ?? "";
```
- `.textContent` = Setzt den sichtbaren Text
- `??` = "Nullish coalescing": Wenn `value` null/undefined, benutze `""` (leerer String)

---

### URL-Parameter auslesen

```javascript
const params = new URLSearchParams(window.location.search);
const productSlug = params.get("product");
const requestedLang = params.get("lang");
```

**Beispiel-URL:** `product.html?product=raspberry-swirl-earrings&lang=de`

- `window.location.search` = `?product=raspberry-swirl-earrings&lang=de`
- `new URLSearchParams(...)` = Parser, der die Parameter auseinandernimmt
- `.get("product")` = Gib mir den Wert des Parameters `product` → `"raspberry-swirl-earrings"`
- `.get("lang")` = Gib mir den Wert des Parameters `lang` → `"de"`

---

### Sprache auflösen und Produkt laden

```javascript
const language = resolveLanguage(requestedLang);
const product = products[productSlug];
```

- `resolveLanguage(requestedLang)` = Wenn `requestedLang` ungültig, benutze Default
- `products[productSlug]` = Hole das Produkt-Objekt aus der data.js
  - Wenn `productSlug = "raspberry-swirl-earrings"`, dann bekommen wir das entsprechende Objekt
  - Wenn `productSlug` nicht existiert, ist `product = undefined`

---

### Fallback bei fehlenden Produkten

```javascript
function renderProductNotFound(slug) {
  document.title = "Product not found | Jewelry Webshop";
  setContent("product-heading", "Product not found");
  // ... weitere setContent Aufrufe für alle Felder
}
```

- Diese Funktion wird aufgerufen, wenn `product = undefined`
- Setzt alle Felder auf Fallback-Werte (z.B. `"Product not found"`)
- **Benutzererlebnis:** Statt leerem Bildschirm sieht der Nutzer eine hilfreiche Meldung

---

### Hauptlogik: Produkt anzeigen

```javascript
if (!product) {
  renderProductNotFound(productSlug);
} else {
  const mappings = {
    "product-heading": "name",
    "product-name": "name",
    "product-price": "price",
    "product-category": "category",
    // ... mehr Mappings
  };
  
  Object.entries(mappings).forEach(([id, field]) => 
    setContent(id, getLocalizedValue(product, field, language))
  );
  // ... weitere Logik
}
```

**Zeile für Zeile:**
- `if (!product)` = Wenn das Produkt nicht existiert...
- `const mappings = {...}` = Eine Tabelle: HTML-ID → Datenfeld-Name
  - Sagt: "Das HTML-Element mit ID `product-heading` soll das Feld `name` enthalten"
- `Object.entries(mappings)` = Konvertiert das Objekt zu einer Array von [key, value] Paaren
- `.forEach(([id, field]) => ...)` = Für jedes Paar...
- `setContent(id, getLocalizedValue(product, field, language))` = Hole den lokalisierten Wert und setze ihn

**Beispiel:**
```javascript
// Mapping-Eintrag: "product-heading": "name"
// Dieses wird zu: ["product-heading", "name"]
// Dann: setContent("product-heading", getLocalizedValue(product, "name", "de"))
// = setContent("product-heading", "Raspberry Swirl Ohrringe")
```

---

### Produktbild und Links

```javascript
const image = document.getElementById("product-image");
if (image) image.alt = product.imageAlt;

const contactLink = document.getElementById("product-contact-link");
if (contactLink) {
  contactLink.href = `contact.html?product_slug=${productSlug}&lang=${language}`;
}

document.title = `${getLocalizedValue(product, "name", language)} | Jewelry Webshop`;
```

- `image.alt = product.imageAlt` = Setzt einen alternativen Text (für Barrierefreiheit)
- `contactLink.href = ...` = Macht den Kontakt-Link, enthält `product_slug` und `lang` als URL-Parameter
- `document.title = ...` = Setzt den Browser-Tab-Titel (sichtbar oben im Tab)

---

## 4. index.js – Startseite mit Produktkarten

**Zweck:** Erzeugt dynamisch alle Produktkarten auf der Startseite.

### Sprache auslesen

```javascript
const params = new URLSearchParams(window.location.search);
const requestedLang = params.get("lang");
const language = resolveLanguage(requestedLang);
const isGerman = language === "de";
```

- Gleich wie in app.js
- `const isGerman = language === "de"` = Boolean-Flag für schnelle Abfrage

---

### UI-Labels definieren

```javascript
const UI_LABELS = {
  price: { en: "Price", de: "Preis" },
  availability: { en: "Availability", de: "Verfuegbarkeit" },
  details: { en: "View details", de: "Details ansehen" },
};

function getLabel(key) {
  const labels = UI_LABELS[key];
  if (!labels) return key;
  return isGerman ? labels.de : labels.en;
}
```

**Struktur:**
- `UI_LABELS` = Ein Objekt mit Sprachetiketten
- `UI_LABELS.price = { en: "Price", de: "Preis" }`
- Ähnlich wie Produktdaten, aber für UI-Texte

**getLabel Funktion:**
- `const labels = UI_LABELS[key]` = Hole das Sprachenpaar
- Wenn nicht gefunden, gib einfach den `key` zurück (Fallback)
- Sonst: Wenn Deutsch → `labels.de`, sonst → `labels.en`

**Beispiel:**
```
getLabel("price")        → "Preis" (wenn isGerman = true)
getLabel("availability") → "Availability" (wenn isGerman = false)
```

---

### Produktkarte bauen

```javascript
function createProductCardMarkup(slug, product) {
  const name = getLocalizedValue(product, "name", language);
  const altText = product.imageAlt || `${name} product image placeholder`;

  return `
    <li>
      <article>
        <figure>
          <img src="${CARD_IMAGE_PLACEHOLDER}" alt="${escapeHtml(altText)}">
          <figcaption>${escapeHtml(name)}</figcaption>
        </figure>
        <p>${getLabel("price")}: ${escapeHtml(product.price)}</p>
        <p>${getLabel("availability")}: ${escapeHtml(getLocalizedValue(product, "availability", language))}</p>
        <p><a href="product.html?product=${slug}&lang=${language}">${getLabel("details")}</a></p>
      </article>
    </li>
  `;
}
```

**Zeile für Zeile:**
- Parameter: `slug` (z.B. `"raspberry-swirl-earrings"`) und `product` (das Objekt mit Daten)
- `const name = getLocalizedValue(...)` = Holt den lokalisierten Produktnamen
- `const altText = product.imageAlt || ...` = Alt-Text (oder Fallback)
  - `||` = Oder-Operator: Wenn `product.imageAlt` falsy → benutze den Fallback
- `return ` backtick-String = Template-Literal, das HTML erzeugt

**HTML-String:**
- `` src="${CARD_IMAGE_PLACEHOLDER}" `` = Setzt den Platzhalter-Link
- `` alt="${escapeHtml(altText)}" `` = Escamet den Alt-Text (sicher)
- `` <a href="product.html?product=${slug}&lang=${language}"> `` = Link zur Detailseite mit Parametern
- Alle Datenwerte werden mit `escapeHtml()` behandelt (Sicherheit)

**Beispiel-Ausgabe:**
```html
<li>
  <article>
    <figure>
      <img src="data:image/svg+xml..." alt="Raspberry Swirl Earrings product image">
      <figcaption>Raspberry Swirl Ohrringe</figcaption>
    </figure>
    <p>Preis: €39,95</p>
    <p>Verfugbarkeit: Verfügbar</p>
    <p><a href="product.html?product=raspberry-swirl-earrings&lang=de">Details ansehen</a></p>
  </article>
</li>
```

---

### Alle Karten rendern

```javascript
function renderProducts() {
  const productList = document.getElementById("product-list");
  if (!productList || typeof products !== "object") return;

  const cardsMarkup = Object.entries(products)
    .map(([slug, product]) => createProductCardMarkup(slug, product))
    .join("");

  productList.innerHTML = cardsMarkup || "<li>No products found in data.js.</li>";
}

renderProducts();
```

**Zeile für Zeile:**
- `const productList = document.getElementById("product-list");` = Finde die Container-Liste
- `if (!productList || typeof products !== "object") return;` = Sicherheitschecks
  - Wenn Container nicht existiert ODER products nicht geladen, beende
- `Object.entries(products)` = Konvertiere Produkt-Objekt zu Array von [slug, product] Paaren
  - Beispiel: `[["raspberry-swirl-earrings", {...}], ["bijou-berry-bracelet", {...}], ...]`
- `.map(([slug, product]) => createProductCardMarkup(slug, product))` = Für jedes Produkt, baue eine Karte
- `.join("")` = Verbinde alle Karten-Strings ohne Trennzeichen
- `productList.innerHTML = ...` = Setze alle Karten ins HTML
- `|| "<li>No products found..."` = Fallback, wenn Liste leer

**Ausführungsablauf:**
```
renderProducts() aufgerufen
  ↓
products durchlaufen: raspberry-swirl-earrings, bijou-berry-bracelet, ...
  ↓
Für jede: createProductCardMarkup() rufen → HTML erzeugen
  ↓
Alle HTML-Strings zusammenhängen
  ↓
In product-list einfügen
  ↓
Browser zeigt Produktkarten an
```

---

## Zusammenfassung: Der Datenfluss

```
1. Browser lädt HTML (index.html oder product.html)
   ↓
2. HTML lädt Scripts in Reihenfolge:
   - js/config.js → Konstanten & Hilfsfunktionen bereit
   - js/data.js → products Objekt bereit
   - js/app.js oder js/index.js → liest URL, nutzt config + data
   ↓
3. Skripte führen sich aus:
   - Lesen URL-Parameter (?product=..., ?lang=...)
   - Rufen Hilfsfunktionen aus config.js auf
   - Holen Daten aus products (data.js)
   - Füllen HTML-Elemente mit Daten
   ↓
4. Browser rendert fertige Seite
```

---

## Häufige Muster zum Erklären

### Ternärer Operator (if/else als Einzeiler)
```javascript
condition ? valueIfTrue : valueIfFalse
```

### Array.map() - Transformiert ein Array
```javascript
["a", "b", "c"].map((item) => item.toUpperCase())
// Ergebnis: ["A", "B", "C"]
```

### Object.entries() - Objekt → Array
```javascript
{a: 1, b: 2} → Object.entries() → [["a", 1], ["b", 2]]
```

### Template-Literals mit Backticks
```javascript
`Hello ${name}` // statt "Hello " + name
```

### Nullish Coalescing (??)
```javascript
value ?? "default"  // Wenn value null/undefined → "default"
```

---

## Sicherheitsaspekte zum Erwähnen

1. **escapeHtml()** – Verhindert XSS-Attacks
2. **URL-Parameter validieren** – Mit `includes()` und `resolveLanguage()`
3. **Fehlerbehandlung** – Mit `if (!el)` Checks und Fallbacks
4. **Daten lokal** – Keine externen APIs im Scope, keine CORS-Probleme

---

## Live-Präsentations-Tipps

**Schrittweise Demo:**
1. Browser-Console öffnen (F12)
2. `config.js` laden lassen, dann Funktionen testen:
   - `resolveLanguage("fr")` → `"en"`
   - `getLocalizedValue(products["raspberry-swirl-earrings"], "name", "de")` → Deutsche Name
3. URL ändern:
   - `?product=banana&lang=de` → Fallback-Seite
   - `?product=raspberry-swirl-earrings&lang=de` → Deutsche Detailseite
4. HTML inspizieren, um zu zeigen, wie `innerHTML` gefüllt wird

