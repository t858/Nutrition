"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ServicesSectionProps, TServiceCard } from "./@types";

const slugify = (value: string) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "");

const buildHref = (card: TServiceCard) => {
  const anchorSource = card.title ? String(card.title) : "";
  const anchor = anchorSource ? `#${slugify(anchorSource)}` : "";
  const baseHref = "/specialization";
  return `${baseHref}${anchor}`;
};

export default function ServicesSection({
  services,
  fallback,
  className = "",
  ...sectionProps
}: ServicesSectionProps) {
  const title = services?.title || fallback.title;
  const subtitle = services?.subtitle || fallback.subtitle;
  const cards = services?.cards ?? [];

  return (
    <section className={`py-20 bg-white ${className}`.trim()} {...sectionProps}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.length > 0 ? (
            cards.map((card, idx) => (
              <Link key={idx} href={buildHref(card)} className="block h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="h-full p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl border hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="w-14 h-14 bg-[#8CC63F] rounded-xl flex items-center justify-center mb-6 overflow-hidden">
                    <Image
                      src="/Logo_StudioMedicoWhite.png"
                      alt={card.title || "Service icon"}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-600">{card.description}</p>
                </motion.div>
              </Link>
            ))
          ) : (
            <div className="text-center text-gray-600">
              {fallback.emptyState || "No services found"}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
