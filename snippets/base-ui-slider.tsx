import { Slider } from "@base-ui/react/slider";
import { useState } from "react";

import "./base-ui-example.css";

const stays = [
  { name: "Little cabin", location: "In the woods", price: 80 },
  { name: "Garden studio", location: "Near the coast", price: 120 },
  { name: "Hilltop cottage", location: "Above the valley", price: 160 },
  { name: "Lake house", location: "By the water", price: 220 },
];

export function BaseUiSlider() {
  const [range, setRange] = useState<number[]>([60, 180]);
  const minimum = range[0] ?? 60;
  const maximum = range[1] ?? 180;
  const matches = stays.filter((stay) => stay.price >= minimum && stay.price <= maximum);

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
          <Slider.Label>Nightly budget</Slider.Label>
          <Slider.Value>{() => `$${minimum} – $${maximum}`}</Slider.Value>
        </div>
        <Slider.Control className="base-ui-range-control">
          <Slider.Track className="base-ui-range-track">
            <Slider.Indicator className="base-ui-range-indicator" />
            <Slider.Thumb
              className="base-ui-range-thumb"
              index={0}
              aria-label="Minimum nightly price"
            />
            <Slider.Thumb
              className="base-ui-range-thumb"
              index={1}
              aria-label="Maximum nightly price"
            />
          </Slider.Track>
        </Slider.Control>
        <div className="base-ui-range-limits" aria-hidden="true">
          <span>$40</span>
          <span>$240</span>
        </div>
      </Slider.Root>
      <p className="base-ui-helper" role="status">
        {matches.length} of {stays.length} stays within your budget.
      </p>
      <div className="base-ui-stays">
        {matches.map((stay) => (
          <div className="base-ui-stay" key={stay.name}>
            <div>
              <strong>{stay.name}</strong>
              <span>{stay.location}</span>
            </div>
            <strong>
              ${stay.price}
              <small> / night</small>
            </strong>
          </div>
        ))}
        {matches.length === 0 && (
          <p className="base-ui-empty-result">
            No stays in this range. Widen your budget to see more.
          </p>
        )}
      </div>
    </div>
  );
}
