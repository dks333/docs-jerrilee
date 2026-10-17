import { LayoutGroup, MotionConfig, motion } from "motion/react";
import { useId, useState } from "react";

import "./motion-examples.css";

const filters = ["All", "Notes", "Plans"];
const cards = [
  {
    title: "Leave some room",
    type: "Notes",
    detail:
      "A quiet afternoon, a short walk, and a few things left unplanned. Keep the schedule light.",
  },
  {
    title: "A weekend outside",
    type: "Plans",
    detail:
      "Take the early train, follow the coast, and find somewhere to stop for lunch. No reservations needed.",
  },
  {
    title: "Bring a notebook",
    type: "Notes",
    detail:
      "Write down the small things you would otherwise forget: a good sentence, a place to return to, an idea for later.",
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
          <div className="motion-layout-filters" role="group" aria-label="Filter notes">
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
                  <span className="motion-example-eyebrow">{card.type}</span>
                  <button
                    className="motion-layout-card-button"
                    type="button"
                    aria-expanded={expanded === card.title}
                    onClick={() => setExpanded(expanded === card.title ? null : card.title)}
                  >
                    {card.title}
                    <span aria-hidden="true">{expanded === card.title ? "−" : "+"}</span>
                  </button>
                  {expanded === card.title && <p className="motion-layout-detail">{card.detail}</p>}
                </motion.div>
              </motion.article>
            ))}
          </motion.div>
          <p className="motion-example-caption" role="status">
            {visibleCards.length} notes shown. Select a title to expand it.
          </p>
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}
