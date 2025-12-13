"use client";

import * as React from "react";
import type {
  TabsContentProps,
  TabsContentRef,
  TabsListProps,
  TabsListRef,
  TabsTriggerProps,
  TabsTriggerRef,
} from "./@types";

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs");
  }
  return context;
};

interface TabsProps {
  defaultValue?: string;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  className,
  value: controlledValue,
  onValueChange,
  children,
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      {children}
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef<TabsListRef, TabsListProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground${
        className ? ` ${className}` : ""
      }`}
      role="tablist"
      {...props}
    />
  )
);
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<TabsTriggerRef, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = useTabsContext();
    const isActive = selectedValue === value;

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
          isActive ? "bg-background text-foreground shadow" : ""
        }${className ? ` ${className}` : ""}`}
        role="tab"
        aria-selected={isActive}
        onClick={() => onValueChange(value)}
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<TabsContentRef, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const { value: selectedValue } = useTabsContext();

    if (selectedValue !== value) return null;

    return (
      <div
        ref={ref}
        className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2${
          className ? ` ${className}` : ""
        }`}
        role="tabpanel"
        {...props}
      />
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
