import Image from "next/image";

import { GeneratedIcon } from "./photo-icons";

// One tile in the gallery: the frame edge to edge with its caption laid over
// the foot of it. The whole tile is the button — a buyer aiming at a photo
// aims at the picture, not at a control tucked into a corner of it.
//
// The scrim is a gradient rather than a flat wash so the top of the frame stays
// untouched; a caption over a pale interior needs the ground beneath it dark,
// and nowhere else does.

// Every grid on this page is 2 up, then 3, then 4 at the widest — see
// `photo-grid` — so the intrinsic size the browser picks follows the same
// steps.
export const PHOTO_SIZES =
  "(max-width: 768px) 50vw, (max-width: 1536px) 33vw, 25vw";

const GeneratedBadge = () => (
  <span className="absolute top-14 right-14 z-10 hidden md:inline-flex items-center gap-4 rounded-[30px] bg-[rgba(8,34,53,0.60)] px-8 py-4 text-[10px]/[14px] font-bold tracking-[0.5px] text-white uppercase backdrop-blur-[28px]">
    <GeneratedIcon className="h-12 w-14 shrink-0" />
    Generated
  </span>
);

const PhotoCard = ({ photo, onOpen }) => (
  <button
    type="button"
    onClick={() => onOpen(photo)}
    aria-label={`View ${photo.title} — ${photo.caption}`}
    className="group relative isolate flex aspect-163/150 w-full cursor-pointer items-end overflow-hidden rounded-2xl bg-surface-sunken text-left outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:aspect-259/185"
  >
    <Image
      src={photo.image}
      alt={photo.alt}
      fill
      sizes={PHOTO_SIZES}
      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
    />

    {/* Held to the bottom half rather than run the full height: a pale
        interior loses its light the moment a scrim crosses it, and the caption
        only ever needs the ground under itself darkened. */}
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,26,42,0.88)_0%,rgba(6,26,42,0.42)_20%,rgba(6,26,42,0)_52%)]"
    />

    {photo.generated ? <GeneratedBadge /> : null}

    <div className="relative flex w-full min-w-0 flex-col p-12 md:p-16">
      <h3 className="truncate text-body-xs font-semibold text-white md:text-body">
        {photo.title}
      </h3>
      <p className="truncate text-[10px]/[14px] text-white/80 md:text-body-xs">
        {photo.caption}
      </p>
    </div>
  </button>
);

export { PhotoCard };
