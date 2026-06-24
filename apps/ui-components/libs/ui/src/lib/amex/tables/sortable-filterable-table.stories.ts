import type { Meta, StoryObj } from '@storybook/angular';
import { AmexSortableFilterableTableComponent } from './sortable-filterable-table';

const meta: Meta<AmexSortableFilterableTableComponent> = {
  title: 'AMEX/Tables/SortableFilterableTable',
  component: AmexSortableFilterableTableComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexSortableFilterableTableComponent>;

const cols = [
  { key: 'userId', label: 'User ID', sortable: true, filterable: true },
  { key: 'userName', label: 'User Name', sortable: true, filterable: true },
  { key: 'email', label: 'Email Address', sortable: true, filterable: true },
  { key: 'creationDate', label: 'Creation Date', sortable: true, filterable: true },
  { key: 'status', label: 'Status', sortable: true, filterable: false },
];
const rows = [
  { userId: 'mrmadmin', userName: 'Essa', email: 'essa.memon@americanexpress.com.bh', creationDate: '09/09/2021', status: 'Inactive' },
  { userId: 'wasimtest123', userName: 'wasimtest123', email: 'wasim.sayyed@americanexpress.com.bh', creationDate: '05/05/2024', status: 'Active' },
  { userId: 'mrmadmintest4', userName: 'mrmadminketaki', email: 'ketaki_pore@yahoo.com', creationDate: '09/09/2021', status: 'Active' },
];
const actions = [
  { id: 'resetPassword', label: 'Reset Password', type: 'reset' },
  { id: 'edit', label: 'Edit', type: 'edit' },
  { id: 'delete', label: 'Delete', type: 'delete' },
];

export const WithData: Story = {
  args: { title: 'MRM USER ADMINISTRATION', ctaLabel: 'Create MRM User', columns: cols, rows, actions },
};
export const Empty: Story = {
  args: { columns: cols, rows: [], actions },
};
