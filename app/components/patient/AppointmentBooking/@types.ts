import type { Appointment, TUser } from "@/@types/app.types";

export interface TAppointmentBookingProps {
  user: TUser;
}

export interface TCalendarMeta {
  daysInMonth: number;
  startingDayOfWeek: number;
}

export type TAppointmentList = Appointment[];

export type TAppointmentType = "consultation" | "follow-up" | "check-up";
