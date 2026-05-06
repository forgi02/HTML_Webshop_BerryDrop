// index.js rendert die Startseite dynamisch aus den Daten in data.js.
// Statt drei fest verdrahteter Produktkarten erzeugt die Datei die Karten fuer alle Eintraege,
// die in products vorhanden sind.

// Sprachparameter fuer die Startseite auslesen.
// Bei gueltigem lang=de erscheinen deutsche Labels und Produktnamen.
const params = new URLSearchParams(window.location.search);
const requestedLang = params.get("lang");
const language = SUPPORTED_LANGS.includes(requestedLang) ? requestedLang : DEFAULT_LANG;
const isGerman = language === "de";

const UI_LABELS = {
  price: { en: "Price", de: "Preis" },
  availability: { en: "Availability", de: "Verfuegbarkeit" },
  details: { en: "View details", de: "Details ansehen" },
};

// Kleiner Sprachhelfer, damit EN und DE nicht in vielen if-Abfragen verteilt werden.
function getLocalizedValue(item, field) {
  const localizedKey = `${field}DE`;
  if (isGerman && item[localizedKey]) return item[localizedKey];
  return item[field];
}

function getLabel(key) {
  const labels = UI_LABELS[key];
  if (!labels) return key;
  return isGerman ? labels.de : labels.en;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Baut eine komplette Produktkarte als HTML-String.
// Das ist kuerzer als viele einzelne DOM-Aufrufe und passt fuer eine wiederholte Kartenstruktur.
function createProductCardMarkup(slug, product) {
  const name = getLocalizedValue(product, "name");
  const altText = product.imageAlt || `${name} product image placeholder`;

  return `
    <li>
      <article>
        <figure>
          <!-- Platzhalterbild fuer die Karten, bis echte Produktbilder vorhanden sind. -->
          <img src="${CARD_IMAGE_PLACEHOLDER}" alt="${escapeHtml(altText)}">
          <figcaption>${escapeHtml(name)}</figcaption>
        </figure>
        <p>${getLabel("price")}: ${escapeHtml(product.price)}</p>
        <p>${getLabel("availability")}: ${escapeHtml(getLocalizedValue(product, "availability"))}</p>
        <p><a href="product.html?product=${slug}&lang=${language}">${getLabel("details")}</a></p>
      </article>
    </li>
  `;
}

// Holt den Listencontainer und ersetzt seinen Inhalt durch alle Produktkarten.
function renderProducts() {
  const productList = document.getElementById("product-list");
  if (!productList || typeof products !== "object") return;

  // Object.entries liefert [slug, produktobjekt] Paare, die direkt gerendert werden koennen.
  const cardsMarkup = Object.entries(products)
    .map(([slug, product]) => createProductCardMarkup(slug, product))
    .join("");

  // Wenn keine Produkte vorhanden sind, bleibt eine klare Meldung sichtbar.
  productList.innerHTML = cardsMarkup || "<li>No products found in data.js.</li>";
}

// Direkt ausfuehren, sobald die Datei geladen ist.
renderProducts();
