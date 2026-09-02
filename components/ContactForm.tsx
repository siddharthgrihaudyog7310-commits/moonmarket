"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend yet — wire this up to an email/form service (e.g. Resend,
    // Formspree) or an API route before launch. See README.md.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card p-8 text-center">
        <p className="text-3xl" aria-hidden="true">☾</p>
        <h2 className="mt-2 font-poppins font-bold text-xl text-ink">Thank you!</h2>
        <p className="mt-2 text-sm text-ink/70">
          We&rsquo;ve received your message and will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-ink">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-lg border border-gold-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-gold-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-ink">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-1 w-full rounded-lg border border-gold-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 w-full rounded-lg border border-gold-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-gold-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600"
      >
        Send Message
      </button>
    </form>
  );
}
