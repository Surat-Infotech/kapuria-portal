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
  <span className="rounded-[30px] bg-[rgba(8,34,53,0.55)] px-12 py-4 text-[10px]/[14px] font-bold tracking-[0.5px] text-white uppercase backdrop-blur-[10px]">
    {badge ?? "Villa"}
  </span>
);

const RevisionBadge = ({ current, className }) => (
  <span
    className={cn(
      "inline-flex shrink-0 items-center tracking-[0.4px] gap-4 rounded-[30px] px-12 py-4 text-[10px]/[14px] font-semibold",
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
      "shrink-0 text-[10px]/[14px] font-bold tracking-[2px] text-text-accent uppercase",
      className
    )}
  >
    {children}
  </span>
);

const SheetMeta = ({ drawing, className }) => (
  <p
    className={cn(
      "flex items-center font-bold gap-x-8 text-[10px]/[14px] text-text-secondary lg:font-normal",
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
      "flex shrink-0 items-center gap-4 text-[12px]/[8px] font-bold text-text-secondary lg:font-normal",
      className
    )}
  >
    <CalendarIcon className="size-15 shrink-0 text-text-muted" />
    Updated {formatShortDate(iso)}
  </p>
);

// `drawing.file` is a placeholder path until the documents service issues
// signed URLs — see the note in `@/data/blueprints`. Preview opens the sheet
// and its record in a dialog without leaving the list; the icon button hands
// the file straight to the browser's downloader.
const PreviewAction = ({ drawing, onPreview, className }) => (
  <Button
    variant="secondary"
    onClick={() => onPreview(drawing)}
    aria-label={`Preview ${drawing.title}`}
    className={cn(
      "h-38 rounded-[10px] border-transparent bg-[#EFE7DA] px-10 text-btn font-semibold text-text-primary hover:bg-[#efe2c9]",
      className
    )}
  >
    <EyeIcon className="size-16 shrink-0" />
    Preview
  </Button>
);

const DownloadAction = ({ drawing, className }) => (
  <Button
    asChild
    className={cn("h-35 shrink-0 rounded-[10px] px-14 py-0", className)}
  >
    <a href={drawing.file} download aria-label={`Download ${drawing.title}`}>
      <DownloadIcon className="size-15 shrink-0 text-[#E7BE7B]" />
    </a>
  </Button>
);

const DrawingCard = ({ drawing, floorBadge, disciplineLabel, onPreview }) => (
  <article className="flex flex-col overflow-hidden rounded-[18px] border border-border-subtle bg-surface">
    <DrawingThumbnail
      src={drawing.image}
      alt={`${drawing.title} — ${drawing.revision}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1172px) 50vw, 33vw"
      className="aspect-466/230 shrink-0"
    >
      <div className="w-full flex justify-between items-center absolute top-16 px-16">
        <FloorBadge badge={floorBadge} />
        <RevisionBadge current={drawing.current} />
      </div>
    </DrawingThumbnail>

    <div className="flex flex-1 flex-col gap-8 p-16 border-t border-b border-border-subtle">
      <div className="flex items-center justify-between gap-8">
        <h3 className="text-h5 font-semibold text-text-primary sm:text-body md:text-h5">
          {drawing.title}
        </h3>
        <DisciplineLabel>{disciplineLabel}</DisciplineLabel>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-16 gap-y-4">
        <SheetMeta drawing={drawing} />
        <UpdatedStamp iso={drawing.updated} />
      </div>
    </div>

    <div className="flex items-center gap-8 p-16">
      <PreviewAction
        drawing={drawing}
        onPreview={onPreview}
        className="flex-1"
      />
      <DownloadAction drawing={drawing} />
    </div>
  </article>
);

const DrawingRow = ({ drawing, floorBadge, disciplineLabel, onPreview }) => (
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
        <h3 className="text-h5 font-semibold text-text-primary sm:text-body md:text-h5">
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
      <PreviewAction
        drawing={drawing}
        onPreview={onPreview}
        className="flex-1 sm:flex-none"
      />
      <DownloadAction drawing={drawing} />
    </div>
  </article>
);

export { DrawingCard, DrawingRow };
