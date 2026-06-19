import type { Meta, StoryObj } from '@storybook/angular';
import { AmexSidebarMenuComponent } from './sidebar-menu';

const meta: Meta<AmexSidebarMenuComponent> = {
  title: 'AMEX/Navigation/SidebarMenu',
  component: AmexSidebarMenuComponent,
  tags: ['autodocs'],
  argTypes: { portalStyle: { control: 'radio', options: ['onls','bcrb','oms'] } },
};
export default meta;
type Story = StoryObj<AmexSidebarMenuComponent>;

export const ONLS_Hatched: Story = {
  name: 'ONLS — Decorative hatched panel',
  args: { portalStyle: 'onls' },
};
export const BCRB_ReportList: Story = {
  name: 'BCRB — Report list sidebar',
  args: {
    portalStyle: 'bcrb', activeId: 'corp-monthly',
    items: [
      { id:'cons-monthly', label:'Consumer Monthly Audit Report' },
      { id:'corp-monthly', label:'Corporate Monthly Audit Report' },
      { id:'cons-data',    label:'Consumer Data Audit Report' },
      { id:'corp-data',    label:'Corporate Data Audit Report' },
      { id:'cons-full',    label:'Consumer Full Report' },
      { id:'corp-full',    label:'Corporate Full Report' },
      { id:'cons-history', label:'Consumer History Report' },
      { id:'corp-history', label:'Corporate History Report' },
    ],
  },
};
export const OMS_AdminMenu: Story = {
  name: 'OMS — Admin sidebar menu',
  args: {
    portalStyle: 'oms', activeId: 'users',
    items: [
      { id:'dashboard', label:'Dashboard' },
      { id:'users',     label:'User Administration' },
      { id:'reports',   label:'Reports' },
      { id:'settings',  label:'Settings' },
    ],
  },
};
