import type { Meta, StoryObj } from '@storybook/angular';
import { AmexForgotUserIdFormComponent } from './forgot-user-id-form';

const meta: Meta<AmexForgotUserIdFormComponent> = {
  title: 'Patterns/Amex/Authentication/ForgotUserIdForm',
  component: AmexForgotUserIdFormComponent,
  argTypes: {
    portalTitle: { control: 'text' },
    errorMessage: { control: 'text' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexForgotUserIdFormComponent>;

export const Default: Story = {
  args: { portalTitle: '', errorMessage: '' }
};

export const WithError: Story = {
  args: { portalTitle: '', errorMessage: 'No account found for this email address.' }
};