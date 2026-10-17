import { LayoutGroup, MotionConfig, motion } from "motion/react";
import { useId, useState } from "react";

import { DemoIcon } from "./demo-icons.tsx";
import "./motion-examples.css";

const filters = ["All", "Guides", "Reference"];
const cards = [
  {
    title: "quickstart.mdx",
    type: "Guides",
    detail: "Install the package, add your configuration, and start the development server.",
  },
  {
    title: "authentication.mdx",
    type: "Reference",
    detail: "Create an API key and send it in the Authorization header with each request.",
  },
  {
    title: "webhooks.mdx",
    type: "Reference",
    detail: "Register an endpoint, verify incoming signatures, and handle retries.",
  },
];

export function MotionLayout() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const groupId = useId();
  const visibleCards = cards.filter((card) => filter === "All" || card.type === filter);

  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 380, damping: 34 }}>
      <LayoutGroup id={groupId}>
        <div className="motion-example motion-layout-demo">
          <div className="motion-layout-filters" role="group" aria-label="Filter documentation">
            {filters.map((option) => (
              <button
                className="motion-layout-filter"
                type="button"
                key={option}
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
              >
                {filter === option && (
                  <motion.span
                    className="motion-layout-indicator"
                    layoutId="active-filter"
                    initial={false}
                  />
                )}
                <span>{option}</span>
              </button>
            ))}
          </div>
          <motion.div layout className="motion-layout-cards" initial={false}>
            {visibleCards.map((card) => (
              <motion.article
                layout
                className="motion-layout-card"
                initial={false}
                key={card.title}
              >
                <motion.div layout="position" initial={false}>
                  <button
                    className="motion-layout-card-button"
                    type="button"
                    aria-expanded={expanded === card.title}
                    onClick={() => setExpanded(expanded === card.title ? null : card.title)}
                  >
                    <span className="motion-layout-file-label">
                      <DemoIcon name="code" />
                      {card.title}
                    </span>
                    <DemoIcon name={expanded === card.title ? "minus" : "plus"} />
                  </button>
                  {expanded === card.title && <p className="motion-layout-detail">{card.detail}</p>}
                </motion.div>
              </motion.article>
            ))}
          </motion.div>
          <p className="motion-example-caption" role="status">
            {visibleCards.length} files shown.
          </p>
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}
