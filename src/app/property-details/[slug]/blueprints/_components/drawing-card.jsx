import { EyeIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { formatShortDate } from "@/lib/dates";
import { cn } from "@/lib/utils";

import { CalendarIcon, DownloadIcon } from "./blueprint-icons";
import { DrawingThumbnail } from "./drawing-thumbnail";

// Grid tile and list row are the same record under two layouts, so the pieces
// they share are declared once here rather than kept in step across two files.

// Whole-villa sheets have no storey to name; the badge says so instead of
// going blank, which would read as missing data.
const FloorBadge = ({ badge }) => (
  <span className="absolute top-12 left-12 rounded-[30px] bg-[rgba(11,34,51,0.55)] px-10 py-4 text-[10px]/[14px] font-semibold tracking-[0.6px] text-white uppercase backdrop-blur-[10px]">
    {badge ?? "Villa"}
  </span>
);

const RevisionBadge = ({ current, className }) => (
  <span
    className={cn(
      "inline-flex shrink-0 items-center gap-6 rounded-[30px] px-10 py-4 text-[11px]/[16px] font-semibold",
      current
        ? "bg-success-muted text-white"
        : "bg-warning-soft text-[#B98634]",
      className
    )}
  >
    <span className="size-6 shrink-0 rounded-full bg-current" />
    {current ? "Current" : "Superseded"}
  </span>
);

const DisciplineLabel = ({ children, className }) => (
  <span
    className={cn(
      "shrink-0 text-[11px]/[16px] font-semibold tracking-[1.6px] text-text-accent uppercase",
      className
    )}
  >
    {children}
  </span>
);

const SheetMeta = ({ drawing, className }) => (
  <p
    className={cn(
      "flex flex-wrap items-center gap-x-10 gap-y-2 text-body-xs text-text-secondary",
      className
    )}
  >
    <span>{drawing.scale}</span>
    <span>{drawing.revision}</span>
    <span>
      {drawing.format} · {drawing.size}
    </span>
  </p>
);

const UpdatedStamp = ({ iso, className }) => (
  <p
    className={cn(
      "flex shrink-0 items-center gap-6 text-body-xs font-semibold text-text-primary",
      className
    )}
  >
    <CalendarIcon className="size-14 shrink-0 text-text-secondary" />
    Updated {formatShortDate(iso)}
  </p>
);

// `drawing.file` is a placeholder path until the documents service issues
// signed URLs — see the note in `@/data/blueprints`. Preview opens the sheet in
// its own tab; the icon button hands it straight to the browser's downloader.
const PreviewAction = ({ drawing, className }) => (
  <Button
    asChild
    variant="secondary"
    className={cn(
      "h-42 rounded-[10px] border-transparent bg-gold-soft px-16 text-btn font-semibold text-text-primary hover:bg-[#efe2c9]",
      className
    )}
  >
    <a href={drawing.file} target="_blank" rel="noreferrer">
      <EyeIcon className="size-16 shrink-0" />
      Preview
    </a>
  </Button>
);

const DownloadAction = ({ drawing, className }) => (
  <Button
    asChild
    className={cn("size-42 shrink-0 rounded-[10px] px-0 py-0", className)}
  >
    <a href={drawing.file} download aria-label={`Download ${drawing.title}`}>
      <DownloadIcon className="size-16 shrink-0 text-gold-300" />
    </a>
  </Button>
);

const DrawingCard = ({ drawing, floorBadge, disciplineLabel }) => (
  <article className="flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface">
    <DrawingThumbnail
      src={drawing.image}
      alt={`${drawing.title} — ${drawing.revision}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1172px) 50vw, 33vw"
      className="aspect-466/230 shrink-0"
    >
      <FloorBadge badge={floorBadge} />
      <RevisionBadge current={drawing.current} className="absolute top-12 right-12" />
    </DrawingThumbnail>

    <div className="flex flex-1 flex-col gap-10 px-16 pt-14">
      <div className="flex items-start justify-between gap-12">
        <h3 className="text-h5 font-semibold text-text-primary">
          {drawing.title}
        </h3>
        <DisciplineLabel className="pt-4">{disciplineLabel}</DisciplineLabel>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-16 gap-y-4">
        <SheetMeta drawing={drawing} />
        <UpdatedStamp iso={drawing.updated} />
      </div>
    </div>

    <div className="flex items-center gap-8 p-16">
      <PreviewAction drawing={drawing} className="flex-1" />
      <DownloadAction drawing={drawing} />
    </div>
  </article>
);

const DrawingRow = ({ drawing, floorBadge, disciplineLabel }) => (
  <article className="flex flex-col gap-12 rounded-2xl border border-border-subtle bg-surface p-12 sm:flex-row sm:items-center sm:gap-16">
    <DrawingThumbnail
      src={drawing.image}
      alt={`${drawing.title} — ${drawing.revision}`}
      sizes="(max-width: 576px) 100vw, 112px"
      className="aspect-466/230 shrink-0 overflow-hidden rounded-[10px] sm:aspect-auto sm:h-64 sm:w-112"
    >
      {/* The row is tight enough that the floor badge would crowd the sheet;
          it moves down beside the title instead. */}
    </DrawingThumbnail>

    <div className="flex min-w-0 flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
        <h3 className="text-body font-semibold text-text-primary">
          {drawing.title}
        </h3>
        <span className="rounded-[30px] bg-surface-sunken px-8 py-2 text-[10px]/[14px] font-semibold tracking-[0.6px] text-text-secondary uppercase">
          {floorBadge ?? "Villa"}
        </span>
        <RevisionBadge current={drawing.current} />
      </div>

      <div className="flex flex-wrap items-center gap-x-14 gap-y-4">
        <DisciplineLabel>{disciplineLabel}</DisciplineLabel>
        <SheetMeta drawing={drawing} />
        <UpdatedStamp iso={drawing.updated} className="font-medium" />
      </div>
    </div>

    <div className="flex shrink-0 items-center gap-8">
      <PreviewAction drawing={drawing} className="flex-1 sm:flex-none" />
      <DownloadAction drawing={drawing} />
    </div>
  </article>
);

export { DrawingCard, DrawingRow };
