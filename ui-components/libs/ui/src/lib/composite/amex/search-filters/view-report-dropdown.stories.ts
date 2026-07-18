import type { Meta, StoryObj } from '@storybook/angular';
import { AmexViewReportDropdownComponent } from './view-report-dropdown';

const meta: Meta<AmexViewReportDropdownComponent> = {
  title: 'Composite/Amex/SearchFilters/ViewReportDropdown',
  component: AmexViewReportDropdownComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexViewReportDropdownComponent>;

// BTA Audit Trail Summary — 3 distinct views each with different fields
export const BTAAuditTrailSummary: Story = {
  args: {
    options: [
      {
        value: 'by-date',
        label: 'By Date Range',
        fields: [
          { key: 'from', label: 'From Date', type: 'date' },
          { key: 'to', label: 'To Date', type: 'date' },
        ],
      },
      {
        value: 'by-user',
        label: 'By User',
        fields: [
          { key: 'userId', label: 'User ID', type: 'text' },
          { key: 'from', label: 'From Date', type: 'date' },
          { key: 'to', label: 'To Date', type: 'date' },
        ],
      },
      {
        value: 'by-action',
        label: 'By Action Type',
        fields: [
          {
            key: 'action', label: 'Action', type: 'select',
            options: [
              { value: 'login', label: 'Login' },
              { value: 'view', label: 'View Statement' },
              { value: 'download', label: 'Download Report' },
              { value: 'edit', label: 'Edit User' },
            ],
          },
          { key: 'from', label: 'From Date', type: 'date' },
          { key: 'to', label: 'To Date', type: 'date' },
        ],
      },
    ],
  },
};
