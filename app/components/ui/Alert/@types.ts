import type { ComponentPropsWithoutRef, ElementRef } from "react";

export type AlertVariant = "default" | "destructive";

export interface AlertProps extends ComponentPropsWithoutRef<"div"> {
  variant?: AlertVariant;
}

export type AlertRef = ElementRef<"div">;

export interface AlertTitleProps extends ComponentPropsWithoutRef<"h5"> {}
export type AlertTitleRef = ElementRef<"h5">;

export interface AlertDescriptionProps
  extends ComponentPropsWithoutRef<"div"> {}
export type AlertDescriptionRef = ElementRef<"div">;











