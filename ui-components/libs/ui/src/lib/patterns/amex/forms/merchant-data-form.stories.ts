import type { Meta, StoryObj } from '@storybook/angular';
import { AmexMerchantDataFormComponent } from './merchant-data-form';

const meta: Meta<AmexMerchantDataFormComponent> = {
  title: 'Patterns/Amex/Forms/MerchantDataForm',
  component: AmexMerchantDataFormComponent,
  argTypes: {
    backLabel: { control: 'text' },
    submitLabel: { control: 'text' },
    countryOptions: { control: 'object' },
    cityOptions: { control: 'object' },
    legalOptions: { control: 'object' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexMerchantDataFormComponent>;

export const Empty: Story = {
  name: 'Empty — Add Merchant',
  args: { title: 'MERCHANT DETAILS', submitLabel: 'Submit', backLabel: 'Back' },
};

export const PreFilled: Story = {
  name: 'Pre-filled — Update Merchant',
  args: {
    title: 'UPDATE MERCHANT DETAILS',
    initialData: {
      merchantName: 'AMEX Merchant LLC', merchantNumber: '9275640241',
      lastFiveIban: '12345', tradeLicense: 'CR-2024-001',
      country: 'Bahrain', city: 'Manama',
      legalStructure: 'Limited Liability Company',
      repName: 'Ahmed Al Mansouri', repEmail: 'ahmed@merchant.ae',
      repPhone: '+973 39 123 456',
    },
  },
};