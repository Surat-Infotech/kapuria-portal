"use client";

import { cn } from "@/lib/utils";

// The counted pill rail this page filters with. One rail only — the visuals are
// a single set rather than the stacked bands the Photos gallery runs — so it
// carries its own label rather than taking one as a prop.
//
// Counts are the property's own: a category nothing has been modelled for never
// gets a chip, which is why two properties can show a different rail.
const RenderChips = ({ chips, value, onChange, className }) => (
  <div
    role="tablist"
    aria-label="Filter renders by category"
    className={cn(
      "-mx-16 flex gap-8 overflow-x-auto px-16 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap lg:mx-0 lg:px-0",
      className
    )}
  >
    {chips.map(({ key, label, count }) => {
      const active = key === value;

      return (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={active}
          onClick={() => onChange(key)}
          className={cn(
            "flex shrink-0 cursor-pointer items-center gap-4 border px-14 py-8 text-[10px]/[14px] font-semibold transition-colors duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-body-xs md:gap-8",
            active
              ? "rounded-[10px] border-navy-800 bg-navy-800 text-white"
              : "rounded-full border-border-default bg-surface text-text-secondary hover:bg-surface-sunken"
          )}
        >
          {label}
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

export { RenderChips };
