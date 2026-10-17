import { Menu } from "@base-ui/react/menu";
import { useState } from "react";

import { DemoIcon } from "./demo-icons.tsx";
import "./base-ui-example.css";

const files = [
  { title: "quickstart.mdx", date: "October 14", category: "Guide" },
  { title: "authentication.mdx", date: "October 10", category: "Reference" },
  { title: "changelog.mdx", date: "October 7", category: "Updates" },
];

export function BaseUiMenu() {
  const [compact, setCompact] = useState(false);
  const [showCategory, setShowCategory] = useState(true);
  const [sort, setSort] = useState("newest");
  const visibleFiles = sort === "newest" ? files : [...files].reverse();

  return (
    <div className="base-ui-example">
      <div className="base-ui-demo-heading">
        <strong>Documentation</strong>
        <Menu.Root>
          <Menu.Trigger className="demo-button">
            View options <DemoIcon name="chevron-down" />
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
                      <DemoIcon name="check" />
                    </Menu.CheckboxItemIndicator>
                    Compact spacing
                  </Menu.CheckboxItem>
                  <Menu.CheckboxItem
                    className="base-ui-option"
                    checked={showCategory}
                    onCheckedChange={setShowCategory}
                  >
                    <Menu.CheckboxItemIndicator className="base-ui-item-indicator">
                      <DemoIcon name="check" />
                    </Menu.CheckboxItemIndicator>
                    Show category
                  </Menu.CheckboxItem>
                </Menu.Group>
                <Menu.Separator className="base-ui-menu-separator" />
                <Menu.SubmenuRoot>
                  <Menu.SubmenuTrigger className="base-ui-option base-ui-submenu-trigger">
                    Sort by <DemoIcon name="chevron-right" />
                  </Menu.SubmenuTrigger>
                  <Menu.Portal>
                    <Menu.Positioner className="base-ui-positioner" sideOffset={4} alignOffset={-4}>
                      <Menu.Popup className="base-ui-popup base-ui-menu-popup">
                        <Menu.RadioGroup value={sort} onValueChange={setSort}>
                          <Menu.RadioItem className="base-ui-option" value="newest">
                            <Menu.RadioItemIndicator className="base-ui-item-indicator">
                              <DemoIcon name="check" />
                            </Menu.RadioItemIndicator>
                            Newest first
                          </Menu.RadioItem>
                          <Menu.RadioItem className="base-ui-option" value="oldest">
                            <Menu.RadioItemIndicator className="base-ui-item-indicator">
                              <DemoIcon name="check" />
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
        {visibleFiles.map((file) => (
          <div className="base-ui-reading-row" key={file.title}>
            <div>
              <strong>{file.title}</strong>
              {showCategory && <span>{file.category}</span>}
            </div>
            <time>{file.date}</time>
          </div>
        ))}
      </div>
      <p className="base-ui-helper" role="status">
        Sorted {sort} first. {compact ? "Compact" : "Comfortable"} spacing.
      </p>
    </div>
  );
}
