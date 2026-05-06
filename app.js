// app.js macht die Produktseite dynamisch.
// Die Datei liest den Produkt-Slug aus der URL, sucht die passenden Daten in data.js
// und schreibt sie in die vorgesehenen HTML-Elemente der Template-Seite.

function setContent(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  if (Array.isArray(value)) {
    // Schreibe Listen als <li>-Elemente; einfache, sichere HTML-Ersetzung via escapeHtml.
    el.innerHTML = value.map((v) => `<li>${escapeHtml(v)}</li>`).join("");
  } else {
    el.textContent = value ?? "";
  }
}

// Query-Parameter aus der aktuellen URL lesen.
// Beispiel: product.html?product=raspberry-swirl-earrings&lang=de
const params = new URLSearchParams(window.location.search);
const productSlug = params.get("product");
const requestedLang = params.get("lang");

// Falls keine gueltige Sprache in der URL steht, wird die Standardsprache benutzt.
const language = resolveLanguage(requestedLang);

// Produktobjekt aus der gemeinsamen Datenquelle holen.
const product = products[productSlug];

// Fallback-Ansicht, wenn der product-Slug nicht existiert.
// Damit bleibt die Seite auch bei Tippfehlern im Link nutzbar und erklaerbar.
function renderProductNotFound(slug) {
  document.title = "Product not found | Jewelry Webshop";
    setContent("product-heading", "Product not found");
    setContent("product-name", "No matching product in data.js");
    setContent("product-price", "-");
    setContent("product-category", "-");
    setContent("product-made-in", "-");
    setContent("product-shipping", "-");
    setContent("product-availability", "-");
    setContent(
      "product-description",
      `No product data found for slug: ${slug || "(missing)"}. Check the URL parameter or add the product in data.js.`
    );
    setContent("product-materials", ["No data"]);
    setContent("product-measurements", ["No data"]);
    setContent("product-notes", ["No data"]);

  const contactLink = document.getElementById("product-contact-link");
  if (contactLink) contactLink.href = "contact.html";
}

// Hauptzweig: Wenn kein Produkt gefunden wurde, zeigen wir den Fallback.
// Andernfalls befuellen wir alle Felder der Seite mit den Produktdaten.
if (!product) {
  renderProductNotFound(productSlug);
} else {
    // Unified mapping for all fields (strings or arrays).
    const mappings = {
      "product-heading": "name",
      "product-name": "name",
      "product-price": "price",
      "product-category": "category",
      "product-made-in": "madeIn",
      "product-shipping": "shipping",
      "product-availability": "availability",
      "product-description": "description",
      "product-materials": "materials",
      "product-measurements": "measurements",
      "product-notes": "notes",
    };
  
    Object.entries(mappings).forEach(([id, field]) => setContent(id, getLocalizedValue(product, field, language)));

  // Das Produktbild bekommt den passenden Alt-Text, damit die Seite barrierefrei bleibt.
  const image = document.getElementById("product-image");
  if (image) image.alt = product.imageAlt;

  // Der Kontaktlink uebergibt den Produkt-Slug und die Sprache, damit das Formular Kontext hat.
  const contactLink = document.getElementById("product-contact-link");
  if (contactLink) {
    contactLink.href = `contact.html?product_slug=${productSlug}&lang=${language}`;
  }

  // Der Browser-Tab zeigt den aktuellen Produktnamen.
  document.title = `${getLocalizedValue(product, "name", language)} | Jewelry Webshop`;
}