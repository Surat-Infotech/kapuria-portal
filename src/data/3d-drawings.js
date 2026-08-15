import renderMassing from "@/assets/images/3d-drawings/3d-drawings-1.webp";
import renderKitchen from "@/assets/images/3d-drawings/3d-drawings-2.webp";
import renderCutaway from "@/assets/images/3d-drawings/3d-drawings-3.webp";
import renderRearGarden from "@/assets/images/3d-drawings/3d-drawings-4.webp";
import renderMasterSuite from "@/assets/images/3d-drawings/3d-drawings-5.webp";
import renderLandscape from "@/assets/images/3d-drawings/3d-drawings-6.webp";
import renderStreetFacing from "@/assets/images/3d-drawings/3d-drawings-main.webp";

/**
 * The visuals behind `/property-details/[slug]/3d-drawings`. Same arrangement
 * as `@/data/photos` and `@/data/blueprints`: this is the shape the
 * visualisation API will return, so the page only ever reads from here.
 *
 * Per render:
 *   category  — which chip on the rail it files under.
 *   featured  — the headline visual. Exactly one per property; it is what the
 *               hero opens on while the rail sits at "All Renders", and a
 *               category with no featured render simply promotes its first.
 *   generated — a computer-generated visual rather than a photograph. It stamps
 *               the tile, so a buyer never reads a render as the house as
 *               built. The Photos page leaves this as the unmarked default;
 *               here it is the other way round — a render is the norm, so the
 *               rare photograph is what needs saying.
 *
 * And the record the preview panel states beside it, which is the same seven
 * facts a blueprint sheet gives — a buyer moving between the two sections reads
 * one table, not two:
 *   floor     — the storey it looks at. A visual that takes in the whole house,
 *               rather than one level of it, says so.
 *   scale     — what the model was set out at: tight for a room, loose for a
 *               massing study or a plot.
 *   format / size — the exported asset.
 *   updated   — ISO day. The newest across the set is the page's
 *               "Last updated".
 */

// The order the rail lists them in. A category nobody has modelled for a
// property never gets a chip — see the rail in `renders-view` — so this stays
// the full vocabulary rather than one villa's.
export const RENDER_CATEGORIES = [
  { key: "exterior", label: "Exterior" },
  { key: "interior", label: "Interior" },
  { key: "massing", label: "Massing" },
  { key: "aerial", label: "Aerial" },
];

// A villa still going up: the whole design set is modelled, and only the rear
// garden has been photographed against it so far.
const serenityPalmsRenders = [
  {
    id: "spm-3dd-01",
    title: "Street-Facing Elevation",
    caption: "Headline visual",
    description:
      "The headline visual for Serenity Palms — the view buyers see first.",
    alt: "Photoreal render of the villa's street-facing elevation at midday",
    category: "exterior",
    generated: true,
    featured: true,
    floor: "All Floors",
    scale: "1:100",
    format: "WEBP",
    size: "5.2 MB",
    updated: "2024-06-12",
    image: renderStreetFacing,
  },
  {
    id: "spm-3dd-02",
    title: "Massing Study — Axonometric",
    caption: "Concept model",
    description:
      "The volumes as first set out, before the facade materials were chosen.",
    alt: "Axonometric massing study of the villa seen from the street corner",
    category: "massing",
    generated: true,
    floor: "All Floors",
    scale: "1:200",
    format: "WEBP",
    size: "1.8 MB",
    updated: "2024-05-28",
    image: renderMassing,
  },
  {
    id: "spm-3dd-03",
    title: "Kitchen Render",
    caption: "Warm scheme",
    description:
      "The kitchen in the warm scheme — oak fronts, stone tops, brass fittings.",
    alt: "Cutaway render of the kitchen island and run of base units",
    category: "interior",
    generated: true,
    floor: "Ground Floor",
    scale: "1:50",
    format: "WEBP",
    size: "4.4 MB",
    updated: "2024-06-04",
    image: renderKitchen,
  },
  {
    id: "spm-3dd-04",
    title: "Cutaway — Floor Volumes",
    caption: "Sectional model",
    description:
      "A doll's-house cut through both storeys, showing how the plans stack.",
    alt: "Sectional cutaway model showing the ground and first floor volumes",
    category: "massing",
    generated: true,
    floor: "Ground & First",
    scale: "1:100",
    format: "WEBP",
    size: "2.3 MB",
    updated: "2024-05-28",
    image: renderCutaway,
  },
  {
    id: "spm-3dd-05",
    title: "Rear Garden Elevation",
    caption: "Daylight render",
    description:
      "The rear elevation as built, photographed against the design render.",
    alt: "The villa's rear elevation seen across the garden in daylight",
    category: "exterior",
    floor: "All Floors",
    scale: "1:100",
    format: "WEBP",
    size: "3.7 MB",
    updated: "2024-06-10",
    image: renderRearGarden,
  },
  {
    id: "spm-3dd-06",
    title: "Master Suite Render",
    caption: "Evening light",
    description:
      "The master suite lit for evening, with the dressing run left open.",
    alt: "Cutaway render of the master suite with bed, seating and dressing run",
    category: "interior",
    generated: true,
    floor: "First Floor",
    scale: "1:50",
    format: "WEBP",
    size: "4.1 MB",
    updated: "2024-06-04",
    image: renderMasterSuite,
  },
  {
    id: "spm-3dd-07",
    title: "Landscape & Approach",
    caption: "Site context",
    description:
      "The villa in its plot — driveway, planting and the neighbouring line.",
    alt: "Aerial render of the villa in its plot with the approach driveway",
    category: "aerial",
    generated: true,
    floor: "Ground Floor",
    scale: "1:200",
    format: "WEBP",
    size: "6.8 MB",
    updated: "2024-05-20",
    image: renderLandscape,
  },
];

