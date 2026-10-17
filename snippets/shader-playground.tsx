import { useEffect, useId, useState } from "react";

import { DemoIcon } from "./demo-icons.tsx";
import { RangeControl } from "./shader-controls.tsx";
import { PALETTES, SHADERS } from "./shader-presets.ts";
import type { ShaderId, ShaderPalette, ShaderSettings } from "./shader-presets.ts";
import { ShaderPreview } from "./shader-preview.tsx";
import "./shader-playground.css";

const INITIAL_SETTINGS: ShaderSettings = {
  speed: 0.45,
  scale: 1,
  distortion: 0.8,
  detail: 0.35,
  rotation: 0,
};

const INITIAL_PALETTE: ShaderPalette = {
  id: "ultraviolet",
  name: "Ultraviolet",
  colors: ["#1b0a3d", "#7251ff", "#f25dbb", "#dac9ff"],
  background: "#10091f",
  tint: "#d9c6ff",
};

type ShaderPlaygroundProps = { effect?: ShaderId };

export function ShaderPlayground({ effect = "mesh-gradient" }: ShaderPlaygroundProps) {
  return <ShaderExample key={effect} effect={effect} />;
}

function ShaderExample({ effect }: { effect: ShaderId }) {
  const metadata = SHADERS.find((shader) => shader.id === effect);
  const [settings, setSettings] = useState<ShaderSettings>(() => ({
    ...(metadata?.defaults ?? INITIAL_SETTINGS),
  }));
  const [palette, setPalette] = useState<ShaderPalette>(INITIAL_PALETTE);
  const [paused, setPaused] = useState(false);
  const paletteId = useId();
  const effectName = metadata?.name ?? "Mesh Gradient";
  const animationStopped = paused || settings.speed === 0;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPaused(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  function updateSetting(key: keyof ShaderSettings, value: number) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function reset() {
    setSettings({ ...(metadata?.defaults ?? INITIAL_SETTINGS) });
    setPalette(INITIAL_PALETTE);
  }

  function togglePlayback() {
    if (animationStopped) {
      setPaused(false);
      if (settings.speed === 0) updateSetting("speed", metadata?.defaults.speed ?? 0.45);
      return;
    }
    setPaused(true);
  }

  return (
    <section className="shader-example not-prose" aria-label={`${effectName} example`}>
      <div className="shader-example-layout">
        <div
          className="shader-example-preview"
          role="img"
          aria-label={`${effectName} shader in ${palette.name}`}
          style={{ backgroundColor: palette.background }}
        >
          <ShaderPreview effect={effect} settings={settings} palette={palette} paused={paused} />
        </div>

        <fieldset className="shader-example-settings">
          <legend>Parameters</legend>
          <div className="shader-palette-field">
            <label htmlFor={paletteId}>Palette</label>
            <span className="demo-select-wrap">
              <select
                className="demo-select"
                id={paletteId}
                value={palette.id}
                onChange={(event) => {
                  const next = PALETTES.find((item) => item.id === event.currentTarget.value);
                  if (next) setPalette(next);
                }}
              >
                {PALETTES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <DemoIcon name="chevron-down" />
            </span>
          </div>

          <div className="shader-example-ranges">
            <RangeControl
              label="Speed"
              min={0}
              max={2}
              step={0.05}
              value={settings.speed}
              onChange={(value) => updateSetting("speed", value)}
            />
            <RangeControl
              label="Scale"
              min={0.15}
              max={2.5}
              step={0.05}
              value={settings.scale}
              onChange={(value) => updateSetting("scale", value)}
            />
            <RangeControl
              label={metadata?.distortionLabel ?? "Distortion"}
              min={effect === "dithering" ? 0.5 : 0}
              max={effect === "dithering" ? 20 : 1}
              step={effect === "dithering" ? 0.5 : 0.01}
              value={settings.distortion}
              onChange={(value) => updateSetting("distortion", value)}
            />
            <RangeControl
              label={metadata?.detailLabel ?? "Swirl"}
              min={effect === "dithering" ? -0.5 : 0}
              max={effect === "dithering" ? 0.5 : 1}
              step={0.01}
              value={settings.detail}
              onChange={(value) => updateSetting("detail", value)}
            />
            <RangeControl
              label="Rotation"
              min={0}
              max={360}
              step={1}
              suffix="°"
              value={settings.rotation}
              onChange={(value) => updateSetting("rotation", value)}
            />
          </div>

          <div className="shader-example-actions">
            <button
              type="button"
              className="demo-button demo-button-small"
              aria-label={animationStopped ? "Play animation" : "Pause animation"}
              onClick={togglePlayback}
            >
              <DemoIcon name={animationStopped ? "play" : "pause"} />
              {animationStopped ? "Play" : "Pause"}
            </button>
            <button
              type="button"
              className="demo-button demo-button-small demo-button-ghost"
              onClick={reset}
            >
              <DemoIcon name="reset" />
              Reset
            </button>
          </div>
        </fieldset>
      </div>
    </section>
  );
}
