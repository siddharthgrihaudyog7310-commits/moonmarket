"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { LinkButton } from "./Button";
import { categories, products } from "@/data/products";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const megaMenu: Record<string, string[]> = categories.reduce(
  (acc, c) => {
    acc[c.name] = products.filter((p) => p.category === c.name).map((p) => p.name);
    return acc;
  },
  {} as Record<string, string[]>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 border-b border-forest-600/10 bg-cream/90 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-cream/80"
      onMouseLeave={() => setMegaOpen(false)}
    >
      <nav className="section flex h-20 items-center justify-between" aria-label="Main">
        <Logo />

        <ul className="hidden md:flex items-center gap-10">
          <li
            className="relative flex h-20 items-center"
            onMouseEnter={() => setMegaOpen(true)}
          >
            <Link
              href="/shop"
              className={`relative flex items-center gap-1 text-[13px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-gold-600 ${
                pathname === "/shop" ? "text-gold-600" : "text-forest-600"
              }`}
              aria-current={pathname === "/shop" ? "page" : undefined}
            >
              Shop
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="opacity-50" aria-hidden="true">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </li>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-[13px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-gold-600 ${
                    isActive ? "text-gold-600" : "text-forest-600"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <LinkButton href="/contact" variant="primary">
            Enquire Now
          </LinkButton>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-forest-600 hover:bg-forest-600/5"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {megaOpen && (
        <div className="hidden md:block absolute top-20 left-0 w-full border-b border-forest-600/10 bg-cream p-10 shadow-[0_20px_50px_rgba(16,29,21,0.1)]">
          <div className="section grid grid-cols-6 gap-10">
            {categories.map((cat) => (
              <div key={cat.name}>
                <Link
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  onClick={() => setMegaOpen(false)}
                  className="mb-4 block border-b border-forest-600/5 pb-2 text-[10px] font-black uppercase tracking-[0.3em] text-gold-600 hover:text-forest-600 transition-colors"
                >
                  {cat.name}
                </Link>
                <ul className="space-y-3">
                  {(megaMenu[cat.name] ?? []).map((item) => (
                    <li key={item}>
                      <Link
                        href={`/shop?category=${encodeURIComponent(cat.name)}`}
                        onClick={() => setMegaOpen(false)}
                        className="block text-[11px] font-semibold uppercase tracking-widest text-forest-600/60 hover:text-forest-600 transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-forest-600/10 bg-cream">
          <ul className="section flex flex-col gap-1 py-4">
            <li>
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 font-semibold text-forest-600 hover:bg-forest-600/5 hover:text-gold-600"
              >
                Shop
              </Link>
            </li>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 font-semibold text-forest-600 hover:bg-forest-600/5 hover:text-gold-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <LinkButton href="/contact" variant="primary" className="w-full" onClick={() => setOpen(false)}>
                Enquire Now
              </LinkButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
