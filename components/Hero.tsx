import { LinkButton } from "./Button";

const stats = [
  { icon: "☾", label: "30+ Years of Trust" },
  { icon: "🌿", label: "100% Natural" },
  { icon: "🚚", label: "Pan-India Delivery" },
  { icon: "💬", label: "Order via WhatsApp" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(rgba(212,168,83,0.6) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/30 blur-3xl" aria-hidden="true" />
      <div className="absolute right-8 bottom-8 text-7xl text-gold-500/10" aria-hidden="true">☾</div>

      <div className="section relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
            Premium Indian Dry Fruits &amp; Spices
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-cream">
            Nature&rsquo;s{" "}
            <span className="bg-gold-gradient bg-clip-text text-transparent">Finest</span>,{" "}
            <br className="hidden sm:block" />
            Delivered with Love
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-cream/70">
            Hand-picked almonds, cashews, dry dates and whole spices — sourced
            for purity and packed to preserve every bit of natural goodness.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <LinkButton href="/shop" variant="primary">
              Shop Now
            </LinkButton>
            <LinkButton href="/about" variant="outline" className="border-cream/30 bg-transparent text-cream hover:bg-cream/10">
              Our Story
            </LinkButton>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-y-6 border-t border-cream/10 pt-8 sm:grid-cols-4 sm:divide-x sm:divide-cream/10">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2 text-center sm:px-4">
              <span className="text-2xl">{s.icon}</span>
              <span className="font-poppins text-sm font-semibold text-cream/90">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
