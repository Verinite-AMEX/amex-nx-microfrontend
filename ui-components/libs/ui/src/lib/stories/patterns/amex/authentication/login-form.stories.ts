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

export const HubLogin: Story = {
  args: {
    portalTitle: 'oms',
    showRegister: true,
    errorMessage: '',
    successMessage: '',
    portalStyle: 'onls',
  },
};

export const WithPortalTitle: Story = {
  args: {
    portalTitle: 'oms',
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
    errorMessage: '',
    successMessage: '',
    portalStyle: 'oms',
    cardAccentColor: '#7b1f4b',
    cardMaxWidth: '360px',
  },
};

export const OmsLoginWithError: Story = {
  args: {
    errorMessage: 'Invalid User ID or Password. Please try again.',
    successMessage: '',
    portalStyle: 'oms',
    cardAccentColor: '#7b1f4b',
    cardMaxWidth: '360px',
  },
};

export const OmsLoginCustomAccent: Story = {
  args: {
    errorMessage: '',
    successMessage: '',
    portalStyle: 'oms',
    cardAccentColor: '#016fd0',
    cardMaxWidth: '400px',
  },
};