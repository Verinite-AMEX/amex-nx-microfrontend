import type { Meta, StoryObj } from '@storybook/angular';
import { AmexVATInvoiceReportViewComponent } from './vat-invoice-report-view';

const meta: Meta<AmexVATInvoiceReportViewComponent> = {
  title: 'Patterns/Amex/DisplayViewers/VATInvoiceReportView',
  component: AmexVATInvoiceReportViewComponent,
  tags: ['autodocs'],
  decorators: [(story) => ({ ...story(), template: `<div style="padding:20px;max-width:700px">${story().template}</div>` })],
};
export default meta;
type Story = StoryObj<AmexVATInvoiceReportViewComponent>;

export const Default: Story = {
  name: 'Default — Corporate, Invoice Number selected (matches screenshot)',
  args: {
    customerType: 'corporate',
    searchMode: 'invoice',
    searchValue: '',
    errorMessage: '',
    invoice: null,
  },
};

export const NoMatchError: Story = {
  name: 'Error — no tax invoice with matching details (matches screenshot)',
  args: {
    customerType: 'corporate',
    searchMode: 'invoice',
    searchValue: '9765297775',
    errorMessage: 'No Tax Invoice with matching details.',
    invoice: null,
  },
};

export const WithInvoice: Story = {
  name: 'Invoice result displayed',
  args: {
    customerType: 'corporate',
    searchMode: 'invoice',
    searchValue: 'INV-2024-00123',
    errorMessage: '',
    invoice: {
      companyName: 'Al Mansouri Trading LLC',
      vatRegistrationNo: '100234567890003',
      invoiceNumber: 'INV-2024-00123',
      period: 'January 2024',
      lineItems: [
        { description: 'Annual Card Fee - Platinum', amount: 3000.00, vatAmount: 150.00 },
        { description: 'Supplementary Card Fee', amount:  500.00, vatAmount:  25.00 },
        { description: 'Late Payment Fee',         amount:  200.00, vatAmount:  10.00 },
      ],
    },
  },
};

export const ConsumerVATRegNo: Story = {
  name: 'Consumer — VAT Registration Number mode',
  args: {
    customerType: 'consumer',
    searchMode: 'vat',
    searchValue: '',
    errorMessage: '',
    invoice: null,
  },
};
