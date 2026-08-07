"use client";

import { useState } from "react";

import { EditIcon, LockIcon, LockKeyholeIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { PasswordForm } from "./password-form";
import { cn } from "@/lib/utils";

/** Green "On" / grey "Off" pill shown in the read state. */
const StatusPill = ({ on }) => (
  <span
    className={
      on
        ? "flex shrink-0 items-center gap-4 rounded-[30px] bg-success-soft px-12 py-4 text-body-xs font-bold text-success-muted"
        : "flex shrink-0 items-center gap-4 rounded-[30px] bg-surface-sunken px-12 py-4 text-body-xs font-bold text-text-muted"
    }
  >
    <span
      className={`size-6 rounded-full ${on ? "bg-success-muted" : "bg-text-muted"}`}
    />
    {on ? "On" : "Off"}
  </span>
);

/** Two-factor row — a pill in the read state, a live switch while changing. */
const TwoFactorRow = ({ enabled, editing }) => (
  <div className="flex items-center gap-8 rounded-[13px] border border-border-subtle bg-surface-sunken p-8 lg:gap-14 lg:px-16 lg:py-14">
    <span className="flex size-36 shrink-0 items-center justify-center rounded-[9px] border border-border-subtle bg-surface text-text-accent">
      <LockKeyholeIcon className="size-17" />
    </span>

    <div className="flex min-w-0 flex-1 flex-col">
      <p className="text-body-xs font-semibold text-text-primary xs:text-body">
        Two-factor authentication
      </p>
      <p className="text-[10px]/[14px] text-text-secondary xs:text-body-xs">
        {editing
          ? "Extra security with an SMS at login."
          : "SMS code required at every login."}
      </p>
    </div>

    {editing ? (
      <Switch defaultChecked={enabled} aria-label="Two-factor authentication" />
    ) : (
      <StatusPill on={enabled} />
    )}
  </div>
);

/**
 * Security card. Reading shows the password summary; pressing Change swaps
 * the body for the password form.
 */
const SecurityCard = ({ security }) => {
  const [editing, setEditing] = useState(false);

  const changeButton = (className) => (
    <Button
      variant="secondary"
      onClick={() => setEditing(true)}
      className={cn("px-16 sm:py-11 py-8", className)}
    >
      <EditIcon className="size-15 text-text-accent" />
      Change
    </Button>
  );

  return (
    <div className="flex w-full flex-col rounded-[20px] border border-border-subtle bg-surface">
      <div className="flex items-center gap-13 p-16 lg:px-32 lg:pt-32 lg:pb-24">
        <span className="flex size-36 shrink-0 items-center justify-center rounded-[10px] bg-gold-soft text-text-accent">
          <LockIcon className="size-18" />
        </span>

        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-body font-semibold text-text-primary">Security</p>
          <p className="text-body-xs text-text-secondary">
            {editing
              ? "Your new password should differ from previous ones."
              : "Password & sign-in protection."}
          </p>
        </div>

        {!editing ? changeButton("hidden lg:inline-flex") : null}
      </div>

      <div className="h-px w-full bg-border-subtle" />

      {editing ? (
        <>
          <PasswordForm onCancel={() => setEditing(false)} />
          <div className="px-16 pb-16 lg:px-32 lg:pb-32">
            <div className="mb-16 h-px w-full bg-border-subtle lg:mb-24" />
            <TwoFactorRow enabled={security.twoFactorEnabled} editing />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-24 px-16 pt-22 pb-16 lg:px-32 lg:pb-32">
          <div className="flex items-start justify-between gap-16">
            <div className="flex min-w-0 flex-col gap-4">
              <p className="text-body-xs text-text-secondary">Password</p>
              <p className="text-body xs:text-[15px]/[18px] font-semibold text-text-primary">
                {"•".repeat(12)}
              </p>
              <p className="text-[10px]/[14px] xs:text-[11.5px]/[14px] text-text-muted">
                Last changed {security.passwordChangedOn}
              </p>
            </div>

            {changeButton("lg:hidden")}
          </div>

          <div className="h-px w-full bg-border-subtle" />

          <TwoFactorRow enabled={security.twoFactorEnabled} />
        </div>
      )}
    </div>
  );
};

export { SecurityCard };
