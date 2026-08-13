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

// Arrow over a bare baseline rather than into a tray — the heavier 1.8 stroke
// is what holds it together at 16px.
export const DownloadIcon = (props) => (
  <svg {...iconProps} strokeWidth={1.8} {...props}>
    <path d="M7.9987 2V10M5.33203 7.33333L7.9987 10L10.6654 7.33333" />
    <path d="M3.33203 14H12.6654" />
  </svg>
);

// A 13×13 artboard, matching the stamp it sits in — the body it pairs with is
// smaller than the button labels the rest of these icons serve.
export const CalendarIcon = (props) => (
  <svg {...iconProps} viewBox="0 0 13 13" strokeWidth={1.7} {...props}>
    <rect x="1.625" y="2.4375" width="9.75" height="8.6667" rx="1.0833" />
    <path d="M1.625 4.8763H11.375" />
    <path d="M4.33333 1.35547V3.52214M8.66667 1.35547V3.52214" />
  </svg>
);

// Two arrows running opposite ways — the control changes the order, it does not
// point at one.
// The one icon here drawn on a 15×15 artboard, so its arrowheads land on whole
// pixels at the 15px the toolbar renders it at.
export const SortIcon = (props) => (
  <svg {...iconProps} viewBox="0 0 15 15" strokeWidth={1.8} {...props}>
    <path d="M4.375 2.5V12.5M6.25 10.625L4.375 12.5L2.5 10.625" />
    <path d="M10.625 12.5V2.5M12.5 4.375L10.625 2.5L8.75 4.375" />
  </svg>
);

export const GridViewIcon = (props) => (
  <svg {...iconProps} strokeWidth={1.8} {...props}>
    <rect x="2" y="2" width="4.6667" height="4.6667" rx="0.6667" />
    <rect x="9.3333" y="2" width="4.6667" height="4.6667" rx="0.6667" />
    <rect x="2" y="9.3333" width="4.6667" height="4.6667" rx="0.6667" />
    <rect x="9.3333" y="9.3333" width="4.6667" height="4.6667" rx="0.6667" />
  </svg>
);

// The bullets are zero-length segments — they only show as dots because the
// shared props round the caps.
export const ListViewIcon = (props) => (
  <svg {...iconProps} strokeWidth={1.8} {...props}>
    <path d="M5.33203 4H13.9987M5.33203 8H13.9987M5.33203 12H13.9987" />
    <path d="M2.33203 4H2.3387M2.33203 8H2.3387M2.33203 12H2.3387" />
  </svg>
);
