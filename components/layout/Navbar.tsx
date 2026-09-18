"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/category/birthday", label: "Balloons" },
  { href: "/shop?category=balloon-decorations", label: "Party Decorations" },
  { href: "/category/birthday", label: "Birthday" },
  { href: "/shop?theme=pastel", label: "Themes" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { ids } = useWishlist();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/5 bg-background/95 backdrop-blur">
      <nav className="container-px mx-auto flex h-16 items-center justify-between lg:h-20" aria-label="Main navigation">
        <button
          className="-ml-2 rounded-full p-2 hover:bg-foreground/5 lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" aria-hidden />
        </button>

        <Link href="/" aria-label="Party Pulse home" className="lg:mr-8">
          <Logo priority />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-bold text-foreground/70 transition-colors hover:text-pulse-purple",
                  pathname === link.href && "text-pulse-purple"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            className="rounded-full p-2 hover:bg-foreground/5"
            onClick={() => setSearchOpen(true)}
            aria-label="Search products"
          >
            <Search className="h-5 w-5" aria-hidden />
          </button>
          <Link
            href="/cart#wishlist"
            className="relative hidden rounded-full p-2 hover:bg-foreground/5 sm:inline-flex"
            aria-label={`Wishlist, ${ids.length} items`}
          >
            <Heart className="h-5 w-5" aria-hidden />
            {ids.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-pulse-pink text-[10px] font-bold text-white">
                {ids.length}
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={openCart}
            aria-label={`Cart, ${itemCount} items`}
          >
            <ShoppingBag className="h-5 w-5" aria-hidden />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-pulse-purple text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </nav>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </header>
  );
}
