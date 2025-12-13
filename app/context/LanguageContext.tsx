"use client";
import { createContext } from "react";
import type { SupportedLanguage } from "@/@types/app.types";

export const LanguageContext = createContext<SupportedLanguage>("it");
