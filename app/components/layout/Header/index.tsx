"use client";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import Image from "next/image";
import type { SupportedLanguage } from "@/@types/app.types";
import { THeader } from "@/@types/header.types";
import {
  Book,
  Home,
  Info,
  Mail,
  User,
  Menu,
  X,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "@/translations/Translations";
import type { HeaderProps } from "./@types";
import LanguageSelector from "@/app/components/shared/LanguageSelector";
import { useSingleType } from "@/lib/strapi";

export default function Header({
  language,
  pathname,
  isMenuOpen,
  onLanguageChange,
  onMenuToggle,
  onSignInClick,
}: HeaderProps) {
  const t =
    translations[language as keyof typeof translations]?.nav ||
    translations.en.nav;

  const publicNavItems = [
    { name: t.home, path: "/", icon: Home },
    { name: t.about, path: "/about", icon: Info },
    { name: t.specializations, path: "/specialization", icon: Sparkles },
    { name: t.contact, path: "/contact", icon: Mail },
    { name: t.blog, path: "/blog", icon: Book },
    { name: t.faq, path: "/faq", icon: HelpCircle },
  ];

  const isActive = (path: string) => pathname === path;
  const {
    data: headerData,
    isLoading,
    error,
  } = useSingleType<THeader>("header", {
    populate: ["logo"],
  });

  return (
    <header className="bg-white border-b border-emerald-100 sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={headerData?.data?.logo?.url || "/Logo_StudioMedicoWhite.png"}
              alt="Logo"
              width={200}
              unoptimized
              height={200}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {publicNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive(item.path)
                      ? "bg-[#8CC63F] text-white"
                      : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}

            <div className="h-6 w-px bg-emerald-200 mx-2" />

            <LanguageSelector
              currentLanguage={language as any}
              onLanguageChange={onLanguageChange}
              variant="dropdown"
              className="border-emerald-200"
            />

            <Button
              onClick={onSignInClick}
              className="bg-[#8CC63F] hover:bg-emerald-700"
            >
              <User className="w-4 h-4 mr-2" />
              {t.signIn}
            </Button>
          </nav>

          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-lg hover:bg-emerald-50"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4"
            >
              <nav className="flex flex-col gap-2">
                {publicNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={onMenuToggle}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                        isActive(item.path)
                          ? "bg-[#8CC63F] text-white"
                          : "text-gray-700 hover:bg-emerald-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}

                <div className="px-4 py-2">
                  <LanguageSelector
                    currentLanguage={language as SupportedLanguage}
                    onLanguageChange={onLanguageChange}
                    variant="grid"
                  />
                </div>

                <div className="h-px bg-emerald-200 my-2" />

                <button
                  onClick={() => {
                    onSignInClick();
                    onMenuToggle();
                  }}
                  className="flex items-center gap-3 px-4 py-3 bg-[#8CC63F] text-white rounded-lg"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">{t.signIn}</span>
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
