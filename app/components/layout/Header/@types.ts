import type { ComponentPropsWithoutRef } from "react";

export interface HeaderProps extends ComponentPropsWithoutRef<"header"> {
  user: {
    id: string;
    name: string;
    role: string;
  } | null;
  language: string;
  pathname: string;
  isMenuOpen: boolean;
  onLanguageChange: (langCode: string) => void;
  onMenuToggle: () => void;
  onSignInClick: () => void;
  onLogout?: () => void;
}
