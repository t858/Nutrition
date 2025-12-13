"use client";

import * as React from "react";

interface PopoverContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PopoverContext = React.createContext<PopoverContextType | undefined>(undefined);

const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within a Popover");
  }
  return context;
};

interface PopoverProps {
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
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
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div ref={popoverRef} className="relative">
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ asChild, children, ...props }, ref) => {
  const { open, setOpen } = usePopoverContext();
  
  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return React.cloneElement(children, {
      ...props,
      ...(ref && { ref }),
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(!open);
        if (childProps.onClick) {
          childProps.onClick(e);
        }
      },
    } as any);
  }
  
  return (
    <button
      ref={ref}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </button>
  );
});
PopoverTrigger.displayName = "PopoverTrigger";

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "center" | "end"; sideOffset?: number }
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => {
  const { open } = usePopoverContext();
  
  if (!open) return null;
  
  const alignClass = align === "start" ? "left-0" : align === "end" ? "right-0" : "left-1/2 -translate-x-1/2";
  
  return (
    <div
      ref={ref}
      className={`absolute z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 ${alignClass}${className ? ` ${className}` : ""}`}
      style={{ top: `calc(100% + ${sideOffset}px)` }}
      {...props}
    />
  );
});
PopoverContent.displayName = "PopoverContent";

const PopoverAnchor: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);
PopoverAnchor.displayName = "PopoverAnchor";

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
