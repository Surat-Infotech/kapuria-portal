import { PortalShell } from "@/components/layout/portal-shell";

const user = {
  initials: "AA",
  name: "Anil Ambani",
  meta: "Buyer · 2 properties",
};

export default function Home() {
  return (
    <PortalShell user={user}>
      <div className="flex flex-col gap-16 px-34 py-30">
        <p className="text-eyebrow uppercase text-text-accent">Your portfolio</p>
        <h1 className="text-display font-medium text-text-primary">
          <span className="font-playfair italic text-text-accent">My</span>{" "}
          Properties
        </h1>
        <div className="h-2 w-40 rounded-sm bg-gold-400" />
        <p className="max-w-540 text-body text-text-secondary">
          The homes you own with Kapuria. Jump straight into any property’s
          drawings, photos and documents.
        </p>
      </div>
    </PortalShell>
  );
}
