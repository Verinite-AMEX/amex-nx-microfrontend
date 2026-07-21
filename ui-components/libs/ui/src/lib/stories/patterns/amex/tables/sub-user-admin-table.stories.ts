import type { Meta, StoryObj } from '@storybook/angular';
import { AmexSubUserAdminTableComponent } from '../../../../patterns/amex/tables/sub-user-admin-table';

const meta: Meta<AmexSubUserAdminTableComponent> = {
  title: 'Patterns/Amex/Tables/SubUserAdminTable',
  component: AmexSubUserAdminTableComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexSubUserAdminTableComponent>;

export const WithUsers: Story = {
  name: 'With sub-users',
  args: {
    title: 'SUB USER ADMINISTRATION',
    showCreate: true,
    createLabel: 'Create Sub User',
    rows: [
      { name: 'Ahmed Al Mansouri', email: 'ahmed@merchant.ae', role: 'Sub User', status: 'Active' },
      { name: 'Sara Khalid',       email: 'sara@merchant.ae',  role: 'VAT User', status: 'Active' },
      { name: 'Omar Hassan',       email: 'omar@merchant.ae',  role: 'Sub User', status: 'Inactive' },
    ],
  },
};

export const Empty: Story = {
  name: 'Empty state',
  args: { rows: [], showCreate: true },
};
