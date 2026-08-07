import React from "react";

export default function IndiaFlag({ className = "", ...other }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 16"
      aria-hidden="true"
      {...other}
    >
      <rect width="24" height="16" fill="#fff" />
      <rect width="24" height="5.33" fill="#FF9933" />
      <rect y="10.67" width="24" height="5.33" fill="#138808" />

      {/* Ashoka chakra — four crossing lines read as the eight spokes */}
      <circle
        cx="12"
        cy="8"
        r="2.1"
        fill="none"
        stroke="#000080"
        strokeWidth="0.4"
      />
      <g stroke="#000080" strokeWidth="0.3">
        <path d="M9.9 8H14.1M12 5.9v4.2M10.52 6.52l2.97 2.97M10.52 9.48l2.97-2.97" />
      </g>
      <circle cx="12" cy="8" r="0.45" fill="#000080" />
    </svg>
  );
}
