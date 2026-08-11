import { PortalShell } from "@/components/layout/portal-shell";
import { properties } from "@/data/properties";

import { PropertiesView } from "./_components/properties-view";

export const metadata = {
  title: "My Properties — Kapuria Portal",
};

const user = {
  initials: "AA",
  name: "Anil Ambani",
  meta: "Buyer · 2 properties",
};

export default function Home() {
  return (
    <PortalShell user={user} searchPlaceholder="Search properties…">
      <PropertiesView properties={properties} />
    </PortalShell>
  );
}
