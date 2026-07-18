import type { Meta, StoryObj } from '@storybook/angular';
import { AmexTopNavBarComponent } from './top-nav-bar';

const meta: Meta<AmexTopNavBarComponent> = {
  title: 'Patterns/Amex/Navigation/TopNavBar',
  component: AmexTopNavBarComponent,
  tags: ['autodocs'],
  argTypes: {
    portalStyle: { control: 'radio', options: ['onls','oms','bcrb'] },
    portalTitle: { control: 'text' },
    omsServiceName: { control: 'text' },
    username: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<AmexTopNavBarComponent>;

export const ONLS_HubLogin: Story = {
  name: 'ONLS — Hub Login',
  args: { portalStyle: 'onls', portalTitle: 'THE HUB LOGIN' },
};
export const ONLS_HelperTool: Story = {
  name: 'ONLS — ONLS Helper Tool (after login)',
  args: { portalStyle: 'onls', portalTitle: 'ONLS Helper Tool' },
};
export const ONLS_Request: Story = {
  name: 'ONLS — REQUEST (Forgot Password page)',
  args: { portalStyle: 'onls', portalTitle: 'REQUEST' },
};
export const OMS_MerchantServices: Story = {
  name: 'OMS — Online Merchant Services',
  args: { portalStyle: 'oms', omsServiceName: 'Merchant Services' },
};
export const BCRB_Reports: Story = {
  name: 'BCRB — Reports Portal',
  args: { portalStyle: 'bcrb', portalTitle: 'BCRB Reports', username: 'ssharaf_onlshelper' },
};