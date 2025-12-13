"use client";
import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Textarea } from "@/app/components/ui/TextArea";
import { Card, CardContent } from "@/app/components/ui/Card";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import { LanguageContext } from "@/app/context/LanguageContext";
import { translations } from "@/translations/Translations";
import type { SupportedLanguage } from "@/@types/app.types";
import { useSingleType } from "@/lib/strapi";

export default function Contact() {
  const language = (useContext(LanguageContext) || "it") as SupportedLanguage;
  const t = translations[language]?.contact || translations.en.contact;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const locale = language === "it" ? "it" : "en";

  // Fetch data from Strapi using TanStack Query
  const {
    data: strapiData,
    isLoading,
    error,
  } = useSingleType("contact", {
    locale,
    populate: ["heros", "form", "contactInfo", "contactInfo.items"],
  });

  // Safely extract and map data from Strapi response with fallbacks
  const pageData = strapiData?.data ?? null;
  const hero =
    pageData && typeof pageData === "object" && "heros" in pageData
      ? (pageData as any).heros ?? null
      : null;
  const form =
    pageData && typeof pageData === "object" && "form" in pageData
      ? (pageData as any).form ?? null
      : null;
  const contactInfo =
    pageData && typeof pageData === "object" && "contactInfo" in pageData
      ? (pageData as any).contactInfo ?? null
      : null;

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-10">
          <div className="space-y-3 text-center">
            <div className="mx-auto h-10 bg-gray-200 rounded w-1/2" />
            <div className="mx-auto h-4 bg-gray-200 rounded w-2/3" />
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-[420px] bg-gray-200 rounded-2xl" />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded-2xl" />
              ))}
              <div className="grid sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded-2xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Log error but continue to render with fallback translations
  if (error) {
    console.error("Error fetching contact page data:", error);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t.successMessage);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {hero?.title || t.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {hero?.description || t.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-2 border-emerald-100">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {form?.title || t.sendMessage}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.fullName}
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="border-emerald-200 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.emailAddress}
                    </label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      className="border-emerald-200 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.phoneNumber}
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+1 (555) 000-0000"
                      className="border-emerald-200 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.message}
                    </label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={t.messagePlaceholder}
                      rows={5}
                      className="border-emerald-200 focus:border-emerald-600"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#8CC63F] hover:bg-emerald-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {t.sendButton}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-8 border-2 border-emerald-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {contactInfo?.title || t.contactInfo}
              </h2>

              <div className="space-y-6">
                {Array.isArray(contactInfo?.items) &&
                contactInfo.items.length > 0
                  ? contactInfo.items.map((item: any, idx: number) => {
                      const iconMap: Record<string, typeof Phone> = {
                        phone: Phone,
                        mail: Mail,
                        map: MapPin,
                        clock: Clock,
                      };
                      const iconKey = item.iconKey?.toLowerCase() || "";
                      const IconComponent = iconMap[iconKey] || Phone;

                      return (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                            <IconComponent className="w-6 h-6 text-emerald-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 mb-1">
                              {item.label || ""}
                            </div>
                            <div className="text-gray-600">
                              {item.value || ""}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : [
                      {
                        icon: Phone,
                        label: t.phone,
                        value: "+1 (555) 123-4567",
                      },
                      {
                        icon: Mail,
                        label: t.email,
                        value: "contact@nutritionist.com",
                      },
                      {
                        icon: MapPin,
                        label: t.address,
                        value: "123 Health Street\nWellness City, WC 12345",
                      },
                      {
                        icon: Clock,
                        label: t.officeHours,
                        value: `${t.monday}\n${t.saturday}\n${t.sunday}`,
                      },
                    ].map(
                      (
                        item: {
                          icon: typeof Phone;
                          label: string;
                          value: string;
                        },
                        idx: number
                      ) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                            <item.icon className="w-6 h-6 text-emerald-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 mb-1">
                              {item.label}
                            </div>
                            <div className="text-gray-600 whitespace-pre-line">
                              {item.value}
                            </div>
                          </div>
                        </div>
                      )
                    )}
              </div>
            </div>

            {/* Google Maps */}
            <div className="bg-white rounded-2xl overflow-hidden border-2 border-emerald-200">
              <div className="w-full h-64 lg:h-80">
                <iframe
                  src="https://www.google.com/maps?q=Via+25+Aprile+7/a,+31053+Pieve+di+Soligo+TV,+Italy&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="Location Map"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
