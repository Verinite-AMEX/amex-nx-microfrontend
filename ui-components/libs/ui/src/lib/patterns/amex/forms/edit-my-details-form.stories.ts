import type { Meta, StoryObj } from '@storybook/angular';
import { AmexEditMyDetailsFormComponent } from './edit-my-details-form';

const meta: Meta<AmexEditMyDetailsFormComponent> = {
  title: 'Patterns/Amex/Forms/EditMyDetailsForm',
  component: AmexEditMyDetailsFormComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexEditMyDetailsFormComponent>;

export const Empty: Story = {
  name: 'Empty form',
  args: { panelTitle: 'Edit My Details', showPhone: true },
};

export const PreFilled: Story = {
  name: 'Pre-filled — BTA Corporate User',
  args: {
    panelTitle: 'Edit My Details',
    showPhone: true,
    initialData: { name: 'Ahmed Al Mansouri', email: 'ahmed@company.ae', phone: '+971 50 123 4567' },
  },
};
