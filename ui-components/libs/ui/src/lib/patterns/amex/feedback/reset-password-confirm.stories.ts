import type { Meta, StoryObj } from '@storybook/angular';
import { AmexResetPasswordConfirmComponent } from './reset-password-confirm';

const meta: Meta<AmexResetPasswordConfirmComponent> = {
  title: 'Patterns/Amex/Feedback/ResetPasswordConfirm',
  component: AmexResetPasswordConfirmComponent,
  tags: ['autodocs'],
  argTypes: {
    portalStyle: { control: 'radio', options: ['onls', 'oms'] },
    visible: { control: 'boolean' },
    userName: { control: 'text' },
    userEmail: { control: 'text' },
    siteLabel: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<AmexResetPasswordConfirmComponent>;

export const ONLS_ResetDialog: Story = {
  name: 'ONLS — Reset Dialog',
  args: { visible: true, portalStyle: 'onls', userName: 'hquaid', userEmail: 'user@americanexpress.com.bh' },
};

export const OMS_ResetCard: Story = {
  name: 'OMS — Reset Card Dialog',
  args: { visible: true, portalStyle: 'oms', userName: 'wasimtest123', userEmail: 'wasim.sayyed@americanexpress.com.bh' },
};