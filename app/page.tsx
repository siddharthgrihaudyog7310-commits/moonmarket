import Hero from "@/components/Hero";
import CategoryTile from "@/components/CategoryTile";
import ShopByPurpose from "@/components/ShopByPurpose";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import { categories } from "@/data/products";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="bg-gold-gradient-soft py-16 sm:py-20">
        <div className="section">
          <div className="text-center mb-12">
            <span className="section-eyebrow justify-center">Explore</span>
            <h2 className="section-heading mt-2">Shop by Category</h2>
            <p className="mt-3 text-ink/70">Explore our range, sourced for purity and freshness.</p>
          </div>
          <div className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-2 sm:justify-center [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((c) => (
              <CategoryTile key={c.name} {...c} />
            ))}
          </div>
        </div>
      </section>

      <ShopByPurpose />

      <FAQ />

      <Newsletter />
    </>
  );
}
