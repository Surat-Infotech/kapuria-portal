import { cn } from "@/lib/utils";

/**
 * Section title with the hairline that runs out to the right of it — the
 * divider the Figma uses to separate Specifications, Amenities and Location.
 * Pass `rule={false}` for a title that stands on its own.
 */
const SectionHeading = ({ children, rule = true, className }) => (
  <div className={cn("flex items-center gap-16", className)}>
    <h2 className="text-h4 shrink-0 font-semibold text-text-primary">
      {children}
    </h2>
    {rule ? <div className="h-px flex-1 bg-border-subtle" /> : null}
  </div>
);

export { SectionHeading };
