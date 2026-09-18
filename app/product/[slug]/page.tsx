import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { siteConfig } from "@/lib/site-config";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} | Party Pulse`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Party Pulse`,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const fbtProducts = (product.frequentlyBoughtWith ?? [])
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => `${siteConfig.url}${img}`),
    description: product.description,
    sku: product.id,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <main className="container-px mx-auto py-8 lg:py-12">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-foreground/50">
        <Link href="/" className="hover:text-pulse-purple">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/shop" className="hover:text-pulse-purple">
          Shop
        </Link>{" "}
        / <span className="text-foreground/70">{product.name}</span>
      </nav>

      <article className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={product.name} />
        <ProductPurchasePanel product={product} />
      </article>

      <ProductTabs product={product} />

      {fbtProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-extrabold sm:text-2xl">Frequently Bought Together</h2>
          <div className="mt-6">
            <ProductGrid products={fbtProducts} columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-extrabold sm:text-2xl">You May Also Like</h2>
          <div className="mt-6">
            <ProductGrid products={related} columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" />
          </div>
        </section>
      )}
    </main>
  );
}
