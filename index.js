// index.js rendert die Startseite dynamisch aus den Daten in data.js.
// Statt drei fest verdrahteter Produktkarten erzeugt die Datei die Karten fuer alle Eintraege,
// die in products vorhanden sind.

// Sprachparameter fuer die Startseite auslesen.
// Bei gueltigem lang=de erscheinen deutsche Labels und Produktnamen.
const params = new URLSearchParams(window.location.search);
const requestedLang = params.get("lang");
const language = SUPPORTED_LANGS.includes(requestedLang) ? requestedLang : DEFAULT_LANG;

// Kleiner Sprachhelfer, damit EN und DE nicht in vielen if-Abfragen verteilt werden.
function getLocalizedValue(item, field) {
  const localizedKey = `${field}DE`;
  if (language === "de" && item[localizedKey]) return item[localizedKey];
  return item[field];
}

// Baut eine komplette Produktkarte als HTML-String.
// Das ist kuerzer als viele einzelne DOM-Aufrufe und passt fuer eine wiederholte Kartenstruktur.
function createProductCardMarkup(slug, product) {
  const name = getLocalizedValue(product, "name");
  const priceLabel = language === "de" ? "Preis" : "Price";
  const availabilityLabel = language === "de" ? "Verfügbarkeit" : "Availability";
  const detailsLabel = language === "de" ? "Details ansehen" : "View details";

  return `
    <li>
      <article>
        <figure>
          <!-- Platzhalterbild fuer die Karten, bis echte Produktbilder vorhanden sind. -->
          <img src="${CARD_IMAGE_PLACEHOLDER}" alt="${product.imageAlt || `${name} product image placeholder`}">
          <figcaption>${name}</figcaption>
        </figure>
        <p>${priceLabel}: ${product.price}</p>
        <p>${availabilityLabel}: ${getLocalizedValue(product, "availability")}</p>
        <p><a href="product.html?product=${slug}&lang=${language}">${detailsLabel}</a></p>
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
