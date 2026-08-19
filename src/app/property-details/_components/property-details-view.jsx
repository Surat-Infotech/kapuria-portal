"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { PropertyGallery } from "./property-gallery";
import { ChevronRightIcon, PropertyContactIcon } from "./property-icons";
import { PropertyTabs } from "./property-tabs";
import { SummaryPanel } from "./summary-panel";

const ContactButton = ({ width }) => (
  <Button asChild width={width} className="font-medium py-12 px-20">
    <Link href="/contact">
      <PropertyContactIcon className="size-16 shrink-0 text-gold-300" />
      Contact project team
    </Link>
  </Button>
);

const PropertyDetailsView = ({ property }) => {
  return (
    <div className="flex flex-col px-16 pt-16 pb-52 gap-24 lg:px-34 lg:pt-32 lg:pb-56">
      {/* Breadcrumb and the page title live above the gallery on desktop only —
          below lg the name is overlaid on the hero instead. */}
      <nav aria-label="Breadcrumb" className="hidden lg:block">
        <ol className="text-body flex items-center gap-8">
          <li>
            <Link
              href="/"
              className="text-text-secondary transition-colors duration-200 hover:text-text-accent"
            >
              My Properties
            </Link>
          </li>
          <li aria-hidden className="flex items-center">
            <ChevronRightIcon className="size-12 text-text-muted" />
          </li>
          <li aria-current="page" className="font-semibold text-text-primary">
            {property.name}
          </li>
        </ol>
      </nav>

      <div className="hidden items-end justify-between gap-24 lg:flex">
        <div className="flex flex-col gap-4 sm:gap-8">
          <h1 className="text-display-sm font-semibold text-text-primary">
            {property.name}
          </h1>
          <p className="text-h4 text-[rgba(11,34,51,0.82)]">
            {property.location}
          </p>
        </div>

        <ContactButton />
      </div>

      <div className="flex flex-col gap-16">
        <PropertyGallery property={property} />

        {/* The design moves the action below the gallery on mobile, full width. */}
        <div className="lg:hidden">
          <ContactButton width="full" />
        </div>
      </div>

      {/* This page is the Summary destination; the rail lights that row and
          the other three navigate away — within this property. */}
      <PropertyTabs slug={property.slug} activeSegment="" />

      <SummaryPanel property={property} />
    </div>
  );
};

export { PropertyDetailsView };
