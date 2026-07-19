import type { Meta, StoryObj } from '@storybook/angular';
import { AmexDuplicateSubmissionWarningComponent } from '../../../../patterns/amex/feedback/duplicate-submission-warning';

const meta: Meta<AmexDuplicateSubmissionWarningComponent> = {
  title: 'Patterns/Amex/Feedback/DuplicateSubmissionWarning',
  component: AmexDuplicateSubmissionWarningComponent,
  tags: ['autodocs'],
  argTypes: {
    portalStyle: { control: 'radio', options: ['onls', 'oms'] },
    clientId: { control: 'text' },
    backLabel: { control: 'text' },
    proceedLabel: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<AmexDuplicateSubmissionWarningComponent>;

export const ONLS_WithClientId: Story = {
  name: 'ONLS — With Client ID',
  args: { portalStyle: 'onls', clientId: 'CL-7823041' },
};

export const OMS_Centurion: Story = {
  name: 'OMS — Centurion Duplicate',
  args: { portalStyle: 'oms', clientId: 'CTN-100234', proceedLabel: 'Issue Anyway' },
};

export const OMS_NoClientId: Story = {
  name: 'OMS — Without Client ID',
  args: { portalStyle: 'oms', clientId: '' },
};