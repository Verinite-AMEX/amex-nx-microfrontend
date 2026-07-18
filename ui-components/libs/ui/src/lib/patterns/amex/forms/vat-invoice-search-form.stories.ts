import type { Meta, StoryObj } from '@storybook/angular';
import { AmexVATInvoiceSearchFormComponent } from './vat-invoice-search-form';
const meta: Meta<AmexVATInvoiceSearchFormComponent> = { title: 'Patterns/Amex/Forms/VATInvoiceSearchForm', component: AmexVATInvoiceSearchFormComponent, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<AmexVATInvoiceSearchFormComponent>;
export const CorporateVATReg: Story = { name: 'Corporate — VAT Reg No mode', args: {} };
export const ConsumerInvoice: Story = { name: 'Consumer — Invoice No mode', args: {} };
