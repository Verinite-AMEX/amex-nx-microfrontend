import type { Meta, StoryObj } from '@storybook/angular';
import { AmexLargeReportDownloadPanelComponent } from './large-report-download-panel';

const meta: Meta<AmexLargeReportDownloadPanelComponent> = {
  title: 'Patterns/Amex/DisplayViewers/LargeReportDownloadPanel',
  component: AmexLargeReportDownloadPanelComponent,
  argTypes: {
    reportTypes: { control: 'object' },
    downloadTypes: { control: 'object' },
    reportFormats: { control: 'object' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexLargeReportDownloadPanelComponent>;

export const Empty: Story = {
  name: 'No results yet',
  args: {
    btaNumbers: ['BTACLIENTBAH001-3744XXXXXXX5229', 'BTACLIENTBAH002-3744XXXXXXX1108'],
    results: [],
  },
};

export const WithReadyReport: Story = {
  name: 'Report ready to download',
  args: {
    btaNumbers: ['BTACLIENTBAH001-3744XXXXXXX5229'],
    results: [
      {
        documentId: 561,
        reportType: 'memo',
        fileName: 'btabahrain01_MemoStatement_3744XXXX5229.pdf',
        format: 'pdf',
        status: 'Ready To Download',
      },
    ],
  },
};

export const WithProcessingReport: Story = {
  name: 'Report processing',
  args: {
    btaNumbers: ['BTACLIENTBAH001-3744XXXXXXX5229'],
    results: [
      {
        documentId: 562,
        reportType: 'monthly',
        fileName: 'btabahrain01_MonthlyStatement_3744XXXX5229.pdf',
        format: 'pdf',
        status: 'Processing',
      },
    ],
  },
};