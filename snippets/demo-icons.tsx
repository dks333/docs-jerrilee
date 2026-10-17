export type DemoIconName =
  | "chevron-down"
  | "chevron-right"
  | "check"
  | "close"
  | "arrow-up"
  | "arrow-down"
  | "grip"
  | "play"
  | "pause"
  | "reset"
  | "undo"
  | "redo"
  | "code"
  | "bold"
  | "italic"
  | "sliders"
  | "plus"
  | "minus";

const paths: Record<DemoIconName, string> = {
  "chevron-down": "m4 6 4 4 4-4",
  "chevron-right": "m6 4 4 4-4 4",
  check: "m3 8 3 3 7-7",
  close: "m4 4 8 8M12 4l-8 8",
  "arrow-up": "M8 13V3m-4 4 4-4 4 4",
  "arrow-down": "M8 3v10m-4-4 4 4 4-4",
  grip: "M6 3h.01M10 3h.01M6 8h.01M10 8h.01M6 13h.01M10 13h.01",
  play: "m5 3 8 5-8 5Z",
  pause: "M5 3v10M11 3v10",
  reset: "M3 6a5.5 5.5 0 1 1 0 5M3 2v4h4",
  undo: "M6 4 3 7l3 3M3 7h6a4 4 0 0 1 0 8",
  redo: "m10 4 3 3-3 3m3-3H7a4 4 0 0 0 0 8",
  code: "m5 4-4 4 4 4m6-8 4 4-4 4M9 2 7 14",
  bold: "M4 3h4a2.5 2.5 0 0 1 0 5H4m0-5v10h5a2.5 2.5 0 0 0 0-5H4",
  italic: "M7 3h6M3 13h6M10 3 6 13",
  sliders: "M2 4h3m4 0h5M2 12h7m4 0h1M5 2v4m4 4v4",
  plus: "M8 3v10M3 8h10",
  minus: "M3 8h10",
};

export function DemoIcon({ name }: { name: DemoIconName }) {
  return (
    <svg
      aria-hidden="true"
      className="demo-icon"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
