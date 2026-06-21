// language-switcher.js setzt das Sprach-Label in der Navigation und schaltet Seiteninhalte um.

const pageLanguage = resolveLanguage(new URLSearchParams(window.location.search).get("lang"));
const nextLanguage = pageLanguage === "de" ? "en" : "de";

document.documentElement.lang = pageLanguage;

function applyI18nText() {
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
}

const languageToggleLink = document.getElementById("language-toggle");
if (languageToggleLink) {
  languageToggleLink.textContent = pageLanguage === "de" ? "English" : "Deutsch";

  const toggleUrl = new URL(window.location.href);
  toggleUrl.searchParams.set("lang", nextLanguage);
  languageToggleLink.href = toggleUrl.toString();
}

const languageBlocks = document.querySelectorAll("[data-language]");
if (languageBlocks.length > 0) {
  languageBlocks.forEach((block) => {
    block.hidden = block.getAttribute("data-language") !== pageLanguage;
  });
}

applyI18nText();

const localizedTitles = document.querySelectorAll("[data-title-en], [data-title-de]");
localizedTitles.forEach((element) => {
  const translatedTitle = pageLanguage === "de" ? element.dataset.titleDe : element.dataset.titleEn;
  if (typeof translatedTitle === "string" && translatedTitle) {
    document.title = translatedTitle;
  }
});