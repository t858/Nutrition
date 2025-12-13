export interface TInvoiceManagementProps {
  // Add props as needed
}

export interface TInvoiceSummary {
  totalRevenue: string;
  pending: string;
  totalInvoices: number;
}

export interface TInvoice {
  id: string;
  patientName: string;
  amount: string;
  status: "paid" | "pending" | "overdue";
  dueDate: Date;
  createdAt: Date;
}
