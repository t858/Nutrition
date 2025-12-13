"use client";
import {
  LayoutGrid,
  Users,
  Calendar,
  FileText,
  DollarSign,
  MessageCircle,
} from "lucide-react";
import type { TAdminNavigationProps } from "./@types";

const tabs = [
  { id: "overview" as const, label: "Overview", icon: LayoutGrid },
  { id: "patients" as const, label: "Patients", icon: Users },
  { id: "appointments" as const, label: "Appointments", icon: Calendar },
  { id: "prescriptions" as const, label: "Prescriptions", icon: FileText },
  { id: "invoices" as const, label: "Invoices", icon: DollarSign },
  { id: "messages" as const, label: "Messages", icon: MessageCircle },
];

export default function AdminNavigation({
  activeTab,
  onTabChange,
}: TAdminNavigationProps) {
  return (
    <nav className=" my-3 rounded-lg border border-gray-200 bg-white w-fit">
      <div className="flex space-x-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                  flex items-center gap-2 px-4 py-3 cursor-pointer text-sm font-medium transition-colors
                   whitespace-nowrap
                  ${
                    isActive
                      ? "border-purple-600 bg-purple-50 text-purple-700"
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
    </nav>
  );
}
