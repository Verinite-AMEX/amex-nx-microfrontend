import type { Meta, StoryObj } from '@storybook/angular';
import { AmexForgotPasswordFormComponent } from '../../../../patterns/amex/authentication/forgot-password-form';

const meta: Meta<AmexForgotPasswordFormComponent> = {
  title: 'Patterns/Amex/Authentication/ForgotPasswordForm',
  component: AmexForgotPasswordFormComponent,
  argTypes: {
    portalStyle: { control: 'select', options: ['onls', 'oms'] },
    portalTitle: { control: 'text' },
    errorMessage: { control: 'text' },
    success: { control: 'boolean' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexForgotPasswordFormComponent>;

export const ONLSStyle: Story = {
  args: { portalStyle: 'onls', portalTitle: '', errorMessage: '' }
};

export const OMSStyle: Story = {
  args: { portalStyle: 'oms', portalTitle: 'Online Merchant Services', errorMessage: '' }
};

export const WithError: Story = {
  args: { portalStyle: 'onls', portalTitle: '', errorMessage: 'No account found for this username or email.' }
};