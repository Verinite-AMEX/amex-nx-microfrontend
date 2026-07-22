import type { Meta, StoryObj } from '@storybook/angular';
import { AmexForgotUserIdFormComponent } from '../../../../patterns/amex/authentication/forgot-user-id-form';

const meta: Meta<AmexForgotUserIdFormComponent> = {
  title: 'Patterns/Amex/Authentication/ForgotUserIdForm',
  component: AmexForgotUserIdFormComponent,

  argTypes: {
    portalTitle: {
      control: 'text',
    },

    errorMessage: {
      control: 'text',
    },

    portalStyle: {
      control: 'select',
      options: ['onls', 'oms'],
    },

    bannerMessage: {
      control: 'text',
    },

    sideImageUrl: {
      control: 'text',
    },

    submitEmail: {
      action: 'submitEmail',
    },

    submitRequest: {
      action: 'submitRequest',
    },

    backToLogin: {
      action: 'backToLogin',
    },
  },

  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<AmexForgotUserIdFormComponent>;


// ===================== ONLS =====================

export const Default: Story = {
  args: {
    portalTitle: '',
    errorMessage: '',
    portalStyle: 'onls',
  },
};

export const WithError: Story = {
  args: {
    portalTitle: '',
    errorMessage: 'No account found for this email address.',
    portalStyle: 'onls',
  },
};


// ===================== OMS =====================

export const OmsForgotUserId: Story = {
  args: {
    portalTitle: '',
    errorMessage: '',
    portalStyle: 'oms',
  },
};

export const OmsForgotUserIdWithError: Story = {
  args: {
    portalTitle: '',
    errorMessage: 'No account found for this email address.',
    portalStyle: 'oms',
  },
};