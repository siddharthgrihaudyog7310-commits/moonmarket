import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "./Button";
import { categories } from "@/data/products";

const promoTiles = [
  {
    label: "Dry Fruits",
    from: "From ₹350",
    image: "/products/almonds.jpg",
    href: "/shop?category=Dry%20Fruits",
    bg: "from-[#8F4A15]/15 to-[#8F4A15]/5",
  },
  {
    label: "Spices",
    from: "From ₹80",
    image: "/products/haldi.jpg",
    href: "/shop?category=Spices",
    bg: "from-[#8B2C3B]/15 to-[#8B2C3B]/5",
  },
  {
    label: "Seeds",
    from: "From ₹60",
    image: "/products/til-kala.jpg",
    href: "/shop?category=Seeds",
    bg: "from-[#7A6C3F]/20 to-[#7A6C3F]/5",
  },
];

const trustLine = [
  { icon: "🌿", label: "100% Natural" },
  { icon: "✅", label: "Hygienically Packed" },
  { icon: "🚚", label: "Pan-India Delivery" },
];

export default function Hero() {
  return (
    <section className="bg-cream py-6 sm:py-10">
      <div className="section">
        <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center">
          <Link href="/shop" className="group flex shrink-0 flex-col items-center gap-2">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-white shadow-sm transition-transform group-hover:-translate-y-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" fill="currentColor" />
              </svg>
            </span>
            <span className="text-xs font-semibold text-ink">All</span>
          </Link>
          {categories.map((c) => (
            <Link
              key={c.name}
              href={`/shop?category=${encodeURIComponent(c.name)}`}
              className="group flex shrink-0 flex-col items-center gap-2"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:-translate-y-1"
                style={{ backgroundColor: c.accent }}
              >
                <Image src={c.image} alt="" width={28} height={28} />
              </span>
              <span className="max-w-[4.5rem] text-center text-xs font-semibold text-ink">{c.name}</span>
            </Link>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl bg-gold-gradient-soft p-6 sm:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="font-poppins text-lg font-semibold text-ink/80">
                Premium quality, naturally yours.
              </p>
              <h1 className="mt-1 font-poppins text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                Wholesome Snacking, <br />
                <span className="text-gold-700">Starts Here.</span>
              </h1>
              <div className="mt-6 flex flex-wrap gap-4">
                <LinkButton href="/shop" variant="primary">
                  Shop Now
                </LinkButton>
                <LinkButton href="/contact" variant="outline">
                  Enquire Now
                </LinkButton>
              </div>
            </div>

            <div className="relative mx-auto h-48 w-full max-w-xs sm:h-56 lg:mx-0 lg:h-64 lg:max-w-none">
              <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-2xl sm:h-52 sm:w-52" aria-hidden="true" />
              <div className="absolute left-1/2 top-1/2 h-32 w-28 -translate-x-[110%] -translate-y-1/2 rotate-[-10deg] drop-shadow-xl sm:h-40 sm:w-32 lg:h-48 lg:w-40">
                <Image src="/products/cashews.jpg" alt="Moon Cashews pack" fill sizes="180px" className="rounded-2xl object-cover" />
              </div>
              <div className="absolute left-1/2 top-1/2 h-36 w-32 -translate-x-1/2 -translate-y-[58%] rotate-[3deg] drop-shadow-xl sm:h-44 sm:w-40 lg:h-56 lg:w-48">
                <Image src="/products/almonds.jpg" alt="Moon Almonds pack" fill sizes="200px" priority className="rounded-2xl object-cover" />
              </div>
              <div className="absolute left-1/2 top-1/2 h-32 w-28 translate-x-[10%] -translate-y-1/2 rotate-[10deg] drop-shadow-xl sm:h-40 sm:w-32 lg:h-48 lg:w-40">
                <Image src="/products/dry-dates.jpg" alt="Moon Dry Dates pack" fill sizes="180px" className="rounded-2xl object-cover" />
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
            {promoTiles.map((t) => (
              <Link
                key={t.label}
                href={t.href}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${t.bg} bg-white p-3 shadow-sm transition-transform hover:-translate-y-1 sm:p-4`}
              >
                <div>
                  <p className="font-poppins text-xs font-bold text-ink sm:text-sm">{t.label}</p>
                  <p className="text-[10px] font-semibold text-gold-700 sm:text-xs">{t.from}</p>
                </div>
                <div className="relative mt-2 h-14 w-full sm:h-20">
                  <Image src={t.image} alt="" fill sizes="150px" className="object-contain drop-shadow-md" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-ink/10 pt-6">
            {trustLine.map((t) => (
              <span key={t.label} className="flex items-center gap-2 text-sm font-semibold text-ink/80">
                <span aria-hidden="true">{t.icon}</span>
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
