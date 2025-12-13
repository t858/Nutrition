"use client";
import { useState } from "react";
import { Users, Search } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import type { TPatientManagementProps } from "./@types";

export default function PatientManagement({}: TPatientManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Card className="border border-purple-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Patient Directory
            </h3>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-200"
            />
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center h-64">
          <Users className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-gray-400 text-sm">No patients found</p>
        </div>
      </CardContent>
    </Card>
  );
}

