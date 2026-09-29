import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleComponent } from '../../primitives/toggle';

const meta: Meta<ToggleComponent> = {
  title: 'Primitives/Toggle',
  component: ToggleComponent,
  tags: [
    'autodocs',
    'a11y',
    'accessibility',
    'wcag',
    'form-validation',
    'screen-reader',
    'keyboard-navigation',
  ],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
    ariaInvalid: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<ToggleComponent>;

export const Off: Story = { args: { label: 'Enable notifications' } };

// Fixed: `checked` is now a real @Input (see toggle.ts) — this used to
// bind to a property Angular had no way to actually set from outside,
// so this story never rendered a checked toggle at all.
export const On: Story = {
  args: { label: 'Dark mode', checked: true },
};

export const Disabled: Story = {
  args: { label: 'Disabled toggle', disabled: true },
};

export const DisabledOn: Story = {
  args: { label: 'Disabled, on', disabled: true, checked: true },
};