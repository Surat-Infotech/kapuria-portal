import { cn } from "@/lib/utils";

// The rules are pseudo-elements rather than `divide-*` or a `gap-px` backdrop
// because the two run differently: the column rule is inset from the cell's top
// and bottom, while the row rule (mobile only, where the grid wraps to 2×2)
// runs the full width of the card.
const SpecificationsCard = ({ specifications }) => (
  <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface">
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      {specifications.map(({ label, value }, index) => (
        <div
          key={label}
          className={cn(
            "relative flex flex-col items-center justify-center gap-4 px-16 py-16 text-center",
            "before:absolute before:min-h-38 before:left-0 before:w-px before:bg-border-subtle md:py-20 lg:before:inset-y-22",
          
            index % 2 === 0 && "before:hidden lg:before:hidden",
            index % 2 === 0 &&
              index % 4 !== 0 &&
              "md:before:block xl:before:block",
            index >= 2 &&
              "after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-border-subtle md:after:hidden lg:after:block xl:after:hidden",  
          )}
        >
          <p className="text-h4 font-semibold text-text-primary">{value}</p>
          <p className="text-body-xs text-text-secondary">{label}</p>
        </div>
      ))}
    </div>
  </div>
);

export { SpecificationsCard };
