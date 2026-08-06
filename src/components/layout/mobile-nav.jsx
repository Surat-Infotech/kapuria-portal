"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { LogoMark } from "@/components/common/logo";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { SidebarNav } from "@/components/layout/sidebar-nav";

/**
 * Mobile top bar (62px) plus the slide-in drawer that reuses SidebarNav.
 * Matches the Figma mobile header: logo mark, avatar, hamburger.
 */
const MobileNav = ({ user }) => {
  const [open, setOpen] = useState(false);

  // Navigating closes the drawer via each row's onNavigate callback, so no
  // route-change effect is needed here.

  // Lock body scroll and allow Escape to dismiss while the drawer is open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header
        className="flex h-62 items-center justify-between border-b border-border-subtle px-16 py-12 lg:hidden"
        style={{ backgroundImage: "var(--gradient-sidebar)" }}
      >
        <Link href="/">
          <LogoMark />
        </Link>

        <div className="flex items-center gap-10">
          <div
            className="flex size-36 items-center justify-center rounded-full text-body-xs font-bold text-[#5a3d12]"
            style={{ backgroundImage: "var(--gradient-avatar)" }}
          >
            {user.initials}
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex size-38 items-center justify-center rounded-[10px] border border-white/15 bg-[#12324e] text-gold-300 transition-colors hover:bg-[#173d5e]"
          >
            <MenuIcon className="size-18" />
          </button>
        </div>
      </header>

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-navy-800/60 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute inset-y-0 left-0 w-264 max-w-[85vw] overflow-y-auto shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute top-26 right-16 z-10 flex size-32 items-center justify-center rounded-[10px] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <CloseIcon className="size-18" />
          </button>
          <SidebarNav user={user} onNavigate={() => setOpen(false)} />
        </aside>
      </div>
    </>
  );
};

export { MobileNav };
