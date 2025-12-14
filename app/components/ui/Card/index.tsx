
import type { CardContentProps, CardProps, CardHeaderProps } from "./@types";

const Card = ({ className, ...props }: CardProps) => (
  <div
    className={`rounded-xl border bg-card text-card-foreground shadow${
      className ? ` ${className}` : ""
    }`}
    {...props}
  />
);

const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className ? ` ${className}` : ""}`} {...props} />
);

const CardContent = ({ className, ...props }: CardContentProps) => (
  <div className={`p-6 pt-0 ${className ? ` ${className}` : ""}`} {...props} />
);

export { Card, CardHeader, CardContent };
