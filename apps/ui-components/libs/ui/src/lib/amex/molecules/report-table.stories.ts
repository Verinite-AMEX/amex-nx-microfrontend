import type { Meta, StoryObj } from '@storybook/angular';
import { AmexReportTableComponent } from './report-table';

const meta: Meta<AmexReportTableComponent> = {
  title: 'AMEX/Molecules/ReportTable',
  component: AmexReportTableComponent,
  tags: ['autodocs'],
  argTypes: {
    export:   { action: 'export' },
    rowClick: { action: 'rowClick' },
  },
};
export default meta;
type Story = StoryObj<AmexReportTableComponent>;

export const Default: Story = {
  args: {
    config: {
      columns: [
        { key: 'date', label: 'Date', sortable: true, width: '110px' },
        { key: 'description', label: 'Description', sortable: true },
        { key: 'amount', label: 'Amount', width: '110px' },
        { key: 'status', label: 'Status', type: 'status', width: '130px' },
      ],
      pageSize: 5,
      searchable: true,
      exportable: true,
    },
    rows: [
      { date: '12 Mar 2024', description: 'Amazon AE',          amount: 'AED 349.99',   status: 'completed' },
      { date: '11 Mar 2024', description: 'Carrefour MOE',      amount: 'AED 215.50',   status: 'completed' },
      { date: '10 Mar 2024', description: 'Emirates Airlines',  amount: 'AED 1,200.00', status: 'pending' },
      { date: '09 Mar 2024', description: 'Atlantis Dispute',   amount: 'AED 5,400.00', status: 'processing' },
      { date: '08 Mar 2024', description: 'Noon Shopping',      amount: 'AED 89.00',    status: 'completed' },
      { date: '07 Mar 2024', description: 'Talabat Delivery',   amount: 'AED 54.75',    status: 'approved' },
    ],
  },
};