import type { Meta, StoryObj } from '@storybook/angular';
import { AmexDropdownFilterComponent } from './dropdown-filter';

const meta: Meta<AmexDropdownFilterComponent> = {
  title: 'Composite/Amex/SearchFilters/DropdownFilter',
  component: AmexDropdownFilterComponent,
  argTypes: {
    placeholder: { control: 'text' },
    buttonLabel: { control: 'text' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexDropdownFilterComponent>;

export const ReportType: Story = {
  args: {
    label: 'Report Type',
    options: [
      { value: 'consumer-monthly', label: 'Consumer Monthly Audit' },
      { value: 'corporate-monthly', label: 'Corporate Monthly Audit' },
      { value: 'consumer-data', label: 'Consumer Data Audit' },
      { value: 'corporate-data', label: 'Corporate Data Audit' },
      { value: 'consumer-full', label: 'Consumer Full Report' },
    ],
  },
};

export const Status: Story = {
  args: {
    label: 'Status',
    options: [
      { value: 'pending', label: 'Pending' },
      { value: 'processing', label: 'Processing' },
      { value: 'completed', label: 'Completed' },
      { value: 'failed', label: 'Failed' },
    ],
  },
};

export const UserRole: Story = {
  args: {
    label: 'Role',
    options: [
      { value: 'admin', label: 'Admin' },
      { value: 'merchant', label: 'Merchant User' },
      { value: 'mrm', label: 'MRM User' },
      { value: 'subuser', label: 'Sub User' },
      { value: 'vat', label: 'VAT User' },
    ],
  },
};