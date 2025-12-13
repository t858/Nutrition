import type { ComponentPropsWithoutRef, ElementRef } from "react";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export interface BadgeProps extends ComponentPropsWithoutRef<"div"> {
  variant?: BadgeVariant;
}

export type BadgeRef = ElementRef<"div">;











