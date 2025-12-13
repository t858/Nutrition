import * as React from "react";
import type { BadgeProps, BadgeRef } from "./@types";

const getBadgeClasses = (variant?: string, className?: string) => {
  const baseClasses =
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variantClasses = {
    default:
      "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
    secondary:
      "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive:
      "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
    outline: "text-foreground",
  };

  const variantClass =
    variantClasses[variant as keyof typeof variantClasses] ||
    variantClasses.default;

  return `${baseClasses} ${variantClass}${className ? ` ${className}` : ""}`;
};

const Badge = React.forwardRef<BadgeRef, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div ref={ref} className={getBadgeClasses(variant, className)} {...props} />
  )
);
Badge.displayName = "Badge";

export { Badge };
