import type { Meta, StoryObj } from '@storybook/angular';
import { AmexAddDeleteMerchantPanelComponent } from './add-delete-merchant-panel';

const meta: Meta<AmexAddDeleteMerchantPanelComponent> = {
  title: 'Patterns/Amex/Forms/AddDeleteMerchantPanel',
  component: AmexAddDeleteMerchantPanelComponent,
  argTypes: {
    addTitle: { control: 'text' },
    deleteTitle: { control: 'text' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexAddDeleteMerchantPanelComponent>;

export const AddMode: Story = {
  name: 'Add mode — merchant number + IBAN',
  args: { merchantOptions: [] },
};

export const DeleteMode: Story = {
  name: 'Delete mode — select from list',
  args: {
    merchantOptions: [
      { merchantNo: '9275640241', label: 'Dubai Branch' },
      { merchantNo: '1100286459', label: 'Abu Dhabi Branch' },
      { merchantNo: '1104166483', label: 'Sharjah Branch' },
    ],
  },
};

export const DeleteEmpty: Story = {
  name: 'Delete mode — no merchants',
  args: { merchantOptions: [] },
};