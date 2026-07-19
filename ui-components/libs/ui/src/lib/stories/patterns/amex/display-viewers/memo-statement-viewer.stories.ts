import type { Meta, StoryObj } from '@storybook/angular';
import { AmexMemoStatementViewerComponent } from '../../../../patterns/amex/display-viewers/memo-statement-viewer';

const meta: Meta<AmexMemoStatementViewerComponent> = {
  title: 'Patterns/Amex/DisplayViewers/MemoStatementViewer',
  component: AmexMemoStatementViewerComponent,
  argTypes: {
    formats: { control: 'object' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexMemoStatementViewerComponent>;

export const NoTransactions: Story = {
  name: 'No transactions available',
  args: {
    statementDate: '29 Jan 2025',
    accountNumber: 'BTA 3744XXXXXXX5229 - BTACLIENTBAH001',
    travelAgent: 'DNATA (BTA)',
    telephone: '+97143166343',
    transactions: [],
  },
};

export const WithTransactions: Story = {
  name: 'With transactions',
  args: {
    statementDate: '29 Jan 2025',
    accountNumber: 'BTA 3744XXXXXXX5229 - BTACLIENTBAH001',
    travelAgent: 'DNATA (BTA)',
    telephone: '+97143166343',
    transactions: [
      { type: '1', date: '05 Jan 2025', description: 'Emirates EK123 Dubai-London', amount: 1250.000 },
      { type: '1', date: '10 Jan 2025', description: 'Hotel Booking - Marriott Dubai', amount: 870.500 },
      { type: '2', date: '15 Jan 2025', description: 'Refund - Cancelled Flight', amount: -450.000 },
      { type: '1', date: '20 Jan 2025', description: 'Car Rental - Hertz Dubai', amount: 320.750 },
    ],
  },
};