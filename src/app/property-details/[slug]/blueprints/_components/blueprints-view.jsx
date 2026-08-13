"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import {
  DRAWING_DISCIPLINES,
  DRAWING_FLOORS,
  drawingsArchiveHref,
} from "@/data/blueprints";
import { formatLongDate } from "@/lib/dates";
import { propertyHref } from "@/lib/property-links";

// The breadcrumb chevron is route-wide chrome, shared with the property
// summary page; everything else this page draws is its own.
import { ChevronRightIcon } from "../../../_components/property-icons";

import { DownloadIcon } from "./blueprint-icons";
import { DisciplineChips } from "./discipline-chips";
import { DrawingCard, DrawingRow } from "./drawing-card";
import { DrawingPreviewDialog } from "./drawing-preview-dialog";
import { DrawingsToolbar } from "./drawings-toolbar";

const ALL = "all";

// A whole-villa sheet (`floor: null`) belongs to every storey, so it survives
// the floor filter rather than disappearing the moment a buyer narrows down.
const matchesFloor = (drawing, floor) =>
  floor === ALL || drawing.floor === floor || drawing.floor === null;

const SORTERS = {
  newest: (a, b) => b.updated.localeCompare(a.updated),
  oldest: (a, b) => a.updated.localeCompare(b.updated),
  name: (a, b) => a.title.localeCompare(b.title),
};

