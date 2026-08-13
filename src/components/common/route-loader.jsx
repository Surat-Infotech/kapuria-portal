"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { usePathname } from "next/navigation";

import seal from "@/assets/images/seal.webp";

// How long the overlay stays up after a route change, in ms.
const HOLD_MS = 1200;

// Signed-out routes render AuthShell, which has no sidebar, so the veil
// covers the full width there.
const FULL_WIDTH_ROUTES = ["/sign-in"];

/**
 * Transition veil shown between pages. It starts after the 264px sidebar on
 * desktop, so navigation stays visible and the reader keeps their bearings
 * while the page behind it swaps. Next.js navigations are near-instant here,
 * so this is a deliberate brand beat rather than a wait indicator.
 *
 * Mounted in the root layout — every page renders its own PortalShell, so a
 * loader placed inside the shell would remount on each navigation and never
 * show.
 */
const RouteLoader = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  // A ref, not state: landing on the first page is not a transition, and
  // tracking it must not itself trigger a render.
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (pathname === previousPath.current) return;

    previousPath.current = pathname;
    setVisible(true);

    const timer = setTimeout(() => setVisible(false), HOLD_MS);
    return () => clearTimeout(timer);
  }, [pathname]);

  const fullWidth = FULL_WIDTH_ROUTES.some(
    (route) => pathname === route || pathname?.startsWith(`${route}/`)
  );

  return (
    <div
      aria-hidden={!visible}
      role={visible ? "status" : undefined}
      aria-live="polite"
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-background transition-opacity duration-400 ease-out ${
        fullWidth ? "" : "lg:left-264"
      } ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div className="flex flex-col items-center gap-24">
        <span className="relative flex size-108 items-center justify-center">
          {/* Gold ring orbiting the seal. */}
          <span className="absolute -inset-10 animate-spin rounded-full border-2 border-border-subtle border-t-gold-400 [animation-duration:1.4s]" />
          <Image
            src={seal}
            alt=""
            className="size-108 animate-pulse-soft"
            priority
          />
        </span>

        <span className="text-overline uppercase text-text-accent">
          Kapuria Portal
        </span>
      </div>

      {/* Gold sweep along the top edge, just under the top bar. */}
      <span className="absolute inset-x-0 top-0 h-2 overflow-hidden bg-border-subtle">
        <span className="animate-sweep block h-full w-1/3 bg-linear-to-r from-transparent via-gold-400 to-transparent" />
      </span>
    </div>
  );
};

export { RouteLoader };
