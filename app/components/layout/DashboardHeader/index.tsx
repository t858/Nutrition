"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { useAuth } from "@/lib/hooks/use-auth";
import { LanguageContext } from "@/app/context/LanguageContext";
import { Button } from "@/app/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/app/components/ui/Dropdown";
import { LogOut, User } from "lucide-react";
import type { SupportedLanguage } from "@/@types/app.types";
import LanguageSelector from "@/app/components/shared/LanguageSelector";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export default function DashboardHeader({
  title,
  subtitle,
}: DashboardHeaderProps) {
  const { user, role } = useAuth();
  const router = useRouter();
  const language = useContext(LanguageContext) || "it";
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(
    language as SupportedLanguage
  );

  useEffect(() => {
    setCurrentLanguage(language as SupportedLanguage);
  }, [language]);

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode as SupportedLanguage);
    localStorage.setItem("nutriwell_language", langCode);
    // Trigger a page refresh to update language context
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleProfile = () => {
    // TODO: Navigate to profile page when implemented
    console.log("Navigate to profile");
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-4">
            {/* Language Dropdown */}
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
              variant="dropdown"
              className="border-gray-200"
            />

            {/* User Info and Avatar Dropdown */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || user?.email}
                </p>
                <p className="text-xs text-gray-500 capitalize">{role}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="w-10 h-10 bg-[#8CC63F] rounded-full flex items-center justify-center text-white font-semibold hover:bg-emerald-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    aria-label="User menu"
                  >
                    {user?.name?.charAt(0).toUpperCase() ||
                      user?.email?.charAt(0).toUpperCase() ||
                      "U"}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end">
                  <DropdownMenuItem onClick={handleProfile}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 focus:text-red-700 focus:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
