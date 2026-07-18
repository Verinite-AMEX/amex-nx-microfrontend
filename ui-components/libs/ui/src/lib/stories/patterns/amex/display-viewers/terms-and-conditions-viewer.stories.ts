import type { Meta, StoryObj } from '@storybook/angular';
import { AmexTermsAndConditionsViewerComponent } from '../../../../patterns/amex/display-viewers/terms-and-conditions-viewer';

const meta: Meta<AmexTermsAndConditionsViewerComponent> = {
  title: 'Patterns/Amex/DisplayViewers/TermsAndConditionsViewer',
  component: AmexTermsAndConditionsViewerComponent,
  tags: ['autodocs'],
  argTypes: {
    agree:  { action: 'agree' },
    cancel: { action: 'cancel' },
  },
  decorators: [(story) => ({ ...story(), template: `<div style="padding:20px;max-width:640px">${story().template}</div>` })],
};
export default meta;
type Story = StoryObj<AmexTermsAndConditionsViewerComponent>;

const omsText = `These Terms and Conditions govern your use of the American Express Online Merchant Services (OMS) Portal. By accessing or using the portal, you agree to be bound by these terms.

1. Account Responsibility
You are responsible for maintaining the confidentiality of your User ID and password. You must notify American Express immediately if you suspect any unauthorised access to your account.

2. Permitted Use
The portal may only be used for legitimate business purposes related to your merchant account. Any attempt to access data belonging to other merchants is strictly prohibited.

3. Data Accuracy
You are responsible for ensuring that all information submitted through the portal is accurate, complete and up to date. American Express reserves the right to suspend access if inaccurate data is detected.

4. VAT Compliance
Merchants are solely responsible for their own VAT registration and compliance. American Express provides invoice generation tools for convenience only.

5. Modifications
American Express reserves the right to modify or discontinue portal features at any time without prior notice.

By clicking "I Agree" you confirm that you have read, understood and agree to these Terms and Conditions.`;

const priorityPassBullets = [
  'You accept the charges levied by Priority Pass if your Priority Pass lounge usage is more than the complimentary allowance on your Card.',
  'You accept the Terms & Conditions of Priority Pass and of the American Express Lounge Benefit.',
  'If a customer asks about the terms, they should be redirected to the terms online.',
];

export const OMSRegistration: Story = {
  name: 'OMS — full T&C text, not yet accepted',
  args: {
    title: 'Terms and Conditions',
    text: omsText,
    maxHeight: '180px',
    accepted: false,
    agreeLabel: 'I Agree',
    cancelLabel: 'Cancel',
    showCancel: true,
  },
};

export const OMSAccepted: Story = {
  name: 'OMS — T&C accepted, button enabled',
  args: {
    title: 'Terms and Conditions',
    text: omsText,
    maxHeight: '180px',
    accepted: true,
    agreeLabel: 'I Agree',
    showCancel: true,
  },
};

export const PriorityPassEnrollment: Story = {
  name: 'Priority Pass enrollment — bullet list T&C (matches screenshot)',
  args: {
    preamble: 'To complete your enrolment please confirm that:',
    bullets: priorityPassBullets,
    maxHeight: '160px',
    accepted: false,
    agreeLabel: 'CONFIRM & ENROLL',
    showCancel: false,
  },
};

export const WearableIssuance: Story = {
  name: 'Wearable issuance — short T&C, no cancel',
  args: {
    title: 'Wearable Issuance Terms',
    text: 'By confirming this issuance, you acknowledge that the selected card art and wearable product will be processed on behalf of the cardholder. This action cannot be undone once submitted. American Express reserves the right to modify or cancel this request in accordance with its policies.',
    maxHeight: '120px',
    accepted: false,
    agreeLabel: 'Confirm & Issue',
    showCancel: false,
  },
};
