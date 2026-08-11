/**
 * Every link into a property is built from its slug and nothing else, so the
 * URL shape is decided here once. Move the detail pages under a different
 * segment and this is the only file that has to know.
 */
export const PROPERTY_BASE_PATH = "/property-details";

export const propertyHref = (slug, segment) =>
  segment
    ? `${PROPERTY_BASE_PATH}/${slug}/${segment}`
    : `${PROPERTY_BASE_PATH}/${slug}`;
