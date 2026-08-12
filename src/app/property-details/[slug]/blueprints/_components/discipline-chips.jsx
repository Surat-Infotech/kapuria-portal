"use client";

import { cn } from "@/lib/utils";

// The chip rail above the drawings. Counts are the property's own — a
// discipline with nothing issued for this villa never gets a chip, which is why
// two properties can show a different rail.
const DisciplineChips = ({ chips, value, onChange }) => (
  <div
    role="tablist"
    aria-label="Filter drawings by discipline"
    className="-mx-16 flex gap-8 overflow-x-auto px-16 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0 [&::-webkit-scrollbar]:hidden"
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
            "flex shrink-0 cursor-pointer items-center gap-8 border px-18 py-11 text-body-xs transition-colors duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            active
              ? "border-navy-800 bg-navy-800 rounded-[10px] font-semibold text-white"
              : "border-border-default bg-surface font-medium text-text-primary hover:bg-surface-sunken rounded-full"
          )}
        >
          {label}
          <span
            className={cn(
              "font-semibold",
              active ? "text-gold-300" : "text-text-secondary"
            )}
          >
            {count}
          </span>
        </button>
      );
    })}
  </div>
);

export { DisciplineChips };
