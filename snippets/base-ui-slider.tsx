import { Slider } from "@base-ui/react/slider";
import { useState } from "react";

import "./base-ui-example.css";

const runners = [
  { name: "Small", resources: "2 vCPU · 4 GB memory", price: 80 },
  { name: "Medium", resources: "4 vCPU · 8 GB memory", price: 120 },
  { name: "Large", resources: "8 vCPU · 16 GB memory", price: 160 },
  { name: "Extra large", resources: "16 vCPU · 32 GB memory", price: 220 },
];

export function BaseUiSlider() {
  const [range, setRange] = useState<number[]>([60, 180]);
  const minimum = range[0] ?? 60;
  const maximum = range[1] ?? 180;
  const matches = runners.filter((runner) => runner.price >= minimum && runner.price <= maximum);

  return (
    <div className="base-ui-example">
      <Slider.Root
        className="base-ui-range"
        value={range}
        onValueChange={setRange}
        min={40}
        max={240}
        step={10}
        minStepsBetweenValues={1}
        thumbCollisionBehavior="none"
      >
        <div className="base-ui-demo-heading">
          <Slider.Label>Monthly budget</Slider.Label>
          <Slider.Value>{() => `$${minimum} – $${maximum}`}</Slider.Value>
        </div>
        <Slider.Control className="base-ui-range-control">
          <Slider.Track className="base-ui-range-track">
            <Slider.Indicator className="base-ui-range-indicator" />
            <Slider.Thumb
              className="base-ui-range-thumb"
              index={0}
              aria-label="Minimum monthly price"
            />
            <Slider.Thumb
              className="base-ui-range-thumb"
              index={1}
              aria-label="Maximum monthly price"
            />
          </Slider.Track>
        </Slider.Control>
        <div className="base-ui-range-limits" aria-hidden="true">
          <span>$40</span>
          <span>$240</span>
        </div>
      </Slider.Root>
      <p className="base-ui-helper" role="status">
        {matches.length} of {runners.length} example runners within budget.
      </p>
      <div className="base-ui-stays">
        {matches.map((runner) => (
          <div className="base-ui-stay" key={runner.name}>
            <div>
              <strong>{runner.name}</strong>
              <span>{runner.resources}</span>
            </div>
            <strong>
              ${runner.price}
              <small> / month</small>
            </strong>
          </div>
        ))}
        {matches.length === 0 && <p className="base-ui-empty-result">No runners in this range.</p>}
      </div>
    </div>
  );
}
