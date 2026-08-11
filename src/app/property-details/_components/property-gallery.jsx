import { StatusPill } from "@/components/common/status-pill";

import { ComputerGeneratedIcon, RealPhotoIcon } from "./property-icons";
import { MediaFrame } from "./media-frame";

// What the hero actually shows. A property still on site carries renders, a
// handed-over one carries photographs, and the badge says which so a buyer is
// never left guessing whether they're looking at the house or the plan for it.
const MEDIA_BADGES = {
  render: { label: "Computer generated", Icon: ComputerGeneratedIcon },
  photo: { label: "Real photo", Icon: RealPhotoIcon },
};

// Desktop is a 2-up grid: the hero fills the left column and the three
// supporting shots stack down the right, sized in the 203/211 split the Figma
// uses. Mobile drops to a single column — hero, wide shot, then the last two
// side by side — and moves the property name onto the hero, which is where the
// design puts it below lg.
const PropertyGallery = ({ property }) => {
  const [hero, wide, ...pair] = property.gallery;
  const badge = MEDIA_BADGES[property.media];

  return (
    <div className="grid gap-16 md:grid-cols-[1.44fr_1fr]">
      <MediaFrame
        src={hero.src}
        alt={hero.alt}
        label={hero.label}
        tone={1}
        // The hero is the page's LCP element, so it skips lazy loading.
        priority
        sizes="(max-width: 992px) 100vw, 46vw"
        className="aspect-335/296 rounded-[20px] md:aspect-666/420"
      >
        {/* Badges: stacked to the right on mobile, pinned to opposite corners
            from lg up. */}
        <div className="absolute inset-x-12 top-12 flex flex-col items-end gap-8 lg:inset-x-16 lg:top-16 md:flex-row md:justify-between md:items-center xl:flex-row xl:items-center xl:justify-between">
          {badge ? (
            <span className="rounded-[30px] text-white uppercase font-semibold tracking-[1px] inline-flex items-center gap-4 py-4 px-8 text-[10px]/[14px] bg-[rgba(8,34,53,0.60)] backdrop-filter lg:trading-normal backdrop-blur-[28px]">
              <badge.Icon className="size-13 shrink-0" />
              {badge.label}
            </span>
          ) : null}

          {property.status ? <StatusPill status={property.status} /> : null}
        </div>

        {/* Keeps the overlaid name readable whatever the photo behind it. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-navy-900/85 to-transparent lg:hidden" />

        {/* The name only rides the hero on mobile — desktop carries it in the
            page header above the gallery. */}
        <div className="absolute inset-x-16 bottom-16 lg:hidden">
          <h1 className="text-[26px]/[34px] font-semibold text-white sm:text-[28px]/[36px] md:text-[30px]/[38px]">
            {property.name}
          </h1>
          <p className="text-body pt-4 text-white/80">{property.location}</p>
        </div>
      </MediaFrame>

      <div className="grid gap-16 lg:grid-rows-[203fr_211fr]">
        {wide ? (
          <MediaFrame
            src={wide.src}
            alt={wide.alt}
            label={wide.label}
            tone={2}
            sizes="(max-width: 992px) 100vw, 32vw"
            className="aspect-335/150 md:aspect-auto"
          />
        ) : null}

        <div className="grid grid-cols-2 gap-16">
          {pair.map((item, index) => (
            <MediaFrame
              key={item.alt}
              src={item.src}
              alt={item.alt}
              label={item.label}
              tone={index === 0 ? 3 : 4}
              className="aspect-162/108 md:aspect-auto"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { PropertyGallery };
