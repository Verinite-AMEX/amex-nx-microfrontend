import type { Meta, StoryObj } from '@storybook/angular';
import { AmexConfirmationModalComponent } from './confirmation-modal';

const meta: Meta<AmexConfirmationModalComponent> = {
  title: 'Patterns/Amex/Feedback/ConfirmationModal',
  component: AmexConfirmationModalComponent,
  tags: ['autodocs'],
  argTypes: {
    portalStyle: { control: 'radio', options: ['onls', 'oms'] },
    cancelLabel: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<AmexConfirmationModalComponent>;

export const ONLS_EmailSent: Story = {
  name: 'ONLS — Email Sent Alert (browser dialog style)',
  args: {
    visible: true, portalStyle: 'onls',
    siteLabel: 'tst-websrv01 says',
    message: 'An Email has been sent to user@americanexpress.com.bh containing the User ID and Password.',
    confirmLabel: 'OK', cancelLabel: 'Cancel',
  },
};

export const ONLS_Logout: Story = {
  name: 'ONLS — Logout Confirmation',
  args: {
    visible: true, portalStyle: 'onls',
    siteLabel: 'tst-websrv01 says',
    message: 'Are you sure you want to logout?',
    confirmLabel: 'OK', cancelLabel: 'Cancel',
  },
};

export const OMS_DeleteUser: Story = {
  name: 'OMS — Delete User',
  args: {
    visible: true, portalStyle: 'oms',
    title: 'Delete User Account',
    message: 'This will permanently remove the user. This action cannot be undone.',
    confirmLabel: 'Delete', cancelLabel: 'Back',
  },
};

export const OMS_ResetPassword: Story = {
  name: 'OMS — Reset Password',
  args: {
    visible: true, portalStyle: 'oms',
    title: 'Reset Password',
    message: 'A temporary password will be sent to the user\'s registered email.',
    confirmLabel: 'Reset Password', cancelLabel: 'Back',
  },
};