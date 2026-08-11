import { notFound } from "next/navigation";

import { PortalShell } from "@/components/layout/portal-shell";
import { getPropertyBySlug, propertySlugs } from "@/data/properties";

import { PropertyDetailsView } from "../_components/property-details-view";

const user = {
  initials: "AA",
  name: "Anil Ambani",
  meta: "Buyer · 2 properties",
};

// The portfolio is small and known at build time, so every property
// prerenders and the route never has to hit a request-time render.
export function generateStaticParams() {
  return propertySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) return {};

  return {
    title: `${property.name} — Kapuria Portal`,
    description: property.intro[0],
  };
}

export default async function PropertyDetailsPage({ params }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  // A slug the buyer doesn't own — or a stale bookmark — is a 404 rather than
  // a half-rendered page.
  if (!property) notFound();

  return (
    <PortalShell user={user}>
      <PropertyDetailsView property={property} />
    </PortalShell>
  );
}
