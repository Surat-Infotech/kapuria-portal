"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import {
  INDOOR_ROOMS,
  PHOTO_CATEGORIES,
  photosArchiveHref,
} from "@/data/photos";
import { formatLongDate } from "@/lib/dates";
import { propertyHref } from "@/lib/property-links";

import { PhotoChips } from "./photo-chips";
import { ChevronRightIcon, DownloadIcon } from "./photo-icons";
import { PhotoPreviewDialog } from "./photo-preview-dialog";
import { PhotoSection } from "./photo-section";

const ALL = "all";

// Indoor's "All Media" is a preview of the whole interior set, not the set
// itself: it shows one room's worth of frames so the band stays the same length
// as every room tab beside it, instead of stacking every room into one long
// scroll.
const INDOOR_PREVIEW_COUNT = 6;

// The room rail opens on a room rather than on everything — Bedroom 1 for a
// property shot in the usual order. Read off the rail's own order rather than
// hardcoded, so a house whose interior shoot skipped Bedroom 1 opens on its
// first room instead of on an empty grid.
const firstIndoorRoom = (photos) =>
  INDOOR_ROOMS.find(({ key }) =>
    photos.some((photo) => photo.category === "indoor" && photo.room === key)
  )?.key ?? ALL;

const PhotosView = ({ property, photos }) => {
  const [category, setCategory] = useState(ALL);
  const [room, setRoom] = useState(() => firstIndoorRoom(photos));

  // The frame the preview is open on, or null while the gallery is at rest.
  // Held here rather than per tile so only one dialog can ever be open, and so
  // every section shares it.
  const [preview, setPreview] = useState(null);

  // Stable, so the dialog's mount effect does not re-run on every render of
  // this view.
  const closePreview = useCallback(() => setPreview(null), []);

  // Both rails are built from this property's own gallery: a category or a room
  // nobody shot for this villa never gets a chip the buyer can press into an
  // empty result.
  const categoryChips = useMemo(() => {
    const counts = photos.reduce((tally, photo) => {
      tally.set(photo.category, (tally.get(photo.category) ?? 0) + 1);
      return tally;
    }, new Map());

    return [
      { key: ALL, label: "All Media", count: photos.length },
      ...PHOTO_CATEGORIES.filter(({ key }) => counts.has(key)).map(
        ({ key, label }) => ({ key, label, count: counts.get(key) })
      ),
    ];
  }, [photos]);

  const roomChips = useMemo(() => {
    const counts = photos.reduce((tally, photo) => {
      if (photo.category !== "indoor") return tally;
      tally.set(photo.room, (tally.get(photo.room) ?? 0) + 1);
      return tally;
    }, new Map());

    const indoorTotal = [...counts.values()].reduce((sum, n) => sum + n, 0);

    return [
      // The badge counts what the chip actually opens — the preview — not the
      // whole interior set, so it reads the same length as the room chips.
      {
        key: ALL,
        label: "All Media",
        count: Math.min(indoorTotal, INDOOR_PREVIEW_COUNT),
      },
      ...INDOOR_ROOMS.filter(({ key }) => counts.has(key)).map(
        ({ key, label }) => ({ key, label, count: counts.get(key) })
      ),
    ];
  }, [photos]);

  // One entry per band on screen. `total` is the category's whole count and
  // `items` is what the room rail left, so the Indoor heading keeps stating the
  // set's size while the grid below it shows one room.
  const sections = useMemo(
    () =>
      PHOTO_CATEGORIES.filter(({ key }) => category === ALL || category === key)
        .map(({ key, label }) => {
          const inCategory = photos.filter((photo) => photo.category === key);

          return {
            key,
            label,
            total: inCategory.length,
            items:
              key === "indoor"
                ? room === ALL
                  ? inCategory.slice(0, INDOOR_PREVIEW_COUNT)
                  : inCategory.filter((photo) => photo.room === room)
                : inCategory,
          };
        })
        .filter((section) => section.total > 0),
    [photos, category, room]
  );

  // The gallery's own last shoot date, not today's — ISO strings sort lexically.
  const lastUpdated = useMemo(
    () =>
      photos.reduce(
        (latest, photo) => (photo.captured > latest ? photo.captured : latest),
        ""
      ),
    [photos]
  );

  const indoorEmpty = sections.some(
    (section) => section.key === "indoor" && section.items.length === 0
  );

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
            Photos
          </li>
        </ol>
      </nav>

      <div className="flex justify-between items-start flex-col gap-18 md:gap-16 md:items-center md:flex-row lg:items-start lg:flex-col xl:items-end xl:flex-row">
        <PageHeader
          eyebrow="Project media"
          accent="Photos"
          title="& Gallery"
          description="Construction progress, outdoor views and room-by-room interiors — your villa documented as it comes to life."
        />

        <div className="flex w-full flex-col gap-8 sm:w-auto sm:items-end lg:items-start xl:items-end md:gap-12">
          <p className="order-2 justify-center whitespace-nowrap text-body-xs flex gap-5 text-text-secondary md:order-1 lg:justify-end">
            Last updated{" "}
            <span className="font-semibold text-text-primary">
              {formatLongDate(lastUpdated)}
            </span>{" "}
            · {photos.length} photos
          </p>

          <Button
            asChild
            width="full"
            className="order-1 py-12 px-20 font-semibold md:order-2 md:w-auto"
          >
            <a href={photosArchiveHref(property.slug)} download>
              <DownloadIcon className="size-16 shrink-0 text-[#E7BE7B]" />
              Download all (ZIP)
            </a>
          </Button>
        </div>
      </div>

      {photos.length === 0 ? (
        <div className="rounded-2xl border border-border-subtle bg-surface px-20 py-40 text-center">
          <p className="text-body font-semibold text-text-primary">
            No photos have been published for {property.name} yet.
          </p>
          <p className="pt-4 text-body text-text-secondary">
            Progress shots and interiors appear here as soon as your project
            team uploads them.
          </p>
        </div>
      ) : (
        <>
          {/* The rule closes the header block on mobile, where the chips sit
              directly beneath it; desktop separates them with whitespace. */}
          <div className="h-px my-8 bg-border-subtle lg:hidden" />

          <PhotoChips
            chips={categoryChips}
            value={category}
            onChange={setCategory}
            label="Filter photos by category"
          />

          <div className="flex flex-col gap-24 sm:gap-32 lg::gap-44">
            {sections.map((section) => (
              <PhotoSection
                key={section.key}
                label={section.label}
                total={section.total}
                photos={section.items}
                onOpen={setPreview}
              >
                {section.key === "indoor" ? (
                  <PhotoChips
                    chips={roomChips}
                    value={room}
                    onChange={setRoom}
                    label="Filter interiors by room"
                  />
                ) : null}
              </PhotoSection>
            ))}
          </div>

          {indoorEmpty ? (
            <div className="rounded-2xl border border-border-subtle bg-surface px-20 py-40 text-center">
              <p className="text-body font-semibold text-text-primary">
                No interiors match this room.
              </p>
              <Button
                variant="link"
                onClick={() => setRoom(ALL)}
                className="pt-12 text-body-xs"
              >
                Show all rooms
              </Button>
            </div>
          ) : null}
        </>
      )}

      {preview ? (
        <PhotoPreviewDialog photo={preview} onClose={closePreview} />
      ) : null}
    </div>
  );
};

export { PhotosView };
