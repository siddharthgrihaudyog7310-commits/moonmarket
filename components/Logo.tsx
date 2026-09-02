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
        src="/logo-full.png"
        alt={siteConfig.name}
        width={900}
        height={491}
        priority
        className="h-12 sm:h-16 w-auto"
      />
    </Link>
  );
}
