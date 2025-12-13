export interface TAdminOverviewProps {
  // Add props as needed
}

export interface TAdminMetricCard {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}
