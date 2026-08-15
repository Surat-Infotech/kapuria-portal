import Image from "next/image";

import { EyeIcon } from "@/components/icons";

import { OriginBadge } from "./origin-badge";

// The banner one visual gets to itself above the grid — what separates this
// page from the Blueprints sheet list and the Photos gallery, where every asset
// is the same size as every other. A render set has a headline: the frame the
// studio would put on the hoarding, and the one a buyer wants at full width
// rather than a third of it.
//
// It stays put while the rail filters the grid beneath it. Two reasons, and
// both matter: the banner is the property's headline visual rather than a
// result, so swapping it on every chip press turns a fixed point into noise;
// and it is the one visual delivered at banner width, where a 354px tile
// promoted into this frame would come up soft.

// One image, one column, and never more than the page's own width.
const HERO_SIZES = "(max-width: 992px) 100vw, (max-width: 1172px) 92vw, 1108px";

const RenderHero = ({ render, onOpen }) => (
  <section
    aria-label="Featured render"
    className="relative isolate flex aspect-343/277 w-full items-end overflow-hidden rounded-[20px] bg-surface-sunken sm:aspect-video md:aspect-1108/480"
  >
    <Image
      src={render.image}
      alt={render.alt}
      fill
      priority
      sizes={HERO_SIZES}
      className="object-cover"
    />

    {/* Deeper and taller than the tile scrim below: the hero carries a heading
        at display size over a caption line, and two lines of white need more
        ground under them than one does. */}
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,26,42,0.90)_0%,rgba(6,26,42,0.50)_28%,rgba(6,26,42,0)_66%)]"
    />

    {/* Below lg the corner belongs to the button — there is no room for both —
        so the stamp gives way and the tiles below carry the set's origins. */}
    <OriginBadge
      generated={render.generated}
      className="absolute top-16 left-16 hidden lg:inline-flex"
    />

    {/* Top-right on mobile, where the heading fills the foot of the frame;
        bottom-right on desktop, opposite the heading it belongs to. */}
    <button
      type="button"
      onClick={() => onOpen(render)}
      className="absolute top-16 right-16 z-10 inline-flex cursor-pointer items-center gap-8 rounded-full px-20 py-12 text-body-xs font-semibold text-text-primary transition-colors duration-200 ease-out outline-none bg-white md:text-body lg:hidden"
    >
      <EyeIcon className="size-16 shrink-0 text-[#082235]" />
      Open render
    </button>

    <div className="flex items-end justify-between gap-16 w-full p-16 sm:p-20 lg:p-24 xl:p-34">
      <div className="relative flex flex-col gap-4 w-auto lg:gap-8">
        <h2 className="text-h4 font-semibold text-white sm:text-h3 lg:text-display-sm">
          {render.title}
        </h2>
        <p className="text-body-xs text-white/80 sm:text-h5 md:text-h4">
          {render.description}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onOpen(render)}
        className="hidden cursor-pointer whitespace-nowrap items-center gap-8 rounded-full px-22 py-12 text-body-xs font-semibold text-text-primary shadow-[0_8px_24px_rgba(6,26,42,0.24)] backdrop-blur-[10px] transition-colors duration-200 ease-out outline-none bg-white lg:inline-flex"
      >
        <EyeIcon className="size-15 shrink-0 text-[#082235]" />
        Open render
      </button>
    </div>
  </section>
);

export { RenderHero };
