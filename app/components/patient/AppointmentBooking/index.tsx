"use client";
import { useState } from "react";
import { Calendar, Clock, Info } from "lucide-react";
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
import type { TAppointmentBookingProps } from "./@types";
import MyAppointments from "../MyAppointments";
import type { Appointment } from "@/@types/app.types";

export default function AppointmentBooking({ user }: TAppointmentBookingProps) {
  const [appointmentType, setAppointmentType] = useState("consultation");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [notes, setNotes] = useState("");

  // Sample appointments data - will be replaced with actual data
  const appointments: Appointment[] = [
    {
      patient_email: user.email,
      patient_name: user.full_name,
      appointment_date: "2025-11-06",
      appointment_time: "10:00 AM",
      status: "completed",
      type: "consultation",
      notes: null,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Book Appointment Card */}
      <Card className="border border-emerald-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Book an Appointment
            </h3>
          </div>

          {/* Info Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-emerald-600 mt-0.5" />
              <p className="text-sm text-emerald-800">
                Note: The first consultation costs €100. Follow-up visits may
                vary.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Appointment Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Type
              </label>
              <Select
                value={appointmentType}
                onValueChange={setAppointmentType}
              >
                <SelectTrigger className="border-emerald-200">
                  <SelectValue placeholder="Select appointment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="check-up">Check-up</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Select Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border-emerald-200"
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <Textarea
                placeholder="Any specific concerns or questions?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="border-emerald-200"
              />
            </div>

            {/* Book Button */}
            <Button className="w-full bg-[#8CC63F] hover:bg-emerald-700 text-white">
              Book Appointment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* My Appointments */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          My Appointments
        </h3>
        <MyAppointments appointments={appointments} />
      </div>
    </div>
  );
}
