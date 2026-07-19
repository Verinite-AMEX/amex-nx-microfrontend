import type { Meta, StoryObj } from '@storybook/angular';
import { AmexSuccessToastComponent } from '../../../../patterns/amex/feedback/success-toast';

const meta: Meta<AmexSuccessToastComponent> = {
  title: 'Patterns/Amex/Feedback/SuccessToast',
  component: AmexSuccessToastComponent,
  tags: ['autodocs'],
  argTypes: { portalStyle: { control: 'radio', options: ['onls', 'oms'] } ,
    autoDismiss: { control: 'boolean' },
    duration: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<AmexSuccessToastComponent>;

export const ONLS_ForgotPassword: Story = {
  name: 'ONLS — Forgot Password Sent',
  args: {
    portalStyle: 'onls',
    message: 'An Email has been sent to user@americanexpress.com.bh containing the User ID and Password.',
    dismissible: false,
  },
};

export const ONLS_RecordSaved: Story = {
  name: 'ONLS — Record Saved',
  args: { portalStyle: 'onls', message: 'Record saved successfully.', dismissible: true },
};

export const OMS_UserCreated: Story = {
  name: 'OMS — User Created',
  args: { portalStyle: 'oms', message: 'User account created successfully.', dismissible: true },
};

export const OMS_PasswordChanged: Story = {
  name: 'OMS — Password Changed',
  args: { portalStyle: 'oms', message: 'Your password has been changed successfully.', dismissible: false },
};