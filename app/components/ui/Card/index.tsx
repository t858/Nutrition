
import type { CardContentProps, CardProps } from "./@types";
const Card = ({ className, ...props }: CardProps) => (
  <div
    className={`rounded-xl border bg-card text-card-foreground shadow${
      className ? ` ${className}` : ""
    }`}
    {...props}
  />
);

const CardContent = ({ className, ...props }: CardContentProps) => (
  <div className={`p-6 ${className ? ` ${className}` : ""}`} {...props} />
);

export { Card, CardContent };
