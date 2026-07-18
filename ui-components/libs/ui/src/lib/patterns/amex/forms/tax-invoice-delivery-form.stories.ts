import type { Meta, StoryObj } from '@storybook/angular';
import { AmexTaxInvoiceDeliveryFormComponent } from './tax-invoice-delivery-form';
const meta: Meta<AmexTaxInvoiceDeliveryFormComponent> = { title: 'Patterns/Amex/Forms/TaxInvoiceDeliveryForm', component: AmexTaxInvoiceDeliveryFormComponent, tags: ['autodocs'],
  argTypes: {
    countries: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<AmexTaxInvoiceDeliveryFormComponent>;
export const Default: Story = { name: 'OMS — TAX Invoice Delivery Details (image26)', args: { showError: false } };
export const WithError: Story = { name: 'With invalid entry error', args: { showError: true } };