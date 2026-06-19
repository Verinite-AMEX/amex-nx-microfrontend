import type { Meta, StoryObj } from '@storybook/angular';
import { AmexUserManagementTableComponent } from './user-management-table';

const meta: Meta<AmexUserManagementTableComponent> = {
  title: 'AMEX/Tables/UserManagementTable',
  component: AmexUserManagementTableComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexUserManagementTableComponent>;

const rows = [
  { userId: 'mrmadmin', userName: 'Essa', emailAddress: 'essa.memon@americanexpress.com.bh', creationDate: '09/09/2021', status: 'Inactive' },
  { userId: 'wasimtest123', userName: 'wasimtest123', emailAddress: 'wasim.sayyed@americanexpress.com.bh', creationDate: '05/05/2024', status: 'Active' },
  { userId: 'mrmadmintest4', userName: 'mrmadminketaki', emailAddress: 'ketaki_pore@yahoo.com', creationDate: '09/09/2021', status: 'Active' },
  { userId: 'ketakimrm12', userName: 'Ketaki', emailAddress: 'ketaki.pore222@gmail.com', creationDate: '08/09/2021', status: 'Active' },
];

export const MRMAdmin: Story = {
  args: { rows, title: 'MRM USER ADMINISTRATION', createLabel: 'Create MRM User', showDelete: true },
};
export const OMSUsers: Story = {
  args: { rows, title: 'OMS USER ADMINISTRATION', createLabel: 'Create OMS User', showDelete: false },
};
