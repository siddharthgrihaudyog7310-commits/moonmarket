"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { RatingStars } from "@/components/product/RatingStars";
import { productCategories, themes as allThemes } from "@/data/categories";
import { formatPrice } from "@/lib/utils";
import { CategorySlug, ThemeSlug } from "@/types";
import { Button } from "@/components/ui/button";

export interface ShopFilters {
  categories: CategorySlug[];
  themes: ThemeSlug[];
  packSizes: string[];
  priceRange: [number, number];
  minRating: number;
  inStockOnly: boolean;
}

const packSizeOptions = ["Small (< 20 pcs)", "Medium (20-60 pcs)", "Large (60+ pcs)"];

export function FilterSidebar({
  filters,
  onChange,
  onClear,
  maxPrice,
}: {
  filters: ShopFilters;
  onChange: (filters: ShopFilters) => void;
  onClear: () => void;
  maxPrice: number;
}) {
  function toggleArrayValue<T>(arr: T[], value: T): T[] {
    return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-extrabold">Filters</h2>
        <Button variant="link" size="sm" onClick={onClear} className="h-auto p-0 text-xs">
          Clear All
        </Button>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold">Category</h3>
        <div className="space-y-2.5">
          {productCategories.map((cat) => (
            <label key={cat.slug} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <Checkbox
                checked={filters.categories.includes(cat.slug)}
                onCheckedChange={() =>
                  onChange({ ...filters, categories: toggleArrayValue(filters.categories, cat.slug) })
                }
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 text-sm font-bold">Price</h3>
        <Slider
          min={0}
          max={maxPrice}
          step={50}
          value={filters.priceRange}
          onValueChange={(v) => onChange({ ...filters, priceRange: v as [number, number] })}
        />
        <div className="mt-2 flex justify-between text-xs text-foreground/60">
          <span>{formatPrice(filters.priceRange[0])}</span>
          <span>{formatPrice(filters.priceRange[1])}</span>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 text-sm font-bold">Theme</h3>
        <div className="space-y-2.5">
          {allThemes.map((theme) => (
            <label key={theme.slug} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <Checkbox
                checked={filters.themes.includes(theme.slug)}
                onCheckedChange={() => onChange({ ...filters, themes: toggleArrayValue(filters.themes, theme.slug) })}
              />
              {theme.name}
            </label>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 text-sm font-bold">Pack Size</h3>
        <div className="space-y-2.5">
          {packSizeOptions.map((size) => (
            <label key={size} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <Checkbox
                checked={filters.packSizes.includes(size)}
                onCheckedChange={() => onChange({ ...filters, packSizes: toggleArrayValue(filters.packSizes, size) })}
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 text-sm font-bold">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2].map((r) => (
            <button
              key={r}
              onClick={() => onChange({ ...filters, minRating: filters.minRating === r ? 0 : r })}
              className={`flex w-full items-center gap-2 rounded-lg px-1.5 py-1 text-sm ${
                filters.minRating === r ? "bg-pulse-purple-50 text-pulse-purple" : ""
              }`}
            >
              <RatingStars rating={r} /> &amp; up
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold">
        <Checkbox
          checked={filters.inStockOnly}
          onCheckedChange={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
        />
        In Stock Only
      </label>
    </div>
  );
}
