"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterSidebar, ShopFilters } from "@/components/shop/FilterSidebar";
import { MobileFilterDrawer } from "@/components/shop/MobileFilterDrawer";
import { SortDropdown, SortValue } from "@/components/shop/SortDropdown";
import { products } from "@/data/products";
import { CategorySlug, Product, ThemeSlug } from "@/types";

const MAX_PRICE = 3000;

function packBucket(product: Product): string {
  const count = parseInt(product.packSize, 10) || 1;
  if (count < 20) return "Small (< 20 pcs)";
  if (count <= 60) return "Medium (20-60 pcs)";
  return "Large (60+ pcs)";
}

export function ShopClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as CategorySlug | null;
  const initialTheme = searchParams.get("theme") as ThemeSlug | null;
  const q = searchParams.get("q")?.toLowerCase() ?? "";

  const [filters, setFilters] = useState<ShopFilters>({
    categories: initialCategory ? [initialCategory] : [],
    themes: initialTheme ? [initialTheme] : [],
    packSizes: [],
    priceRange: [0, MAX_PRICE],
    minRating: 0,
    inStockOnly: false,
  });
  const [sort, setSort] = useState<SortValue>("popular");

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q) && !p.category.includes(q) && !p.tagline?.toLowerCase().includes(q)) {
        return false;
      }
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.themes.length && !p.themes.some((t) => filters.themes.includes(t))) return false;
      if (filters.packSizes.length && !filters.packSizes.includes(packBucket(p))) return false;
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;
      if (filters.minRating && p.rating < filters.minRating) return false;
      if (filters.inStockOnly && !p.inStock) return false;
      return true;
    });

    switch (sort) {
      case "new":
        list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort((a, b) => Number(b.isBestseller) - Number(a.isBestseller) || b.rating - a.rating);
    }
    return list;
  }, [filters, sort, q]);

  function clearFilters() {
    setFilters({
      categories: [],
      themes: [],
      packSizes: [],
      priceRange: [0, MAX_PRICE],
      minRating: 0,
      inStockOnly: false,
    });
  }

  return (
    <div className="container-px mx-auto py-8 lg:py-12">
      <div className="mb-2">
        <h1 className="font-display text-2xl font-extrabold sm:text-3xl">
          {q ? `Search results for "${q}"` : "Shop All Products"}
        </h1>
        <p className="mt-1 text-sm text-foreground/55">{filtered.length} products</p>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl bg-white p-5 shadow-card">
            <FilterSidebar filters={filters} onChange={setFilters} onClear={clearFilters} maxPrice={MAX_PRICE} />
          </div>
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between gap-3">
            <MobileFilterDrawer
              filters={filters}
              onChange={setFilters}
              onClear={clearFilters}
              maxPrice={MAX_PRICE}
              resultCount={filtered.length}
            />
            <SortDropdown value={sort} onChange={setSort} />
          </div>
          <ProductGrid products={filtered} columns="grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" />
        </div>
      </div>
    </div>
  );
}
