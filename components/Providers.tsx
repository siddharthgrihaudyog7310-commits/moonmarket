"use client";

import { Toaster } from "sonner";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
        <CartDrawer />
        <Toaster position="bottom-center" richColors closeButton />
      </WishlistProvider>
    </CartProvider>
  );
}
