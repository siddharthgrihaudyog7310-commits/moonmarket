import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = rating >= i + 1;
        const half = !filled && rating > i && rating < i + 1;
        return (
          <span key={i} className="relative inline-block">
            <Star className="h-3.5 w-3.5 text-foreground/15" aria-hidden />
            {(filled || half) && (
              <Star
                className="absolute inset-0 h-3.5 w-3.5 fill-pulse-gold text-pulse-gold"
                style={half ? { clipPath: "inset(0 50% 0 0)" } : undefined}
                aria-hidden
              />
            )}
          </span>
        );
      })}
    </div>
  );
}
