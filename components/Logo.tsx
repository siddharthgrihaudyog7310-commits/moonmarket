import { cn } from "@/lib/utils";
import { PartyPopper } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display font-extrabold tracking-tight", className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-party-gradient text-white shadow-soft">
        <PartyPopper className="h-4 w-4" aria-hidden />
      </span>
      <span className="text-lg leading-none">
        PARTY <span className="text-pulse-pink">PULSE</span>
      </span>
    </span>
  );
}
