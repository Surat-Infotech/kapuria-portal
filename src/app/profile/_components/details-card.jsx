import { VerifiedIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const VerifiedBadge = () => (
  <span className="flex shrink-0 items-center gap-5 rounded-[20px] bg-success-soft px-9 py-4 text-[10.5px] font-bold text-success-muted">
    <VerifiedIcon className="size-11" />
    Verified
  </span>
);

const Field = ({ field }) => (
  <div className="flex min-w-0 flex-1 flex-col gap-4">
    <dt className="text-body-xs text-text-secondary">{field.label}</dt>
    <dd className="flex flex-wrap items-center gap-8">
      <span className="text-body font-semibold break-words text-text-primary">
        {field.value}
      </span>
      {field.verified ? <VerifiedBadge /> : null}
    </dd>
  </div>
);

/**
 * Right column card: PERSONAL / CONTACT / ADDRESS sections. Each section's
 * `rows` is an array of field arrays — a row with two fields sits side by
 * side on desktop and stacks on mobile.
 */
const DetailsCard = ({ sections }) => (
  <div className="flex w-full min-w-0 flex-1 flex-col gap-16 rounded-[20px] border border-border-subtle bg-surface px-16 py-26 gap-20 xl:gap-26 xl:p-32">
    {sections.map((section, index) => (
      <div key={section.title} className="contents">
        {index > 0 ? <div className="h-px w-full bg-border-subtle" /> : null}

        <section className="flex flex-col gap-16 lg:gap-20 xl:gap-24">
          <h2 className="text-[10px]/[14px] font-bold tracking-[2px] text-text-accent">
            {section.title}
          </h2>

          <dl className="flex flex-col gap-16 lg:gap-20 xl:gap-24">
            {section.rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={cn("flex gap-16 lg:gap-24", row.length === 1 && "flex-col")}
              >
                {row.map((field) => (
                  <Field key={field.label} field={field} />
                ))}
              </div>
            ))}
          </dl>
        </section>
      </div>
    ))}
  </div>
);

export { DetailsCard };
