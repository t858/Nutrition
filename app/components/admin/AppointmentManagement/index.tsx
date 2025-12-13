"use client";
import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import type {
  TAppointmentManagementProps,
  TAppointmentFilter,
} from "./@types";

const filters: { id: TAppointmentFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "confirmed", label: "Confirmed" },
  { id: "completed", label: "Completed" },
];

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    completed: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return colors[status] || colors.pending;
};

export default function AppointmentManagement({}: TAppointmentManagementProps) {
  const [activeFilter, setActiveFilter] = useState<TAppointmentFilter>("all");

  // Sample appointment data
  const appointments = [
    {
      id: "1",
      patientName: "gerald egbuna",
      type: "Consultation",
      date: "2025-11-06",
      time: "10:00 AM",
      status: "completed" as const,
    },
  ];

  return (
    <Card className="border border-purple-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Appointment Management
            </h3>
          </div>
          <div className="flex gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                className={
                  activeFilter === filter.id
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "border-gray-200"
                }
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Calendar className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-400 text-sm">No appointments found</p>
            </div>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border border-purple-100 rounded-lg p-4 bg-white"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {appointment.type}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {appointment.patientName}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-purple-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

