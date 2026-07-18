import type { Meta, StoryObj } from '@storybook/angular';
import { AmexEditUserFormComponent } from '../../../../patterns/amex/forms/edit-user-form';

const meta: Meta<AmexEditUserFormComponent> = {
  title: 'Patterns/Amex/Forms/EditUserForm',
  component: AmexEditUserFormComponent,
  argTypes: {
    cancelLabel: { control: 'text' },
    updateLabel: { control: 'text' },
    roleOptions: { control: 'text' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexEditUserFormComponent>;

export const OMSEditMRMUser: Story = {
  name: 'OMS — Edit MRM User',
  args: {
    title: 'EDIT MRM USER',
    data: {
      userId: 'wasimtest123', userName: 'wasimtest123',
      emailAddress: 'wasim.sayyed@americanexpress.com.bh',
      role: '', status: 'Active',
    },
    showRole: false,
  },
};

export const OMSEditWithMerchant: Story = {
  name: 'OMS — Edit with Merchant Account',
  args: {
    title: 'EDIT OMS USER',
    showMerchantAccount: true,
    data: {
      userId: 'vpaytestrac', userName: 'vpaytestrac',
      emailAddress: 'A.K@americanexpress.com.bh',
      role: '', status: 'Inactive', merchantAccount: '9275640241',
    },
  },
};