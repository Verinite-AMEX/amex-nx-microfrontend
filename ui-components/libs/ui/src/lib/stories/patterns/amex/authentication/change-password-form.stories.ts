import type { Meta, StoryObj } from '@storybook/angular';
import { AmexChangePasswordFormComponent } from '../../../../patterns/amex/authentication/change-password-form';

const meta: Meta<AmexChangePasswordFormComponent> = {
  title: 'Patterns/Amex/Authentication/ChangePasswordForm',
  component: AmexChangePasswordFormComponent,
  argTypes: {
    // Shared
    portalStyle: { control: 'select', options: ['onls', 'oms'] },
    formTitle: { control: 'text' },
    currentPasswordLabel: { control: 'text' },
    newPasswordLabel: { control: 'text' },
    confirmPasswordLabel: { control: 'text' },
    submitButtonLabel: { control: 'text' },
    errorMessage: { control: 'text' },
    successMessage: { control: 'text' },

    // ONLS-only
    showHeader: { control: 'boolean' },
    panelBackground: { control: 'color' },

    // OMS-only
    cardAccentColor: { control: 'color' },
    cardMaxWidth: { control: 'text' },
    cardPadding: { control: 'text' },
    showNewPasswordHint: { control: 'boolean' },
    newPasswordHintText: { control: 'text' },

    // Events
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

// ===================== ONLS =====================

export const ONLSStyle: Story = {
  name: 'ONLS - Default',
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

export const ONLSWithSuccess: Story = {
  name: 'ONLS - Success message',
  args: {
    ...ONLSStyle.args,
    successMessage: 'Your password has been changed successfully.',
  },
};

export const ONLSWithError: Story = {
  name: 'ONLS - Error message',
  args: {
    ...ONLSStyle.args,
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

export const ONLSWithoutHeader: Story = {
  name: 'ONLS - Header hidden (parent shell owns heading)',
  args: {
    ...ONLSStyle.args,
    showHeader: false,
  },
};

export const ONLSCustomPanelBackground: Story = {
  name: 'ONLS - Custom panel background',
  args: {
    ...ONLSStyle.args,
    panelBackground: '#eaeaea',
  },
};

// ===================== OMS =====================

export const OMSStyle: Story = {
  name: 'OMS - Default',
  args: {
    portalStyle: 'oms',
    formTitle: 'Change Password',
    currentPasswordLabel: 'Current Password',
    newPasswordLabel: 'Create New Password',
    confirmPasswordLabel: 'Re-enter New Password',
    submitButtonLabel: '',
    errorMessage: '',
    successMessage: '',
    cardAccentColor: '#7b1fa2',
    cardMaxWidth: '700px',
    cardPadding: '24px 20px',
    showNewPasswordHint: true,
    newPasswordHintText: 'Choose a new password.',
  },
};

export const OMSWithSuccess: Story = {
  name: 'OMS - Success message',
  args: {
    ...OMSStyle.args,
    successMessage: 'Your password has been changed successfully.',
  },
};

export const OMSWithError: Story = {
  name: 'OMS - Error message',
  args: {
    ...OMSStyle.args,
    errorMessage: 'Current password is incorrect. Please try again.',
  },
};

export const OMSCustomSubmitLabel: Story = {
  name: 'OMS - Title/button text diverge',
  args: {
    ...OMSStyle.args,
    formTitle: 'Update Your Password',
    submitButtonLabel: 'Submit',
  },
};

export const OMSCustomCardTheming: Story = {
  name: 'OMS - Custom card theme (color/width)',
  args: {
    ...OMSStyle.args,
    cardAccentColor: '#016fd0',
    cardMaxWidth: '420px',
  },
};

export const OMSWithoutHintIcon: Story = {
  name: 'OMS - Hint icon hidden',
  args: {
    ...OMSStyle.args,
    showNewPasswordHint: false,
  },
};