import { LinkButton } from "./Button";

const stats = [
  { icon: "☾", label: "30+ Years of Trust" },
  { icon: "🌿", label: "100% Natural" },
  { icon: "🚚", label: "Pan-India Delivery" },
  { icon: "💬", label: "Order via WhatsApp" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(212,168,83,0.5) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-200/50 blur-3xl" aria-hidden="true" />
      <div className="absolute right-8 bottom-8 text-7xl text-gold-500/10" aria-hidden="true">☾</div>

      <div className="section relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-gold-300 bg-gold-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-700 shadow-sm">
            Premium Indian Dry Fruits &amp; Spices
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-ink">
            Nature&rsquo;s{" "}
            <span className="bg-gold-gradient bg-clip-text text-transparent">Finest</span>,{" "}
            <br className="hidden sm:block" />
            Delivered with Love
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink/70">
            Hand-picked almonds, cashews, dry dates and whole spices — sourced
            for purity and packed to preserve every bit of natural goodness.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <LinkButton href="/shop" variant="primary">
              Shop Now
            </LinkButton>
            <LinkButton href="/about" variant="outline">
              Our Story
            </LinkButton>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-y-6 border-t border-gold-100 pt-8 sm:grid-cols-4 sm:divide-x sm:divide-gold-100">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2 text-center sm:px-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-xl text-gold-600">
                {s.icon}
              </span>
              <span className="font-poppins text-sm font-semibold text-ink/80">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
