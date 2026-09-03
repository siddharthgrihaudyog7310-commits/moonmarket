import Link from "next/link";

const purposes = [
  {
    label: "Gifting",
    icon: "🎁",
    description: "Beautifully packed for festivals & occasions",
    href: "/contact",
    gradient: "from-[#8B2C3B] to-[#B5495C]",
  },
  {
    label: "Everyday Snacking",
    icon: "🥜",
    description: "Wholesome bites for the whole family",
    href: "/shop?category=Dry%20Fruits",
    gradient: "from-gold-500 to-gold-700",
  },
  {
    label: "Bulk & Wholesale",
    icon: "📦",
    description: "Enquire for bulk orders & best rates",
    href: "/contact",
    gradient: "from-[#4A6741] to-[#6B8A5F]",
  },
];

export default function ShopByPurpose() {
  return (
    <section className="py-16 sm:py-20">
      <div className="section">
        <div className="text-center mb-12">
          <span className="section-eyebrow justify-center">Shop by Purpose</span>
          <h2 className="section-heading mt-2">Whatever the Occasion</h2>
          <p className="mt-3 text-ink/70">
            We&rsquo;ve made it easy to find exactly what you need.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {purposes.map((p) => (
            <Link
              key={p.label}
              href={p.href}
              className={`group flex flex-col items-center gap-3 rounded-xl2 bg-gradient-to-br ${p.gradient} px-6 py-8 text-center shadow-soft transition-transform hover:-translate-y-1`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-3xl backdrop-blur-sm">
                {p.icon}
              </span>
              <h3 className="font-poppins font-bold text-lg text-white">{p.label}</h3>
              <p className="text-sm text-white/80">{p.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
