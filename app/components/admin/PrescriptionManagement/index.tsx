"use client";
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import type { TPrescriptionManagementProps } from "./@types";

export default function PrescriptionManagement({}: TPrescriptionManagementProps) {
  return (
    <Card className="border border-purple-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Prescription Management
            </h3>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            + Create Prescription
          </Button>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center h-64">
          <FileText className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-gray-400 text-sm">No prescriptions yet</p>
        </div>
      </CardContent>
    </Card>
  );
}

