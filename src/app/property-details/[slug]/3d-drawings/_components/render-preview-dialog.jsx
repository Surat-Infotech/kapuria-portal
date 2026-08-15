"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import Image from "next/image";

import { CloseIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  RENDER_ARCHITECT,
  RENDER_AUTHOR,
  RENDER_FILE,
} from "@/data/3d-drawings";
import { formatLongDate } from "@/lib/dates";
import { cn } from "@/lib/utils";

import { OriginBadge } from "./origin-badge";
import { DownloadIcon } from "./render-icons";

// The visual at full size with its record beside it — what the hero button and
// every tile open. The panel skeleton follows the Blueprints and Photos
// previews, a bottom sheet below md and a centred two-column dialog above it,
// because a buyer moving between the three sections should not have to learn a
// new dialog in each. What differs is the record: a render is described by what
// produced it, where a photo is described by where it was taken.

// The facts in the order the panel reads them — where it looks, what it was set
// out at, then the file, then who to credit. The same seven a blueprint sheet
// states, and every value is the visual's own: `RENDER_FILE` stands in only for
// what a visual arrives without.
const specRows = (render) => [
  { label: "Floor", value: render.floor ?? RENDER_FILE.floor },
  { label: "Scale", value: render.scale ?? RENDER_FILE.scale },
  { label: "Architect", value: RENDER_ARCHITECT },
  { label: "Format", value: render.format ?? RENDER_FILE.format },
  { label: "File size", value: render.size ?? RENDER_FILE.size },
  { label: "Updated", value: formatLongDate(render.updated) },
  { label: "Prepared by", value: RENDER_AUTHOR },
];

// Kept in step with `duration-300` on the panel below. The dialog unmounts on a
// timer rather than on `transitionend`, which the nested buttons' own colour
// transitions also fire — filtering those out costs more than it saves.
const SLIDE_MS = 300;

const RenderPreviewDialog = ({ render, onClose }) => {
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

  // Escape, the body-scroll lock and focus handling follow the photos preview —
  // same job, so the same treatment.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") requestClose();
    };

    const { overflow, paddingRight } = document.body.style;
    const returnFocusTo = document.activeElement;

    // Hiding the page's overflow takes the scrollbar with it, and the viewport
    // widens by its width: the hero and every tile behind the dialog relayout
    // and next/image re-resolves `sizes` on each — at open and again at close,
    // right on top of the slide. Holding the gutter open with padding keeps the
    // geometry identical throughout.
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
        <div className="relative flex w-full shrink-0 flex-col border-b border-gold-300/70 bg-navy-900 md:max-w-[56%] md:shrink md:justify-center md:border-r md:border-b-0 md:border-border-subtle lg:max-w-592">
          <span
            aria-hidden
            className="absolute top-8 left-1/2 z-10 mx-auto h-4 w-40 shrink-0 -translate-1/2 rounded-full bg-white/70 md:hidden"
          />

          {/* Navy behind the frame rather than white: a render that does not
              fill the column reads as a plate on a dark mount, which is how a
              visualisation is presented, and how the tile it was opened from
              already looked. */}
          <Image
            src={render.image}
            alt={render.alt}
            priority
            sizes="(max-width: 767px) 100vw, (max-width: 1008px) 56vw, 538px"
            className="h-300 w-full object-cover md:h-full"
          />

          <OriginBadge
            generated={render.generated}
            className="absolute right-16 bottom-16 md:top-16 md:bottom-auto"
          />
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overscroll-contain">
          <div className="flex flex-col gap-8 px-20 pt-20 pb-16 md:px-28 md:pt-24">
            <div className="flex w-full items-center justify-between">
              <p className="text-[10px]/[14px] font-bold tracking-[2px] text-text-accent uppercase">
                3D Render
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
            {/* The title and the table, nothing between them: the panel states
                the record and the visual beside it does the describing. The
                tile's own caption still carries the one-line reading of it. */}
            <h2
              id={titleId}
              className="text-h4 font-semibold text-text-primary md:text-h3"
            >
              {render.title}
            </h2>
          </div>

          <dl className="flex flex-col px-20 pt-0 md:px-28">
            {specRows(render).map(({ label, value }) => (
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
              <a href={render.image.src} download={`${render.id}.webp`}>
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

export { RenderPreviewDialog };
