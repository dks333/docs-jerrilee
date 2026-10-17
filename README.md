# Mintlify package imports showcase

A local documentation site with 24 interactive example pages and six native package tabs. Every example uses an always-visible Mintlify code block.

## Run

Use Node 24 and the declared pnpm 12.6.0 version:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3344/tiptap/editor.

## Examples

| Package | Examples | Version |
| --- | --- | --- |
| [Paper Shaders](https://www.npmjs.com/package/@paper-design/shaders-react) | Mesh Gradient, Dot Orbit, Warp, Liquid Metal, Dithering, Grain Gradient | 0.0.81 |
| [Base UI](https://www.npmjs.com/package/@base-ui/react) | Dialog, Combobox, Menu, Range slider | 1.9.0 |
| [Tiptap](https://www.npmjs.com/package/@tiptap/react) | Document editor, Slash commands, Task lists, Tables | 3.32.0 |
| [Recharts](https://www.npmjs.com/package/recharts) | Area, Composed with Brush, Pie, Synchronized charts | 3.10.1 |
| [React Flow](https://www.npmjs.com/package/@xyflow/react) | Workflow, Custom nodes, Connection validation | 12.12.0 |
| [Motion](https://www.npmjs.com/package/motion) | Springs, Layout, Reorder | 14.3.0 |

## Design

Luma, Inter, warm paper (#FBFAF7), charcoal (#151917), and muted forest (#3E6553). Shell configuration lives in docs.json. The snippets use a neutral UI inspired by Mentha: 32px controls, 6px control corners, 8px surfaces, subtle borders, and flat rows. styles.css defines shared tokens and controls; demo-icons.tsx provides consistent SVG icons. Mentha is a restricted package and is not a dependency of this public showcase. Each component has scoped CSS; no global custom JavaScript is needed. A matching package favicon lives in favicon.svg.

React Flow and Motion add editable graphs and spatial animation to the original four packages. Official sources: https://reactflow.dev/learn/advanced-use/ssr-ssg-configuration and https://motion.dev/docs/react-accessibility.

Tiptap uses public extensions and an original document UI. It does not use the paid Notion template, Yjs, persistence, or an external service. Edits are local to the current example.

## Rendering

The command enables native npm package imports in the real Mint CLI. React Flow includes node and handle geometry for initial HTML. Tiptap starts with a matching read-only document until its editor initializes. Recharts 3.10 initializes SVG charts in the browser; fixed-height shells reserve space and reveal animations are disabled. Paper Shaders requires WebGL.

The ProseMirror override aligns model implementations for Tiptap list commands. It appears in pnpm-workspace.yaml for pnpm12 and package.json for older hosted installers. pmOnFail: ignore preserves the single-document lock format consumed by the package builder.

## Checks

```sh
pnpm type && pnpm lint && pnpm format
```

The published CLI's strict mint validate command still uses the legacy snippet validator and rejects npm imports. Verify this feature through the native mint dev build and actual browser interactions instead.

This is a local CLI demo. No hosted deployment has been performed.
