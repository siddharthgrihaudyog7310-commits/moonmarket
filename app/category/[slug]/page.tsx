import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ProductGrid } from "@/components/product/ProductGrid";
import { celebrationCategories } from "@/data/categories";
import { products } from "@/data/products";
import { OccasionSlug } from "@/types";

interface Props {
  params: { slug: string };
}

function getCategory(slug: string) {
  return celebrationCategories.find((c) => c.slug === slug);
}

export function generateStaticParams() {
  return celebrationCategories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategory(params.slug);
  if (!category) return {};
  return {
    title: `${category.name} Party Supplies | Party Pulse`,
    description: `Shop ${category.name.toLowerCase()} decorations, balloons & kits at Party Pulse. ${category.description}.`,
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const categoryProducts = products.filter((p) => p.occasions.includes(category.slug as OccasionSlug));

  return (
    <main>
      <section className="relative overflow-hidden bg-hero-radial">
        <div className="container-px mx-auto flex flex-col items-center gap-4 py-14 text-center">
          <div className="relative h-28 w-28 overflow-hidden rounded-full shadow-soft sm:h-36 sm:w-36">
            <Image src={category.image} alt="" fill sizes="144px" className="object-cover" />
          </div>
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{category.name} Party Supplies</h1>
          <p className="max-w-lg text-sm text-foreground/60 sm:text-base">{category.description}</p>
        </div>
      </section>

      <div className="container-px mx-auto border-b border-foreground/10 py-3 text-xs text-foreground/50">
        <Link href="/" className="hover:text-pulse-purple">
          Home
        </Link>{" "}
        / <span className="text-foreground/70">{category.name}</span>
      </div>

      <div className="container-px mx-auto py-10">
        <p className="mb-6 text-sm text-foreground/55">{categoryProducts.length} products</p>
        <ProductGrid products={categoryProducts} />
      </div>
    </main>
  );
}
