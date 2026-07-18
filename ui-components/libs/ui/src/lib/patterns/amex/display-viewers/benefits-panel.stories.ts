import type { Meta, StoryObj } from '@storybook/angular';
import { AmexBenefitsPanelComponent } from './benefits-panel';

const meta: Meta<AmexBenefitsPanelComponent> = {
  title: 'Patterns/Amex/DisplayViewers/BenefitsPanel',
  component: AmexBenefitsPanelComponent,
  tags: ['autodocs'],
  decorators: [(story) => ({ ...story(), template: `<div style="width:900px">${story().template}</div>` })],
};
export default meta;
type Story = StoryObj<AmexBenefitsPanelComponent>;

export const WithBenefits: Story = {
  name: 'Benefits grid',
  args: {
    benefits: [
      {
        id: '1', title: 'Dining Cashback', description: '10% cashback at partner restaurants',
        category: 'dining', validFrom: '01 Jan 2025', validUntil: '31 Dec 2025',
        hasFlash: true, enrolled: false,
        termsAndConditions: 'American Express reserves the right to modify / cancel this anytime.',
        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&auto=format&fit=crop',
      },
      {
        id: '2', title: 'Airport Lounge Access', description: 'Complimentary lounge access at 1300+ airports',
        category: 'travel', validFrom: '01 Jan 2025', validUntil: '31 Dec 2025',
        hasFlash: false, enrolled: true,
        termsAndConditions: 'Valid for primary card member only. Guest charges apply.',
        imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&auto=format&fit=crop',
      },
      {
        id: '3', title: 'Hotel Status Upgrade', description: 'Guaranteed room upgrade at Marriott & Hilton',
        category: 'travel', validFrom: '01 Mar 2025', validUntil: '28 Feb 2026',
        hasFlash: true, enrolled: false,
      },
    ],
  },
};

export const Empty: Story = {
  name: 'No benefits',
  args: { benefits: [] },
};
