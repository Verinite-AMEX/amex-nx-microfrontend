import type { Meta, StoryObj } from '@storybook/angular';
import { AmexAmountComponent } from '../../../../composite/amex/currency-logic/amount';

const meta: Meta<AmexAmountComponent> = {
  title: 'Composite/Amex/CurrencyLogic/Amount',
  component: AmexAmountComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader', 'color-contrast'],
  argTypes: {
    amount:   { control: 'number' },
    currency: { control: 'text' },
    type:     { control: 'radio', options: ['debit', 'credit', 'neutral'] },
    decimals: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj<AmexAmountComponent>;

export const Debit: Story   = { args: { amount: 1250.75, currency: 'AED', type: 'debit' } };
export const Credit: Story  = { args: { amount: 500.00,  currency: 'AED', type: 'credit' } };
export const Neutral: Story = { args: { amount: 3400.00, currency: 'AED', type: 'neutral' } };
export const USD: Story     = { args: { amount: 89.99,   currency: 'USD', type: 'debit' } };