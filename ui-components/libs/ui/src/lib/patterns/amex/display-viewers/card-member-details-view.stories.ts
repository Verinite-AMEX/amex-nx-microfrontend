import type { Meta, StoryObj } from '@storybook/angular';
import { AmexCardMemberDetailsViewComponent } from './card-member-details-view';

const meta: Meta<AmexCardMemberDetailsViewComponent> = {
  title: 'Patterns/Amex/DisplayViewers/CardMemberDetailsView',
  component: AmexCardMemberDetailsViewComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'needs-improvement', 'screen-reader', 'color-contrast'],
};
export default meta;
type Story = StoryObj<AmexCardMemberDetailsViewComponent>;

// Active card member with offers and benefits
export const ActiveWithOffersAndBenefits: Story = {
  name: 'Active — With Offers & Benefits',
  args: {
    details: {
      name: 'Mohammed Al Rashid',
      userId: 'MArashid001',
      cardNumber: '3714-XXXXXX-21001',
      status: 'Active',
      accountType: 'Gold Card',
      hasOffers: true,
      hasBenefits: true,
    },
  },
};

// Active card member, no offers/benefits
export const ActiveBasic: Story = {
  name: 'Active — Basic (no offers/benefits)',
  args: {
    details: {
      name: 'Sara Al Khalifa',
      userId: 'SKHALIFA002',
      cardNumber: '3714-XXXXXX-33022',
      status: 'Active',
      accountType: 'Platinum Card',
      hasOffers: false,
      hasBenefits: false,
    },
  },
};

// Inactive card member
export const Inactive: Story = {
  name: 'Inactive Card Member',
  args: {
    details: {
      name: 'Ahmed Hassan',
      userId: 'AHASSAN003',
      cardNumber: '3714-XXXXXX-44503',
      status: 'Inactive',
      accountType: 'Green Card',
      hasOffers: false,
      hasBenefits: false,
    },
  },
};

// Empty state — before search
export const EmptyBeforeSearch: Story = {
  name: 'Empty — Before Search',
  args: {
    details: null,
  },
};
