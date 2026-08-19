"use client";

import { useState } from "react";

import { EyeIcon, EyeOffIcon } from "@/components/icons";

/** 42px password field with the show/hide eye toggle from Figma. */
const PasswordInput = ({ id, defaultValue, ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex w-full items-center gap-8 rounded-[11px] border border-border-default bg-surface px-14 py-12 focus-within:border-gold-400">
      <input
        id={id}
        type={visible ? "text" : "password"}
        defaultValue={defaultValue}
        className="min-w-0 flex-1 bg-transparent text-body text-text-primary outline-none"
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="shrink-0 cursor-pointer text-text-secondary transition-colors hover:text-text-primary"
      >
        {/* Struck-through eye once the characters are on screen. */}
        {visible ? (
          <EyeOffIcon className="size-17" />
        ) : (
          <EyeIcon className="size-17" />
        )}
      </button>
    </div>
  );
};

export { PasswordInput };
