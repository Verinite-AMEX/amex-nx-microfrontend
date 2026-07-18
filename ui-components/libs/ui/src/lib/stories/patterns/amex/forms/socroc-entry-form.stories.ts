import type { Meta, StoryObj } from '@storybook/angular';
import { AmexSOCROCEntryFormComponent } from '../../../../patterns/amex/forms/socroc-entry-form';

const meta: Meta<AmexSOCROCEntryFormComponent> = {
  title: 'Patterns/Amex/Forms/SOCROCEntryForm',
  component: AmexSOCROCEntryFormComponent,
  argTypes: {
    showSOC: { control: 'boolean' },
    showROC: { control: 'boolean' },
    rejectionCodes: { control: 'text' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexSOCROCEntryFormComponent>;

export const BothSections: Story = {
  name: 'Both SOC and ROC sections (image15)',
  args: { showSOC: true, showROC: true },
};

export const SOCOnly: Story = {
  name: 'SOC section only',
  args: { showSOC: true, showROC: false },
};

export const ROCOnly: Story = {
  name: 'ROC section only',
  args: { showSOC: false, showROC: true },
};