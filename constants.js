// constants.js sammelt Werte, die mehrere JavaScript-Dateien brauchen.
// Dadurch stehen gemeinsame Einstellungen nur an einer Stelle und sind leichter zu erklären,
// leichter zu ändern und weniger fehleranfällig.

// Standardsprache, wenn kein gueltiger lang-Parameter in der URL steht.
const DEFAULT_LANG = "en";

// Diese Sprachen werden von der Seite verstanden.
const SUPPORTED_LANGS = ["en", "de"];

// Ein wiederverwendbarer SVG-Platzhalter fuer Produktkarten.
// Spaeter koennte hier ein echtes Bild oder ein anderer Platzhalter ersetzt werden.
const CARD_IMAGE_PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='480' viewBox='0 0 640 480'%3E%3Crect width='640' height='480' fill='%23f3efe8'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' fill='%23666' font-family='Arial, sans-serif' font-size='28'%3EProduct image%3C/text%3E%3C/svg%3E";