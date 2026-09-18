"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/types";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export function CartLineItem({ item, compact = false }: { item: CartItem; compact?: boolean }) {
  const { increment, decrement, removeItem } = useCart();

  return (
    <div className="flex gap-3 py-4">
      <Link href={`/product/${item.slug}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-24 sm:w-24">
        <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link href={`/product/${item.slug}`} className="line-clamp-2 text-sm font-bold hover:text-pulse-purple sm:text-base">
            {item.name}
          </Link>
          {item.colorLabel && <p className="mt-0.5 text-xs text-foreground/50">Color: {item.colorLabel}</p>}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-full border border-foreground/15">
            <button
              onClick={() => decrement(item.productId, item.colorId)}
              aria-label="Decrease quantity"
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-foreground/5"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-bold" aria-live="polite">
              {item.quantity}
            </span>
            <button
              onClick={() => increment(item.productId, item.colorId)}
              aria-label="Increase quantity"
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-foreground/5"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          {!compact && (
            <div className="text-right">
              <p className="text-sm font-extrabold">{formatPrice(item.price * item.quantity)}</p>
              {item.mrp > item.price && (
                <p className="text-xs text-foreground/40 line-through">{formatPrice(item.mrp * item.quantity)}</p>
              )}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => removeItem(item.productId, item.colorId)}
        aria-label={`Remove ${item.name} from cart`}
        className="self-start rounded-full p-1.5 text-foreground/40 hover:bg-foreground/5 hover:text-pulse-pink"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
