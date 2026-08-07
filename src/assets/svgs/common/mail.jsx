import React from "react";

export default function MailIcon({ className = "", ...other }) {
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
      <path d="M15.0417 3.95703H3.95833C3.08388 3.95703 2.375 4.66591 2.375 5.54036V13.457C2.375 14.3315 3.08388 15.0404 3.95833 15.0404H15.0417C15.9161 15.0404 16.625 14.3315 16.625 13.457V5.54036C16.625 4.66591 15.9161 3.95703 15.0417 3.95703Z" />
      <path d="M2.375 5.54297L9.5 10.293L16.625 5.54297" />
    </svg>
  );
}
