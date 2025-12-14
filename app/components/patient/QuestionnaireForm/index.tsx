"use client";
import { useState, useEffect } from "react";
import { ClipboardCheck, Save, Loader2, Calculator, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Textarea } from "@/app/components/ui/TextArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/Select";
import { Alert, AlertDescription } from "@/app/components/ui/Alert";
import type { TQuestionnaireFormProps, TQuestionnaireFormState } from "./@types";
import { saveQuestionnaire, getQuestionnaireByEmail } from "@/app/actions/questionnaires";
import { toast } from "sonner";

export default function QuestionnaireForm({
  user,
  existingData,
  onSaveSuccess,
}: TQuestionnaireFormProps & { onSaveSuccess?: (data: Questionnaire) => void }) {
  // Initialize form state with existing data or defaults
  const [formData, setFormData] = useState<TQuestionnaireFormState>({
    patient_email: user.email,
    age: existingData?.age?.toString() || "",
    gender: existingData?.gender || "male",
    height: existingData?.height?.toString() || "",
    weight: existingData?.weight?.toString() || "",
    medical_conditions: existingData?.medical_conditions || "",
    allergies: existingData?.allergies || "",
    dietary_preferences: existingData?.dietary_preferences || "",
    goals: existingData?.goals || "",
    activity_level: existingData?.activity_level || "moderate",
    medications: existingData?.medications || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!existingData);
  const [bmi, setBmi] = useState<number | null>(null);
  const [saveResult, setSaveResult] = useState<{
    success: boolean;
    message: string;
    data?: Questionnaire;
    error?: string;
    timestamp?: string;
  } | null>(null);

  // Fetch existing data if not provided - RUNS ON MOUNT
  useEffect(() => {
    const fetchExistingData = async () => {
      if (!existingData) {
        try {
          setIsFetching(true);
          console.log("🔄 Initial fetch: Loading existing data for user...");
          const result = await getQuestionnaireByEmail(user.email);
          
          console.log("📥 Initial fetch result:", result);
          
          if (result.success && result.data) {
            const data = result.data;
            console.log("📊 Found existing data, populating form");
            setFormData({
              patient_email: user.email,
              age: data.age?.toString() || "",
              gender: data.gender || "male",
              height: data.height?.toString() || "",
              weight: data.weight?.toString() || "",
              medical_conditions: data.medical_conditions || "",
              allergies: data.allergies || "",
              dietary_preferences: data.dietary_preferences || "",
              goals: data.goals || "",
              activity_level: data.activity_level || "moderate",
              medications: data.medications || "",
            });
          } else {
            console.log("📭 No existing data found, starting with empty form");
          }
        } catch (error) {
          console.error("❌ Error in initial fetch:", error);
        } finally {
          setIsFetching(false);
        }
      }
    };

    fetchExistingData();
  }, [user.email, existingData]);

  // Calculate BMI when height or weight changes
  useEffect(() => {
    if (formData.height && formData.weight) {
      const height = parseFloat(formData.height);
      const weight = parseFloat(formData.weight);
      
      if (!isNaN(height) && !isNaN(weight) && height > 0 && weight > 0) {
        const heightInMeters = height / 100;
        const calculatedBmi = weight / (heightInMeters * heightInMeters);
        setBmi(parseFloat(calculatedBmi.toFixed(1)));
      } else {
        setBmi(null);
      }
    } else {
      setBmi(null);
    }
  }, [formData.height, formData.weight]);

  const getBmiCategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { label: "Underweight", color: "text-yellow-600", bg: "bg-yellow-50" };
    if (bmiValue < 25) return { label: "Normal weight", color: "text-green-600", bg: "bg-green-50" };
    if (bmiValue < 30) return { label: "Overweight", color: "text-orange-600", bg: "bg-orange-50" };
    return { label: "Obese", color: "text-red-600", bg: "bg-red-50" };
  };

  const handleInputChange = (field: keyof TQuestionnaireFormState, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSelectChange = (field: keyof TQuestionnaireFormState, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous results
    setSaveResult(null);

    // Validate required fields
    if (!formData.age || !formData.height || !formData.weight) {
      const error = "Please fill in all required fields (Age, Height, Weight)";
      toast.error(error);
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });

      const result = await saveQuestionnaire(formDataToSend);

      if (result.success) {
        setSaveResult({
          success: true,
          message: "✅ Health profile saved successfully!",
          data: result.data,
          timestamp: new Date().toLocaleString()
        });

        toast.success("Health profile saved successfully!");

        // Show BMI info
        if (result.bmi) {
          const bmiValue = parseFloat(result.bmi);
          const category = getBmiCategory(bmiValue);

          toast.info(
            `Your BMI: ${result.bmi} (${category.label})`,
            {
              duration: 5000,
              icon: <Calculator className="w-4 h-4" />
            }
          );
        }

        // Notify parent component
        if (onSaveSuccess && result.data) {
          onSaveSuccess(result.data);
        }
      } else {
        setSaveResult({
          success: false,
          message: "❌ Failed to save health profile",
          error: result.error,
          timestamp: new Date().toLocaleString()
        });

        toast.error(result.error || "Failed to save health profile");
      }
    } catch (error: unknown) {
      console.error("Exception saving questionnaire:", error);

      setSaveResult({
        success: false,
        message: "❌ An unexpected error occurred",
        error: error.message,
        timestamp: new Date().toLocaleString()
      });

      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <Card className="border border-emerald-200">
        <CardContent className="p-6">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <span className="ml-3 text-gray-600">Loading health profile from Supabase...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-emerald-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Health Profile Questionnaire
            </h3>
            {existingData && (
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                Existing Profile
              </span>
            )}
          </div>
          
        </div>

        {/* Save Result Display */}
        {saveResult && (
          <Alert className={`mb-6 ${saveResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            {saveResult.success ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={saveResult.success ? 'text-green-800' : 'text-red-800'}>
              <div className="font-semibold">{saveResult.message}</div>
              {saveResult.timestamp && (
                <div className="text-xs mt-1">Time: {saveResult.timestamp}</div>
              )}
              {saveResult.error && (
                <div className="text-xs mt-1">Error: {saveResult.error}</div>
              )}
              {saveResult.data && (
                <div className="mt-2 text-xs">
                  <details>
                    <summary className="cursor-pointer font-medium">View saved data</summary>
                    <pre className="mt-2 p-2 bg-gray-900 text-gray-100 rounded text-xs overflow-auto">
                      {JSON.stringify(saveResult.data, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}


        {/* BMI Calculator */}
        {bmi !== null && (
          <div className={`mb-6 p-4 border rounded-lg ${getBmiCategory(bmi).bg}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Calculator className="w-4 h-4" />
                  <h4 className="text-sm font-medium">BMI Calculator</h4>
                </div>
                <p className="text-2xl font-bold">{bmi}</p>
                <p className={`text-sm font-medium ${getBmiCategory(bmi).color}`}>
                  {getBmiCategory(bmi).label}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs">Height: <span className="font-medium">{formData.height} cm</span></p>
                <p className="text-xs">Weight: <span className="font-medium">{formData.weight} kg</span></p>
                <p className="text-xs mt-1">Based on your input</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">
              Basic Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  required
                  min="1"
                  max="120"
                  className="border-emerald-200"
                  disabled={isLoading}
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                >
                  <SelectTrigger className="border-emerald-200">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  required
                  min="50"
                  max="250"
                  className="border-emerald-200"
                  disabled={isLoading}
                  placeholder="Height in centimeters"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  required
                  min="20"
                  max="300"
                  className="border-emerald-200"
                  disabled={isLoading}
                  placeholder="Weight in kilograms"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Level
                </label>
                <Select
                  value={formData.activity_level}
                  onValueChange={(value) => handleSelectChange("activity_level", value)}
                >
                  <SelectTrigger className="border-emerald-200">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                    <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="very_active">Very Active (hard exercise daily)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">
              Health Information
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Conditions
                </label>
                <Textarea
                  placeholder="Any existing medical conditions (e.g., diabetes, hypertension, heart disease)..."
                  value={formData.medical_conditions}
                  onChange={(e) => handleInputChange("medical_conditions", e.target.value)}
                  rows={3}
                  className="border-emerald-200"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Food Allergies
                </label>
                <Textarea
                  placeholder="List any food allergies (e.g., peanuts, shellfish, dairy)..."
                  value={formData.allergies}
                  onChange={(e) => handleInputChange("allergies", e.target.value)}
                  rows={3}
                  className="border-emerald-200"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Medications
                </label>
                <Textarea
                  placeholder="List current medications (including dosage if known)..."
                  value={formData.medications}
                  onChange={(e) => handleInputChange("medications", e.target.value)}
                  rows={3}
                  className="border-emerald-200"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Nutrition Goals */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">
              Nutrition Goals
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Preferences
                </label>
                <Input
                  placeholder="e.g., Vegetarian, Vegan, Keto, Gluten-Free, Halal, Kosher..."
                  value={formData.dietary_preferences}
                  onChange={(e) => handleInputChange("dietary_preferences", e.target.value)}
                  className="border-emerald-200"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Health & Nutrition Goals
                </label>
                <Textarea
                  placeholder="What do you want to achieve? (e.g., weight loss, muscle gain, better digestion, manage diabetes, increase energy, improve sleep, reduce inflammation)"
                  value={formData.goals}
                  onChange={(e) => handleInputChange("goals", e.target.value)}
                  rows={4}
                  className="border-emerald-200"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving & Verifying Data...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {existingData ? "Update Health Profile" : "Save Health Profile"}
                </>
              )}
            </Button>
            
            <div className="mt-3 text-xs text-gray-500 text-center">
              <p>Your information is stored securely in Supabase and used only for personalized nutrition advice.</p>
              {existingData && (
                <p className="mt-1 text-gray-400">
                  Profile exists in Supabase database
                </p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
