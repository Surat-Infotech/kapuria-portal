import { PageHeader } from "@/components/common/page-header";
import { SavedBanner } from "@/components/common/saved-banner";
import { PortalShell } from "@/components/layout/portal-shell";

import { SecurityCard } from "./_components/security-card";

export const metadata = {
  title: "Account Settings — Kapuria Portal",
};

const user = {
  initials: "AA",
  name: "Anil Ambani",
  meta: "Buyer · 2 properties",
};

const security = {
  passwordChangedOn: "12 Jun 2024",
  twoFactorEnabled: true,
};

export default function SettingsPage() {
  return (
    <PortalShell user={user}>
      <div className="flex flex-col gap-24 px-16 pt-22 pb-52 lg:px-34 lg:pt-30 lg:pb-56">
        <SavedBanner
          title="Preferences saved"
          description="Your security and notification settings are up to date."
        />

        <PageHeader
          eyebrow="Your account"
          accent="Account"
          title="Settings"
          description="Your login security and how you hear from us."
        />

        <SecurityCard security={security} />
      </div>
    </PortalShell>
  );
}
