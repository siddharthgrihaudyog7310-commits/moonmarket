"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-radial">
      <div className="container-px mx-auto grid gap-10 py-12 lg:grid-cols-2 lg:items-center lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center lg:text-left"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-pulse-purple shadow-soft">
            🎈 India&apos;s favourite party studio
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            MAKE EVERY MOMENT <span className="text-pulse-pink">A PARTY.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base text-foreground/60 sm:text-lg lg:mx-0">
            Premium balloons, decorations &amp; party essentials designed for unforgettable
            celebrations.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button size="lg" asChild>
              <Link href="/shop?category=balloons">
                Shop Balloons <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/shop?category=balloon-decorations">Explore Party Decor</Link>
            </Button>
          </div>
          <dl className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-4 lg:mx-0">
            {[
              ["500+", "Party Products"],
              ["50k+", "Happy Customers"],
              ["4.8★", "Average Rating"],
            ].map(([stat, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-xl font-extrabold text-pulse-purple sm:text-2xl">{stat}</dd>
                <p className="text-xs text-foreground/50">{label}</p>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none"
        >
          <div className="absolute inset-6 rounded-full bg-party-gradient opacity-20 blur-3xl" aria-hidden />
          <div className="relative h-full w-full animate-float rounded-blob bg-white/60 shadow-pop backdrop-blur">
            <Image
              src="/products/p2.svg"
              alt="Colourful balloon decoration arch from Party Pulse"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="rounded-blob object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 animate-float-slow rounded-2xl bg-white p-3 shadow-card sm:-left-8">
            <p className="text-xs font-bold text-foreground/70">🎉 4.8/5 from 12,000+ reviews</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
