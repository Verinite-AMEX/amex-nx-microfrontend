import type { Meta, StoryObj } from '@storybook/angular';
import { AmexReportTypeSelectorComponent } from './report-type-selector';

const meta: Meta<AmexReportTypeSelectorComponent> = {
  title: 'AMEX/Search & Filters/ReportTypeSelector',
  component: AmexReportTypeSelectorComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexReportTypeSelectorComponent>;

export const BCRBRadio: Story = {
  args: {
    label: 'Request New Report',
    mode: 'radio',
    options: [
      { value: 'consumer-monthly', label: 'Consumer Monthly Audit Report (REP-009)' },
      { value: 'corporate-monthly', label: 'Corporate Monthly Audit Report (REP-010)' },
      { value: 'consumer-data', label: 'Consumer Data Audit Report' },
      { value: 'corporate-data', label: 'Corporate Data Audit Report' },
      { value: 'consumer-full', label: 'Consumer Full Report' },
      { value: 'consumer-history', label: 'Consumer History Report' },
      { value: 'corporate-history', label: 'Corporate History Report' },
    ],
    buttonLabel: 'Request',
  },
};

export const OMSCustomizedDropdown: Story = {
  args: {
    label: 'Report Type',
    mode: 'dropdown',
    options: [
      {
        value: 'settlement-detail',
        label: 'Settlement Detail',
        secondaryFields: [
          { key: 'from', label: 'From Date', type: 'date' },
          { key: 'to', label: 'To Date', type: 'date' },
        ],
      },
      {
        value: 'submission-detail',
        label: 'Submission Detail',
        secondaryFields: [
          { key: 'from', label: 'From Date', type: 'date' },
          { key: 'to', label: 'To Date', type: 'date' },
          { key: 'merchant', label: 'Merchant No', type: 'text' },
        ],
      },
      {
        value: 'adjustment-detail',
        label: 'Adjustment Detail',
        secondaryFields: [
          { key: 'from', label: 'From Date', type: 'date' },
          { key: 'to', label: 'To Date', type: 'date' },
        ],
      },
    ],
    buttonLabel: 'Generate',
  },
};
