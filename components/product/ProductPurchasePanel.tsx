"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heart, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/product/RatingStars";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { cn, discountPercent, formatPrice } from "@/lib/utils";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [colorId, setColorId] = useState(product.colors?.[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const router = useRouter();
  const discount = discountPercent(product.price, product.mrp);
  const selectedColor = product.colors?.find((c) => c.id === colorId);
  const wished = isWishlisted(product.id);

  function handleAddToCart() {
    addItem(product, { colorId, colorLabel: selectedColor?.label, quantity });
    toast.success(`${product.name} added to cart`, { description: `Qty ${quantity}` });
  }

  function handleBuyNow() {
    addItem(product, { colorId, colorLabel: selectedColor?.label, quantity });
    router.push("/checkout");
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-pulse-purple/70">
        {product.category.replace(/-/g, " ")}
      </p>
      <h1 className="mt-1 font-display text-2xl font-extrabold leading-tight sm:text-3xl">{product.name}</h1>
      {product.tagline && <p className="mt-1 text-sm text-foreground/55">{product.tagline}</p>}

      <div className="mt-3 flex items-center gap-2">
        <RatingStars rating={product.rating} />
        <span className="text-sm font-semibold">{product.rating}</span>
        <span className="text-sm text-foreground/50">({product.reviewCount} reviews)</span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-3xl font-extrabold">{formatPrice(product.price)}</span>
        {product.mrp > product.price && (
          <>
            <span className="text-lg text-foreground/40 line-through">{formatPrice(product.mrp)}</span>
            <Badge variant="secondary">{discount}% OFF</Badge>
          </>
        )}
      </div>
      <p className="mt-1 text-xs text-foreground/50">Inclusive of all taxes</p>

      {product.colors && product.colors.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-bold">
            Color: <span className="font-normal text-foreground/60">{selectedColor?.label}</span>
          </p>
          <div className="mt-2 flex gap-2">
            {product.colors.map((c) => (
              <button
                key={c.id}
                onClick={() => setColorId(c.id)}
                aria-label={c.label}
                aria-pressed={colorId === c.id}
                className={cn(
                  "h-9 w-9 rounded-full border-2 transition-all",
                  colorId === c.id ? "border-pulse-purple scale-110" : "border-transparent"
                )}
                style={{ backgroundColor: c.swatch }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center gap-4">
        <p className="text-sm font-bold">Quantity</p>
        <div className="flex items-center gap-1 rounded-full border border-foreground/15">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-foreground/5"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-bold" aria-live="polite">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-foreground/5"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-7 flex gap-3">
        <Button size="lg" variant="outline" className="flex-1" onClick={handleAddToCart} disabled={!product.inStock}>
          Add to Cart
        </Button>
        <Button size="lg" className="flex-1" onClick={handleBuyNow} disabled={!product.inStock}>
          Buy Now
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-14 w-14 shrink-0"
          onClick={() => toggle(product.id)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
        >
          <Heart className={cn("h-5 w-5", wished && "fill-pulse-pink text-pulse-pink")} />
        </Button>
      </div>
      {!product.inStock && <p className="mt-2 text-sm font-semibold text-destructive">Currently out of stock</p>}

      <div className="mt-7 grid grid-cols-2 gap-3 border-t border-foreground/10 pt-6 text-xs text-foreground/60">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-pulse-purple" /> Free shipping above ₹999
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-pulse-purple" /> Quality checked
        </div>
      </div>
    </div>
  );
}
