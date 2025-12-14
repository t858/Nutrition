"use client";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/Card";
import type { TMyAppointmentsProps } from "./@types";
import type { Appointment } from "@/@types/app.types";

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    completed: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return colors[status] || colors.pending;
};

const getAppointmentTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    consultation: "Consultation",
    follow_up: "Follow-up",
    nutrition_plan: "Nutrition Plan",
    weight_management: "Weight Management",
  };
  return labels[type] || type;
};

export default function MyAppointments({
  appointments,
}: TMyAppointmentsProps) {
  if (appointments.length === 0) {
    return (
      <Card className="border border-emerald-200">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center h-32">
            <Calendar className="w-12 h-12 text-gray-300 mb-2" />
            <p className="text-gray-400 text-sm">No appointments found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment, index) => (
        <Card
          key={appointment.patient_email + index}
          className="border border-emerald-200 bg-white"
        >
          <CardContent className="p-4">
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
                  <span className="text-sm text-gray-600">
                    {getAppointmentTypeLabel(appointment.type || "consultation")}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-emerald-600 mt-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(appointment.appointment_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{appointment.appointment_time}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

