import type { Metadata } from "next";
import SectionDivider from "@/components/SectionDivider";
import ProductCard from "@/components/ProductCard";
import { LinkButton } from "@/components/Button";
import { siteConfig } from "@/lib/site-config";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name}'s sourcing promise, quality standards, and story.`,
};

const values = [
  {
    title: "Ethically Sourced",
    description:
      "We work directly with trusted growers to bring you dry fruits and spices at the peak of quality — season after season.",
  },
  {
    title: "Rigorously Graded",
    description:
      "Every batch is hand-sorted and quality-checked before it's packed, so only the best reaches your table.",
  },
  {
    title: "Freshness Sealed In",
    description:
      "Packed to lock in natural aroma and crunch, with no artificial preservatives or additives.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gold-gradient-soft">
        <div className="section py-16 sm:py-20 text-center">
          <span className="inline-flex items-center rounded-full bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-700 shadow-sm">
            Our Story
          </span>
          <h1 className="mt-4 font-poppins font-extrabold text-4xl sm:text-5xl text-ink">
            Rooted in Tradition, <br className="hidden sm:block" />
            Crafted for Today
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">
            For over 30 years, {siteConfig.name} has been bringing India&rsquo;s
            finest dry fruits, dry dates, and whole spices from trusted farms
            straight to your home — with the same care our families have
            practiced for generations.
          </p>
        </div>
      </section>

      <section className="section py-16 max-w-2xl mx-auto text-center">
        <h2 className="section-heading">Our Quality &amp; Sourcing Promise</h2>
        <p className="mt-4 text-ink/70 leading-relaxed">
          We believe premium food starts with premium sourcing. That&rsquo;s
          why we partner directly with growers across India&rsquo;s finest
          dry fruit and spice belts, inspecting every harvest for size,
          texture, and aroma before it earns the Moon Spices name.
        </p>
        <p className="mt-4 text-ink/70 leading-relaxed">
          From orchard to pack, our process is designed to preserve
          nature&rsquo;s goodness — no shortcuts, no fillers, just honest,
          wholesome food.
        </p>
      </section>

      <SectionDivider />

      <section className="section py-16">
        <div className="text-center mb-10">
          <h2 className="section-heading">What We Stand For</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-50 text-2xl text-gold-600">
                ☾
              </div>
              <h3 className="font-poppins font-bold text-lg text-ink">{v.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gold-gradient-soft py-16 sm:py-20">
        <div className="section">
          <div className="text-center mb-12">
            <span className="section-eyebrow justify-center">Our Range</span>
            <h2 className="section-heading mt-2">A Taste of What We Offer</h2>
            <p className="mt-3 text-ink/70">Hand-picked and naturally sourced, from our family to yours.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <LinkButton href="/shop" variant="outline">
              View All Products
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="section pb-20 text-center">
        <h2 className="section-heading">Taste the Moon Spices Difference</h2>
        <p className="mx-auto mt-3 max-w-xl text-ink/70">
          Explore our range and discover why customers across India trust us
          for their everyday and festive needs.
        </p>
        <div className="mt-6">
          <LinkButton href="/shop">Shop Now</LinkButton>
        </div>
      </section>
    </div>
  );
}
