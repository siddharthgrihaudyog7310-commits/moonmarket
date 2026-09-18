import { Metadata } from "next";
import Image from "next/image";
import { Heart, Package, ShieldCheck, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Party Pulse",
  description: "Learn the story behind Party Pulse — India's premium balloon and party decoration brand.",
};

const values = [
  { icon: ShieldCheck, title: "Premium Materials", text: "We test every batch of balloons for thickness, colour-fastness and float time." },
  { icon: Package, title: "Thoughtful Curation", text: "Every kit is designed by our in-house stylists so it looks great straight out of the box." },
  { icon: Truck, title: "Nationwide Delivery", text: "We ship to 20,000+ pincodes across India, usually within 2-4 business days." },
  { icon: Heart, title: "Customer Obsessed", text: "Our support team is real people who genuinely want your party to be perfect." },
];

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-hero-radial py-16">
        <div className="container-px mx-auto grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
              We believe every celebration deserves a little magic.
            </h1>
            <p className="mt-4 text-base text-foreground/65">
              Party Pulse started in 2021 with a simple idea: party decorations in India should be as premium,
              well-designed and reliable as the celebrations they&apos;re part of. What began as a small balloon
              studio in Bengaluru has grown into a nationwide brand trusted by 50,000+ hosts, event planners and
              parents.
            </p>
            <p className="mt-4 text-base text-foreground/65">
              Today we design and curate everything from single balloons to complete themed party kits — each one
              tested, styled and packed with care by our small but mighty team.
            </p>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-blob shadow-pop">
            <Image src="/products/p7.svg" alt="Party Pulse studio setup" fill sizes="400px" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="container-px mx-auto py-14">
        <h2 className="text-center font-display text-2xl font-extrabold sm:text-3xl">What We Stand For</h2>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-party-gradient-soft text-pulse-purple">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-3 font-display text-sm font-bold sm:text-base">{title}</h3>
              <p className="mt-1 text-xs text-foreground/55 sm:text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-px mx-auto grid gap-8 text-center sm:grid-cols-3">
          {[
            ["50,000+", "Celebrations styled"],
            ["500+", "Products & kits"],
            ["4.8/5", "Average customer rating"],
          ].map(([stat, label]) => (
            <div key={label}>
              <p className="font-display text-3xl font-extrabold text-pulse-purple">{stat}</p>
              <p className="mt-1 text-sm text-foreground/60">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
