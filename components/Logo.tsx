import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center ${className}`}
      aria-label={`${siteConfig.name} — Home`}
    >
      <Image
        src="/logo-mark.png"
        alt={siteConfig.name}
        width={700}
        height={312}
        priority
        className="h-10 sm:h-12 w-auto"
      />
    </Link>
  );
}
