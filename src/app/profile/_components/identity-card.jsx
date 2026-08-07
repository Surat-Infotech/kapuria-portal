import { CameraIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

/**
 * Left column card: large gold monogram, name, and the summary rows
 * (Member since / Buyer ID / Properties). In edit mode a "Change picture"
 * button appears under the name.
 */
const IdentityCard = ({ profile, editing = false }) => (
  <div className="flex w-full shrink-0 flex-col items-center gap-16 rounded-[20px] border border-border-subtle bg-surface p-16 md:w-300 lg:w-320 lg:p-26">
    <div className="flex items-center rounded-[84px] border-2 border-avatar-ring p-4">
      <div
        className="flex size-118 items-center justify-center rounded-full font-playfair text-[42px] font-medium italic text-[#5a3d12]"
        style={{ backgroundImage: "var(--gradient-avatar)" }}
      >
        {profile.monogram}
      </div>
    </div>

    <div className="flex flex-col items-center gap-4 lg:gap-2">
      <p className="text-h4 font-semibold text-text-primary">{profile.name}</p>
      <p className="text-body-xs text-text-secondary">{profile.role}</p>
    </div>

    {editing ? (
      <Button type="button" variant="secondary">
        <CameraIcon className="size-16 text-text-accent" />
        Change picture
      </Button>
    ) : null}

    <div className="h-px w-full bg-border-subtle" />

    <dl className="flex w-full flex-col gap-8 text-body-xs">
      {profile.summary.map((row) => (
        <div key={row.label} className="flex items-center justify-between">
          <dt className="text-text-secondary">{row.label}</dt>
          <dd className="font-semibold text-text-primary">{row.value}</dd>
        </div>
      ))}
    </dl>
  </div>
);

export { IdentityCard };
