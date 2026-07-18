import type { Meta, StoryObj } from '@storybook/angular';
import { AmexInlineValidationErrorComponent } from '../../../../patterns/amex/feedback/inline-validation-error';

const meta: Meta<AmexInlineValidationErrorComponent> = {
  title: 'Patterns/Amex/Feedback/InlineValidationError',
  component: AmexInlineValidationErrorComponent,
  tags: ['autodocs'],
  argTypes: {
    portalStyle: { control: 'radio', options: ['onls', 'oms'] },
    message: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<AmexInlineValidationErrorComponent>;

export const ONLS_Required: Story = {
  name: 'ONLS — Required Field',
  args: { portalStyle: 'onls', message: 'This field is required.' },
};

export const ONLS_InvalidUserId: Story = {
  name: 'ONLS — Invalid User ID',
  args: { portalStyle: 'onls', message: 'User ID must be alphanumeric.' },
};

export const OMS_RequiredTooltip: Story = {
  name: 'OMS — Required Tooltip (SOC style)',
  args: { portalStyle: 'oms', message: 'This value is required.' },
};

export const OMS_InvalidIban: Story = {
  name: 'OMS — Invalid IBAN',
  args: { portalStyle: 'oms', message: 'Last 5 digits of IBAN are incorrect.' },
};