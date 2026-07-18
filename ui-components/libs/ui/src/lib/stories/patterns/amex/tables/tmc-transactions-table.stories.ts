import type { Meta, StoryObj } from '@storybook/angular';
import { AmexTMCTransactionsTableComponent } from '../../../../patterns/amex/tables/tmc-transactions-table';

const meta: Meta<AmexTMCTransactionsTableComponent> = {
  title: 'Patterns/Amex/Tables/TMCTransactionsTable',
  component: AmexTMCTransactionsTableComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexTMCTransactionsTableComponent>;

export const WithTransactions: Story = {
  name: 'With TMC transactions',
  args: {
    indexOptions: [
      { value: '1', label: 'Index 1 - UAE' },
      { value: '2', label: 'Index 2 - Bahrain' },
      { value: '3', label: 'Index 3 - Kuwait' },
    ],
    rows: [
      { date: '01/09/2024', amount: 'AED 1,200.00', merchant: 'Emirates Airlines',   reference: 'EK-2024-001' },
      { date: '05/09/2024', amount: 'AED 450.00',   merchant: 'Marriott Hotel Dubai', reference: 'MH-2024-045' },
      { date: '10/09/2024', amount: 'AED 3,800.00', merchant: 'Etihad Airways',       reference: 'EY-2024-112' },
    ],
  },
};

export const Empty: Story = {
  name: 'Empty state',
  args: { indexOptions: [{ value: '1', label: 'Index 1 - UAE' }], rows: [] },
};
