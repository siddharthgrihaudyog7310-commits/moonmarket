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
