const badges = [
  { icon: "🌿", label: "100% Natural" },
  { icon: "⭐", label: "Premium Quality" },
  { icon: "🚚", label: "Pan-India Delivery" },
  { icon: "☾", label: "Since 30 Years" },
];

export default function TrustBadges() {
  return (
    <section className="section py-10">
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {badges.map((b) => (
          <li
            key={b.label}
            className="card flex flex-col items-center gap-3 px-4 py-7 text-center transition-transform hover:-translate-y-1"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient-soft text-2xl shadow-sm" aria-hidden="true">
              {b.icon}
            </span>
            <span className="text-sm font-semibold text-ink">{b.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
