"use client";
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flower2,
  Brain,
  Leaf,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/Card";
import { LanguageContext } from "@/app/context/LanguageContext";
import type { SupportedLanguage } from "@/@types/app.types";
import { translations } from "@/translations/Translations";
import { useSingleType } from "@/lib/strapi";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { useModal } from "@/app/context/ModalContext";

export default function Specializations() {
  const language = (useContext(LanguageContext) || "it") as SupportedLanguage;
  const t =
    translations[language]?.specialization || translations.it.specialization;
  const { openSignupModal } = useModal();
  // Track expanded list items: { specializationIndex: { listItemIndex: true } }
  const [expandedItems, setExpandedItems] = useState<
    Record<number, Record<number, boolean>>
  >({});

  const locale = language === "it" ? "it" : "en";

  // Fetch data from Strapi using TanStack Query
  const {
    data: strapiData,
    isLoading,
    error,
  } = useSingleType("specialization", {
    locale,
    populate: [
      "heros",
      "specializations",
      "specializations.listItems",
      "cta",
      "cta.primaryCta",
      "cta.secondaryCta",
    ],
  });

  // Safely extract and map data from Strapi response with fallbacks
  const pageData = strapiData?.data ?? null;
  const hero =
    pageData && typeof pageData === "object" && "heros" in pageData
      ? (pageData as any).hero ?? null
      : null;
  const specializationsData =
    pageData && typeof pageData === "object" && "specializations" in pageData
      ? (pageData as any).specializations ?? null
      : null;
  const cta =
    pageData && typeof pageData === "object" && "cta" in pageData
      ? (pageData as any).cta ?? null
      : null;

  // Helper function to get image URL from Strapi
  const getImageUrl = (image: any): string | null => {
    if (!image) return null;
    if (typeof image === "string") return image;
    if (image.url) return image.url;
    if (image.data?.attributes?.url) return image.data.attributes.url;
    if (Array.isArray(image.data) && image.data[0]?.attributes?.url) {
      return image.data[0].attributes.url;
    }
    return null;
  };

  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  // Icon mapping for fallback
  const iconMap: Record<string, typeof Flower2> = {
    flower: Flower2,
    brain: Brain,
    leaf: Leaf,
  };

  type ListItem = {
    title: string;
    description: string;
  };

  type SpecializationItem = {
    icon: typeof Flower2;
    color: string;
    data: {
      title: string;
      intro: string;
      description?: string | null;
      listItems?: ListItem[];
    };
    image?: any;
  };

  const slugify = (value: string) =>
    value
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "");

  // Map specializations with fallback to translations
  const specializations: SpecializationItem[] =
    Array.isArray(specializationsData) && specializationsData.length > 0
      ? specializationsData.map((item: any): SpecializationItem => {
          const iconKey = item.iconKey?.toLowerCase() || "";
          const IconComponent = iconMap[iconKey] || Flower2;

          // Get list items from Strapi
          const listItems: ListItem[] = Array.isArray(item.listItems)
            ? item.listItems.map(
                (li: any): ListItem => ({
                  title: li.title || li.label || String(li),
                  description: li.description || li.text || "",
                })
              )
            : [];

          return {
            icon: IconComponent,
            color: "purple",
            data: {
              title: item.title || "",
              intro: item.intro || "",
              description: item.description || null,
              listItems,
            },
            image: item.image || null,
          };
        })
      : [
          {
            icon: Flower2,
            color: "purple",
            data: {
              title: t.homeopathy.title || "",
              intro: t.homeopathy.intro || "",
              description: t.homeopathy.description || null,
              listItems: Array.isArray(t.homeopathy.listItems)
                ? t.homeopathy.listItems.map((item) => ({
                    title: item.title,
                    description: item.description || "",
                  }))
                : [],
            },
            image: null,
          },
          {
            icon: Brain,
            color: "purple",
            data: {
              title: t.neuralTherapy.title || "",
              intro: t.neuralTherapy.intro || "",
              description: t.neuralTherapy.description || null,
              listItems: Array.isArray(t.neuralTherapy.listItems)
                ? t.neuralTherapy.listItems.map((item) => ({
                    title: item.title,
                    description: item.description || "",
                  }))
                : [],
            },
            image: null,
          },
          {
            icon: Leaf,
            color: "purple",
            data: {
              title: t.phytotherapy.title || "",
              intro: t.phytotherapy.intro || "",
              description: t.phytotherapy.description || null,
              listItems: Array.isArray(t.phytotherapy.listItems)
                ? t.phytotherapy.listItems.map((item) => ({
                    title: item.title,
                    description: item.description || "",
                  }))
                : [],
            },
            image: null,
          },
        ];

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-10">
          <div className="space-y-4 text-center">
            <div className="mx-auto h-16 w-16 bg-gray-200 rounded-full" />
            <div className="mx-auto h-10 bg-gray-200 rounded w-1/2" />
            <div className="mx-auto h-4 bg-gray-200 rounded w-2/3" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-emerald-100 p-8 space-y-4"
              >
                <div className="h-6 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[...Array(4)].map((__, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Log error but continue to render with fallback translations
  if (error) {
    console.error("Error fetching specialization page data:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <Sparkles className="w-16 h-16 text-emerald-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {hero?.title || t.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {hero?.description || t.subtitle}
          </p>
        </motion.div>

        <div className="space-y-16">
          {specializations.map((spec: SpecializationItem, idx: number) => {
            const rawTitle = spec.data.title;
            const sectionId = slugify(rawTitle.replace(/[^\w\s-]/g, ""));
            return (
              <motion.div
                key={idx}
                id={sectionId}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <Card className="border-2 border-emerald-100 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r from-${spec.color}-50 to-${spec.color}-100 p-8 border-b-2 border-${spec.color}-200`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-16 h-16 bg-${spec.color}-600 rounded-xl flex items-center justify-center`}
                      >
                        <spec.icon className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        {spec.data.title}
                      </h2>
                    </div>
                  </div>

                  <CardContent className="p-8 space-y-6">
                    {/* Intro */}
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {spec.data.intro}
                    </p>

                    {/* Description */}
                    {spec.data.description && (
                      <p className="text-gray-700 leading-relaxed">
                        {spec.data.description}
                      </p>
                    )}

                    {/* List Items */}
                    {spec.data.listItems && spec.data.listItems.length > 0 && (
                      <div className="space-y-3 mt-6 grid lg:grid-cols-2 gap-4">
                        {spec.data.listItems.map(
                          (listItem: ListItem, itemIdx: number) => {
                            const isExpanded =
                              expandedItems[idx]?.[itemIdx] || false;
                            return (
                              <motion.div
                                key={itemIdx}
                                initial={{ opacity: 0, y: -10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: itemIdx * 0.05 }}
                                className="border border-emerald-100 rounded-xl overflow-hidden bg-white"
                              >
                                {listItem.description ? (
                                  <>
                                    <button
                                      onClick={() => {
                                        setExpandedItems((prev) => ({
                                          ...prev,
                                          [idx]: {
                                            ...prev[idx],
                                            [itemIdx]: !isExpanded,
                                          },
                                        }));
                                      }}
                                      className="w-full flex items-center justify-between p-4 hover:bg-emerald-50 transition-colors text-left"
                                    >
                                      <div className="flex items-start gap-3 flex-1">
                                        <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 shrink-0" />
                                        <span className="font-medium text-gray-900 pr-4">
                                          {listItem.title}
                                        </span>
                                      </div>
                                      {isExpanded ? (
                                        <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" />
                                      ) : (
                                        <ChevronDown className="w-5 h-5 text-emerald-600 shrink-0" />
                                      )}
                                    </button>
                                    <AnimatePresence>
                                      {isExpanded && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{
                                            height: "auto",
                                            opacity: 1,
                                          }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.2 }}
                                          className="overflow-hidden"
                                        >
                                          <div className="px-4 pb-4 pl-9 text-gray-600 leading-relaxed">
                                            {listItem.description}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </>
                                ) : (
                                  <div className="w-full flex items-start gap-3 p-4">
                                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 shrink-0" />
                                    <span className="font-medium text-gray-900">
                                      {listItem.title}
                                    </span>
                                  </div>
                                )}
                              </motion.div>
                            );
                          }
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            {cta?.title ||
              (language === "it"
                ? "Vuoi saperne di più?"
                : "Want to learn more?")}
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            {cta?.subtitle ||
              (language === "it"
                ? "Prenota una consulenza per scoprire quale approccio terapeutico è più adatto a te"
                : "Book a consultation to discover which therapeutic approach is best suited for you")}
          </p>
          {cta?.primaryCta && (
            <Link href={cta.primaryCta.href || "#"}>
              <Button
                size="lg"
                onClick={
                  cta.primaryCta.href === "#" ||
                  cta.primaryCta.href.includes("modal")
                    ? openSignupModal
                    : undefined
                }
                className="bg-white text-emerald-600 hover:bg-emerald-50"
              >
                {cta.primaryCta.label}
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}
