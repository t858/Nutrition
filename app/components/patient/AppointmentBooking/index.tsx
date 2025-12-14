"use client";
import { useState, useEffect } from "react";
import { Calendar, Clock, Info, Loader2, AlertCircle, CheckCircle } from "lucide-react";
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
import type { TAppointmentBookingProps } from "./@types";
import MyAppointments from "../MyAppointments";
import type { Appointment } from "@/@types/app.types";
import { saveAppointment, getAppointmentsByEmail } from "@/app/actions/appointments";
import { toast } from "sonner";

export default function AppointmentBooking({ user }: TAppointmentBookingProps) {
  const [appointmentType, setAppointmentType] = useState("consultation");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingAppointments, setIsFetchingAppointments] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [saveResult, setSaveResult] = useState<{
    success: boolean;
    message: string;
    error?: string;
  } | null>(null);

  // Fetch existing appointments on mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsFetchingAppointments(true);
        const result = await getAppointmentsByEmail(user.email);
        if (result.success && result.data) {
          setAppointments(result.data);
        } else {
          console.error("Failed to fetch appointments:", result.error);
        }
      } catch (error) {
        console.error("Exception fetching appointments:", error);
      } finally {
        setIsFetchingAppointments(false);
      }
    };

    if (user.email) {
      fetchAppointments();
    }
  }, [user.email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous results
    setSaveResult(null);

    // Validate required fields
    if (!selectedDate || !selectedTime) {
      const error = "Please select both date and time for your appointment";
      toast.error(error);
      setSaveResult({
        success: false,
        message: "Validation Error",
        error,
      });
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // Prepare appointment data
      formDataToSend.append("patient_email", user.email);
      formDataToSend.append("patient_name", user.full_name);
      formDataToSend.append("appointment_date", selectedDate);
      formDataToSend.append("appointment_time", selectedTime);
      formDataToSend.append("type", appointmentType);
      if (notes.trim()) {
        formDataToSend.append("notes", notes.trim());
      }

      console.log("📅 Booking appointment with data:", {
        patient_email: user.email,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        type: appointmentType,
        notes: notes.trim() || null,
      });

      const result = await saveAppointment(formDataToSend);

      console.log("📥 Save appointment result:", result);

      if (result.success) {
        setSaveResult({
          success: true,
          message: "✅ Appointment booked successfully!",
        });

        toast.success("Appointment booked successfully!");

        // Clear form
        setSelectedDate("");
        setSelectedTime("");
        setNotes("");

        // Refresh appointments list
        const appointmentsResult = await getAppointmentsByEmail(user.email);
        if (appointmentsResult.success && appointmentsResult.data) {
          setAppointments(appointmentsResult.data);
        }
      } else {
        setSaveResult({
          success: false,
          message: "❌ Failed to book appointment",
          error: result.error,
        });

        toast.error(result.error || "Failed to book appointment");
      }
    } catch (error: any) {
      console.error("Exception booking appointment:", error);
      setSaveResult({
        success: false,
        message: "❌ Exception occurred",
        error: error.message || "An unexpected error occurred",
      });

      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
            {appointments.length > 0 && (
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                {appointments.length} appointment{appointments.length !== 1 ? 's' : ''} booked
              </span>
            )}
          </div>

          {/* Info Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-emerald-600 mt-0.5" />
              <p className="text-sm text-emerald-800">
                Note: The first consultation costs €100. Follow-up visits may vary.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Appointment Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Type <span className="text-red-500">*</span>
              </label>
              <Select
                value={appointmentType}
                onValueChange={setAppointmentType}
                disabled={isLoading}
              >
                <SelectTrigger className="border-emerald-200">
                  <SelectValue placeholder="Select appointment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="follow_up">Follow-up</SelectItem>
                  <SelectItem value="nutrition_plan">Nutrition Plan</SelectItem>
                  <SelectItem value="weight_management">Weight Management</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Select Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]} // Today's date as minimum
                  className="border-emerald-200"
                  disabled={isLoading}
                />
              </div>

              {/* Select Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time <span className="text-red-500">*</span>
                </label>
                <Select
                  value={selectedTime}
                  onValueChange={setSelectedTime}
                  disabled={isLoading}
                >
                  <SelectTrigger className="border-emerald-200">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="09:30">9:30 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="10:30">10:30 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="11:30">11:30 AM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="14:30">2:30 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="15:30">3:30 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="16:30">4:30 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                disabled={isLoading}
              />
            </div>

            {/* Save Result Display */}
            {saveResult && (
              <Alert className={`mb-4 ${saveResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                {saveResult.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={saveResult.success ? 'text-green-800' : 'text-red-800'}>
                  <div className="font-semibold">{saveResult.message}</div>
                  {saveResult.error && (
                    <div className="text-xs mt-1">{saveResult.error}</div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {/* Book Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#8CC63F] hover:bg-emerald-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Booking Appointment...
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* My Appointments */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          My Appointments
          {appointments.length > 0 && (
            <span className="text-sm text-gray-500 ml-2">
              ({appointments.length} appointment{appointments.length !== 1 ? 's' : ''})
            </span>
          )}
        </h3>
        {isFetchingAppointments ? (
          <Card className="border border-emerald-200">
            <CardContent className="p-6">
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
                <span className="ml-3 text-gray-600">Loading appointments...</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <MyAppointments appointments={appointments} />
        )}
      </div>
    </div>
  );
}