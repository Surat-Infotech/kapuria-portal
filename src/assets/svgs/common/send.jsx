import React from "react";

export default function SendIcon({ className = "", ...other }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...other}
    >
      <path d="M2.66406 8.0013L13.3307 2.66797L9.33073 13.3346L7.33073 9.33464L2.66406 8.0013Z" />
    </svg>
  );
}
