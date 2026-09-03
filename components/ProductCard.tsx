import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatPrice, pricePerHundredGrams } from "@/lib/utils";
import EnquireButton from "./EnquireButton";

const BESTSELLER_SLUGS = new Set(["almonds", "cashews", "moon-dry-dates"]);

export default function ProductCard({ product }: { product: Product }) {
  const startingPack = product.packs[0];
  const unitPrice = pricePerHundredGrams(startingPack.weight, startingPack.price);
  const isBestseller = BESTSELLER_SLUGS.has(product.slug);

  return (
    <div className="card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/5] w-full bg-gold-50 overflow-hidden">
        <Image
          src={product.image}
          alt={`${product.name} — ${startingPack.weight} pack`}
          fill
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gold-700 shadow-sm">
          {product.category}
        </span>
        {isBestseller && (
          <span className="absolute top-3 right-3 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            Bestseller
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-poppins font-bold text-lg text-ink hover:text-gold-600">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-1 text-gold-500" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-xs">★</span>
          ))}
          <span className="ml-1 text-xs font-medium text-ink/50">(4.8)</span>
        </div>
        <p className="mt-1 text-sm text-ink/70 flex-1">{product.shortDescription}</p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-ink/50">{startingPack.weight} pack</p>
            <p className="font-poppins font-bold text-xl text-gold-600">
              {startingPack.price != null ? formatPrice(startingPack.price) : "Price on Enquiry"}
            </p>
            {unitPrice && <p className="text-xs text-ink/40">{unitPrice}</p>}
          </div>
        </div>

        <EnquireButton productName={product.name} className="mt-4 w-full" />
      </div>
    </div>
  );
}
