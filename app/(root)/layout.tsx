"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/use-auth";
import { LanguageContext } from "@/app/context/LanguageContext";
import { languages } from "@/app/constants/data";
import type { SupportedLanguage } from "@/@types/app.types";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, role, isLoading } = useAuth();
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>("it");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("nutriwell_language");
    if (savedLanguage && languages.find((l) => l.code === savedLanguage)) {
      setLanguage(savedLanguage as SupportedLanguage);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <LanguageContext.Provider value={language}>
      <div className="min-h-screen bg-gray-50">
        <main>{children}</main>
      </div>
    </LanguageContext.Provider>
  );
}
