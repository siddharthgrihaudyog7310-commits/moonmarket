import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";

interface CategoryTileProps {
  name: Product["category"];
  image: string;
  description: string;
  accent: string;
}

export default function CategoryTile({ name, image, accent }: CategoryTileProps) {
  return (
    <Link
      href={`/shop?category=${encodeURIComponent(name)}`}
      className="group relative flex h-40 w-36 shrink-0 flex-col justify-end overflow-hidden rounded-2xl shadow-soft transition-transform hover:-translate-y-1 snap-start sm:h-44 sm:w-40"
      style={{ backgroundColor: accent }}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4 pb-10">
        <div className="relative h-full w-full">
          <Image
            src={image}
            alt=""
            fill
            className="object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>
      <div className="relative bg-black/35 px-3 py-2.5 text-center backdrop-blur-[2px]">
        <span className="font-poppins font-bold text-sm text-white">{name}</span>
      </div>
    </Link>
  );
}
