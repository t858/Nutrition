"use client";

import * as React from "react";
import { Check, ChevronRight, Circle } from "lucide-react";

interface DropdownContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownContext = React.createContext<DropdownContextType | undefined>(undefined);

const useDropdownContext = () => {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within a DropdownMenu");
  }
  return context;
};

interface DropdownMenuProps {
  children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={menuRef} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ asChild, children, ...props }, ref) => {
  const { open, setOpen } = useDropdownContext();
  
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
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { sideOffset?: number; align?: "start" | "end" }
>(({ className, sideOffset = 4, align = "start", style, ...props }, ref) => {
  const { open } = useDropdownContext();
  
  if (!open) return null;
  
  const alignmentStyle = align === "end" 
    ? { right: 0, left: "auto" }
    : { left: 0, right: "auto" };
  
  return (
    <div
      ref={ref}
      className={`absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 slide-in-from-top-2${className ? ` ${className}` : ""}`}
      style={{ top: `calc(100% + ${sideOffset}px)`, ...alignmentStyle, ...style }}
      {...props}
    />
  );
});
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => {
  const { setOpen } = useDropdownContext();
  
  return (
    <div
      ref={ref}
      className={`relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0${inset ? " pl-8" : ""}${className ? ` ${className}` : ""}`}
      onClick={(e) => {
        setOpen(false);
        if (props.onClick) {
          props.onClick(e);
        }
      }}
      {...props}
    />
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { checked?: boolean }
>(({ className, children, checked, ...props }, ref) => {
  const { setOpen } = useDropdownContext();
  
  return (
    <div
      ref={ref}
      className={`relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50${className ? ` ${className}` : ""}`}
      onClick={(e) => {
        setOpen(false);
        if (props.onClick) {
          props.onClick(e);
        }
      }}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <Check className="h-4 w-4" />}
      </span>
      {children}
    </div>
  );
});
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

const DropdownMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { setOpen } = useDropdownContext();
  
  return (
    <div
      ref={ref}
      className={`relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50${className ? ` ${className}` : ""}`}
      onClick={(e) => {
        setOpen(false);
        if (props.onClick) {
          props.onClick(e);
        }
      }}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Circle className="h-2 w-2 fill-current" />
      </span>
      {children}
    </div>
  );
});
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={`px-2 py-1.5 text-sm font-semibold${inset ? " pl-8" : ""}${className ? ` ${className}` : ""}`}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`-mx-1 my-1 h-px bg-muted${className ? ` ${className}` : ""}`}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

const DropdownMenuShortcut: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) => {
  return (
    <span
      className={`ml-auto text-xs tracking-widest opacity-60${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// Placeholder components for compatibility
const DropdownMenuGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);
DropdownMenuGroup.displayName = "DropdownMenuGroup";

const DropdownMenuPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>{children}</>
);
DropdownMenuPortal.displayName = "DropdownMenuPortal";

const DropdownMenuSub: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>{children}</>
);
DropdownMenuSub.displayName = "DropdownMenuSub";

const DropdownMenuSubContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-top-2${className ? ` ${className}` : ""}`}
    {...props}
  />
));
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

const DropdownMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0${inset ? " pl-8" : ""}${className ? ` ${className}` : ""}`}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </div>
));
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

const DropdownMenuRadioGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
