/* eslint-disable @typescript-eslint/no-explicit-any */
import type { translations } from "@/translations/Translations";

export type SupportedLanguage = keyof typeof translations;

export type Role = "admin" | "patient";

export type TUser = {
  email: string;
  full_name: string;
  role: Role;
  phone?: string;
  avatar_url?: string | null;
};

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export type AppointmentType =
  | "consultation"
  | "follow_up"
  | "nutrition_plan"
  | "weight_management"
  | string;

export interface Appointment {
  patient_email: string;
  patient_name: string;
  appointment_date: string;
  appointment_time: string;
  status: AppointmentStatus;
  type: AppointmentType;
  notes?: string | null;
  video_link?: string | null;
}

export interface Prescription {
  id?: string;
  patient_email: string;
  patient_name: string;
  meal_plan: string;
  valid_until?: string | null;
  calories_target?: number | null;
  protein_target?: number | null;
  supplements?: string | null;
  restrictions?: string | null;
  notes?: string | null;
  created_date?: string | null;
}

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active"
  | string;

export interface Questionnaire {
  patient_email: string;
  age: number;
  gender: "male" | "female" | "other" | string;
  height: number;
  weight: number;
  medical_conditions?: string | null;
  allergies?: string | null;
  dietary_preferences?: string | null;
  goals?: string | null;
  activity_level: ActivityLevel;
  medications?: string | null;
}

export interface ChatMessage {
  sender_email: string;
  receiver_email: string;
  message: string;
  is_read: boolean;
}

export type InvoiceStatus = "paid" | "pending" | "overdue" | "draft" | string;

export interface Invoice {
  patient_email: string;
  amount: number;
  status: InvoiceStatus;
  due_date?: string | null;
  notes?: string | null;
}

export type Nullable<T> = T | null;

export type WithId<T extends Record<string, any>> = T & { id: string };

export interface PaginatedResponse<T> {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
}

export type TranslationNamespace = (typeof translations)[SupportedLanguage];
