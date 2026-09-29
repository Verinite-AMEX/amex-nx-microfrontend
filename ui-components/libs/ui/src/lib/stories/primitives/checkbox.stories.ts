import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '../../primitives/checkbox';

const meta: Meta<CheckboxComponent> = {
  title: 'Primitives/Checkbox',
  component: CheckboxComponent,
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
    indeterminate: {
      control: 'boolean',
      description:
        'DLS\u2019s real tri-state/mixed checkbox support via [aria-checked="mixed"] \u2014 not available before this migration.',
    },
    ariaLabel: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
    ariaInvalid: {
      control: 'boolean',
      description:
        'Now has a real visual effect (red border via DLS\u2019s [aria-invalid=true] state) \u2014 previously this input existed but did nothing visually.',
    },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Unchecked: Story = {
  args: { label: 'Accept terms and conditions' },
};

export const Checked: Story = {
  // `checked` is now a real @Input, so this binding actually works —
  // previously it targeted an undecorated internal class field.
  args: { label: 'I agree to the privacy policy', checked: true },
};

export const Indeterminate: Story = {
  args: { label: 'Select all items', indeterminate: true },
};

export const Invalid: Story = {
  args: { label: 'I accept the required terms', ariaInvalid: true },
};

export const Disabled: Story = {
  args: { label: 'Disabled option', disabled: true },
};

export const DisabledChecked: Story = {
  args: { label: 'Disabled and checked', disabled: true, checked: true },
};