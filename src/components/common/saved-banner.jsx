"use client";

import { useState } from "react";

import { CheckIcon, DismissIcon } from "@/components/icons";

/** Dismissible "Changes saved" banner shown above the profile header. */
const SavedBanner = ({
  title = "Changes saved",
  description = "Your profile details are up to date.",
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      role="status"
      className="flex items-center gap-12 rounded-[14px] bg-success-soft px-16 py-12 lg:gap-16"
    >
      <span className="flex size-36 shrink-0 items-center justify-center rounded-[10px] bg-success-soft-strong text-success-muted">
        <CheckIcon className="size-20" />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-px lg:gap-4">
        <p className="text-body-xs font-semibold text-success lg:text-body">
          {title}
        </p>
        <p className="text-[10px]/[14px] text-success-muted lg:text-body-xs">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        className="flex size-30 shrink-0 items-center justify-center rounded-lg bg-success-soft-hover text-success-muted transition-colors hover:brightness-95"
      >
        <DismissIcon className="size-15" />
      </button>
    </div>
  );
};

export { SavedBanner };
