import type { Meta, StoryObj } from '@storybook/angular';
import { AmexCardListSelectorComponent } from './card-list-selector';

const meta: Meta<AmexCardListSelectorComponent> = {
  title: 'Patterns/Amex/Tables/CardListSelector',
  component: AmexCardListSelectorComponent,
  argTypes: {
    searchLabel: { control: 'text' },
    placeholder: { control: 'text' },
    submitLabel: { control: 'text' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexCardListSelectorComponent>;

export const Empty: Story = {
  name: 'Empty — no results yet',
  args: { rows: [], memberName: '', memberCardNumber: '' },
};

export const WithCards: Story = {
  name: 'With member panel + card rows',
  args: {
    memberName: 'BAHONE',
    memberCardNumber: '3744XXXXXXX9008',
    rows: [
      { cardNumber: '3744XXXXXXX9008', cardType: 'Centurion USD', status: 'Active' },
      { cardNumber: '3744XXXXXXX1023', cardType: 'Centurion LCY', status: 'Active' },
      { cardNumber: '3744XXXXXXX5042', cardType: 'Supplementary', status: 'Inactive' },
    ],
  },
};