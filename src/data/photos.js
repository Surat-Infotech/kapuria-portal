import progressFoundation from "@/assets/images/photos-gallery/construction-progress-1.webp";
import progressFrame from "@/assets/images/photos-gallery/construction-progress-2.webp";
import progressSlab from "@/assets/images/photos-gallery/construction-progress-3.webp";
import progressFacade from "@/assets/images/photos-gallery/construction-progress-4.webp";

import renderExterior from "@/assets/images/photos-gallery/3d-photos-1.webp";
import renderCutaway from "@/assets/images/photos-gallery/3d-photos-2.webp";
import renderInterior from "@/assets/images/photos-gallery/3d-photos-3.webp";

import outdoorFront from "@/assets/images/photos-gallery/outdoor-1.webp";
import outdoorDeck from "@/assets/images/photos-gallery/outdoor-2.webp";
import outdoorGarden from "@/assets/images/photos-gallery/outdoor-3.webp";

import indoorOne from "@/assets/images/photos-gallery/indoor-1.webp";
import indoorTwo from "@/assets/images/photos-gallery/indoor-2.webp";
import indoorThree from "@/assets/images/photos-gallery/indoor-3.webp";
import indoorFour from "@/assets/images/photos-gallery/indoor-4.webp";
import indoorFive from "@/assets/images/photos-gallery/indoor-5.webp";
import indoorSix from "@/assets/images/photos-gallery/indoor-6.webp";

/**
 * The gallery behind `/property-details/[slug]/photos`. Same arrangement as
 * `@/data/blueprints`: this is the shape the media API will return, so the page
 * only ever reads from here.
 *
 * Per photo:
 *   category  — which section it files under; the order below is the order the
 *               page stacks them in.
 *   room      — indoor only, and the key the room rail filters on.
 *   generated — a visualisation rather than a photograph. It stamps the tile,
 *               so a buyer never mistakes a render for the house as built.
 *   captured  — ISO day. The newest across the set is the page's "Last updated".
 */

export const PHOTO_CATEGORIES = [
  { key: "construction", label: "Construction Progress" },
  { key: "3d", label: "3D Photos" },
  { key: "outdoor", label: "Outdoor" },
  { key: "indoor", label: "Indoor" },
];

// The rooms an interior shoot covers, in the order the rail lists them. A room
// a property has no frames for never gets a chip — see the rail in
// `photos-view` — so this stays the full vocabulary rather than one house's.
export const INDOOR_ROOMS = [
  { key: "bedroom-1", label: "Bedroom 1" },
  { key: "bedroom-2", label: "Bedroom 2" },
  { key: "master-bedroom", label: "Master Bedroom" },
  { key: "bathroom", label: "Bathroom" },
  { key: "living-room", label: "Living Room" },
  { key: "kitchen", label: "Kitchen" },
];

// The six interior frames on hand, repeated into every room until each room's
// own shoot is delivered.
//
// To give a room real photography, replace REPEATED_INTERIOR on that room's row
// below with its own array of imports — nothing else changes. The rail count,
// the "Angle N" titles and the section total all read off the array's length,
// so a room with nine frames needs no edit beyond the nine imports.
const REPEATED_INTERIOR = [
  indoorOne,
  indoorTwo,
  indoorThree,
  indoorFour,
  indoorFive,
  indoorSix,
];

// A room's `key` has to be one declared in INDOOR_ROOMS above — that is what
// gives it its chip on the rail and the label under each frame.
const ROOM_LABELS = new Map(INDOOR_ROOMS.map(({ key, label }) => [key, label]));

const buildIndoorPhotos = (prefix, rooms, captured) =>
  rooms.flatMap(({ room, images }) => {
    const label = ROOM_LABELS.get(room) ?? room;

    return images.map((image, index) => ({
      id: `${prefix}-${room}-${index + 1}`,
      title: `Angle ${index + 1}`,
      caption: label,
      alt: `${label} — angle ${index + 1}`,
      category: "indoor",
      room,
      captured,
      image,
    }));
  });

// A villa still going up: the progress record runs month by month, and the
// interiors are shells rather than finished rooms.
const serenityPalmsPhotos = [
  {
    id: "spm-cp-01",
    title: "Foundation Pour",
    caption: "Feb 2024",
    alt: "Reinforcement laid over the poured raft foundation",
    category: "construction",
    captured: "2024-02-16",
    image: progressFoundation,
  },
  {
    id: "spm-cp-02",
    title: "Structural Frame — L1",
    caption: "Mar 2024",
    alt: "Timber shuttering and props supporting the first floor slab",
    category: "construction",
    captured: "2024-03-12",
    image: progressFrame,
  },
  {
    id: "spm-cp-03",
    title: "Slab Casting — L2",
    caption: "Apr 2024",
    alt: "Brickwork and column cage before the second floor slab is cast",
    category: "construction",
    captured: "2024-04-18",
    image: progressSlab,
  },
  {
    id: "spm-cp-04",
    title: "Facade Cladding",
    caption: "May 2024",
    alt: "Rendered facade with openings cut for glazing",
    category: "construction",
    captured: "2024-05-24",
    image: progressFacade,
  },
  {
    id: "spm-3d-01",
    title: "Exterior Massing",
    caption: "Design visualisation",
    alt: "Massing model of the villa seen from the street corner",
    category: "3d",
    generated: true,
    captured: "2024-06-12",
    image: renderExterior,
  },
  {
    id: "spm-3d-02",
    title: "Cutaway Model",
    caption: "Design visualisation",
    alt: "Doll's-house cutaway showing the ground floor layout",
    category: "3d",
    // generated: true,
    captured: "2024-06-12",
    image: renderCutaway,
  },
  {
    id: "spm-3d-03",
    title: "Interior Render",
    caption: "Design visualisation",
    alt: "Cutaway render of the stair hall and living room",
    category: "3d",
    // generated: true,
    captured: "2024-06-12",
    image: renderInterior,
  },
  {
    id: "spm-out-01",
    title: "Front Elevation",
    caption: "Serenity Palms",
    alt: "The villa's front elevation across the lawn",
    category: "outdoor",
    captured: "2024-06-05",
    image: outdoorFront,
  },
  {
    id: "spm-out-02",
    title: "Pool & Deck",
    caption: "Serenity Palms",
    alt: "Paved deck with loungers beside the lawn",
    category: "outdoor",
    captured: "2024-06-05",
    image: outdoorDeck,
  },
  {
    id: "spm-out-03",
    title: "Garden Path",
    caption: "Serenity Palms",
    alt: "Stepping stones through the rear garden at dusk",
    category: "outdoor",
    captured: "2024-06-05",
    image: outdoorGarden,
  },
  // One row per room tab. Swap a row's `images` for that room's own frames as
  // the shoot comes in.
  ...buildIndoorPhotos(
    "spm",
    [
      { room: "bedroom-1", images: REPEATED_INTERIOR },
      { room: "bedroom-2", images: REPEATED_INTERIOR },
      { room: "master-bedroom", images: REPEATED_INTERIOR },
      { room: "bathroom", images: REPEATED_INTERIOR },
      { room: "living-room", images: REPEATED_INTERIOR },
      { room: "kitchen", images: REPEATED_INTERIOR },
    ],
    "2024-05-30"
  ),
];

