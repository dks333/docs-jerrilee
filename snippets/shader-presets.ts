export type ShaderId =
  | "mesh-gradient"
  | "dot-orbit"
  | "warp"
  | "liquid-metal"
  | "dithering"
  | "grain-gradient";

export type ShaderSettings = {
  speed: number;
  scale: number;
  distortion: number;
  detail: number;
  rotation: number;
};

export type ShaderPalette = {
  id: string;
  name: string;
  colors: string[];
  background: string;
  tint: string;
};

export type ShaderMetadata = {
  id: ShaderId;
  name: string;
  component: string;
  description: string;
  distortionLabel: string;
  detailLabel: string;
  defaults: ShaderSettings;
};

export const SHADERS: ShaderMetadata[] = [
  {
    id: "mesh-gradient",
    name: "Mesh Gradient",
    component: "MeshGradient",
    description: "Liquid color fields that flow, fold, and blend together.",
    distortionLabel: "Distortion",
    detailLabel: "Swirl",
    defaults: { speed: 0.45, scale: 1, distortion: 0.8, detail: 0.35, rotation: 0 },
  },
  {
    id: "dot-orbit",
    name: "Dot Orbit",
    component: "DotOrbit",
    description: "A playful field of colorful particles, each following its own orbit.",
    distortionLabel: "Dot size",
    detailLabel: "Size variation",
    defaults: { speed: 0.65, scale: 0.5, distortion: 0.65, detail: 0.3, rotation: 0 },
  },
  {
    id: "warp",
    name: "Warp",
    component: "Warp",
    description: "Marbled color currents shaped by layered noise and swirling motion.",
    distortionLabel: "Distortion",
    detailLabel: "Swirl",
    defaults: { speed: 0.65, scale: 1, distortion: 0.25, detail: 0.8, rotation: 0 },
  },
  {
    id: "liquid-metal",
    name: "Liquid Metal",
    component: "LiquidMetal",
    description: "A sculptural diamond with moving reflections and a polished metal finish.",
    distortionLabel: "Distortion",
    detailLabel: "Stripe density",
    defaults: { speed: 0.7, scale: 0.6, distortion: 0.07, detail: 0.2, rotation: 0 },
  },
  {
    id: "dithering",
    name: "Dithering",
    component: "Dithering",
    description: "Two colors, a pixel grid, and a moving field.",
    distortionLabel: "Pixel size",
    detailLabel: "Offset",
    defaults: { speed: 0.4, scale: 0.6, distortion: 3, detail: 0, rotation: 0 },
  },
  {
    id: "grain-gradient",
    name: "Grain Gradient",
    component: "GrainGradient",
    description: "Soft color fields with a printed grain texture.",
    distortionLabel: "Softness",
    detailLabel: "Grain",
    defaults: { speed: 0.35, scale: 1, distortion: 0.5, detail: 0.35, rotation: 0 },
  },
];

export const PALETTES: ShaderPalette[] = [
  {
    id: "ultraviolet",
    name: "Ultraviolet",
    colors: ["#1b0a3d", "#7251ff", "#f25dbb", "#dac9ff"],
    background: "#10091f",
    tint: "#d9c6ff",
  },
  {
    id: "ember",
    name: "Ember",
    colors: ["#2c1011", "#e94c21", "#ff9d42", "#ffe3ab"],
    background: "#180a08",
    tint: "#ffd2a1",
  },
  {
    id: "lagoon",
    name: "Lagoon",
    colors: ["#04293d", "#087f8c", "#4ad5b8", "#b7f0e8"],
    background: "#041b24",
    tint: "#b7f0e8",
  },
  {
    id: "graphite",
    name: "Graphite",
    colors: ["#101214", "#51565e", "#aeb6be", "#f5f7f8"],
    background: "#141619",
    tint: "#ffffff",
  },
];
