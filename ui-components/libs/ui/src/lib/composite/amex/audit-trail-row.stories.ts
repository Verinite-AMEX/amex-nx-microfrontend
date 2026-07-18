import type { Meta, StoryObj } from '@storybook/angular';
import { AmexAuditTrailRowComponent } from './audit-trail-row';

const meta: Meta<AmexAuditTrailRowComponent> = {
  title: 'Composite/Amex/AuditTrailRow',
  component: AmexAuditTrailRowComponent,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      ...story(),
      template: `<div style="padding:16px;background:#fff;border:1px solid #e8e8f0;border-radius:8px">${story().template}</div>`,
    }),
  ],
};
export default meta;
type Story = StoryObj<AmexAuditTrailRowComponent>;

export const Approved: Story = {
  args: { entry: { timestamp: '2024-03-12 09:14:22', user: 'john.smith@amex.com', userRole: 'Master Admin', action: 'Card Application Approved', details: 'Platinum card approved for RICHARD BLACK', ipAddress: '10.20.1.55', status: 'approved' } },
};
export const Rejected: Story = {
  args: { entry: { timestamp: '2024-03-12 11:45:00', user: 'ali.hassan@amex.com', userRole: 'User', action: 'Login Attempt Failed', details: 'Invalid OTP — 3rd attempt', ipAddress: '192.168.5.11', status: 'rejected' } },
};
export const Minimal: Story = {
  args: { entry: { timestamp: '2024-03-10 08:00:00', user: 'system@amex.com', action: 'Scheduled Report Generated' } },
};