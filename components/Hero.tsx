import { LinkButton } from "./Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gold-gradient">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #fff 0px, #fff 1px, transparent 1px, transparent 26px)",
        }}
        aria-hidden="true"
      />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-black/5 blur-3xl" aria-hidden="true" />
      <div className="absolute right-10 top-10 text-6xl text-white/30" aria-hidden="true">☾</div>

      <div className="section relative py-20 sm:py-28 flex flex-col items-start gap-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-800 shadow-sm">
          <span className="text-gold-500">☾</span>
          Premium Indian Dry Fruits &amp; Spices
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-ink">
          Nature&rsquo;s{" "}
          <span className="italic font-serif font-normal text-ink/90">Finest</span>,{" "}
          <br className="hidden sm:block" />
          Delivered with Love
        </h1>

        <div className="h-px w-16 bg-ink/20" aria-hidden="true" />

        <p className="text-lg text-ink/80 max-w-xl">
          Hand-picked almonds, cashews, dry dates and whole spices — sourced
          for purity and packed to preserve every bit of natural goodness.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <LinkButton href="/shop" variant="primary">
            Shop Now
          </LinkButton>
          <LinkButton href="/about" variant="outline" className="border-ink/20 bg-white/60">
            Our Story
          </LinkButton>
        </div>

        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
          Est. 1996 &middot; Lucknow, India
        </p>
      </div>
    </section>
  );
}
