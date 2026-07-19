import type { Meta, StoryObj } from '@storybook/angular';
import { AmexNewOutletApplicationFormComponent } from '../../../../patterns/amex/forms/new-outlet-application-form';
const meta: Meta<AmexNewOutletApplicationFormComponent> = { title: 'Patterns/Amex/Forms/NewOutletApplicationForm', component: AmexNewOutletApplicationFormComponent, tags: ['autodocs'],
  argTypes: {
    businessTypes: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<AmexNewOutletApplicationFormComponent>;
export const Empty: Story = { name: 'OMS Sub-User — Add New Outlet', args: {} };