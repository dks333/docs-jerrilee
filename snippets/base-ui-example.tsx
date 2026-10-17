import { Dialog } from "@base-ui/react/dialog";
import { useId, useState } from "react";
import type { FormEvent } from "react";

import "./base-ui-example.css";

export function BaseUiExample() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Field notes");
  const [draft, setDraft] = useState(name);
  const [message, setMessage] = useState("Your workspace name appears in shared documents.");
  const nameId = useId();

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = draft.trim();
    if (!nextName) return;
    setName(nextName);
    setMessage(`Saved workspace name: ${nextName}.`);
    setOpen(false);
  }

  return (
    <div className="base-ui-example base-ui-profile">
      <div className="base-ui-profile-icon" aria-hidden="true">
        F
      </div>
      <div className="base-ui-profile-details">
        <span className="base-ui-eyebrow">Workspace</span>
        <strong>{name}</strong>
        <p role="status">{message}</p>
      </div>
      <Dialog.Root
        open={open}
        onOpenChange={(nextOpen) => {
          if (nextOpen) setDraft(name);
          setOpen(nextOpen);
        }}
      >
        <Dialog.Trigger className="base-ui-example-button">Edit workspace</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop className="base-ui-example-backdrop" />
          <Dialog.Popup className="base-ui-example-dialog">
            <Dialog.Title className="base-ui-example-title">Workspace settings</Dialog.Title>
            <Dialog.Description className="base-ui-example-description">
              Give this workspace a name your team will recognize.
            </Dialog.Description>
            <form onSubmit={saveProfile}>
              <label className="base-ui-example-label" htmlFor={nameId}>
                Workspace name
              </label>
              <input
                className="base-ui-example-input"
                id={nameId}
                name="name"
                autoComplete="organization"
                required
                pattern=".*\S.*"
                value={draft}
                onChange={(event) => setDraft(event.currentTarget.value)}
              />
              <div className="base-ui-example-actions">
                <Dialog.Close className="base-ui-example-button">Cancel</Dialog.Close>
                <button className="base-ui-example-button" type="submit">
                  Save
                </button>
              </div>
            </form>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
