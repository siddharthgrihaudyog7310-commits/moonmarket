"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "@/components/Logo";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-6 py-4" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="rounded-xl px-3 py-3 text-base font-bold text-foreground/80 hover:bg-pulse-purple-50 hover:text-pulse-purple"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={onClose}
            className="rounded-xl px-3 py-3 text-base font-bold text-foreground/80 hover:bg-pulse-purple-50 hover:text-pulse-purple"
          >
            Contact
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
