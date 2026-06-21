// config.js sammelt zentrale Konstanten und Hilfsfunktionen, die mehrere Seiten nutzen.
// Dadurch stehen gemeinsame Einstellungen und Funktionen an einer Stelle.

// === CONSTANTS ===

// Standardsprache, wenn kein gueltiger lang-Parameter in der URL steht.
const DEFAULT_LANG = "en";

// Diese Sprachen werden von der Seite verstanden.
const SUPPORTED_LANGS = ["en", "de"];

// Ein wiederverwendbarer SVG-Platzhalter fuer Produktkarten.
// Spaeter koennte hier ein echtes Bild oder ein anderer Platzhalter ersetzt werden.
const CARD_IMAGE_PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='480' viewBox='0 0 640 480'%3E%3Crect width='640' height='480' fill='%23f3efe8'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' fill='%23666' font-family='Arial, sans-serif' font-size='28'%3EProduct image%3C/text%3E%3C/svg%3E";

// === HELPERS ===

// Gibt die korrekte Sprache zurück, wenn der Parameter gültig ist, sonst DEFAULT_LANG.
function resolveLanguage(requestedLang) {
  return SUPPORTED_LANGS.includes(requestedLang) ? requestedLang : DEFAULT_LANG;
}

// Holt den lokalisierten Wert eines Produktfeldes (z.B. nameDE für Deutsch).
function getLocalizedValue(item, field, language) {
  const localizedKey = `${field}DE`;
  if (language === "de" && item[localizedKey]) return item[localizedKey];
  return item[field];
}

// Escaped HTML-Zeichen, um XSS-Anfälligkeit zu reduzieren.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function applyLanguageUI() {
  const requestedLang = new URLSearchParams(window.location.search).get("lang");
  const pageLanguage = resolveLanguage(requestedLang);
  const nextLanguage = pageLanguage === "de" ? "en" : "de";

  document.documentElement.lang = pageLanguage;

  const languageToggleLink = document.getElementById("language-toggle");
  if (languageToggleLink) {
    languageToggleLink.textContent = pageLanguage === "de" ? "English" : "Deutsch";

    const toggleUrl = new URL(window.location.href);
    toggleUrl.searchParams.set("lang", nextLanguage);
    languageToggleLink.href = toggleUrl.toString();
  }

  const internalNavLinks = document.querySelectorAll('nav a[href]:not(#language-toggle)');
  internalNavLinks.forEach((link) => {
    const hrefValue = link.getAttribute("href");
    if (!hrefValue || hrefValue.startsWith("mailto:") || hrefValue.startsWith("http") || hrefValue.startsWith("javascript:")) {
      return;
    }

    const linkUrl = new URL(hrefValue, window.location.href);
    linkUrl.searchParams.set("lang", pageLanguage);
    link.setAttribute("href", linkUrl.toString());
  });

  const translatedElements = document.querySelectorAll("[data-i18n-en], [data-i18n-de]");
  translatedElements.forEach((element) => {
    const translatedText = pageLanguage === "de" ? element.dataset.i18nDe : element.dataset.i18nEn;
    if (typeof translatedText !== "string") return;

    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
      if (!element.value) element.value = translatedText;
      return;
    }

    element.textContent = translatedText;
  });

  const languageBlocks = document.querySelectorAll("[data-language]");
  if (languageBlocks.length > 0) {
    languageBlocks.forEach((block) => {
      block.hidden = block.getAttribute("data-language") !== pageLanguage;
    });
  }

  const localizedTitles = document.querySelectorAll("[data-title-en], [data-title-de]");
  localizedTitles.forEach((element) => {
    const translatedTitle = pageLanguage === "de" ? element.dataset.titleDe : element.dataset.titleEn;
    if (typeof translatedTitle === "string" && translatedTitle) {
      document.title = translatedTitle;
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyLanguageUI);
} else {
  applyLanguageUI();
}
