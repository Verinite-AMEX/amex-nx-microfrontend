import type { Meta, StoryObj } from '@storybook/angular';
import { AmexRejectionReportTableComponent } from '../../../../patterns/amex/tables/rejection-report-table';

const meta: Meta<AmexRejectionReportTableComponent> = {
  title: 'Patterns/Amex/Tables/RejectionReportTable',
  component: AmexRejectionReportTableComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexRejectionReportTableComponent>;

export const WithRejections: Story = {
  name: 'With rejected items',
  args: {
    rows: [
      { seNo: 'SE001', rejectionReason: 'Invalid Card Number', date: '22/09/2024', amount: '1,200.00' },
      { seNo: 'SE004', rejectionReason: 'Duplicate Reference', date: '23/09/2024', amount: '850.00' },
      { seNo: 'SE007', rejectionReason: 'Expired Approval Code', date: '24/09/2024', amount: '3,400.00' },
    ],
  },
};

export const Empty: Story = {
  name: 'Empty — No Data Found',
  args: { rows: [] },
};
