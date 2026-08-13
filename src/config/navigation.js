import {
  ContactIcon,
  FaqsIcon,
  ProfileIcon,
  PropertiesIcon,
  SettingsIcon,
} from "@/components/icons";

// Grouped exactly as the Figma sidebar: each group renders its uppercase
// overline label followed by its rows.
export const navGroups = [
  {
    label: "Property",
    items: [{ label: "My Properties", href: "/", icon: PropertiesIcon }],
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
      },
      { label: "FAQs", href: "/faqs", icon: FaqsIcon },
    ],
  },
];
