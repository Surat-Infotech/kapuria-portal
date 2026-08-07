"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

// 46x27 pill with a 21px knob, matching the Figma toggle.
const Switch = ({ defaultChecked = false, onCheckedChange, className, ...props }) => {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={toggle}
      className={cn(
        "relative h-27 w-46 shrink-0 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:outline-none",
        checked ? "bg-success-muted" : "bg-border-default",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "absolute top-3 size-21 rounded-full bg-white transition-[left]",
          checked ? "left-22" : "left-3"
        )}
      />
    </button>
  );
};

export { Switch };
