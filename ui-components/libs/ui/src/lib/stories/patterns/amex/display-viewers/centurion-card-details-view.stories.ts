import type { Meta, StoryObj } from '@storybook/angular';
import { AmexCenturionCardDetailsViewComponent } from '../../../../patterns/amex/display-viewers/centurion-card-details-view';

const meta: Meta<AmexCenturionCardDetailsViewComponent> = {
  title: 'Patterns/Amex/DisplayViewers/CenturionCardDetailsView',
  component: AmexCenturionCardDetailsViewComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexCenturionCardDetailsViewComponent>;

export const WithDetails: Story = {
  name: 'Card details loaded',
  args: {
    details: {
      clientId: '20510409',
      name: 'BAHONE',
      cardNumber: '3744XXXXXXXX9008',
      cardType: 'Centurion LCY (Bahraini Dinar)',
      status: 'Active',
      issuanceState: 'Issued',
      premiumizationStatus: 'Pending',
      highlights: [
        { text: 'You are invited to change your Centurion Card billing currency from US$ to <strong style="background:#adff2f;padding:1px 2px">Bahraini Dinar</strong> while all the Centurion benefits you are accustomed to remain as is.' },
        { text: 'Your Card statement will be billed in <strong style="background:#adff2f;padding:1px 2px">Bahraini Dinar</strong> and your monthly Card settlement (payment) will be done in <strong style="background:#adff2f;padding:1px 2px">Bahraini Dinar</strong>.' },
        { text: 'You will not be charged Conversion Processing Fee for transactions done in <strong style="background:#adff2f;padding:1px 2px">Bahraini Dinar</strong>, while the respective fee will apply on Non-Billing currency transactions (including USD).' },
        { text: 'You will be issued new Centurion Cards (primary & supplementary Card(s)) in <strong style="background:#adff2f;padding:1px 2px">Bahraini Dinar</strong> and your existing Centurion Card will continue to be active until your new Cards are delivered and activated.' },
      ],
    },
  },
};

export const Empty: Story = {
  name: 'Empty — awaiting search',
  args: { details: null },
};

export const AlreadySubmitted: Story = {
  name: 'Request already submitted warning',
  args: {
    details: {
      clientId: '20510409',
      name: 'BAHONE',
      cardNumber: '3744XXXXXXXX9008',
      premiumizationStatus: 'Already Submitted — request exists for this Client ID',
    },
  },
};
