import Image from "next/image";
import { Instagram } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const galleryImages = Array.from({ length: 6 }).map((_, i) => `/products/p${i + 25 <= 30 ? i + 25 : i + 1}.svg`);

export function InstagramGallery() {
  return (
    <section className="container-px mx-auto py-12 lg:py-16">
      <div className="mb-8 text-center">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">#PartyPulseMoments</h2>
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-pulse-purple hover:underline"
        >
          <Instagram className="h-4 w-4" /> Follow @partypulse
        </a>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
        {galleryImages.map((src, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden rounded-xl bg-muted">
            <Image
              src={src}
              alt="Party Pulse customer celebration"
              fill
              sizes="(max-width: 640px) 33vw, 16vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/20">
              <Instagram className="h-5 w-5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
