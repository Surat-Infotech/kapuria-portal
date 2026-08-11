import { cn } from "@/lib/utils";

// Build status reads the same wherever it appears — on the portfolio card and
// on the property hero — so the tones live here rather than in either view.
const statusTones = {
  progress: "bg-[#F3EBD9] text-[#B98634]",
  complete: "bg-success-soft text-success-muted",
};

const StatusPill = ({ status, className }) => (
  <span
    className={cn(
      "inline-flex shrink-0 items-center gap-8 rounded-full px-16 py-8 text-body-xs font-bold",
      statusTones[status.tone] ?? statusTones.progress,
      className
    )}
  >
    <span className="size-6 shrink-0 rounded-full bg-current" />
    {status.label}
  </span>
);

export { StatusPill };
