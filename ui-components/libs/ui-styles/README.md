# @ui-components/ui-styles

Design tokens and global styles for the `@ui-components/ui` component library — SCSS variables, base resets, and light/dark theme definitions consumed by every component in `libs/ui`.

## Structure

```
src/lib/styles/
tokens/
_colors.scss       — color palette
_spacing.scss       — spacing scale
_typography.scss    — font family, sizes, weights
base/
_reset.scss          — CSS reset
_globals.scss        — global element defaults
themes/
_light.scss          — light theme (default)
_dark.scss           — dark theme, applied via [data-theme="dark"]
index.scss              — forwards all of the above
```

## Usage

```scss
@use '@ui-components/ui-styles/src/lib/styles/index' as *;

.my-component {
  color: $color-primary;
  padding: $spacing-md;
}
```

See `Docs/Introduction` in Storybook for the full token reference and theming guide.

## Running unit tests

Run `nx test ui-styles` to execute the unit tests.