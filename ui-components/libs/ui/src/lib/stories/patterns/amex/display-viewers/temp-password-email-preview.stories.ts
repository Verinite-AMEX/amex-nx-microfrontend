import type { Meta, StoryObj } from '@storybook/angular';
import { AmexTempPasswordEmailPreviewComponent } from '../../../../patterns/amex/display-viewers/temp-password-email-preview';

const meta: Meta<AmexTempPasswordEmailPreviewComponent> = {
  title: 'Patterns/Amex/DisplayViewers/TempPasswordEmailPreview',
  component: AmexTempPasswordEmailPreviewComponent,
  argTypes: {
    fromAddress: { control: 'text' },
    subject: { control: 'text' },
  },
  tags: ['autodocs'],
  decorators: [(story) => ({ ...story(), template: `<div style="padding:24px;background:#f0f0f0">${story().template}</div>` })],
};
export default meta;
type Story = StoryObj<AmexTempPasswordEmailPreviewComponent>;

export const Default: Story = {
  name: 'Temp password email — default',
  args: {
    toAddress: 'ahmed.mansouri@company.ae',
    userName: 'Ahmed Al Mansouri',
    userId: 'ahmed_onls01',
    tempPassword: 'Amex@9812',
    portalName: 'AEME Online Helper',
    portalUrl: 'https://tst-wassrv02/wps/portal/onlshelper/',
  },
};

export const BTAPortal: Story = {
  name: 'Temp password email — BTA Portal',
  args: {
    toAddress: 'manager@btacorp.ae',
    userName: 'Sara Khalid',
    userId: 'DATTABO',
    tempPassword: 'BTA#5532',
    portalName: 'AEME BTA Portal',
    portalUrl: 'https://tst-wassrv02/wps/portal/btacorporation',
  },
};