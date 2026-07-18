import type { Meta, StoryObj } from '@storybook/angular';
import { AmexWearableDeviceTableComponent } from './wearable-device-table';

const meta: Meta<AmexWearableDeviceTableComponent> = {
  title: 'Patterns/Amex/Tables/WearableDeviceTable',
  component: AmexWearableDeviceTableComponent,
  argTypes: {
    showTypeTabs: { control: 'boolean' },
    deviceTypes: { control: 'object' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexWearableDeviceTableComponent>;

export const WithDevices: Story = {
  name: 'With devices — mixed statuses',
  args: {
    rows: [
      { deviceType: 'Bracelet', status: 'Issued',   cardLinked: '3791XXXXXX7018', issueDate: '01/08/2024' },
      { deviceType: 'Band',     status: 'Active',   cardLinked: '3791XXXXXX8024', issueDate: '15/07/2024' },
      { deviceType: 'Ring',     status: 'Inactive', cardLinked: '',               issueDate: '' },
    ],
  },
};

export const Empty: Story = {
  name: 'Empty state',
  args: { rows: [] },
};