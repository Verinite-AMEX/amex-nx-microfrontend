import type { Meta, StoryObj } from '@storybook/angular';
import { AmexStatusBadgeComponent } from './status-badge';

const meta: Meta<AmexStatusBadgeComponent> = {
  title: 'Composite/Amex/CurrencyLogic/StatusBadge',
  component: AmexStatusBadgeComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader', 'color-contrast'],
  argTypes: {
    status: { control: 'select', options: ['approved','rejected','pending','draft','active','inactive','processing','completed','expired','locked'] },
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<AmexStatusBadgeComponent>;

export const Approved: Story   = { args: { status: 'approved' } };
export const Rejected: Story   = { args: { status: 'rejected' } };
export const Pending: Story    = { args: { status: 'pending' } };
export const Processing: Story = { args: { status: 'processing' } };
export const Completed: Story  = { args: { status: 'completed' } };
export const Draft: Story      = { args: { status: 'draft' } };
export const Active: Story     = { args: { status: 'active' } };
export const Inactive: Story   = { args: { status: 'inactive' } };
export const Expired: Story    = { args: { status: 'expired' } };
export const Locked: Story     = { args: { status: 'locked' } };
export const CustomLabel: Story = { args: { status: 'approved', label: 'Verified' } };