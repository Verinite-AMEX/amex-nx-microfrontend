import type { Meta, StoryObj } from '@storybook/angular';
import { AmexMonthlyStatementViewerComponent } from './monthly-statement-viewer';

const meta: Meta<AmexMonthlyStatementViewerComponent> = {
  title: 'Patterns/Amex/DisplayViewers/MonthlyStatementViewer',
  component: AmexMonthlyStatementViewerComponent,
  argTypes: {
    formats: { control: 'object' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexMonthlyStatementViewerComponent>;

export const NoTransactions: Story = {
  name: 'No transactions — with summary',
  args: {
    statementDate: '28 February 2025',
    accountNumber: 'BTA 3744XXXXXXX5229 - BTACLIENTBAH001',
    travelAgent: 'DNATA (BTA)',
    telephone: '+97143166343',
    summary: {
      previousBalance: -57.852,
      newRemittance: 0.000,
      newCredit: 0.000,
      newDebits: 0.000,
      disputes: 0.000,
      totalDueBalance: -57.852,
      totalDueDate: '25-03-2025',
    },
    transactions: [],
    availableMonths: ['February 2025', 'January 2025', 'December 2024', 'November 2024'],
  },
};

export const WithTransactions: Story = {
  name: 'With transactions',
  args: {
    statementDate: '31 January 2025',
    accountNumber: 'BTA 3744XXXXXXX5229 - BTACLIENTBAH001',
    travelAgent: 'DNATA (BTA)',
    telephone: '+97143166343',
    summary: {
      previousBalance: 0.000,
      newRemittance: 2500.000,
      newCredit: 0.000,
      newDebits: 1250.500,
      disputes: 0.000,
      totalDueBalance: 1249.500,
      totalDueDate: '25-02-2025',
    },
    transactions: [
      { type: '1', date: '05 Jan 2025', description: 'Emirates EK123', amount: 850.000 },
      { type: '1', date: '12 Jan 2025', description: 'Hotel Marriott', amount: 400.500 },
    ],
    availableMonths: ['January 2025', 'December 2024', 'November 2024'],
  },
};