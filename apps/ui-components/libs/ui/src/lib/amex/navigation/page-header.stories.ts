import type { Meta, StoryObj } from '@storybook/angular';
import { AmexPageHeaderComponent } from './page-header';

const meta: Meta<AmexPageHeaderComponent> = {
  title: 'AMEX/Navigation/PageHeader',
  component: AmexPageHeaderComponent,
  tags: ['autodocs'],
  argTypes: {
    portalStyle: { control: 'radio', options: ['onls', 'oms'] },
    ctaClick: { action: 'ctaClick' },
  },
};
export default meta;
type Story = StoryObj<AmexPageHeaderComponent>;

/** ONLS — PRIORITY PASS™ ENROLLMENT (lounge/image4, lounge/image9) */
export const ONLSPriorityPass: Story = {
  name: 'ONLS — Priority Pass Enrollment',
  args: { portalStyle: 'onls', title: 'PRIORITY PASS™ ENROLLMENT' },
};

/** ONLS — SELECT & PAY WITH POINTS (pay_points/image5) */
export const ONLSPayWithPoints: Story = {
  name: 'ONLS — Select & Pay With Points',
  args: {
    portalStyle: 'onls',
    title: 'Pay with points - Agent Portal',
  },
};

/** ONLS — FORGOT PASSWORD (online_helper/image7) */
export const ONLSForgotPassword: Story = {
  name: 'ONLS — Forgot Password',
  args: { portalStyle: 'onls', title: 'FORGOT PASSWORD' },
};

/** ONLS — Change Password (online_helper/image9) */
export const ONLSChangePassword: Story = {
  name: 'ONLS — Change Password',
  args: { portalStyle: 'onls', title: 'Change Password' },
};

/** ONLS — with subtitle (used in Centurion 2.0 sub-header) */
export const ONLSWithSubtitle: Story = {
  name: 'ONLS — with subtitle',
  args: {
    portalStyle: 'onls',
    title: 'CENTURION',
    subtitle: 'Centurion 2.0 — Cen LCY EXC',
  },
};

/** ONLS — with right-side CTA button */
export const ONLSWithCTA: Story = {
  name: 'ONLS — with CTA button',
  args: {
    portalStyle: 'onls',
    title: 'PRIORITY PASS™ ENROLLMENT',
    ctaLabel: 'Refresh Request',
  },
};

/** OMS — EDIT YOUR PROFILE (oms/image55) */
export const OMSEditProfile: Story = {
  name: 'OMS — Edit Your Profile',
  args: { portalStyle: 'oms', title: 'EDIT YOUR PROFILE' },
};

/** OMS — MRM USER ADMINISTRATION (oms/image35) */
export const OMSMrmAdmin: Story = {
  name: 'OMS — MRM User Administration',
  args: { portalStyle: 'oms', title: 'MRM USER ADMINISTRATION' },
};

/** OMS — BCRB REPORTS MAIN with Request New Report CTA (bcrb/image5) */
export const OMSBCRBWithCTA: Story = {
  name: 'OMS — BCRB Reports with CTA',
  args: {
    portalStyle: 'oms',
    title: 'BCRB REPORTS MAIN',
    ctaLabel: 'Request New Report +',
  },
};

/** OMS — with subtitle */
export const OMSWithSubtitle: Story = {
  name: 'OMS — with subtitle',
  args: {
    portalStyle: 'oms',
    title: 'MERCHANT DETAILS',
    subtitle: 'All fields marked * are mandatory',
  },
};
