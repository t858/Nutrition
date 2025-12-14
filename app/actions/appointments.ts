"use server";

import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { Appointment, AppointmentType } from "@/@types/app.types";

export interface SaveAppointmentResult {
  success: boolean;
  data?: Appointment;
  error?: string;
}

export interface GetAppointmentsResult {
  success: boolean;
  data?: Appointment[];
  error?: string;
}

/**
 * Save or book a new appointment in Supabase
 */
export async function saveAppointment(
  formData: FormData
): Promise<SaveAppointmentResult> {
  try {
    // Create server-side Supabase client
    const supabase = createServerSupabaseClient();

    // Extract form data
    const patient_email = formData.get("patient_email") as string;
    const patient_name = formData.get("patient_name") as string;
    const appointment_date = formData.get("appointment_date") as string;
    const appointment_time = formData.get("appointment_time") as string;
    const type = formData.get("type") as string;
    const notes = formData.get("notes") as string || null;

    // Validate required fields
    if (!patient_email || !patient_name || !appointment_date || !appointment_time || !type) {
      return {
        success: false,
        error: "Missing required fields: patient email, name, date, time, and type are required",
      };
    }

    // Validate appointment date is not in the past
    const appointmentDateTime = new Date(`${appointment_date} ${appointment_time}`);
    const now = new Date();

    if (appointmentDateTime <= now) {
      return {
        success: false,
        error: "Appointment date and time must be in the future",
      };
    }

    // Prepare data for Supabase
    const appointmentData = {
      patient_email,
      patient_name,
      appointment_date,
      appointment_time,
      status: "pending",
      type,
      notes,
    };

    // Insert new appointment
    const { data, error } = await supabase
      .from("appointments")
      .insert(appointmentData)
      .select()
      .single();

    if (error) {
      console.error("Error inserting appointment:", error);
      console.error("Supabase error details:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });

      // Handle specific database errors
      if (error.code === "23505") { // unique constraint violation
        return {
          success: false,
          error: "You already have an appointment at this date and time. Please choose a different slot.",
        };
      }

      return {
        success: false,
        error: error.message || "Failed to book appointment",
      };
    }

    // Transform Supabase response to Appointment type
    const appointment: Appointment = {
      patient_email: data.patient_email,
      patient_name: data.patient_name,
      appointment_date: data.appointment_date,
      appointment_time: data.appointment_time,
      status: data.status,
      type: data.type,
      notes: data.notes,
      video_link: data.video_link,
    };

    return {
      success: true,
      data: appointment,
    };
  } catch (error: any) {
    console.error("Exception in saveAppointment:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while booking the appointment",
    };
  }
}

/**
 * Get appointments by patient email from Supabase
 */
export async function getAppointmentsByEmail(
  email: string
): Promise<GetAppointmentsResult> {
  try {
    // Create server-side Supabase client
    const supabase = createServerSupabaseClient();

    if (!email) {
      return {
        success: false,
        error: "Email is required",
      };
    }

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("patient_email", email)
      .order("appointment_date", { ascending: false })
      .order("appointment_time", { ascending: false });

    if (error) {
      console.error("Error fetching appointments:", error);
      return {
        success: false,
        error: error.message || "Failed to fetch appointments",
      };
    }

    if (!data) {
      return {
        success: true,
        data: [],
      };
    }

    // Transform Supabase response to Appointment type
    const appointments: Appointment[] = data.map((item) => ({
      patient_email: item.patient_email,
      patient_name: item.patient_name,
      appointment_date: item.appointment_date,
      appointment_time: item.appointment_time,
      status: item.status,
      type: item.type,
      notes: item.notes,
      video_link: item.video_link,
    }));

    return {
      success: true,
      data: appointments,
    };
  } catch (error: any) {
    console.error("Exception in getAppointmentsByEmail:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

/**
 * Get count of appointments by patient email and status
 */
export async function getAppointmentCount(
  email: string,
  status?: string
): Promise<{ success: boolean; count?: number; error?: string }> {
  try {
    // Create server-side Supabase client
    const supabase = createServerSupabaseClient();

    if (!email) {
      return {
        success: false,
        error: "Email is required",
      };
    }

    let query = supabase
      .from("appointments")
      .select("id", { count: "exact", head: true })
      .eq("patient_email", email);

    if (status) {
      query = query.eq("status", status);
    }

    const { count, error } = await query;

    if (error) {
      console.error("Error counting appointments:", error);
      return {
        success: false,
        error: error.message || "Failed to count appointments",
      };
    }

    return {
      success: true,
      count: count || 0,
    };
  } catch (error: any) {
    console.error("Exception in getAppointmentCount:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

