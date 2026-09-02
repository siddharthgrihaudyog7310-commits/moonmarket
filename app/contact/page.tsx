import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.name} for orders, bulk enquiries, and support.`,
};

export default function ContactPage() {
  return (
    <div className="section py-12">
      <div className="text-center mb-10">
        <h1 className="section-heading">Get in Touch</h1>
        <p className="mt-2 text-ink/70">
          Questions about a product, bulk orders, or gifting? We&rsquo;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ContactForm />

        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="font-poppins font-bold text-lg text-ink">Business Details</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-semibold text-ink/60">Address</dt>
                <dd className="text-ink">{siteConfig.address}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink/60">Phone</dt>
                <dd>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="text-gold-600 hover:underline">
                    {siteConfig.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-ink/60">Email</dt>
                <dd>
                  <a href={`mailto:${siteConfig.email}`} className="text-gold-600 hover:underline">
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-ink/60">Hours</dt>
                <dd className="text-ink">Mon – Sat, 9:00 AM – 7:00 PM IST</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink/60">WhatsApp</dt>
                <dd>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-600 hover:underline"
                  >
                    {siteConfig.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-ink/60">Instagram</dt>
                <dd>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-600 hover:underline"
                  >
                    @moon_spices_groceries
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div
            className="card flex h-64 w-full items-center justify-center bg-gold-50 text-center text-sm text-ink/50"
            role="img"
            aria-label="Map showing store location — placeholder"
          >
            Map placeholder — embed Google Maps here with your store location
          </div>
        </div>
      </div>
    </div>
  );
}
