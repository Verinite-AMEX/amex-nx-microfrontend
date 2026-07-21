import type { Meta, StoryObj } from '@storybook/angular';
import { AmexFileResponseStatusTableComponent } from '../../../../patterns/amex/tables/file-response-status-table';

const meta: Meta<AmexFileResponseStatusTableComponent> = {
  title: 'Patterns/Amex/Tables/FileResponseStatusTable',
  component: AmexFileResponseStatusTableComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexFileResponseStatusTableComponent>;

export const AllStatuses: Story = {
  name: 'All 4 statuses',
  args: {
    title: 'AECB File Response Status',
    rows: [
      { submissionDate: '22/09/2024', fileName: '1281_REP009_220920241714.csv', status: 'Completed',  canView: true,  canDownload: true  },
      { submissionDate: '23/09/2024', fileName: '1305_REP007_230920241022.csv', status: 'Processing', canView: false, canDownload: false },
      { submissionDate: '24/09/2024', fileName: '1310_REP005_240920241300.csv', status: 'Pending',    canView: false, canDownload: false },
      { submissionDate: '20/09/2024', fileName: '1290_REP003_200920241115.csv', status: 'Failed',     canView: true,  canDownload: false },
    ],
  },
};

export const Empty: Story = {
  name: 'Empty state',
  args: { title: 'AECB File Response Status', rows: [] },
};
