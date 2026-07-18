import type { Meta, StoryObj } from '@storybook/angular';
import { AmexPriorityPassViewerComponent } from './priority-pass-viewer';

const meta: Meta<AmexPriorityPassViewerComponent> = {
  title: 'Patterns/Amex/DisplayViewers/PriorityPassViewer',
  component: AmexPriorityPassViewerComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexPriorityPassViewerComponent>;

export const WithEligibleCards: Story = {
  name: 'Eligible cards — enrollment form',
  args: {
    clientCode: '20464423',
    noEligibleCards: false,
    mobile: '+(973) 32323231',
    email: 'moulika.vadivel@americanexpress',
    cards: [
      {
        cardNumber: '3702XXXXXXXX3002',
        cardType: 'The American Express® Corporate Card',
        variant: 'BULLET P',
        enrolled: false,
        selected: true,
        entitlements: [
          'Eight complimentary visits per annum to Priority Pass lounges',
          'For any incremental usage and for guest visits a charge of USD 35 per visit will be applied',
        ],
      },
      {
        cardNumber: '3702XXXXXXXX4015',
        cardType: 'The American Express® Corporate Card',
        variant: 'BULLET P',
        enrolled: false,
        selected: false,
        entitlements: [
          'Eight complimentary visits per annum to Priority Pass lounges',
          'For any incremental usage and for guest visits a charge of USD 35 per visit will be applied',
        ],
      },
    ],
  },
};

export const NoEligibleCards: Story = {
  name: 'No eligible cards error',
  args: {
    clientCode: '20473521',
    noEligibleCards: true,
    cards: [],
  },
};

export const EmptySearch: Story = {
  name: 'Search — awaiting client code',
  args: {
    clientCode: '',
    noEligibleCards: false,
    cards: [],
  },
};
