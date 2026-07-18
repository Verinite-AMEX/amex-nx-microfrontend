import type { Meta, StoryObj } from '@storybook/angular';
import { AmexAccountNumberComponent } from '../../../../composite/amex/currency-logic/account-number';

const meta: Meta<AmexAccountNumberComponent> = {
  title: 'Composite/Amex/CurrencyLogic/AccountNumber',
  component: AmexAccountNumberComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader', 'color-contrast'],
  argTypes: {
    number:  { control: 'text' },
    masked:  { control: 'boolean' },
    mono:    { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<AmexAccountNumberComponent>;

export const MaskedAMEX: Story    = { args: { number: '374251018391009', masked: true, mono: true } };
export const FullAMEX: Story      = { args: { number: '374251018391009', masked: false, mono: true } };
export const Masked16: Story      = { args: { number: '4111111111111111', masked: true, mono: true } };
export const Full16: Story        = { args: { number: '4111111111111111', masked: false, mono: true } };
export const NoMonospace: Story   = { args: { number: '374251018391009', masked: false, mono: false } };