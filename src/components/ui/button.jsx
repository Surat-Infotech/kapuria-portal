import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Variants map to the Buyer Portal buttons in Figma (KD_Charlie-new):
//   primary   — "Sign in", "View property", "Update password"  (navy pill)
//   secondary — "Blueprints", "Photos", "Legal Documents"      (white pill)
//   soft      — "Pay Now"                                      (blue chip)
//   outline   — "Log out"                                      (on navy sidebar)
//   ghost     — sidebar nav rows
//   link      — "Clear", "Forgot password?"
const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-8 whitespace-nowrap font-semibold no-underline transition-[background-color,border-color,color,opacity] duration-200 ease-out outline-none select-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-55 aria-disabled:pointer-events-none aria-disabled:opacity-55",
  {
    variants: {
      variant: {
        primary: "rounded-full bg-navy-800 text-text-inverse hover:bg-navy-900",
        secondary:
          "rounded-full border border-border-default bg-surface text-text-primary hover:bg-surface-sunken",
        soft: "rounded-sm bg-info-soft text-info hover:brightness-97",
        outline:
          "rounded-[11px] border border-border-inverse bg-transparent text-white/82 hover:bg-white/8",
        ghost:
          "rounded-[10px] bg-transparent font-medium text-text-secondary hover:bg-navy-800/5",
        destructive:
          "rounded-full bg-destructive text-text-inverse hover:brightness-92",
        link: "rounded-none p-0 text-link text-text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "px-16 py-8 text-link",
        default: "px-24 py-12 text-link",
        lg: "px-16 py-8 text-btn",
      },
      width: {
        auto: "",
        full: "w-full",
      },
    },
    compoundVariants: [
      // Chips and links keep their own metrics — the pill sizes do not apply.
      { variant: "soft", size: "default", class: "h-auto px-10 py-4" },
      { variant: "link", size: "default", class: "h-auto p-0" },
      { variant: "ghost", size: "default", class: "h-40 justify-start px-12 py-10 text-body" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "default",
      width: "auto",
    },
  }
);

const Button = ({
  className,
  variant,
  size,
  width,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, width }), className)}
      {...props}
    />
  );
};

export { Button, buttonVariants };
