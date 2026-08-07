import React from "react";

export default function UnitedArabEmiratesFlag({ className = "", ...other }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 16"
      aria-hidden="true"
      {...other}
    >
      <rect x="6" width="18" height="5.33" fill="#00732F" />
      <rect x="6" y="5.33" width="18" height="5.34" fill="#fff" />
      <rect x="6" y="10.67" width="18" height="5.33" fill="#000" />
      <rect width="6" height="16" fill="#FF0000" />
    </svg>
  );
}
