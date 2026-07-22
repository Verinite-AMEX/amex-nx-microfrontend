import type { Meta, StoryObj } from '@storybook/angular';
import { AmexMerchantDetailsPanelComponent } from '../../../composite/amex/merchant-details-panel';

const meta: Meta<AmexMerchantDetailsPanelComponent> = {
  title: 'Composite/amex/MerchantDetailsPanel',
  component: AmexMerchantDetailsPanelComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader', 'color-contrast'],
  argTypes: {
    accentColor: { control: 'color' },
    accentHeight: { control: 'number' },
    cardBackground: { control: 'color' },
    cardPadding: { control: 'text' },
    cardMaxWidth: { control: 'text' },
    submitButtonBg: { control: 'color' },
    submitButtonColor: { control: 'color' },
    dateRangeLinkColor: { control: 'color' },
    showDateRangeLink: { control: 'boolean' },
    accountSectionLabel: { control: 'text' },
    monthsSectionLabel: { control: 'text' },
    dateRangeLinkLabel: { control: 'text' },
    submitButtonLabel: { control: 'text' },
    emptyMessage: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<AmexMerchantDetailsPanelComponent>;

const template = `
  <div style="max-width:480px">
    <amex-merchant-details-panel
      [title]="title"
      [merchantAccounts]="merchantAccounts"
      [selectedAccountId]="selectedAccountId"
      [monthOptions]="monthOptions"
      [emptyMessage]="emptyMessage"
      [accountSectionLabel]="accountSectionLabel"
      [monthsSectionLabel]="monthsSectionLabel"
      [showDateRangeLink]="showDateRangeLink"
      [dateRangeLinkLabel]="dateRangeLinkLabel"
      [submitButtonLabel]="submitButtonLabel"
      [accentColor]="accentColor"
      [accentHeight]="accentHeight"
      [cardBackground]="cardBackground"
      [cardPadding]="cardPadding"
      [cardMaxWidth]="cardMaxWidth"
      [submitButtonBg]="submitButtonBg"
      [submitButtonColor]="submitButtonColor"
      [dateRangeLinkColor]="dateRangeLinkColor">
    </amex-merchant-details-panel>
  </div>`;

export const WithAccounts: Story = {
  args: {
    merchantAccounts: [
      { id: '1301526661', label: '1301526661 - OMAN MULTIPLE TWO' },
    ],
    selectedAccountId: '1301526661',
    monthOptions: [1, 3, 6, 12],
    accountSectionLabel: 'Merchant Account',
    monthsSectionLabel: 'Select number of months to be displayed',
    showDateRangeLink: true,
    dateRangeLinkLabel: 'Settlement and Submissions by date range',
    submitButtonLabel: 'Submit',
    accentColor: '#7b1f4b',
    accentHeight: 4,
    cardBackground: '#ffffff',
    cardPadding: '24px 20px',
    cardMaxWidth: '100%',
    submitButtonBg: '#1a1a5e',
    submitButtonColor: '#fff',
    dateRangeLinkColor: '#016fd0',
  },
  render: (args) => ({
    props: args,
    template,
  }),
};

export const MultipleAccounts: Story = {
  args: {
    ...WithAccounts.args,
    merchantAccounts: [
      { id: '1301526661', label: '1301526661 - OMAN MULTIPLE TWO' },
      { id: '9275640241', label: '9275640241 - DUBAI RETAIL ONE' },
      { id: '1104166483', label: '1104166483 - ABU DHABI OUTLET' },
    ],
    selectedAccountId: '9275640241',
  },
  render: (args) => ({
    props: args,
    template,
  }),
};

export const NoMerchantsAvailable: Story = {
  args: {
    ...WithAccounts.args,
    merchantAccounts: [],
    emptyMessage: 'No merchants are available.',
  },
  render: (args) => ({
    props: args,
    template,
  }),
};

export const NoDateRangeLink: Story = {
  args: {
    ...WithAccounts.args,
    showDateRangeLink: false,
  },
  render: (args) => ({
    props: args,
    template,
  }),
};

export const CustomBranding: Story = {
  args: {
    ...WithAccounts.args,
    accentColor: '#016fd0',
    submitButtonBg: '#006fcf',
    dateRangeLinkColor: '#7b1f4b',
    submitButtonLabel: 'View Statement',
  },
  render: (args) => ({
    props: args,
    template,
  }),
};