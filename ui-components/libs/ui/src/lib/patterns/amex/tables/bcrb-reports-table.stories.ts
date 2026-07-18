import type { Meta, StoryObj } from '@storybook/angular';
import { AmexBCRBReportsTableComponent } from './bcrb-reports-table';

const meta: Meta<AmexBCRBReportsTableComponent> = {
  title: 'Patterns/Amex/Tables/BCRBReportsTable',
  component: AmexBCRBReportsTableComponent,
  argTypes: {
    rows: { control: 'object' },
    username: { control: 'text' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexBCRBReportsTableComponent>;

const rows = [
  { serialNo: 1, processId: '1281', fileName: '1281_REP009_220920241714', reportCreationTime: '22-09-2024 05:14', processingStatus: 'NO RESPONSE FROM BACKEND. CONTACT ADMIN' },
  { serialNo: 2, processId: '1282', fileName: '1282_REP007_220920241715', reportCreationTime: '22-09-2024 05:18', processingStatus: 'Completed' },
  { serialNo: 3, processId: '1283', fileName: '1283_REP005_220920241716', reportCreationTime: '22-09-2024 05:22', processingStatus: 'Processing' },
];

export const WithData: Story = { args: { rows, username: 'ssharaf_onlshelper' } };
export const Empty: Story = { args: { rows: [], username: 'ssharaf_onlshelper' } };