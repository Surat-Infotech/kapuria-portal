import { ChevronDownIcon, SearchIcon } from "@/components/icons";

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

      <button
        type="button"
        className="flex items-center gap-8 rounded-xl border border-border-default bg-surface px-8 py-4 transition-colors hover:bg-surface-sunken"
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
        <ChevronDownIcon className="size-15 shrink-0 text-text-secondary" />
      </button>
    </div>
  </header>
);

export { TopBar };
