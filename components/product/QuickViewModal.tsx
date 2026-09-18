"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/product/RatingStars";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { discountPercent, formatPrice } from "@/lib/utils";

export function QuickViewModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { addItem } = useCart();

  if (!product) return null;
  const discount = discountPercent(product.price, product.mrp);

  return (
    <Dialog open={!!product} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative aspect-square bg-muted">
            <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            {discount > 0 && (
              <Badge variant="secondary" className="absolute left-3 top-3">
                {discount}% OFF
              </Badge>
            )}
          </div>
          <div className="flex flex-col p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-pulse-purple/70">
              {product.category.replace(/-/g, " ")}
            </p>
            <h2 className="mt-1 font-display text-xl font-extrabold">{product.name}</h2>
            <div className="mt-2 flex items-center gap-2">
              <RatingStars rating={product.rating} />
              <span className="text-xs text-foreground/50">({product.reviewCount} reviews)</span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold">{formatPrice(product.price)}</span>
              {product.mrp > product.price && (
                <span className="text-sm text-foreground/40 line-through">{formatPrice(product.mrp)}</span>
              )}
            </div>
            <p className="mt-3 line-clamp-4 text-sm text-foreground/70">{product.description}</p>
            <div className="mt-6 flex gap-3">
              <Button
                className="flex-1"
                onClick={() => {
                  addItem(product);
                  toast.success(`${product.name} added to cart`);
                }}
              >
                Add to Cart
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/product/${product.slug}`} onClick={onClose}>
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
