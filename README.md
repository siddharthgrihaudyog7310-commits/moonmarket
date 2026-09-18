# Party Pulse

A production-quality ecommerce storefront for **Party Pulse** — balloons, balloon
decoration kits, birthday accessories, party decorations and complete party kits.
Built with Next.js (App Router), TypeScript, Tailwind CSS, shadcn-style UI
primitives, Framer Motion and Lucide icons.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint     # run ESLint
```

## Project Structure

```
app/                    Routes (App Router)
  page.tsx                Homepage
  shop/                    Shop catalog (filters, sort, search)
  category/[slug]/         Category landing pages
  product/[slug]/          Product detail page
  cart/                    Full cart page
  checkout/                Checkout placeholder (no real payment)
  about/, contact/         Marketing pages
  layout.tsx               Root layout, fonts, providers, SEO defaults
  sitemap.ts / robots.ts   SEO files

components/
  ui/                      shadcn-style primitives (Button, Badge, Sheet, Dialog, …)
  layout/                  Navbar, AnnouncementBar, Footer, MobileMenu, SearchOverlay
  home/                    Homepage sections (Hero, ShopByTheme, Bundles, …)
  product/                 ProductCard, ProductGrid, Gallery, Tabs, QuickView
  shop/                    FilterSidebar, MobileFilterDrawer, SortDropdown
  cart/                    CartDrawer, CartLineItem

data/                    Local mock data (products, categories, themes, bundles)
lib/
  commerce.ts              Data-access layer — swap this for Shopify (see below)
  cart-context.tsx          Cart state, persisted to localStorage
  wishlist-context.tsx      Wishlist state, persisted to localStorage
  site-config.ts             Business details (phone, email, social, shipping threshold)
  utils.ts                   cn(), formatPrice(), discountPercent()
types/                   Shared TypeScript types (Product, CartItem, …)
public/products|categories|themes/  Generated placeholder SVG artwork
```

## Design System

- **Colors** — `tailwind.config.ts` defines the `pulse` palette: purple `#7C3AED`,
  pink `#FF4F81`, gold `#FFC857`, on a warm `#FFF9FC` background. Used subtly —
  accents and CTAs, not full-bleed color blocks.
- **Typography** — Baloo 2 (`font-display`, headings) + Nunito (`font-sans`, body),
  loaded via `next/font/google`.
- **Motifs** — rounded-blob shapes, soft shadows, balloon-inspired illustrations.

## State & Data

- **Cart** — `lib/cart-context.tsx`. Client-side React context backed by
  `localStorage` (`party-pulse:cart`). Supports add/remove/increment/decrement,
  and derives subtotal, discount and total.
- **Wishlist** — `lib/wishlist-context.tsx`, same pattern, key `party-pulse:wishlist`.
- **Products** — `data/products.ts` (24 mock products across 9 categories, 8 themes,
  8 occasions), read through `lib/commerce.ts`.

## Connecting to Shopify

Every page reads catalog data through `lib/commerce.ts` instead of importing
`data/*` directly, and the `Product`/`CartItem` types in `types/index.ts` already
mirror Shopify Storefront API concepts (`id`/`slug` ~ `id`/`handle`, `price`/`mrp`
~ `priceRange`/`compareAtPriceRange`). To go live with Shopify:

1. **Storefront API client** — add `@shopify/storefront-api-client` (or a thin
   `fetch` wrapper) and your store's domain + Storefront access token as env vars
   (`SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_TOKEN`).
2. **Re-implement `lib/commerce.ts`** — replace each function body with a GraphQL
   query against the Storefront API (`listProducts` → `products` query,
   `getProduct` → `product(handle:)`, etc.), mapping the response into the
   existing `Product` shape so no component needs to change.
3. **Cart** — swap `lib/cart-context.tsx`'s local state for Shopify's
   [Cart API](https://shopify.dev/docs/api/storefront#cart) (`cartCreate`,
   `cartLinesAdd`, `cartLinesUpdate`) and store the returned `cart.id` in
   `localStorage` instead of the line items themselves. The context's public
   interface (`addItem`, `increment`, `decrement`, `items`, `subtotal`, `total`)
   can stay the same so components are unaffected.
3. **Checkout** — replace the `/checkout` placeholder with a redirect to the
   Shopify-hosted `cart.checkoutUrl`, or integrate Shopify's
   [Hydrogen/Headless checkout](https://shopify.dev/docs/custom-storefronts)
   flow if you want a fully custom checkout.
4. **Images** — swap the generated placeholder SVGs in `public/` for Shopify CDN
   image URLs returned by the Storefront API (`next/image` already supports
   remote sources — add the Shopify CDN domain to `next.config.mjs`'s
   `images.remotePatterns`).
5. **Webhooks** (optional) — add an API route (`app/api/webhooks/...`) for
   inventory/price sync if you want ISR revalidation on product changes.

Because components only ever call `lib/commerce.ts` and the cart/wishlist
contexts, none of the UI needs to change during this migration.
