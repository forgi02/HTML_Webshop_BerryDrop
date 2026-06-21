// index.js rendert die Startseite dynamisch aus den Daten in data.js.
// Statt drei fest verdrahteter Produktkarten erzeugt die Datei die Karten fuer alle Eintraege,
// die in products vorhanden sind.

// Sprachparameter fuer die Startseite auslesen.
// Bei gueltigem lang=de erscheinen deutsche Labels und Produktnamen.
const params = new URLSearchParams(window.location.search);
const requestedLang = params.get("lang");
const language = resolveLanguage(requestedLang);
const isGerman = language === "de";

const UI_LABELS = {
  price: { en: "Price", de: "Preis" },
  availability: { en: "Availability", de: "Verfügbarkeit" },
  details: { en: "View details", de: "Details ansehen" },
};

function getLabel(key) {
  const labels = UI_LABELS[key];
  if (!labels) return key;
  return isGerman ? labels.de : labels.en;
}

// Baut eine komplette Produktkarte als HTML-String.
// Das ist kuerzer als viele einzelne DOM-Aufrufe und passt fuer eine wiederholte Kartenstruktur.
function createProductCardMarkup(slug, product) {
  const name = getLocalizedValue(product, "name", language);
  const altText = product.imageAlt || `${name} product image placeholder`;
  const imageSrc = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : CARD_IMAGE_PLACEHOLDER;

  return `
    <li>
      <article>
        <figure>
          <!-- Platzhalterbild fuer die Karten, bis echte Produktbilder vorhanden sind. -->
          <img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(altText)}">
          <figcaption>${escapeHtml(name)}</figcaption>
        </figure>
        <p>${getLabel("price")}: ${escapeHtml(product.price)}</p>
        <p>${getLabel("availability")}: ${escapeHtml(getLocalizedValue(product, "availability", language))}</p>
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
  productList.innerHTML =
    cardsMarkup || `<li>${language === "de" ? "Keine Produkte in data.js gefunden." : "No products found in data.js."}</li>`;
}

// Direkt ausfuehren, sobald die Datei geladen ist.
renderProducts();
