import type { Meta, StoryObj } from '@storybook/angular';
import { AmexOffersPanelComponent } from '../../../../patterns/amex/display-viewers/offers-panel';

const meta: Meta<AmexOffersPanelComponent> = {
  title: 'Patterns/Amex/DisplayViewers/OffersPanel',
  component: AmexOffersPanelComponent,
  argTypes: {
    offers: { control: 'object' },
    categories: { control: 'object' },
  },
  tags: ['autodocs'],
  decorators: [(story) => ({ ...story(), template: `<div style="width:900px;padding:0">${story().template}</div>` })],
};
export default meta;
type Story = StoryObj<AmexOffersPanelComponent>;

const sampleOffers = [
  {
    id: '1', title: 'General Offer', description: 'Bowling Maniac 1',
    category: 'entertainment', expiryDate: '31 Dec, 2024', hasFlash: true,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop',
  },
  {
    id: '2', title: 'Renaming Customer File With Filled Data', description: 'Correct File format',
    category: 'shopping', expiryDate: '08 Oct, 2047', hasFlash: true,
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&auto=format&fit=crop',
  },
  {
    id: '3', title: 'Customer View', description: 'Correct File format',
    category: 'travel', expiryDate: '08 Oct, 2047', hasFlash: true, enrolled: true,
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&auto=format&fit=crop',
  },
  {
    id: '4', title: 'Long Offer Name With Flash And Save To Card Offerr',
    description: 'long offer name with flash and Save to Card offerr',
    category: 'promo', expiryDate: '25 Dec, 2027', hasFlash: true,
  },
  {
    id: '5', title: 'Save To Card Offer', description: 'Special save-to-card promotional offer',
    category: 'promo', expiryDate: '25 Dec, 2027', hasFlash: true,
  },
  {
    id: '6', title: 'Dining Cashback', description: '10% cashback at all partner restaurants',
    category: 'dining', expiryDate: '31 Mar, 2025', hasFlash: false,
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&auto=format&fit=crop',
    termsAndConditions: 'American Express reserves the right to modify / cancel this anytime.',
  },
];

export const AllOffers: Story = {
  name: 'All Offers — 3-column grid',
  args: { offers: sampleOffers },
};

export const Empty: Story = {
  name: 'Empty — no offers',
  args: { offers: [] },
};