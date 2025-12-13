import type { ComponentPropsWithoutRef } from "react";

export interface TServiceCard {
  id?: string | number;
  title?: string | null;
  description?: string | null;
}

export interface TServicesContent {
  title?: string | null;
  subtitle?: string | null;
  cards?: TServiceCard[];
}

export interface TServicesFallback {
  title: string;
  subtitle: string;
  emptyState?: string;
}

export interface ServicesSectionProps
  extends ComponentPropsWithoutRef<"section"> {
  services: TServicesContent | null;
  fallback: TServicesFallback;
}
