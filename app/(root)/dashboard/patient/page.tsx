"use client";
import { useState } from "react";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardHeader from "@/app/components/layout/DashboardHeader";
import PatientNavigation from "@/app/components/patient/PatientNavigation";
import PatientOverview from "@/app/components/patient/PatientOverview";
import AppointmentBooking from "@/app/components/patient/AppointmentBooking";
import MyPrescriptions from "@/app/components/patient/MyPrescriptions";
import QuestionnaireForm from "@/app/components/patient/QuestionnaireForm";
import PatientChat from "@/app/components/patient/PatientChat";
import type { TPatientNavigationTab } from "@/app/components/patient/PatientNavigation/@types";

export default function PatientDashboardPage() {
  const { user, role, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] =
    useState<TPatientNavigationTab>("overview");

  useEffect(() => {
    if (!isLoading && role !== "patient") {
      router.push("/dashboard/admin");
    }
  }, [role, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (role !== "patient") {
    return null;
  }

  // Convert user to TUser format
  const tUser = user
    ? {
        email: user.email || "",
        full_name: user.name || "",
        role: role || "patient",
        phone: undefined,
        avatar_url: user.image || null,
      }
    : null;

  const renderContent = () => {
    if (!tUser) return null;

    switch (activeTab) {
      case "overview":
        return (
          <PatientOverview
            onTabChange={(tab) => setActiveTab(tab as TPatientNavigationTab)}
          />
        );
      case "appointments":
        return <AppointmentBooking user={tUser} />;
      case "prescriptions":
        return <MyPrescriptions prescriptions={[]} />;
      case "health-profile":
        return <QuestionnaireForm user={tUser} />;
      case "messages":
        return <PatientChat />;
      default:
        return <PatientOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        title="My Dashboard"
        subtitle="Your nutrition journey"
      />
      <PatientNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || "User"}!
          </h2>
          <p className="text-gray-600">
            Manage your nutrition journey all in one place.
          </p>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
