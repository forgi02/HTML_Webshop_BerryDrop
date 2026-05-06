// Einheitlicher Platzhalter fuer die Startseite, bis echte Produktbilder vorhanden sind.
const CARD_IMAGE =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='480' viewBox='0 0 640 480'%3E%3Crect width='640' height='480' fill='%23f3efe8'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' fill='%23666' font-family='Arial, sans-serif' font-size='28'%3EProduct image%3C/text%3E%3C/svg%3E";

function createProductCard(slug, product) {
  const listItem = document.createElement("li");
  const article = document.createElement("article");
  const figure = document.createElement("figure");
  const image = document.createElement("img");
  const caption = document.createElement("figcaption");
  const price = document.createElement("p");
  const availability = document.createElement("p");
  const detailsWrap = document.createElement("p");
  const detailsLink = document.createElement("a");

  image.src = CARD_IMAGE;
  image.alt = product.imageAlt || `${product.name} product image placeholder`;

  caption.textContent = product.nameDE
    ? `${product.name} / ${product.nameDE}`
    : product.name;

  price.textContent = `Price: ${product.price}`;
  availability.textContent = `Availability: ${product.availability}`;

  detailsLink.href = `product.html?product=${slug}`;
  detailsLink.textContent = "View details";
  detailsWrap.appendChild(detailsLink);

  figure.appendChild(image);
  figure.appendChild(caption);

  article.appendChild(figure);
  article.appendChild(price);
  article.appendChild(availability);
  article.appendChild(detailsWrap);

  listItem.appendChild(article);
  return listItem;
}

function renderProducts() {
  const productList = document.getElementById("product-list");
  if (!productList || typeof products !== "object") return;

  productList.innerHTML = "";

  Object.entries(products).forEach(([slug, product]) => {
    productList.appendChild(createProductCard(slug, product));
  });

  if (productList.children.length === 0) {
    const emptyState = document.createElement("li");
    emptyState.textContent = "No products found in data.js.";
    productList.appendChild(emptyState);
  }
}

renderProducts();
