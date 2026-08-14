"use client";

import { cn } from "@/lib/utils";

// The counted pill rail this page filters with — once above the gallery for the
// media categories, and again inside the Indoor section for the rooms. Both
// rails are the same control, so it takes its label as a prop rather than
// baking one in.
//
// Counts are the property's own: a category or a room with nothing shot for
// this villa never gets a chip, which is why two properties can show a
// different rail.
const PhotoChips = ({ chips, value, onChange, label, className }) => (
  <div
    role="tablist"
    aria-label={label}
    className={cn(
      "-mx-16 flex gap-8 overflow-x-auto px-16 pb-2 [-ms-overflow-style:none] md:flex-wrap lg:mx-0 lg:px-0",
      className
    )}
  >
    {chips.map(({ key, label: chipLabel, count }) => {
      const active = key === value;

      return (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={active}
          onClick={() => onChange(key)}
          className={cn(
            "flex shrink-0 cursor-pointer items-center font-semibold gap-4 border px-14 py-8 text-[10px]/[14px] sm:text-body-xs transition-colors duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:gap-8",
            active
              ? "border-navy-800 bg-navy-800 rounded-[10px] text-white"
              : "border-border-default bg-surface text-text-secondary hover:bg-surface-sunken rounded-full"
          )}
        >
          {chipLabel}
          <span
            className={cn(
              "font-bold",
              active ? "text-gold-300" : "text-text-muted"
            )}
          >
            {count}
          </span>
        </button>
      );
    })}
  </div>
);

export { PhotoChips };
