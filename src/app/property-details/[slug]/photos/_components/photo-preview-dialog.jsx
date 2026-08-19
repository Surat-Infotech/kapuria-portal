"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import Image from "next/image";

import { CloseIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  PHOTO_ARCHITECT,
  PHOTO_AUTHOR,
  PHOTO_FILE,
  photoRoomLabel,
} from "@/data/photos";
import { formatLongDate } from "@/lib/dates";
import { cn } from "@/lib/utils";

import { DownloadIcon, GeneratedIcon, RealPhotoIcon } from "./photo-icons";

// The frame at full size with its record beside it — what a tile opens. Same
// panel as the drawings preview in `blueprints/_components`: a bottom sheet
// below md, a centred two-column dialog above it. Only the record differs, and
// the stamp laid over the frame.

// The facts in the order the panel reads them — Floor and Scale first, as the
// drawings panel has them, then Room: a buyer looking at an interior asks which
// room next, and a frame that is not of one room names the villa instead.
const specRows = (photo) => [
  { label: "Floor", value: photo.floor ?? PHOTO_FILE.floor },
  { label: "Scale", value: photo.scale ?? PHOTO_FILE.scale },
  { label: "Room", value: photoRoomLabel(photo) },
  { label: "Architect", value: PHOTO_ARCHITECT },
  { label: "Format", value: photo.format ?? PHOTO_FILE.format },
  { label: "File size", value: photo.size ?? PHOTO_FILE.size },
  { label: "Updated", value: formatLongDate(photo.captured) },
  { label: "Prepared by", value: PHOTO_AUTHOR },
];

// Kept in step with `duration-300` on the panel below. The dialog unmounts on a
// timer rather than on `transitionend`, which the nested buttons' own colour
// transitions also fire — filtering those out costs more than it saves.
const SLIDE_MS = 300;

// Bottom-right on the sheet, top-right on the desktop panel — in both places
// the corner the photo's subject is least likely to occupy.
const OriginBadge = ({ generated }) => (
  <span className="absolute right-16 bottom-16 z-10 inline-flex items-center gap-6 rounded-[30px] bg-[rgba(8,34,53,0.60)] px-10 py-6 text-[10px]/[14px] font-bold tracking-[0.5px] text-white uppercase backdrop-blur-[28px] md:top-16 md:bottom-auto">
    {generated ? (
      <GeneratedIcon className="h-12 w-14 shrink-0" />
    ) : (
      <RealPhotoIcon className="size-14 shrink-0" />
    )}
    {generated ? "Generated" : "Real photo"}
  </span>
);

const PhotoPreviewDialog = ({ photo, onClose }) => {
  const titleId = useId();
  const panelRef = useRef(null);
  const [closing, setClosing] = useState(false);

  // Closing is a request, not the act: the panel slides back down first and the
  // parent only drops it once that has played out. There is no matching `open`
  // state — the entrance is a keyframe that runs on mount, so React has nothing
  // to flip.
  const requestClose = useCallback(() => setClosing(true), []);

  useEffect(() => {
    if (!closing) return undefined;

    const timer = setTimeout(onClose, SLIDE_MS);
    return () => clearTimeout(timer);
  }, [closing, onClose]);

  // Escape, the body-scroll lock and focus handling follow the drawings
  // preview — same job, so the same treatment.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") requestClose();
    };

    const { overflow, paddingRight } = document.body.style;
    const returnFocusTo = document.activeElement;

    // Hiding the page's overflow takes the scrollbar with it, and the viewport
    // widens by its width: the whole gallery behind the dialog relayouts and
    // next/image re-resolves `sizes` on every tile — at open and again at
    // close, right on top of the slide. Holding the gutter open with padding
    // keeps the geometry identical throughout.
    const gutter = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      document.removeEventListener("keydown", onKeyDown);
      // The tile that opened this keeps its place in the tab order.
      returnFocusTo?.focus?.({ preventScroll: true });
    };
  }, [requestClose]);

  return (
    <div className="fixed inset-0 z-60 flex items-end justify-center md:items-center md:p-24">
      <div
        onClick={requestClose}
        aria-hidden
        className={cn(
          "absolute inset-0 bg-navy-900/70 transition-opacity duration-300 ease-out will-change-[opacity]",
          closing ? "opacity-0" : "animate-backdrop-in"
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          "relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[20px] bg-surface outline-none",
          "transition-transform duration-300 ease-out transform-gpu will-change-transform",
          "md:max-h-[86vh] md:max-w-960 md:flex-row md:rounded-[20px] md:shadow-[0_32px_80px_rgba(11,34,51,0.35)]",
          closing ? "translate-y-full" : "animate-sheet-rise"
        )}
      >
        <div className="relative flex w-full shrink-0 flex-col border-b border-gold-300/70 bg-white md:max-w-[56%] lg:max-w-592 md:shrink md:justify-center md:border-r md:border-b-0 md:border-border-subtle">
          <span
            aria-hidden
            className="absolute top-8 left-1/2 z-10 mx-auto h-4 w-40 shrink-0 -translate-1/2 rounded-full bg-[#082235] md:hidden"
          />

          {/* Every preview opens on the same frame for now: the gallery's own
              assets are 259px placeholders and none of them reads at this
              scale. Swap back to the photo itself — `src={photo.image}` — once
              the shoot is delivered at full resolution. */}
          <Image
            src={photo.image}
            alt={`${photo.title} — ${photo.caption}`}
            priority
            sizes="(max-width: 767px) 100vw, (max-width: 1008px) 56vw, 538px"
            className="h-300 w-full object-cover md:h-full"
          />

          <OriginBadge generated={photo.generated} />
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overscroll-contain">
          <div className="flex flex-col gap-8 px-20 pt-20 pb-16 md:px-28 md:pt-24">
            <div className="flex w-full items-center justify-between">
              <p className="text-[10px]/[14px] font-bold tracking-[2px] text-text-accent uppercase">
                {photo.generated ? "Visualisation" : "Photo"}
              </p>
              <button
                type="button"
                onClick={requestClose}
                aria-label="Close preview"
                className="hidden size-38 cursor-pointer items-center justify-center rounded-[10px] bg-[#EFE7DA] text-text-primary transition-colors duration-200 ease-out outline-none hover:bg-[#efe2c9] focus-visible:ring-2 focus-visible:ring-gold-400 md:flex"
              >
                <CloseIcon className="size-16" />
              </button>
            </div>
            <h2
              id={titleId}
              className="text-h4 font-semibold text-text-primary md:text-h3"
            >
              {photo.title}
            </h2>
          </div>

          <dl className="flex flex-col px-20 pt-0 md:px-28">
            {specRows(photo).map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-16 border-b border-border-subtle py-10 first:border-t"
              >
                <dt className="text-body-xs text-text-secondary">{label}</dt>
                <dd className="text-right text-body-xs font-semibold text-text-primary">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Sticky against whichever element is scrolling — the panel below
              md, this column above it. */}
          <div className="sticky bottom-0 mt-auto flex items-center gap-12 bg-surface px-16 pt-16 pb-16 md:px-28 md:pb-26">
            <Button
              variant="secondary"
              onClick={requestClose}
              className="h-42 flex-1 text-btn md:hidden"
            >
              Close
            </Button>

            <Button
              asChild
              className="h-42 flex-[1.4] px-20 text-btn font-semibold md:flex-1"
            >
              <a href={photo.image.src} download={`${photo.id}.webp`}>
                <DownloadIcon className="size-16 shrink-0 text-gold-300" />
                Download
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PhotoPreviewDialog };
