import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";

interface CategoryTileProps {
  name: Product["category"];
  image: string;
  description: string;
  accent: string;
}

export default function CategoryTile({ name, image, description, accent }: CategoryTileProps) {
  return (
    <Link
      href={`/shop?category=${encodeURIComponent(name)}`}
      className="card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="h-1" style={{ backgroundColor: accent }} aria-hidden="true" />
      <div className="relative h-44 w-full overflow-hidden" style={{ backgroundColor: `${accent}1A` }}>
        <Image
          src={image}
          alt=""
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="font-poppins font-bold text-lg text-ink">{name}</h3>
        <p className="mt-1 text-sm text-ink/70">{description}</p>
        <span
          className="mt-3 inline-block text-sm font-semibold group-hover:underline"
          style={{ color: accent }}
        >
          Explore &rarr;
        </span>
      </div>
    </Link>
  );
}
