import type { Meta, StoryObj } from '@storybook/angular';
import { AmexEmptyStateMessageComponent } from './empty-state-message';

const meta: Meta<AmexEmptyStateMessageComponent> = {
  title: 'Patterns/Amex/DisplayViewers/EmptyStateMessage',
  component: AmexEmptyStateMessageComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexEmptyStateMessageComponent>;

// BCRB / SOC / ONLS — bold centred "No Data Found"
export const DefaultNodataFound: Story = {
  name: 'Default — No Data Found (BCRB/SOC/ONLS)',
  args: {
    variant: 'default',
    message: 'No Data Found',
    icon: '',
    ctaLabel: '',
  },
};

// With CTA button
export const DefaultWithCTA: Story = {
  name: 'Default — With CTA Button',
  args: {
    variant: 'default',
    message: 'No records available for the selected criteria.',
    icon: '📋',
    ctaLabel: 'Add New Record',
  },
};

// OMS — light green info box
export const OMSGreenBox: Story = {
  name: 'OMS — Light Green Info Box',
  args: {
    variant: 'oms',
    message: 'No merchants are available.',
    icon: '',
    ctaLabel: '',
  },
};

// OMS — no eligible transactions
export const OMSNoTransactions: Story = {
  name: 'OMS — No Eligible Transactions',
  args: {
    variant: 'oms',
    message: 'No eligible transactions found for the selected period.',
    icon: '',
    ctaLabel: '',
  },
};

// Priority Pass / ONLS inline red error
export const ErrorRedInline: Story = {
  name: 'Error — Red Inline (Priority Pass / ONLS)',
  args: {
    variant: 'error',
    message: 'No eligible cards found for this client.',
    icon: '',
    ctaLabel: '',
  },
};

// Backend error red
export const ErrorBackendFailure: Story = {
  name: 'Error — Backend Failure',
  args: {
    variant: 'error',
    message: 'NO RESPONSE FROM BACKEND, CONTACT ADMIN',
    icon: '',
    ctaLabel: '',
  },
};
