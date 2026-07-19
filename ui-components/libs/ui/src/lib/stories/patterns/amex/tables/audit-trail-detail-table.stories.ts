import type { Meta, StoryObj } from '@storybook/angular';
import { AmexAuditTrailDetailTableComponent } from '../../../../patterns/amex/tables/audit-trail-detail-table';

const meta: Meta<AmexAuditTrailDetailTableComponent> = {
  title: 'Patterns/Amex/Tables/AuditTrailDetailTable',
  component: AmexAuditTrailDetailTableComponent,
  argTypes: {
    showFilters: { control: 'boolean' },
    actionTypeOptions: { control: 'object' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexAuditTrailDetailTableComponent>;

export const WithData: Story = {
  name: 'With audit rows',
  args: {
    loaded: true,
    rows: [
      { date: '01/09/2024', time: '09:14', user: 'admin_bta', action: 'User Created',   entity: 'User', oldValue: '',             newValue: 'wasimtest123' },
      { date: '05/09/2024', time: '11:32', user: 'admin_bta', action: 'Password Reset', entity: 'User', oldValue: 'Old Password', newValue: 'Temp Password' },
      { date: '10/09/2024', time: '14:05', user: 'admin_bta', action: 'Role Updated',   entity: 'User', oldValue: 'Viewer',       newValue: 'Editor' },
    ],
  },
};

export const NoRecords: Story = {
  name: 'No records found',
  args: { loaded: true, rows: [] },
};