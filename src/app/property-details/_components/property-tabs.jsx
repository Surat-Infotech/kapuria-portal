import Link from "next/link";

import { cn } from "@/lib/utils";
import { propertyHref } from "@/lib/property-links";

import {
  BlueprintsIcon,
  DrawingsIcon,
  PhotosIcon,
  SummaryIcon,
} from "./property-icons";

// `segment` is appended to the property's own URL — an empty one is the
// Summary page itself, which is this route.
const PROPERTY_SECTIONS = [
  { segment: "", label: "Summary", Icon: SummaryIcon },
  { segment: "blueprints", label: "Blueprints", Icon: BlueprintsIcon },
  { segment: "3d-drawings", label: "3D Drawings", Icon: DrawingsIcon },
  { segment: "photos", label: "Photos", Icon: PhotosIcon },
];

const PropertyTabs = ({ slug, activeSegment = "" }) => (
  <nav
    aria-label="Property sections"
    className="flex gap-8 overflow-x-auto border-b border-border-subtle [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
  >
    {PROPERTY_SECTIONS.map(({ segment, label, Icon }) => {
      const active = segment === activeSegment;

      return (
        <Link
          key={label}
          href={propertyHref(slug, segment)}
          aria-current={active ? "page" : undefined}
          className={cn(
            // -mb-px lets the 2px active rule sit on the container hairline
            // instead of floating a pixel above it.
            "text-body-xs -mb-px flex shrink-0 items-center gap-4 border-b-2 py-8 whitespace-nowrap transition-colors duration-200 ease-out outline-none focus-visible:text-text-primary",
            active
              ? "border-[#9A6B21] font-semibold text-text-primary px-4"
              : "border-transparent font-medium text-text-secondary px-8 hover:text-text-primary"
          )}
        >
          <Icon
            className={cn(
              "w-16 h-14 shrink-0",
              active ? "text-text-accent" : "text-text-secondary"
            )}
          />
          {label}
        </Link>
      );
    })}
  </nav>
);

export { PROPERTY_SECTIONS, PropertyTabs };
