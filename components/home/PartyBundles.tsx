import Link from "next/link";
import Image from "next/image";
import { BundleInfo } from "@/types";
import { discountPercent, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function PartyBundles({ bundles }: { bundles: BundleInfo[] }) {
  return (
    <section className="container-px mx-auto py-12 lg:py-16">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Party Bundles</h2>
        <p className="mt-1 text-sm text-foreground/60">Everything you need, bundled &amp; ready to go</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {bundles.map((bundle) => {
          const discount = discountPercent(bundle.price, bundle.mrp);
          return (
            <Link
              key={bundle.id}
              href={`/shop?category=party-kits`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={bundle.image}
                  alt={bundle.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {discount > 0 && (
                  <Badge variant="secondary" className="absolute left-2 top-2">
                    {discount}% OFF
                  </Badge>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-bold leading-snug">{bundle.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-foreground/55">{bundle.description}</p>
                <p className="mt-1 text-xs font-semibold text-pulse-purple">{bundle.itemCount} pieces</p>
                <div className="mt-auto flex items-baseline gap-2 pt-3">
                  <span className="text-base font-extrabold">{formatPrice(bundle.price)}</span>
                  <span className="text-xs text-foreground/40 line-through">{formatPrice(bundle.mrp)}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
