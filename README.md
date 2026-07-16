# Dubai Power Tools — E-commerce Storefront

A premium, multi-page e-commerce & catalog site for a luxury industrial tools brand
targeting the UAE market. Built with React + React Router + Tailwind CSS + Lucide icons.

## Getting Started

```bash
npm install
npm run dev       # start local dev server (http://localhost:5173)
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## Pages / Routes

- `/` — Home (hero, category grid, best sellers carousel, trust section)
- `/category/:slug` — Catalog page with sidebar filters (price, brand, availability, power source) + sorting
- `/product/:slug` — Product detail page (gallery, specs tabs, WhatsApp order, related products)
- `/cart` — Cart with live quantity editing & free-shipping progress bar
- `/checkout` — UAE-specific shipping form (Emirate dropdown), COD/Card toggle, VAT-inclusive order summary
- `/wishlist` — Saved products

## State Management

Three React Context providers, each persisted to `localStorage`:
- `CartContext` — cart items, quantities, subtotal
- `WishlistContext` — saved product ids
- `SearchContext` — live search query + matching results (used by the header search bar)

## Expanding the Catalog

All product & category data lives in `src/data/products.js`. To add a product:
1. Add a new object to the `PRODUCTS` array (see existing entries for the shape).
2. Set `category` to match one of the slugs in `CATEGORIES`.
3. Point `image` at a key in `src/components/shared/ProductImage.jsx`'s `SWATCHES` map
   (a gradient + icon stand-in for real photography), or add a new swatch entry.
4. In production, swap `ProductImage` for real photo URLs and hook `products.js` up to
   your actual commerce backend / CMS instead of the static array.

## Notes for Production

- The WhatsApp number (`971500000000`) in `Header`/`WhatsAppWidget`/`ProductDetail` is a
  placeholder — replace with the real business line.
- The card payment fields on `/checkout` are a visual mockup only; wire up a real UAE
  payment gateway (Telr, Network International, Tabby, Tamara, Stripe, etc.) before launch.
- Swap Google Fonts `<link>` tags in `index.html` for self-hosted fonts if you need to work
  fully offline or improve first-load performance.
