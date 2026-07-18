import type { Meta, StoryObj } from '@storybook/angular';
import { AmexVATRegistrationFormComponent } from './vat-registration-form';
const meta: Meta<AmexVATRegistrationFormComponent> = { title: 'Patterns/Amex/Forms/VATRegistrationForm', component: AmexVATRegistrationFormComponent, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<AmexVATRegistrationFormComponent>;
export const Default: Story = { name: 'OMS — VAT Registration steps (image23)', args: {} };
