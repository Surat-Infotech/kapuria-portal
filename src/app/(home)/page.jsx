import { PortalShell } from "@/components/layout/portal-shell";

import amaraFarmhouse from "@/assets/images/property/properties-2.webp";
import serenityPalms from "@/assets/images/property/properties-1.webp";

import { PropertiesView } from "./_components/properties-view";

export const metadata = {
  title: "My Properties — Kapuria Portal",
};

const user = {
  initials: "AA",
  name: "Anil Ambani",
  meta: "Buyer · 2 properties",
};

// Static content for now — this is the shape the properties API will return.
const properties = [
  {
    id: "serenity-palms",
    name: "Serenity Palms Mansions",
    location: "Sector 120, Mohali, Punjab",
    specs: ["Plot 3,750 sq.m.", "Built 8,041 sq.ft", "3 Bedrooms", "2 Floors"],
    status: { label: "Under construction", tone: "progress" },
    image: serenityPalms,
  },
  {
    id: "amara-farmhouse",
    name: "Amara Farmhouse",
    location: "Mullanpur, New Chandigarh",
    specs: ["Plot 5,200 sq.m.", "Built 6,400 sq.ft", "4 Bedrooms", "2 Floors"],
    status: { label: "Handover complete", tone: "complete" },
    image: amaraFarmhouse,
  },
];

export default function Home() {
  return (
    <PortalShell user={user} searchPlaceholder="Search properties…">
      <PropertiesView properties={properties} />
    </PortalShell>
  );
}
