import { LinkButton } from "./Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest-600">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(rgba(193,143,88,0.9) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden="true"
      />
      <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gold-500/20 blur-3xl" aria-hidden="true" />
      <div className="absolute right-8 top-10 text-6xl text-gold-300/20" aria-hidden="true">☾</div>

      <div className="section relative py-24 sm:py-36 flex flex-col items-center text-center gap-7">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-gold-300">
          Premium Indian Dry Fruits &amp; Spices
        </span>

        <h1 className="font-fraunces italic font-medium text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-cream max-w-3xl">
          Nature&rsquo;s Finest,
          <br />
          Delivered with Love
        </h1>

        <div className="h-px w-16 bg-gold-400/40" aria-hidden="true" />

        <p className="text-lg text-cream/70 max-w-xl">
          Hand-picked almonds, cashews, dry dates and whole spices — sourced
          for purity and packed to preserve every bit of natural goodness.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <LinkButton href="/shop" variant="primary">
            Shop Now
          </LinkButton>
          <LinkButton
            href="/contact"
            variant="outline"
            className="border-cream/30 bg-transparent text-cream hover:bg-cream/10"
          >
            Enquire on WhatsApp
          </LinkButton>
        </div>

        <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-cream/40">
          Est. 1996 &middot; Lucknow, India
        </p>
      </div>
    </section>
  );
}
