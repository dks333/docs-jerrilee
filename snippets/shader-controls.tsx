import { useId } from "react";

type RangeControlProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
};

export function RangeControl({
  label,
  value,
  min,
  max,
  step,
  suffix = "",
  onChange,
}: RangeControlProps) {
  const id = useId();
  const digits = step >= 1 ? 0 : 2;
  const displayValue = `${value.toFixed(digits)}${suffix}`;

  return (
    <div className="shader-control">
      <div className="shader-control-label">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{displayValue}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={displayValue}
        onChange={(event) => onChange(event.currentTarget.valueAsNumber)}
      />
    </div>
  );
}
