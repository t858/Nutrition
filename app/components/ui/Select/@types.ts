import type { ComponentPropsWithoutRef, ElementRef } from "react";

export type SelectTriggerProps = ComponentPropsWithoutRef<"button">;
export type SelectTriggerRef = ElementRef<"button">;

export type SelectContentProps = ComponentPropsWithoutRef<"div"> & {
  position?: "popper" | "item-aligned";
};

export type SelectContentRef = ElementRef<"div">;

export type SelectLabelProps = ComponentPropsWithoutRef<"div">;
export type SelectLabelRef = ElementRef<"div">;

export type SelectItemProps = ComponentPropsWithoutRef<"div"> & {
  value: string;
};

export type SelectItemRef = ElementRef<"div">;

export type SelectSeparatorProps = ComponentPropsWithoutRef<"div">;
export type SelectSeparatorRef = ElementRef<"div">;

export type SelectScrollButtonProps = ComponentPropsWithoutRef<"div">;
export type SelectScrollButtonRef = ElementRef<"div">;
