import { InfoIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

/**
 * Change-password state of the Security card: three password fields, the
 * requirements hint, and the Update password action. Static UI for now.
 */
const PasswordForm = ({ onCancel }) => (
  <form
    onSubmit={(event) => event.preventDefault()}
    className="flex flex-col gap-16 p-16 lg:gap-24 lg:px-32 lg:pt-24 lg:pb-32"
  >
    <div className="flex flex-col gap-4">
      <Label htmlFor="currentPassword">Current password</Label>
      <PasswordInput id="currentPassword" defaultValue="password1234" />
    </div>

    <div className="flex flex-col gap-4">
      <Label htmlFor="newPassword">New password</Label>
      <PasswordInput id="newPassword" defaultValue="password1234" />
    </div>

    <div className="flex flex-col gap-4">
      <Label htmlFor="confirmPassword">Confirm new password</Label>
      <PasswordInput id="confirmPassword" defaultValue="password1234" />
    </div>

    <p className="flex items-center gap-8 rounded-[10px] border border-border-subtle bg-surface-sunken px-6 py-7 text-[10px]/[14px] text-text-secondary sm:px-16 sm:py-11 sm:text-body-xs">
      <InfoIcon className="size-15 shrink-0 text-text-accent" />
      Use at least 8 characters with a number and a symbol.
    </p>

    <div className="flex items-center gap-8 lg:justify-end">
      <Button
        type="button"
        variant="secondary"
        onClick={onCancel}
        className="hidden lg:inline-flex"
      >
        Cancel
      </Button>
      <Button type="submit" width="full" className="lg:w-auto">
        Update password
      </Button>
    </div>
  </form>
);

export { PasswordForm };
