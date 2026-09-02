# Moon Spices & Groceries

A marketing website for **Moon Spices & Groceries**, a premium Indian dry
fruits and spices brand. Built with Next.js (App Router), TypeScript, and
Tailwind CSS.

This is a **brand/marketing site, not an online store** — there's no
cart or checkout. Every product's "Enquire Now" button opens a pre-filled
WhatsApp chat (with a `mailto`/`tel` fallback via the Contact page) so
customers can order or ask questions directly.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

Other useful commands:

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # run ESLint
```

## Project Structure

```
app/                  Routes (App Router)
  page.tsx             Home
  shop/page.tsx         Shop listing (filter + sort via query params)
  shop/[slug]/page.tsx  Product detail
  about/page.tsx        About / brand story
  contact/page.tsx      Contact form + business details
  layout.tsx            Root layout, fonts, global metadata
  sitemap.ts / robots.ts  Basic SEO files

components/           Reusable UI (Navbar, Footer, ProductCard, Hero, …)
data/                 Static seed data (products.ts, testimonials.ts)
lib/                  site-config.ts (business details), utils.ts
types/                Shared TypeScript types
public/products/      Product placeholder images
```

## Where to Plug In Real Content

- **Business details** — edit `lib/site-config.ts` (phone, WhatsApp
  number, email, address, founding year, social links). These values
  power the footer, contact page, and every "Enquire Now" WhatsApp link.
- **Product catalog** — edit `data/products.ts`. Each product has a
  `slug`, `category`, `image`, description fields, and one or more
  `packs` (weight + price). Add/remove products or pack sizes here.
- **Product photos** — replace the placeholder SVGs in `public/products/`
  with real photography. Keep the same filenames (referenced from
  `data/products.ts`) or update the `image` path per product. Square
  images (at least 800×800px) work best.
- **Logo** — replace `public/logo.svg` (used in the Navbar/Footer via
  `components/Logo.tsx`) and `app/icon.svg` (browser favicon) with your
  real logo mark.
- **Testimonials** — edit `data/testimonials.ts`.
- **About page imagery/copy** — `app/about/page.tsx`.
- **Open Graph / social preview image** — replace `public/og-image.svg`
  with a proper 1200×630 PNG/JPG for best compatibility across social
  platforms.
- **Contact form & newsletter signup** — both are UI-only right now
  (`components/ContactForm.tsx`, `components/Newsletter.tsx`). Wire them
  up to a form/email service (e.g. Formspree, Resend) or a Next.js API
  route before launch.
- **Map** — the Contact page has a placeholder map block; embed a real
  Google Maps iframe for your store location.

## Design System

- **Colors**: golden (`gold-50`…`gold-900`, primary `gold-500`
  `#C9962C`), cream background (`#FFFDF7`), near-black body text
  (`#1A1A1A`). See `tailwind.config.ts`.
- **Typography**: Poppins (400/500/600/700/800), loaded via
  `next/font/google` in `app/layout.tsx`.
- **Crescent moon motif**: used in the logo mark, favicon, and as a
  section divider (`components/SectionDivider.tsx`) throughout the site.

## Deploying

The site is a standard Next.js app and deploys cleanly to
[Vercel](https://vercel.com) — connect this repository and point your
domain (e.g. `moonmarket.in`) at the resulting deployment.
