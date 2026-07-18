import type { Meta, StoryObj } from '@storybook/angular';
import { AmexReportDownloadButtonComponent } from './report-download-button';

const meta: Meta<AmexReportDownloadButtonComponent> = {
  title: 'Patterns/Amex/Action/ReportDownloadButton',
  component: AmexReportDownloadButtonComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'needs-improvement', 'keyboard-navigation', 'screen-reader'],
  argTypes: {
    download: { action: 'download' },
    back:     { action: 'back' },
  },
};
export default meta;
type Story = StoryObj<AmexReportDownloadButtonComponent>;

/**
 * BCRB portal — single Excel format with star label, Submit + Back buttons.
 * Matches the BCRB Reports screenshot exactly.
 */
export const BCRBExcel: Story = {
  name: 'BCRB — Export to Excel (default)',
  args: {
    config: {
      formats: ['excel'],
      submitLabel: 'Submit Request',
      showBack: true,
      backLabel: 'Back to main page',
    },
  },
};

/**
 * OMS / VAT Invoice portal — single PDF format.
 */
export const OMSPdf: Story = {
  name: 'OMS — Export to PDF',
  args: {
    config: {
      label: 'Export to PDF',
      formats: ['pdf'],
      submitLabel: 'Download Report',
      showBack: true,
      backLabel: 'Back to main page',
    },
  },
};

/**
 * BTA portal — single CSV format with custom submit label.
 */
export const BTACsv: Story = {
  name: 'BTA — Export to CSV',
  args: {
    config: {
      label: 'Export to CSV',
      formats: ['csv'],
      submitLabel: 'Download Report',
      showBack: false,
    },
  },
};

/**
 * SOC/ROC portal — multiple formats available (dropdown).
 * User selects PDF / Excel / CSV / RTF before submitting.
 */
export const SOCMultiFormat: Story = {
  name: 'SOC/ROC — Multi-format dropdown',
  args: {
    config: {
      formats: ['excel', 'pdf', 'csv', 'rtf'],
      label: 'Export Report',
      submitLabel: 'Submit Request',
      showBack: true,
      backLabel: 'Back to main page',
    },
  },
};

/**
 * Loading state — Submit button shows spinner and is disabled.
 */
export const Loading: Story = {
  name: 'Loading state',
  args: {
    config: {
      formats: ['excel'],
      submitLabel: 'Submit Request',
      showBack: true,
      loading: true,
    },
  },
};

/**
 * No back button — used in modal or inline panel contexts.
 */
export const NoBackButton: Story = {
  name: 'No Back button',
  args: {
    config: {
      formats: ['excel'],
      submitLabel: 'Download Now',
      showBack: false,
    },
  },
};
