// Icons used only by the Photos & Gallery page — the archive download, the
// breadcrumb chevron and the two origin stamps. They live beside the page
// rather than in the route-wide set so this folder stays self-contained:
// nothing outside it reads from here.
//
// Same convention as the shared sets: currentColor everywhere, so a button
// recolours from its own state rather than from a baked-in fill.
//
// Drawn on a 16×16 artboard — these sit in buttons and meta lines at 12–20px,
// where the 24×24 grid the wider icon set uses reads a half-pixel too light.

const iconProps = {
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

// Arrow over a bare baseline rather than into a tray.
export const DownloadIcon = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M7.9987 2V10M5.33203 7.33333L7.9987 10L10.6654 7.33333" />
    <path d="M3.33203 14H12.6654" />
  </svg>
);

// The breadcrumb separator.
export const ChevronRightIcon = (props) => (
  <svg {...iconProps} strokeWidth={1.6} {...props}>
    <path d="M6 4L10 8L6 12" />
  </svg>
);

// The counterpart stamp, used only in the preview dialog: it says outright that
// a frame is a photograph of the house as built, where the tile grid leaves
// that as the unmarked default.
export const RealPhotoIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.5 6A2.25 2.25 0 0 1 3.75 3.75h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6Zm1.5 10.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.69a1.5 1.5 0 0 0-2.12 0l-.88.88.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.16a1.5 1.5 0 0 0-2.12 0L3 16.06Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
      fill="currentColor"
    />
  </svg>
);

// Stamped on the 3D tiles so a buyer never mistakes a visualisation for a
// photograph of the house as built. Solid rather than stroked: it sits at 12px
// on a translucent badge, where a 1.8 stroke breaks up.
export const GeneratedIcon = (props) => (
  <svg viewBox="0 0 14 12" fill="none" aria-hidden {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V1.5H7.625C8.3875 1.5 9.11876 1.8029 9.65793 2.34207C10.1971 2.88124 10.5 3.6125 10.5 4.375H14V1C14 0.734784 13.8946 0.48043 13.7071 0.292893C13.5196 0.105357 13.2652 0 13 0H8ZM7.75 11.375C7.75 11.3323 7.74833 11.29 7.745 11.248C8.48616 11.217 9.18667 10.9008 9.7001 10.3654C10.2135 9.82996 10.5001 9.11681 10.5 8.375V5.625H14V11C14 11.2652 13.8946 11.5196 13.7071 11.7071C13.5196 11.8946 13.2652 12 13 12H8C7.88051 12.0001 7.76197 11.9787 7.65 11.937C7.716 11.761 7.74933 11.5737 7.75 11.375ZM11.898 2.75H11.875C11.6771 2.74697 11.4884 2.66583 11.3501 2.52428C11.2118 2.38274 11.135 2.19225 11.1365 1.99434C11.138 1.79643 11.2177 1.60714 11.3582 1.46773C11.4987 1.32832 11.6886 1.25009 11.8865 1.25009C12.0844 1.25009 12.2743 1.32832 12.4148 1.46773C12.5553 1.60714 12.635 1.79643 12.6365 1.99434C12.638 2.19225 12.5612 2.38274 12.4229 2.52428C12.2846 2.66583 12.0959 2.74697 11.898 2.75ZM1.25 4.375C1.25 4.168 1.418 4 1.625 4H7.625C7.832 4 8 4.168 8 4.375V8.375C8 8.47446 7.96049 8.56984 7.89016 8.64017C7.81984 8.71049 7.72446 8.75 7.625 8.75H1.625C1.52554 8.75 1.43016 8.71049 1.35983 8.64017C1.28951 8.56984 1.25 8.47446 1.25 8.375V4.375ZM5.25 10H7.625C8.522 10 9.25 9.273 9.25 8.375V4.375C9.25 3.478 8.522 2.75 7.625 2.75H1.625C0.728 2.75 0 3.478 0 4.375V8.375C0 9.273 0.728 10 1.625 10H4V10.75H3.125C2.95924 10.75 2.80027 10.8158 2.68306 10.9331C2.56585 11.0503 2.5 11.2092 2.5 11.375C2.5 11.5408 2.56585 11.6997 2.68306 11.8169C2.80027 11.9342 2.95924 12 3.125 12H6.125C6.29076 12 6.44973 11.9342 6.56694 11.8169C6.68415 11.6997 6.75 11.5408 6.75 11.375C6.75 11.2092 6.68415 11.0503 6.56694 10.9331C6.44973 10.8158 6.29076 10.75 6.125 10.75H5.25V10Z"
      fill="currentColor"
    />
  </svg>
);
