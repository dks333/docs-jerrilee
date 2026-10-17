# Package imports showcase

This Mintlify documentation site demonstrates public npm packages through React snippets.

- Keep theme, colors, fonts, and native navigation in docs.json. The current theme is Luma.
- Use Node 24 and pnpm 12.6.0, as declared in package.json.
- Install existing dependencies with pnpm install --frozen-lockfile.
- Start the local native package preview with pnpm dev.
- Run pnpm type, pnpm lint, and pnpm format before publishing changes.
- Keep a separate page for every example, with a native table of contents, an npm link, and an always-visible native code block.
- Use explicit .tsx and .ts extensions for local snippet imports.
- Scope example CSS and consume shared --demo-* tokens from styles.css. Prefer docs.json over global overrides for native UI.
- Follow Mentha’s visual language in the public snippet styles: neutral surfaces, compact controls, flat rows, and consistent SVG icons. Do not add the restricted Mentha package or copy its implementation.
- Keep examples self-contained, accessible, and usable on mobile. Respect reduced motion and avoid entrance animations on refresh.
- Tiptap uses public extensions only, without Yjs or paid templates. Edits remain local to each example.
- Keep node_modules, generated .mintlify files, logs, and screenshots out of Git.
- Published mint validate still uses a legacy snippet validator; verify native npm imports through the actual mint dev build and browser.
