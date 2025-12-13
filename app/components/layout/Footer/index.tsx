"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Apple,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { translations } from "@/translations/Translations";
import type { FooterProps } from "./@types";

export default function Footer({ language }: FooterProps) {
  const t = translations[language]?.nav || translations.en.nav;
  const tf = translations[language]?.footer || translations.en.footer;

  return (
    <footer className="bg-gradient-to-r  bg-[#8CC63F] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/Logo_StudioMedicoWhite.png"
                alt="Logo"
                width={200}
                height={200}
              />
            </div>
            <p className="text-emerald-100 text-sm mb-4">{tf.tagline}</p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{tf.quickLinks}</h3>
            <div className="space-y-2 text-emerald-100 text-sm">
              <div>
                <Link href="/" className="hover:text-white transition-colors">
                  {t.home}
                </Link>
              </div>
              <div>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  {t.about}
                </Link>
              </div>
              <div>
                <Link
                  href="/specialization"
                  className="hover:text-white transition-colors"
                >
                  {t.specializations}
                </Link>
              </div>
              <div>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  {t.faq}
                </Link>
              </div>
              <div>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  {t.contact}
                </Link>
              </div>
              <div>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  {tf.privacyPolicy}
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{tf.location}</h3>
            <div className="space-y-2 text-emerald-100 text-sm">
              <div>{tf.address}</div>
              <div>{tf.city}</div>
              <div>{tf.phonenumber}</div>
              <div>{tf.activetimes}</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{tf.openinghours}</h3>
            <div className="space-y-2 text-emerald-100 text-sm">
              <div>{tf.appointments}</div>
              <div>{tf.book}</div>
              <div>
                <a
                  href="mailto:info@pavanvalentina.it"
                  className="hover:text-white transition-colors"
                >
                  info@pavanvalentina.it
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-500 mt-8 pt-8 text-center text-emerald-100 text-sm">
          © 2026 STUDIO MEDICO Dott. Valentina Pavan.{tf.copyright}. Website by{" "}
          <Link
            href="https://i-gerald.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white 
            underline"
          >
            iGerald
          </Link>
        </div>
      </div>
    </footer>
  );
}
