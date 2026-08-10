import { cn } from "@/lib/utils";

/**
 * The eyebrow → Playfair heading → gold rule → description block that opens
 * every Buyer Portal page. `title` renders in navy, `accent` in gold italic.
 */
const PageHeader = ({ eyebrow, accent, title, description, action }) => (
  <div className="flex flex-col items-start justify-between gap-16 lg:flex-row lg:items-end">
    <div className="flex flex-1 flex-col gap-8 sm:gap-16">
      <div className="flex flex-col gap-4">
        {eyebrow ? (
          <p className="text-eyebrow uppercase font-semibold text-text-accent">{eyebrow}</p>
        ) : null}
        <h1 className="text-display-sm font-medium text-text-primary lg:text-display">
          {accent ? (
            <span className="font-playfair italic text-text-accent">
              {accent}{" "}
            </span>
          ) : null}
          {title}
        </h1>
      </div>

      <div className="h-2 w-40 rounded-sm bg-[#d9ae64]" />

      {description ? (
        <p className={cn("max-w-540 text-body text-text-secondary")}>
          {description}
        </p>
      ) : null}
    </div>

    {action}
  </div>
);

export { PageHeader };
