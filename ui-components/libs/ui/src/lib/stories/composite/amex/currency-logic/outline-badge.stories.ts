import type { Meta, StoryObj } from '@storybook/angular';
import { OutlineBadgeComponent } from '../../../../composite/amex/currency-logic/outline-badge';

const meta: Meta<OutlineBadgeComponent> = {
  title: 'Composite/Amex/CurrencyLogic/OutlineBadge',
  component: OutlineBadgeComponent,
  tags: ['autodocs', 'a11y'],
  argTypes: {
    label: { control: 'text' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<OutlineBadgeComponent>;

export const Default: Story = { args: { label: 'Filter' } };
export const Selected: Story = { args: { label: 'Filter', selected: true } };
export const Disabled: Story = { args: { label: 'Filter', disabled: true } };