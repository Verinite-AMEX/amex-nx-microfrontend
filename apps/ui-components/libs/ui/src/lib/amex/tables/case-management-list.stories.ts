import type { Meta, StoryObj } from '@storybook/angular';
import { AmexCaseManagementListComponent } from './case-management-list';

const meta: Meta<AmexCaseManagementListComponent> = {
  title: 'AMEX/Tables/CaseManagementList',
  component: AmexCaseManagementListComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexCaseManagementListComponent>;

export const WithCases: Story = {
  name: 'With mixed-status cases',
  args: {
    rows: [
      { caseId: 'CASE-2024-001', subject: 'Lost Card Request',   status: 'Open',     assignee: 'Agent A', createdDate: '01/09/2024' },
      { caseId: 'CASE-2024-002', subject: 'Statement Dispute',   status: 'Pending',  assignee: 'Agent B', createdDate: '05/09/2024' },
      { caseId: 'CASE-2024-003', subject: 'Address Update',      status: 'Closed',   assignee: 'Agent A', createdDate: '08/09/2024' },
      { caseId: 'CASE-2024-004', subject: 'Fraud Investigation', status: 'Resolved', assignee: 'Agent C', createdDate: '10/09/2024' },
    ],
  },
};

export const Empty: Story = {
  name: 'Empty state',
  args: { rows: [] },
};
