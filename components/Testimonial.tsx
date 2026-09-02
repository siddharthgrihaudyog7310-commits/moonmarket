import { Testimonial as TestimonialType } from "@/types";

export default function Testimonial({ name, location, quote, rating }: TestimonialType) {
  return (
    <figure className="card flex h-full flex-col justify-between p-6">
      <div>
        <div className="flex gap-1 text-gold-500" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < rating ? "★" : "☆"}</span>
          ))}
        </div>
        <blockquote className="mt-3 text-sm leading-relaxed text-ink/80">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>
      <figcaption className="mt-4 text-sm font-semibold text-ink">
        {name} <span className="font-normal text-ink/50">— {location}</span>
      </figcaption>
    </figure>
  );
}
