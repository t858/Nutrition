import type { ComponentPropsWithoutRef, ElementRef } from "react";

export type TabsListProps = ComponentPropsWithoutRef<"div">;
export type TabsListRef = ElementRef<"div">;

export type TabsTriggerProps = ComponentPropsWithoutRef<"button"> & {
  value: string;
};

export type TabsTriggerRef = ElementRef<"button">;

export type TabsContentProps = ComponentPropsWithoutRef<"div"> & {
  value: string;
};

export type TabsContentRef = ElementRef<"div">;
