"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { RENDER_CATEGORIES, rendersArchiveHref } from "@/data/3d-drawings";
import { formatLongDate } from "@/lib/dates";
import { propertyHref } from "@/lib/property-links";

import { RenderGrid } from "./render-card";
import { RenderChips } from "./render-chips";
import { RenderHero } from "./render-hero";
import { ChevronRightIcon, DownloadIcon } from "./render-icons";
import { RenderPreviewDialog } from "./render-preview-dialog";

const ALL = "all";

const RendersView = ({ property, renders }) => {
  const [category, setCategory] = useState(ALL);

  // The visual the preview is open on, or null while the page is at rest. Held
  // here rather than per tile so only one dialog can ever be open, and so the
  // hero and the grid share it.
  const [preview, setPreview] = useState(null);

  // Stable, so the dialog's mount effect does not re-run on every render of
  // this view.
  const closePreview = useCallback(() => setPreview(null), []);

  // The banner visual, and the one the grid leaves out. A set without a
  // declared headline still gets one — the first modelled — so the page never
  // opens on a bare grid.
  const hero = useMemo(
    () => renders.find(({ featured }) => featured) ?? renders[0] ?? null,
    [renders]
  );

  // The rail is built from this property's own set: a category nothing has been
  // modelled for never gets a chip the buyer can press into an empty grid. The
  // counts state each category's whole size, the hero's own included — it is
  // one of the set, shown larger rather than held apart from it.
  const chips = useMemo(() => {
    const counts = renders.reduce((tally, render) => {
      tally.set(render.category, (tally.get(render.category) ?? 0) + 1);
      return tally;
    }, new Map());

    return [
      { key: ALL, label: "All Renders", count: renders.length },
      ...RENDER_CATEGORIES.filter(({ key }) => counts.has(key)).map(
        ({ key, label }) => ({ key, label, count: counts.get(key) })
      ),
    ];
  }, [renders]);

  // What the grid shows: the filtered set, less whatever the hero is already
  // carrying at full width above it.
  const tiles = useMemo(
    () =>
      renders.filter(
        (render) =>
          render.id !== hero?.id &&
          (category === ALL || render.category === category)
      ),
    [renders, hero, category]
  );

  // The set's own newest export, not today's — ISO strings sort lexically.
  const lastUpdated = useMemo(
    () =>
      renders.reduce(
        (latest, render) => (render.updated > latest ? render.updated : latest),
        ""
      ),
    [renders]
  );

  // A category whose only visual is the one in the banner: the count on the
  // chip is honest, and the grid below it is legitimately empty.
  const heroOnly = category !== ALL && tiles.length === 0;

  return (
    <div className="flex flex-col gap-16 px-16 pt-16 pb-52 md:gap-24 lg:px-34 lg:pt-32 lg:pb-56">
      {/* Desktop carries the trail back to the property; below lg the design
          leaves it out, as it does on the blueprints and photos pages. */}
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
            3D Drawings
          </li>
        </ol>
      </nav>

      <div className="flex flex-col items-start justify-between gap-18 md:flex-row md:items-center md:gap-16 lg:flex-col lg:items-start xl:flex-row xl:items-end">
        <PageHeader
          eyebrow="Visualisation"
          accent="3D"
          title="Drawings & Renders"
          description="Photoreal renders and massing studies of your villa — inside and out, before a single brick is laid."
        />

        <div className="flex w-full flex-col gap-8 sm:w-auto sm:items-end md:gap-12 lg:items-start xl:items-end">
          <p className="text-body-xs order-2 flex justify-center gap-5 whitespace-nowrap text-text-secondary md:order-1 lg:justify-end">
            Last updated{" "}
            <span className="font-semibold text-text-primary">
              {formatLongDate(lastUpdated)}
            </span>{" "}
            · {renders.length} visuals
          </p>

          <Button
            asChild
            width="full"
            className="order-1 px-20 py-12 font-semibold md:order-2 md:w-auto"
          >
            <a href={rendersArchiveHref(property.slug)} download>
              <DownloadIcon className="size-16 shrink-0 text-[#E7BE7B]" />
              Download all (ZIP)
            </a>
          </Button>
        </div>
      </div>

      {renders.length === 0 ? (
        <div className="rounded-2xl border border-border-subtle bg-surface px-20 py-40 text-center">
          <p className="text-body font-semibold text-text-primary">
            No renders have been published for {property.name} yet.
          </p>
          <p className="pt-4 text-body text-text-secondary">
            Visualisations appear here as soon as your design team exports them.
          </p>
        </div>
      ) : (
        <>
          <RenderHero render={hero} onOpen={setPreview} />

          <RenderChips chips={chips} value={category} onChange={setCategory} />

          {heroOnly ? (
            <div className="rounded-2xl border border-border-subtle bg-surface px-20 py-40 text-center">
              <p className="text-body font-semibold text-text-primary">
                The only {chips.find(({ key }) => key === category)?.label}{" "}
                visual is the one above.
              </p>
              <Button
                variant="link"
                onClick={() => setCategory(ALL)}
                className="text-body-xs pt-12"
              >
                Show all renders
              </Button>
            </div>
          ) : (
            <RenderGrid renders={tiles} onOpen={setPreview} />
          )}
        </>
      )}

      {preview ? (
        <RenderPreviewDialog render={preview} onClose={closePreview} />
      ) : null}
    </div>
  );
};

export { RendersView };
