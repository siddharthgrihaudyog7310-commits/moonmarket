import { Heart, Package, ShieldCheck, Truck } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    description: "Thick, tear-resistant latex & foil sourced from trusted manufacturers.",
  },
  {
    icon: Package,
    title: "Party Ready",
    description: "Pre-curated kits that take the guesswork out of decorating.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Dispatched within 24 hours, right to your doorstep across India.",
  },
  {
    icon: Heart,
    title: "Made With Love",
    description: "Every kit is quality-checked by our team before it ships.",
  },
];

export function WhyPartyPulse() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-px mx-auto">
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Why Party Pulse</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-party-gradient-soft text-pulse-purple">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-3 font-display text-sm font-bold sm:text-base">{title}</h3>
              <p className="mt-1 text-xs text-foreground/55 sm:text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
