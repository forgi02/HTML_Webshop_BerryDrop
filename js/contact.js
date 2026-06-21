// contact.js liest optionale URL-Parameter aus und befuellt Formularfelder.
// Beispiel: contact.html?product_slug=raspberry-swirl-earrings&lang=de

const params = new URLSearchParams(window.location.search);
const productSlug = params.get("product_slug");
const requestedLang = params.get("lang");
const language = resolveLanguage(requestedLang);

const hiddenSlugInput = document.querySelector('input[name="product_slug"]');
const subjectInput = document.getElementById("subject");

document.title = language === "de" ? "Kontakt | Jewelry Webshop" : "Contact | Jewelry Webshop";

if (productSlug) {
  // Den Slug immer als verstecktes Feld mitschicken, damit die Anfrage klar zuordenbar ist.
  if (hiddenSlugInput) {
    hiddenSlugInput.value = productSlug;
  }

  // Falls Produktdaten vorhanden sind, nutzen wir den lokalisierten Produktnamen zusätzlich.
  const product = typeof products === "object" ? products[productSlug] : null;
  const productName = product ? getLocalizedValue(product, "name", language) : productSlug;

  const subjectPrefix = language === "de" ? "Anfrage zu Produkt" : "Question about product";
  const suggestedSubject = `${subjectPrefix}: ${productName} (${productSlug})`;

  // Bereits eingegebene Werte nicht überschreiben, nur leere Subject-Felder vorbelegen.
  if (subjectInput && !subjectInput.value.trim()) {
    subjectInput.value = suggestedSubject;
  }
}
