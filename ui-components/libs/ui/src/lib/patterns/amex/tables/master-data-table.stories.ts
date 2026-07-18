import type { Meta, StoryObj } from '@storybook/angular';
import { AmexMasterDataTableComponent } from './master-data-table';

const meta: Meta<AmexMasterDataTableComponent> = {
  title: 'Patterns/Amex/Tables/MasterDataTable',
  component: AmexMasterDataTableComponent,
  argTypes: {
    codeLabel: { control: 'text' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexMasterDataTableComponent>;

export const CountryMaster: Story = {
  name: 'Country Master',
  args: {
    nameLabel: 'Country Name', codeLabel: 'Country Code',
    rows: [
      { code: '784', name: 'UNITED ARAB EMIRATES' },
      { code: '048', name: 'BAHRAIN' },
      { code: '414', name: 'KUWAIT' },
      { code: '512', name: 'OMAN' },
      { code: '634', name: 'QATAR' },
    ],
  },
};

export const CurrencyMaster: Story = {
  name: 'Currency Master',
  args: {
    nameLabel: 'Currency Name', codeLabel: 'Currency Code',
    rows: [
      { code: '001', name: 'US DOLLAR' },
      { code: '002', name: 'UAE DIRHAM' },
      { code: '003', name: 'BAHRAINI DINAR' },
      { code: '004', name: 'KUWAITI DINAR' },
    ],
  },
};

export const Empty: Story = {
  name: 'Empty state',
  args: { rows: [] },
};