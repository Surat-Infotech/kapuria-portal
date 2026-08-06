"use client";

import { useState } from "react";

import { PageHeader } from "@/components/common/page-header";
import { EditIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

import { DetailsCard } from "./details-card";
import { DetailsForm } from "./details-form";
import { IdentityCard } from "./identity-card";
import { SavedBanner } from "./saved-banner";

/**
 * Switches the profile between its read and edit states. Static UI for now:
 * Save and Cancel simply return to the read view.
 */
const ProfileView = ({ profile, sections }) => {
  const [editing, setEditing] = useState(false);

  const editButton = (
    <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>
      <EditIcon className="size-15 text-text-accent" />
      Edit profile
    </Button>
  );

  return (
    <div className="flex flex-col gap-24 px-16 pt-22 pb-52 lg:px-34 lg:pt-32 lg:pb-56">
      {!editing ? <SavedBanner /> : null}

      <PageHeader
        eyebrow="Your account"
        accent="Profile"
        title="Details"
        description="Your personal details and the homes you own with Kapuria."
        action={
          !editing ? (
            <div className="hidden lg:block">{editButton}</div>
          ) : null
        }
      />

      <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
        <IdentityCard profile={profile} editing={editing} />

        {editing ? (
          <DetailsForm
            profile={profile}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <DetailsCard sections={sections} />
        )}
      </div>

      {/* Figma moves the action below the cards on mobile. */}
      {!editing ? (
        <div className="flex justify-end lg:hidden">{editButton}</div>
      ) : null}
    </div>
  );
};

export { ProfileView };
