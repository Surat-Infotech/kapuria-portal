import { AppleIcon, FacebookIcon, GoogleIcon } from "@/components/brand-icons";

const providers = [
  { label: "Facebook", icon: FacebookIcon },
  { label: "Google", icon: GoogleIcon },
  { label: "Apple", icon: AppleIcon },
];

/** "or continue with" rule plus the three provider tiles. */
const SocialSignIn = () => (
  <div className="flex flex-col gap-16 mt-16">
    <div className="flex items-center gap-16 pt-6">
      <div className="h-px flex-1 bg-border-subtle" />
      <span className="text-body-xs font-semibold text-text-muted">or continue with</span>
      <div className="h-px flex-1 bg-border-subtle" />
    </div>

    <div className="flex items-center justify-center gap-12 lg:gap-8">
      {providers.map(({ label, icon: Icon }) => (
        <button
          key={label}
          type="button"
          aria-label={`Continue with ${label}`}
          className="flex size-52 cursor-pointer items-center justify-center rounded-[14px] border border-border-default bg-surface transition-colors hover:bg-surface-sunken focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          <Icon className="size-22" />
        </button>
      ))}
    </div>
  </div>
);

export { SocialSignIn };