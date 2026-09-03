import Image from "next/image";
import { LinkButton } from "./Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gold-gradient">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" aria-hidden="true" />
      <div className="absolute right-10 top-10 text-6xl text-white/30" aria-hidden="true">☾</div>

      <div className="section relative py-16 sm:py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-6">
        <div className="flex flex-col items-start gap-6 max-w-xl">
          <span className="inline-flex items-center rounded-full bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-700 shadow-sm">
            Premium Indian Dry Fruits &amp; Spices
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-ink">
            Nature&rsquo;s Finest, <br className="hidden sm:block" />
            Delivered with Love
          </h1>
          <p className="text-lg text-ink/80 max-w-xl">
            Hand-picked almonds, cashews, dry dates and whole spices — sourced
            for purity and packed to preserve every bit of natural goodness.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <LinkButton href="/shop" variant="primary">
              Shop Now
            </LinkButton>
            <LinkButton href="/about" variant="outline" className="bg-white/60">
              Our Story
            </LinkButton>
          </div>
        </div>

        <div className="relative mx-auto h-72 w-full max-w-sm sm:h-96 lg:mx-0 lg:h-[440px] lg:max-w-none">
          <div
            className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 blur-2xl sm:h-80 sm:w-80 lg:h-96 lg:w-96"
            aria-hidden="true"
          />

          <div className="absolute left-1/2 top-1/2 h-44 w-36 -translate-x-[115%] -translate-y-1/2 rotate-[-10deg] drop-shadow-2xl transition-transform duration-500 hover:-translate-y-[55%] sm:h-56 sm:w-44 lg:h-64 lg:w-52">
            <Image src="/products/cashews.jpg" alt="Moon Cashews pack" fill sizes="220px" className="rounded-2xl object-cover" />
          </div>

          <div className="absolute left-1/2 top-1/2 h-52 w-44 -translate-x-1/2 -translate-y-[58%] rotate-[3deg] drop-shadow-2xl transition-transform duration-500 hover:-translate-y-[68%] sm:h-64 sm:w-52 lg:h-72 lg:w-60">
            <Image src="/products/almonds.jpg" alt="Moon Almonds pack" fill sizes="260px" priority className="rounded-2xl object-cover" />
          </div>

          <div className="absolute left-1/2 top-1/2 h-44 w-36 translate-x-[15%] -translate-y-1/2 rotate-[10deg] drop-shadow-2xl transition-transform duration-500 hover:-translate-y-[55%] sm:h-56 sm:w-44 lg:h-64 lg:w-52">
            <Image src="/products/dry-dates.jpg" alt="Moon Dry Dates pack" fill sizes="220px" className="rounded-2xl object-cover" />
          </div>

          <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-premium sm:bottom-2">
            <span className="text-lg">☾</span>
            <span className="font-poppins text-xs font-bold text-ink whitespace-nowrap">
              30 Years of Trust
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
