import type { Meta, StoryObj } from '@storybook/angular';
import { AmexSOCROCRecordsTableComponent } from './socroc-records-table';

const meta: Meta<AmexSOCROCRecordsTableComponent> = {
  title: "AMEX/Tables/SOCROCRecordsTable",
  component: AmexSOCROCRecordsTableComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexSOCROCRecordsTableComponent>;

const rows = [
  { seNo: 'SE001', socRefNo: 'SOC-2024-001', totalAmount: '1500.00', noOfCharges: '3', cardAccountNo: '3791-XXXXXX-1001', approvalCode: 'APP001' },
  { seNo: 'SE002', socRefNo: 'SOC-2024-002', totalAmount: '2200.50', noOfCharges: '5', cardAccountNo: '3791-XXXXXX-1002', approvalCode: 'APP002' },
  { seNo: 'SE003', socRefNo: 'SOC-2024-003', totalAmount:  '800.00', noOfCharges: '2', cardAccountNo: '3791-XXXXXX-1003', approvalCode: 'APP003' },
];

export const WithData: Story = { args: { rows, sectionLabel: "SOC's", showExport: true } };
export const ROCSection: Story = { args: { rows, sectionLabel: "ROC's", showExport: true } };
export const Empty: Story = { args: { rows: [], sectionLabel: "SOC's", showExport: false } };
