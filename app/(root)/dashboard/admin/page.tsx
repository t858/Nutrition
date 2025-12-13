"use client";
import { useState } from "react";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardHeader from "@/app/components/layout/DashboardHeader";
import AdminNavigation from "@/app/components/admin/AdminNavigation";
import AdminOverview from "@/app/components/admin/AdminOverview";
import PatientManagement from "@/app/components/admin/PatientManagement";
import AppointmentManagement from "@/app/components/admin/AppointmentManagement";
import PrescriptionManagement from "@/app/components/admin/PrescriptionManagement";
import InvoiceManagement from "@/app/components/admin/InvoiceManagement";
import AdminChat from "@/app/components/admin/AdminChat";
import type { TAdminNavigationTab } from "@/app/components/admin/AdminNavigation/@types";

export default function AdminDashboardPage() {
  const { user, role, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TAdminNavigationTab>("overview");

  useEffect(() => {
    if (!isLoading && role !== "admin") {
      router.push("/dashboard/patient");
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

  if (role !== "admin") {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverview />;
      case "patients":
        return <PatientManagement />;
      case "appointments":
        return <AppointmentManagement />;
      case "prescriptions":
        return <PrescriptionManagement />;
      case "invoices":
        return <InvoiceManagement />;
      case "messages":
        return <AdminChat />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        title="Admin Dashboard"
        subtitle="Manage patients, appointments, and prescriptions"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        {renderContent()}
      </div>
    </div>
  );
}
