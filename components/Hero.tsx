import { LinkButton } from "./Button";

const badges = [
  { icon: "🌿", label: "100% Natural", position: "left-0 top-2 sm:top-0" },
  { icon: "⭐", label: "Premium Quality", position: "right-0 top-2 sm:top-0" },
  { icon: "🚚", label: "Pan-India Delivery", position: "left-0 bottom-2 sm:bottom-0" },
  { icon: "🤲", label: "Hand-Picked", position: "right-0 bottom-2 sm:bottom-0" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gold-gradient">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" aria-hidden="true" />
      <div className="absolute right-10 top-10 text-6xl text-white/30" aria-hidden="true">☾</div>

      <div className="section relative py-16 sm:py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-6">
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

        <div className="relative mx-auto flex h-80 w-80 items-center justify-center sm:h-96 sm:w-96 lg:mx-0 lg:h-[420px] lg:w-[420px]">
          <div
            className="absolute inset-0 rounded-full border-2 border-dashed border-white/50 animate-[spin_30s_linear_infinite]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-6 rounded-full border border-white/30"
            aria-hidden="true"
          />

          <div className="relative flex h-44 w-44 flex-col items-center justify-center gap-1 rounded-full bg-cream shadow-premium sm:h-52 sm:w-52">
            <span className="text-4xl text-gold-600" aria-hidden="true">☾</span>
            <span className="font-poppins text-xs font-semibold uppercase tracking-widest text-ink/60">
              Est. 1996
            </span>
            <span className="font-poppins text-lg font-extrabold text-ink text-center leading-tight">
              30 Years <br /> of Trust
            </span>
          </div>

          {badges.map((b) => (
            <div
              key={b.label}
              className={`absolute ${b.position} flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-soft`}
            >
              <span className="text-lg" aria-hidden="true">{b.icon}</span>
              <span className="font-poppins text-xs font-bold text-ink whitespace-nowrap">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
