"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, Plus } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/product/RatingStars";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { cn, discountPercent, formatPrice } from "@/lib/utils";

export function ProductCard({
  product,
  onQuickView,
  priority = false,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
  priority?: boolean;
}) {
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const [justWished, setJustWished] = useState(false);
  const wished = isWishlisted(product.id);
  const discount = discountPercent(product.price, product.mrp);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart`, {
      description: `${formatPrice(product.price)} · Qty 1`,
    });
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    setJustWished(true);
    setTimeout(() => setJustWished(false), 400);
  }

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-muted">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        <div className="absolute left-2 top-2 flex flex-col gap-1.5">
          {discount > 0 && <Badge variant="secondary">{discount}% OFF</Badge>}
          {product.isNew && <Badge variant="accent">NEW</Badge>}
          {product.isBestseller && <Badge variant="default">BESTSELLER</Badge>}
        </div>

        <button
          onClick={handleWishlist}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              wished ? "fill-pulse-pink text-pulse-pink" : "text-foreground/50",
              justWished && "animate-heart-pop"
            )}
          />
        </button>

        <div className="pointer-events-none absolute inset-x-2 bottom-2 flex translate-y-3 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className="pointer-events-auto flex flex-1 items-center justify-center gap-1.5 rounded-full bg-foreground py-2 text-xs font-bold text-white shadow-md hover:bg-pulse-purple"
            aria-label={`Quick add ${product.name} to cart`}
          >
            <Plus className="h-3.5 w-3.5" /> Add to Cart
          </button>
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              aria-label={`Quick view ${product.name}`}
              className="pointer-events-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-foreground shadow-md hover:bg-pulse-gold"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}
        </div>
      </Link>

      <Link href={`/product/${product.slug}`} className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[11px] font-bold uppercase tracking-wide text-pulse-purple/70">
          {product.category.replace(/-/g, " ")}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-foreground sm:text-[15px]">
          {product.name}
        </h3>
        <div className="mt-1.5 flex items-center gap-1.5">
          <RatingStars rating={product.rating} />
          <span className="text-xs text-foreground/50">({product.reviewCount})</span>
        </div>
        <div className="mt-auto flex items-baseline gap-2 pt-2.5">
          <span className="text-base font-extrabold text-foreground sm:text-lg">{formatPrice(product.price)}</span>
          {product.mrp > product.price && (
            <span className="text-xs text-foreground/40 line-through">{formatPrice(product.mrp)}</span>
          )}
        </div>
      </Link>
    </div>
  );
}
