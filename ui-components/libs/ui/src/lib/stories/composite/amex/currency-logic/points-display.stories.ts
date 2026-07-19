import type { Meta, StoryObj } from '@storybook/angular';
import { AmexPointsDisplayComponent } from '../../../../composite/amex/currency-logic/points-display';

const meta: Meta<AmexPointsDisplayComponent> = {
  title: 'Composite/Amex/CurrencyLogic/PointsDisplay',
  component: AmexPointsDisplayComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader', 'color-contrast'],
  argTypes: {
    points:  { control: 'number' },
    label:   { control: 'text' },
    compact: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<AmexPointsDisplayComponent>;

export const Standard: Story       = { args: { points: 125000, compact: false } };
export const Compact: Story        = { args: { points: 125000, compact: true } };
export const CustomLabel: Story    = { args: { points: 4500, label: 'Bonus Points', compact: false } };
export const Zero: Story           = { args: { points: 0, compact: false } };