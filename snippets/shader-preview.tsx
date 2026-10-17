import {
  Dithering,
  DotOrbit,
  GrainGradient,
  LiquidMetal,
  MeshGradient,
  Warp,
} from "@paper-design/shaders-react";
import type { ShaderId, ShaderPalette, ShaderSettings } from "./shader-presets.ts";

type ShaderPreviewProps = {
  effect: ShaderId;
  settings: ShaderSettings;
  palette: ShaderPalette;
  paused: boolean;
};

export function ShaderPreview({ effect, settings, palette, paused }: ShaderPreviewProps) {
  const common = {
    width: "100%",
    height: "100%",
    maxPixelCount: 2000000,
    speed: paused ? 0 : settings.speed,
    scale: settings.scale,
    rotation: settings.rotation,
  };

  switch (effect) {
    case "mesh-gradient":
      return (
        <MeshGradient
          {...common}
          colors={palette.colors}
          distortion={settings.distortion}
          swirl={settings.detail}
          grainMixer={0}
          grainOverlay={0}
        />
      );
    case "dot-orbit":
      return (
        <DotOrbit
          {...common}
          colors={palette.colors}
          colorBack={palette.background}
          stepsPerColor={4}
          size={0.25 + settings.distortion * 0.75}
          sizeRange={settings.detail}
          spreading={1}
        />
      );
    case "warp":
      return (
        <Warp
          {...common}
          colors={palette.colors}
          proportion={0.45}
          softness={1}
          distortion={settings.distortion}
          swirl={settings.detail}
          swirlIterations={10}
          shape="checks"
          shapeScale={0.1}
        />
      );
    case "dithering":
      return (
        <Dithering
          {...common}
          colorBack={palette.background}
          colorFront={palette.tint}
          shape="sphere"
          type="4x4"
          size={settings.distortion}
          offsetX={settings.detail}
        />
      );
    case "grain-gradient":
      return (
        <GrainGradient
          {...common}
          colors={palette.colors}
          colorBack={palette.background}
          shape="corners"
          softness={settings.distortion}
          intensity={0.6}
          noise={settings.detail}
        />
      );
    case "liquid-metal":
      return (
        <LiquidMetal
          {...common}
          shape="diamond"
          colorBack={palette.background}
          colorTint={palette.tint}
          repetition={1 + settings.detail * 5}
          softness={0.1}
          shiftRed={0.3}
          shiftBlue={0.3}
          distortion={settings.distortion}
          contour={0.4}
          angle={70}
        />
      );
  }
}
