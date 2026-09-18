"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartItem, Product } from "@/types";
import { discountPercent } from "@/lib/utils";

const STORAGE_KEY = "party-pulse:cart";

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, options?: { colorId?: string; colorLabel?: string; quantity?: number }) => void;
  removeItem: (productId: string, colorId?: string) => void;
  increment: (productId: string, colorId?: string) => void;
  decrement: (productId: string, colorId?: string) => void;
  clearCart: () => void;
  subtotal: number;
  mrpTotal: number;
  discount: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function lineKey(productId: string, colorId?: string) {
  return `${productId}::${colorId ?? "default"}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  }, [items, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback<CartContextValue["addItem"]>((product, options) => {
    const colorId = options?.colorId;
    const colorLabel = options?.colorLabel;
    const quantity = options?.quantity ?? 1;
    setItems((prev) => {
      const key = lineKey(product.id, colorId);
      const existing = prev.find((i) => lineKey(i.productId, i.colorId) === key);
      if (existing) {
        return prev.map((i) =>
          lineKey(i.productId, i.colorId) === key ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      const newItem: CartItem = {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0],
        price: product.price,
        mrp: product.mrp,
        colorId,
        colorLabel,
        quantity,
      };
      return [...prev, newItem];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, colorId?: string) => {
    const key = lineKey(productId, colorId);
    setItems((prev) => prev.filter((i) => lineKey(i.productId, i.colorId) !== key));
  }, []);

  const increment = useCallback((productId: string, colorId?: string) => {
    const key = lineKey(productId, colorId);
    setItems((prev) =>
      prev.map((i) => (lineKey(i.productId, i.colorId) === key ? { ...i, quantity: i.quantity + 1 } : i))
    );
  }, []);

  const decrement = useCallback((productId: string, colorId?: string) => {
    const key = lineKey(productId, colorId);
    setItems((prev) =>
      prev
        .map((i) => (lineKey(i.productId, i.colorId) === key ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const { subtotal, mrpTotal, itemCount } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc.subtotal += item.price * item.quantity;
        acc.mrpTotal += item.mrp * item.quantity;
        acc.itemCount += item.quantity;
        return acc;
      },
      { subtotal: 0, mrpTotal: 0, itemCount: 0 }
    );
  }, [items]);

  const discount = mrpTotal - subtotal;
  const total = subtotal;

  const value: CartContextValue = {
    items,
    isOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    increment,
    decrement,
    clearCart,
    subtotal,
    mrpTotal,
    discount,
    total,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export { discountPercent };
