"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { LinkButton } from "./Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gold-100 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      <nav className="section flex h-20 items-center justify-between" aria-label="Main">
        <Logo />

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-semibold text-sm tracking-wide transition-colors hover:text-gold-600 ${
                    isActive ? "text-gold-600" : "text-ink"
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
          className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-ink hover:bg-gold-50"
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

      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-gold-100 bg-cream">
          <ul className="section flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 font-semibold text-ink hover:bg-gold-50 hover:text-gold-600"
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
