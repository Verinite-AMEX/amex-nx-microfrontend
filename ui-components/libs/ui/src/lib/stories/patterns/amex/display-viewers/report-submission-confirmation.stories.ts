import type { Meta, StoryObj } from '@storybook/angular';
import { AmexReportSubmissionConfirmationComponent } from '../../../../patterns/amex/display-viewers/report-submission-confirmation';

const meta: Meta<AmexReportSubmissionConfirmationComponent> = {
  title: 'Patterns/Amex/DisplayViewers/ReportSubmissionConfirmation',
  component: AmexReportSubmissionConfirmationComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexReportSubmissionConfirmationComponent>;

export const BCRBStyle: Story = {
  name: 'BCRB — report submitted (table row)',
  args: {
    variant: 'bcrb',
    username: 'ssharaf_onlshelper',
    requestId: '1281',
    referenceNo: '1281_REP009_220920241714',
    status: 'NO RESPONSE FROM BACKEND, CONTACT ADMIN',
    isError: true,
  },
};

export const BCRBSuccess: Story = {
  name: 'BCRB — success confirmation',
  args: {
    variant: 'bcrb',
    username: 'ssharaf_onlshelper',
    message: 'New Report Request Submitted Successfully.',
    requestId: '1282',
    referenceNo: '1282_REP009_220920241714',
    status: 'Pending',
  },
};

export const UAEFTSStyle: Story = {
  name: 'UAEFTS — request submitted',
  args: {
    variant: 'default',
    title: 'Statement Request Submitted',
    message: 'Your UAEFTS statement request has been submitted successfully.',
    requestId: 'SFE2505261345',
    referenceNo: 'AE0703312345678901234',
    status: 'CREATED',
    newRequestLabel: 'New Request',
  },
};
