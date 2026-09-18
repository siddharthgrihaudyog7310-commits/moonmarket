import { Hero } from "@/components/home/Hero";
import { CelebrationCategories } from "@/components/home/CelebrationCategories";
import { TrendingProducts } from "@/components/home/TrendingProducts";
import { PromoBanner } from "@/components/home/PromoBanner";
import { ShopByTheme } from "@/components/home/ShopByTheme";
import { PartyBundles } from "@/components/home/PartyBundles";
import { WhyPartyPulse } from "@/components/home/WhyPartyPulse";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { Newsletter } from "@/components/home/Newsletter";
import { celebrationCategories, themes } from "@/data/categories";
import { bundles } from "@/data/bundles";
import { products } from "@/data/products";

export default function HomePage() {
  const trending = products.filter((p) => p.isBestseller || p.isNew).slice(0, 8);

  return (
    <main>
      <Hero />
      <CelebrationCategories categories={celebrationCategories} />
      <TrendingProducts products={trending} />
      <PromoBanner />
      <ShopByTheme themes={themes} />
      <PartyBundles bundles={bundles} />
      <WhyPartyPulse />
      <InstagramGallery />
      <Newsletter />
    </main>
  );
}
