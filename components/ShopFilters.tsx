"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ProductCategory } from "@/types";

const categoryOptions: ProductCategory[] = [
  "Dry Fruits",
  "Spices",
  "Dry Dates",
  "Whole Spices",
  "Speciality Flours",
  "Seeds",
];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

export default function ShopFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category");
  const activeSort = searchParams.get("sort") ?? "featured";

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/shop${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    });
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <button
          type="button"
          onClick={() => updateParam("category", null)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            !activeCategory
              ? "bg-gold-500 text-white"
              : "bg-white text-ink border border-gold-200 hover:bg-gold-50"
          }`}
        >
          All
        </button>
        {categoryOptions.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => updateParam("category", cat)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeCategory === cat
                ? "bg-gold-500 text-white"
                : "bg-white text-ink border border-gold-200 hover:bg-gold-50"
            }`}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm font-semibold text-ink/70">
          Sort by
        </label>
        <select
          id="sort"
          value={activeSort}
          onChange={(e) => updateParam("sort", e.target.value === "featured" ? null : e.target.value)}
          className="rounded-full border border-gold-200 bg-white px-4 py-2 text-sm font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-gold-500"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
