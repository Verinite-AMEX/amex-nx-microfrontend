import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input';

const meta: Meta<InputComponent> = {
  title: 'Primitives/Input',
  component: InputComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'form-validation', 'screen-reader', 'keyboard-navigation'],
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number'] },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  
    invalid: { control: 'boolean' },
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

export const WithError: Story = {
  args: { type: 'text', placeholder: 'Enter text...', error: 'This field is required' },
};

export const Disabled: Story = {
  args: { type: 'text', placeholder: 'Disabled input', disabled: true },
};