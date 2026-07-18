import type { Meta, StoryObj } from '@storybook/angular';
import { AmexContactInformationFormComponent } from './contact-information-form';

const meta: Meta<AmexContactInformationFormComponent> = {
  title: 'Patterns/Amex/Forms/ContactInformationForm',
  component: AmexContactInformationFormComponent,
  argTypes: {
    backLabel: { control: 'text' },
    saveLabel: { control: 'text' },
    countryCodes: { control: 'text' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexContactInformationFormComponent>;

export const Empty: Story = {
  name: 'Empty — 3 contact rows (OMS default)',
  args: { sectionTitle: 'Operations' },
};

export const PreFilled: Story = {
  name: 'Pre-filled contacts (matches image60)',
  args: {
    sectionTitle: 'Operations',
    contacts: [
      { name: 'Ahmed Al Mansouri', jobTitle: 'Finance Manager', email: 'ahmed@merchant.ae', countryCode: '+973', landline: '17123456', mobile: '39123456' },
      { name: 'Sara Khalid', jobTitle: 'Accountant', email: 'sara@merchant.ae', countryCode: '+973', landline: '', mobile: '36987654' },
      { name: '', jobTitle: '', email: '', countryCode: '', landline: '', mobile: '' },
    ],
  },
};