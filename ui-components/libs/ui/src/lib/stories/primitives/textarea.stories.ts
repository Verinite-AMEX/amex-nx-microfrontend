import type { Meta, StoryObj } from '@storybook/angular';
import { TextareaComponent } from '../../primitives/textarea';

const meta: Meta<TextareaComponent> = {
  title: 'Primitives/Textarea',
  component: TextareaComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'form-validation', 'screen-reader', 'keyboard-navigation'],
  argTypes: {
    placeholder: { control: 'text' },
    rows: { control: 'number' },
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
type Story = StoryObj<TextareaComponent>;

export const Default: Story = {
  args: { placeholder: 'Enter your message...', rows: 4 },
};

export const WithError: Story = {
  args: { placeholder: 'Enter your message...', error: 'Message is required' },
};

export const Disabled: Story = {
  args: { placeholder: 'Disabled textarea', disabled: true },
};

export const Tall: Story = {
  args: { placeholder: 'Lots of room to write...', rows: 8 },
};