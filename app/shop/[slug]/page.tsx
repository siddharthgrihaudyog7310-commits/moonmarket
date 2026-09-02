import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import PackSelector from "@/components/PackSelector";
import ProductCard from "@/components/ProductCard";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);

  return (
    <div className="section py-12">
      <nav className="mb-6 text-sm text-ink/60" aria-label="Breadcrumb">
        <Link href="/shop" className="hover:text-gold-600">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl2 bg-gold-50 shadow-card">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            className="object-contain p-6"
          />
        </div>

        <div>
          <span className="inline-block rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold-700">
            {product.category}
          </span>
          <h1 className="mt-3 font-poppins font-extrabold text-3xl sm:text-4xl text-ink">
            {product.name}
          </h1>
          <p className="mt-3 text-ink/70">{product.shortDescription}</p>

          <div className="mt-6">
            <PackSelector productName={product.name} packs={product.packs} />
          </div>

          <div className="mt-10 border-t border-gold-100 pt-6">
            <h2 className="font-poppins font-bold text-lg text-ink">Description</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{product.description}</p>
          </div>

          <div className="mt-8 border-t border-gold-100 pt-6">
            <h2 className="font-poppins font-bold text-lg text-ink">Nutritional Highlights</h2>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.nutritionalHighlights.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-ink/80">
                  <span className="mt-0.5 text-gold-500" aria-hidden="true">☾</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="section-heading text-center">You May Also Like</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
