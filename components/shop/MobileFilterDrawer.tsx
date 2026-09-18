"use client";

import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilterSidebar, ShopFilters } from "@/components/shop/FilterSidebar";

export function MobileFilterDrawer({
  filters,
  onChange,
  onClear,
  maxPrice,
  resultCount,
}: {
  filters: ShopFilters;
  onChange: (filters: ShopFilters) => void;
  onClear: () => void;
  maxPrice: number;
  resultCount: number;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 lg:hidden">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
        <SheetHeader className="sr-only">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="px-6 pb-4 pt-6">
          <FilterSidebar filters={filters} onChange={onChange} onClear={onClear} maxPrice={maxPrice} />
        </div>
        <div className="sticky bottom-0 border-t border-foreground/10 bg-background px-6 py-4">
          <SheetTrigger asChild>
            <Button className="w-full" size="lg">
              Show {resultCount} results
            </Button>
          </SheetTrigger>
        </div>
      </SheetContent>
    </Sheet>
  );
}
