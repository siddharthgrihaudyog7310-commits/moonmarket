import { siteConfig } from "@/lib/site-config";

interface EnquireButtonProps {
  productName: string;
  className?: string;
}

/**
 * Moon Spices is a brand/marketing site, not an online checkout —
 * this opens a pre-filled WhatsApp chat so visitors can enquire/order directly.
 */
export default function EnquireButton({ productName, className = "" }: EnquireButtonProps) {
  const message = encodeURIComponent(
    `Hi Moon Spices & Groceries! I'd like to enquire about ${productName}.`
  );
  const href = `https://wa.me/${siteConfig.whatsapp}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-6 py-3 text-sm font-semibold text-white shadow-soft border border-gold-500 transition-all duration-200 hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 ${className}`}
    >
      <span aria-hidden="true">💬</span> Enquire Now
    </a>
  );
}
