"use client";
import { useState, useEffect } from "react";
import { ClipboardCheck, Save } from "lucide-react";
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
import type {
  TQuestionnaireFormProps,
  TQuestionnaireFormState,
} from "./@types";

export default function QuestionnaireForm({
  user,
  existingData,
}: TQuestionnaireFormProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <Card className="border border-emerald-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <ClipboardCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Health Profile Questionnaire
          </h3>
        </div>

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
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  required
                  className="border-emerald-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData({ ...formData, gender: value as any })
                  }
                >
                  <SelectTrigger className="border-emerald-200">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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
                  onChange={(e) =>
                    setFormData({ ...formData, height: e.target.value })
                  }
                  required
                  className="border-emerald-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  required
                  className="border-emerald-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Level
                </label>
                <Select
                  value={formData.activity_level}
                  onValueChange={(value) =>
                    setFormData({ ...formData, activity_level: value as any })
                  }
                >
                  <SelectTrigger className="border-emerald-200">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="very_active">Very Active</SelectItem>
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
                  placeholder="Any existing medical conditions..."
                  value={formData.medical_conditions}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      medical_conditions: e.target.value,
                    })
                  }
                  rows={3}
                  className="border-emerald-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Food Allergies
                </label>
                <Textarea
                  placeholder="List any food allergies..."
                  value={formData.allergies}
                  onChange={(e) =>
                    setFormData({ ...formData, allergies: e.target.value })
                  }
                  rows={3}
                  className="border-emerald-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Medications
                </label>
                <Textarea
                  placeholder="List current medications..."
                  value={formData.medications}
                  onChange={(e) =>
                    setFormData({ ...formData, medications: e.target.value })
                  }
                  rows={3}
                  className="border-emerald-200"
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
                  placeholder="e.g., Vegetarian, Vegan, Keto..."
                  value={formData.dietary_preferences}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dietary_preferences: e.target.value,
                    })
                  }
                  className="border-emerald-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Goals
                </label>
                <Textarea
                  placeholder="What do you want to achieve? (weight loss, muscle gain, better health, etc.)"
                  value={formData.goals}
                  onChange={(e) =>
                    setFormData({ ...formData, goals: e.target.value })
                  }
                  rows={4}
                  className="border-emerald-200"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-[#8CC63F] hover:bg-emerald-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
