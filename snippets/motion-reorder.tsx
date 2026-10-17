import { MotionConfig, Reorder, useDragControls, useReducedMotion } from "motion/react";
import { useState } from "react";

import { DemoIcon } from "./demo-icons.tsx";
import "./motion-examples.css";

const initialItems = ["Introduction", "Installation", "Configuration", "Examples"];

export function MotionReorder() {
  const [items, setItems] = useState(initialItems);
  const [announcement, setAnnouncement] = useState(
    "4 items. Drag a handle or use the move buttons.",
  );

  function reorder(nextItems: string[]) {
    setItems(nextItems);
    setAnnouncement(`Current order: ${nextItems.join(", ")}.`);
  }

  function moveItem(item: string, direction: number) {
    const index = items.indexOf(item);
    const destination = index + direction;
    if (index < 0 || destination < 0 || destination >= items.length) return;
    const nextItems = items.filter((entry) => entry !== item);
    nextItems.splice(destination, 0, item);
    setItems(nextItems);
    setAnnouncement(`${item} moved to position ${destination + 1} of ${items.length}.`);
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="motion-example">
        <div className="motion-example-heading">
          <strong>Page order</strong>
          <button
            className="demo-button demo-button-small demo-button-ghost"
            type="button"
            onClick={() => reorder([...initialItems])}
          >
            Reset
          </button>
        </div>
        <Reorder.Group
          className="motion-reorder-list"
          axis="y"
          values={items}
          onReorder={reorder}
          aria-label="Documentation page order"
          layoutScroll
        >
          {items.map((item, index) => (
            <ReorderRow
              key={item}
              item={item}
              index={index}
              count={items.length}
              onMove={moveItem}
            />
          ))}
        </Reorder.Group>
        <p className="motion-example-caption" role="status">
          {announcement}
        </p>
      </div>
    </MotionConfig>
  );
}

function ReorderRow({
  item,
  index,
  count,
  onMove,
}: {
  item: string;
  index: number;
  count: number;
  onMove: (item: string, direction: number) => void;
}) {
  const dragControls = useDragControls();
  const reducedMotion = useReducedMotion();

  return (
    <Reorder.Item
      className="motion-reorder-item"
      value={item}
      dragListener={false}
      dragControls={dragControls}
      initial={false}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
    >
      <span
        className="motion-reorder-handle"
        aria-hidden="true"
        onPointerDown={(event) => dragControls.start(event)}
      >
        <DemoIcon name="grip" />
      </span>
      <span className="motion-reorder-title">{item}</span>
      <div className="motion-reorder-buttons">
        <button
          className="demo-button demo-button-small demo-button-square demo-button-ghost"
          type="button"
          aria-label={`Move ${item} up`}
          disabled={index === 0}
          onClick={() => onMove(item, -1)}
        >
          <DemoIcon name="arrow-up" />
        </button>
        <button
          className="demo-button demo-button-small demo-button-square demo-button-ghost"
          type="button"
          aria-label={`Move ${item} down`}
          disabled={index === count - 1}
          onClick={() => onMove(item, 1)}
        >
          <DemoIcon name="arrow-down" />
        </button>
      </div>
    </Reorder.Item>
  );
}
