import Link from "next/link";
import Image from "next/image";
import { ThemeInfo } from "@/types";
import { cn } from "@/lib/utils";

export function ShopByTheme({ themes }: { themes: ThemeInfo[] }) {
  return (
    <section className="container-px mx-auto py-12 lg:py-16">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Shop by Theme</h2>
        <p className="mt-1 text-sm text-foreground/60">Curated colour palettes for every vibe</p>
      </div>
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-5 sm:overflow-visible sm:px-0">
        {themes.map((theme) => (
          <Link
            key={theme.slug}
            href={`/shop?theme=${theme.slug}`}
            className="group relative w-40 shrink-0 overflow-hidden rounded-2xl shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:w-auto"
          >
            <div className={cn("relative aspect-[4/5] bg-gradient-to-br", theme.gradient)}>
              <Image
                src={theme.image}
                alt=""
                fill
                sizes="(max-width: 640px) 160px, 25vw"
                className="object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-3">
              <p className="font-display text-sm font-bold text-white">{theme.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
