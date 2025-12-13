export type TPatientNavigationTab =
  | "overview"
  | "appointments"
  | "prescriptions"
  | "health-profile"
  | "messages";

export interface TPatientNavigationProps {
  activeTab: TPatientNavigationTab;
  onTabChange: (tab: TPatientNavigationTab) => void;
}

