"use client";
import { useState, useEffect } from "react";
import {
  Calendar,
  FileText,
  ClipboardCheck,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { useAuth } from "@/lib/hooks/use-auth";
import { getQuestionnaireByEmail } from "@/app/actions/questionnaires";
import { getAppointmentCount } from "@/app/actions/appointments";
import type { TPatientOverviewProps, TPatientSummaryCard } from "./@types";
import type { Questionnaire } from "@/@types/app.types";

export default function PatientOverview({
  onTabChange,
}: TPatientOverviewProps) {
  const { user } = useAuth();
  const [healthProfileStatus, setHealthProfileStatus] = useState<{
    completed: boolean;
    data?: Questionnaire;
    loading: boolean;
  }>({
    completed: false,
    loading: true,
  });
  const [appointmentCount, setAppointmentCount] = useState<number>(0);

  // Check if user has completed health profile and get appointment count
  useEffect(() => {
    const checkUserData = async () => {
      if (!user?.email) return;

      try {
        // Check health profile status
        const profileResult = await getQuestionnaireByEmail(user.email);
        if (profileResult.success && profileResult.data) {
          setHealthProfileStatus({
            completed: true,
            data: profileResult.data,
            loading: false,
          });
        } else {
          setHealthProfileStatus({
            completed: false,
            loading: false,
          });
        }

        // Get appointment count
        const appointmentResult = await getAppointmentCount(user.email);
        if (appointmentResult.success) {
          setAppointmentCount(appointmentResult.count || 0);
        }
      } catch (error) {
        console.error("Error checking user data:", error);
        setHealthProfileStatus({
          completed: false,
          loading: false,
        });
        setAppointmentCount(0);
      }
    };

    checkUserData();
  }, [user?.email]);

  const summaryCards: TPatientSummaryCard[] = [
    {
      title: "Total Appointments",
      value: appointmentCount,
      subtitle: `${appointmentCount} total booked`,
      icon: Calendar,
      clickable: true,
      onClick: () => onTabChange?.("appointments"),
    },
    {
      title: "Prescriptions",
      value: 0,
      subtitle: "Active nutrition plans",
      icon: FileText,
    },
    {
      title: "Health Profile",
      value: healthProfileStatus.loading ? "—" : (healthProfileStatus.completed ? "✓" : "—"),
      subtitle: healthProfileStatus.loading
        ? "Checking..."
        : (healthProfileStatus.completed ? "Completed" : "Not completed"),
      icon: healthProfileStatus.completed ? CheckCircle : ClipboardCheck,
      statusColor: healthProfileStatus.completed ? "text-green-600" : "text-gray-600",
      clickable: true,
      onClick: () => onTabChange?.("health-profile"),
    },
  ];

  const quickActions = [
    {
      label: "Book Appointment",
      icon: Calendar,
      variant: "default" as const,
      onClick: () => onTabChange?.("appointments"),
    },
    {
      label: "Chat with Us",
      icon: MessageCircle,
      variant: "outline" as const,
      onClick: () => onTabChange?.("messages"),
    },
    {
      label: healthProfileStatus.completed ? "Update Profile" : "Complete Profile",
      icon: healthProfileStatus.completed ? CheckCircle : ClipboardCheck,
      variant: "outline" as const,
      onClick: () => onTabChange?.("health-profile"),
    },
    {
      label: "View Plans",
      icon: FileText,
      variant: "outline" as const,
      onClick: () => onTabChange?.("prescriptions"),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card
              key={index}
              className={`border border-emerald-200 bg-white ${
                card.clickable ? "cursor-pointer hover:shadow-md transition-shadow" : ""
              }`}
              onClick={card.clickable ? card.onClick : undefined}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`w-5 h-5 ${card.statusColor || "text-emerald-600"}`} />
                      {card.clickable && (
                        <AlertCircle className="w-4 h-4 text-gray-400 ml-auto" />
                      )}
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      {card.title}
                    </p>
                    <p className={`text-2xl font-bold ${card.statusColor || "text-emerald-600"} mb-1`}>
                      {card.value}
                    </p>
                    <p className="text-xs text-gray-600">{card.subtitle}</p>
                    {card.clickable && (
                      <p className="text-xs text-emerald-600 mt-2 font-medium">
                        Click to {healthProfileStatus.completed ? "view/update" : "complete"}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                onClick={action.onClick}
                variant={action.variant}
                className={
                  action.variant === "default"
                    ? "bg-[#8CC63F] hover:bg-emerald-700 text-white"
                    : "border-emerald-200 text-gray-700 hover:bg-emerald-50"
                }
              >
                <Icon className="w-4 h-4" />
                {action.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
