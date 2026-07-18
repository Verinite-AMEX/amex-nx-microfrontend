import type { Meta, StoryObj } from '@storybook/angular';
import { AmexAuditTrailSummaryViewComponent } from './audit-trail-summary-view';

const meta: Meta<AmexAuditTrailSummaryViewComponent> = {
  title: 'Patterns/Amex/DisplayViewers/AuditTrailSummaryView',
  component: AmexAuditTrailSummaryViewComponent,
  argTypes: {
    years: { control: 'text' },
    months: { control: 'text' },
    downloadFormats: { control: 'text' },
  },
  tags: ['autodocs'],
  decorators: [(story) => ({ ...story(), template: `<div style="padding:20px;max-width:900px">${story().template}</div>` })],
};
export default meta;
type Story = StoryObj<AmexAuditTrailSummaryViewComponent>;

export const EmptySearch: Story = {
  name: 'Empty — no search yet',
  args: {
    activeTab: 'detail',
    showResults: false,
  },
};

export const NoEntriesFound: Story = {
  name: 'Detailed — no entries found (matches screenshot)',
  args: {
    activeTab: 'detail',
    selectedYear: '2021',
    selectedMonth: 'October',
    corporationName: 'TEST BTA 9',
    corporationAccountNo: '10026800010',
    showResults: true,
    noEntries: true,
  },
};

export const DetailedWithData: Story = {
  name: 'Detailed — with audit entries',
  args: {
    activeTab: 'detail',
    selectedYear: '2024',
    selectedMonth: 'March',
    corporationName: 'BTACLIENTBAH001',
    corporationAccountNo: '3744XXXXXXX5229',
    showResults: true,
    noEntries: false,
    detailEntries: [
      { date: '01-03-2024', time: '09:14:22', user: 'admin_bta01',
        action: 'LOGIN', entity: 'User', oldValue: '', newValue: '' },
      { date: '01-03-2024', time: '09:18:05', user: 'admin_bta01',
        action: 'UPDATE_USER', entity: 'test44332244', oldValue: 'Active', newValue: 'Cancelled' },
      { date: '02-03-2024', time: '11:00:33', user: 'admin_bta01',
        action: 'DOWNLOAD_REPORT', entity: 'MemoStatement', oldValue: '', newValue: 'PDF' },
    ],
  },
};

export const SummaryView: Story = {
  name: 'Summary Report tab',
  args: {
    activeTab: 'summary',
    selectedYear: '2024',
    selectedMonth: 'February',
    corporationName: 'BTACLIENTBAH001',
    corporationAccountNo: '3744XXXXXXX5229',
    showResults: true,
    noEntries: false,
    summaryEntries: [
      { user: 'admin_bta01', actionsCount: 12, lastAction: 'DOWNLOAD_REPORT', lastActionDate: '28-02-2024' },
      { user: 'corp_user01', actionsCount: 4,  lastAction: 'VIEW_STATEMENT',  lastActionDate: '27-02-2024' },
    ],
  },
};