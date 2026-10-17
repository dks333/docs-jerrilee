import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";

import { DemoIcon } from "./demo-icons.tsx";
import "./motion-examples.css";

export function MotionSprings() {
  const [stiffness, setStiffness] = useState(180);
  const [damping, setDamping] = useState(18);
  const [mass, setMass] = useState(1);
  const [moved, setMoved] = useState(false);
  const reducedMotion = useReducedMotion();
  const controlId = useId();

  return (
    <MotionConfig reducedMotion="user">
      <div className="motion-example">
        <div className="motion-spring-stage" aria-label="Spring animation preview">
          <div className="motion-spring-path">
            <motion.div
              className="motion-spring-marker"
              initial={false}
              animate={{ x: moved ? 140 : 0 }}
              transition={
                reducedMotion ? { duration: 0 } : { type: "spring", stiffness, damping, mass }
              }
            />
          </div>
        </div>
        <div className="motion-spring-controls">
          <label htmlFor={`${controlId}-stiffness`}>
            Stiffness <output>{stiffness}</output>
            <input
              id={`${controlId}-stiffness`}
              type="range"
              min={50}
              max={500}
              step={10}
              value={stiffness}
              onChange={(event) => setStiffness(event.currentTarget.valueAsNumber)}
            />
          </label>
          <label htmlFor={`${controlId}-damping`}>
            Damping <output>{damping}</output>
            <input
              id={`${controlId}-damping`}
              type="range"
              min={5}
              max={40}
              step={1}
              value={damping}
              onChange={(event) => setDamping(event.currentTarget.valueAsNumber)}
            />
          </label>
          <label htmlFor={`${controlId}-mass`}>
            Mass <output>{mass.toFixed(1)}</output>
            <input
              id={`${controlId}-mass`}
              type="range"
              min={0.5}
              max={3}
              step={0.1}
              value={mass}
              onChange={(event) => setMass(event.currentTarget.valueAsNumber)}
            />
          </label>
        </div>
        <div className="motion-example-actions">
          <button type="button" className="demo-button" onClick={() => setMoved(!moved)}>
            Move {moved ? "left" : "right"} <DemoIcon name="play" />
          </button>
          <p>
            {reducedMotion
              ? "Reduced motion is enabled. Position changes instantly."
              : "Changes apply on the next move."}
          </p>
        </div>
      </div>
    </MotionConfig>
  );
}
