import { SaveCheckIcon, VerifiedIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Field, Input, Label } from "@/components/ui/input";

/**
 * Edit state of the details card: every value becomes an input, and the card
 * ends with the Cancel / Save changes footer. Static UI for now — no
 * submission wiring yet.
 */
const DetailsForm = ({ profile, onCancel }) => (
  <form
    onSubmit={(event) => event.preventDefault()}
    className="flex w-full min-w-0 flex-1 flex-col gap-16 rounded-[20px] border border-border-subtle bg-surface px-16 py-26 lg:gap-26 lg:p-32"
  >
    <section className="flex flex-col gap-16 lg:gap-24">
      <h2 className="text-[10px]/[14px] font-bold tracking-[2px] text-text-accent">
        PERSONAL
      </h2>

      <div className="flex flex-col gap-16 lg:flex-row">
        <Field>
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" defaultValue={profile.firstName} />
        </Field>
        <Field>
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" defaultValue={profile.lastName} />
        </Field>
      </div>

      <div className="flex flex-col gap-16 lg:flex-row">
        <Field>
          <Label htmlFor="dob">Date of birth</Label>
          <Input id="dob" defaultValue={profile.dateOfBirth} />
        </Field>
        <Field>
          <Label htmlFor="language">Preferred language</Label>
          <Input id="language" defaultValue={profile.language} />
        </Field>
      </div>
    </section>

    <div className="h-px w-full bg-border-subtle" />

    <section className="flex flex-col gap-16 lg:gap-24">
      <h2 className="text-[10px]/[14px] font-bold tracking-[2px] text-text-accent">
        CONTACT
      </h2>

      <Field>
        <Label htmlFor="email">Email address</Label>
        {/* The Verified pill sits inside the field, so the input is unstyled
            here and the wrapper carries the border. */}
        <div className="flex h-42 w-full items-center gap-8 rounded-[11px] border border-border-default bg-surface px-16 py-8 focus-within:border-gold-400">
          <input
            id="email"
            type="email"
            defaultValue={profile.email}
            className="min-w-0 flex-1 bg-transparent text-body text-text-primary outline-none"
          />
          <span className="flex shrink-0 items-center gap-4 rounded-[20px] bg-success-soft px-12 py-4 text-body-xs font-bold text-success-muted">
            <VerifiedIcon className="size-12" />
            Verified
          </span>
        </div>
      </Field>

      <Field>
        <Label htmlFor="phone">Phone number</Label>
        <div className="flex gap-10">
          <div className="flex h-42 w-104 shrink-0 items-center justify-center rounded-[11px] border border-border-default bg-surface px-16 py-8 text-[13px] font-semibold text-text-primary">
            🇮🇳 {profile.dialCode}
          </div>
          <Input id="phone" type="tel" defaultValue={profile.phone} />
        </div>
      </Field>
    </section>

    <div className="h-px w-full bg-border-subtle" />

    <section className="flex flex-col gap-16 lg:gap-24">
      <h2 className="text-[10px]/[14px] font-bold tracking-[2px] text-text-accent">
        ADDRESS
      </h2>

      <Field>
        <Label htmlFor="address1">Address line 1</Label>
        <Input id="address1" defaultValue={profile.addressLine1} />
      </Field>

      <Field>
        <Label htmlFor="address2">Address line 2</Label>
        <Input id="address2" defaultValue={profile.addressLine2} />
      </Field>

      <div className="flex flex-col gap-16 lg:flex-row">
        <Field>
          <Label htmlFor="city">City / District</Label>
          <Input id="city" defaultValue={profile.city} />
        </Field>
        <Field>
          <Label htmlFor="state">State / Country</Label>
          <Input id="state" defaultValue={profile.state} />
        </Field>
      </div>
    </section>

    <div className="h-px w-full bg-border-subtle" />

    <div className="flex flex-col-reverse gap-16 lg:flex-row lg:items-center lg:justify-between">
      <p className="text-center text-body-xs text-text-secondary lg:text-left">
        Changes are saved to your buyer account.
      </p>

      {/* Figma puts Save first on mobile and last on desktop. */}
      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-center">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <SaveCheckIcon className="size-16 text-gold-300" />
          Save changes
        </Button>
      </div>
    </div>
  </form>
);

export { DetailsForm };
