"use client";
import {
  TrendingUp,
  Calendar,
  FileText,
  ClipboardCheck,
  MessageCircle,
} from "lucide-react";
import type { TPatientNavigationProps } from "./@types";

const tabs = [
  { id: "overview" as const, label: "Overview", icon: TrendingUp },
  { id: "appointments" as const, label: "Appointments", icon: Calendar },
  { id: "prescriptions" as const, label: "Prescriptions", icon: FileText },
  {
    id: "health-profile" as const,
    label: "Health Profile",
    icon: ClipboardCheck,
  },
  { id: "messages" as const, label: "Messages", icon: MessageCircle },
];

export default function PatientNavigation({
  activeTab,
  onTabChange,
}: TPatientNavigationProps) {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors
                  border-b-2 whitespace-nowrap
                  ${
                    isActive
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

