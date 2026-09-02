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

function sortProducts(list: Product[], sort?: string) {
  const sorted = [...list];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.packs[0].price - b.packs[0].price);
    case "price-desc":
      return sorted.sort((a, b) => b.packs[0].price - a.packs[0].price);
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
    <div className="section py-12">
      <div className="text-center mb-10">
        <h1 className="section-heading">Shop Our Range</h1>
        <p className="mt-2 text-ink/70">
          Premium dry fruits, dry dates &amp; whole spices — naturally sourced.
        </p>
      </div>

      <Suspense fallback={null}>
        <ShopFilters />
      </Suspense>

      {sorted.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sorted.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-ink/60">
          No products found in this category yet — check back soon!
        </p>
      )}
    </div>
  );
}
