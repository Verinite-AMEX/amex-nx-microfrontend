import type { Meta, StoryObj } from '@storybook/angular';
import { AmexStatementRowComponent } from '../../../composite/amex/statement-row';

const meta: Meta<AmexStatementRowComponent> = {
  title: 'Composite/Amex/StatementRow',
  component: AmexStatementRowComponent,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      ...story(),
      template: `<div style="border:1px solid #f0f0f0;border-radius:8px;overflow:hidden">${story().template}</div>`,
    }),
  ],
};
export default meta;
type Story = StoryObj<AmexStatementRowComponent>;

export const Debit: Story = {
  args: { transaction: { date: '12 Mar 2024', description: 'Amazon AE', referenceNumber: 'REF-00192837', amount: 349.99, currency: 'AED', type: 'debit', category: 'Shopping' } },
};
export const Credit: Story = {
  args: { transaction: { date: '08 Mar 2024', description: 'Refund — Emirates Airlines', referenceNumber: 'REF-00190011', amount: 1200.00, currency: 'AED', type: 'credit', category: 'Travel' } },
};
export const WithStatus: Story = {
  args: { transaction: { date: '05 Mar 2024', description: 'Hotel Atlantis — Dispute', referenceNumber: 'REF-00185544', amount: 5400.00, currency: 'AED', type: 'debit', status: 'pending', category: 'Travel' } },
};