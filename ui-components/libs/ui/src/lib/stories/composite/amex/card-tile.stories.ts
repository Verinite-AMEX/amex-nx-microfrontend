import type { Meta, StoryObj } from '@storybook/angular';
import { AmexCardTileComponent } from '../../../composite/amex/card-tile';

const meta: Meta<AmexCardTileComponent> = {
  title: 'Composite/Amex/CardTile',
  component: AmexCardTileComponent,
  tags: ['autodocs'],
  argTypes: {
    masked:     { control: 'boolean' },
    selectable: { control: 'boolean' },
    selected:   { action: 'selected' },
  },
};
export default meta;
type Story = StoryObj<AmexCardTileComponent>;

export const Platinum: Story = {
  args: { card: { cardNumber: '374251018391009', cardholderName: 'JOHN A SMITH', cardType: 'platinum', expiryDate: '09/26', status: 'active' }, masked: true },
};
export const Gold: Story = {
  args: { card: { cardNumber: '4111111111111111', cardholderName: 'JANE DOE', cardType: 'gold', expiryDate: '12/25', status: 'active' }, masked: true },
};
export const Centurion: Story = {
  args: { card: { cardNumber: '374251018391009', cardholderName: 'RICHARD BLACK', cardType: 'centurion', expiryDate: '11/27', status: 'active' }, masked: false },
};
export const Corporate: Story = {
  args: { card: { cardNumber: '374600000000009', cardholderName: 'ACME CORP', cardType: 'corporate', expiryDate: '06/26', status: 'active', clientCode: 'CLI-00421', uci: 'UCI-998877' }, masked: true, selectable: true },
};
export const Inactive: Story = {
  args: { card: { cardNumber: '378282246310005', cardholderName: 'EMILY CLARK', cardType: 'green', expiryDate: '03/26', status: 'inactive' }, masked: true },
};