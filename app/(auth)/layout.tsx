"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import WhatsAppWidget from "@/app/components/WhatsAppWidget";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import LoginModal from "@/app/components/auth/LoginModal";
import { LanguageContext } from "@/app/context/LanguageContext";
import { ModalContext } from "../context/ModalContext";
import type { SupportedLanguage } from "@/@types/app.types";
import { languages } from "../constants/data";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<SupportedLanguage>("it");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("nutriwell_language");
    if (savedLanguage && languages.find((l) => l.code === savedLanguage)) {
      setLanguage(savedLanguage as SupportedLanguage);
    }
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as SupportedLanguage);
    localStorage.setItem("nutriwell_language", langCode);
  };

  const openLoginModal = () => {
    setModalMode("login");
    setIsLoginModalOpen(true);
  };

  const openSignupModal = () => {
    setModalMode("signup");
    setIsLoginModalOpen(true);
  };

  const modalContextValue = {
    openLoginModal,
    openSignupModal,
  };

  return (
    <LanguageContext.Provider value={language}>
      <ModalContext.Provider value={modalContextValue}>
        <div className="min-h-screen bg-white flex flex-col">
          <Header
            user={user}
            language={language}
            pathname={pathname}
            isMenuOpen={isMenuOpen}
            onLanguageChange={handleLanguageChange}
            onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
            onSignInClick={openLoginModal}
          />

          <main className="flex-1">{children}</main>

          <WhatsAppWidget />

          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            language={language}
            initialMode={modalMode}
          />

          <Footer language={language} />
        </div>
      </ModalContext.Provider>
    </LanguageContext.Provider>
  );
}
