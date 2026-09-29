import type { Meta, StoryObj } from '@storybook/angular';
import { AmexStatusBadgeComponent } from '../../../../composite/amex/currency-logic/status-badge';

const meta: Meta<AmexStatusBadgeComponent> = {
  title: 'Composite/Amex/CurrencyLogic/StatusBadge',
  component: AmexStatusBadgeComponent,
  tags: [
    'autodocs',
    'a11y',
    'accessibility',
    'wcag',
    'screen-reader',
    'color-contrast',
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Renders DLS\'s `.badge.badgeStatus` status dot paired with a `.body1.dlsGray06` text label (per DLS docs: "Always use it with a supporting text label for context"). Each `AmexStatus` maps onto one of DLS\'s 4 semantic status colors — success (green), attention (yellow), neutral (grey), or warning (red).',
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: [
        'approved',
        'rejected',
        'pending',
        'draft',
        'active',
        'inactive',
        'processing',
        'completed',
        'expired',
        'locked',
      ],
    },
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<AmexStatusBadgeComponent>;

export const Approved: Story = { args: { status: 'approved' } };
export const Rejected: Story = { args: { status: 'rejected' } };
export const Pending: Story = { args: { status: 'pending' } };
export const Processing: Story = { args: { status: 'processing' } };
export const Completed: Story = { args: { status: 'completed' } };
export const Draft: Story = { args: { status: 'draft' } };
export const Active: Story = { args: { status: 'active' } };
export const Inactive: Story = { args: { status: 'inactive' } };
export const Expired: Story = { args: { status: 'expired' } };
export const Locked: Story = { args: { status: 'locked' } };
export const CustomLabel: Story = {
  args: { status: 'approved', label: 'Verified' },
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:8px">
        <amex-status-badge status="approved"></amex-status-badge>
        <amex-status-badge status="active"></amex-status-badge>
        <amex-status-badge status="completed"></amex-status-badge>
        <amex-status-badge status="pending"></amex-status-badge>
        <amex-status-badge status="processing"></amex-status-badge>
        <amex-status-badge status="draft"></amex-status-badge>
        <amex-status-badge status="inactive"></amex-status-badge>
        <amex-status-badge status="rejected"></amex-status-badge>
        <amex-status-badge status="expired"></amex-status-badge>
        <amex-status-badge status="locked"></amex-status-badge>
      </div>`,
    moduleMetadata: { imports: [AmexStatusBadgeComponent] },
  }),
};