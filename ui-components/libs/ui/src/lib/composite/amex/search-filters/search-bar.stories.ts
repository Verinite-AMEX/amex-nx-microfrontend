import type { Meta, StoryObj } from '@storybook/angular';
import { AmexSearchBarComponent } from './search-bar';

const meta: Meta<AmexSearchBarComponent> = {
  title: 'Composite/Amex/SearchFilters/SearchBar',
  component: AmexSearchBarComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexSearchBarComponent>;

export const CardNumber: Story = {
  args: { label: 'Card Number', placeholder: 'Enter card number', buttonLabel: 'Submit' },
};

export const ClientCode: Story = {
  args: { label: 'Client Code', placeholder: 'Enter client code', buttonLabel: 'Submit' },
};

export const UserIdOrUCI: Story = {
  args: { label: 'User ID / UCI', placeholder: 'Enter User ID or UCI', buttonLabel: 'Search' },
};

export const IBAN: Story = {
  args: { label: 'IBAN Number', placeholder: 'Enter IBAN number', buttonLabel: 'Submit' },
};

export const WithError: Story = {
  args: {
    label: 'Card Number',
    placeholder: 'Enter card number',
    buttonLabel: 'Submit',
    errorMessage: 'No records found for the entered card number.',
  },
};
