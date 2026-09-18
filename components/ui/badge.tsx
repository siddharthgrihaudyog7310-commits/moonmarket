import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-pulse-purple text-white",
        secondary: "bg-pulse-pink text-white",
        accent: "bg-pulse-gold text-foreground",
        outline: "border border-foreground/20 text-foreground",
        success: "bg-emerald-500 text-white",
        muted: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
