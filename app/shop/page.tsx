import type { Metadata } from "next";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import ShopFilters from "@/components/ShopFilters";
import { products } from "@/data/products";
import { Product } from "@/types";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our full range of premium dry fruits, dry dates, and whole spices.",
};

interface ShopPageProps {
  searchParams: Promise<{ category?: string; sort?: string }>;
}

function comparePrices(a: Product, b: Product, direction: 1 | -1) {
  const pa = a.packs[0].price;
  const pb = b.packs[0].price;
  if (pa == null && pb == null) return 0;
  if (pa == null) return 1; // products without a price sort to the end either way
  if (pb == null) return -1;
  return (pa - pb) * direction;
}

function sortProducts(list: Product[], sort?: string) {
  const sorted = [...list];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => comparePrices(a, b, 1));
    case "price-desc":
      return sorted.sort((a, b) => comparePrices(a, b, -1));
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category, sort } = await searchParams;

  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;
  const sorted = sortProducts(filtered, sort);

  return (
    <div>
      <section className="relative overflow-hidden bg-gold-gradient">
        <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" aria-hidden="true" />
        <div className="section relative py-14 sm:py-16 text-center">
          <span className="section-eyebrow justify-center text-gold-800">Our Catalog</span>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-ink">
            Shop Our Range
          </h1>
          <p className="mt-3 text-ink/80 max-w-xl mx-auto">
            Premium dry fruits, dry dates &amp; whole spices — naturally sourced,
            hand-picked for quality.
          </p>
        </div>
      </section>

      <div className="section py-10 sm:py-14">
        <div className="card px-4 py-4 sm:px-6 sm:py-5">
          <Suspense fallback={null}>
            <ShopFilters />
          </Suspense>
        </div>

        <p className="mt-6 text-sm font-medium text-ink/50">
          Showing {sorted.length} {sorted.length === 1 ? "product" : "products"}
          {category ? ` in ${category}` : ""}
        </p>

        {sorted.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sorted.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="mt-6 card flex flex-col items-center gap-3 py-16 text-center">
            <span className="text-4xl" aria-hidden="true">☾</span>
            <p className="text-ink/60">
              No products found in this category yet — check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
