import type { Meta, StoryObj } from '@storybook/angular';
import { AmexCustomizedReportsFormComponent } from '../../../../patterns/amex/forms/customized-reports-form';
const meta: Meta<AmexCustomizedReportsFormComponent> = { title: 'Patterns/Amex/Forms/CustomizedReportsForm', component: AmexCustomizedReportsFormComponent, tags: ['autodocs'],
  argTypes: {
    reportTypes: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<AmexCustomizedReportsFormComponent>;
export const Default: Story = { name: 'OMS — Customized Reports (Settlement Detail active)', args: {} };