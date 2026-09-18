"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Message sent!", { description: "We'll get back to you within 24 hours." });
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <p className="font-display text-lg font-bold">Thanks for reaching out!</p>
        <p className="mt-1 text-sm text-foreground/55">Our team will get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <Label htmlFor="contact-name">Name</Label>
        <Input id="contact-name" required placeholder="Your name" className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="contact-email">Email</Label>
        <Input id="contact-email" type="email" required placeholder="you@example.com" className="mt-1.5" />
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="contact-subject">Subject</Label>
        <Input id="contact-subject" required placeholder="How can we help?" className="mt-1.5" />
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="contact-message">Message</Label>
        <textarea
          id="contact-message"
          required
          rows={5}
          placeholder="Tell us more..."
          className="mt-1.5 w-full rounded-2xl border border-foreground/15 bg-white px-4 py-3 text-sm placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Send Message
        </Button>
      </div>
    </form>
  );
}
