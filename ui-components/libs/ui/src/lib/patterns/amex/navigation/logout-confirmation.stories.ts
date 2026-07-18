import type { Meta, StoryObj } from '@storybook/angular';
import { AmexLogoutConfirmationComponent } from './logout-confirmation';

const meta: Meta<AmexLogoutConfirmationComponent> = {
  title: 'Patterns/Amex/Navigation/LogoutConfirmation',
  component: AmexLogoutConfirmationComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexLogoutConfirmationComponent>;

export const Visible: Story = {
  args: {
    visible: true,
    serverLabel: 'stg-websrv01 says',
    message: 'Are you sure you want to log out?',
  },
};
export const Hidden: Story = {
  args: { visible: false },
};
