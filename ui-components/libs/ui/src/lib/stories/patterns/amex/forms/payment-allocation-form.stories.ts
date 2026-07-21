import type { Meta, StoryObj } from '@storybook/angular';
import { AmexPaymentAllocationFormComponent } from '../../../../patterns/amex/forms/payment-allocation-form';
const meta: Meta<AmexPaymentAllocationFormComponent> = { title: 'Patterns/Amex/Forms/PaymentAllocationForm', component: AmexPaymentAllocationFormComponent, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<AmexPaymentAllocationFormComponent>;
export const WithTransactions: Story = {
  name: 'BTA — Payment Allocation with transactions',
  args: {
    accounts: [{ value: 'BTACLIENTBAH001-3744XXXXXX5229', label: 'BTACLIENTBAH001-3744XXXXXX5229' }],
    billedTransactions: [
      { date: '01/09/2024', description: 'Emirates Airlines', amount: 'AED 1,200.00' },
      { date: '05/09/2024', description: 'Marriott Hotel', amount: 'AED 450.00' },
    ],
    unbilledTransactions: [
      { date: '20/09/2024', description: 'NOON PAYMENTS', amount: 'AED 300.00' },
    ],
  },
};
export const Empty: Story = { name: 'Empty — no account selected', args: { accounts: [], billedTransactions: [], unbilledTransactions: [] } };
