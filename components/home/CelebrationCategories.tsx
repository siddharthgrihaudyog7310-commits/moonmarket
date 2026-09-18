import Link from "next/link";
import Image from "next/image";
import { CategoryInfo } from "@/types";

export function CelebrationCategories({ categories }: { categories: CategoryInfo[] }) {
  return (
    <section className="container-px mx-auto py-12 lg:py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Shop by Celebration</h2>
          <p className="mt-1 text-sm text-foreground/60">Find the perfect decor for every occasion</p>
        </div>
      </div>
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-8">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="group w-32 shrink-0 text-center sm:w-auto"
          >
            <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-2xl bg-muted shadow-card transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-card-hover">
              <Image
                src={cat.image}
                alt=""
                fill
                sizes="(max-width: 640px) 128px, 160px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <p className="mt-2 text-sm font-bold text-foreground group-hover:text-pulse-purple">{cat.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
