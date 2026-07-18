import type { Meta, StoryObj } from '@storybook/angular';
import { AmexFileUploadProgressComponent } from '../../../../patterns/amex/feedback/file-upload-progress';

const meta: Meta<AmexFileUploadProgressComponent> = {
  title: 'Patterns/Amex/Feedback/FileUploadProgress',
  component: AmexFileUploadProgressComponent,
  tags: ['autodocs'],
  argTypes: {
    portalStyle: { control: 'radio', options: ['onls', 'oms'] },
    status: { control: 'radio', options: ['uploading', 'processing', 'completed', 'failed'] },
  
    fileName: { control: 'text' },
    percent: { control: 'object' },
    showCancel: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<AmexFileUploadProgressComponent>;

export const OMS_Uploading: Story = {
  name: 'OMS — Uploading',
  args: { portalStyle: 'oms', fileName: 'BCRB_bulk_report_Oct2024.csv', percent: 45, status: 'uploading', showCancel: true },
};
export const OMS_Processing: Story = {
  name: 'OMS — Processing',
  args: { portalStyle: 'oms', fileName: 'BCRB_bulk_report_Oct2024.csv', percent: 75, status: 'processing', showCancel: false },
};
export const OMS_Completed: Story = {
  name: 'OMS — Completed',
  args: { portalStyle: 'oms', fileName: 'BCRB_bulk_report_Oct2024.csv', percent: 100, status: 'completed', showCancel: false },
};
export const OMS_Failed: Story = {
  name: 'OMS — Failed',
  args: { portalStyle: 'oms', fileName: 'BCRB_bulk_report_Oct2024.csv', percent: 60, status: 'failed', showCancel: false },
};
export const ONLS_Uploading: Story = {
  name: 'ONLS — Uploading',
  args: { portalStyle: 'onls', fileName: 'SOC_batch_file.xlsx', percent: 55, status: 'uploading', showCancel: true },
};