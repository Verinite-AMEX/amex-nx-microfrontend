import type { Meta, StoryObj } from '@storybook/angular';
import { AmexMonthsDropdownFilterComponent } from './months-dropdown-filter';

const meta: Meta<AmexMonthsDropdownFilterComponent> = {
  title: 'AMEX/Search & Filters/MonthsDropdownFilter',
  component: AmexMonthsDropdownFilterComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexMonthsDropdownFilterComponent>;

export const SettlementSubmissions: Story = {
  args: {
    label: 'Select number of months',
    buttonLabel: 'Submit',
    hint: 'Select the number of months for which transaction data should be displayed.',
    monthOptions: [1, 2, 3, 6, 12],
  },
};

export const Compact: Story = {
  args: {
    label: 'Months',
    buttonLabel: 'Go',
    monthOptions: [1, 3, 6, 12],
  },
};
