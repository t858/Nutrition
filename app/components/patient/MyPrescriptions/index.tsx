"use client";
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/Card";
import type { TMyPrescriptionsProps } from "./@types";

export default function MyPrescriptions({
  prescriptions,
}: TMyPrescriptionsProps) {
  return (
    <Card className="border border-emerald-200">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center h-96">
          <FileText className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-gray-600 font-medium mb-1">No prescriptions yet</p>
          <p className="text-gray-400 text-sm">
            Your nutrition plans will appear here
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

