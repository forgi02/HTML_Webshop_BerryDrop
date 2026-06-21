// data.js enthaelt nur Produktdaten.
// Das ist bewusst keine Logik-Datei: app.js und index.js lesen diese Daten nur aus und stellen sie dar.
// Wenn spaeter ein neues Produkt dazukommt, wird hier einfach ein neues Objekt ergaenzt.

// Das Objekt products ist wie eine kleine Datenbank im JavaScript-Format.
// Der Schluessel ist der Produkt-Slug, der auch in der URL verwendet wird.
const products = {
  "raspberry-pearlette-necklace": {
    // Englischer und deutscher Name des Produkts.
    name: "Raspberry Pearlette Necklace",
    nameDE: "Raspberry Pearlette Halskette",
    // Alt-Text fuer das Bild, falls spaeter ein echtes Produktbild eingebunden wird.
    imageAlt: "Raspberry Pearlette Necklace product image",
    // Alle verfügbaren Produktbilder (2-3 pro Produkt) im data/-Ordner.
    images: ["data/Raspberry_Necklace_1.jpeg", "data/Raspberry_Necklace_2.jpeg", "data/Raspberry_Necklace_3.jpeg"],
    // Preis bleibt nur einmal gespeichert, weil er sprachunabhaengig ist.
    price: "€49,95",
    // Kategorie in beiden Sprachen.
    category: "Necklace",
    categoryDE: "Halskette",
    // Herkunft des Produkts in EN und DE.
    madeIn: "Austria",
    madeInDE: "Österreich",
    // Versandzeit in EN und DE.
    shipping: "3-5 business days",
    shippingDE: "3-5 Werktage",
    // Lagerstatus in EN und DE.
    availability: "In stock",
    availabilityDE: "Verfügbar",
    // Lange Produktbeschreibung in beiden Sprachen.
    description:
      "Inspired by the swirling colors of a spring meadow, our Raspberry Pearlette Necklace is at the center of our Garden Collection set. This piece features colorful pearls and iridescent glass star beads for a luminescent and ethereal look.",
    descriptionDE:
      "Inspiriert von der lebendigen Farbenpracht einer Frühlingswiese, ist unsere Raspberry Pearlette Halskette das Herzstück unseres Garden Collection Sets. Dieses Schmuckstück besticht durch farbenfrohe Perlen und irisierende Glassternperlen, die für einen leuchtenden und ätherischen Look sorgen.",
    // Listen fuer Materialien.
    materials: [
      "18K Gold dipped stainless steel and brass",
      "AAA grade genuine pearl (white)",
      "Shell pearl (pink, lavender, blue)",
      "Cubic zirconium, Czech crystal, Czech glass, Lampwork glass bead",
    ],
    materialsDE: [
      "Edelstahl und Messing mit 18-karätiger Goldbeschichtung",
      "Echte Perlen (weiß) in AAA-Qualität",
      "Muschelkernperlen (Rosa, Lavendel, Blau)",
      "Zirkonia, tschechisches Kristall, tschechisches Glas, Lampwork-Glasperle",
    ],
    // Maßangaben, hier jeweils als Listen, damit app.js sie einheitlich einlesen kann.
    measurements: ["35-40 cm including extension chain"],
    measurementsDE: ["35-40 cm (inklusive Verlängerungskettchen)"],
    // Hinweise und Lieferinformationen.
    notes: ["Handmade in Austria", "Ships in 3-5 business days"],
    notesDE: ["Handgefertigt in Österreich", "Versandfertig in 3-5 Werktagen"],
  },
  "raspberry-swirl-earrings": {
    // Zweites Produkt: Ohrringe mit gleichem Datenaufbau.
    name: "Raspberry Swirl Earrings",
    nameDE: "Raspberry Swirl Ohrringe",
    imageAlt: "Raspberry Swirl Earrings product image",
    images: ["data/Raspberry_Earrings_1.jpeg", "data/Raspberry_Earrings_2.jpeg"],
    price: "€39,95",
    category: "Earrings",
    categoryDE: "Ohrringe",
    madeIn: "Austria",
    madeInDE: "Österreich",
    shipping: "3-5 business days",
    shippingDE: "3-5 Werktage",
    availability: "In stock",
    availabilityDE: "Verfügbar",
    description:
      "A twinkling flower charm and a handcrafted raspberry shaped Lampwork glass charm hang from cubic zirconium gold earrings. These earrings were created to pair perfectly alongside the Raspberry Pearlette Necklace and Bijou Berry Bracelet.",
    descriptionDE:
      "Ein funkelnder Blumen-Anhänger und ein handgefertigter Lampwork-Glasanhänger in Himbeerform zieren diese mit Zirkonia besetzten Goldohrringe. Diese Ohrringe wurden entworfen, um perfekt mit der Raspberry Pearlette Halskette und dem Bijou Berry Armband zu harmonieren.",
    materials: ["24K Gold dipped brass", "Cubic zirconium, Czech glass", "Lampwork glass bead"],
    materialsDE: ["Messing mit 24-karätiger Goldbeschichtung", "Zirkonia, tschechisches Glas", "Lampwork-Glasperle"],
    measurements: ["One size"],
    measurementsDE: ["Einheitsgröße"],
    notes: ["Handmade in Austria", "Ships in 3-5 business days"],
    notesDE: ["Handgefertigt in Österreich", "Versandfertig in 3-5 Werktagen"],
  },
  "bijou-berry-bracelet": {
    // Drittes Produkt: Armband.
    name: "Bijou Berry Bracelet",
    nameDE: "Bijou Berry Armband",
    imageAlt: "Bijou Berry Bracelet product image",
    images: ["data/Bijou_Bracelet_1.jpeg", "data/Bijou_Bracelet_2.jpeg", "data/Bijou_Bracelet_3.jpeg"],
    price: "€42,95",
    category: "Bracelet",
    categoryDE: "Armband",
    madeIn: "Austria",
    madeInDE: "Österreich",
    shipping: "3-5 business days",
    shippingDE: "3-5 Werktage",
    availability: "In stock",
    availabilityDE: "Verfügbar",
    description:
      "Shine bright with the Bijou Berry Bracelet. Handmade with pastel pearls, iridescent glass stars, and Lampwork raspberry glass beads, these shooting stars add a touch of magic.",
    descriptionDE:
      "Strahlen Sie mit dem Bijou Berry Armband um die Wette. Handgefertigt mit Pastellperlen, irisierenden Glassternen und Lampwork-Glasperlen in Himbeerform, verleihen diese Sternschnuppen Ihrem Look einen Hauch von Magie.",
    materials: [
      "Bright silver dipped stainless steel",
      "AAA grade genuine pearl (white)",
      "Shell pearl (pink, blue, and lavender)",
      "Czech glass",
      "Lampwork Glass Beads",
    ],
    materialsDE: [
      "Edelstahl, hell versilbert",
      "Echte Perlen (weiß) in AAA-Qualität",
      "Muschelkernperlen (Rosa, Blau und Lavendel)",
      "Tschechisches Glas",
      "Lampwork-Glasperlen",
    ],
    measurements: ["Choose the correct bracelet size"],
    measurementsDE: ["Bitte wählen Sie die richtige Armband-Größe"],
    notes: ["Handmade in Austria", "Ships in 3-5 business days"],
    notesDE: ["Handgefertigt in Österreich", "Versandfertig in 3-5 Werktagen", "Ohne Verlängerungskettchen"],
  },
};
