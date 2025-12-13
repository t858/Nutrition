"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import type {
  SelectContentProps,
  SelectContentRef,
  SelectItemProps,
  SelectItemRef,
  SelectLabelProps,
  SelectLabelRef,
  SelectScrollButtonProps,
  SelectScrollButtonRef,
  SelectSeparatorProps,
  SelectSeparatorRef,
  SelectTriggerProps,
  SelectTriggerRef,
} from "./@types";

interface SelectContextType {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined);

const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a Select");
  }
  return context;
};

interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ value: controlledValue, defaultValue, onValueChange, children }) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const [open, setOpen] = React.useState(false);
  const selectRef = React.useRef<HTMLDivElement>(null);
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  
  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <SelectContext.Provider value={{ value, onValueChange: handleValueChange, open, setOpen }}>
      <div ref={selectRef} className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);
SelectGroup.displayName = "SelectGroup";

const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => {
  const { value } = useSelectContext();
  return <span>{value || placeholder}</span>;
};
SelectValue.displayName = "SelectValue";

const SelectTrigger = React.forwardRef<SelectTriggerRef, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useSelectContext();
    
    return (
      <button
        ref={ref}
        type="button"
        className={`flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1${className ? ` ${className}` : ""}`}
        onClick={() => setOpen(!open)}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

const SelectScrollUpButton = React.forwardRef<
  SelectScrollButtonRef,
  SelectScrollButtonProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex cursor-default items-center justify-center py-1${className ? ` ${className}` : ""}`}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </div>
));
SelectScrollUpButton.displayName = "SelectScrollUpButton";

const SelectScrollDownButton = React.forwardRef<
  SelectScrollButtonRef,
  SelectScrollButtonProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex cursor-default items-center justify-center py-1${className ? ` ${className}` : ""}`}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </div>
));
SelectScrollDownButton.displayName = "SelectScrollDownButton";

const SelectContent = React.forwardRef<SelectContentRef, SelectContentProps>(
  ({ className, children, position = "popper", ...props }, ref) => {
    const { open } = useSelectContext();
    
    if (!open) return null;
    
    return (
      <div
        ref={ref}
        className={`absolute z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 slide-in-from-top-2${position === "popper" ? " translate-y-1" : ""}${className ? ` ${className}` : ""}`}
        style={{ top: "100%", left: 0, width: "100%" }}
        {...props}
      >
        <SelectScrollUpButton />
        <div className="p-1 max-h-96 overflow-auto">
          {children}
        </div>
        <SelectScrollDownButton />
      </div>
    );
  }
);
SelectContent.displayName = "SelectContent";

const SelectLabel = React.forwardRef<SelectLabelRef, SelectLabelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`px-2 py-1.5 text-sm font-semibold${className ? ` ${className}` : ""}`}
      {...props}
    />
  )
);
SelectLabel.displayName = "SelectLabel";

const SelectItem = React.forwardRef<SelectItemRef, SelectItemProps>(
  ({ className, children, value, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = useSelectContext();
    const isSelected = selectedValue === value;
    
    return (
      <div
        ref={ref}
        className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50${className ? ` ${className}` : ""}`}
        onClick={() => onValueChange(value)}
        {...props}
      >
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
          {isSelected && <Check className="h-4 w-4" />}
        </span>
        {children}
      </div>
    );
  }
);
SelectItem.displayName = "SelectItem";

const SelectSeparator = React.forwardRef<
  SelectSeparatorRef,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`-mx-1 my-1 h-px bg-muted${className ? ` ${className}` : ""}`}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
