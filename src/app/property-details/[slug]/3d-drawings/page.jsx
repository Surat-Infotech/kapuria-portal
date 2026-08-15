import { notFound } from "next/navigation";

import { PortalShell } from "@/components/layout/portal-shell";
import { getRendersForProperty } from "@/data/3d-drawings";
import { getPropertyBySlug, propertySlugs } from "@/data/properties";

import { RendersView } from "./_components/renders-view";

const user = {
  initials: "AA",
  name: "Anil Ambani",
  meta: "Buyer · 2 properties",
};

// Same reasoning as the property summary it sits under: the portfolio is known
// at build time, so every property's render set prerenders.
export function generateStaticParams() {
  return propertySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) return {};

  return {
    title: `3D Drawings & Renders — ${property.name} — Kapuria Portal`,
    description: `Photoreal renders, interiors and massing studies for ${property.name}.`,
  };
}

export default async function PropertyRendersPage({ params }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  // A slug the buyer doesn't own — or a stale bookmark — is a 404 rather than
  // a half-rendered page.
  if (!property) notFound();

  // A property nothing has been modelled for yet is a valid page with an empty
  // set, not a 404: the buyer owns the villa, the studio just hasn't exported.
  return (
    <PortalShell user={user}>
      <RendersView property={property} renders={getRendersForProperty(slug)} />
    </PortalShell>
  );
}
