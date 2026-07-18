import type { Meta, StoryObj } from '@storybook/angular';
import { AmexDateRangePickerComponent } from './date-range-picker';

const meta: Meta<AmexDateRangePickerComponent> = {
  title: 'Composite/Amex/SearchFilters/DateRangePicker',
  component: AmexDateRangePickerComponent,
  argTypes: {
    fromLabel: { control: 'text' },
    toLabel: { control: 'text' },
    buttonLabel: { control: 'text' },
    errorMessage: { control: 'text' },
  },
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