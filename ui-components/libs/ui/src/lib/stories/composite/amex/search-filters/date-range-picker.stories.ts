import type { Meta, StoryObj } from '@storybook/angular';
import { AmexDateRangePickerComponent } from '../../../../composite/amex/search-filters/date-range-picker';

const meta: Meta<AmexDateRangePickerComponent> = {
  title: 'Composite/Amex/SearchFilters/DateRangePicker',
  component: AmexDateRangePickerComponent,
  argTypes: {
    label: { control: 'text' },
    fromLabel: { control: 'text' },
    toLabel: { control: 'text' },
    min: { control: 'text' },
    max: { control: 'text' },
    invalid: { control: 'boolean' },
    errorMessage: { control: 'text' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexDateRangePickerComponent>;

export const Default: Story = {
  args: { label: 'Travel dates', fromLabel: 'From Date', toLabel: 'To Date' },
};

export const BCRBReports: Story = {
  args: { label: 'Report period', fromLabel: 'Start Date', toLabel: 'End Date' },
};

export const BTAAuditTrail: Story = {
  args: { label: 'Audit trail range', fromLabel: 'Date From', toLabel: 'Date To' },
};

export const WithBounds: Story = {
  args: { label: 'Statement period', min: '2024-01-01', max: '2024-12-31' },
};

export const WithError: Story = {
  args: { label: 'Travel dates', invalid: true, errorMessage: 'End date must be after start date' },
};