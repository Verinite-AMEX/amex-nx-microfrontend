import type { Meta, StoryObj } from '@storybook/angular';
import { AmexErrorToastComponent } from '../../../../patterns/amex/feedback/error-toast';

const meta: Meta<AmexErrorToastComponent> = {
  title: 'Patterns/Amex/Feedback/ErrorToast',
  component: AmexErrorToastComponent,
  tags: ['autodocs'],
  argTypes: {
    portalStyle: { control: 'radio', options: ['onls', 'oms'] },
    message: { control: 'text' },
    showRetry: { control: 'boolean' },
    dismissible: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<AmexErrorToastComponent>;

export const ONLS_LoginFailed: Story = {
  name: 'ONLS — Login Failed',
  args: { portalStyle: 'onls', message: 'Invalid User ID or Password. Please try again.', showRetry: false },
};

export const ONLS_WithRetry: Story = {
  name: 'ONLS — System Error with Retry',
  args: { portalStyle: 'onls', message: 'Unable to connect. Please check your connection.', showRetry: true },
};

export const OMS_BackendError: Story = {
  name: 'OMS — Backend Error (BCRB style)',
  args: { portalStyle: 'oms', message: 'NO RESPONSE FROM BACKEND. CONTACT ADMIN.', showRetry: true },
};

export const OMS_SessionExpired: Story = {
  name: 'OMS — Session Expired',
  args: { portalStyle: 'oms', message: 'Your session has expired. Please log in again.', showRetry: false },
};