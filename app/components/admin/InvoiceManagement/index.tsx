"use client";
import { DollarSign } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import type { TInvoiceManagementProps } from "./@types";

const summaryCards = [
  {
    title: "Total Revenue",
    value: "$0.00",
    color: "text-green-600",
  },
  {
    title: "Pending",
    value: "$0.00",
    color: "text-orange-600",
  },
  {
    title: "Total Invoices",
    value: "0",
    color: "text-purple-600",
  },
];

export default function InvoiceManagement({}: TInvoiceManagementProps) {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card, index) => (
          <Card key={index} className="border border-gray-200">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-600 mb-2">
                {card.title}
              </p>
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Invoice Management Card */}
      <Card className="border border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Invoice Management
              </h3>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              + Create Invoice
            </Button>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center h-64">
            <DollarSign className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-400 text-sm">No invoices yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

