"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  ChevronDownIcon,
  LogoutIcon,
  ProfileIcon,
  SearchIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

const UserMenu = ({ user }) => {
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

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        className="flex cursor-pointer items-center gap-8 rounded-xl border border-border-default bg-surface px-8 py-4 transition-colors hover:bg-surface-sunken"
      >
        <span
          className="flex size-32 shrink-0 items-center justify-center rounded-full text-body-xs font-bold text-[#5a3d12]"
          style={{ backgroundImage: "var(--gradient-avatar)" }}
        >
          {user.initials}
        </span>
        <span className="text-body font-semibold text-text-primary">
          {user.name}
        </span>
        <ChevronDownIcon
          className={cn(
            "size-15 shrink-0 text-text-secondary transition-transform duration-200 ease-out",
            open && "rotate-180"
          )}
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute top-full right-0 z-20 mt-6 w-180 overflow-hidden rounded-xl border border-border-subtle bg-surface py-4 shadow-[0_8px_24px_rgba(11,34,51,0.01)]"
        >
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-10 px-14 py-10 text-body-xs font-medium text-text-primary transition-colors duration-200 ease-out outline-none hover:bg-surface-sunken hover:text-text-primary focus-visible:bg-surface-sunken lg:text-body"
          >
            <ProfileIcon className="size-16 shrink-0" />
            Profile
          </Link>
          <Link
            href="/sign-in"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-10 px-14 py-10 text-body-xs font-medium text-text-primary transition-colors duration-200 ease-out outline-none hover:bg-surface-sunken hover:text-text-primary focus-visible:bg-surface-sunken lg:text-body"
          >
            <LogoutIcon strokeWidth="0.7" className="size-16 shrink-0" />
            Log out
          </Link>
        </div>
      ) : null}
    </div>
  );
};

/**
 * Desktop top bar: search field on the left, user chip on the right.
 * Hidden below lg, where MobileNav renders its own 62px bar instead.
 */
const TopBar = ({ user, searchPlaceholder = "Search this property…" }) => (
  <header className="hidden border-b border-border-subtle bg-background px-34 py-14 lg:block">
    <div className="flex items-center justify-between">
      <div className="flex w-280 items-center gap-9 rounded-[11px] border border-border-default bg-surface px-16 py-8 focus-within:border-gold-400">
        <SearchIcon className="size-16 shrink-0 text-text-secondary" />
        <input
          type="search"
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className="min-w-0 flex-1 bg-transparent text-body text-text-primary outline-none placeholder:text-text-muted"
        />
      </div>

      <UserMenu user={user} />
    </div>
  </header>
);

export { TopBar };
