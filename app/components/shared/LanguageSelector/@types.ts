import type { SupportedLanguage } from "@/@types/app.types";

export type TLanguageSelectorVariant = "dropdown" | "grid";

export interface TLanguageSelectorProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (langCode: string) => void;
  variant?: TLanguageSelectorVariant;
  className?: string;
}

