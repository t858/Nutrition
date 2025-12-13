"use client";
import {
  Calendar,
  FileText,
  ClipboardCheck,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import type { TPatientOverviewProps, TPatientSummaryCard } from "./@types";

const summaryCards: TPatientSummaryCard[] = [
  {
    title: "Total Appointments",
    value: 1,
    subtitle: "0 upcoming",
    icon: Calendar,
  },
  {
    title: "Prescriptions",
    value: 0,
    subtitle: "Active nutrition plans",
    icon: FileText,
  },
  {
    title: "Health Profile",
    value: "—",
    subtitle: "Not completed",
    icon: ClipboardCheck,
  },
];

export default function PatientOverview({
  onTabChange,
}: TPatientOverviewProps) {
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
      label: "Update Profile",
      icon: ClipboardCheck,
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
            <Card key={index} className="border border-emerald-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-emerald-600 mb-1">
                      {card.value}
                    </p>
                    <p className="text-xs text-gray-600">{card.subtitle}</p>
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
