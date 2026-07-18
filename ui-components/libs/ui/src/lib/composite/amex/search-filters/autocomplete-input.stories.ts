import type { Meta, StoryObj } from '@storybook/angular';
import { AmexAutocompleteInputComponent } from './autocomplete-input';

const meta: Meta<AmexAutocompleteInputComponent> = {
  title: 'Composite/Amex/SearchFilters/AutocompleteInput',
  component: AmexAutocompleteInputComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexAutocompleteInputComponent>;

export const CountryMaster: Story = {
  args: {
    label: 'Country Name',
    placeholder: 'Start typing country...',
    codeLabel: 'Country Code',
    suggestions: [
      { label: 'United Arab Emirates', code: 'AE' },
      { label: 'Saudi Arabia', code: 'SA' },
      { label: 'Egypt', code: 'EG' },
      { label: 'Algeria', code: 'DZ' },
      { label: 'Jordan', code: 'JO' },
      { label: 'Bahrain', code: 'BH' },
      { label: 'Kuwait', code: 'KW' },
      { label: 'Qatar', code: 'QA' },
      { label: 'Oman', code: 'OM' },
    ],
  },
};

export const CurrencyMaster: Story = {
  args: {
    label: 'Currency Name',
    placeholder: 'Start typing currency...',
    codeLabel: 'Currency Code',
    extraLabel: 'Rate',
    suggestions: [
      { label: 'UAE Dirham', code: 'AED', extra: '1.000' },
      { label: 'Saudi Riyal', code: 'SAR', extra: '0.980' },
      { label: 'Algerian Dinar', code: 'DZD', extra: '0.027' },
      { label: 'US Dollar', code: 'USD', extra: '3.673' },
      { label: 'Euro', code: 'EUR', extra: '3.980' },
    ],
  },
};
