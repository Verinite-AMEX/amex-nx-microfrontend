import type { Meta, StoryObj } from '@storybook/angular';
import { AmexChangePasswordFormComponent } from '../../../../patterns/amex/authentication/change-password-form';

const meta: Meta<AmexChangePasswordFormComponent> = {
  title: 'Patterns/Amex/Authentication/ChangePasswordForm',
  component: AmexChangePasswordFormComponent,
  argTypes: {
    portalStyle: { control: 'select', options: ['onls', 'oms'] },
    formTitle: { control: 'text' },
    currentPasswordLabel: { control: 'text' },
    newPasswordLabel: { control: 'text' },
    confirmPasswordLabel: { control: 'text' },
    submitButtonLabel: { control: 'text' },
    errorMessage: { control: 'text' },
    successMessage: { control: 'text' },
    passwordSubmit: { action: 'passwordSubmit' },
    cancel: { action: 'cancel' },
  },
  tags: [
    'autodocs',
    'a11y',
    'accessibility',
    'wcag',
    'needs-improvement',
    'keyboard-navigation',
    'screen-reader',
    'form-validation',
  ],
};
export default meta;
type Story = StoryObj<AmexChangePasswordFormComponent>;

export const ONLSStyle: Story = {
  args: {
    portalStyle: 'onls',
    formTitle: 'Change Password',
    currentPasswordLabel: 'Current Password',
    newPasswordLabel: 'New Password',
    confirmPasswordLabel: 'Re-enter New Password',
    submitButtonLabel: '',
    errorMessage: '',
    successMessage: '',
  },
};

export const OMSStyle: Story = {
  args: {
    portalStyle: 'oms',
    formTitle: 'Change Password',
    currentPasswordLabel: 'Current Password',
    newPasswordLabel: 'New Password',
    confirmPasswordLabel: 'Confirm New Password',
    submitButtonLabel: '',
    errorMessage: '',
    successMessage: '',
  },
};

export const ONLSWithSuccess: Story = {
  args: {
    ...ONLSStyle.args,
    successMessage: 'Your password has been changed successfully.',
  },
};

export const OMSWithError: Story = {
  args: {
    ...OMSStyle.args,
    errorMessage: 'Current password is incorrect. Please try again.',
  },
};

export const ONLSAsResetPassword: Story = {
  name: 'ONLS - Reset Password (custom title)',
  args: {
    ...ONLSStyle.args,
    formTitle: 'Reset Password',
    // submitButtonLabel left blank on purpose: it mirrors formTitle
    // automatically, so the button reads "Reset Password" too.
  },
};

export const OMSCustomSubmitLabel: Story = {
  name: 'OMS - Title/button text diverge',
  args: {
    ...OMSStyle.args,
    formTitle: 'Update Your Password',
    submitButtonLabel: 'Save Changes',
  },
};