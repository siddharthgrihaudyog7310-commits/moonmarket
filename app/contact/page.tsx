import { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us | Party Pulse",
  description: "Get in touch with Party Pulse for orders, bulk enquiries, support or partnerships.",
};

export default function ContactPage() {
  return (
    <main className="container-px mx-auto py-12 lg:py-16">
      <div className="text-center">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Get In Touch</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-foreground/60 sm:text-base">
          Have a question about an order, bulk pricing, or a custom party kit? We&apos;d love to help.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl bg-white p-5 shadow-card">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pulse-purple-50 text-pulse-purple">
                <Phone className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs text-foreground/50">Call us</p>
                <a href={`tel:${siteConfig.phone}`} className="text-sm font-bold hover:text-pulse-purple">
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-card">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pulse-pink-50 text-pulse-pink">
                <Mail className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs text-foreground/50">Email us</p>
                <a href={`mailto:${siteConfig.email}`} className="text-sm font-bold hover:text-pulse-purple">
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-card">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pulse-gold-50 text-pulse-gold-700">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs text-foreground/50">Visit us</p>
                <p className="text-sm font-bold">{siteConfig.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-card lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
