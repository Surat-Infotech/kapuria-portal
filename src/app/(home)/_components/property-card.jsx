import Image from "next/image";
import Link from "next/link";

import { StatusPill } from "@/components/common/status-pill";
import {
  ArrowRightIcon,
  BlueprintIcon,
  DocumentIcon,
  DrawingsIcon,
  PhotosIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { propertyHref } from "@/lib/property-links";

// Every property exposes the same four document shortcuts, so the row is
// defined once here rather than repeated in the page data. `segment` is
// appended to the property's own URL, which is how each card ends up pointing
// at its own drawings rather than a shared page.
const documentLinks = [
  { label: "Blueprints", icon: BlueprintIcon, segment: "blueprints" },
  { label: "3D Drawings", icon: DrawingsIcon, segment: "3d-drawings" },
  { label: "Photos", icon: PhotosIcon, segment: "photos" },
  { label: "Legal Documents", icon: DocumentIcon, segment: "legal-documents" },
];

/**
 * One row of the portfolio list: photo on the left from lg up, stacked above
 * the details below that. The status pill rides on the photo on mobile and
 * sits beside the property name on desktop. Every link is built from
 * `property.slug`, so the card routes to its own detail page.
 */
const PropertyCard = ({ property, priority = false }) => {
  const href = propertyHref(property.slug);

  return (
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
              <Link
                href={href}
                className="transition-colors duration-200 outline-none hover:text-text-accent focus-visible:text-text-accent"
              >
                {property.name}
              </Link>
            </h2>
            <p className="text-[12px]/[10px] text-text-secondary">
              {property.location}
            </p>
          </div>

          <StatusPill
            status={property.status}
            className="hidden xl:inline-flex"
          />
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
                <Button
                  key={link.label}
                  asChild
                  variant="secondary"
                  size="sm"
                  className="gap-4"
                >
                  <Link href={propertyHref(property.slug, link.segment)}>
                    <Icon className="size-15 shrink-0 text-text-accent" />
                    {link.label}
                  </Link>
                </Button>
              );
            })}
          </div>

          <Button asChild className="w-full xl:w-auto">
            {/* href={href} */}
            <Link href={href}>
              View property
              <span className="sr-only"> {property.name}</span>
              <ArrowRightIcon className="size-15 shrink-0 text-gold-300" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

export { PropertyCard };