const BlueprintsView = ({ property, drawings }) => {
  const [discipline, setDiscipline] = useState(ALL);
  const [floor, setFloor] = useState(ALL);
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState("grid");

  // The sheet a buyer pressed Preview on, or null while the list is at rest.
  // Held here rather than per card so only one dialog can ever be open, and so
  // the grid and the list share it.
  const [preview, setPreview] = useState(null);

  // Stable, so the dialog's mount effect does not re-run on every render of
  // this view.
  const closePreview = useCallback(() => setPreview(null), []);

  // Both rails are built from this property's own drawings: a discipline or a
  // storey nobody has a sheet for never gets a control the buyer can press into
  // an empty result.
  const chips = useMemo(() => {
    const counts = drawings.reduce((tally, drawing) => {
      tally.set(drawing.discipline, (tally.get(drawing.discipline) ?? 0) + 1);
      return tally;
    }, new Map());

    return [
      { key: ALL, label: "All Drawings", count: drawings.length },
      ...DRAWING_DISCIPLINES.filter(({ key }) => counts.has(key)).map(
        ({ key, label }) => ({ key, label, count: counts.get(key) })
      ),
    ];
  }, [drawings]);

  const floors = useMemo(() => {
    const present = new Set(drawings.map((drawing) => drawing.floor));

    return [
      { key: ALL, label: "All" },
      ...DRAWING_FLOORS.filter(({ key }) => present.has(key)),
    ];
  }, [drawings]);

  const visible = useMemo(
    () =>
      drawings
        .filter(
          (drawing) =>
            (discipline === ALL || drawing.discipline === discipline) &&
            matchesFloor(drawing, floor)
        )
        .sort(SORTERS[sort]),
    [drawings, discipline, floor, sort]
  );

  // Lookups the cards read their badges from — resolved once, not per card.
  const floorBadges = useMemo(
    () => new Map(DRAWING_FLOORS.map(({ key, badge }) => [key, badge])),
    []
  );
  const disciplineLabels = useMemo(
    () => new Map(DRAWING_DISCIPLINES.map(({ key, short }) => [key, short])),
    []
  );

  // The set's own last issue date, not today's — ISO strings sort lexically.
  const lastUpdated = useMemo(
    () =>
      drawings.reduce(
        (latest, drawing) =>
          drawing.updated > latest ? drawing.updated : latest,
        ""
      ),
    [drawings]
  );

  const filtered = discipline !== ALL || floor !== ALL;

  const clearFilters = () => {
    setDiscipline(ALL);
    setFloor(ALL);
  };

  return (
    <div className="flex flex-col gap-24 px-16 pt-16 pb-52 lg:px-34 lg:pt-32 lg:pb-56">
      {/* Desktop carries the trail back to the property; below lg the design
          leaves it out, as it does on the summary page. */}
      <nav aria-label="Breadcrumb" className="hidden lg:block">
        <ol className="text-body flex items-center gap-8">
          <li>
            <Link
              href="/"
              className="text-text-secondary transition-colors duration-200 hover:text-text-accent"
            >
              My Properties
            </Link>
          </li>
          <li aria-hidden className="flex items-center">
            <ChevronRightIcon className="size-12 text-text-muted" />
          </li>
          <li>
            <Link
              href={propertyHref(property.slug)}
              className="text-text-secondary transition-colors duration-200 hover:text-text-accent"
            >
              {property.name}
            </Link>
          </li>
          <li aria-hidden className="flex items-center">
            <ChevronRightIcon className="size-12 text-text-muted" />
          </li>
          <li aria-current="page" className="font-semibold text-text-primary">
            Blueprints
          </li>
        </ol>
      </nav>
      <div className="flex justify-between items-start flex-col gap-18 md:gap-16 md:items-center md:flex-row lg:items-start lg:flex-col xl:items-end xl:flex-row">
        <PageHeader
          eyebrow="Project documents"
          accent="Blueprints"
          title="& Drawings"
          description="Every sanctioned drawing for your villa, organised by discipline and floor — always the latest approved revision."
        />

        <div className="flex w-full flex-col gap-8 sm:w-auto sm:items-end lg:items-start xl:items-end md:gap-12">
          <p className="order-2 justify-center text-body-xs flex gap-5 text-text-secondary md:order-1 lg:justify-end">
            Last updated{" "}
            <span className="font-semibold text-text-primary">
              {formatLongDate(lastUpdated)}
            </span>{" "}
            · {drawings.length} drawings
          </p>

          <Button
            asChild
            width="full"
            className="order-1 py-12 px-20 font-semibold md:order-2 md:w-auto"
          >
            <a href={drawingsArchiveHref(property.slug)} download>
              <DownloadIcon className="size-16 shrink-0 text-[#E7BE7B]" />
              Download all (ZIP)
            </a>
          </Button>
        </div>
      </div>

      {drawings.length === 0 ? (
        <div className="rounded-2xl border border-border-subtle bg-surface px-20 py-40 text-center">
          <p className="text-body font-semibold text-text-primary">
            No drawings have been issued for {property.name} yet.
          </p>
          <p className="pt-4 text-body text-text-secondary">
            Sanctioned sheets appear here as soon as your project team releases
            them.
          </p>
        </div>
      ) : (
        <>
          {/* The rule closes the header block on mobile, where the chips sit
              directly beneath it; desktop separates them with whitespace. */}
          <div className="h-px my-8 bg-border-subtle lg:hidden" />

          <DisciplineChips
            chips={chips}
            value={discipline}
            onChange={setDiscipline}
          />

          <DrawingsToolbar
            floors={floors}
            floor={floor}
            onFloorChange={setFloor}
            sort={sort}
            onSortChange={setSort}
            view={view}
            onViewChange={setView}
            shown={visible.length}
          />

          {visible.length === 0 ? (
            <div className="rounded-2xl border border-border-subtle bg-surface px-20 py-40 text-center">
              <p className="text-body font-semibold text-text-primary">
                No drawings match this combination.
              </p>
              <p className="pt-4 text-body text-text-secondary">
                Try another discipline or floor.
              </p>
              <Button
                variant="link"
                onClick={clearFilters}
                className="pt-12 text-body-xs"
              >
                Clear filters
              </Button>
            </div>
          ) : view === "grid" ? (
            <div className="grid gap-16 md:gap-24 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((drawing) => (
                <DrawingCard
                  key={drawing.id}
                  drawing={drawing}
                  floorBadge={floorBadges.get(drawing.floor)}
                  disciplineLabel={disciplineLabels.get(drawing.discipline)}
                  onPreview={setPreview}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-12">
              {visible.map((drawing) => (
                <DrawingRow
                  key={drawing.id}
                  drawing={drawing}
                  floorBadge={floorBadges.get(drawing.floor)}
                  disciplineLabel={disciplineLabels.get(drawing.discipline)}
                  onPreview={setPreview}
                />
              ))}
            </div>
          )}
        </>
      )}

      {preview ? (
        <DrawingPreviewDialog drawing={preview} onClose={closePreview} />
      ) : null}
    </div>
  );
};

export { BlueprintsView };
