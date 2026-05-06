// shared-utils.js contains helpers used by multiple pages.

function resolveLanguage(requestedLang) {
  return SUPPORTED_LANGS.includes(requestedLang) ? requestedLang : DEFAULT_LANG;
}

function getLocalizedValue(item, field, language) {
  const localizedKey = `${field}DE`;
  if (language === "de" && item[localizedKey]) return item[localizedKey];
  return item[field];
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
