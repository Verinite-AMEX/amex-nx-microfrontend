import type { Meta, StoryObj } from '@storybook/angular';
import { AmexWearableTileComponent } from '../../../composite/amex/wearable-tile';

const meta: Meta<AmexWearableTileComponent> = {
  title: 'Composite/Amex/WearableTile',
  component: AmexWearableTileComponent,
  tags: ['autodocs'],
  argTypes: {
    showActions: { control: 'boolean' },
    activate:    { action: 'activate' },
    suspend:     { action: 'suspend' },
  
    disabled: { control: 'boolean' },
    activatedStatus: { control: 'object' },
    suspendedStatus: { control: 'object' },
    activateLabel: { control: 'text' },
    suspendLabel: { control: 'text' },
    activateVariant: { control: 'text' },
    suspendVariant: { control: 'text' },
    buttonSize: { control: 'text' },
    activateAriaLabel: { control: 'text' },
    suspendAriaLabel: { control: 'text' },
    typeIcons: { control: 'text' },
  },
  decorators: [
    (story) => ({ ...story(), template: `<div style="width:440px">${story().template}</div>` }),
  ],
};
export default meta;
type Story = StoryObj<AmexWearableTileComponent>;

export const Ring: Story = {
  args: { wearable: { id: 'W1', type: 'ring', deviceName: 'McLEAR Ring', linkedCardLast4: '1009', status: 'active', issuedDate: '10 Jan 2024', nfcEnabled: true }, showActions: false },
};
export const Watch: Story = {
  args: { wearable: { id: 'W2', type: 'watch', deviceName: 'Apple Watch SE', linkedCardLast4: '4111', status: 'inactive', issuedDate: '05 Feb 2024', nfcEnabled: true }, showActions: true },
};
export const Pending: Story = {
  args: { wearable: { id: 'W3', type: 'bracelet', deviceName: 'Garmin Band', linkedCardLast4: '3005', status: 'pending', nfcEnabled: false }, showActions: false },
};