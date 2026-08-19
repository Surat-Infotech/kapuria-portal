"use client";

import { useEffect, useRef, useState } from "react";

import { PHONE_COUNTRY_CODES } from "@/config/contact";
import { cn } from "@/lib/utils";

import ChevronDownIcon from "@/assets/svgs/common/chevron-down";

const FLAG = "h-14 w-20 shrink-0 rounded-xs ring-1 ring-black/10";

// The skin every dial-code trigger shares; callers layer their own padding,
// height and type scale on top through `triggerClassName`.
const TRIGGER =
  "flex w-full cursor-pointer items-center justify-center gap-6 rounded-[11px] border border-border-default bg-surface text-body text-text-primary outline-none transition-colors focus:border-gold-400 focus-visible:border-gold-400";

/**
 * Country dial-code picker. A native <option> can't hold an image, so this
 * runs on a custom listbox — that's the only way the flags show up in the
 * open list too.
 *
 * Works controlled (`value` + `onChange`) or uncontrolled (`defaultValue`).
 */
const DialCodeSelect = ({
  value,
  defaultValue,
  onChange,
  id,
  name = "dialCode",
  className,
  triggerClassName,
  showChevron = false,
}) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? PHONE_COUNTRY_CODES[0].code
  );
  const containerRef = useRef(null);

  const currentValue = value ?? internalValue;

  const selected =
    PHONE_COUNTRY_CODES.find(({ code }) => code === currentValue) ??
    PHONE_COUNTRY_CODES[0];
  const SelectedFlag = selected.Flag;

  const selectCode = (code) => {
    setInternalValue(code);
    onChange?.(code);
    setOpen(false);
  };

  // Click-away and Escape close the list.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Keeps the value in the form payload now that the select is gone */}
      <input type="hidden" name={name} value={selected.code} />

      <button
        type="button"
        id={id}
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country dialling code — ${selected.label} ${selected.code}`}
        className={cn(TRIGGER, triggerClassName)}
      >
        <SelectedFlag className={FLAG} />
        {selected.code}
        {showChevron ? (
          <ChevronDownIcon
            className={cn(
              "size-14 shrink-0 text-text-secondary transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        ) : null}
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Country dialling code"
          className="absolute top-[calc(100%+4px)] left-0 z-20 max-h-224 w-full overflow-y-auto rounded-[11px] border border-border-default bg-surface p-4 shadow-[0_12px_32px_0_rgba(8,34,53,0.12)]"
        >
          {PHONE_COUNTRY_CODES.map(({ code, label, Flag }) => (
            <li key={code} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={code === selected.code}
                aria-label={`${label} ${code}`}
                onClick={() => selectCode(code)}
                className={cn(
                  "text-body-xs md:text-body flex w-full cursor-pointer items-center justify-center gap-6 rounded-lg px-4 py-8 font-semibold text-text-primary transition-colors duration-200 hover:bg-[#FAF6F2]",
                  code === selected.code && "bg-[#FAF6F2]"
                )}
              >
                <Flag className={FLAG} />
                {code}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { DialCodeSelect };
