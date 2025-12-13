"use client";
import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { LanguageContext } from "@/app/context/LanguageContext";
import { translations } from "@/translations/Translations";
import type { SupportedLanguage } from "@/@types/app.types";
import { useSingleType } from "@/lib/strapi";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import RichTextRenderer from "@/app/components/RichTextRenderer";

type FAQCategory = "appointments" | "pricing" | "services" | "general";

// Types matching the Strapi FAQ structure
type FAQQuestion = {
  id: number;
  Question: string;
  Asnwer: any[]; // Rich text blocks array for RichTextRenderer
};

type FAQSection = {
  id: number;
  Section_Heading: string;
  Questions: FAQQuestion[];
};

export default function FAQ() {
  const language = (useContext(LanguageContext) || "it") as SupportedLanguage;
  const t = translations[language]?.faq || translations.en.faq;
  const [selectedCategory, setSelectedCategory] =
    useState<FAQCategory>("appointments");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const locale = language === "it" ? "it" : "en";

  // Fetch data from Strapi using TanStack Query
  const {
    data: strapiData,
    isLoading,
    error,
  } = useSingleType("faq", {
    locale,
    populate: ["faqs", "faqs.Questions", "contactPrompt"],
  });

  // Safely extract and map data from Strapi response with fallbacks
  const pageData = strapiData?.data ?? null;
  const faqsData: FAQSection[] =
    pageData && typeof pageData === "object" && "faqs" in pageData
      ? (pageData.faqs as FAQSection[]) ?? []
      : [];
  const contactPrompt =
    pageData && typeof pageData === "object" && "contactPrompt" in pageData
      ? (pageData as any).contactPrompt ?? null
      : null;

  // Helper function to map Section_Heading to FAQCategory
  const mapSectionHeadingToCategory = (heading: string): FAQCategory => {
    const headingLower = heading.toLowerCase();
    if (
      headingLower.includes("appuntamenti") ||
      headingLower.includes("appointments")
    ) {
      return "appointments";
    }
    if (
      headingLower.includes("prezzi") ||
      headingLower.includes("pagamenti") ||
      headingLower.includes("pricing") ||
      headingLower.includes("payments")
    ) {
      return "pricing";
    }
    if (
      headingLower.includes("servizi") ||
      headingLower.includes("piani") ||
      headingLower.includes("services") ||
      headingLower.includes("plans")
    ) {
      return "services";
    }
    return "general";
  };

  // Get all available categories from sections
  const categories: FAQCategory[] = Array.from(
    new Set(
      faqsData.map((section) =>
        mapSectionHeadingToCategory(section.Section_Heading)
      )
    )
  );

  // Set initial category to first available category from data
  useEffect(() => {
    if (categories.length > 0 && !categories.includes(selectedCategory)) {
      setSelectedCategory(categories[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  // Filter sections by selected category
  const selectedSection = faqsData.find(
    (section) =>
      mapSectionHeadingToCategory(section.Section_Heading) === selectedCategory
  );

  // Get questions from selected section
  const faqs = selectedSection?.Questions ?? [];

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="flex gap-8">
            <div className="w-64 h-96 bg-white rounded-lg" />
            <div className="flex-1 space-y-4">
              <div className="h-10 bg-gray-200 rounded w-1/3" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-white rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Log error but continue to render with fallback translations
  if (error) {
    console.error("Error fetching FAQ page data:", error);
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-[75%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Category Navigation */}
          {categories.length > 0 && (
            <aside className="lg:w-[25%] shrink-0">
              <div className="bg-white rounded-lg p-2 sticky top-24">
                <nav className="space-y-0">
                  {categories.map((category) => {
                    const section = faqsData.find(
                      (s) =>
                        mapSectionHeadingToCategory(s.Section_Heading) ===
                        category
                    );
                    return (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setOpenIndex(null);
                        }}
                        className={`w-full text-left px-4 py-8 font-semibold text-gray-900 transition-colors border-b border-gray-100 last:border-b-0 ${
                          selectedCategory === category
                            ? "bg-gray-50 text-gray-900"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {section?.Section_Heading}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>
          )}

          {/* Right Content Area */}
          <div className="flex-1">
            {/* Category Heading */}
            {selectedSection && (
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {selectedSection.Section_Heading}
              </h2>
            )}

            {/* FAQ Accordions */}
            <div className="space-y-3">
              {faqs.length > 0 ? (
                <AnimatePresence mode="wait">
                  {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                      <motion.div
                        key={faq.id || `${selectedCategory}-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-medium text-gray-900 pr-4 flex-1">
                              {faq.Question}
                            </span>
                            {isOpen ? (
                              <Minus className="w-5 h-5 text-gray-600 shrink-0" />
                            ) : (
                              <Plus className="w-5 h-5 text-gray-600 shrink-0" />
                            )}
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-5 pb-5 pt-0">
                                  <div className="text-gray-600 leading-relaxed">
                                    {Array.isArray(faq.Asnwer) &&
                                    faq.Asnwer.length > 0 ? (
                                      <RichTextRenderer content={faq.Asnwer} />
                                    ) : (
                                      <p>No answer available.</p>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              ) : (
                <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
                  <p className="text-gray-500">
                    {error
                      ? "Error loading FAQs. Please try again later."
                      : "No FAQs available at the moment."}
                  </p>
                </div>
              )}
            </div>

            {/* Contact Prompt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 text-center p-8 bg-white rounded-lg border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {contactPrompt?.title}
              </h3>
              <p className="text-gray-600 mb-6">{contactPrompt?.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`mailto:${contactPrompt?.email}`}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  {contactPrompt?.email}
                </Link>
                <span className="hidden sm:block text-gray-300">|</span>
                <Link
                  href={`tel:${contactPrompt?.phone}`}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  {contactPrompt?.phone}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
