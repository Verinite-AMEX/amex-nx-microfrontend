import type { Meta, StoryObj } from '@storybook/angular';
import { AmexPaymentRegisterTableComponent } from './payment-register-table';

const meta: Meta<AmexPaymentRegisterTableComponent> = {
  title: 'Patterns/Amex/Tables/PaymentRegisterTable',
  component: AmexPaymentRegisterTableComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexPaymentRegisterTableComponent>;

export const WithEntries: Story = {
  name: 'With payment entries',
  args: {
    title: 'Payment Register',
    rows: [
      { date: '22/09/2024', location: 'Dubai HQ',  currency: 'AED', amount: '5,250.00', reference: 'PAY-2024-001' },
      { date: '23/09/2024', location: 'Abu Dhabi', currency: 'AED', amount: '1,800.00', reference: 'PAY-2024-002' },
      { date: '24/09/2024', location: 'Sharjah',   currency: 'DZD', amount: '3,400.00', reference: 'PAY-2024-003' },
    ],
  },
};

export const Empty: Story = {
  name: 'Empty — No Data Found',
  args: { rows: [] },
};
