import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import CategoryTile from "@/components/CategoryTile";
import ProductCard from "@/components/ProductCard";
import ShopByPurpose from "@/components/ShopByPurpose";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import { LinkButton } from "@/components/Button";
import { products, categories } from "@/data/products";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />

      <section className="bg-gold-gradient-soft py-16 sm:py-20">
        <div className="section">
          <div className="text-center mb-12">
            <span className="section-eyebrow justify-center">Explore</span>
            <h2 className="section-heading mt-2">Shop by Category</h2>
            <p className="mt-3 text-ink/70">Explore our range, sourced for purity and freshness.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((c) => (
              <CategoryTile key={c.name} {...c} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="section">
          <div className="text-center mb-12">
            <span className="section-eyebrow justify-center">Customer Favourites</span>
            <h2 className="section-heading mt-2">Featured Products</h2>
            <p className="mt-3 text-ink/70">Hand-picked for you, always fresh and naturally sourced.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
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

      <ShopByPurpose />

      <section className="bg-gold-gradient-soft py-16 sm:py-20">
        <div className="section">
          <div className="text-center mb-12">
            <span className="section-eyebrow justify-center">Testimonials</span>
            <h2 className="section-heading mt-2">What Our Customers Say</h2>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      <FAQ />

      <Newsletter />
    </>
  );
}
