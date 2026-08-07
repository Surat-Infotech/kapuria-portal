import React from "react";

export default function UnitedKingdomFlag({ className = "", ...other }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 16"
      aria-hidden="true"
      {...other}
    >
      <rect width="24" height="16" fill="#012169" />

      {/* Saltire — white first, red laid over it */}
      <path d="M0 0 24 16M24 0 0 16" stroke="#fff" strokeWidth="3.2" />
      <path d="M0 0 24 16M24 0 0 16" stroke="#C8102E" strokeWidth="1.6" />

      {/* Cross of St George */}
      <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5.3" />
      <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="3.2" />
    </svg>
  );
}
