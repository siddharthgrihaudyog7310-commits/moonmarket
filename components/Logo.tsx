import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/logo.webp"
        alt="Party Pulse"
        width={2000}
        height={676}
        priority={priority}
        className="h-8 w-auto sm:h-9"
      />
    </span>
  );
}
