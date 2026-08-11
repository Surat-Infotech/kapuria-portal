import { AmenitiesCard } from "./amenities-card";
import { LocationSection } from "./location-section";
import { SectionHeading } from "./section-heading";
import { SpecificationsCard } from "./specifications-card";

const SummaryPanel = ({ property }) => (
  <div className="flex flex-col gap-32">
    <section className="flex flex-col gap-24">
      <SectionHeading rule={false}>Welcome to Your Property</SectionHeading>

      <div className="flex flex-col gap-16">
        {property.intro.map((paragraph) => (
          <p key={paragraph} className="text-body-relaxed text-text-secondary">
            {paragraph}
          </p>
        ))}
      </div>
    </section>

    <section className="flex flex-col gap-16">
      <SectionHeading>Specifications</SectionHeading>
      <SpecificationsCard specifications={property.specifications} />
    </section>

    <section className="flex flex-col gap-16">
      <SectionHeading>Amenities</SectionHeading>
      <AmenitiesCard amenities={property.amenities} />
    </section>

    <section className="flex flex-col gap-16">
      <SectionHeading>Location</SectionHeading>
      <LocationSection
        nearby={property.nearby}
        mapLabel={`${property.name} — ${property.location}`}
        // Comma-joined rather than the em dash the label uses: Google reads
        // "place, address" as a search within that address, so an unlisted
        // project name still falls back to the right spot on the map.
        mapQuery={`${property.name}, ${property.location}`}
      />
    </section>
  </div>
);

export { SummaryPanel };
