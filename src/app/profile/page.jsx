import { PortalShell } from "@/components/layout/portal-shell";

import { ProfileView } from "./_components/profile-view";

export const metadata = {
  title: "Profile Details — Kapuria Portal",
};

const user = {
  initials: "AA",
  name: "Anil Ambani",
  meta: "Buyer · 2 properties",
};

const profile = {
  monogram: "A",
  name: "Anil Ambani",
  role: "Buyer · Villa 12",
  firstName: "Anil",
  lastName: "Ambani",
  dateOfBirth: "14 / 06 / 1959",
  language: "English",
  email: "anilambani@gmail.com",
  dialCode: "+91",
  phone: "98765 43210",
  addressLine1: "Villa 12, Serenity Palms Mansions",
  addressLine2: "Sector 120",
  city: "Mohali",
  state: "Punjab, India",
  summary: [
    { label: "Member since", value: "Nov 2022" },
    { label: "Buyer ID", value: "KD-SPM-0112" },
    { label: "Properties", value: "2 owned" },
  ],
};

// Read-view layout: the same values grouped into the card's three sections.
const sections = [
  {
    title: "PERSONAL",
    rows: [
      [
        { label: "First name", value: profile.firstName },
        { label: "Last name", value: profile.lastName },
      ],
      [
        { label: "Date of birth", value: "14 June 1959" },
        { label: "Preferred language", value: profile.language },
      ],
    ],
  },
  {
    title: "CONTACT",
    rows: [
      [{ label: "Email address", value: profile.email, verified: true }],
      [{ label: "Phone number", value: `${profile.dialCode} ${profile.phone}` }],
    ],
  },
  {
    title: "ADDRESS",
    rows: [
      [{ label: "Address line 1", value: profile.addressLine1 }],
      [{ label: "Address line 2", value: profile.addressLine2 }],
      [
        { label: "City / District", value: profile.city },
        { label: "State / Country", value: profile.state },
      ],
    ],
  },
];

export default function ProfilePage() {
  return (
    <PortalShell user={user}>
      <ProfileView profile={profile} sections={sections} />
    </PortalShell>
  );
}
