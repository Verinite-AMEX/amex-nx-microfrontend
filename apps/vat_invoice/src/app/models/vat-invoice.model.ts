export interface VatInvoice {
  companyName: string;
  vatRegistrationNo: string;
  invoiceNumber: string;
  period: string;
  lineItems: VatLineItem[];
}
export interface VatLineItem {
  description: string;
  amount: number;
  vatAmount: number;
}