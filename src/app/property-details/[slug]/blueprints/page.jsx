import { notFound } from "next/navigation";

import { PortalShell } from "@/components/layout/portal-shell";
import { getDrawingsForProperty } from "@/data/blueprints";
import { getPropertyBySlug, propertySlugs } from "@/data/properties";

import { BlueprintsView } from "./_components/blueprints-view";

const user = {
  initials: "AA",
  name: "Anil Ambani",
  meta: "Buyer · 2 properties",
};

// Same reasoning as the property summary it sits under: the portfolio is known
// at build time, so every property's drawings page prerenders.
export function generateStaticParams() {
  return propertySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) return {};

  return {
    title: `Blueprints & Drawings — ${property.name} — Kapuria Portal`,
    description: `Sanctioned architectural, structural and services drawings for ${property.name}, organised by discipline and floor.`,
  };
}

export default async function PropertyBlueprintsPage({ params }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  // A slug the buyer doesn't own — or a stale bookmark — is a 404 rather than
  // a half-rendered page.
  if (!property) notFound();

  // A property with nothing issued yet is a valid page with an empty set, not
  // a 404: the buyer owns the villa, the drawings just haven't been released.
  return (
    <PortalShell user={user}>
      <BlueprintsView
        property={property}
        drawings={getDrawingsForProperty(slug)}
      />
    </PortalShell>
  );
}
