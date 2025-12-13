"use client";
import { Globe } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/Dropdown";
import { languages } from "@/app/constants/data";
import type { TLanguageSelectorProps } from "./@types";

export default function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  variant = "dropdown",
  className = "",
}: TLanguageSelectorProps) {
  if (variant === "grid") {
    return (
      <div className={className}>
        <div className="text-xs text-gray-600 mb-2 font-semibold">
          Language / Lingua
        </div>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`px-3 py-2 rounded-lg border text-sm ${
                currentLanguage === lang.code
                  ? "bg-[#8CC63F] text-white border-emerald-600"
                  : "bg-white border-emerald-200 text-gray-700"
              }`}
            >
              {lang.flag} {lang.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Default dropdown variant
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Globe className="w-4 h-4 mr-2" />
          {languages.find((l) => l.code === currentLanguage)?.flag}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={currentLanguage === lang.code ? "bg-emerald-50" : ""}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
