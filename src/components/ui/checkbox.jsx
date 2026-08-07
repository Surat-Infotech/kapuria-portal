import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

// 20px square that fills gold-brown when checked ("Keep me signed in" in the
// Figma sign-in screen). The native input stays in the DOM for keyboard and
// form semantics; the tick is drawn on top and driven by `peer-checked`.
const Checkbox = ({ className, ...props }) => (
  <span className="relative inline-flex shrink-0 items-center justify-center">
    <input
      type="checkbox"
      data-slot="checkbox"
      className={cn(
        "peer size-20 cursor-pointer appearance-none rounded-[6px] border border-border-default bg-surface outline-none transition-colors checked:border-text-accent checked:bg-text-accent focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-55",
        className
      )}
      {...props}
    />
    <CheckIcon className="pointer-events-none absolute size-12 text-text-inverse opacity-0 transition-opacity peer-checked:opacity-100" />
  </span>
);

export { Checkbox };