"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, CreditCard, Lock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, subtotal, discount, total } = useCart();

  return (
    <main className="container-px mx-auto py-8 lg:py-12">
      <h1 className="font-display text-2xl font-extrabold sm:text-3xl">Checkout</h1>
      <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-pulse-gold-50 px-3 py-1.5 text-xs font-semibold text-pulse-gold-700">
        <Lock className="h-3.5 w-3.5" /> This is a demo checkout — no payment will be processed.
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-3xl bg-white py-16 text-center shadow-card">
          <p className="font-display text-lg font-bold">Your cart is empty</p>
          <Button asChild size="lg" className="mt-4">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-3xl bg-white p-6 shadow-card">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <Truck className="h-5 w-5 text-pulse-purple" /> Shipping Details
              </h2>
              <form className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" required placeholder="Jane Doe" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" required placeholder="+91 98765 43210" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" required placeholder="560034" className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required placeholder="House no, street, area" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required placeholder="Bengaluru" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" required placeholder="Karnataka" className="mt-1.5" />
                </div>
              </form>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-card">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <CreditCard className="h-5 w-5 text-pulse-purple" /> Payment Method
              </h2>
              <div className="mt-4 space-y-3">
                {["UPI", "Credit / Debit Card", "Cash on Delivery"].map((method, i) => (
                  <label
                    key={method}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-foreground/15 p-3.5 has-[:checked]:border-pulse-purple has-[:checked]:bg-pulse-purple-50"
                  >
                    <input type="radio" name="payment" defaultChecked={i === 0} className="h-4 w-4 accent-pulse-purple" />
                    <span className="text-sm font-semibold">{method}</span>
                  </label>
                ))}
              </div>
              <p className="mt-4 text-xs text-foreground/45">
                Payments are placeholders in this preview. Connect Shopify or a payment gateway to go live.
              </p>
            </section>
          </div>

          <div className="h-fit rounded-3xl bg-white p-6 shadow-card">
            <h2 className="font-display text-lg font-bold">Order Summary</h2>
            <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={`${item.productId}-${item.colorId ?? "default"}`} className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold">{item.name}</p>
                    <p className="text-xs text-foreground/50">Qty {item.quantity}</p>
                  </div>
                  <p className="text-xs font-bold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-2 text-sm">
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
              <div className="flex justify-between text-foreground/60">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-extrabold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Button
              size="lg"
              className="mt-6 w-full gap-2"
              onClick={(e) => {
                e.preventDefault();
                alert("This is a preview checkout. Connect Shopify or a payment gateway to place real orders.");
              }}
            >
              <CheckCircle2 className="h-4 w-4" /> Place Order
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
