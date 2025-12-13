"use client";
import { useContext } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  UserPlus,
  Heart,
  Apple,
  TrendingUp,
} from "lucide-react";
import { LanguageContext } from "@/app/context/LanguageContext";
import { useModal } from "../context/ModalContext";
import { translations } from "@/translations/Translations";
import type { SupportedLanguage } from "@/@types/app.types";
import { useSingleType } from "@/lib/strapi";
import ServicesSection from "@/app/components/home/ServicesSection";

export default function Home() {
  const language = (useContext(LanguageContext) || "it") as SupportedLanguage;
  const t = translations[language]?.home || translations.en.home;
  const { openSignupModal } = useModal();

  const locale = language === "it" ? "it" : "en";

  // Fetch data from Strapi using TanStack Query
  const {
    data: strapiData,
    isLoading,
    error,
  } = useSingleType("home", {
    locale,
    populate: [
      "hero.primaryCta",
      "hero.secondaryCta",
      "stats",
      "services",
      "services.cards",
      "services.cards.icon",
      "testimonials",
      "cta",
      "cta.primaryCta",
    ],
  });

  // Safely extract and map data from Strapi response with fallbacks
  const pageData = strapiData?.data ?? null;
  const hero =
    pageData && typeof pageData === "object" && "hero" in pageData
      ? (pageData as any).hero ?? null
      : null;
  const stats =
    pageData &&
    typeof pageData === "object" &&
    "stats" in pageData &&
    Array.isArray((pageData as any).stats)
      ? (pageData as any).stats
      : [];
  const services =
    pageData && typeof pageData === "object" && "services" in pageData
      ? (pageData as any).services ?? null
      : null;
  const testimonials =
    pageData && typeof pageData === "object" && "testimonials" in pageData
      ? (pageData as any).testimonials ?? null
      : null;
  const cta =
    pageData && typeof pageData === "object" && "cta" in pageData
      ? (pageData as any).cta ?? null
      : null;

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-32" />
              <div className="h-12 bg-gray-200 rounded w-3/4" />
              <div className="h-24 bg-gray-200 rounded w-full" />
              <div className="flex gap-3">
                <div className="h-12 w-32 bg-gray-200 rounded" />
                <div className="h-12 w-32 bg-gray-200 rounded" />
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-72 bg-gray-200 rounded-3xl w-full" />
              <div className="h-20 bg-gray-200 rounded-2xl w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Log error but continue to render with fallback translations
  if (error) {
    console.error("Error fetching home page data:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-emerald-100/50 mask-linear-gradient(0deg,white,rgba(255,255,255,0.6))" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {hero?.eyebrow && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-full px-4 py-2 mb-6"
                >
                  <Heart className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-700 font-medium">
                    {hero.eyebrow || t.badge}
                  </span>
                </motion.div>
              )}

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                {hero?.title ? (
                  hero.highlight && hero.title.includes(hero.highlight) ? (
                    <>
                      {hero.title.split(hero.highlight)[0]}
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                        {hero.highlight}
                      </span>
                      {hero.title.split(hero.highlight)[1]}
                    </>
                  ) : (
                    <>
                      {hero.title}
                      {hero.highlight && (
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                          {hero.highlight}
                        </span>
                      )}
                    </>
                  )
                ) : (
                  <>
                    {t.title1}
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                      {t.title2}
                    </span>
                  </>
                )}
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {hero?.description || t.description}
              </p>

              <div className="flex flex-wrap gap-4">
                {hero?.primaryCta ? (
                  <Button
                    size="lg"
                    onClick={openSignupModal}
                    className="bg-[#8CC63F] hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 rounded-md flex items-center py-1 px-4 cursor-pointer"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    {hero.primaryCta.label}
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    onClick={openSignupModal}
                    className="bg-[#8CC63F] hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 rounded-md flex items-center py-1 px-4 cursor-pointer"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    {t.getStarted}
                  </Button>
                )}
                {hero?.secondaryCta ? (
                  <Link href={hero.secondaryCta.href || "/about"}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                    >
                      {hero.secondaryCta.label}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/about">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                    >
                      {t.learnMore}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>

              <div className="mt-8 p-4 bg-white rounded-xl border-2 border-emerald-100">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <strong>{t.secure}</strong> {t.secureText}
                </p>
              </div>

              {/* Stats */}
              {stats.length > 0 ? (
                <div className="grid grid-cols-3 gap-6 mt-12">
                  {stats.slice(0, 3).map((stat: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                    >
                      <div className="text-3xl font-bold text-emerald-600">
                        {stat.value}
                      </div>
                      {/* <div className="text-sm text-gray-600">{stat.label}</div> */}
                      {stat.supportingText && (
                        <div className="text-xs text-gray-500 mt-1">
                          {stat.supportingText}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-6 mt-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="text-3xl font-bold text-emerald-600">
                      500+
                    </div>
                    <div className="text-sm text-gray-600">
                      {t.statsClients}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="text-3xl font-bold text-emerald-600">
                      95%
                    </div>
                    <div className="text-sm text-gray-600">
                      {t.statsSuccess}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="text-3xl font-bold text-emerald-600">
                      10+
                    </div>
                    <div className="text-sm text-gray-600">
                      {t.statsExperience}
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>

            {/* Right Content - Animated Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative bg-white rounded-3xl shadow-2xl shadow-emerald-500/20 p-8 border border-emerald-100"
              >
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full opacity-20 blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full opacity-20 blur-2xl" />

                <div className="relative space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl">
                    <div className="w-16 h-16 bg-[#8CC63F] rounded-xl flex items-center justify-center">
                      <Apple className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">
                        Your Daily Nutrition
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        2,150 kcal
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                      <div className="text-xs text-gray-600 mb-1">Protein</div>
                      <div className="text-xl font-bold text-emerald-600">
                        120g
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl">
                      <div className="text-xs text-gray-600 mb-1">Progress</div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <div className="text-xl font-bold text-emerald-600">
                          +5%
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl text-center">
                    <span className="text-sm text-gray-600 font-semibold">
                      Book your consultation today!
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection
        services={services}
        fallback={{
          title: t.servicesTitle,
          subtitle: t.servicesSubtitle,
          emptyState: "No services found",
        }}
      />

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              {testimonials?.title || t.testimonialsTitle}
            </h2>
            <p className="text-xl text-emerald-100">
              {testimonials?.subtitle || t.testimonialsSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials?.items && testimonials.items.length > 0
              ? testimonials.items.map((item: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-xl"
                  >
                    <div className="flex gap-1 mb-4">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic">"{item.quote}"</p>
                    <div className="border-t pt-4">
                      <div className="font-bold text-gray-900">{item.name}</div>
                      {(item.result || item.headline) && (
                        <div className="text-sm text-emerald-600 font-semibold">
                          {item.result || item.headline}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              : [
                  {
                    name: "Sarah Johnson",
                    result: t.testimonial1Result,
                    text: t.testimonial1Text,
                  },
                  {
                    name: "Michael Chen",
                    result: t.testimonial2Result,
                    text: t.testimonial2Text,
                  },
                  {
                    name: "Emily Rodriguez",
                    result: t.testimonial3Result,
                    text: t.testimonial3Text,
                  },
                ].map(
                  (
                    testimonial: { name: string; result: string; text: string },
                    idx: number
                  ) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white rounded-2xl p-8 shadow-xl"
                    >
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 italic">
                        "{testimonial.text}"
                      </p>
                      <div className="border-t pt-4">
                        <div className="font-bold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-emerald-600 font-semibold">
                          {testimonial.result}
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {cta?.title || t.ctaTitle}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {cta?.subtitle || t.ctaSubtitle}
            </p>
            {cta?.primaryCta ? (
              <Button
                size="lg"
                onClick={openSignupModal}
                className="bg-[#8CC63F] hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                {cta.primaryCta.label}
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={openSignupModal}
                className="bg-[#8CC63F] hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                {t.ctaButton}
              </Button>
            )}
            {(cta?.note || t.ctaNote) && (
              <p className="text-sm text-gray-500 mt-4">
                {cta?.note || t.ctaNote}
              </p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
