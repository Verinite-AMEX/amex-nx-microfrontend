import type { Meta, StoryObj } from '@storybook/angular';
import { AmexLoginFormComponent } from './login-form';

const meta: Meta<AmexLoginFormComponent> = {
  title: 'Patterns/Amex/Authentication/LoginForm',
  component: AmexLoginFormComponent,
  argTypes: {
    portalTitle: { control: 'text' },
    errorMessage: { control: 'text' },
    successMessage: { control: 'text' },
    showRegister: { control: 'boolean' },
  },
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'needs-improvement', 'keyboard-navigation', 'screen-reader', 'form-validation'],
};
export default meta;
type Story = StoryObj<AmexLoginFormComponent>;

export const HubLogin: Story = {
  args: { portalTitle: '', showRegister: false, errorMessage: '', successMessage: '' }
};

export const WithPortalTitle: Story = {
  args: { portalTitle: 'Online Merchant Services', showRegister: true, errorMessage: '', successMessage: '' }
};

export const WithError: Story = {
  args: { portalTitle: '', showRegister: false, errorMessage: 'Invalid username or password. Please try again.', successMessage: '' }
};

export const WithSuccess: Story = {
  args: { portalTitle: '', showRegister: false, errorMessage: '', successMessage: 'Your account has been activated. Please log in.' }
};