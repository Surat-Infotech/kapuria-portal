import Image from "next/image";

import { cn } from "@/lib/utils";

import logoMark from "@/assets/images/logo-mark.svg";
import sidebarLogo from "@/assets/images/sidebar-logo.svg";

// Full wordmark used in the desktop sidebar header (115x40 in Figma).
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
    className={cn("h-34 w-auto", className)}
    {...props}
  />
);

export { LogoMark, SidebarLogo };
