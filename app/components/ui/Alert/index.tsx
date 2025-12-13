import * as React from "react";
import type {
  AlertDescriptionProps,
  AlertDescriptionRef,
  AlertProps,
  AlertRef,
  AlertTitleProps,
  AlertTitleRef,
} from "./@types";

const getAlertClasses = (variant?: string, className?: string) => {
  const baseClasses = "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground";
  
  const variantClasses = {
    default: "bg-background text-foreground",
    destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
  };
  
  const variantClass = variantClasses[variant as keyof typeof variantClasses] || variantClasses.default;
  
  return `${baseClasses} ${variantClass}${className ? ` ${className}` : ""}`;
};

const Alert = React.forwardRef<AlertRef, AlertProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={getAlertClasses(variant, className)}
      {...props}
    />
  )
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<AlertTitleRef, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={`mb-1 font-medium leading-none tracking-tight${className ? ` ${className}` : ""}`}
      {...props}
    />
  )
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  AlertDescriptionRef,
  AlertDescriptionProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`text-sm [&_p]:leading-relaxed${className ? ` ${className}` : ""}`}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
