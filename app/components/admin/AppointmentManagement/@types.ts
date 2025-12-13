export interface TAppointmentManagementProps {
  // Add props as needed
}

export type TAppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type TAppointmentFilter = "all" | "pending" | "confirmed" | "completed";

export interface TAppointment {
  id: string;
  patientName: string;
  type: string;
  date: string;
  time: string;
  status: TAppointmentStatus;
}
