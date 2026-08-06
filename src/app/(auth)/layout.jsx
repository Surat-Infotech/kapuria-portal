import { AuthShell } from "@/components/layout/auth-shell";

// Route group for the signed-out routes: /sign-in and any auth screen added
// later get the split-screen layout instead of the portal's sidebar + top bar.
export default function AuthLayout({ children }) {
  return <AuthShell>{children}</AuthShell>;
}