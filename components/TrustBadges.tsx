import { siteConfig } from "@/lib/site-config";

const badges = [
  { icon: "🌿", label: "100% Natural" },
  { icon: "⭐", label: "Premium Quality" },
  { icon: "🚚", label: "Pan-India Delivery" },
  { icon: "☾", label: `Since ${siteConfig.foundedYear}` },
];

export default function TrustBadges() {
  return (
    <section className="section py-10">
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {badges.map((b) => (
          <li
            key={b.label}
            className="card flex flex-col items-center gap-2 px-4 py-6 text-center"
          >
            <span className="text-3xl" aria-hidden="true">{b.icon}</span>
            <span className="text-sm font-semibold text-ink">{b.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
