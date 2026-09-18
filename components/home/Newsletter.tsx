"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("You're subscribed!", { description: "Look out for party inspiration in your inbox." });
    setEmail("");
  }

  return (
    <section className="bg-party-gradient-soft py-12 lg:py-16">
      <div className="container-px mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-pulse-purple shadow-soft">
          <Mail className="h-5 w-5" />
        </div>
        <h2 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">Get party inspiration &amp; exclusive offers</h2>
        <p className="mt-2 text-sm text-foreground/60">Join 20,000+ subscribers for early access to new drops and sales.</p>
        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            id="newsletter-email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white"
          />
          <Button type="submit" size="lg">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
