import type { Meta, StoryObj } from '@storybook/angular';
import { AmexCardMemberDetailsViewComponent } from './card-member-details-view';

const meta: Meta<AmexCardMemberDetailsViewComponent> = {
  title: 'Patterns/Amex/Tables/CardMemberDetailsView',
  component: AmexCardMemberDetailsViewComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexCardMemberDetailsViewComponent>;

export const ActiveWithLinks: Story = {
  name: 'Active member with Offers & Benefits',
  args: {
    details: {
      name: 'AHMED AL MANSOURI', userId: 'ahmed_supp01',
      cardNumber: '3791XXXXXX7018', status: 'Active',
      accountType: 'Supplementary', hasOffers: true, hasBenefits: true,
    },
  },
};

export const InactiveMember: Story = {
  name: 'Inactive member',
  args: {
    details: {
      name: 'SARA KHALID', userId: 'sara_supp02',
      cardNumber: '3791XXXXXX8024', status: 'Inactive',
      accountType: 'Primary', hasOffers: false, hasBenefits: false,
    },
  },
};

export const NoDetails: Story = {
  name: 'Empty — no search yet',
  args: { details: null },
};
