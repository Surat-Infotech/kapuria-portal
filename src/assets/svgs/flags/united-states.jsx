import React from "react";

const STRIPE = 16 / 13;
const RED_STRIPES = [0, 1, 2, 3, 4, 5, 6];

// The stars are decorative at this size — a 5×4 grid reads as the union.
const STAR_ROWS = [0, 1, 2, 3];
const STAR_COLUMNS = [0, 1, 2, 3, 4];

export default function UnitedStatesFlag({ className = "", ...other }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 16"
      aria-hidden="true"
      {...other}
    >
      <rect width="24" height="16" fill="#fff" />

      {RED_STRIPES.map((stripe) => (
        <rect
          key={stripe}
          y={stripe * STRIPE * 2}
          width="24"
          height={STRIPE}
          fill="#B31942"
        />
      ))}

      <rect width="9.6" height={STRIPE * 7} fill="#3C3B6E" />

      {STAR_ROWS.map((row) =>
        STAR_COLUMNS.map((column) => (
          <circle
            key={`${row}-${column}`}
            cx={1.2 + column * 1.8}
            cy={1.1 + row * 1.9}
            r="0.42"
            fill="#fff"
          />
        ))
      )}
    </svg>
  );
}
