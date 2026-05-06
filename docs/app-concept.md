# JavaScript App Concept

## Purpose
The `app.js` script transforms the static `product.html` template into a dynamic product detail page. Instead of creating separate HTML files for each product, a single template page loads product data based on a URL parameter.

## How It Works

### Entry Point
- User clicks "View details" on the homepage (`index.html`)
- Link points to: `product.html?product=raspberry-pearlette-necklace`
- The `?product=...` parameter tells `app.js` which product to load

### Data Flow
1. **Browser loads `product.html`** with placeholder content
2. **`app.js` runs automatically** when the page loads
3. **App reads the URL parameter** via `URLSearchParams`
4. **App looks up the product** in a `products` data structure
5. **App populates HTML elements** using their ID attributes (e.g., `id="product-price"`, `id="product-description"`)
6. **Page displays the correct product** with all details

### How It Integrates Into the Site

**Static Pages (no JavaScript needed):**
- `index.html` - Homepage with product links
- `contact.html` - Contact form
- `imprint.html` - Legal page

**Dynamic Page (JavaScript required):**
- `product.html` - Single template loaded for all 3 products
- `app.js` - Reads URL, finds product data, fills HTML

### Element Mapping (HTML IDs)
The template has these ID attributes, all pre-set for JavaScript targeting:
- `id="product-heading"` → Product title
- `id="product-image"` → Product image
- `id="product-name"` → Image caption
- `id="product-price"` → Price (€)
- `id="product-category"` → Type (Necklace/Earrings/Bracelet)
- `id="product-made-in"` → Origin
- `id="product-shipping"` → Shipping time
- `id="product-availability"` → Stock status
- `id="product-description"` → Long description
- `id="product-materials"` → Materials list (ul)
- `id="product-measurements"` → Measurements list (ul)
- `id="product-notes"` → Additional notes list (ul)
- `id="product-contact-link"` → Contact button href

### Data Structure
A simple JavaScript object containing 3 products:
```javascript
{
  "raspberry-pearlette-necklace": {
    name: "Raspberry Pearlette Necklace",
    price: "€49,95",
    category: "Necklace",
    // ... more fields
  },
  "raspberry-swirl-earrings": { ... },
  "bijou-berry-bracelet": { ... }
}
```

## Error Handling
If the URL parameter is missing or the product doesn't exist, the page shows placeholder text so users aren't confused.

## Benefits
- **One HTML file** instead of 3 separate hardcoded pages
- **Easy to scale** – add a new product? Just add it to the data structure
- **Foundation for future features** – language switching, filtering, etc.
- **Single point of maintenance** – fix a UI bug once, all products benefit
