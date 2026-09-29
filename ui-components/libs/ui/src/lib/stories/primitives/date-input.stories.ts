import type { Meta, StoryObj } from '@storybook/angular';
import { DateInputComponent } from '../../primitives/date-input';

const meta: Meta<DateInputComponent> = {
  title: 'Primitives/DateInput',
  component: DateInputComponent,
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
    disabled: { control: 'boolean' },
    min: { control: 'text' },
    max: { control: 'text' },
    invalid: { control: 'boolean' },
    required: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<DateInputComponent>;

export const Default: Story = { args: { label: 'Payment date' } };
export const WithRange: Story = {
  args: { label: 'Payment date', min: '2024-01-01', max: '2024-12-31' },
};
export const WithError: Story = { args: { label: 'Payment date', invalid: true } };
export const Disabled: Story = { args: { label: 'Payment date', disabled: true } };
export const NoVisibleLabel: Story = {
  name: 'No visible label (uses ariaLabel)',
  args: { ariaLabel: 'Statement date' },
};