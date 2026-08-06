import Link from "next/link";

import { LivingSpacesGlyph } from "@/components/auth/auth-icons";
import { SidebarLogo } from "@/components/common/logo";

/**
 * Layout for the signed-out routes. Deliberately has no sidebar, top bar or
 * mobile drawer — PortalShell is for the signed-in portal, this is its
 * counterpart for the auth screens.
 *
 * Desktop (lg / 992px up): cream form column on the left, navy brand panel on
 * the right, each half the viewport. The screen is locked to exactly one
 * viewport tall so the brand panel never scrolls away — if the form is taller
 * than the window, only the form column scrolls.
 * Below lg: the brand panel collapses into a navy band above the form, the
 * "Redefining Living Spaces" lockup is dropped, and the page scrolls normally
 * from a full-screen minimum.
 *
 * Heights use dvh, not vh: on mobile browsers 100vh includes the collapsing
 * address bar, which would push the form below the fold on first paint.
 */
const AuthShell = ({ children }) => (
  <div className="flex min-h-dvh flex-col-reverse lg:h-dvh lg:flex-row lg:overflow-hidden">
    <main className="flex flex-1 items-start py-36 justify-center px-16 lg:h-full lg:w-1/2 lg:overflow-y-auto lg:py-0 lg:px-64">
      <div className="w-full max-w-440 lg:my-auto">{children}</div>
    </main>

    <aside className="relative py-40 bg-navy-900 flex lg:h-full lg:w-1/2 items-center justify-center lg:py-0 lg:px-64">
      <Link href="/">
        <SidebarLogo className="h-auto w-147 lg:w-292" />
      </Link>

      <div className="absolute inset-x-0 bottom-60 hidden lg:flex flex-col items-center gap-8">
        <p className="text-[14px]/[22px] uppercase tracking-[2.52px] text-white/50">Redefining</p>
        <p className="text-[36px]/[44px] font-semibold text-white">
          <span className="font-playfair font-medium italic text-gold-300">
            Living
          </span>{" "}
          {/* The glyph replaces the "a", so the visible letters are hidden from
              assistive tech and the whole word is exposed once instead. */}
          <span className="sr-only">Spaces</span>
          <span aria-hidden className="uppercase">
            Sp
            <LivingSpacesGlyph className="mx-1 inline-block size-25 align-baseline" />
            ces
          </span>
        </p>
      </div>
    </aside>
  </div>
);

export { AuthShell };