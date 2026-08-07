import { PageHeader } from "@/components/common/page-header";
import { PortalShell } from "@/components/layout/portal-shell";

import ContactFormSection from "./_sections/contact-form";

export const metadata = {
  title: "Get in Touch — Kapuria Portal",
};

const user = {
  initials: "AA",
  name: "Anil Ambani",
  meta: "Buyer · 2 properties",
};

export default function ContactPage() {
  return (
    <PortalShell user={user}>
      <div className="flex flex-col gap-24 px-16 pt-22 pb-52 lg:px-34 lg:pt-32 lg:pb-56">
        <PageHeader
          eyebrow="Support"
          
          accent="Get"
          title="in Touch"
          description="Questions about your villa, documents or handover? Your project team usually replies within one business day."
        />

        <ContactFormSection />
      </div>
    </PortalShell>
  );
}
