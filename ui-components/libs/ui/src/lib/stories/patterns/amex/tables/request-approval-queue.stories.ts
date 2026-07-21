import type { Meta, StoryObj } from '@storybook/angular';
import { AmexRequestApprovalQueueComponent } from '../../../../patterns/amex/tables/request-approval-queue';

const meta: Meta<AmexRequestApprovalQueueComponent> = {
  title: 'Patterns/Amex/Tables/RequestApprovalQueue',
  component: AmexRequestApprovalQueueComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexRequestApprovalQueueComponent>;

export const PendingRequests: Story = {
  name: 'With pending requests',
  args: {
    title: 'UAEFTS Approval Queue',
    rows: [
      { requestId: 'REQ-001', referenceNo: 'UAEFTS-2024-001', customerName: 'Ahmed Al Mansouri', emiratesId: '784-1985-1234567-8', status: 'Pending' },
      { requestId: 'REQ-002', referenceNo: 'UAEFTS-2024-002', customerName: 'Sara Khalid',       emiratesId: '784-1990-7654321-2', status: 'Pending' },
      { requestId: 'REQ-003', referenceNo: 'UAEFTS-2024-003', customerName: 'Omar Hassan',       emiratesId: '784-1988-1122334-5', status: 'Approved' },
    ],
  },
};

export const Empty: Story = {
  name: 'Empty queue',
  args: { title: 'UAEFTS Approval Queue', rows: [] },
};
