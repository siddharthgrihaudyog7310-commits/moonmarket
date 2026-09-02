import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label={`${siteConfig.name} — Home`}
    >
      <Image
        src="/logo-circle.png"
        alt=""
        width={512}
        height={512}
        priority
        className="h-9 w-9 sm:h-11 sm:w-11"
      />
      <span className="font-poppins font-extrabold text-lg sm:text-xl leading-tight text-ink">
        Moon <span className="text-gold-500">Spices</span>
        <span className="block text-[0.65rem] font-medium tracking-[0.2em] text-gold-600 uppercase">
          &amp; Groceries
        </span>
      </span>
    </Link>
  );
}
