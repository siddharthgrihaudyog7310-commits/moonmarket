import Link from "next/link";
import { Product } from "@/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";

export function TrendingProducts({ products }: { products: Product[] }) {
  return (
    <section className="container-px mx-auto py-12 lg:py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Trending Party Picks</h2>
          <p className="mt-1 text-sm text-foreground/60">Most-loved products this week</p>
        </div>
        <Button variant="link" asChild className="hidden sm:inline-flex">
          <Link href="/shop">View All</Link>
        </Button>
      </div>
      <ProductGrid products={products} />
      <div className="mt-8 text-center sm:hidden">
        <Button variant="outline" asChild>
          <Link href="/shop">View All Products</Link>
        </Button>
      </div>
    </section>
  );
}
