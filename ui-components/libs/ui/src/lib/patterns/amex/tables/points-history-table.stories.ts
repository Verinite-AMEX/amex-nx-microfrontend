import type { Meta, StoryObj } from '@storybook/angular';
import { AmexPointsHistoryTableComponent } from './points-history-table';

const meta: Meta<AmexPointsHistoryTableComponent> = {
  title: 'Patterns/Amex/Tables/PointsHistoryTable',
  component: AmexPointsHistoryTableComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexPointsHistoryTableComponent>;

export const WithHistory: Story = {
  name: 'With redemption history',
  args: {
    totalCredit: 'AED 250.00',
    totalPointsRedeemed: '25,000',
    rows: [
      { transactionDate: '01/08/2024', description: 'NOON PAYMENTS', pointsRedeemed: '5,000',  amountOffset: 'AED 50.00',  redemptionDate: '03/08/2024' },
      { transactionDate: '15/08/2024', description: 'AMAZON AE',     pointsRedeemed: '20,000', amountOffset: 'AED 200.00', redemptionDate: '17/08/2024' },
    ],
  },
};

export const NoHistory: Story = {
  name: 'Empty — no redemptions yet',
  args: { rows: [], totalCredit: '', totalPointsRedeemed: '' },
};
