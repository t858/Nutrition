import type { Questionnaire, TUser } from "@/@types/app.types";

export interface TQuestionnaireFormProps {
  user: TUser;
  existingData?: Questionnaire | null;
}

export interface TQuestionnaireFormState {
  patient_email: string;
  age: string;
  gender: Questionnaire["gender"];
  height: string;
  weight: string;
  medical_conditions: string;
  allergies: string;
  dietary_preferences: string;
  goals: string;
  activity_level: Questionnaire["activity_level"];
  medications: string;
}

export type TQuestionnairePayload = Omit<
  Questionnaire,
  "id" | "created_date" | "updated_date"
>;
