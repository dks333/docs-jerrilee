import { Combobox } from "@base-ui/react/combobox";
import { useState } from "react";

import "./base-ui-example.css";

const labels = ["Design", "Documentation", "Engineering", "Feedback", "Research", "Writing"];

export function BaseUiCombobox() {
  const [selected, setSelected] = useState<string[]>(["Design", "Engineering"]);

  return (
    <div className="base-ui-example base-ui-combobox-demo">
      <Combobox.Root items={labels} multiple value={selected} onValueChange={setSelected}>
        <Combobox.Label className="base-ui-example-label">Project labels</Combobox.Label>
        <Combobox.InputGroup className="base-ui-combobox-group">
          <Combobox.Value>
            {(values: string[]) => (
              <Combobox.Chips className="base-ui-combobox-chips" aria-label="Selected labels">
                {values.map((label) => (
                  <Combobox.Chip
                    key={label}
                    className="base-ui-combobox-chip"
                    aria-label={label}
                    aria-description="Press Backspace or Delete to remove"
                  >
                    {label}
                    <Combobox.ChipRemove
                      className="base-ui-chip-remove"
                      aria-label={`Remove ${label}`}
                    >
                      ×
                    </Combobox.ChipRemove>
                  </Combobox.Chip>
                ))}
                <Combobox.Input
                  className="base-ui-combobox-input"
                  placeholder="Find a label…"
                  aria-description="Use the arrow keys to navigate labels. Press Arrow Left from an empty input to reach selected labels."
                />
              </Combobox.Chips>
            )}
          </Combobox.Value>
          <Combobox.Trigger className="base-ui-combobox-trigger" aria-label="Show labels">
            ⌄
          </Combobox.Trigger>
        </Combobox.InputGroup>
        <Combobox.Portal>
          <Combobox.Positioner className="base-ui-positioner" sideOffset={6}>
            <Combobox.Popup className="base-ui-popup base-ui-combobox-popup">
              <Combobox.Empty className="base-ui-combobox-empty">
                No matching labels. Try “Design”.
              </Combobox.Empty>
              <Combobox.List className="base-ui-combobox-list">
                {(label: string) => (
                  <Combobox.Item key={label} value={label} className="base-ui-option">
                    <Combobox.ItemIndicator className="base-ui-item-indicator">
                      ✓
                    </Combobox.ItemIndicator>
                    {label}
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
      <p className="base-ui-helper" role="status">
        {selected.length} labels selected. Add or remove labels without closing the list.
      </p>
    </div>
  );
}
