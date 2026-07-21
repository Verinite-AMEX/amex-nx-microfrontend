import type { Meta, StoryObj } from '@storybook/angular';
import { AmexEmptyStateMessageComponent } from '../../../../patterns/amex/tables/empty-state-message';

const meta: Meta<AmexEmptyStateMessageComponent> = {
  title: 'Patterns/Amex/Tables/EmptyStateMessage',
  component: AmexEmptyStateMessageComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'oms'] },
    message: { control: 'text' },
    icon: { control: 'text' },
    ctaLabel: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<AmexEmptyStateMessageComponent>;

export const BCRBDefault: Story = {
  name: 'BCRB/ONLS — bold centred "No Data Found"',
  args: { message: 'No Data Found', variant: 'default', icon: '', ctaLabel: '' },
};

export const OMSGreenBox: Story = {
  name: 'OMS — green info box',
  args: { message: 'No merchants are available.', variant: 'oms' },
};

export const WithIconAndCTA: Story = {
  name: 'With icon + CTA button',
  args: { message: 'No eligible cards found.', icon: '??', ctaLabel: 'Search Again', variant: 'default' },
};

export const LoungeNoCards: Story = {
  name: 'Lounge — no eligible cards',
  args: { message: 'No eligible cards for Priority Pass enrollment.', icon: '??', variant: 'default' },
};