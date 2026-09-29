import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../../primitives/button';

const meta: Meta<ButtonComponent> = {
  title: 'Primitives/Button',
  component: ButtonComponent,
  tags: [
    'autodocs',
    'a11y',
    'accessibility',
    'wcag',
    'keyboard-navigation',
    'screen-reader',
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'contextual',
        'white',
        'white-secondary',
        'white-tertiary',
        'ghost', // legacy alias -> renders as tertiary
        'danger', // legacy alias -> primary + DLS red utility classes
      ],
    },
    size: {
      control: 'select',
      options: [
        'default',
        'sm',
        'utility',
        'md', // legacy alias -> default
        'lg', // legacy alias -> default
      ],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    allowWrap: { control: 'boolean' },
    label: { control: 'text' },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    fullWidth: { control: 'boolean' },
    role: { control: 'text' },
    ariaLabel: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
    ariaExpanded: { control: 'boolean' },
    ariaPressed: { control: 'boolean' },
    ariaSelected: { control: 'boolean' },
    ariaControls: { control: 'text' },
    tabIndexOverride: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// ---------- DLS-native variants ----------

export const Primary: Story = {
  args: { label: 'Primary Button', variant: 'primary', size: 'default' },
};
export const Secondary: Story = {
  args: { label: 'Secondary Button', variant: 'secondary', size: 'default' },
};
export const Tertiary: Story = {
  args: { label: 'Tertiary Button', variant: 'tertiary', size: 'default' },
};
export const Contextual: Story = {
  name: 'Contextual (for colored backgrounds) — DEPRECATED by DLS',
  args: { label: 'Contextual Button', variant: 'contextual', size: 'default' },
  parameters: {
    docs: {
      description: {
        story:
          'DLS marks this variant "Deprecated" in its own docs. .btnContextual only sets background, not text color — the consumer must add their own text-color class (e.g. dlsBrightBlue) alongside it, or the label renders invisible (white-on-white). This story adds a scoped text-color rule (in .storybook/preview-head.html) just to demonstrate that; the component itself does not inject a color.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `<div style="background:#006fcf; padding:24px;" class="contextual-demo">
      <ui-button [label]="label" [variant]="variant" [size]="size"></ui-button>
    </div>`,
  }),
};
export const White: Story = {
  name: 'White (for dark/colored backgrounds)',
  args: { label: 'White Button', variant: 'white', size: 'default' },
  render: (args) => ({
    props: args,
    template: `<div style="background:#00175a; padding:24px;">
      <ui-button [label]="label" [variant]="variant" [size]="size"></ui-button>
    </div>`,
  }),
};
export const WhiteSecondary: Story = {
  args: {
    label: 'White Secondary',
    variant: 'white-secondary',
    size: 'default',
  },
  render: (args) => ({
    props: args,
    template: `<div style="background:#00175a; padding:24px;">
      <ui-button [label]="label" [variant]="variant" [size]="size"></ui-button>
    </div>`,
  }),
};
export const WhiteTertiary: Story = {
  args: { label: 'White Tertiary', variant: 'white-tertiary', size: 'default' },
  render: (args) => ({
    props: args,
    template: `<div style="background:#00175a; padding:24px;">
      <ui-button [label]="label" [variant]="variant" [size]="size"></ui-button>
    </div>`,
  }),
};

// ---------- Sizes ----------

export const Small: Story = {
  args: { label: 'Small', variant: 'primary', size: 'sm' },
};
export const Utility: Story = {
  name: 'Utility (icon-only / compact)',
  args: { label: 'Utility', variant: 'primary', size: 'utility' },
};

// ---------- States ----------

export const Disabled: Story = {
  args: { label: 'Disabled', variant: 'primary', disabled: true },
};
export const Loading: Story = {
  name: 'Loading (DLS spinner)',
  args: { label: 'Submitting…', variant: 'primary', loading: true },
};
export const LongLabelWrapped: Story = {
  name: 'Long label (allowWrap)',
  args: {
    label:
      'This is a much longer button label that should wrap instead of truncating',
    variant: 'primary',
    allowWrap: true,
  },
  render: (args) => ({
    props: args,
    template: `<div style="max-width:200px">
      <ui-button [label]="label" [variant]="variant" [allowWrap]="allowWrap"></ui-button>
    </div>`,
  }),
};

// ---------- Layout & type ----------

export const FullWidth: Story = {
  args: { label: 'Full Width Button', variant: 'primary', fullWidth: true },
  render: (args) => ({
    props: args,
    template: `<div style="max-width:320px"><ui-button [label]="label" [variant]="variant" [fullWidth]="fullWidth"></ui-button></div>`,
  }),
};
export const SubmitType: Story = {
  args: { label: 'Submit', variant: 'primary', type: 'submit' },
};
export const AsToggle: Story = {
  name: 'Toggle (aria-pressed)',
  args: {
    label: 'Toggle Me',
    variant: 'secondary',
    role: 'button',
    ariaPressed: true,
  },
};

// ---------- Legacy aliases (still supported, kept for regression coverage) ----------

export const LegacyGhost: Story = {
  name: 'Legacy: ghost (renders as tertiary)',
  args: { label: 'Ghost Button', variant: 'ghost', size: 'md' },
};
export const LegacyDanger: Story = {
  name: 'Legacy: danger (primary + DLS red utility classes)',
  args: { label: 'Danger Button', variant: 'danger', size: 'md' },
};
export const LegacyLargeSize: Story = {
  name: 'Legacy: size="lg" (maps to default)',
  args: { label: 'Large (legacy)', variant: 'primary', size: 'lg' },
};
