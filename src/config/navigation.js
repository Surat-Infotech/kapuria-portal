import {
  ContactIcon,
  FaqsIcon,
  ProfileIcon,
  PropertiesIcon,
  SettingsIcon,
} from "@/components/icons";

// Grouped exactly as the Figma sidebar: each group renders its uppercase
// overline label followed by its rows.
//
// `disabled: true` renders the row but blocks navigation from the sidebar.
// The routes themselves stay reachable by typing the URL — this only hides
// the pages from the client during the current review round. Drop the flag
// once a page is ready to be shown.
export const navGroups = [
  {
    label: "Property",
    items: [
      {
        label: "My Properties",
        href: "/",
        icon: PropertiesIcon,
        disabled: true,
      },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Profile", href: "/profile", icon: ProfileIcon },
      {
        label: "Account Settings",
        href: "/settings",
        icon: SettingsIcon,
      },
    ],
  },
  {
    label: "Support",
    items: [
      {
        label: "Contact Us",
        href: "/contact",
        icon: ContactIcon,
        disabled: true,
      },
      { label: "FAQs", href: "/faq", icon: FaqsIcon, disabled: true },
    ],
  },
];
