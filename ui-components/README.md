# ui-components

Angular component library and design system for the AEME AMEX portals — `@ui-components/ui` (components) and `@ui-components/ui-styles` (design tokens), built as an Nx monorepo.

## Structure

- `libs/ui` — the component library, organized as:
  - `primitives/` — smallest building blocks (Button, Input, Badge, etc.)
  - `composite/` — components composed from primitives (Card, Modal, Tabs, etc.)
  - `composite/amex/` — Amex-specific composite components
  - `patterns/amex/` — full Amex portal patterns (forms, tables, auth screens, navigation, layout)
- `libs/ui-styles` — SCSS design tokens and themes
- `libs/ui/src/lib/docs/` — Storybook documentation pages (`.mdx`)

## Getting started

```bash
npm install
npx nx run ui:storybook
```

Storybook runs at `http://localhost:4400`.

## Building the library

```bash
npx nx run ui:build:production
```

## Publishing

See `libs/ui/src/lib/docs/HOW-TO-PUBLISH.mdx` (also viewable in Storybook under **Docs**), or run:

```bash
npm run ui:publish
```

## Documentation

Full component docs, usage guide, and design token reference are in Storybook under the **Docs** section once `nx run ui:storybook` is running.