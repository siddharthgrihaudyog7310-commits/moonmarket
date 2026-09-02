"use client";

import { useRef } from "react";
import { testimonials } from "@/data/testimonials";
import Testimonial from "./Testimonial";

export default function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: 1 | -1) {
    trackRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-label="Customer testimonials"
      >
        {testimonials.map((t) => (
          <div key={t.name} className="min-w-[280px] max-w-[320px] snap-start">
            <Testimonial {...t} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          className="rounded-full border border-gold-300 p-2 text-gold-600 hover:bg-gold-50"
          aria-label="Previous testimonials"
        >
          &larr;
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          className="rounded-full border border-gold-300 p-2 text-gold-600 hover:bg-gold-50"
          aria-label="Next testimonials"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
