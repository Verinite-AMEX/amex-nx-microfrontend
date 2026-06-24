import type { Meta, StoryObj } from '@storybook/angular';
import { AmexDateRangePickerComponent } from './date-range-picker';

const meta: Meta<AmexDateRangePickerComponent> = {
  title: 'AMEX/Search & Filters/DateRangePicker',
  component: AmexDateRangePickerComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexDateRangePickerComponent>;

export const Default: Story = {
  args: { fromLabel: 'From Date', toLabel: 'To Date', buttonLabel: 'Apply' },
};

export const BCRBReports: Story = {
  args: { fromLabel: 'Start Date', toLabel: 'End Date', buttonLabel: 'Search' },
};

export const BTAAuditTrail: Story = {
  args: { fromLabel: 'Date From', toLabel: 'Date To', buttonLabel: 'Submit' },
};
