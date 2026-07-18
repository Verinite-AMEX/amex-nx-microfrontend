import type { Meta, StoryObj } from '@storybook/angular';
import { AmexDashboardMenuBarComponent } from './dashboard-menu-bar';

const meta: Meta<AmexDashboardMenuBarComponent> = {
  title: 'Patterns/Amex/Navigation/DashboardMenuBar',
  component: AmexDashboardMenuBarComponent,
  argTypes: {
    bureauLabel: { control: 'text' },
    activeBureauId: { control: 'text' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexDashboardMenuBarComponent>;

export const BCRBDefault: Story = {
  name: 'BCRB — Bureau dropdown',
  args: {
    showBureauDropdown: true, activeBureauId: 'aecb',
    bureauOptions: [
      { id:'aecb', label:'AECB' },
      { id:'simah', label:'SIMAH' },
      { id:'bni', label:'BNI' },
    ],
    links: [], activeLinkId: '',
  },
};
export const BCRBWithLinks: Story = {
  name: 'BCRB — Bureau dropdown + sub-nav links',
  args: {
    showBureauDropdown: true, activeBureauId: 'aecb',
    bureauOptions: [
      { id:'aecb', label:'AECB' }, { id:'simah', label:'SIMAH' },
    ],
    links: [
      { id:'bcrb', label:'BCRB REPORT' },
      { id:'aecb-upload', label:'AECB UPLOAD' },
    ],
    activeLinkId: 'bcrb',
  },
};