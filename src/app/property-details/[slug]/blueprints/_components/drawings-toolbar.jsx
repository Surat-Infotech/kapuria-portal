"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { GridViewIcon, ListViewIcon, SortIcon } from "./blueprint-icons";

// Order is a property of the whole list, so the options live with the control
// rather than with the data. `compare` runs on the already-filtered set.
const SORT_OPTIONS = [
  { key: "newest", label: "Newest" },
  { key: "oldest", label: "Oldest" },
  { key: "name", label: "Name A–Z" },
];

const SortMenu = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Pointer-down rather than click: a click that lands on another control
  // should close the menu and act on that control in the same gesture.
  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const current = SORT_OPTIONS.find((option) => option.key === value);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        className="flex h-38 cursor-pointer items-center gap-8 rounded-[10px] bg-[#EFE7DA] px-12 text-body-xs font-semibold text-text-primary transition-colors duration-200 ease-out outline-none hover:bg-surface-sunken focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <SortIcon className="size-15 shrink-0 text-text-secondary" />
        {current?.label ?? SORT_OPTIONS[0].label}
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute top-full right-0 z-20 mt-6 w-160 overflow-hidden rounded-[12px] border border-border-subtle bg-surface py-4 shadow-[0_12px_32px_rgba(11,34,51,0.14)]"
        >
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              role="menuitemradio"
              aria-checked={option.key === value}
              onClick={() => {
                onChange(option.key);
                setOpen(false);
              }}
              className={cn(
                "flex w-full cursor-pointer items-center px-14 py-8 text-left text-body-xs transition-colors duration-200 ease-out outline-none hover:bg-surface-sunken focus-visible:bg-surface-sunken",
                option.key === value
                  ? "font-semibold text-text-primary"
                  : "font-medium text-text-secondary"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const ViewToggle = ({ value, onChange }) => (
  <div className="flex shrink-0 items-center gap-2 rounded-[10px] bg-[#EFE7DA] p-4">
    {[
      { key: "grid", label: "Grid view", Icon: GridViewIcon },
      { key: "list", label: "List view", Icon: ListViewIcon },
    ].map(({ key, label, Icon }) => (
      <button
        key={key}
        type="button"
        aria-label={label}
        aria-pressed={value === key}
        onClick={() => onChange(key)}
        className={cn(
          "flex size-30 cursor-pointer items-center justify-center rounded-[8px] transition-colors duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-gold-400",
          value === key
            ? "bg-surface text-text-primary"
            : "bg-transparent text-text-secondary hover:text-text-primary"
        )}
      >
        <Icon className="size-16" />
      </button>
    ))}
  </div>
);

const DrawingsToolbar = ({
  floors,
  floor,
  onFloorChange,
  sort,
  onSortChange,
  view,
  onViewChange,
  shown,
}) => (
  <div className="flex flex-col gap-16 rounded-2xl border border-border-subtle bg-surface px-16 py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
    <div className="flex min-w-0 items-center gap-16">
      <span className="shrink-0 text-[12px]/[18px] font-semibold tracking-[1.6px] text-text-muted uppercase block">
        Floor
      </span>

      <div
        role="group"
        aria-label="Filter drawings by floor"
        className="flex min-w-0 gap-4 overflow-x-auto rounded-[11px] bg-surface-sunken p-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {floors.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            aria-pressed={key === floor}
            onClick={() => onFloorChange(key)}
            className={cn(
              "shrink-0 cursor-pointer rounded-[9px] font-semibold text-body-xs transition-all duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-gold-400",
              key === floor
                ? "bg-surface text-text-primary px-12 py-8"
                : "text-text-secondary hover:text-text-primary px-8 py-8 lg:px-12"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>

    <div className="hidden lg:flex shrink-0 items-center justify-between gap-16 lg:justify-end">
      <p className="text-body-xs text-text-secondary">{shown} shown</p>
      <div className="flex items-center gap-8">
        <SortMenu value={sort} onChange={onSortChange} />
        <ViewToggle value={view} onChange={onViewChange} />
      </div>
    </div>
  </div>
);

export { DrawingsToolbar, SORT_OPTIONS };
