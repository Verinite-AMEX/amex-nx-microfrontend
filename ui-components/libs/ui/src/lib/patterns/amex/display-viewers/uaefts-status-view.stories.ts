import type { Meta, StoryObj } from '@storybook/angular';
import { AmexUAEFTSStatusViewComponent } from './uaefts-status-view';

const meta: Meta<AmexUAEFTSStatusViewComponent> = {
  title: 'Patterns/Amex/DisplayViewers/UAEFTSStatusView',
  component: AmexUAEFTSStatusViewComponent,
  tags: ['autodocs'],
  decorators: [(story) => ({ ...story(), template: `<div style="padding:20px;max-width:960px">${story().template}</div>` })],
};
export default meta;
type Story = StoryObj<AmexUAEFTSStatusViewComponent>;

const sampleRecords = [
  {
    referenceNo: 'SFE2505261345I0',
    customerName: 'DRE RICK',
    idType: 'EI', idNumber: '784199900001200',
    iban: 'AE07033123456789O123456',
    period: 3, consentDate: '24-May-25',
    status: 'CREATED' as const,
    createdBy: 'uaeftsuser4', createdDate: '26-May-25 13:41:48',
    verifiedBy: '-', verifiedDate: '-',
  },
  {
    referenceNo: 'SFE2505261234A1',
    customerName: 'AHMED MANSOURI',
    idType: 'IBAN', idNumber: 'AE07033123456789O999',
    iban: 'AE07033123456789O999',
    period: 6, consentDate: '20-May-25',
    status: 'PDF_GENERATED' as const,
    createdBy: 'uaeftsuser4', createdDate: '20-May-25 10:00:00',
    verifiedBy: 'uaeftsuser5', verifiedDate: '20-May-25 11:15:00',
  },
];

export const SearchWithResults: Story = {
  name: 'Search — results shown (matches screenshot)',
  args: { mode: 'search', records: sampleRecords },
};

export const SearchEmpty: Story = {
  name: 'Search — no records yet',
  args: { mode: 'search', records: [] },
};

export const RequestForm: Story = {
  name: 'Request Bank Statement form',
  args: { mode: 'request', records: [], requestConfirmation: null },
};

export const RequestConfirmed: Story = {
  name: 'Request submitted — confirmation shown',
  args: {
    mode: 'request',
    records: [],
    requestConfirmation: { referenceNo: 'SFE2506010012X9' },
  },
};
