"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarLogo } from "@/components/common/logo";
import { LogoutIcon } from "@/components/icons";
import { navGroups } from "@/config/navigation";
import { cn } from "@/lib/utils";

import seal from "@/assets/images/seal.png";

const NavItem = ({ item, onNavigate }) => {
  const pathname = usePathname();
  const Icon = item.icon;
  // Nested routes (/properties/villa-12) keep the parent row lit.
  const isActive =
    pathname === item.href || pathname?.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex h-40 items-center gap-12 rounded-[10px] px-12 py-10 text-body font-medium transition-colors",
        isActive
          ? "bg-sidebar-item-active-bg text-white"
          : "text-sidebar-item hover:bg-white/6 hover:text-white"
      )}
    >
      <Icon className="size-24 shrink-0" />
      <span className="whitespace-nowrap">{item.label}</span>
    </Link>
  );
};

const UserCard = ({ user }) => (
  <div className="flex items-center gap-8 p-8">
    <div
      className="flex size-38 shrink-0 items-center justify-center rounded-full text-body-xs font-bold text-[#5a3d12]"
      style={{ backgroundImage: "var(--gradient-avatar)" }}
    >
      {user.initials}
    </div>
    <div className="flex flex-col">
      <span className="text-body-xs font-semibold text-white">{user.name}</span>
      <span className="text-[10px]/[14px] text-text-on-dark-muted">
        {user.meta}
      </span>
    </div>
  </div>
);

/**
 * The sidebar panel itself. Rendered directly on desktop and inside the
 * mobile drawer, so both share one source of truth.
 */
const SidebarNav = ({ user, onNavigate, className }) => (
  <div
    className={cn("flex h-full flex-col", className)}
    style={{ backgroundImage: "var(--gradient-sidebar)" }}
  >
    <div className="border-b border-sidebar-border px-26 pt-26 pb-20">
      <Link href="/" onClick={onNavigate} className="inline-block">
        <SidebarLogo />
      </Link>
    </div>

    <nav aria-label="Sidebar" className="flex flex-col gap-8 p-16">
      {navGroups.map((group) => (
        <div key={group.label} className="flex flex-col gap-8">
          <p className="py-8 pr-12 text-overline uppercase text-sidebar-group-label">
            {group.label}
          </p>
          {group.items.map((item) => (
            <NavItem key={item.href} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      ))}
    </nav>

    <div className="flex flex-1 flex-col items-center justify-end pb-32">
      <Image src={seal} alt="" className="size-108" />
    </div>

    <div className="flex flex-col gap-4 border-t border-sidebar-border p-16">
      <UserCard user={user} />
      <button
        type="button"
        className="flex w-full items-center justify-center gap-9 rounded-[11px] border border-border-inverse px-16 py-10 text-link font-semibold text-white/82 transition-colors hover:bg-white/8"
      >
        <LogoutIcon className="size-16 shrink-0" />
        Log out
      </button>
    </div>
  </div>
);

export { SidebarNav };
