import type { Meta, StoryObj } from '@storybook/angular';
import { AmexReportFormatFormComponent } from '../../../../patterns/amex/forms/report-format-form';
const meta: Meta<AmexReportFormatFormComponent> = { title: 'Patterns/Amex/Forms/ReportFormatForm', component: AmexReportFormatFormComponent, tags: ['autodocs'],
  argTypes: {
    settlementOptions: { control: 'object' },
    submissionOptions: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<AmexReportFormatFormComponent>;
export const Default: Story = { name: 'OMS — Select report formats (image22)', args: {} };
export const WithEmail: Story = { name: 'With email subscription enabled', args: { } };