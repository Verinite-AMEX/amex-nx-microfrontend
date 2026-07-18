import type { Meta, StoryObj } from '@storybook/angular';
import { RadioGroupComponent } from './radio-group';

const SIZES = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
];

const meta: Meta<RadioGroupComponent> = {
  title: 'Primitives/RadioGroup',
  component: RadioGroupComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'form-validation', 'screen-reader', 'keyboard-navigation'],
  argTypes: {
    orientation: { control: 'radio', options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
  
    options: { control: 'object' },
    name: { control: 'text' },
    legend: { control: 'text' },
    ariaLabel: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
    required: { control: 'boolean' },
    variant: { control: 'select', options: ['styled', 'native'] },
  },
};

export default meta;
type Story = StoryObj<RadioGroupComponent>;

export const Vertical: Story = {
  args: { options: SIZES, name: 'size', orientation: 'vertical' },
};

export const Horizontal: Story = {
  args: { options: SIZES, name: 'size-h', orientation: 'horizontal' },
};

export const Disabled: Story = {
  args: { options: SIZES, name: 'size-d', disabled: true },
};