import type { Meta, StoryObj } from '@storybook/angular';
import { AmexUserRowComponent } from './user-row';

const meta: Meta<AmexUserRowComponent> = {
  title: 'AMEX/Molecules/UserRow',
  component: AmexUserRowComponent,
  tags: ['autodocs'],
  argTypes: {
    edit:         { action: 'edit' },
    resetPassword: { action: 'resetPassword' },
    toggleStatus: { action: 'toggleStatus' },
  },
  decorators: [
    (story) => ({ ...story(), template: `<div style="border:1px solid #f0f0f0;border-radius:8px;overflow:hidden">${story().template}</div>` }),
  ],
};
export default meta;
type Story = StoryObj<AmexUserRowComponent>;

export const MasterAdmin: Story = {
  args: { user: { id: 'U1', name: 'John Smith', email: 'john.smith@amex.com', role: 'master-admin', status: 'active', lastLogin: '25 Mar 2024' } },
};
export const SubAdmin: Story = {
  args: { user: { id: 'U2', name: 'Jane Doe', email: 'jane.doe@amex.com', role: 'sub-admin', status: 'active', lastLogin: '24 Mar 2024' } },
};
export const LockedUser: Story = {
  args: { user: { id: 'U5', name: 'Ali Hassan', email: 'ali.hassan@amex.com', role: 'travel-agent', status: 'locked', lastLogin: '01 Jan 2024' } },
};
export const InactiveUser: Story = {
  args: { user: { id: 'U3', name: 'Mark Wilson', email: 'mark.wilson@amex.com', role: 'mrm', status: 'inactive', lastLogin: '10 Feb 2024' } },
};