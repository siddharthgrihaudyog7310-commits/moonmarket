"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { toast } from "sonner";

export default function CartPage() {
  const { items, subtotal, discount, total, addItem } = useCart();
  const { ids: wishlistIds, toggle } = useWishlist();
  const remaining = Math.max(0, siteConfig.freeShippingThreshold - subtotal);
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <main className="container-px mx-auto py-8 lg:py-12">
      <h1 className="font-display text-2xl font-extrabold sm:text-3xl">Your Cart</h1>

      {items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl bg-white py-20 text-center shadow-card">
          <ShoppingBag className="h-12 w-12 text-foreground/20" />
          <p className="font-display text-lg font-bold">Your cart is empty</p>
          <p className="text-sm text-foreground/50">Looks like you haven&apos;t added anything yet.</p>
          <Button asChild size="lg" className="mt-2">
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-4 shadow-card sm:p-6 lg:col-span-2">
            <div className="divide-y divide-foreground/10">
              {items.map((item) => (
                <CartLineItem key={`${item.productId}-${item.colorId ?? "default"}`} item={item} />
              ))}
            </div>
          </div>

          <div className="h-fit rounded-3xl bg-white p-6 shadow-card">
            <h2 className="font-display text-lg font-bold">Order Summary</h2>
            {remaining > 0 ? (
              <div className="mt-3 rounded-xl bg-pulse-gold-50 px-3 py-2 text-xs font-semibold text-pulse-gold-700">
                Add {formatPrice(remaining)} more for FREE shipping!
              </div>
            ) : (
              <div className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                You&apos;ve unlocked FREE shipping!
              </div>
            )}
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-foreground/60">
                <span>Subtotal (MRP)</span>
                <span>{formatPrice(subtotal + discount)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-pulse-pink-600">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-foreground/60">
                <span>Shipping</span>
                <span>{remaining > 0 ? "Calculated at checkout" : "Free"}</span>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between text-lg font-extrabold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Button asChild size="lg" className="mt-6 w-full">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="mt-3 w-full">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      )}

      <section id="wishlist" className="mt-16 scroll-mt-24">
        <div className="mb-5 flex items-center gap-2">
          <Heart className="h-5 w-5 text-pulse-pink" />
          <h2 className="font-display text-xl font-extrabold">Your Wishlist</h2>
        </div>
        {wishlistedProducts.length === 0 ? (
          <p className="text-sm text-foreground/50">Items you heart will show up here.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {wishlistedProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-card">
                <Link href={`/product/${p.slug}`} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                  <Image src={p.images[0]} alt={p.name} fill sizes="64px" className="object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/product/${p.slug}`} className="line-clamp-2 text-xs font-bold hover:text-pulse-purple">
                    {p.name}
                  </Link>
                  <p className="mt-0.5 text-xs font-bold text-pulse-purple">{formatPrice(p.price)}</p>
                  <div className="mt-1 flex gap-2">
                    <button
                      onClick={() => {
                        addItem(p);
                        toast.success(`${p.name} added to cart`);
                      }}
                      className="text-[11px] font-bold text-pulse-purple hover:underline"
                    >
                      Add to cart
                    </button>
                    <button onClick={() => toggle(p.id)} className="text-[11px] font-bold text-foreground/40 hover:underline">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
