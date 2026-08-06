import { cn } from "@/lib/utils";

// 42px field from the Buyer Portal Figma: white, 1px #d9d2c6, 11px radius.
const Input = ({ className, type = "text", ...props }) => (
  <input
    type={type}
    data-slot="input"
    className={cn(
      "h-42 w-full min-w-0 rounded-[11px] border border-border-default bg-surface px-16 py-8 text-body text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-gold-400 disabled:cursor-not-allowed disabled:opacity-55",
      className
    )}
    {...props}
  />
);

// Label sits above each field: 12px semibold, secondary grey.
const Label = ({ className, ...props }) => (
  <label
    data-slot="label"
    className={cn("text-body-xs font-semibold text-text-secondary", className)}
    {...props}
  />
);

// Wraps a label + control pair with the 4px gap Figma uses.
const Field = ({ className, ...props }) => (
  <div className={cn("flex flex-1 flex-col gap-4", className)} {...props} />
);

export { Field, Input, Label };
