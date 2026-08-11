import { PageHeader } from "@/components/common/page-header";

import { PropertyCard } from "./property-card";

/**
 * "My Properties" — the portfolio list that opens the Buyer Portal. The count
 * sits at the end of the header row on desktop and drops under the intro copy
 * on mobile, which is what PageHeader's `action` slot already does.
 */
const PropertiesView = ({ properties }) => (
  <div className="flex flex-col gap-24 px-16 pt-22 pb-52 lg:gap-32 lg:px-34 lg:pt-32 lg:pb-56">
    <div className="flex flex-col justify-between items-start lg:items-end lg:flex-row gap-18 lg:gap-16">
      <PageHeader
        eyebrow="Your portfolio"
        accent="My"
        title="Properties"
        description="The homes you own with Kapuria. Jump straight into any property’s drawings, photos and documents."
      />
      <p className="text-body text-text-secondary">
        {properties.length}{" "}
        {properties.length === 1 ? "property" : "properties"}
      </p>
    </div>

    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 xl:grid-cols-1 lg:gap-24">
      {properties.map((property, index) => (
        <PropertyCard
          key={property.id}
          property={property}
          priority={index === 0}
        />
      ))}
    </div>
  </div>
);

export { PropertiesView };