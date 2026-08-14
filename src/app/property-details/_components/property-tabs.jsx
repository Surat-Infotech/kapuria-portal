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
// Summary page itself, which is this route. `linked: false` draws the row but
// holds the buyer on the page they are on; flip it back to true to hand that
// section its navigation again.
const PROPERTY_SECTIONS = [
  { segment: "", label: "Summary", Icon: SummaryIcon, linked: true },
  {
    segment: "blueprints",
    label: "Blueprints",
    Icon: BlueprintsIcon,
    linked: false,
  },
  {
    segment: "3d-drawings",
    label: "3D Drawings",
    Icon: DrawingsIcon,
    linked: false,
  },
  { segment: "photos", label: "Photos", Icon: PhotosIcon, linked: false },
];

const PropertyTabs = ({ slug, activeSegment = "" }) => (
  <nav
    aria-label="Property sections"
    className="flex gap-8 overflow-x-auto border-b border-border-subtle [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
  >
    {PROPERTY_SECTIONS.map(({ segment, label, Icon, linked }) => {
      const active = segment === activeSegment;

      // A section that is not linked keeps the row's look but is inert: a span
      // rather than an anchor, so there is nothing to click, tab to, or open in
      // a new tab.
      const Tab = linked ? Link : "span";

      return (
        <Tab
          key={label}
          {...(linked ? { href: propertyHref(slug, segment) } : {})}
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
        </Tab>
      );
    })}
  </nav>
);

export { PROPERTY_SECTIONS, PropertyTabs };
