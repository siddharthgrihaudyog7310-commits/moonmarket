"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter((p) => p.name.toLowerCase().includes(q) || p.category.includes(q) || p.tagline?.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="mx-auto mt-20 w-full max-w-xl px-4">
        <div className="rounded-3xl bg-white p-4 shadow-xl">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Search className="ml-2 h-5 w-5 text-foreground/40" aria-hidden />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search balloons, kits, themes..."
              aria-label="Search products"
              className="border-none focus-visible:ring-0"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="rounded-full p-2 hover:bg-foreground/5"
            >
              <X className="h-5 w-5" />
            </button>
          </form>
          {results.length > 0 && (
            <ul className="mt-3 divide-y divide-foreground/10 border-t border-foreground/10">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/product/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 py-3 hover:bg-foreground/[0.03] rounded-xl px-2"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <Image src={p.images[0]} alt="" fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{p.name}</p>
                      <p className="text-xs text-foreground/50">{formatPrice(p.price)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {query.trim() && results.length === 0 && (
            <p className="mt-3 border-t border-foreground/10 pt-3 text-sm text-foreground/50">
              No products found for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
