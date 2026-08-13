"use client";

import { cn } from "@/lib/utils";

// The chip rail above the drawings. Counts are the property's own — a
// discipline with nothing issued for this villa never gets a chip, which is why
// two properties can show a different rail.
const DisciplineChips = ({ chips, value, onChange }) => (
  <div
    role="tablist"
    aria-label="Filter drawings by discipline"
    className="-mx-16 flex gap-8 overflow-x-auto px-16 pb-2 [-ms-overflow-style:none] md:flex-wrap lg:mx-0 lg:px-0"
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
            "flex shrink-0 cursor-pointer items-center font-semibold gap-4 border px-14 py-8 text-body-xs transition-colors duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:gap-8",
            active
              ? "border-navy-800 bg-navy-800 rounded-[10px] text-white"
              : "border-border-default bg-surface text-text-secondary hover:bg-surface-sunken rounded-full"
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

export { DisciplineChips };
