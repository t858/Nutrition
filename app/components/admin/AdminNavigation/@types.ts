export type TAdminNavigationTab = "overview" | "patients" | "appointments" | "prescriptions" | "invoices" | "messages";

export interface TAdminNavigationProps {
  activeTab: TAdminNavigationTab;
  onTabChange: (tab: TAdminNavigationTab) => void;
}

