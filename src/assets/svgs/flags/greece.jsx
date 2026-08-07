import React from "react";

// Nine stripes, blue first — the four white ones sit on the blue field.
const WHITE_STRIPES = [1, 3, 5, 7];

export default function GreeceFlag({ className = "", ...other }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 16"
      aria-hidden="true"
      {...other}
    >
      <rect width="24" height="16" fill="#0D5EAF" />

      {WHITE_STRIPES.map((stripe) => (
        <rect
          key={stripe}
          y={stripe * 1.778}
          width="24"
          height="1.778"
          fill="#fff"
        />
      ))}

      {/* Canton — five stripes tall, with the white cross */}
      <rect width="8.89" height="8.89" fill="#0D5EAF" />
      <rect x="3.56" width="1.78" height="8.89" fill="#fff" />
      <rect y="3.56" width="8.89" height="1.78" fill="#fff" />
    </svg>
  );
}
