import sheetElevationBlock from "@/assets/images/blueprints-drawing/blue-prints-1.webp";
import sheetUpperPlan from "@/assets/images/blueprints-drawing/blue-prints-2.webp";
import sheetProposedBuilding from "@/assets/images/blueprints-drawing/blue-prints-3.webp";
import sheetDimensionedPlan from "@/assets/images/blueprints-drawing/blue-prints-4.webp";
import sheetElevationPlan from "@/assets/images/blueprints-drawing/blue-prints-5.webp";
import sheetUpperPlanPrior from "@/assets/images/blueprints-drawing/blue-prints-6.webp";

/**
 * The sanctioned drawing set behind `/property-details/[slug]/blueprints` —
 * one page per property, reached from that property's Blueprints tab.
 *
 * Documents are kept out of `properties.js` on purpose: the properties record
 * describes the house, this one describes the paperwork issued for it, and the
 * two will arrive from different endpoints. The page only ever reads through
 * `getDrawingsForProperty`, so swapping this file for a fetch is a one-line
 * change there.
 *
 * Per drawing:
 *   discipline — key into DRAWING_DISCIPLINES; drives the filter chips, and a
 *                discipline nobody has drawings for never gets a chip.
 *   floor      — key into DRAWING_FLOORS, or `null` for a sheet that covers the
 *                whole villa (elevations, sections, the site layout). Those
 *                survive every floor filter, because an elevation is just as
 *                relevant whichever storey the buyer is looking at.
 *   current    — the latest approved revision. `false` is a sheet kept for the
 *                record after a re-issue; the card labels it Superseded so a
 *                buyer never builds off a drawing that has moved on.
 *   updated    — ISO date. Sorting and both display formats derive from it, so
 *                nothing here is a pre-formatted string that could drift.
 *   image      — the sheet thumbnail. `blue-prints-2` and `blue-prints-6` are
 *                the same scan, so they are only ever used as a plan and its
 *                own superseded revision — the repeat on screen is then the
 *                truth about the sheet rather than a stand-in that ran out.
 *   file       — placeholder path until the documents service hands back signed
 *                URLs. The shape is what matters; nothing is served from it yet.
 */

export const DRAWING_DISCIPLINES = [
  { key: "floor-plan", label: "Floor Plans", short: "Floor Plan" },
  { key: "sectional", label: "Sectional", short: "Sectional" },
  { key: "foundation", label: "Foundation & Layout", short: "Foundation" },
  { key: "structure", label: "Structure", short: "Structure" },
  { key: "elevation", label: "Elevation & Section", short: "Elevation" },
  { key: "electrical", label: "Electrical", short: "Electrical" },
  { key: "hvac", label: "HVAC", short: "HVAC" },
];

// `badge` is what the thumbnail corner carries — it has room for four
// characters and no more.
export const DRAWING_FLOORS = [
  { key: "ground", label: "Ground", badge: "G/F" },
  { key: "first", label: "First", badge: "1/F" },
  { key: "second", label: "Second", badge: "2/F" },
  { key: "terrace", label: "Terrace", badge: "T/F" },
];


