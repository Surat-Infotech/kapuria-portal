// Icons used only by the Blueprints & Drawings page — the download actions,
// the updated stamp and the toolbar controls. They live beside the page rather
// than in the route-wide set because nothing outside this folder needs them.
//
// Same convention as the shared sets: currentColor everywhere, so a button
// recolours from its own state rather than from a baked-in fill.
//
// Drawn on a 16×16 artboard: these sit in buttons and meta lines at 14–16px,
// where the 24×24 grid the wider icon set uses reads a half-pixel too light.

const iconProps = {
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const DownloadIcon = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M8 2V10.5" />
    <path d="M4.75 7.5L8 10.75L11.25 7.5" />
    <path d="M2.75 11.25V12.5C2.75 13.0523 3.19772 13.5 3.75 13.5H12.25C12.8023 13.5 13.25 13.0523 13.25 12.5V11.25" />
  </svg>
);

export const CalendarIcon = (props) => (
  <svg {...iconProps} strokeWidth={1.3} {...props}>
    <path d="M3.25 3.25H12.75C13.0261 3.25 13.25 3.47386 13.25 3.75V12.75C13.25 13.0261 13.0261 13.25 12.75 13.25H3.25C2.97386 13.25 2.75 13.0261 2.75 12.75V3.75C2.75 3.47386 2.97386 3.25 3.25 3.25Z" />
    <path d="M2.75 6.25H13.25" />
    <path d="M5.5 2V4.25M10.5 2V4.25" />
  </svg>
);

// Two arrows running opposite ways — the control changes the order, it does not
// point at one.
export const SortIcon = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M4.75 2.75V13.25M4.75 13.25L2.5 11M4.75 13.25L7 11" />
    <path d="M11.25 13.25V2.75M11.25 2.75L9 5M11.25 2.75L13.5 5" />
  </svg>
);

export const GridViewIcon = (props) => (
  <svg {...iconProps} strokeWidth={1.3} {...props}>
    <path d="M2.75 2.75H6.75V6.75H2.75V2.75Z" />
    <path d="M9.25 2.75H13.25V6.75H9.25V2.75Z" />
    <path d="M2.75 9.25H6.75V13.25H2.75V9.25Z" />
    <path d="M9.25 9.25H13.25V13.25H9.25V9.25Z" />
  </svg>
);

export const ListViewIcon = (props) => (
  <svg {...iconProps} strokeWidth={1.5} {...props}>
    <path d="M2.75 4H13.25M2.75 8H13.25M2.75 12H13.25" />
  </svg>
);
