import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, Youtube } from "lucide-react";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/lib/site-config";

const footerColumns = [
  {
    heading: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Balloons", href: "/shop?category=balloons" },
      { label: "Balloon Decorations", href: "/shop?category=balloon-decorations" },
      { label: "Party Kits", href: "/shop?category=party-kits" },
      { label: "Themed Party", href: "/shop?category=themed-party" },
    ],
  },
  {
    heading: "Customer Care",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping Info", href: "/contact" },
      { label: "Returns & Refunds", href: "/contact" },
      { label: "Track Order", href: "/contact" },
      { label: "FAQs", href: "/contact" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/about" },
      { label: "Careers", href: "/contact" },
      { label: "Bulk & Corporate Orders", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-white">
      <div className="container-px mx-auto grid grid-cols-2 gap-10 py-14 lg:grid-cols-5">
        <div className="col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-foreground/60">{siteConfig.description}</p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Party Pulse on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground/70 transition-colors hover:bg-pulse-purple hover:text-white"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Party Pulse on Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground/70 transition-colors hover:bg-pulse-purple hover:text-white"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Party Pulse on YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground/70 transition-colors hover:bg-pulse-purple hover:text-white"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-5 space-y-1.5 text-sm text-foreground/60">
            <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 hover:text-pulse-purple">
              <Phone className="h-4 w-4" /> {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-pulse-purple">
              <Mail className="h-4 w-4" /> {siteConfig.email}
            </a>
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.heading}>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-foreground">{col.heading}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-foreground/60 hover:text-pulse-purple">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-foreground/10">
        <div className="container-px mx-auto flex flex-col items-center justify-between gap-3 py-6 text-xs text-foreground/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Party Pulse. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/contact" className="hover:text-pulse-purple">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-pulse-purple">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
