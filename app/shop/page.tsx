import { Suspense } from "react";
import { Metadata } from "next";
import { ShopClient } from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Shop All Party Supplies | Party Pulse",
  description:
    "Browse balloons, balloon decoration kits, birthday accessories & complete party kits. Filter by category, theme, price & more.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container-px mx-auto py-20 text-center text-foreground/50">Loading products…</div>}>
      <ShopClient />
    </Suspense>
  );
}
