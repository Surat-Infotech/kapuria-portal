import { cn } from "@/lib/utils";

import { ComputerGeneratedIcon, RealPhotoIcon } from "./render-icons";

// The stamp every visual on this page carries: "Computer generated" for the
// modelled ones, "Real photo" for the frames of the house as built.
//
// Unlike the Photos gallery — where the render is the exception and gets the
// only badge — nothing here goes unstamped. A set that mixes the two is only
// readable if both sides say what they are, and a buyer comparing a render
// against its photograph should never have to guess which is which.
//
// Positioning is the caller's: it rides the corner the subject is least likely
// to occupy, and that differs between the hero and a grid tile.
const OriginBadge = ({ generated, className }) => (
  <span
    className={cn(
      "z-10 inline-flex items-center gap-4 w-fit tracking-1 rounded-[30px] bg-[rgba(8,34,53,0.60)] px-10 py-4 text-[10px]/[14px] font-semibold tracking-[0.5px] text-white uppercase backdrop-blur-[28px]",
      className
    )}
  >
    {generated ? (
      <ComputerGeneratedIcon className="h-12 w-14 shrink-0" />
    ) : (
      <RealPhotoIcon className="size-14 shrink-0" />
    )}
    {generated ? "Computer generated" : "Real photo"}
  </span>
);

export { OriginBadge };
