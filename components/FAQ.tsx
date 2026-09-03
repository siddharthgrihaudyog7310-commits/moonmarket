"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      `Simply tap "Enquire Now" on any product, or message us directly on WhatsApp at ${siteConfig.phone}. Let us know the products and quantities you'd like, and we'll confirm availability, pricing, and delivery.`,
  },
  {
    question: "Do you deliver across India?",
    answer:
      "Yes, we deliver pan-India. Delivery timelines and charges depend on your location — just ask us on WhatsApp for details for your city.",
  },
  {
    question: "Are your products 100% natural?",
    answer:
      "Yes. All our dry fruits, dates, and spices are naturally sourced with no added preservatives or artificial additives, hand-sorted for quality before packing.",
  },
  {
    question: "Can I order in bulk for weddings, festivals, or corporate gifting?",
    answer:
      "Absolutely — we regularly supply bulk orders for weddings, festivals, and corporate gifting. Message us on WhatsApp with your requirement and we'll share the best rates.",
  },
  {
    question: "What payment options are available?",
    answer:
      "We currently confirm orders and payment details directly over WhatsApp or phone call — our team will guide you through the easiest option for your order.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20">
      <div className="section max-w-3xl">
        <div className="text-center mb-12">
          <span className="section-eyebrow justify-center">FAQs</span>
          <h2 className="section-heading mt-2">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question} className="card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-poppins font-semibold text-ink">{faq.question}</span>
                  <span
                    className={`shrink-0 text-gold-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-ink/70 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
