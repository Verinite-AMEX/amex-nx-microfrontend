import type { Meta, StoryObj } from '@storybook/angular';
import { AmexPasswordExpiryScreenComponent } from '../../../../patterns/amex/authentication/password-expiry-screen';

const meta: Meta<AmexPasswordExpiryScreenComponent> = {
  title: 'Patterns/Amex/Authentication/PasswordExpiryScreen',
  component: AmexPasswordExpiryScreenComponent,
  argTypes: {
    portalTitle: { control: 'text' },
    errorMessage: { control: 'text' },
    successMessage: { control: 'text' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexPasswordExpiryScreenComponent>;

export const Default: Story = {
  args: { portalTitle: 'Business Travel Accounts', errorMessage: '', successMessage: '' }
};

export const WithError: Story = {
  args: { portalTitle: 'Business Travel Accounts', errorMessage: 'Passwords do not match. Please try again.', successMessage: '' }
};

export const WithSuccess: Story = {
  args: { portalTitle: 'Business Travel Accounts', errorMessage: '', successMessage: 'Password updated successfully. Redirecting to login...' }
};