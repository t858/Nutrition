"use server";

import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { Questionnaire } from "@/@types/app.types";

export interface SaveQuestionnaireResult {
  success: boolean;
  data?: Questionnaire;
  error?: string;
  bmi?: string;
}

export interface GetQuestionnaireResult {
  success: boolean;
  data?: Questionnaire;
  error?: string;
}

/**
 * Save or update a questionnaire in Supabase
 */
export async function saveQuestionnaire(
  formData: FormData
): Promise<SaveQuestionnaireResult> {
  try {
    // Create server-side Supabase client
    const supabase = createServerSupabaseClient();

    // Extract form data
    const patient_email = formData.get("patient_email") as string;
    const age = parseInt(formData.get("age") as string);
    const gender = formData.get("gender") as string;
    const height = parseFloat(formData.get("height") as string);
    const weight = parseFloat(formData.get("weight") as string);
    const medical_conditions = formData.get("medical_conditions") as string || null;
    const allergies = formData.get("allergies") as string || null;
    const dietary_preferences = formData.get("dietary_preferences") as string || null;
    const goals = formData.get("goals") as string || null;
    const activity_level = formData.get("activity_level") as string || "moderate";
    const medications = formData.get("medications") as string || null;

    // Validate required fields
    if (!patient_email || !age || !height || !weight) {
      return {
        success: false,
        error: "Missing required fields: email, age, height, and weight are required",
      };
    }

    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiRounded = parseFloat(bmi.toFixed(1));

    // Prepare data for Supabase
    const questionnaireData = {
      patient_email,
      age,
      gender,
      height,
      weight,
      medical_conditions,
      allergies,
      dietary_preferences,
      goals,
      activity_level,
      medications,
      bmi: bmiRounded,
      updated_at: new Date().toISOString(),
    };

    // Check if questionnaire already exists
    const { data: existing, error: checkError } = await supabase
      .from("questionnaires")
      .select("id")
      .eq("patient_email", patient_email)
      .single();

    let result;
    if (existing) {
      // Update existing questionnaire
      const { data, error } = await supabase
        .from("questionnaires")
        .update(questionnaireData)
        .eq("patient_email", patient_email)
        .select()
        .single();

      if (error) {
        console.error("Error updating questionnaire:", error);
        console.error("Supabase error details:", {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        });
        return {
          success: false,
          error: error.message || "Failed to update questionnaire in Supabase",
        };
      }

      result = data;
    } else {
      // Insert new questionnaire
      const { data, error } = await supabase
        .from("questionnaires")
        .insert(questionnaireData)
        .select()
        .single();

      if (error) {
        console.error("Error inserting questionnaire:", error);
        console.error("Supabase error details:", {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        });
        return {
          success: false,
          error: error.message || "Failed to save questionnaire to Supabase",
        };
      }

      result = data;
    }

    // Transform Supabase response to Questionnaire type
    const questionnaire: Questionnaire = {
      patient_email: result.patient_email,
      age: result.age,
      gender: result.gender,
      height: result.height,
      weight: result.weight,
      medical_conditions: result.medical_conditions,
      allergies: result.allergies,
      dietary_preferences: result.dietary_preferences,
      goals: result.goals,
      activity_level: result.activity_level,
      medications: result.medications,
    };

    return {
      success: true,
      data: questionnaire,
      bmi: bmiRounded.toString(),
    };
  } catch (error: any) {
    console.error("Exception in saveQuestionnaire:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return {
      success: false,
      error: error.message || "An unexpected error occurred while saving to Supabase",
    };
  }
}

/**
 * Get questionnaire by patient email from Supabase
 */
export async function getQuestionnaireByEmail(
  email: string
): Promise<GetQuestionnaireResult> {
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
      .from("questionnaires")
      .select("*")
      .eq("patient_email", email)
      .single();

    if (error) {
      // If no rows found, that's okay - return success with no data
      if (error.code === "PGRST116") {
        return {
          success: true,
          data: undefined,
        };
      }

      console.error("Error fetching questionnaire:", error);
      return {
        success: false,
        error: error.message || "Failed to fetch questionnaire",
      };
    }

    if (!data) {
      return {
        success: true,
        data: undefined,
      };
    }

    // Transform Supabase response to Questionnaire type
    const questionnaire: Questionnaire = {
      patient_email: data.patient_email,
      age: data.age,
      gender: data.gender,
      height: data.height,
      weight: data.weight,
      medical_conditions: data.medical_conditions,
      allergies: data.allergies,
      dietary_preferences: data.dietary_preferences,
      goals: data.goals,
      activity_level: data.activity_level,
      medications: data.medications,
    };

    return {
      success: true,
      data: questionnaire,
    };
  } catch (error: any) {
    console.error("Exception in getQuestionnaireByEmail:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

