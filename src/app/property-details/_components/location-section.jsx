import MapPinIcon from "@/assets/svgs/common/map-pin";

// Google's keyless embed: `output=embed` serves the same map the search page
// renders, with a marker on the query, so the portal holds a real location
// without a Maps API key to provision. Move to the Maps Embed API (which does
// need a key) if the design ever asks for custom map styling.
const mapEmbedSrc = (query) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`;

const STICKY = "lg:sticky lg:top-24";

const LocationSection = ({ nearby, mapLabel, mapQuery }) => (
  <div className="grid gap-16 lg:grid-cols-[208px_1fr] lg:items-start lg:gap-24">
    <div className={`relative order-2 py-0 xl:py-24 lg:order-1 ${STICKY}`}>
      <h3 className="text-h5 hidden pb-16 font-semibold border-b border-border-subtle text-text-primary lg:block">
        Nearby Locations
      </h3>

     <ul>
        {nearby.map(({ place, distance }) => (
          <li
            key={place}
            className="flex items-center justify-between gap-12 border-b border-border-subtle py-8 last:border-b-0 lg:flex-col lg:items-start lg:gap-2 lg:py-16"
          >
            <span className="text-body font-medium text-text-primary lg:text-[16px]/[24px]">
              {place}
            </span>
            <span className="text-body shrink-0 text-[rgba(8,34,53)0.60]">
              {distance}
            </span>
          </li>
        ))}
      </ul>

      {/* The sticky column outruns the map on tall lists, so the tail fades
          into the page instead of ending on a hard cut. Masking the whole
          overlay ramps the page tint and the blur together. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0  h-96 bg-background backdrop-blur-[2px] mask-[linear-gradient(to_bottom,transparent,black)] lg:h-250" />
    </div>

    <div
      className={`order-1 rounded-2xl border border-border-subtle bg-surface p-16 lg:order-2 lg:p-24 ${STICKY}`}
    >
      <div className="aspect-311/210 relative overflow-hidden rounded-2xl bg-surface-sunken lg:aspect-824/484">
        <iframe
          title={mapLabel}
          src={mapEmbedSrc(mapQuery ?? mapLabel)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      </div>
    </div>
  </div>
);

export { LocationSection };
