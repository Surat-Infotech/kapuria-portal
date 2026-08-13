import Image from "next/image";

import { cn } from "@/lib/utils";

// Every issued drawing carries its own scan, so `src` is the normal path. The
// fallback below only covers a sheet released before its thumbnail lands.
//
// It is drawn light rather than in the navy of MediaFrame's placeholder because
// a drawing is ink on paper — a dark tile would read as an image that failed to
// load, and the floor and revision badges on top are built for a pale ground.
// Deliberately generic: it stands in for a sheet whose contents aren't known
// yet, so guessing at a motif would be inventing what the drawing shows.

const INK = "#0b2233";

const DrawingThumbnail = ({
  src,
  alt,
  sizes = "(max-width: 992px) 100vw, 30vw",
  className,
  children,
}) => (
  <div className={cn(`relative isolate overflow-hidden [box-shadow:0_-12px_20px_0_rgba(15,44,73,0.15)_inset]
 bg-[#eceae4]`, className)}>
    {src ? (
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    ) : (
      <svg
        viewBox="0 0 320 160"
        role="img"
        aria-label={alt}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <rect width="320" height="160" fill="#fbfaf7" />

        {/* Sheet border and title block — the furniture every drawing carries,
            whatever it happens to show. */}
        <g stroke={INK} strokeOpacity="0.3" strokeWidth="1" fill="none">
          <rect x="10" y="10" width="300" height="140" />
          <rect x="232" y="18" width="70" height="124" />
          <path d="M232 44h70M232 66h70M232 96h70M232 120h70" />
        </g>
        <g fill={INK} fillOpacity="0.12">
          <rect x="240" y="26" width="42" height="6" rx="3" />
          <rect x="240" y="52" width="54" height="4" rx="2" />
          <rect x="240" y="74" width="46" height="4" rx="2" />
          <rect x="240" y="82" width="34" height="4" rx="2" />
          <rect x="240" y="104" width="50" height="4" rx="2" />
          <rect x="240" y="128" width="30" height="4" rx="2" />
        </g>
      </svg>
    )}

    {children}
  </div>
);

export { DrawingThumbnail };
