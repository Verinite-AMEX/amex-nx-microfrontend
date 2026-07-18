import type { Meta, StoryObj } from '@storybook/angular';
import { AmexAddUserFormComponent } from './add-user-form';

const meta: Meta<AmexAddUserFormComponent> = {
  title: 'Patterns/Amex/Forms/AddUserForm',
  component: AmexAddUserFormComponent,
  argTypes: {
    userIdReadonly: { control: 'boolean' },
    showInfoIcon: { control: 'boolean' },
    backLabel: { control: 'text' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexAddUserFormComponent>;

export const CreateMRMUser: Story = {
  name: 'OMS — Create MRM User',
  args: {
    title: 'CREATE MRM USER',
    showUserId: false, showPassword: true,
    showRole: true, showMerchantAccount: false,
    submitLabel: 'Submit', backLabel: 'Back',
  },
};

export const EditMRMUser: Story = {
  name: 'OMS — Edit MRM User (pre-filled, image42)',
  args: {
    title: 'EDIT MRM USER',
    showUserId: true, userIdReadonly: true,
    showPassword: false, showRole: false,
    submitLabel: 'Submit', backLabel: 'Back',
    initialData: {
      userId: 'wasimtest123', userName: 'wasimtest123',
      emailAddress: 'wasim.sayyed@americanexpress.com.bh',
      status: 'Active',
    },
  },
};

export const CreateOMSUser: Story = {
  name: 'OMS — Create OMS User with Merchant Account',
  args: {
    title: 'CREATE OMS USER',
    showMerchantAccount: true, showPassword: true,
    submitLabel: 'Submit', backLabel: 'Back',
  },
};

export const BTAUser: Story = {
  name: 'BTA — Create User with Corporate Account',
  args: {
    title: 'CREATE BTA USER',
    showCorporateAccount: true, showPassword: true,
    roleOptions: [
      { value: 'corp_admin', label: 'Corporate Admin' },
      { value: 'travel_agent', label: 'Travel Agent Admin' },
      { value: 'amex_internal', label: 'Amex Internal Admin' },
    ],
    submitLabel: 'Save', backLabel: 'Cancel',
  },
};