import type { Meta, StoryObj } from '@storybook/angular';
import { AmexRegisterFormComponent } from '../../../../patterns/amex/authentication/register-form';

const meta: Meta<AmexRegisterFormComponent> = {
  title: 'Patterns/Amex/Authentication/RegisterForm',
  component: AmexRegisterFormComponent,

  argTypes: {
    portalTitle: { control: 'text' },
    errorMessage: { control: 'text' },
    successMessage: { control: 'text' },

    portalStyle: {
      control: 'select',
      options: ['onls', 'oms'],
    },

    cardAccentColor: { control: 'color' },
    cardMaxWidth: { control: 'text' },

    registerSubmit: { action: 'registerSubmit' },
    cancel: { action: 'cancel' },
  },

  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<AmexRegisterFormComponent>;


// ===================== ONLS =====================

export const Empty: Story = {
  args: {
    portalTitle: '',
    errorMessage: '',
    successMessage: '',
    portalStyle: 'onls',
  },
};

export const WithError: Story = {
  args: {
    portalTitle: '',
    errorMessage:
      'Email address already registered. Please use a different email.',
    successMessage: '',
    portalStyle: 'onls',
  },
};

export const WithSuccess: Story = {
  args: {
    portalTitle: '',
    errorMessage: '',
    successMessage:
      'Registration successful. Please check your email to activate your account.',
    portalStyle: 'onls',
  },
};


// ===================== OMS =====================

export const OmsRegister: Story = {
  args: {
    errorMessage: '',
    successMessage: '',
    portalStyle: 'oms',
    cardAccentColor: '#7b1fa2',
    cardMaxWidth: '500px',
  },
};

export const OmsRegisterWithError: Story = {
  args: {
    errorMessage:
      'Merchant Number not recognized. Please verify and try again.',
    successMessage: '',
    portalStyle: 'oms',
    cardAccentColor: '#7b1fa2',
    cardMaxWidth: '500px',
  },
};

export const OmsRegisterSuccess: Story = {
  args: {
    errorMessage: '',

    successMessage:
      'Your Email Address has been successfully verified. Please click here to login with your new User ID and Password. Your submissions and settlements Data will be available within 24 hours. Thank you for registering on Online Merchant Services.',

    portalStyle: 'oms',
    cardAccentColor: '#7b1fa2',
    cardMaxWidth: '500px',
  },
};