"use client";

import * as React from "react";
import { ArrowDownUp } from "lucide-react";

export type SortValue = "popular" | "new" | "price-asc" | "price-desc" | "rating";

const options: { value: SortValue; label: string }[] = [
  { value: "popular", label: "Popular" },
  { value: "new", label: "New Arrivals" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
];

export function SortDropdown({ value, onChange }: { value: SortValue; onChange: (v: SortValue) => void }) {
  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white px-4 py-2 text-sm font-semibold">
      <ArrowDownUp className="h-4 w-4 text-foreground/50" aria-hidden />
      <span className="sr-only">Sort by</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortValue)}
        className="bg-transparent focus:outline-none"
        aria-label="Sort products"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            Sort: {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
