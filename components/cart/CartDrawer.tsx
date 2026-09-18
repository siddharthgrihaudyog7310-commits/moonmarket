"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, discount, total, itemCount } = useCart();
  const remaining = Math.max(0, siteConfig.freeShippingThreshold - subtotal);

  return (
    <Sheet open={isOpen} onOpenChange={(v) => !v && closeCart()}>
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-md">
        <SheetHeader className="border-b border-foreground/10 px-6 pb-4 pt-6">
          <SheetTitle>Your Cart ({itemCount})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-foreground/20" />
            <p className="font-display font-bold">Your cart is feeling empty</p>
            <p className="text-sm text-foreground/50">Add some party essentials to get started!</p>
            <Button onClick={closeCart} asChild className="mt-2">
              <Link href="/shop">Shop Now</Link>
            </Button>
          </div>
        ) : (
          <>
            {remaining > 0 && (
              <div className="mx-6 mt-4 rounded-xl bg-pulse-gold-50 px-3 py-2 text-xs font-semibold text-pulse-gold-700">
                Add {formatPrice(remaining)} more for FREE shipping!
              </div>
            )}
            <div className="flex-1 divide-y divide-foreground/10 overflow-y-auto px-6">
              {items.map((item) => (
                <CartLineItem key={`${item.productId}-${item.colorId ?? "default"}`} item={item} compact />
              ))}
            </div>
            <div className="border-t border-foreground/10 px-6 py-5">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-foreground/60">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal + discount)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-pulse-pink-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between text-base font-extrabold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <Button asChild size="lg" onClick={closeCart}>
                  <Link href="/checkout">Checkout</Link>
                </Button>
                <Button variant="outline" size="lg" asChild onClick={closeCart}>
                  <Link href="/cart">View Cart</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
