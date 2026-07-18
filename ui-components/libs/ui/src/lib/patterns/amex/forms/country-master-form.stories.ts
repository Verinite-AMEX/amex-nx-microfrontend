import type { Meta, StoryObj } from '@storybook/angular';
import { AmexCountryMasterFormComponent } from './country-master-form';

const meta: Meta<AmexCountryMasterFormComponent> = {
  title: 'Patterns/Amex/Forms/CountryMasterForm',
  component: AmexCountryMasterFormComponent,
  argTypes: {
    countryOptions: { control: 'text' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexCountryMasterFormComponent>;

export const AddNew: Story = {
  name: 'Add New — free text inputs',
  args: {},
};

export const Modify: Story = {
  name: 'Modify — autocomplete name, code auto-fills',
  args: {},
};