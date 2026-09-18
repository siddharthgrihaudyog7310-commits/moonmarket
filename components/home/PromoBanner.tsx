import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    <section className="container-px mx-auto py-8">
      <div className="relative overflow-hidden rounded-3xl bg-party-gradient px-6 py-14 text-center text-white sm:py-20">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 2px, transparent 2px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />
        <div className="relative">
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">PARTY STARTS HERE</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/85 sm:text-base">
            Discover our full range of balloons, decor kits &amp; celebration essentials.
          </p>
          <Button size="lg" variant="accent" asChild className="mt-7">
            <Link href="/shop">
              Shop the Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
