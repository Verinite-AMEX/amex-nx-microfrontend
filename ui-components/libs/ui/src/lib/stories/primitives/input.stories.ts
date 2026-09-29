import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from '../../primitives/input';

const meta: Meta<InputComponent> = {
  title: 'Primitives/Input',
  component: InputComponent,
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
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    success: { control: 'boolean' },
    required: { control: 'boolean' },
    readonly: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    ariaLabelledBy: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {
  args: { type: 'text', placeholder: 'Enter text...' },
};

export const Email: Story = {
  args: { type: 'email', placeholder: 'you@example.com' },
};

export const Password: Story = {
  args: { type: 'password', placeholder: 'Enter password...' },
};

export const Number: Story = {
  args: { type: 'number', placeholder: '0' },
};

// Note: the old `error` arg never matched a real @Input on this component
// (only `invalid` exists) — this story previously rendered a plain,
// unstyled input regardless of the `error` value passed in. Corrected to
// use the real `invalid` input, which now maps to DLS's actual
// .formControlWarning class.
export const Invalid: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
    invalid: true,
    ariaDescribedBy: 'input-error-msg',
  },
};

// New: DLS's real .formControlSuccess state (green check icon) — didn't
// exist as an option before this upgrade.
export const Success: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
    success: true,
  },
};

export const Disabled: Story = {
  args: { type: 'text', placeholder: 'Disabled input', disabled: true },
};

export const Readonly: Story = {
  args: {
    type: 'text',
    placeholder: 'Read-only field',
    readonly: true,
  },
};