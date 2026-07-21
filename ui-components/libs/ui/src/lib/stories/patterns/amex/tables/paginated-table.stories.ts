import type { Meta, StoryObj } from '@storybook/angular';
import { AmexPaginatedTableComponent } from '../../../../patterns/amex/tables/paginated-table';

const meta: Meta<AmexPaginatedTableComponent> = {
  title: 'Patterns/Amex/Tables/PaginatedTable',
  component: AmexPaginatedTableComponent,
  argTypes: {
    columns: { control: 'object' },
    rows: { control: 'text' },
    actions: { control: 'text' },
    initialPageSize: { control: 'object' },
    pageSize: { control: 'object' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexPaginatedTableComponent>;

const cols = [
  { key: 'serialNo', label: 'Serial No.' },
  { key: 'processId', label: 'Process ID', isLink: true },
  { key: 'fileName', label: 'File Name', isLink: true },
  { key: 'reportCreationTime', label: 'Report Creation Time' },
  { key: 'processingStatus', label: 'Processing Status', isStatus: true },
];
const rows = Array.from({ length: 12 }, (_, i) => ({
  serialNo: i + 1,
  processId: String(1281 + i),
  fileName: `1281_REP00${i}_220920241714`,
  reportCreationTime: '22-09-2024 05:14',
  processingStatus: i === 0 ? 'NO RESPONSE FROM BACKEND. CONTACT ADMIN' : 'Completed',
}));

export const WithData: Story = { args: { columns: cols, rows, initialPageSize: 5 } };
export const Empty: Story = { args: { columns: cols, rows: [], initialPageSize: 5 } };