import type { Meta, StoryObj } from '@storybook/angular';
import { AmexLoginFormComponent } from '../../../../patterns/amex/authentication/login-form';

const meta: Meta<AmexLoginFormComponent> = {
  title: 'Patterns/Amex/Authentication/LoginForm',
  component: AmexLoginFormComponent,
  argTypes: {
    portalTitle: { control: 'text' },
    errorMessage: { control: 'text' },
    successMessage: { control: 'text' },
    showRegister: { control: 'boolean' },
    portalStyle: { control: 'select', options: ['onls', 'oms'] },
    cardAccentColor: { control: 'color' },
    cardMaxWidth: { control: 'text' },
    loginSubmit: { action: 'loginSubmit' },
    forgotPassword: { action: 'forgotPassword' },
    registerClick: { action: 'registerClick' },
    forgotUserId: { action: 'forgotUserId' },
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
type Story = StoryObj<AmexLoginFormComponent>;

// ===================== ONLS =====================

export const HubLogin: Story = {
  args: {
    portalTitle: '',
    showRegister: true,
    errorMessage: '',
    successMessage: '',
    portalStyle: 'onls',
  },
};

export const WithPortalTitle: Story = {
  args: {
    portalTitle: 'Employee Portal',
    showRegister: true,
    errorMessage: '',
    successMessage: '',
    portalStyle: 'onls',
  },
};

export const WithError: Story = {
  args: {
    portalTitle: '',
    showRegister: false,
    errorMessage: 'Invalid username or password. Please try again.',
    successMessage: '',
    portalStyle: 'onls',
  },
};

export const WithSuccess: Story = {
  args: {
    portalTitle: '',
    showRegister: false,
    errorMessage: '',
    successMessage: 'Your account has been activated. Please log in.',
    portalStyle: 'onls',
  },
};

// ===================== OMS =====================

export const OmsLogin: Story = {
  args: {
    showRegister: false,
    errorMessage: '',
    successMessage: '',
    portalStyle: 'oms',
    cardAccentColor: '#7b1f4b',
    cardMaxWidth: '360px',
  },
};

export const OmsLoginWithError: Story = {
  args: {
    showRegister: false,
    errorMessage: 'Invalid User ID or Password. Please try again.',
    successMessage: '',
    portalStyle: 'oms',
    cardAccentColor: '#7b1f4b',
    cardMaxWidth: '360px',
  },
};

export const OmsLoginCustomAccent: Story = {
  args: {
    showRegister: false,
    errorMessage: '',
    successMessage: '',
    portalStyle: 'oms',
    cardAccentColor: '#016fd0',
    cardMaxWidth: '400px',
  },
};

export const OmsLoginWithRegister: Story = {
  args: {
    showRegister: true,
    errorMessage: '',
    successMessage: '',
    portalStyle: 'oms',
    cardAccentColor: '#7b1f4b',
    cardMaxWidth: '360px',
  },
};