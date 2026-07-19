import type { Meta, StoryObj } from '@storybook/angular';
import { AmexMonthYearSelectorComponent } from '../../../../composite/amex/search-filters/month-year-selector';

const meta: Meta<AmexMonthYearSelectorComponent> = {
  title: 'Composite/Amex/SearchFilters/MonthYearSelector',
  component: AmexMonthYearSelectorComponent,
  argTypes: {
    buttonLabel: { control: 'text' },
    startYear: { control: 'object' },
    endYear: { control: 'object' },
  },
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