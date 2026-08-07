import React from "react";

// Heavier twin of `clock.jsx` — drawn on the 19px grid at 1.7 stroke so it
// sits alongside the phone / mail / map-pin set on the contact desk. The
// lighter 17px original stays with the quality-promise tiles.
export default function ClockBoldIcon({ className = "", ...other }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
      {...other}
    >
      <path d="M9.5 16.625C13.435 16.625 16.625 13.435 16.625 9.5C16.625 5.56497 13.435 2.375 9.5 2.375C5.56497 2.375 2.375 5.56497 2.375 9.5C2.375 13.435 5.56497 16.625 9.5 16.625Z" />
      <path d="M9.5 5.54297V9.5013L11.875 11.0846" />
    </svg>
  );
}
