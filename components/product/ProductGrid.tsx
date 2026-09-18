"use client";

import { useState } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";
import { QuickViewModal } from "@/components/product/QuickViewModal";

export function ProductGrid({
  products,
  columns = "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}: {
  products: Product[];
  columns?: string;
}) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-20 text-center shadow-card">
        <p className="font-display text-lg font-bold">No products found</p>
        <p className="mt-1 text-sm text-foreground/50">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <>
      <div className={`grid gap-3 sm:gap-5 ${columns}`}>
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={setQuickViewProduct}
            priority={i < 4}
          />
        ))}
      </div>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  );
}
