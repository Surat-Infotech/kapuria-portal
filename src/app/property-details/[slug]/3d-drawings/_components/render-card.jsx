import Image from "next/image";

import { OriginBadge } from "./origin-badge";

// One tile in the render grid: the visual edge to edge with its title laid over
// the foot of it, and its origin stamped in the corner. The whole tile is the
// button — a buyer aiming at a render aims at the picture, not at a control
// tucked into a corner of it.

// The grid runs 1 up, then 2, then 3 at the widest — see `RenderGrid` below —
// so the intrinsic size the browser picks follows the same steps.
export const RENDER_SIZES = "(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw";

const RenderCard = ({ render, onOpen }) => (
  <button
    type="button"
    onClick={() => onOpen(render)}
    aria-label={`Open ${render.title} — ${render.caption}`}
    className="group relative isolate flex aspect-290/217 w-full cursor-pointer items-end overflow-hidden rounded-2xl bg-[#C2AD90] text-left outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:aspect-352/235"
  >
    <Image
      src={render.image}
      alt={render.alt}
      fill
      sizes={RENDER_SIZES}
      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
    />

    {/* Held to the bottom half rather than run the full height: a daylit
        exterior loses its sky the moment a scrim crosses it, and the title only
        ever needs the ground under itself darkened. */}
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,34,53,0.00)_51.16%,rgba(0,27,46,0.76)_100%)]"
    />

    <OriginBadge
      generated={render.generated}
      className="absolute top-16 right-16 md:right-24 md:top-24"
    />

    <div className="relative flex w-full min-w-0 flex-col gap-4 p-16 sm:p-20 md:p-24">
      <h3 className="truncate text-body font-semibold text-white">
        {render.title}
      </h3>
      <p className="truncate text-body-xs text-white/80">{render.caption}</p>
    </div>
  </button>
);

const RenderGrid = ({ renders, onOpen }) => (
  <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 xl:grid-cols-3 lg:gap-24">
    {renders.map((render) => (
      <RenderCard key={render.id} render={render} onOpen={onOpen} />
    ))}
  </div>
);

export { RenderCard, RenderGrid };
