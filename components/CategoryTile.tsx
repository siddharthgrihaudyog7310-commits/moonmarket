import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";

interface CategoryTileProps {
  name: Product["category"];
  image: string;
  description: string;
}

export default function CategoryTile({ name, image, description }: CategoryTileProps) {
  return (
    <Link
      href={`/shop?category=${encodeURIComponent(name)}`}
      className="card group flex flex-col overflow-hidden transition-transform hover:-translate-y-1"
    >
      <div className="relative h-44 w-full bg-gold-50 overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="font-poppins font-bold text-lg text-ink">{name}</h3>
        <p className="mt-1 text-sm text-ink/70">{description}</p>
        <span className="mt-3 inline-block text-sm font-semibold text-gold-600 group-hover:underline">
          Explore &rarr;
        </span>
      </div>
    </Link>
  );
}
