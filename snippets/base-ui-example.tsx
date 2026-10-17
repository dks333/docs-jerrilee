import { Dialog } from "@base-ui/react/dialog";
import { useId, useState } from "react";
import type { FormEvent } from "react";

import { DemoIcon } from "./demo-icons.tsx";
import "./base-ui-example.css";

export function BaseUiExample() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Package examples");
  const [draft, setDraft] = useState(name);
  const nameId = useId();

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = draft.trim();
    if (!nextName) return;
    setName(nextName);
    setOpen(false);
  }

  return (
    <div className="base-ui-example base-ui-settings-row">
      <div className="base-ui-settings-detail">
        <strong>Workspace name</strong>
        <p role="status">{name}</p>
      </div>
      <Dialog.Root
        open={open}
        onOpenChange={(nextOpen) => {
          if (nextOpen) setDraft(name);
          setOpen(nextOpen);
        }}
      >
        <Dialog.Trigger className="demo-button">Edit</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop className="base-ui-example-backdrop" />
          <Dialog.Popup className="base-ui-example-dialog">
            <Dialog.Title className="base-ui-example-title">Workspace settings</Dialog.Title>
            <Dialog.Close
              className="demo-button demo-button-ghost demo-button-square base-ui-dialog-close"
              aria-label="Close dialog"
            >
              <DemoIcon name="close" />
            </Dialog.Close>
            <Dialog.Description className="base-ui-example-description">
              Change the name shown in your workspace.
            </Dialog.Description>
            <form onSubmit={saveProfile}>
              <label className="base-ui-example-label" htmlFor={nameId}>
                Workspace name
              </label>
              <input
                className="demo-input"
                id={nameId}
                name="name"
                autoComplete="organization"
                required
                pattern=".*\S.*"
                value={draft}
                onChange={(event) => setDraft(event.currentTarget.value)}
              />
              <div className="base-ui-example-actions">
                <Dialog.Close className="demo-button">Cancel</Dialog.Close>
                <button className="demo-button demo-button-primary" type="submit">
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
