import { Menu } from "@base-ui/react/menu";
import { useState } from "react";

import "./base-ui-example.css";

const notes = [
  { title: "A slower start", date: "October 14", category: "Notes" },
  { title: "Things worth keeping", date: "October 10", category: "Collection" },
  { title: "Out of the office", date: "October 7", category: "Journal" },
];

export function BaseUiMenu() {
  const [compact, setCompact] = useState(false);
  const [showCategory, setShowCategory] = useState(true);
  const [sort, setSort] = useState("newest");
  const visibleNotes = sort === "newest" ? notes : [...notes].reverse();

  return (
    <div className="base-ui-example">
      <div className="base-ui-demo-heading">
        <strong>Reading list</strong>
        <Menu.Root>
          <Menu.Trigger className="base-ui-example-button">
            View options <span aria-hidden="true">⌄</span>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner className="base-ui-positioner" sideOffset={6} align="end">
              <Menu.Popup className="base-ui-popup base-ui-menu-popup">
                <Menu.Group>
                  <Menu.GroupLabel className="base-ui-menu-label">Display</Menu.GroupLabel>
                  <Menu.CheckboxItem
                    className="base-ui-option"
                    checked={compact}
                    onCheckedChange={setCompact}
                  >
                    <Menu.CheckboxItemIndicator className="base-ui-item-indicator">
                      ✓
                    </Menu.CheckboxItemIndicator>
                    Compact spacing
                  </Menu.CheckboxItem>
                  <Menu.CheckboxItem
                    className="base-ui-option"
                    checked={showCategory}
                    onCheckedChange={setShowCategory}
                  >
                    <Menu.CheckboxItemIndicator className="base-ui-item-indicator">
                      ✓
                    </Menu.CheckboxItemIndicator>
                    Show category
                  </Menu.CheckboxItem>
                </Menu.Group>
                <Menu.Separator className="base-ui-menu-separator" />
                <Menu.SubmenuRoot>
                  <Menu.SubmenuTrigger className="base-ui-option base-ui-submenu-trigger">
                    Sort by <span aria-hidden="true">›</span>
                  </Menu.SubmenuTrigger>
                  <Menu.Portal>
                    <Menu.Positioner className="base-ui-positioner" sideOffset={4} alignOffset={-4}>
                      <Menu.Popup className="base-ui-popup base-ui-menu-popup">
                        <Menu.RadioGroup value={sort} onValueChange={setSort}>
                          <Menu.RadioItem className="base-ui-option" value="newest">
                            <Menu.RadioItemIndicator className="base-ui-item-indicator">
                              •
                            </Menu.RadioItemIndicator>
                            Newest first
                          </Menu.RadioItem>
                          <Menu.RadioItem className="base-ui-option" value="oldest">
                            <Menu.RadioItemIndicator className="base-ui-item-indicator">
                              •
                            </Menu.RadioItemIndicator>
                            Oldest first
                          </Menu.RadioItem>
                        </Menu.RadioGroup>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.SubmenuRoot>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>
      <div className="base-ui-reading-list" data-compact={compact}>
        {visibleNotes.map((note) => (
          <div className="base-ui-reading-row" key={note.title}>
            <div>
              <strong>{note.title}</strong>
              {showCategory && <span>{note.category}</span>}
            </div>
            <time>{note.date}</time>
          </div>
        ))}
      </div>
      <p className="base-ui-helper" role="status">
        Sorted {sort} first. {compact ? "Compact" : "Comfortable"} spacing.
      </p>
    </div>
  );
}
