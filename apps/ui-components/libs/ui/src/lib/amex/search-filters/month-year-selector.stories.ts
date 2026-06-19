import type { Meta, StoryObj } from '@storybook/angular';
import { AmexMonthYearSelectorComponent } from './month-year-selector';

const meta: Meta<AmexMonthYearSelectorComponent> = {
  title: 'AMEX/Search & Filters/MonthYearSelector',
  component: AmexMonthYearSelectorComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexMonthYearSelectorComponent>;

export const Default: Story = {
  args: { buttonLabel: 'Submit' },
};

export const AuditTrail: Story = {
  args: { buttonLabel: 'View Report', startYear: 2018 },
};
