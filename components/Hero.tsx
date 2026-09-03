import { LinkButton } from "./Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gold-gradient">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" aria-hidden="true" />
      <div className="absolute right-10 top-10 text-6xl text-white/30" aria-hidden="true">☾</div>

      <div className="section relative py-20 sm:py-28 flex flex-col items-start gap-6 max-w-3xl">
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
    </section>
  );
}
