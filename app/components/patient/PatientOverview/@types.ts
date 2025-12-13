export interface TPatientOverviewProps {
  onTabChange?: (tab: string) => void;
}

export interface TPatientSummaryCard {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

