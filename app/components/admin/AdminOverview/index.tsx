"use client";
import {
  Users,
  Calendar,
  FileText,
  DollarSign,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/Card";
import type { TAdminOverviewProps, TAdminMetricCard } from "./@types";

const metrics: TAdminMetricCard[] = [
  {
    title: "Pazienti Totali",
    value: 0,
    subtitle: "+12%",
    icon: Users,
    iconColor: "purple",
    trend: { value: "+12%", isPositive: true },
  },
  {
    title: "Appuntamenti di Oggi",
    value: 0,
    subtitle: "0 in sospeso",
    icon: Calendar,
    iconColor: "blue",
  },
  {
    title: "Prescrizioni Attive",
    value: 0,
    subtitle: "Questo mese",
    icon: FileText,
    iconColor: "green",
  },
  {
    title: "Entrate Totali",
    value: "$0.00",
    subtitle: "+8%",
    icon: DollarSign,
    iconColor: "emerald",
    trend: { value: "+8%", isPositive: true },
  },
];

const getIconColorClasses = (color: string) => {
  const colors: Record<string, string> = {
    purple: "bg-purple-100 text-purple-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    emerald: "bg-emerald-100 text-emerald-600",
  };
  return colors[color] || colors.purple;
};

export default function AdminOverview({}: TAdminOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="border border-gray-200">
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="flex flex-col items-start gap-2">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center flex-col justify-center ${getIconColorClasses(
                        metric.iconColor
                      )}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-gray-600">
                      {metric.title}
                    </p>
                    {metric.subtitle && (
                      <p
                        className={`text-xs mt-1 ${
                          metric.trend?.isPositive
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {metric.subtitle}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {metric.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Today's Appointments and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Appuntamenti di Oggi
              </h3>
            </div>
            <div className="flex items-center justify-center h-32">
              <p className="text-gray-400 text-sm">
                Nessun appuntamento programmato per oggi
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Attività Recente
              </h3>
            </div>
            <div className="flex items-center justify-center h-32">
              <p className="text-gray-400 text-sm">No recent activity</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