// A handed-over house: the progress record is closed, and the interior shoot
// covers the rooms that were furnished before handover.
const amaraFarmhousePhotos = [
  {
    id: "amf-cp-01",
    title: "Foundation Pour",
    caption: "Jun 2023",
    alt: "Reinforcement laid over the poured raft foundation",
    category: "construction",
    captured: "2023-06-14",
    image: progressFoundation,
  },
  {
    id: "amf-cp-02",
    title: "Structural Frame — L1",
    caption: "Aug 2023",
    alt: "Timber shuttering and props supporting the first floor slab",
    category: "construction",
    captured: "2023-08-09",
    image: progressFrame,
  },
  {
    id: "amf-cp-03",
    title: "Facade Cladding",
    caption: "Nov 2023",
    alt: "Rendered facade with openings cut for glazing",
    category: "construction",
    captured: "2023-11-21",
    image: progressFacade,
  },
  {
    id: "amf-3d-01",
    title: "Exterior Massing",
    caption: "Design visualisation",
    alt: "Massing model of the farmhouse seen from the street corner",
    category: "3d",
    generated: true,
    captured: "2023-04-02",
    image: renderExterior,
  },
  {
    id: "amf-3d-02",
    title: "Cutaway Model",
    caption: "Design visualisation",
    alt: "Doll's-house cutaway showing the ground floor layout",
    category: "3d",
    generated: true,
    captured: "2023-04-02",
    image: renderCutaway,
  },
  {
    id: "amf-out-01",
    title: "Front Elevation",
    caption: "Amara Farmhouse",
    alt: "The farmhouse's front elevation across the lawn",
    category: "outdoor",
    captured: "2024-02-20",
    image: outdoorFront,
  },
  {
    id: "amf-out-02",
    title: "Pool & Deck",
    caption: "Amara Farmhouse",
    alt: "Paved deck with loungers beside the lawn",
    category: "outdoor",
    captured: "2024-02-20",
    image: outdoorDeck,
  },
  {
    id: "amf-out-03",
    title: "Garden Path",
    caption: "Amara Farmhouse",
    alt: "Stepping stones through the rear garden at dusk",
    category: "outdoor",
    captured: "2024-02-20",
    image: outdoorGarden,
  },
  ...buildIndoorPhotos(
    "amf",
    [
      { room: "bedroom-1", images: REPEATED_INTERIOR },
      { room: "master-bedroom", images: REPEATED_INTERIOR },
      { room: "bathroom", images: REPEATED_INTERIOR },
      { room: "living-room", images: REPEATED_INTERIOR },
      { room: "kitchen", images: REPEATED_INTERIOR },
    ],
    "2024-01-18"
  ),
];

const PHOTOS_BY_SLUG = {
  "serenity-palms": serenityPalmsPhotos,
  "amara-farmhouse": amaraFarmhousePhotos,
};

/**
 * The record the preview dialog reads beside the frame. Every photo shares one
 * set of file facts for now — the gallery is a single shoot delivered as one
 * batch — so these sit here rather than on 60-odd rows that would all repeat
 * them. Move a field onto the photo itself the moment the media service starts
 * issuing it per asset; the dialog reads `photo.<field> ?? PHOTO_FILE.<field>`
 * for exactly that swap.
 */
export const PHOTO_ARCHITECT = "Vikram Pannu";
export const PHOTO_AUTHOR = "Kapuria Design Studio";
export const PHOTO_FILE = {
  floor: "Ground Floor",
  scale: "1:100",
  format: "PDF",
  size: "3.1 MB",
};

/** A photo's room label — the same one its chip carries on the rail. */
export const photoRoomLabel = (photo) =>
  ROOM_LABELS.get(photo.room) ?? "Whole villa";

/** The gallery for a property; an empty array for one with nothing shot yet. */
export const getPhotosForProperty = (slug) => PHOTOS_BY_SLUG[slug] ?? [];

/** Where "Download all (ZIP)" points — one archive per property. */
export const photosArchiveHref = (slug) => `/media/${slug}/photos.zip`;
