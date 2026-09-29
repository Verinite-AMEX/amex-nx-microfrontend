import type { Meta, StoryObj } from '@storybook/angular';
import { TextareaComponent } from '../../primitives/textarea';

const meta: Meta<TextareaComponent> = {
  title: 'Primitives/Textarea',
  component: TextareaComponent,
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
    placeholder: { control: 'text' },
    rows: { control: 'number' },
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
type Story = StoryObj<TextareaComponent>;

export const Default: Story = {
  args: { placeholder: 'Enter a longer message...', rows: 4 },
};

export const Invalid: Story = {
  args: {
    placeholder: 'Enter a longer message...',
    invalid: true,
    ariaDescribedBy: 'textarea-error-msg',
  },
};

export const Success: Story = {
  args: { placeholder: 'Enter a longer message...', success: true },
};

export const Disabled: Story = {
  args: { placeholder: 'Disabled textarea', disabled: true },
};

export const Readonly: Story = {
  args: { placeholder: 'Read-only textarea', readonly: true },
};