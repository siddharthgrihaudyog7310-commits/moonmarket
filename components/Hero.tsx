import Image from "next/image";
import { LinkButton } from "./Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gold-gradient">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" aria-hidden="true" />
      <div className="absolute right-10 top-10 text-6xl text-white/30" aria-hidden="true">☾</div>

      <div className="section relative grid grid-cols-1 lg:grid-cols-2 items-center gap-10 py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col items-start gap-6">
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

        <div className="relative hidden lg:block h-[420px]">
          <div className="absolute right-6 top-2 h-56 w-44 rotate-6 overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
            <Image src="/products/almonds.jpg" alt="Premium Almonds" fill className="object-cover" />
          </div>
          <div className="absolute left-2 top-16 h-56 w-44 -rotate-6 overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
            <Image src="/products/cashews.jpg" alt="Whole Cashews" fill className="object-cover" />
          </div>
          <div className="absolute left-1/2 bottom-0 h-52 w-40 -translate-x-1/2 rotate-2 overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
            <Image src="/products/kuttu-atta.jpg" alt="Kuttu Atta" fill className="object-cover" />
          </div>
          <div className="absolute left-10 bottom-6 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-xl">
            <span className="text-xl" aria-hidden="true">⭐</span>
            <div>
              <p className="text-sm font-bold text-ink leading-none">30 Years</p>
              <p className="text-xs text-ink/60 leading-none mt-1">of Trust</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
