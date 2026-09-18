import { siteConfig } from "@/lib/site-config";

export function AnnouncementBar() {
  return (
    <div className="bg-foreground text-background">
      <div className="container-px mx-auto flex h-9 items-center justify-center text-center text-[11px] font-bold uppercase tracking-wider sm:text-xs">
        <span>
          Free shipping on orders above {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(siteConfig.freeShippingThreshold)}
        </span>
      </div>
    </div>
  );
}
