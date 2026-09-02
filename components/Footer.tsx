import Link from "next/link";
import Logo from "./Logo";
import { siteConfig } from "@/lib/site-config";
import { categories } from "@/data/products";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-gold-100 bg-gold-gradient-soft">
      <div className="section py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-ink/70 leading-relaxed max-w-xs">
            {siteConfig.description}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-gold-600">
            Since 30 Years
          </p>
        </div>

        <div>
          <h3 className="font-poppins font-bold text-sm uppercase tracking-widest text-ink mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-gold-600">Home</Link></li>
            <li><Link href="/shop" className="hover:text-gold-600">Shop</Link></li>
            <li><Link href="/about" className="hover:text-gold-600">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-gold-600">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-poppins font-bold text-sm uppercase tracking-widest text-ink mb-4">
            Categories
          </h3>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.name}>
                <Link
                  href={`/shop?category=${encodeURIComponent(c.name)}`}
                  className="hover:text-gold-600"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-poppins font-bold text-sm uppercase tracking-widest text-ink mb-4">
            Get in Touch
          </h3>
          <ul className="space-y-2 text-sm text-ink/80">
            <li>{siteConfig.address}</li>
            <li>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-gold-600">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-gold-600">
                {siteConfig.email}
              </a>
            </li>
          </ul>

          <div className="mt-4 flex items-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-300 text-gold-700 transition-colors hover:bg-gold-500 hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.44-1.35a9.87 9.87 0 0 0 4.6 1.15h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.06h-.01a8.15 8.15 0 0 1-4.15-1.13l-.3-.18-3.09.81.82-3.02-.19-.31a8.14 8.14 0 0 1-1.25-4.32c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.77 2.4a8.1 8.1 0 0 1 2.39 5.77c0 4.5-3.66 8.14-8.16 8.14Zm4.47-6.11c-.24-.12-1.45-.71-1.68-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.78.97-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.04 0 1.2.88 2.36 1 2.52.12.16 1.74 2.66 4.21 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"/>
              </svg>
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-300 text-gold-700 transition-colors hover:bg-gold-500 hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gold-200/60">
        <div className="section py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ink/60">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Naturally sourced <span aria-hidden="true">☾</span> Always fresh
          </p>
        </div>
      </div>
    </footer>
  );
}