// Six sheets per property — the set the project team has released to the buyer,
// not the full drawing register. Both properties draw on the same six scans;
// what differs is the register around them: which disciplines are open, which
// storeys are covered, the revision each sheet is at, and when it was issued.
const serenityPalmsDrawings = [
  {
    id: "spm-fp-01",
    title: "Ground Floor Plan",
    discipline: "floor-plan",
    floor: "ground",
    scale: "1:100",
    revision: "Rev D",
    format: "PDF",
    size: "3.1 MB",
    updated: "2024-06-12",
    current: true,
    image: sheetDimensionedPlan,
    file: "/documents/serenity-palms/ground-floor-plan.pdf",
  },
  {
    id: "spm-fp-02",
    title: "First Floor Plan",
    discipline: "floor-plan",
    floor: "first",
    scale: "1:100",
    revision: "Rev D",
    format: "PDF",
    size: "2.8 MB",
    updated: "2024-06-12",
    current: true,
    image: sheetUpperPlan,
    file: "/documents/serenity-palms/first-floor-plan.pdf",
  },
  {
    id: "spm-elv-01",
    title: "Front Elevation & Section",
    discipline: "elevation",
    floor: null,
    scale: "1:100",
    revision: "Rev C",
    format: "PDF",
    size: "2.9 MB",
    updated: "2024-05-28",
    current: true,
    image: sheetProposedBuilding,
    file: "/documents/serenity-palms/front-elevation-section.pdf",
  },
  {
    id: "spm-sec-01",
    title: "Section A–A",
    discipline: "sectional",
    floor: null,
    scale: "1:100",
    revision: "Rev C",
    format: "PDF",
    size: "2.2 MB",
    updated: "2024-05-28",
    current: true,
    image: sheetElevationBlock,
    file: "/documents/serenity-palms/section-aa.pdf",
  },
  {
    id: "spm-fnd-01",
    title: "Site Layout Plan",
    discipline: "foundation",
    floor: null,
    scale: "1:200",
    revision: "Rev B",
    format: "PDF",
    size: "5.4 MB",
    updated: "2024-04-22",
    current: true,
    image: sheetElevationPlan,
    file: "/documents/serenity-palms/site-layout-plan.pdf",
  },
  {
    id: "spm-fp-03",
    title: "First Floor Plan",
    discipline: "floor-plan",
    floor: "first",
    scale: "1:100",
    revision: "Rev C",
    format: "PDF",
    size: "2.7 MB",
    updated: "2024-03-18",
    current: false,
    image: sheetUpperPlanPrior,
    file: "/documents/serenity-palms/first-floor-plan-rev-c.pdf",
  },
];

// A handed-over house: a different discipline mix, later revisions, and its own
// superseded sheet kept on record after re-issue.
const amaraFarmhouseDrawings = [
  {
    id: "amf-fp-01",
    title: "Ground Floor Plan",
    discipline: "floor-plan",
    floor: "ground",
    scale: "1:100",
    revision: "Rev F",
    format: "PDF",
    size: "3.6 MB",
    updated: "2024-02-20",
    current: true,
    image: sheetElevationPlan,
    file: "/documents/amara-farmhouse/ground-floor-plan.pdf",
  },
  {
    id: "amf-fp-02",
    title: "First Floor Plan",
    discipline: "floor-plan",
    floor: "first",
    scale: "1:100",
    revision: "Rev F",
    format: "PDF",
    size: "3.4 MB",
    updated: "2024-02-20",
    current: true,
    image: sheetUpperPlan,
    file: "/documents/amara-farmhouse/first-floor-plan.pdf",
  },
  {
    id: "amf-elv-01",
    title: "Front & Rear Elevation",
    discipline: "elevation",
    floor: null,
    scale: "1:100",
    revision: "Rev E",
    format: "PDF",
    size: "3.2 MB",
    updated: "2024-02-20",
    current: true,
    image: sheetProposedBuilding,
    file: "/documents/amara-farmhouse/front-rear-elevation.pdf",
  },
  {
    id: "amf-fp-03",
    title: "Terrace Plan",
    discipline: "floor-plan",
    floor: "terrace",
    scale: "1:100",
    revision: "Rev C",
    format: "PDF",
    size: "2.0 MB",
    updated: "2023-12-15",
    current: true,
    image: sheetDimensionedPlan,
    file: "/documents/amara-farmhouse/terrace-plan.pdf",
  },
  {
    id: "amf-str-01",
    title: "Column & Beam Schedule",
    discipline: "structure",
    floor: null,
    scale: "1:50",
    revision: "Rev B",
    format: "PDF",
    size: "1.4 MB",
    updated: "2023-09-04",
    current: true,
    image: sheetElevationBlock,
    file: "/documents/amara-farmhouse/column-beam-schedule.pdf",
  },
  {
    id: "amf-fp-04",
    title: "First Floor Plan",
    discipline: "floor-plan",
    floor: "first",
    scale: "1:100",
    revision: "Rev E",
    format: "PDF",
    size: "3.3 MB",
    updated: "2023-11-09",
    current: false,
    image: sheetUpperPlanPrior,
    file: "/documents/amara-farmhouse/first-floor-plan-rev-e.pdf",
  },
];

const DRAWINGS_BY_SLUG = {
  "serenity-palms": serenityPalmsDrawings,
  "amara-farmhouse": amaraFarmhouseDrawings,
};

/** The drawing set for a property; an empty array for one with nothing issued. */
export const getDrawingsForProperty = (slug) => DRAWINGS_BY_SLUG[slug] ?? [];

/** Where "Download all (ZIP)" points — one archive per property. */
export const drawingsArchiveHref = (slug) => `/documents/${slug}/blueprints.zip`;
