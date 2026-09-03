import Hero from "@/components/Hero";
import ShopByPurpose from "@/components/ShopByPurpose";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />

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
