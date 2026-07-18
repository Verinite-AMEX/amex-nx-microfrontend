import type { Meta, StoryObj } from '@storybook/angular';
import { AmexWearableDetailsViewComponent } from './wearable-details-view';

const meta: Meta<AmexWearableDetailsViewComponent> = {
  title: 'Patterns/Amex/DisplayViewers/WearableDetailsView',
  component: AmexWearableDetailsViewComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexWearableDetailsViewComponent>;

export const SingleDevice: Story = {
  name: 'Single issued device',
  args: {
    device: {
      clientCode: '20473521',
      deviceType: 'Ring',
      status: 'Issued',
      issueDate: '15 Jan 2025',
      cardLinked: '3791XXXXXXXX4012',
      serialNo: 'WR-20250115-001',
    },
  },
};

export const MultipleDevices: Story = {
  name: 'Multiple devices',
  args: {
    device: null,
    devices: [
      { clientCode: '20473521', deviceType: 'Ring',    status: 'Issued',    issueDate: '15 Jan 2025', cardLinked: '3791XXXXXXXX4012' },
      { clientCode: '20473521', deviceType: 'Bracelet', status: 'Cancelled', issueDate: '10 Dec 2024', cardLinked: '3791XXXXXXXX4012' },
      { clientCode: '20473521', deviceType: 'Band',    status: 'Pending',   cardLinked: '3791XXXXXXXX9027' },
    ],
  },
};

export const Empty: Story = {
  name: 'Empty — awaiting search',
  args: { device: null, devices: [] },
};
