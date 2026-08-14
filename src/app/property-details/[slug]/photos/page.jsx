import { notFound } from "next/navigation";

import { PortalShell } from "@/components/layout/portal-shell";
import { getPhotosForProperty } from "@/data/photos";
import { getPropertyBySlug, propertySlugs } from "@/data/properties";

import { PhotosView } from "./_components/photos-view";

const user = {
  initials: "AA",
  name: "Anil Ambani",
  meta: "Buyer · 2 properties",
};

// Same reasoning as the property summary it sits under: the portfolio is known
// at build time, so every property's gallery prerenders.
export function generateStaticParams() {
  return propertySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) return {};

  return {
    title: `Photos & Gallery — ${property.name} — Kapuria Portal`,
    description: `Construction progress, outdoor views and room-by-room interiors for ${property.name}.`,
  };
}

export default async function PropertyPhotosPage({ params }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  // A slug the buyer doesn't own — or a stale bookmark — is a 404 rather than
  // a half-rendered page.
  if (!property) notFound();

  // A property with nothing shot yet is a valid page with an empty gallery, not
  // a 404: the buyer owns the villa, the photographer just hasn't been.
  return (
    <PortalShell user={user}>
      <PhotosView property={property} photos={getPhotosForProperty(slug)} />
    </PortalShell>
  );
}
