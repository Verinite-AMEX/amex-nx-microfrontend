import type { Meta, StoryObj } from '@storybook/angular';
import { AmexPointsBalanceSummaryCardComponent } from './points-balance-summary-card';

const meta: Meta<AmexPointsBalanceSummaryCardComponent> = {
  title: 'Patterns/Amex/DisplayViewers/PointsBalanceSummaryCard',
  component: AmexPointsBalanceSummaryCardComponent,
  tags: ['autodocs'],
  decorators: [(story) => ({ ...story(), template: `<div style="padding:20px;max-width:700px">${story().template}</div>` })],
};
export default meta;
type Story = StoryObj<AmexPointsBalanceSummaryCardComponent>;

export const NoCardSelected: Story = {
  name: 'No card selected — dropdown only (matches screenshot)',
  args: {
    cards: [
      { cardNumber: '3744XXXXXXXX1001' },
      { cardNumber: '3744XXXXXXXX2002' },
    ],
    selectedCardNumber: '',
    activeTab: 'eligible',
  },
};

export const NotEligibleError: Story = {
  name: 'Card not eligible for Points (error state)',
  args: {
    cards: [{ cardNumber: '3744XXXXXXXX1001' }],
    selectedCardNumber: '3744XXXXXXXX1001',
    balance: null,
    errorMessage: 'Sorry, selected card is not eligible for the Select and Pay With Points benefit.',
    activeTab: 'eligible',
  },
};

export const WithBalance: Story = {
  name: 'Card selected — points balance displayed',
  args: {
    cards: [
      { cardNumber: '3744XXXXXXXX5229' },
      { cardNumber: '3744XXXXXXXX9008' },
    ],
    selectedCardNumber: '3744XXXXXXXX5229',
    balance: 125000,
    aedEquivalent: 1250.00,
    errorMessage: '',
    activeTab: 'eligible',
  },
};

export const HistoryTab: Story = {
  name: 'History tab active',
  args: {
    cards: [{ cardNumber: '3744XXXXXXXX5229' }],
    selectedCardNumber: '3744XXXXXXXX5229',
    balance: 98500,
    aedEquivalent: 985.00,
    activeTab: 'history',
  },
};
