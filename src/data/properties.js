import amaraCard from "@/assets/images/property/properties-2.webp";
import serenityCard from "@/assets/images/property/properties-1.webp";

import amaraOne from "@/assets/images/property-details/amara-farmhouse-1.webp";
import amaraTwo from "@/assets/images/property-details/amara-farmhouse-2.webp";
import amaraThree from "@/assets/images/property-details/amara-farmhouse-3.webp";
import amaraFour from "@/assets/images/property-details/amara-farmhouse-4.webp";
import serenityPalm from "@/assets/images/property-details/serenity-palm-1.webp";

// Both properties carry the same stand-in summary until the project API
// supplies real copy per house, so it is written once here rather than
// duplicated into each record and left to drift.
const summaryPlaceholder = {
  intro: [
    "The architectural construction of an eco-friendly villa combines innovative design with sustainable practices, prioritizing the integration of renewable materials and energy-efficient systems. From the initial blueprint, the emphasis is on maximizing natural light and ventilation, reducing the need for artificial heating or cooling.",
    "The villa's structure often incorporates recycled materials, such as reclaimed wood and repurposed stone, minimizing the ecological footprint while infusing the space with a rustic yet contemporary aesthetic.",
  ],
  specifications: [
    { label: "Plot size", value: "3,750 sq.m." },
    { label: "Built area", value: "8,041 sq.ft" },
    { label: "Bedrooms", value: "3" },
    { label: "Floors", value: "2" },
  ],
  // `icon` is a key into AMENITY_ICONS in amenities-card — see the note there
  // on why this side of the boundary can't name the component directly.
  amenities: [
    // `labelPrefix` is dropped on the narrowest layout — see amenities-card.
    { label: "Swimming Pool", labelPrefix: "Private", icon: "pool" },
    { label: "Living & Dining Room", icon: "living-dining" },
    { label: "Gym", icon: "gym" },
    { label: "Terrace", icon: "terrace" },
    { label: "Barbecue Area", icon: "barbecue" },
    { label: "Jacuzzi", icon: "jacuzzi" },
    { label: "Semi Furnished", icon: "furnished" },
    { label: "Extensive Car Parking", icon: "parking" },
  ],
  nearby: [
    { place: "Airport", distance: "45 mins Drive" },
    { place: "Elante Mall", distance: "45 mins Drive" },
    { place: "VR Punjab", distance: "10 mins Drive" },
    { place: "Nearest Park", distance: "10 mins walk" },
    { place: "Sec 17 Plaza", distance: "45 mins drive" },
  ],
};

/**
 * The buyer's portfolio — one record per property, shared by the list at `/`
 * and the detail page at `/property-details/[slug]`. This is the shape the
 * properties API will return, so the pages below only ever read from here.
 *
 * Per record:
 *   slug     — the URL segment; every link between the two pages is built
 *              from it, so adding a property here is enough to route it.
 *   status   — `tone` picks the pill colour: gold while building, green once
 *              the keys are handed over.
 *   media    — "render" stamps the hero "Computer generated", "photo" stamps
 *              it "Real photo". A buyer should never mistake one for the other.
 *   specs    — the one-line summary on the portfolio card.
 *   gallery  — hero first, then the wide tile, then the bottom pair. An entry
 *              without a `src` falls back to the dummy panel in MediaFrame,
 *              so the layout survives a shoot that hasn't been delivered.
 */
export const properties = [
  {
    ...summaryPlaceholder,
    slug: "serenity-palms",
    name: "Serenity Palms Mansions",
    location: "Sector 120, Mohali, Punjab",
    status: { label: "Under construction", tone: "progress" },
    media: "render",
    image: serenityCard,
    specs: ["Plot 3,750 sq.m.", "Built 8,041 sq.ft", "3 Bedrooms", "2 Floors"],
    gallery: [
      {
        src: serenityPalm,
        alt: "Serenity Palms Mansions — exterior view",
        label: "Exterior render",
      },
      {
        src: amaraTwo,
        alt: "Living room with full-height glazing",
        label: "Living room",
      },
      {
        src: amaraThree,
        alt: "Rear garden and seating deck",
        label: "Garden deck",
      },
      {
        src: amaraFour,
        alt: "Landscaped garden at dusk",
        label: "Garden at dusk",
      },
    ],
  },
  {
    ...summaryPlaceholder,
    slug: "amara-farmhouse",
    name: "Amara Farmhouse",
    location: "Mullanpur, New Chandigarh",
    status: { label: "Handover completed", tone: "complete" },
    media: "photo",
    image: amaraCard,
    specs: ["Plot 5,200 sq.m.", "Built 6,400 sq.ft", "4 Bedrooms", "2 Floors"],
    gallery: [
      {
        src: amaraOne,
        alt: "Amara Farmhouse — exterior view",
        label: "Exterior",
      },
      {
        src: amaraTwo,
        alt: "Living room with full-height glazing",
        label: "Living room",
      },
      {
        src: amaraThree,
        alt: "Rear garden and seating deck",
        label: "Garden deck",
      },
      {
        src: amaraFour,
        alt: "Landscaped garden at dusk",
        label: "Garden at dusk",
      },
    ],
  },
];

/** Looks a property up by its URL segment; `undefined` for an unknown slug. */
export const getPropertyBySlug = (slug) =>
  properties.find((property) => property.slug === slug);

/** Feeds `generateStaticParams`, so every property prerenders at build time. */
export const propertySlugs = properties.map(({ slug }) => slug);
