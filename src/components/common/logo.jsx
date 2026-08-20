import Image from "next/image";

import { cn } from "@/lib/utils";

import logoMark from "@/assets/images/logo-mark.svg";
import sidebarLogo from "@/assets/images/header-logo.webp";
import authLogo from "@/assets/images/auth-logo.svg";

// Full wordmark used in the desktop sidebar header (116x40, matching the
// 115x40 slot in Figma). Shared with kapuria-developers, where the same
// artwork ships as webp — a fraction of the SVG's weight.
const SidebarLogo = ({ className, ...props }) => (
  <Image
    src={sidebarLogo}
    alt="Kapuria Developers"
    className={cn("h-40 w-auto", className)}
    {...props}
  />
);

// Compact `kd` monogram used in the mobile top bar (37x34 in Figma).
const LogoMark = ({ className, ...props }) => (
  <Image
    src={logoMark}
    alt="Kapuria Developers"
    className={cn(className)}
    {...props}
  />
);

const AuthLogo = ({ className, ...props }) => (
  <Image
    src={authLogo}
    alt="Kapuria Developers"
    className={cn("h-34 w-auto", className)}
    {...props}
  />
);

export { LogoMark, SidebarLogo, AuthLogo };
