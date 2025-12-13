"use client";
import { useContext, useState, useEffect } from "react";
import GallerySwiper from "@/app/components/GallerySwiper";
import { motion } from "framer-motion";
import { Award, Users, Heart, Target, BookOpen, Zap, Info } from "lucide-react";
import { LanguageContext } from "@/app/context/LanguageContext";
import { translations } from "@/translations/Translations";
import type { SupportedLanguage } from "@/@types/app.types";
import { useSingleType } from "@/lib/strapi";
import Image from "next/image";
import Link from "next/link";
import RichTextRenderer from "@/app/components/RichTextRenderer";
import SocialIcons from "@/app/components/shared/SocialIcons";

export default function About() {
  const language = (useContext(LanguageContext) || "it") as SupportedLanguage;
  const t = translations[language]?.about || translations.en.about;

  const locale = language === "it" ? "it" : "en";

  // Fetch data from Strapi using TanStack Query
  const {
    data: strapiData,
    isLoading,
    error,
  } = useSingleType("about", {
    locale,
    populate: [
      "story",
      "story.image",
      "story.socialLinks",
      "values",
      "values.items",
      "CV",
      // "team",
      // "team.members",
      // "team.members.image",
    ],
  });

  // Add custom styles for Swiper pagination and stacking
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .team-swiper .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        background-color: #bfdbfe !important;
        opacity: 1 !important;
      }
      .team-swiper .swiper-pagination-bullet-active {
        background-color: #1e3a8a !important;
      }
      .team-swiper .swiper-pagination {
        position: relative !important;
        margin-top: 2rem !important;
      }
      .team-swiper .swiper-slide {
        transition: transform 0.5s ease !important;
      }
      .team-swiper .swiper-slide-active {
        z-index: 30 !important;
        position: relative !important;
      }
      .team-swiper .swiper-slide-prev,
      .team-swiper .swiper-slide-next {
        z-index: 10 !important;
        position: relative !important;
      }
      .team-swiper .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next) {
        z-index: 5 !important;
        position: relative !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Safely extract and map data from Strapi response with fallbacks
  const pageData = strapiData?.data ?? null;
  const hero =
    pageData && typeof pageData === "object" && "heros" in pageData
      ? (pageData as any).hero ?? null
      : null;
  const connect =
    pageData && typeof pageData === "object" && "connect" in pageData
      ? (pageData as any).connect ?? null
      : null;
  const story =
    pageData && typeof pageData === "object" && "story" in pageData
      ? (pageData as any).story ?? null
      : null;
  const contact =
    pageData && typeof pageData === "object" && "Contact" in pageData
      ? (pageData as any).Contact ?? null
      : null;
  const values =
    pageData && typeof pageData === "object" && "values" in pageData
      ? (pageData as any).values ?? null
      : null;
  const premises =
    pageData && typeof pageData === "object" && "Premises" in pageData
      ? (pageData as any).Premises ?? null
      : null;
  const cvFile =
    pageData && typeof pageData === "object" && "CV" in pageData
      ? (pageData as any).CV ?? null
      : null;

  const socialLinks =
    pageData && typeof pageData === "object" && "socialLinks" in pageData
      ? (pageData as any).socialLinks ?? null
      : null;

  const team =
    pageData && typeof pageData === "object" && "team" in pageData
      ? (pageData as any).team ?? null
      : null;

  // Team member type
  type TeamMember = {
    name: string;
    title: string;
    image?: {
      url: string;
      alt?: string;
    };
  };

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

  const getFileUrl = (file: any): string | null => {
    if (!file) return null;
    const url =
      typeof file === "string"
        ? file
        : file.url ||
          file?.data?.attributes?.url ||
          (Array.isArray(file?.data) && file.data[0]?.attributes?.url);
    if (!url) return null;
    return url.startsWith("http") ? url : `${strapiUrl}${url}`;
  };

  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="h-80 bg-gray-200 rounded-3xl" />
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="flex gap-3 pt-4">
                <div className="h-10 w-10 bg-gray-200 rounded-full" />
                <div className="h-10 w-10 bg-gray-200 rounded-full" />
                <div className="h-10 w-10 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Log error but continue to render with fallback translations
  if (error) {
    console.error("Error fetching about page data:", error);
  }

  // Map values with fallback to translations
  const iconMap: Record<string, typeof Heart> = {
    heart: Heart,
    target: Target,
    book: BookOpen,
    users: Users,
    award: Award,
    zap: Zap,
  };

  type ValueItem = {
    icon: typeof Heart;
    title: string;
    desc: string;
  };

  const valuesList: ValueItem[] =
    Array.isArray(values?.items) && values.items.length > 0
      ? values.items.map((item: any): ValueItem => {
          const iconKey = item.iconKey?.toLowerCase() || "";
          const IconComponent = iconMap[iconKey] || Heart;
          return {
            icon: IconComponent,
            title: item.title || "",
            desc: item.description || "",
          };
        })
      : [
          { icon: Heart, title: t.value1Title, desc: t.value1Desc },
          { icon: Target, title: t.value2Title, desc: t.value2Desc },
          { icon: BookOpen, title: t.value3Title, desc: t.value3Desc },
          { icon: Users, title: t.value4Title, desc: t.value4Desc },
          { icon: Award, title: t.value5Title, desc: t.value5Desc },
          { icon: Zap, title: t.value6Title, desc: t.value6Desc },
        ];

  const premisesContent = (premises as any)?.content || premises;
  const hasPremisesContent =
    Array.isArray(premisesContent) && premisesContent.length > 0;
  const contactContent = (contact as any)?.content || contact;
  const hasContactContent =
    Array.isArray(contactContent) && contactContent.length > 0;
  const storyBody = (story as any)?.body?.content || (story as any)?.body;
  const hasStoryBody = Array.isArray(storyBody) && storyBody.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Hero */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {(() => {
                const storyImageUrl = getImageUrl(story?.image);
                const fullImageUrl = storyImageUrl
                  ? storyImageUrl.startsWith("http")
                    ? storyImageUrl
                    : `${strapiUrl}${storyImageUrl}`
                  : "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80";
                return (
                  <Image
                    src={fullImageUrl}
                    alt={story?.alt || "Nutritionist"}
                    width={800}
                    height={600}
                    className="rounded-3xl shadow-2xl"
                  />
                );
              })()}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                {story?.heading || t.ourStory}
              </h2>
              {hasStoryBody ? (
                <RichTextRenderer content={storyBody as any[]} />
              ) : story?.content ? (
                <div
                  className="text-gray-600 leading-relaxed prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: story.content }}
                />
              ) : (
                <>
                  <p className="text-gray-600 leading-relaxed">{t.story1}</p>
                  <p className="text-gray-600 leading-relaxed">{t.story2}</p>
                </>
              )}

              {/* Social Media Links */}
              <div className="pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {connect}
                </h3>
                <div className="flex items-center gap-4">
                  <SocialIcons
                    facebook={socialLinks?.facebook || ""}
                    instagram={socialLinks?.instagram || ""}
                    twitter={socialLinks?.twitter || ""}
                    linkedin={socialLinks?.linkedin || ""}
                  />

                  {getFileUrl(cvFile) && (
                    <a
                      href={getFileUrl(cvFile) as string}
                      download
                      className="w-12 h-12 r flex items-center justify-center text-white transition-colors"
                    >
                      <Image src="/CV.png" alt="CV" width={100} height={100} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#8CC63F] rounded-3xl p-12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              {hasContactContent && (
                <RichTextRenderer content={contactContent as any[]} />
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {hasPremisesContent && (
                <RichTextRenderer content={premisesContent as any[]} />
              )}
            </motion.div>

            <div className="">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h2 className="text-4xl font-bold text-gray-900">
                  {values?.title || t.coreValues}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {values?.description ||
                    (t as any)?.valuesIntro ||
                    "Principles that guide how we care for every patient—grounded in empathy, evidence, and long-term wellness."}
                </p>
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols gap-8">
                {valuesList.map((value: ValueItem, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="h-full text-left p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 hover:shadow-xl transition-all"
                  >
                    <div className="w-16 h-16 bg-[#8CC63F] rounded-xl flex items-center justify-center mb-6">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Carousel */}
      <section className="py-20 bg-stone-50">
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-6xl md:text-7xl font-bold text-slate-300/60 mb-16">
              {language === "it" ? "CERTIFICAZIONI" : "CERTIFICATIONS"}
            </h2>
          </motion.div>

          <div className="relative">
            {/* Navigation Arrows */}

            <GallerySwiper />
          </div>
        </div>
      </section>

      {/* Privacy Callout */}
      <section className="pt-20">
        <div className="">
          <div className="grid lg:grid-cols-2  items-stretch">
            <div className="relative h-[260px] lg:h-[380px] overflow-hidden">
              <Image
                src="/medical.jpg"
                alt="Medical examination report"
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="bg-emerald-600 text-whitep-10 flex flex-col justify-center gap-4 text-center">
              <p className="text-sm uppercase tracking-wide text-white/80">
                Per una corretta gestione dei vostri dati
              </p>
              <div className="flex items-center gap-3 text-center justify-center">
                <Info className="w-10 h-10 text-white" />
                <Link
                  href="/privacy"
                  className="text-3xl font-bold underline text-white underline-offset-4 decoration-white/70 hover:decoration-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
    </div>
  );
}
