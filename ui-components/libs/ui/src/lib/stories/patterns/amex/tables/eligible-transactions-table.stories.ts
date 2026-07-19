import type { Meta, StoryObj } from '@storybook/angular';
import { AmexEligibleTransactionsTableComponent } from '../../../../patterns/amex/tables/eligible-transactions-table';

const meta: Meta<AmexEligibleTransactionsTableComponent> = {
  title: 'Patterns/Amex/Tables/EligibleTransactionsTable',
  component: AmexEligibleTransactionsTableComponent,
  argTypes: {
    pageTitle: { control: 'text' },
    cards: { control: 'object' },
    eligibleRows: { control: 'object' },
    pointsBalance: { control: 'text' },
    aedValue: { control: 'text' },
    totalPointsRedeemed: { control: 'text' },
    errorMessage: { control: 'text' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexEligibleTransactionsTableComponent>;

const cards = [
  { value: '3791XXXXXX7018', label: '3791-XXXXXX-7018 - The American Express Gold Credit Card' },
  { value: '3791XXXXXX9042', label: '3791-XXXXXX-9042 - The American Express Platinum Card' },
];
const eligible = [
  { id: '1', transactionDate: '15/03/2024', description: 'NOON.COM DUBAI', amount: 'AED 245.00', pointsValue: '245', selected: false },
  { id: '2', transactionDate: '18/03/2024', description: 'CARREFOUR UAE', amount: 'AED 380.00', pointsValue: '380', selected: false },
  { id: '3', transactionDate: '20/03/2024', description: 'AMAZON AE', amount: 'AED 150.00', pointsValue: '150', selected: false },
];

export const WithEligibleTransactions: Story = {
  args: { cards, eligibleRows: eligible, pointsBalance: '12,450', aedValue: '124.50', errorMessage: '' },
};
export const WithError: Story = {
  args: { cards, eligibleRows: [], errorMessage: 'ERROR: Sorry, selected card is not eligible for the Select and Pay With Points benefit.', selectedCard: '3791XXXXXX7018' } as any,
};
export const HistoryTab: Story = {
  args: {
    cards,
    historyRows: [],
    totalCredit: '', totalPointsRedeemed: '',
  } as any,
};