import React from "react";

export default function PhoneIcon({ className = "", ...other }) {
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
      <path d="M3.16406 3.95703C3.16406 11.082 7.91406 15.832 15.0391 15.832V13.0612L11.8724 11.8737L10.2891 13.457C8.602 12.5651 7.22266 11.1858 6.33073 9.4987L7.91406 7.91536L6.72656 3.95703H3.16406Z" />
    </svg>
  );
}
