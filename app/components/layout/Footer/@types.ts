import type { ComponentPropsWithoutRef } from "react";
import type { SupportedLanguage } from "@/@types/app.types";

export interface FooterProps extends ComponentPropsWithoutRef<"footer"> {
  language: SupportedLanguage;
}