// A handed-over house: the design set was closed before construction, so it
// runs shorter and nothing has been re-issued since.
const amaraFarmhouseRenders = [
  {
    id: "amf-3dd-01",
    title: "Front Elevation — Approach",
    caption: "Headline visual",
    description:
      "The headline visual for Amara Farmhouse — the view from the gate.",
    alt: "Photoreal render of the farmhouse's front elevation from the approach",
    category: "exterior",
    generated: true,
    featured: true,
    floor: "All Floors",
    scale: "1:100",
    format: "WEBP",
    size: "4.8 MB",
    updated: "2023-04-02",
    image: renderStreetFacing,
  },
  {
    id: "amf-3dd-02",
    title: "Massing Study — Axonometric",
    caption: "Concept model",
    description:
      "The volumes as first set out, before the facade materials were chosen.",
    alt: "Axonometric massing study of the farmhouse seen from the corner",
    category: "massing",
    generated: true,
    floor: "All Floors",
    scale: "1:200",
    format: "WEBP",
    size: "1.6 MB",
    updated: "2023-02-14",
    image: renderMassing,
  },
  {
    id: "amf-3dd-03",
    title: "Living Room Render",
    caption: "Neutral scheme",
    description:
      "The living room in the neutral scheme, opened to the garden doors.",
    alt: "Cutaway render of the living room seating and garden doors",
    category: "interior",
    generated: true,
    floor: "Ground Floor",
    scale: "1:50",
    format: "WEBP",
    size: "4.2 MB",
    updated: "2023-03-08",
    image: renderKitchen,
  },
  {
    id: "amf-3dd-04",
    title: "Rear Garden Elevation",
    caption: "Daylight render",
    description:
      "The rear elevation as built, photographed against the design render.",
    alt: "The farmhouse's rear elevation seen across the garden in daylight",
    category: "exterior",
    floor: "All Floors",
    scale: "1:100",
    format: "WEBP",
    size: "3.4 MB",
    updated: "2024-02-20",
    image: renderRearGarden,
  },
  {
    id: "amf-3dd-05",
    title: "Landscape & Approach",
    caption: "Site context",
    description:
      "The farmhouse in its plot — driveway, planting and the orchard line.",
    alt: "Aerial render of the farmhouse in its plot with the approach driveway",
    category: "aerial",
    generated: true,
    floor: "Ground Floor",
    scale: "1:200",
    format: "WEBP",
    size: "6.1 MB",
    updated: "2023-02-14",
    image: renderLandscape,
  },
];

const RENDERS_BY_SLUG = {
  "serenity-palms": serenityPalmsRenders,
  "amara-farmhouse": amaraFarmhouseRenders,
};

/**
 * What the preview panel falls back to. The architect and the studio cover
 * every visual in both sets, so they are stated once rather than repeated on
 * each record — they move onto the render itself the moment the visualisation
 * service starts issuing them per asset. The file facts only stand in for a
 * visual that arrives without its own; the panel reads
 * `render.<field> ?? RENDER_FILE.<field>` for exactly that.
 */
export const RENDER_ARCHITECT = "Vikram Pannu";
export const RENDER_AUTHOR = "Kapuria Design Studio";
export const RENDER_FILE = {
  floor: "All Floors",
  scale: "1:100",
  format: "WEBP",
  size: "4.6 MB",
};

/** The visuals for a property; an empty array for one not yet modelled. */
export const getRendersForProperty = (slug) => RENDERS_BY_SLUG[slug] ?? [];

/** Where "Download all (ZIP)" points — one archive per property. */
export const rendersArchiveHref = (slug) => `/media/${slug}/3d-drawings.zip`;
