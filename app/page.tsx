import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import CategoryTile from "@/components/CategoryTile";
import ProductCard from "@/components/ProductCard";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Newsletter from "@/components/Newsletter";
import SectionDivider from "@/components/SectionDivider";
import { LinkButton } from "@/components/Button";
import { products, categories } from "@/data/products";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />

      <SectionDivider />

      <section className="section py-8">
        <div className="text-center mb-10">
          <h2 className="section-heading">Shop by Category</h2>
          <p className="mt-2 text-ink/70">Explore our range, sourced for purity and freshness.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <CategoryTile key={c.name} {...c} />
          ))}
        </div>
      </section>

      <SectionDivider />

      <section className="section py-8">
        <div className="text-center mb-10">
          <h2 className="section-heading">Featured Products</h2>
          <p className="mt-2 text-ink/70">Customer favourites, hand-picked for you.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <LinkButton href="/shop" variant="outline">
            View All Products
          </LinkButton>
        </div>
      </section>

      <SectionDivider />

      <section className="section py-8">
        <div className="text-center mb-10">
          <h2 className="section-heading">What Our Customers Say</h2>
        </div>
        <TestimonialCarousel />
      </section>

      <Newsletter />
    </>
  );
}
