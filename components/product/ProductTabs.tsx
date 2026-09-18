"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RatingStars } from "@/components/product/RatingStars";
import { Product } from "@/types";

export function ProductTabs({ product }: { product: Product }) {
  return (
    <Tabs defaultValue="description" className="mt-14">
      <TabsList className="w-full overflow-x-auto no-scrollbar sm:w-auto">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="included">What&apos;s Included</TabsTrigger>
        <TabsTrigger value="specs">Specifications</TabsTrigger>
        <TabsTrigger value="how-to-use">How To Use</TabsTrigger>
        <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
      </TabsList>

      <TabsContent value="description">
        <p className="max-w-3xl text-sm leading-relaxed text-foreground/70 sm:text-base">{product.description}</p>
      </TabsContent>

      <TabsContent value="included">
        <ul className="max-w-xl space-y-2">
          {product.whatsIncluded.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground/70">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pulse-purple" />
              {item}
            </li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="specs">
        <dl className="max-w-xl divide-y divide-foreground/10">
          {product.specifications.map((spec) => (
            <div key={spec.label} className="flex justify-between py-2.5 text-sm">
              <dt className="font-semibold text-foreground/70">{spec.label}</dt>
              <dd className="text-foreground/60">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </TabsContent>

      <TabsContent value="how-to-use">
        <ol className="max-w-xl space-y-3">
          {product.howToUse.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-foreground/70">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pulse-purple-50 text-xs font-bold text-pulse-purple">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </TabsContent>

      <TabsContent value="reviews">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-4 rounded-2xl bg-muted p-5">
            <span className="font-display text-4xl font-extrabold">{product.rating}</span>
            <div>
              <RatingStars rating={product.rating} />
              <p className="mt-1 text-xs text-foreground/55">Based on {product.reviewCount} reviews</p>
            </div>
          </div>
          {product.reviews.map((review) => (
            <div key={review.id} className="border-b border-foreground/10 pb-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">{review.author}</p>
                {review.verified && (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    Verified Purchase
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <RatingStars rating={review.rating} />
                <span className="text-xs text-foreground/45">{review.date}</span>
              </div>
              <p className="mt-2 text-sm font-semibold">{review.title}</p>
              <p className="mt-1 text-sm text-foreground/65">{review.body}</p>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
