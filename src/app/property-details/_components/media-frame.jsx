import Image from "next/image";

import { cn } from "@/lib/utils";

import { ImagePlaceholderIcon } from "./property-icons";

// Real photography isn't wired up yet, so every tile falls back to a dummy
// panel. The tones are drawn from the navy end of the palette because the
// gallery badges sit on top in white — a light placeholder would swallow them.
// Pass `src` (a static import or a remote URL) and the placeholder steps aside.
const TONES = {
  1: "linear-gradient(135deg, #1b4c6e 0%, #0b2233 100%)",
  2: "linear-gradient(135deg, #22506f 0%, #123a56 100%)",
  3: "linear-gradient(140deg, #2c5a78 0%, #17405f 100%)",
  4: "linear-gradient(140deg, #103752 0%, #082235 100%)",
};

const MediaFrame = ({
  src,
  alt,
  label,
  tone = 1,
  sizes = "(max-width: 992px) 50vw, 25vw",
  priority = false,
  className,
  imageClassName,
  children,
}) => (
  <div
    className={cn(
      // 8px is the supporting-tile radius; the hero overrides it to 20px.
      "relative isolate overflow-hidden rounded-lg bg-navy-800",
      className
    )}
  >
    {src ? (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imageClassName)}
      />
    ) : (
      <div
        aria-label={alt}
        role="img"
        className="absolute inset-0 flex flex-col items-center justify-center gap-8"
        style={{ backgroundImage: TONES[tone] ?? TONES[1] }}
      >
        <ImagePlaceholderIcon className="size-26 text-white/45" />
        {label ? (
          <span className="px-12 text-center text-[10px]/[14px] font-semibold tracking-[1.4px] text-white/45 uppercase">
            {label}
          </span>
        ) : null}
      </div>
    )}

    {children}
  </div>
);

export { MediaFrame };
