"use client";

import { FormEvent, useState } from "react";

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend yet — this is a UI placeholder.
    // Wire this up to your email provider (Mailchimp, Klaviyo, etc.) before launch.
    setSubmitted(true);
  }

  return (
    <section className="section py-16">
      <div className="card mx-auto max-w-3xl bg-gold-gradient !border-none px-6 py-10 text-center sm:px-12">
        <h2 className="font-poppins font-extrabold text-2xl sm:text-3xl text-ink">
          Stay in the Loop
        </h2>
        <p className="mt-2 text-ink/80">
          Get updates on new arrivals, seasonal offers, and gifting collections.
        </p>

        {submitted ? (
          <p className="mt-6 font-semibold text-ink">
            Thanks for subscribing! 🌙
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full sm:w-80 rounded-full border border-gold-300 bg-white px-5 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-gold-600"
            />
            <button
              type="submit"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink/90"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
