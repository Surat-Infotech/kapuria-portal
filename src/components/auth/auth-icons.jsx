// Icons used only by the signed-out screens.

import { cn } from "@/lib/utils";

// Square Kapuria glyph (25x25 in Figma) that stands in for the "a" in the
// "Redefining Living Spaces" lockup. Inline SVG rather than an imported .svg
// asset because it is set into running text and has to inherit the surrounding
// colour — a next/image import renders as a bitmap-like <img> and cannot.
export const LivingSpacesGlyph = ({ className, ...props }) => (
  <svg
    viewBox="0 0 25 25"
    fill="currentColor"
    aria-hidden
    className={cn("size-25", className)}
    {...props}
  >
    <path d="M13.9399 11.1733V0C20.0475 0 25 5.0032 25 11.1733H13.9399Z" />
    <path d="M11.0601 25H0V13.8267H11.0601V25Z" />
    <path d="M25 25H13.9399V13.8267H25V25Z" />
    <path d="M11.0601 11.1733H0C0 5.0032 4.95252 0 11.0601 0V11.1733Z" />
  </svg>
);
