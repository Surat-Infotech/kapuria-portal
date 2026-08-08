import Image from "next/image";

import {
  ArrowRightIcon,
  BlueprintIcon,
  DocumentIcon,
  DrawingsIcon,
  PhotosIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Every property exposes the same four document shortcuts, so the row is
// defined once here rather than repeated in the page data.
const documentLinks = [
  { label: "Blueprints", icon: BlueprintIcon },
  { label: "3D Drawings", icon: DrawingsIcon },
  { label: "Photos", icon: PhotosIcon },
  { label: "Legal Documents", icon: DocumentIcon },
];

const statusTones = {
  progress: "bg-[#F3EBD9] text-[#B98634]",
  complete:
    "bg-[linear-gradient(0deg,var(--success-soft)_0%,var(--success-soft)_100%)] bg-[#F3EBD9] text-success-muted",
};

const StatusPill = ({ status, className }) => (
  <span
    className={cn(
      "inline-flex shrink-0 items-center gap-8 rounded-full px-16 py-8 text-body-xs font-bold",
      statusTones[status.tone],
      className
    )}
  >
    <span className="size-6 shrink-0 rounded-full bg-current" />
    {status.label}
  </span>
);

/**
 * One row of the portfolio list: photo on the left from lg up, stacked above
 * the details below that. The status pill rides on the photo on mobile and
 * sits beside the property name on desktop.
 */
const PropertyCard = ({ property, priority = false }) => (
  <article className="flex flex-col overflow-hidden rounded-[18px] border border-border-subtle bg-surface xl:flex-row">
    <div className="relative aspect-320/205 w-full xl:aspect-auto xl:w-320 xl:shrink-0">
      <Image
        src={property.image}
        alt={property.name}
        fill
        priority={priority}
        sizes="(min-width: 1280px) 320px, (min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      <StatusPill
        status={property.status}
        className="absolute top-16 right-16 xl:hidden"
      />
    </div>

    <div className="flex min-w-0 flex-1 flex-col gap-16 p-16 lg:gap-14 lg:p-20 xl:px-28 xl:py-24">
      <div className="flex items-start justify-between gap-16">
        <div className="flex min-w-0 flex-col gap-4">
          <h2 className="text-h4 font-semibold text-text-primary sm:text-[20px]/[28px] lg:text-h3">
            {property.name}
          </h2>
          <p className="text-[12px]/[10px] text-text-secondary">
            {property.location}
          </p>
        </div>

        <StatusPill status={property.status} className="hidden xl:inline-flex" />
      </div>

      {/* Rendered as flex items instead of a joined string so the gap around
          each separator is controllable — HTML collapses repeated spaces. */}
      <p className="flex flex-wrap items-center gap-x-4 text-body-xs text-text-secondary sm:text-body">
        {property.specs.map((spec, index) => (
          <span key={spec} className="flex items-center gap-x-4 lg:gap-x-6">
            {index > 0 && <span aria-hidden="true">·</span>}
            {spec}
          </span>
        ))}
      </p>

      <div className="h-px w-full bg-border-subtle" />

      <div className="flex flex-col gap-16 xl:flex-row lg:items-center lg:gap-8 lg:justify-between">
        <div className="grid grid-cols-2 gap-8 lg:flex lg:flex-wrap">
          {documentLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Button key={link.label} variant="secondary" size="sm" className="gap-4">
                <Icon className="size-15 shrink-0 text-text-accent" />
                {link.label}
              </Button>
            );
          })}
        </div>

        <Button className="w-full xl:w-auto">
          View property
          <ArrowRightIcon className="size-15 shrink-0 text-gold-300" />
        </Button>
      </div>
    </div>
  </article>
);

export { PropertyCard };
