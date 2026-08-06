import { MobileNav } from "@/components/layout/mobile-nav";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopBar } from "@/components/layout/top-bar";

// Fixed 264px sidebar from lg (992px) up; below that the mobile bar + drawer.
// The top bar sits inside the content column so it starts where the sidebar ends.
const PortalShell = ({ user, searchPlaceholder, children }) => (
  <div className="flex min-h-screen flex-col lg:flex-row">
    <aside className="hidden w-264 shrink-0 lg:sticky lg:top-0 lg:block lg:h-screen">
      <SidebarNav user={user} />
    </aside>

    <div className="flex min-w-0 flex-1 flex-col">
      <MobileNav user={user} />
      <TopBar user={user} searchPlaceholder={searchPlaceholder} />
      <main className="flex-1">{children}</main>
    </div>
  </div>
);

export { PortalShell };
