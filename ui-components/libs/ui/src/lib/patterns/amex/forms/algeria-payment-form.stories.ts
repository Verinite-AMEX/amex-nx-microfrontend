import type { Meta, StoryObj } from '@storybook/angular';
import { AmexAlgeriaPaymentFormComponent } from './algeria-payment-form';
const meta: Meta<AmexAlgeriaPaymentFormComponent> = { title: 'Patterns/Amex/Forms/AlgeriaPaymentForm', component: AmexAlgeriaPaymentFormComponent, tags: ['autodocs'],
  argTypes: {
    years: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<AmexAlgeriaPaymentFormComponent>;
export const Default: Story = { name: 'SOC/ROC — Algeria Payment (image38)', args: {} };
export const WithData: Story = { name: 'Pre-filled', args: {} };