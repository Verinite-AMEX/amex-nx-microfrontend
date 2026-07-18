import type { Meta, StoryObj } from '@storybook/angular';
import { AmexSettlementSubmissionsTableComponent } from '../../../../patterns/amex/tables/settlement-submissions-table';

const meta: Meta<AmexSettlementSubmissionsTableComponent> = {
  title: 'Patterns/Amex/Tables/SettlementSubmissionsTable',
  component: AmexSettlementSubmissionsTableComponent,
  argTypes: {
    showMonthsFilter: { control: 'boolean' },
    monthOptions: { control: 'object' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexSettlementSubmissionsTableComponent>;

export const WithData: Story = {
  name: 'With settlement rows',
  args: {
    rows: [
      { period: 'Sep 2024', merchantAccount: '9275640241', settlementAmount: 'AED 12,450.00', submissionsCount: '8',  status: 'Completed' },
      { period: 'Aug 2024', merchantAccount: '9275640241', settlementAmount: 'AED 9,820.00',  submissionsCount: '6',  status: 'Completed' },
      { period: 'Jul 2024', merchantAccount: '9275640241', settlementAmount: 'AED 14,100.00', submissionsCount: '10', status: 'Pending' },
    ],
  },
};

export const Empty: Story = {
  name: 'Empty state',
  args: { rows: [] },
};